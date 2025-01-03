const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

/**
 * Date: 02-03-2022
 * Author: Karthika
 * Description: Swagger API document
 */
const swaggerDocs = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      // openapi: "3.0.1",
      info: {
        title: 'Node Rest API Documentation',
        version: '1.0.0',
        description: 'Node rest API document generated using swagger'
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        },
        appToken: {
          type: 'apiKey',
          name: 'appToken',
          in: 'header'
        }
      }
    },
    apis: ['./app/routes/*.js']
  }
  const swaggerDocsJs = swaggerJsDoc(swaggerOptions)

  const swaggerUiOptions = {
    customSiteTitle: 'Node Rest API'
  }

  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocsJs, swaggerUiOptions)
  )
}

module.exports = swaggerDocs
