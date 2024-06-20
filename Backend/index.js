const fileProcessingService = require("./file-processing-service");
const s3EventService = require("./s3-event-service");
const util = require("./util");
const fileUploadPath = "/file-upload";

exports.handler = async (event) => {
  console.log("Request Event: ", event);
  let response;

  if (event.Records && event.Records[0].eventSource === "aws:s3") {
    // Handle S3 event
    response = await s3EventService.process(event.Records);
  } else {
    // Handle API Gateway request
    switch (true) {
      case event.httpMethod === "POST" && event.path === fileUploadPath:
        response = await fileProcessingService.process(event.body);
        break;
      default:
        response = util.buildResponse(404, "Not Found");
    }
  }
  return response;
};
