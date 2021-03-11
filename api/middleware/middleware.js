const User = require('../users/users-model')

function logger (req, res, next) {
 const timestamp = new Date()
 const method = req.method;
 const url = req.url;
 const log = `${method}:${url}:${timestamp}`
 console.log(log)
 next()
  // DO YOUR MAGIC
}

const validateUserId= async( req, res, next)=> {
  try{
    const users = await User.getById(req.params.id)
    if(!users) {
      res.status(404).json({
        message: "user not found"
      })
    }else{
      req.users = users
      next()
    }
  }catch (err) {
    next(err)
  }
}

const validateUser= (req, res, next) => {
  if(!req.body) {
    res.status(400).json({message: "missing user data"})
  }else if(!req.body.name){
      res.status(400).json({message: "missing required name"})
    }else{
      next()
    }
  }
  // DO YOUR MAGIC


const validatePost= (req, res, next) => {
  if(!req.body) {
    res.status(400).json({message: "missing post data"})
  }else{
    if(!req.body.text || !req.body.user_id){
      res.status(400).json({message: "missing required text or user_id fields"})
    }else{
      next()
    }
  }
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost

}