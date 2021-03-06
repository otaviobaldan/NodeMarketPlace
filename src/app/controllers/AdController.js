const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt',
      populate: ['author']
    })

    if (!ads) {
      return res.status(404).json({ message: 'No ads found' })
    }

    return res.status(200).json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id)
    if (!ad) {
      return res.status(404).json({ message: 'No ads found' })
    }

    return res.status(200).json(ad)
  }

  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.status(200).json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.status(200).json(ad)
  }

  async destroy (req, res) {
    await Ad.findOneAndDelete(req.params.id)

    return res.status(200).json({ message: 'Ad deleted' })
  }
}

module.exports = new AdController()
