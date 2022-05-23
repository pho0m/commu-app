import * as React from "react";

import { Box, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase_config";
import Swal from "sweetalert2";
import { storage } from "./firebase_config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import LinearProgress from "@mui/material/LinearProgress";

import { v4 } from "uuid";
import { LinearProgressWithLabel } from "../components/ProgressBar";

export default function CreateTopic() {
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [file2upload, setFile2Upload] = React.useState("");
  const [fileRef, setfileRef] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const topicCollection = collection(db, "/topics");
  let navigate = useNavigate();

  const handleUploadImage = (files) => {
    const pathname = "/images/";
    const fileRef = ref(storage, pathname + v4() + "_" + files.name);

    setFile2Upload(files);
    setfileRef(fileRef);
  };

  const handleSubmit = (e) => {
    if (file2upload === null || file2upload === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select file to upload",
      });
    }

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

              if (url === undefined || url === "") {
                output["image"] =
                  "https://media.discordapp.net/attachments/900736408325615667/977585190736130148/1_1.png?width=1352&height=676";
              } else {
                output["image"] = url;
              }

              setValues(output);

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
            <Typography>Upload File</Typography>
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
