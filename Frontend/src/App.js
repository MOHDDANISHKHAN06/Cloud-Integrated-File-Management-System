import "./App.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadededSuccessfully: false,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    //call api
    axios
      .post(
        "https://pbi7voyxac.execute-api.us-east-1.amazonaws.com/prod/file-upload",
        formData
      )
      .then((response) => {
        this.setState({ selectedFile: null });
        this.setState({ fileUploadededSuccessfully: true });
      })
      .catch((error) => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else if (this.state.fileUploadededSuccessfully) {
      return (
        <div>
          <br />
          <h4>File Uploaded Successfully</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file before pressing the upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h2>File Upload System</h2>
        <h3>File Upload with React and a Serverless API!!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
