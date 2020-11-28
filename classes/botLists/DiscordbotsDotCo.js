const BaseList = require('../BaseList')

module.exports = class DiscordBoats extends BaseList {
  constructor() {
    super()

    this.name = 'dotco'
    this.endpoint = '/dotco'
    this.hasAuth = true
    this.authToken = process.env.DISCORDBOTSDOTCO_TOKEN
  }

  async isValid(req, res) {
    return req.body.type === 'vote'
  }

  getVoteUser(req, res) {
    return req.body.userId
  }

}
