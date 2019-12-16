const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database(path.join(__dirname,'./flowers2019mod.db'));

const app = express();
app.use(bodyParser.json());

/***Querying Begin***/
//Flowers
app.get('/get-flowers', (req,res) => {
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        if(err)
            throw err;
        else
            res.json(rows);
    })
})

app.get('/get-flower-info', (req,res) => {
    db.all('SELECT * FROM SIGHTINGS WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10', [req.query.flower], (err, rows) => {
        if(err)
            throw err;
        else
            res.json(rows);
    })
})

//Sightings
app.get('/get-my-sightings', (req,res) => {
    db.all('SELECT * FROM SIGHTINGS WHERE PERSON = ?', [req.query.person], (err, rows) => {
        if(err)
            throw err;
        else
            res.json(rows);
    })
})

app.post('/update-sighting-name', (req,res) =>{
    db.run('UPDATE SIGHTINGS SET NAME = ? WHERE PERSON = ? AND LOCATION = ? AND SIGHTED = ?', [req.body.name, req.body.person, req.body.location, req.body.sighted], (err, rows) => {
        if(err){
            throw err;
        }
    })
})

app.post('/update-sighting-location', (req,res) =>{
    db.run('UPDATE SIGHTINGS SET LOCATION = ? WHERE NAME = ? AND PERSON = ?  AND SIGHTED = ?', [req.body.location, req.body.name, req.body.person, req.body.sighted], (err, rows) => {
        if(err){
            throw err;
        }
    })
})

app.post('/delete-sighting', (req,res) =>{
    db.run('DELETE FROM SIGHTINGS WHERE NAME = ? AND PERSON = ? AND LOCATION = ? AND SIGHTED = ?', [req.body.name, req.body.person, req.body.location, req.body.sighted], (err, rows) => {
        if(err){
            throw err;
        }
    })
})

//Insert
app.get('/get-locations', (req,res) => {
    db.all('SELECT LOCATION FROM FEATURES ORDER BY LOCATION', (err, rows) => {
        if(err)
            throw err;
        else
            res.json(rows);
    })
})

app.post('/insert-sighting', (req,res) =>{
    db.run('INSERT INTO SIGHTINGS(NAME, PERSON, LOCATION, SIGHTED) VALUES(?,?,?,?)', [req.body.name, req.body.person, req.body.location, req.body.sighted], (err, rows) => {
        if(err){
            throw err;
        }
    })
})
/***Querying End***/

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server now running on port ${port}!`));