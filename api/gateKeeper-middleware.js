
const gateKeeper = (req, res, next) => {
    // new way of reading data sent by the client
      const password = req.headers.password || "";
      password ? password.toLowerCase() === 'mellon' ? next() : res.status(401).json({you: 'cannot pass!!' }) : res.status(400).json({message: 'Please provide a password'})
    }

    module.exports = gateKeeper;