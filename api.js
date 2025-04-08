const { resolveSoa } = require('dns');
let express = require('express');
let app = express();
let port = 3000;
let users = [
    { id: 1, name: "John Doe",skills: ["html","javascript","typescript"]},
    { id: 2, name: "Jane Smith",skills: ["c#","c++","go"] },
    { id: 3, name: "Sam Green",skills: ["f#","php"] }
  ];
//the '/something/:parametars' are endpoints that will trigger a effect
app.use(express.json());

app.get('/test',function(req,res){
    console.log("we are in the get method")
    res.status(200).send({
        first_name:"yahya",
        last_name:"belhadj",
        users:users
    })
})
app.post('/gg/:name',(req,res)=>{
   console.log("we are in the post request")
   //when we console.log() the req.params we get the parametars in the reques url like in this case :name
   let {name} = req.params;
   //when we console.log() the req.body we get the parametars in the reques body like {"last_name":"belhadj"}
   let {last_name} = req.body;
   res.send({
    message: `your name is ${name} and your last_name ${last_name}`
   })
   console.log(res)
})
app.put('/update/:id',(req,res) =>{
    let {id} = req.params;
    let {name,email} = req.body;
    if(!id || !name || !email){
        res.status(404).send({message:"something is messing"});
    }else{
        res.status(200).send({
            message: `User with ID ${id} has been updated with name ${name} and email ${email}`
        })
    }
})
app.delete('/delete/:id',(req,res) =>{
  let {id} = req.params; 
  const index = users.findIndex(user => user.id == id);
  if(id){
    if(index != -1){
      users.splice(index, 1);
        res.status(200).send({message:`the user with the id of ${id} has been deleted`,
            user: users
        })
      }else{
        res.status(200).send({message:`no user with the id of ${id} has been found`,
          user: users
        })
      }
  }else{
    res.status(400).send("error no id was given")
  }
})
app.listen(port,()=>{
    console.log("server is running");
})