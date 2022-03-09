
const express=require("express");
const app=express();
const multer=require("multer");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");  
const postRoute=require("./routes/posts");  
const categoryRoute=require("./routes/categories");  
const path = require("path");


dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
.then(console.log("connected to mongodb"))
.catch((err)=>{
    console.log(err);
});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload=multer({storage: storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute); 
app.use("/api/posts",postRoute); 
app.use("/api/categories",categoryRoute); 




app.listen("5000",()=>{
    console.log("backened is running ");
})













 
// const express=require("express");
// require("./routes/auth");
// const app=express();
// const User=require("./models/User");
// const port = process.env.PORT ||8000;

// app.use(express.json());

// app.post("/User",(req,res)=>{
// const user=new User(req.body);
// user.save().then(()=>{
//     res.status(201).send(user);
// }).catch((e)=>{
//     res.status(400).send(e);
// })
// })

// app.listen(port,()=>{
//     console.log(`connection is setup at ${port}`)
// })