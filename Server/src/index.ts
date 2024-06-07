import  express from "express";
import envConfig from "./config/EnvConfig";
import connectDB from "./db/DbConnect";
import AuthRouter from "./features/auth/Routes";
import cors from "cors"
const app= express();
app.use(express.json());
const env =envConfig();
const port=env.port;
connectDB()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use("/",AuthRouter );
app.listen(port,()=>{
    console.log("server is running on port http://localhost:"+port);
})