const express = require('express');
const router = express.Router();
const RealEstate = require('../Models/realEstate');
const verify = require('../verifyToken');

router.get('/', verify, async (req, res) => {
    try {
        const realEstates = await RealEstate.find();
        res.json({
            resultCode: 0,
            messages: [],
            data: realEstates
        });
    } catch (err) {
        res.json({ message: err })
    }
})
router.post('/', async (req, res) => {
    const realEstate = new RealEstate({
        title: req.body.title,
        description: req.body.description,
        owner: req.body.owner,
        contact: req.body.contact,
        rooms: req.body.rooms,
        floor: req.body.floor,
        year: req.body.year,
        price: req.body.price,
        image: req.body.image,
        region: req.body.region,
        city: req.body.city
    })
    try {
        const savedRealEstate = await realEstate.save();
        res.json({
            resultCode: 0,
            messages: [],
            data: {}
        });
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;