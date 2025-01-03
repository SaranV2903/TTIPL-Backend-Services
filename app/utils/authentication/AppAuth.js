const Log = require('../logger/logger').log
const StatusCode = require('../common/constant')

/**
 * Date: 02-03-2022
 * Author: Karthika
 * Description: Service token authorization
 */
module.exports = (request, response, next) => {
  try {
    const token = request.headers.apptoken
    if (process.env.APP_TOKEN_SECRET_KEY) {
      if (token !== process.env.APP_TOKEN_SECRET_KEY) {
        response.status(StatusCode.statusCode.UNAUTHRIZED_ACCESS).send({
          status: StatusCode.statusCode.UNAUTHRIZED_ACCESS,
          data: {
            message: StatusCode.errorMessage.INVALID_APP_TOKEN
          }
        })
      } else if (token == '') {
        response.status(StatusCode.statusCode.UNAUTHRIZED_ACCESS).send({
          status: StatusCode.statusCode.UNAUTHRIZED_ACCESS,
          data: { message: StatusCode.errorMessage.EMPTY_APP_TOKEN }
        })
      } else {
        next()
      }
    } else {
      response.status(StatusCode.statusCode.UNAUTHRIZED_ACCESS).send({
        status: StatusCode.statusCode.UNAUTHRIZED_ACCESS,
        data: { message: StatusCode.errorMessage.APP_TOKEN_EXPECTED }
      })
    }
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
