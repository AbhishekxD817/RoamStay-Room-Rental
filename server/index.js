import express from 'express';
import 'dotenv/config';
import connectDb from './utils/db.js';
import listingRouter from './routers/listing-router.js';
import reviewRouter from './routers/review-router.js';
import ExpressErrors from './utils/ExpressErrors.js';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin:"http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/listings/:lid/reviews',reviewRouter);
app.use('/listings',listingRouter);


app.get('/',(req,res,next)=>{
    res.send("Server is Started");
})





app.all("*",(req,res,next)=>{
    return next(new ExpressErrors(404,"Resource Not Found"));
})

app.listen(process.env.PORT,async ()=>{
    console.log("Server Started => http://localhost:"+process.env.PORT);
    await connectDb();
})

app.use((error,req,res,next)=>{
    let { status = 500 , message = "INTERNAL SERVER ERROR"} = error;
    return res.status(status).json({
        message
    })
})