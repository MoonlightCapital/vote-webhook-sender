require('dotenv').config()
const fs = require('fs')

const app = require('./app')
const {WebhookClient} = require('discord.js')

const webhook = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)

global.lists = []

const listFiles = fs.readdirSync('classes/botLists')

for(const file of listFiles) {
  const L = require(`./classes/botLists/${file}`)

  const listInstance = new L()

  if(global.lists.some(l=>l.name === listInstance.name || l.endpoint === listInstance.endpoint)) {
    console.log(`Found duplicate list name, skipping (${listInstance.name}, ${listInstance.endpoint})`)

    continue
  }

  console.log(listInstance)

  app[listInstance.endpointMethod](listInstance.endpoint, (req, res) => {

    webhook.send(JSON.stringify(listInstance.getVoteJSON(req, res)))

    if(process.env.NODE_ENV === 'development')
      res.send(listInstance.getVoteJSON(req, res))
    else
      res.status(200).send({success: true})
  })

  global.lists.push(listInstance)
}
