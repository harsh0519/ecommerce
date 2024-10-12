import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'
import { dirname,join } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
dotenv.config()
const PORT = process.env.PORT || 3000;

//middlewares 
const app = express()
app.use(cors({
    origin: isProduction ? process.env.BASE_CLIENT_URL : "http://localhost:5173",
    optionsSuccessStatus: 200
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(indexRoutes)
app.use(express.static(join(__dirname,"..","public")))

app.get("/",(req,res) => {
    res.sendStatus(200)
})

app.listen(PORT,()=> console.log(`App is listening to ${PORT}`))