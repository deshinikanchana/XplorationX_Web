import express from 'express';
import dotenv from "dotenv";
import authRoutes, {authenticateToken} from "./routes/auth-routes";
import cors from 'cors';
import bodyParser from 'body-parser';
import homeRouter from "./routes/home-routes";
import crewRouter from "./routes/crew-routes";
import favouriteRouter from "./routes/favourite-routes";
import launchRouter from "./routes/launch-routes";
import landPadRouter from "./routes/landPad-routes";
import LaunchPadRouter from "./routes/launchPad-routes";
import noteRouter from "./routes/note-routes";
import payloadRouter from "./routes/payload-routes";
import userRouter from "./routes/user-routes";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type");

    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST','DELETE','PUT'],
        credentials: true,
    })(req, res, next);
});

console.log("Loaded SECRET_KEY:",process.env.ACCESS_TOKEN_SECRET);

app.use('/auth', authRoutes);
app.use(authenticateToken);
app.use('/home', authenticateToken, homeRouter);
app.use('/company',authenticateToken,homeRouter);
app.use('/crew',crewRouter);
app.use('/favourites',authenticateToken, favouriteRouter);
app.use('/landpads',authenticateToken,landPadRouter);
app.use('/launches',authenticateToken,launchRouter);
app.use('/launchpads',authenticateToken,LaunchPadRouter);
app.use('/notes',authenticateToken,noteRouter);
app.use('/payloads',authenticateToken,payloadRouter);
app.use('/user',authenticateToken,userRouter);



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})