const AWS = require('aws-sdk')
const fs = require('fs')

//TODO set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env variables
const lambda = new AWS.Lambda({
  //TODO
  region: 'eu-west-1'
})

lambda.invoke({
  //TODO
  FunctionName: 'jsfunction',
  Payload: JSON.stringify({
    renderRequest: {
      template: {
        name: 'social-certificate'
      }
    }
  })
}, (err, res) => {
  if (err) {
    return console.error(err)
  }
  
  const response = JSON.parse(res.Payload)
  if (response.errorMessage) {
    console.log(response.errorMessage)
    console.log(response.stackTrace)
  } else {
    fs.writeFileSync('report.pdf', Buffer.from(response.body, 'base64'))
  }
})