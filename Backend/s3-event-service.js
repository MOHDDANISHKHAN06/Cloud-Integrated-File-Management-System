const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME; // Use environment variable for table name

function generateRandomId() {
  return Math.floor(Math.random() * 1e9).toString();
}

async function process(records) {
  for (const record of records) {
    const bucketName = record.s3.bucket.name;
    const objectKey = record.s3.object.key;
    const size = record.s3.object.size || -1;
    const eventName = record.eventName;
    const eventTime = record.eventTime;

    const params = {
      TableName: tableName,
      Item: {
        Resource_id: generateRandomId(),
        Bucket: bucketName,
        Object: objectKey,
        Size: size,
        Event: eventName,
        EventTime: eventTime,
      },
    };

    try {
      await dynamodb.put(params).promise();
      console.log(`Successfully inserted metadata for ${objectKey}`);
    } catch (error) {
      console.error(`Error inserting metadata for ${objectKey}: `, error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Processed S3 event successfully" }),
  };
}

module.exports.process = process;
