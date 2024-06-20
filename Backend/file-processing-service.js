const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const util = require("./util");

const bucketName = process.env.BUCKET_NAME;
const s3Subfolder = process.env.S3_SUBFOLDER;

async function process(requestBody) {
  const fileName = requestBody
    .split("\r\n")[1]
    .split(";")[2]
    .split("=")[1]
    .replace(/^"|"$/g, "")
    .trim();
  let fileContent = requestBody.split("\r\n")[4].trim(); // Corrected typo 'spliy' to 'split'
  fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`;
  const params = {
    Bucket: bucketName,
    Key: `${s3Subfolder}/${fileName}`,
    Body: fileContent,
  };

  await s3.putObject(params).promise();
  return util.buildResponse(200, {
    message: "File processed successfully",
    fileName,
  });
}

module.exports.process = process;
