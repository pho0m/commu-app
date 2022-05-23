import * as React from "react";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { Typography } from "@mui/material";
import { getDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase_config";
import Swal from "sweetalert2";

import SendIcon from "@mui/icons-material/Send";
import { useAsync, useLocation } from "react-use";
import { useNavigate, useParams } from "react-router";
import { LinearProgressWithLabel } from "../components/ProgressBar";
import { v4 } from "uuid";
import { storage } from "./firebase_config";
import { ref } from "firebase/storage";

const imgLink =
  "https://media.discordapp.net/attachments/935973325707030568/977873476377526272/user.png";

const userComment = [
  {
    id: 1,
    user: "Phoom",
    imgPath: imgLink,
    timestm: "3",
    CommentDetail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
  },
  {
    id: 2,
    user: "Phoom",
    imgPath: imgLink,
    timestm: "20",
    CommentDetail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis.",
  },
];

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px 40px 5px",
    // border: "solid 1px ",
  },
  column: {
    // border: "solid 1px ",
    maxwidth: "100%",
  },

  sendButton: {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "#9BD2F0",
    borderRadius: "12px",
    padding: "10px 15px 10px 15px",
  },

  container: {
    padding: "20px 40px 40px",
    display: "flex",
    flexWrap: "wrap",
  },
  containerimage: {
    objectfit: "contain",
    alignSelf: "flex-start",
    margin: "0 30px 0 0",
    flex: "30%",
  },
  containertext: {
    padding: "20px 0px 40px",
    alignSelf: "flex-start",
    flex: "30%",
  },
});

export default function TopicEdit() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const classes = useStyles();
  const topicCollection = collection(db, "/topics");
  const targetDoc = doc(topicCollection, id);

  const [values, setValues] = React.useState({});
  const [topicState, setTopicState] = React.useState({});
  const [progress, setProgress] = React.useState(0);
  const [file2upload, setFile2Upload] = React.useState("");
  const [fileRef, setfileRef] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const output = values;
    output[name] = value;

    setValues(output);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUploadImage = (files) => {
    const pathname = "/images/";
    const fileRef = ref(storage, pathname + v4() + "_" + files.name);

    setFile2Upload(files);
    setfileRef(fileRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateDoc(targetDoc, values)
      .then(() => {
        navigate(-1);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        })
      );
  };

  const tp = useAsync(async () => {
    setLoading(true);

    await getDoc(targetDoc)
      .then((data) => {
        setTopicState(data.data());
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  }, []);

  if (tp.loading) {
    return <>Loading</>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className={classes.row}>
          <Box
            className={classes.column}
            style={{ fontSize: "40px", flexGrow: "1", fontWeight: "600" }}
          >
            <TextField
              required
              defaultValue={topicState.title}
              name="title"
              label="Title"
              onInput={(e) => handleChange(e)}
              style={{ width: "50%", marginTop: "10px" }}
              placeholder={topicState.title}
              variant="outlined"
            />
          </Box>
          <Box
            className={classes.column}
            style={{ alignContent: "right", textAlign: "right" }}
          >
            <Button
              type="submit"
              style={{
                marginRight: "10px",
                fontWeight: "600",
                color: "white",
                fontSize: "15px",
                borderColor: "transparent",
                backgroundColor: "green",
                borderRadius: "12px",
                padding: "10px 20px 10px 20px",
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              style={{
                fontWeight: "600",
                color: "#fff",
                fontSize: "15px",
                borderColor: "transparent",
                backgroundColor: "#E12929",
                borderRadius: "12px",
                padding: "10px 20px 10px 20px",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: "20px 40px 5px",
          }}
        >
          <img
            alt="user-image"
            src={topicState.avatar}
            style={{ height: "30px" }}
          ></img>
          <Typography sx={{ paddingLeft: 2 }}>
            {topicState.displayname}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "auto",
            height: "auto",
          }}
        >
          <Box className={classes.container}>
            <Box style={{ width: "50%" }}>
              <img
                className={classes.containerimage}
                alt="image-content"
                style={{ width: "90%" }}
                src={topicState.image}
              />
              <Box sx={{ width: "30%" }}>
                <Typography>Upload File</Typography>
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
            <Box className={classes.containertext}>
              <TextField
                required
                defaultValue={topicState.subtitle}
                name="subtitle"
                label="Sub Title"
                onInput={(e) => handleChange(e)}
                style={{ width: "80%", margin: "10px" }}
                placeholder={topicState.subtitle}
                variant="outlined"
              />
              <br />
              <TextField
                required
                defaultValue={topicState.content}
                name="content"
                label="Content"
                onInput={(e) => handleChange(e)}
                style={{ width: "100%", marginTop: "3vh", marginLeft: "10px" }}
                placeholder={topicState.subtitle}
                variant="outlined"
                multiline
                rows={4}
              />
            </Box>
          </Box>
        </Box>
        <Box style={{ padding: 30 }} className="App">
          <h3 style={{ fontSize: "23px" }}>Leave us a comment</h3>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              borderColor: "transparent",
              paddingTop: "10px",
            }}
          >
            <img
              alt="usersmallpic"
              src={imgLink}
              style={{ height: "60px", paddingTop: "10px" }}
            ></img>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="filled-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              variant="filled"
            />
            <Button
              className={classes.sendButton}
              style={{ color: "white", backgroundColor: "#92B4EC" }}
              // onClick={this.handleSend}
            >
              <SendIcon />
            </Button>
          </Box>
          <Box
            sx={{
              width: "auto",
              height: "auto",
              // border: "solid 2px ",
            }}
          >
            <Box className={classes.row} style={{ padding: "20px 0 5px" }}>
              <Box className={classes.column}></Box>
              <Box className={classes.column} style={{ marginLeft: "20px" }}>
                <Box
                  sx={{
                    maxWidth: "100%",
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>

      <Box
        sx={{
          width: "auto",
          height: "auto",
        }}
      >
        {userComment.map((value) => (
          <Paper key={value.id} style={{ padding: "40px 20px" }}>
            <Grid key={value.id} item container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="userimg" src={value.imgPath} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left", fontSize: "20px" }}>
                  {value.user}
                </h4>
                <p style={{ textAlign: "left", fontSize: "13px" }}>
                  {value.CommentDetail}
                </p>
                <p
                  style={{ textAlign: "left", color: "gray", fontSize: "12px" }}
                >
                  posted {value.timestm} minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </>
  );
}
