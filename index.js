import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressSession from "express-session";
import { addSector, getSector, updateSector } from "./controller/SectorController.js";
import { login, logout } from "./controller/userController.js";
import path from "path";
const __dirname = path.resolve();


dotenv.config();

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE

const app = express();

const Origin = process.env.ORIGINS || ["http://localhost:3000"];


const ORIGINS = Origin.split(",");



const corOptions = {
    origin: (origin, callback) => {
        const whitelist = ORIGINS;
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
}

const credential = (req, res, next) => {
    const listedOrigins = ORIGINS;
    const origin = req.headers.origin;
    if (listedOrigins.indexOf(origin) !== -1) {
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
}

// allow cors
app.use(credential);
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
    }
}));



// Middleware
const middleware = (req, res, next) => {
    // check if user is logged in
    // get user from cookie or session
    console.log(req.session)
    if (user) {
        req.body = { ...req.body, uid: user };
        next();
    }

    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}




// Routes
// user routes\

app.use(express.static(path.join(__dirname, 'public')));


app.post('/user/login', login);
app.get('/user/logout', logout);

app.get('/sector', middleware, getSector);
app.post('/sector', middleware, addSector);
app.post('/sector/:id', middleware, updateSector);


mongoose.set('strictQuery', true);
// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // Start the server
    app.listen();
}).catch((err) => {
    console.log(err);
})





