const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Purchase', PurchaseSchema)
