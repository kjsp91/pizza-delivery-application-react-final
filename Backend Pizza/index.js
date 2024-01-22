var express = require('express');
var bp = require('body-parser')
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.use(cors())
app.use(bp.urlencoded({extended:true}))
app.use(bodyParser.json())
const port = process.env.PORT || 4800

app.listen(port,(req,res)=>{
    console.log("Server Started");
})
const oracledb = require("oracledb");
oracledb.initOracleClient();
// Set database connection details 
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:1521/xe"
};

async function run(){
  let connection;
  try{
    connection = await oracledb.getConnection(dbConfig);
    console.log("Connected to Oracle DB");
    app.get("/",async (req,res)=>{
        try{
            const result = await connection.execute(`SELECT * FROM reviews`);
            console.log(result.rows)
            res.json(result.rows)
        }catch(err){
            console.log(err)
        }
    })
    app.post("/create",async (req,res)=>{
        const {name,dcpn,rating,imgurl} = req.body;
        console.log(name,dcpn,rating,imgurl) 
        try{
            let oldid = await connection.execute(`SELECT MAX(id) from reviews`) 
            id = oldid.rows[0][0] +  1
            const result = await connection.execute(`INSERT INTO reviews(id,name,dcpn,rating,imgurl) VALUES(${id},'${name}','${dcpn}','${rating}','${imgurl}')`);
            console.log(result)
            await connection.commit();
            res.send("Data Inserted")
        }catch(err){
            console.log(err)
        }
  })
  app.put("/update/:id",async(req,res)=>{
    const {name,dcpn,rating,imgurl} = req.body
    const currentid = parseInt(req.params.id)
    try{
      const updateresult = await connection.execute(`UPDATE reviews SET name = '${name}', dcpn = '${dcpn}', rating = '${rating}', imgurl = '${imgurl}' WHERE id=${currentid}`);
      console.log(updateresult);
      await connection.commit();
      res.json("Data Updated")
    }catch(err){
      console.log(err)
    }
  })
  app.delete("/delete/:id",async(req,res)=>{
    console.log((req.params.id))
    try{
      const deleteresult = await connection.execute(`DELETE FROM reviews WHERE id=:id`,{ id: parseInt(req.params.id) },{autoCommit:true})
      console.log(deleteresult)
      res.json("deleted")                             
    }catch(err){ 
      console.log(err)
    } 
  })  
  app.post("/order",async(req,res)=>{
    const {cname,deliveryaddr,phno,orderitems,amount} = req.body;
    console.log(cname,deliveryaddr,phno,orderitems,amount) 
    try{
        let oldid = await connection.execute(`SELECT MAX(id) from pizzaorders`) 
        id = oldid.rows[0][0] +  1
        const result = await connection.execute(`INSERT INTO pizzaorders(id,cname,deliveryaddr,phno,orderitems,amount) VALUES(${id},'${cname}','${deliveryaddr}','${phno}','${orderitems}',${amount})`);
        console.log(result)
        await connection.commit();
        res.send("Data Inserted")
    }catch(err){
        console.log(err)
    } 
  })
  } 
  finally{
    // if(connection){ 
    //   try{
    //     await connection.close()
    //     console.log("Connection closed")
    //   }catch(err){
    //     console.log(err)
    //   }
    // }
  }
}
run()