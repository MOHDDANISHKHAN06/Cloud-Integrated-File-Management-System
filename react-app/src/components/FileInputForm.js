import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FileInputForm = () => {
  const initialValues = {
    inputText: "",
    file: null,
  };

  const validationSchema = Yup.object().shape({
    inputText: Yup.string().required("Input text is required"),
    file: Yup.mixed().required("A file is required"),
  });

  const handleFormSubmit = async (values) => {
    // First, get the pre-signed URL from the API
    try {
      const apiResponse = await axios.post(
        "https://qaw2nm5c74.execute-api.us-east-1.amazonaws.com/prod/upload",
        { inputText: values.inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { uploadUrl, filePath } = apiResponse.data;

      // Then, use the pre-signed URL to upload the file directly to S3
      const fileResponse = await axios.put(uploadUrl, values.file, {
        headers: {
          "Content-Type": values.file.type, // Ensure correct content type is set
        },
      });

      console.log("File uploaded successfully:", fileResponse.data);
      console.log("File path:", filePath);

      // Optionally, notify your backend or another service that the file has been uploaded
      // Example: POST request to your service to record the upload completion or further processing
    } catch (error) {
      console.error(
        "Error during the file upload process:",
        error.response || error
      );
    }
  };

  return (
    <div>
      <h1>Upload your file and input text</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="inputText">Text Input:</label>
              <Field name="inputText" type="text" />
              <ErrorMessage name="inputText" component="div" />
            </div>
            <div>
              <label htmlFor="file">File Input:</label>
              <input
                name="file"
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="file" component="div" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FileInputForm;
