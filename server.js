const  express=require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const dbConnection = require('./models/db');
const  app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.set('views','views')

// Set Cookie Parser, sessions and flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


app.use('/',require('./routes/user.route'))

app.use((req, res, next) => {
    res.locals.error = req.flash();
    next();
  });


app.use((req, res,next)=>{
   res.send('<h1> Page not found </h1>');
});
  
app.listen(3000,()=>{
    dbConnection()
    console.log('app  started')
})