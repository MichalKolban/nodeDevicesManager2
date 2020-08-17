const express = require('express')
const DeviceModel = require('./../models/deviceModel')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/devices', { useUnifiedTopology: true, useNewUrlParser: true })

router.get('/addNewDevice', (req,res) => {
    res.render('addNewDevice', {device: new DeviceModel()})
})

router.post('/', async (req, res) => {
    let device = new DeviceModel({
        name: req.body.name,
        company: req.body.company,
        quantity: req.body.quantity,
        price: req.body.price,
        imgString: req.body.imgString
    })

    if (checkCompany(device.company)) {

        try {
            console.log(device)
            device = await device.save()
            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.render('addNewDevice', {
                device: device
            })
        }
    } else {
        console.log('probably wrong company Name')
        res.send("Sorry, I can't handle this error right now, company name was wrong " + device.company)
    }
})

router.get('/:id', async (req,res) => {

    console.log(req.params.id)
    const device = await DeviceModel.findOne({_id: req.params.id})
    console.log(device)
    // console.log(req.body.name)
    // console.log(req.body.company)
    // res.render('/editDevice', {device: device})
    res.render('editDevice')
})


router.put('/:id', async (req,res) => {
    let oldDevice = await DeviceModel.findById(req.params.id)
    console.log('hello from put ' + req.body)
    console.log('old device  ' + oldDevice)
    
    oldDevice.name = req.body.name
    oldDevice.company = req.body.company
    oldDevice.quantity = req.body.quantity
    oldDevice.price = req.body.price
    oldDevice.imgString = req.body.imgString

})

router.delete('/:id', async(req,res) => {
    await DeviceModel.findByIdAndDelete(req.params.id)
    res.redirect('/')
})



// validate functions

function checkCompany(name){

    const compArr = ['Apple', 'Google', 'LG', 'Sony'];

    if(compArr.includes(name)){
        return true;
    }else {
        return false;
    }

}

module.exports = router