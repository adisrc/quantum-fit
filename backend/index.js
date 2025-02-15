import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
dotenv.config({
    path: '.env'
})
databaseConnection();
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const corsOptions = {
    origin:"http://localhost:3000",
   // credentials: true
}
app.use(cors(corsOptions))

app.use('/user',userRoute)
app.get('/home', (req, res) => {
    res.status(200).json({
        message: "you are on home page"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port no ${process.env.PORT}`);
})
