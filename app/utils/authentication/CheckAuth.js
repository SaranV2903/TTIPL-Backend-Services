const jwt = require('jsonwebtoken')
const Log = require('../logger/logger').log

/**
 * Date: 02-03-2022
 * Author: Karthika
 * Description: Service token authorization
 */
module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
    request.userData = decoded
    next()
  } catch (error) {
    Log.error(
      '{ middleware: Authorization, type: Exception, status: 401, error: ' +
                error +
                ' }'
    )
    response
      .status(401)
      .send({ status: 401, message: 'Unauthorized token' })
  }
}
