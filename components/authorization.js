module.exports = (req, res, next) => {
  console.dir(req.baseUrl + req.path)

  const list = lists.find(l=>l.endpoint === req.baseUrl + req.path)

  if(!list) {
    console.log(`Endpoint ${req.baseUrl} is not a bot list, skipping auth checks`)

     return next()
  }

  console.log(list.getAuth(req, res), list.validateAuth(req, res))

  if(list.hasAuth && !list.getAuth(req, res)) {
    return res.status(401).send({error: 'No authorization provided'})
  }


  if(list.validateAuth(req, res) === false) {
    return res.status(403).send({error: 'Invalid authorization'})
  }

  next()
}
