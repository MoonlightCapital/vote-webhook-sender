const BaseList = require('../BaseList')

module.exports = class DiscordBoats extends BaseList {
  constructor() {
    super()

    this.name = 'boats'
    this.endpoint = '/boats'
    this.hasAuth = true
    this.authToken = process.env.BOATS_TOKEN
  }

  getVoteUser(req, res) {
    return req.body.user.id
  }

}
