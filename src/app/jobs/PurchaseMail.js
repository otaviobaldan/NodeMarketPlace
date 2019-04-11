const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { userAd, content, purchaseAd } = job.data

    await Mail.sendMail({
      from: '"Otavio Baldan" <obaldan@hotmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { user: userAd, content, ad: purchaseAd }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
