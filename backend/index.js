import express from "express"
import mysql from "mysql"

const app = express()


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root**225",
    database:"EHR"
})

app.get("/", (req,res)=>{
res.json("hello this is the backend")
})

app.get("/patient/:", (req,res)=>{
    const q = "SELECT * FROM Patient"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*
app.get("/patient/:------", (req,res)=>{
    const q = "INSERT INTO notes ('note_id','notes','consult') VALUES (?)";
    const values = ["id from backend", "note from backend","consult from backend"];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Note has been added successfully");
    })
}
)
*/
app.listen(4000, ()=>{
    console.log("Connected to Backend")
})