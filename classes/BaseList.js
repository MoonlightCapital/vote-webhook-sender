const TWELVE_HOURS = 432e5
const uuid = require('uuid')
const {version} = require('../package')

module.exports = class BaseList {
  constructor() {

    this.name = 'unnamed'
    this.endpoint = '/'
    this.endpointMethod = 'post'
    this.hasAuth = true
    this.authToken = 'aa752c9c-dc69-47f4-bd18-f0920e99bf59'

  }

  getAuth(req, res) {
    return req.headers.authorization
  }

  getVoteUser(req, res) {
    return '256460316660072448'
  }

  getVoteValue(req, res) {
    return 1
  }

  validateAuth(req, res) {
    return this.hasAuth ? this.getAuth(req, res) === this.authToken : true
  }

  getVoteJSON(req, res) {

    return {
      v: version,
      nonce: uuid.v4(),
      list: this.name,
      user: this.getVoteUser(req, res),
      value: this.getVoteValue(req, res)
    }
  }

}
