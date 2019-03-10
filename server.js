import express from "express";
import bodyParser from "body-parser"
import fs from "fs";
import mysql from "mysql";

import multer from "multer";
const upload = multer({dest:'./upload'});

const app = express();
const port = process.env.PORT || 5000;


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const connection = mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database
});
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/image', express.static('./upload'));



app.get("/api/customers", (req, res)=>{
  connection.query("SELECT * FROM customer", (err, rows, fields)=>res.send(rows))
})

app.post("/api/customers", upload.single('image'), (req, res)=>{
  let sql = `INSERT INTO customer VALUES (null, ? , ? , ? , ? , ?)`;
  let image = '/image/'+req.file.filename;
  let cname = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let params = [image, cname, birthday, gender, job ];
  connection.query(sql, params, (error, rows, fields)=>{
    res.send(rows);
  })

})

app.listen(port, ()=>console.log(`Listening on port ${port}`))
