var Validation = function () {
    // check rỗng
    this.checkEmpty = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' can not be empty';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }   
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
    // check chữ
    this.checkAlphaBet = function (value, name, selectorError) {
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' must be alphabet characters';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
    // check số
    this.checkNumber = function (value, name, selectorError) {
        var regex = /^[0-9]+$/;
        if (!regex.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' must be a number';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
    // kiểm tra độ dài chuỗi
    this.checkLength = function (value, name, selectorError, minLength, maxLength) {
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ' must be from ' + minLength + ' to ' + maxLength;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
    // kiểm tra giá trị
    this.checkValue = function(value,name,selectorError,minValue,maxValue){
        if(Number(value)<minValue || Number(value)>maxValue){
            document.querySelector(selectorError).innerHTML = name + ' must be value from ' + minValue + ' to ' + maxValue;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
}

let validate = new Validation();

let getEleID = function(id){
    return document.getElementById(id);
}

let confirmValidation = function(){
    // let name = getEleID("name").value;
    // let amount = getEleID("amount").value;
    // let category = getEleID("category").value;
    // let img = getEleID("img").value;
    // let price = getEleID("price").value;

    // let valid = true;
    
    // valid &= validate.checkEmpty(name, "Name","name_checkEmpty")
    // & validate.checkEmpty(amount, "Amount","amount_checkEmpty")
    // & validate.checkEmpty(category, "Category","category_checkEmpty")
    // & validate.checkEmpty(img, "Image","img_checkEmpty")
    // & validate.checkEmpty(price, "Price","price_checkEmpty")

    // if(!valid) return 0;
    alert("1");
}



window.onload = function(){
    document.querySelector("#btnAdd").onclick = confirmValidation;
}


