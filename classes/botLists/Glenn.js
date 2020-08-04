const BaseList = require('../BaseList')

module.exports = class GlennList extends BaseList {
  constructor() {
    super()

    this.name = 'glenn'
    this.endpoint = '/glenn'
    this.hasAuth = true
    this.authToken = process.env.GLENN_TOKEN
  }

  getVoteUser(req, res) {
    return req.body.id
  }

}
