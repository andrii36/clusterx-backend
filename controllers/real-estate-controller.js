const RealEstate = require('../Models/realEstate')

class RealEstateController {
    async getAllRealEstate(req, res, next) {
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
    }

    async postNewRealEstateItem(req, res, next) {
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
    }
}

module.exports = new RealEstateController()