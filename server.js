const express = require('express');
const cors = require('cors');
const app = express();
const {MongoClient, ObjectId} = require("mongodb");

app.use(express.json());
app.use(cors());

const DATABASE_NAME = "University";
const COLLECTION_NAME="todos";
const connectionString = `mongodb+srv://Soumya:Soumya@cluster0.utlrqlo.mongodb.net/University`;
let db;

const todoAppRoutes = express.Router();
app.use("/todos", todoAppRoutes);

todoAppRoutes.route("/").get((req,res)=>{
    db.collection(COLLECTION_NAME).find().toArray((err, items)=>{
        if(err){
            res.send(err);
        }
        res.send(items);
    })
});


todoAppRoutes.route("/add").post((req,res)=>{
    const data_object = req.body;
    db.collection(COLLECTION_NAME).insertOne(data_object, (err, info)=>{
        res.json(info);
    })
})

MongoClient.connect(connectionString,{useNewUrlParser:true}, (error, client)=>{
    if(error){
        console.log("Connection failed");
        console.log(error);
        return;
    } else {
        console.log("Connection successful");
        db = client.db(DATABASE_NAME);
        app.listen(4000, ()=>{
            console.log("server started successfully");
        })
    }
});


