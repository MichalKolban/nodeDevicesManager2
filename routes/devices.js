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
    res.render('editDevice', {device: device})
})


router.put('/:id', async (req, res) => {
    let editDevice = await DeviceModel.findById(req.params.id)

    editDevice.name = req.body.name
    editDevice.company = req.body.company
    editDevice.quantity = req.body.quantity
    editDevice.price = req.body.price
    editDevice.imgString = req.body.imgString
    // check if comapny is validate
    try {
        editDevice = await editDevice.save()
        console.log('data saved in mongo db')
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }

    res.redirect('/')
})

router.delete('/:id', async(req,res) => {
    await DeviceModel.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// validate functions

function checkCompany(name){
    const companyArr = ['Apple', 'Google', 'LG', 'Sony'];
    return companyArr.includes(name) ? true : false;
}

module.exports = router