import express from "express"
import "dotenv/config"
import webRoutes from "./routes/web"
import initDataUser from "config/seed"
import passport from "passport"
import configPassportLocal from "src/middlerware/passport.local"
import session from "express-session"
const app = express()
const PORT = process.env.PORT || 8080

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body 
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//config statics files: publish - images/css/js
app.use(express.static('public'));

//config session
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
}))

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();
//config routes


webRoutes(app);

initDataUser()

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);
})