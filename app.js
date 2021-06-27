// IMPORT
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
const express = require('express');
const hbs = require('hbs');
var app = express();
app.set('view engine', 'hbs');
const session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'cba',
    cookie:{maxAge:60000}
}));
fs = require('fs-extra')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://hnhoangdz:neymar9701@cluster0.lti7z.mongodb.net/test"


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));



const dbHandler = require('./dbHandler')
const validation = require('./validation')

// VALIDATION
// -------------------------------------------------------------
// -------------------------------------------------------------

// CHECK NAME


// REGISTER
// -------------------------------------------------------------
// -------------------------------------------------------------

app.get('/register', (req,res)=>{
    res.render('register')
})

app.post('/register', async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone_number;
    let check = true;
    check &= validation.checkEmpty(username) & validation.checkEmpty(password) 
        & validation.checkEmpty(email) & validation.checkEmpty(phone)
        & validation.checkLength(username,6,32) & validation.checkLength(password,6,32)
        & validation.checkPhone(phone);
    if(!check){
        s1 = "",s2 = "",s3 = "",s4 ="",s5="",s6="",s7="";
        if(!validation.checkEmpty(username)) s1 = "You need enter here";
        if(!validation.checkEmpty(password) ) s2 = "You need enter here";
        if(!validation.checkEmpty(email)) s3 = "You need enter here";
        if(!validation.checkEmpty(phone)) s4 = "You need enter here";
        if(!validation.checkLength(username)) s5 = "Username must be from 6 - 32 characters";
        if(!validation.checkLength(password)) s6 = "Password must be from 6 - 32 characters";
        if(!validation.checkPhone(phone)) s7 = "Phone must equal to 10 number";
        res.render('register',{err_Empty:{s1,s2,s3,s4,s5,s6,s7}})
    }
    else{
        const newUser = {username: username, password: password, phone: phone, email: email};
        await dbHandler.insertOneIntoCollection(newUser,"user")
        res.render('index',{loginName: username})
        req.session.username = username;
    }
})



// LOGIN
// -------------------------------------------------------------
// -------------------------------------------------------------
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login', async (req,res)=>{
    const username = req.body.username_login;
    const password = req.body.pw_login;
    const found = await dbHandler.CheckUser(username, password);
    if(found){
        req.session.username = username;
        res.render('index',{loginName: username})
    }
    else{
        res.render('login',{errMsg: "User or password is wrong!!!"})
    }
})

// LOGOUT
// -------------------------------------------------------------
// -------------------------------------------------------------
app.get('/logout',(req,res,next)=>{
    if(req.session.username){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else{
                return res.redirect('/');
            }
        })
    }
})

app.get('/', (req,res)=>{
    res.render('index',{loginName: req.session.username})
})

// Search
app.post('/search',async (req,res)=>{
    const searchText = req.body.keyword;
    const results =  await dbHandler.search(searchText,"Product");
    res.render('viewAllProducts',{models:results})
})

// Add
app.post('/doAdd',async(req,res)=>{
    const name = req.body.name;
    const amount = req.body.amount;
    const category = req.body.category;
    const price = req.body.price;
    const finalImg = req.body.img;
    let check = true;
    check &= validation.checkEmpty(name) & validation.checkEmpty(amount) 
        & validation.checkEmpty(category) & validation.checkEmpty(price) & validation.checkEmpty(finalImg);
    if(!check){
        s1 = "",s2 = "",s3 = "",s4 = "",s5 = "";
        if(!validation.checkEmpty(name)) s1 = "Let's enter name's toy";
        if(!validation.checkEmpty(amount)) s2 = "Let's enter amount's toy";
        if(!validation.checkEmpty(category)) s3 = "Let's enter category's toy";
        if(!validation.checkEmpty(finalImg)) s4 = "Let's enter UrlImg's toy";
        if(!validation.checkEmpty(price)) s5 = "Let's enter price's toy";
        res.render('addProduct',{err_EmptyAdd:{s1,s2,s3,s4,s5}})
    }
    else{
        let newProduct = {name: name, amount: amount, category: category,img: finalImg, price: price};
        await dbHandler.insertOneIntoCollection(newProduct,"Product")
        res.render('addProduct')
    }
})

// Edit
app.get('/edit',async (req,res)=>{
    const id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    const condition = {"_id" : ObjectID(id)};
    const client= await MongoClient.connect(url);
    const dbo = client.db("ATNShop");
    const productToEdit = await dbo.collection("Product").findOne(condition);
    res.render('update',{product:productToEdit});
    console.log(productToEdit);
})

app.post('/update', async (req, res)=>{
    const id = req.body.id;
    var ObjectID = require('mongodb').ObjectID;
    const condition = {"_id" : ObjectID(id)};
    
    let name = req.body.update_name;
    let amount = req.body.update_amount;

    let finalImg = req.body.update_name;
    let category = req.body.update_category;
    let price = req.body.update_price;
    let newValues = {$set : {name: name, amount: amount, category: category,img: finalImg, price: price}};

    await dbHandler.update(condition,newValues,"Product")
    console.log(newValues,condition)
    res.redirect('view');
})

// View all
app.get('/view',async(req,res)=>{
    const results = await dbHandler.viewAllProducts("Product");
    res.render('viewAllProducts',{models:results,loginName: req.session.username});
})

app.get('/delete' ,async (req, res)=>{
    const id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client = await MongoClient.connect(url);
    let dbo = client.db("ATNShop");
    await dbo.collection("Product").deleteOne(condition);
    res.redirect('view');
})

app.get('/add',async(req,res)=>{
    res.render('addProduct')
})

app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server listening at" +PORT);


