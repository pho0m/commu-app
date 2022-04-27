import { useState } from "react";
import { v4 } from "uuid";
import Swal from "sweetalert2";

import { storage } from "./firebase_config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ProgressBar } from "react-bootstrap";

const Upload = (props) => {
  const [file2upload, setFile2Upload] = useState("");
  const [getUploadedFile, setGetUploadedFile] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadFile = () => {
    if (!file2upload) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return;
    }

    const pathname = "/images/"; // Set pathname as wanted.
    const fileRef = ref(storage, pathname + v4() + "_" + file2upload.name);
    const uploadTask = uploadBytesResumable(fileRef, file2upload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Check on progress change
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(prog));
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      },
      () => {
        // When the upload is done.
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            document.getElementById("fileInput").value = "";
            setGetUploadedFile(url);
            Swal.fire({
              icon: "success",
              title: "Upload is complete",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            })
          );
      }
    );
  };

  return (
    <div className="container">
      <h1 className="text-center bg-light text-secondary">Upload File</h1>
      <br />
      <ProgressBar animated now={progress} />
      <div>Progress: {progress}%</div>
      <br />
      <input
        type="file"
        id="fileInput"
        onChange={(e) => setFile2Upload(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload File</button>
      <hr />
      {getUploadedFile ? (
        <div>
          <img
            src={getUploadedFile}
            style={{ objectFit: "cover", width: "500px", height: "500px" }}
            alt="uploaded file"
          />
          <hr />
          <span>Link: </span>
          <a href={getUploadedFile} target="_blank">
            {getUploadedFile}
          </a>
        </div>
      ) : (
        <div>No File please click choose file</div>
      )}
    </div>
  );
};
export default Upload;
