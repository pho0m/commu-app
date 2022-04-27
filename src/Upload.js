import { useState } from "react";
import { v4 } from "uuid";

import { storage } from "../firebase_config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Upload = (props) => {
  const [file2upload, setFile2Upload] = useState("");
  const [getUploadedFile, setGetUploadedFile] = useState("");
  const [progress, setProgress] = useState(0);
  const uploadFile = () => {
    if (file2upload == null) return;

    const pathname = "/images/"; // Set pathname as wanted.
    const fileRef = ref(storage, pathname + v4() + file2upload.name);

    const uploadTask = uploadBytesResumable(fileRef, file2upload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Check on progress change
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(prog));
      },
      (err) => {
        // if Error while uploading
        window.alert(err);
      },
      () => {
        // When the upload is done.
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            document.getElementById("fileInput").value = "";
            setGetUploadedFile(url);
          })
          .catch((err) => window.alert(err));
      }
    );
  };
  return (
    <div className="container">
      <h1 className="text-center bg-light text-secondary">Upload File</h1>
      <div>Progress: {progress}%</div>
      <input
        type="file"
        id="fileInput"
        onChange={(e) => setFile2Upload(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload File</button>
      <hr />
      {getUploadedFile ? (
        <div>
          <img src={getUploadedFile} alt="uploaded file" />
          <hr />
          <span>Link: </span>
          <a href={getUploadedFile} target="_blank">
            {getUploadedFile}
          </a>
        </div>
      ) : (
        <div>No File</div>
      )}
    </div>
  );
};
export default Upload;
