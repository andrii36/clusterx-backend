const Transport = require('../Models/transport')

class RealEstateController {
    async getAllTransport(req, res, next) {
        try {
            const transport = await Transport.find();
            res.json({
                resultCode: 0,
                messages: [],
                data: transport
            });
        } catch (err) {
            res.json({ message: err })
        }
    }

    async getTransportById(req, res, next) {
        try {
            const vehicleInfo = await Transport.findById(req.headers.vehicleid);
            res.json({
                resultCode: 0,
                messages: [],
                data: vehicleInfo
            });
        } catch (err) {
            res.json({ message: err })
        }
    }

    async getMBITransport(req, res, next) {
        try {
            if (req.query.type == "transport") {
                let list = await Transport.find()
                let randomElement
                let mbiList = []
                for (i = 0; i < 5; i++) {
                    randomElement = list[Math.floor(Math.random() * list.length)]
                    mbiList.push(randomElement)
                }
                res.json({
                    resultCode: 0,
                    messages: [],
                    data: mbiList
                });
            }
        } catch (err) {
            res.json({ message: err })
        }
    }
    
    async postNewTransportItem(req, res, next) {
        const transport = new Transport({
            title: req.body.title,
            description: req.body.description,
            owner: req.body.owner,
            contact: req.body.contact,
            color: req.body.color,
            engineType: req.body.engineType,
            year: req.body.year,
            price: req.body.price,
            image: req.body.image,
            region: req.body.region,
            city: req.body.city
        })
        try {
            const savedTransport = await transport.save();
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