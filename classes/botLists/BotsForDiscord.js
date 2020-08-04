const BaseList = require('../BaseList')

module.exports = class BotsForDiscordList extends BaseList {
  constructor() {
    super()

    this.name = 'bfd'
    this.endpoint = '/bfd'
    this.hasAuth = true
    this.authToken = process.env.BOTSFORDISCORD_TOKEN
  }

  getVoteUser(req, res) {
    return req.body.user
  }

}
