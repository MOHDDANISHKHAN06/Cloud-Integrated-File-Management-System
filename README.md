# Cloud-Integrated File Management System

This project demonstrates a file upload system built using React for the frontend and AWS services for the backend. It involves uploading files to an S3 bucket, triggering a Lambda function to process the files, and storing metadata in DynamoDB.

## Project Overview

The system consists of:

1. **Frontend Application**: Built with React.
2. **API Gateway**: To handle HTTP requests.
3. **Lambda Functions**: To process file uploads and store metadata.
4. **S3 Bucket**: To store the uploaded files.
5. **DynamoDB Table**: To store metadata about the files.

## Features

- **File Upload**: Users can upload files through a web interface.
- **Serverless Processing**: Uploaded files are processed using AWS Lambda.
- **Metadata Storage**: File metadata is stored in a DynamoDB table.
- **Scalable Architecture**: The system uses serverless technologies, making it scalable and cost-efficient.

## Setup Instructions

### Prerequisites

- Node.js and npm
- AWS account

### Frontend Setup

1. **Create a React App:**
    ```bash
    npx create-react-app file-upload-system
    cd file-upload-system
    ```

2. **Install Axios:**
    ```bash
    npm install axios
    ```

3. **Modify `App.js` and other related files** in the `src` directory as per the project requirements.

4. **Build and Deploy:**
    ```bash
    npm run build
    ```

### Backend Setup

1. **Create IAM Role:**
    - Go to IAM in AWS console.
    - Create a new role for Lambda with the following policies:
        - AmazonS3FullAccess
        - CloudWatchLogsFullAccess
        - AmazonDynamoDBFullAccess

2. **Create S3 Bucket:**
    - Go to S3 in AWS console.
    - Create a new bucket and enable versioning and server-side encryption.

3. **Create DynamoDB Table:**
    - Go to DynamoDB in AWS console.
    - Create a table with `Resource_id` as the primary key.

4. **Create Lambda Functions**:
    - `index.js`
    - `file-processing-service.js`
    - `s3-event-service.js`
    - `util.js`

    Add your Lambda function code to these files.

5. **Enable CORS for API Gateway:**
    - Go to API Gateway console.
    - Navigate to your API.
    - Select the resource and enable CORS.

6. **Deploy the API:**
    - In API Gateway console, select your API and deploy it to a stage (e.g., prod).

### Additional Configuration

1. **Test the Setup:**
    - Use the frontend application to upload a file.
    - Verify the file is uploaded to the S3 bucket.
    - Check DynamoDB for the metadata entry.

## Acknowledgements

- This project was inspired by various AWS tutorials and documentation.
- Special thanks to the creators of the videos used for guidance.
