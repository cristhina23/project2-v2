const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const mongodb = require('./db/connect');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization');
    next();
  })
  .use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization"
}))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ?`Logged in as ${req.session.user.displayName}` : 'logged out');
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
  (req, res) => {
     req.session.user = req.user;
    res.redirect('/');
  }
)

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'))



app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5000;

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }
})