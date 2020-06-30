 if (process.env.NODE_ENV !== 'production') {
   require('dotenv').load()
 }
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser') 
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const employerRouter = require('./routes/employers')
const jobRouter = require('./routes/jobs')
  
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts) 
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))
 
//mongoose.connect('mongodb://localhost/jobs', 
mongoose.connect("mongodb+srv://hannah:hanna@eventsdb-kcpmt.mongodb.net/job?retryWrites=true&w=majority",
{
   useNewUrlParser: true,   useCreateIndex: true, useUnifiedTopology: true 
 }) .then(() => console.log('local mongoDB connected'))
 .catch(err => console.log('Something went wrong', err))

app.use('/', indexRouter)
app.use('/employers', employerRouter)
app.use('/jobs', jobRouter)

app.listen(process.env.PORT || 3000)
