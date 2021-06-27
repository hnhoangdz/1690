const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://hnhoangdz:neymar9701@cluster0.lti7z.mongodb.net/test";
const dbname = "ATNShop";

async function getDbo() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbname);
    return dbo;
}

async function  search(condition,collectionName){  
    const dbo = await getDbo();
    const searchCondition = new RegExp(condition,'i')
    var results = await dbo.collection(collectionName).
                            find({name:searchCondition}).toArray();
    return results;
}

async function insertOneIntoCollection(documentToInsert,collectionName){
    const dbo = await getDbo();
    await dbo.collection(collectionName).insertOne(documentToInsert);
}

async function viewAllProducts(collectionName){
    const dbo = await getDbo();
    var results = await dbo.collection(collectionName).find({}).toArray();
    return results; 
}

async function update(condition,documentToUpdate,collectionName){
    const dbo = await getDbo();
    await dbo.collection(collectionName).updateOne(condition,documentToUpdate);
}

async function CheckUser(username_login,password_login){
    const dbo = await getDbo();
    const results = await dbo.collection("user").
                    findOne({$and:[{username:username_login},{password:password_login}]});
    return results != null;
}

module.exports = {search,insertOneIntoCollection,viewAllProducts,getDbo,update,CheckUser}