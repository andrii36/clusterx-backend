const RealEstate = require('../Models/realEstate')
const Transport = require('../Models/transport')

class SearchController {
    async search(req, res, next) {
        const searchKey = req.query.s;
        try {
            let transport = await Transport.find();
            let realEstates = await RealEstate.find();
            let allItemsList
            if (!searchKey) {
                allItemsList = [...transport, ...realEstates]
            } else {
                let selectedTr = transport.filter(e => e.title.toLowerCase().replace(/\s+/g, '') == searchKey.toLowerCase().replace(/\s+/g, ''))
                let selectedRE = realEstates.filter(e => e.title.toLowerCase().replace(/\s+/g, '') == searchKey.toLowerCase().replace(/\s+/g, ''))

                allItemsList = [...selectedTr, ...selectedRE]
            }

            if (allItemsList.length === 0) {
                res.json({
                    resultCode: 0,
                    messages: ["Data was not found"],
                    data: []
                })
            } else {
                res.json({
                    resultCode: 0,
                    messages: [],
                    data: allItemsList
                })
            }

        } catch (err) {
            res.json({ message: err })
        }
    }
}

module.exports = new SearchController()