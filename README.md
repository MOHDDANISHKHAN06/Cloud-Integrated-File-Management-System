# Cloud-Integrated File Management System

This project aims to implement a secure and scalable web application that allows users to upload files directly to AWS S3, manage file metadata in DynamoDB, and trigger automated processes via AWS Lambda functions.

## Features

- **Secure File Upload**: Users can upload files directly to a designated AWS S3 bucket through a responsive web UI, built with React.
- **Metadata Management**: Upon upload, file metadata is automatically saved to an AWS DynamoDB table.
- **Serverless Architecture**: Leveraging AWS Lambda for backend processes ensures that the setup is serverless, scalable, and maintainable.
- **Automation**: Post-upload processes are automated, including metadata storage and triggering scripts on AWS EC2 instances via DynamoDB streams.

## Technologies Used

- **ReactJS**: For building a dynamic and responsive frontend.
- **AWS S3**: To store and retrieve files securely.
- **AWS DynamoDB**: For efficient metadata storage.
- **AWS Lambda**: To handle backend logic and serverless functions.
- **AWS API Gateway**: For secure API management.
- **AWS EC2**: For running scripts based on file uploads.
- **AWS CDK**: To define cloud infrastructure as code.

## Setup and Installation

### Prerequisites

- Node.js and npm
- AWS CLI configured with Administrator access
- AWS CDK
