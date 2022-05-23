import * as React from "react";

import { Box, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase_config";
import Swal from "sweetalert2";
import { useState } from "react";
import { storage } from "./firebase_config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

import { v4 } from "uuid";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CreateTopic() {
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [file2upload, setFile2Upload] = useState("");
  const [fileRef, setfileRef] = useState("");
  const [progress, setProgress] = useState(0);

  const topicCollection = collection(db, "/topics");
  let navigate = useNavigate();

  const handleUploadImage = (files) => {
    const pathname = "/images/";
    const fileRef = ref(storage, pathname + v4() + "_" + files.name);

    setFile2Upload(files);
    setfileRef(fileRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    (async () => {
      const uploadTask = uploadBytesResumable(fileRef, file2upload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              const output = values;
              output["image"] = url;

              setValues(output);
              console.log("output: " + values.image);

              addDoc(topicCollection, values)
                .then(() => {
                  var ttt = Swal.fire({
                    icon: "success",
                    title: "Your topic has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  ttt.then(() => navigate("/home"));
                })
                .catch((err) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err,
                  });
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

      console.log(values);
    })();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const output = values;
    output[name] = value;

    setValues(output);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        style={{
          width: "100vh",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          padding: "5vh",
        }}
      >
        <Box style={{ display: "flex", marginBottom: "3vh" }}>
          <Box
            style={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              backgroundColor: "grey",
            }}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "3vh",
            }}
          >
            <Typography>pho0m</Typography>
            <Typography>this is public post</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Typography>Title</Typography>
          <TextField
            required
            value={values.title}
            name="title"
            onInput={(e) => handleChange(e)}
            style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
            placeholder="what about your title pho0m"
            variant="outlined"
          />
          <Typography>SubTitle</Typography>
          <TextField
            required
            value={values.subtitle}
            name="subtitle"
            onInput={(e) => handleChange(e)}
            style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
            placeholder="what about your sub title pho0m"
            variant="outlined"
          />
          <Typography>Content</Typography>
          <TextField
            required
            value={values.content}
            name="content"
            onInput={(e) => handleChange(e)}
            style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
            placeholder="what are you thinking pho0m"
            variant="outlined"
            multiline
            rows={4}
          />

          <Typography>Image</Typography>
          <Box style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}>
            <h1 className="text-center bg-light text-secondary">Upload File</h1>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
            <input
              name="image"
              type="file"
              id="fileInput"
              onChange={(e) => {
                handleUploadImage(e.target.files[0]);
              }}
            />
          </Box>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#9BD2F0",
              color: "white",
            }}
            type="submit"
          >
            <Typography>Post Topic</Typography>
          </Button>
        </form>
      </Box>
    </Box>
  );
}
