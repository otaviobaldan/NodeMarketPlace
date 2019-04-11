const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class AcceptController {
  async store (req, res) {
    const { id } = req.params

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the ad author" })
    }

    if (ad.purchasedBy) {
      return res.status(404).json({ message: 'This Ad is already purchased' })
    }

    ad.set({
      purchasedBy: id
    })

    await ad.save()

    return res.status(200).json(ad)
  }
}

module.exports = new AcceptController()
