const express = require('express')
const app = express();
const deviceModel = require('./models/deviceModel')
const devicesRouter = require('./routes/devices')
const methodOverride = require('method-override')


app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}))
app.use('/', devicesRouter)

app.get('/', async (req,res) => {

    const devices = await deviceModel.find()

    res.render('index', {devices: devices})
})

app.get('/addNewDevice', (req,res) => {
    res.render('addNewDevice')
})


app.listen(4000, function(){
    console.log('3 2 1 server started')
})