const bodyParser = require("body-parser");
const express = require("express");
const sqlite3 = require ('sqlite3').verbose();
const cors = require('cors');
let sql; 

const db = new sqlite3.Database('../AI-Quiz-Database/AI-Quiz.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.log(err.message);
});

const app= express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.set('view engine','ejs');

app.get('/api/marksList', (req, res)=>{
    sql = 'SELECT * FROM users';

    db.all(sql, (err, rows) => {
        let UserList = [];

        rows.forEach(row => {
            UserList.push(row);
        });
        if(err)
        console.log(err);

        res.json(UserList);
    });

});

app.post('/api/marksEntry', (req, res)=>{
    
    const data= req.body;
    console.log(data);

    let email = data.email;
    let name = data.name;
    let company = data.company;
    let score = data.score;

    sql = 'INSERT INTO users (email_id, name, company, score) VALUES (?,?,?,?)';
    db.run(sql, [email, name, company, score], (err) => {
        if (err) return console.log(err.message);
    });

    res.send("Entry Successful");

});

app.post('/api/marksRemove', (req, res)=>{
    
    const data= req.body;
    console.log(data);

    let remove = data.remove;

    sql = 'DELETE FROM users WHERE email_id = ?';
    db.run(sql, [remove], (err) => {
        if (err) return console.log(err.message);
    });

});

const port= 8080;

app.listen(port, ()=>{
    console.log('listenign to server');
})