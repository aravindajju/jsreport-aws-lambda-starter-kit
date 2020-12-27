const chromium = require('chrome-aws-lambda')
const JsReport = require('jsreport')
const promisify = require('util').promisify
const ncp = promisify(require('ncp'))
const path = require('path')
const fs = require('fs')
const AWS = require('aws-sdk');
const util = require('util');

// get reference to S3 client
const s3 = new AWS.S3();


let jsreport


const init = (async () => {    
    jsreport = JsReport({
        configFile: path.join(__dirname, 'prod.config.json'),        
        chrome: {
            launchOptions: {
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: chromium.headless,
            }         
        }
    })
    await ncp(path.join(__dirname, 'data'), '/tmp/data')
    return jsreport.init()
})()

exports.handler = async (event) => {  
  await init
  console.log("Incoming event "+ JSON.stringify(event))
  
  var templateRequest;
  
  if (event.body) {
        let body = JSON.parse(event.body)
        var bib
        var outputtype;
        console.log("Incoming event body "+ JSON.stringify(body))
        if (body.renderRequest) 
            templateRequest = body.renderRequest;
            if(templateRequest.outputtype)
                outputtype=templateRequest.outputtype;
          }else if(event.renderRequst){
            templateRequest = event.renderRequst;
         }

  const res = await jsreport.render(templateRequest)
  bib=templateRequest.data.bib;
  if(templateRequest.outputtype)
	var filename= bib +"-cert.png"
  else
	var filename= bib +"-cert.pdf"
  
  console.log("File name "+ filename)

   try {
        var contenttype="application/pdf";
        if(outputtype) contenttype=outputtype;
        const destparams = {
            Bucket: "fizztival",
            Body: res.content,
            Key: filename,
            ContentType: contenttype,
            ACL:'public-read'
        };
        const putResult = await s3.putObject(destparams).promise(); 
    } catch (error) {
        console.log(error);
        return;
    }
    
  console.log("Finishing writing  to S3");


  var message = {message:"success",url: "https://fizztival.s3.amazonaws.com/" + filename}

  var response = {
        "statusCode": 200,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        "body": JSON.stringify(message),
        "isBase64Encoded": false
  };
  console.log("Return response " + JSON.stringify(response));
  return response;
  
}
