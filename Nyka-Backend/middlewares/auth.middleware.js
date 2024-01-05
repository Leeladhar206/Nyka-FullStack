const jwt = require('jsonwebtoken');
const { BlackListModel } = require('../model/blacklist.model');

require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || null;

  try {
    if (!token) {
      return res.status(400).send({ msg: 'Please Login first!!' });
    }

    const tokenInBlackList = await BlackListModel.findOne({ blackList: { $in: token } });

    if (tokenInBlackList) {
      return res.status(400).send({ msg: 'Please Login !!' });
    }

    jwt.verify(token, process.env.Key, (err, decodedToken) => {
      if (err) {
        return res.status(200).send({ msg: 'Please Login!!' });
      }
      next(); 
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = { authMiddleware };

