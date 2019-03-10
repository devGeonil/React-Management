import express from "express";
import bodyParser from "body-parser"
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/customers", (req, res)=>{
  res.send([
      {
        "id":1,
        "image":"https://placeimg.com/64/64/1",
        "name" : "geonil",
        "birthday" : "920105",
        "gender" : "mail",
        "job" : "dev"
      },
      {
        "id":2,
        "image":"https://placeimg.com/64/64/2",
        "name" : "gildong",
        "birthday" : "920512",
        "gender" : "femail",
        "job" : "dev1"
      },
      {
        "id":3,
        "image":"https://placeimg.com/64/64/3",
        "name" : "yoonha",
        "birthday" : "9244",
        "gender" : "femail",
        "job" : "dev2"
      }
  ]);
})

app.listen(port, ()=>console.log(`Listening on port ${port}`))
