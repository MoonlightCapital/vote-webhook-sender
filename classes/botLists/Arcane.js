const BaseList = require('../BaseList')

module.exports = class ArcaneList extends BaseList {
  constructor() {
    super()

    this.name = 'arcane'
    this.endpoint = '/arcane'
    this.hasAuth = true
    this.authToken = process.env.ARCANE_TOKEN
  }

  getVoteUser(req, res) {
    return req.body.author.user.id
  }

}
