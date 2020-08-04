const BaseList = require('../BaseList')

module.exports = class BotlistSpaceList extends BaseList {
  constructor() {
    super()

    this.name = 'space'
    this.endpoint = '/space'
    this.hasAuth = true
    this.authToken = process.env.BOTLISTSPACE_TOKEN
  }

  getVoteUser(req, res) {
    return req.body.user.id
  }

}
