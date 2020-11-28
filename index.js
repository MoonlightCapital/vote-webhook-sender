require('dotenv').config()
const fs = require('fs')
const phin = require('phin')

const app = require('./app')

global.lists = []

const listFiles = fs.readdirSync('classes/botLists')

for(const file of listFiles) {
  const L = require(`./classes/botLists/${file}`)

  const listInstance = new L()

  if(global.lists.some(l=>l.name === listInstance.name || l.endpoint === listInstance.endpoint)) {
    console.log(`Found duplicate list name, skipping (${listInstance.name}, ${listInstance.endpoint})`)

    continue
  }

  if(process.env.NODE_ENV === 'development') console.log(listInstance)

  app[listInstance.endpointMethod](listInstance.endpoint, async (req, res) => {

    if(!(await listInstance.isValid(req, res)))
      return res.status(401).send({success: false, error: 'Error while validating the data'})

    const vote = listInstance.getVoteJSON(req, res)

    phin({
      url: process.env.WEBHOOK_URL,

      method: 'POST',

      headers: {
        'content-type': 'Application/JSON'
      },

      data: JSON.stringify({
        content: JSON.stringify(vote)
      })
    }).then(res => {
      if(res.error)
        return console.error('Error sending webhook to Discord', res.error)

      console.log('Webhook sent to discord')
    })
    .catch(e => {
      console.error('Error sending webhook to Discord', e)
    })

    if(process.env.NODE_ENV === 'development')
      res.send(vote)
    else
      res.status(200).send({success: true})
  })

  global.lists.push(listInstance)
}
