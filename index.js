const {
    Client
} = require('pg')
const express = require('express')

const port = 3000

const app = express()
app.use(express.json())

const client = new Client({
    database: 'social-media'
})


app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});


app.post('/users', (req, res) => {
    const user = req.body.username
    const bio = req.body.bio

    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = [user, bio];

    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    });
})


app.get('/users/:id', (req, res) => {
    const {id}= req.params
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) =>{
        res.send(result.rows)
    })
})



app.listen(port, () => {
    client.connect()
})