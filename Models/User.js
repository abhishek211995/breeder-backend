// User actions

const connection = require( "../database/Connection");

const createBreeder = ({userName,userType,password,email,contact,aadhar,license}) => {    
    connection.query(
        `INSERT INTO user (userName,userType,password,email,contact,aadhar,license) VALUES ("${userName}","${userType}","${password}","${email}","${contact}","${aadhar}","${license}")`,
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    )
}

const createIndividual = ({ userName, userType, password, email, contact, aadhar }) => {
    connection.query(
        `INSERT INTO user (userName,userType,password,email,contact,aadhar) VALUES ("${userName}","${userType}","${password}","${email}","${contact}","${aadhar}")`,
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    )
}

const getUser = ({ email, password }) => {
    var user;
    connection.query(
        `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`,
        function (err, res) {
            if (err) throw err;
            // const result = res[0].id;
            console.log(res);
            // user = result;
        }
    )
    return user;
}


module.exports = { createBreeder, createIndividual,getUser };

