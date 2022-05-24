import * as React from "react";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Grid, Paper } from "@material-ui/core";
import { Typography } from "@mui/material";
import {
  getDoc,
  collection,
  doc,
  deleteDoc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase_config";
import Swal from "sweetalert2";

import SendIcon from "@mui/icons-material/Send";
import { useAsyncRetry, useLocation } from "react-use";
import { useNavigate } from "react-router";

// import axios from "axios";
// import Pusher from "pusher-js";
import Avatar from "react-avatar";

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

export default function Topic() {
  let navigate = useNavigate();

  const location = useLocation();
  const id = location.state.usr;

  const [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  const commentCollection = collection(db, "/comment");
  const topicCollection = collection(db, "/topics");

  const targetDoc = doc(topicCollection, id);
  const [values, setValues] = React.useState({});

  const [idData, setIdData] = React.useState("");
  const [topicState, setTopicState] = React.useState({});
  const [userComment, setUserComment] = React.useState({});
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const q = query(commentCollection, where("topicId", "==", idData));

      const querySnapshot = await getDocs(q);

      let arr = [];

      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      setUserComment(arr);
    };

    fetchData().catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
    });
  }, [userComment]);

  const tp = useAsyncRetry(async () => {
    setLoading(true);
    const dataStore = localStorage.getItem("USER_DATA");
    const data = JSON.parse(dataStore);

    if (data === null || data === undefined || data === "") {
      navigate("/user/login");
    } else {
      setUserInfo(data);
    }

    await getDoc(targetDoc)
      .then((data) => {
        setIdData(data.id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    const output = values;
    output[name] = value;

    setValues(output);
  };

  const handleSubmit = (e) => {
    const output = values;

    output["displayName"] = userInfo.displayName;
    output["avatar"] = userInfo.avatar || userInfo.photoURL;
    output["topicId"] = idData;

    setValues(values);

    addDoc(commentCollection, values)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };

  const handleEdit = () => {
    navigate(`edit`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(targetDoc)
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            navigate("/home");
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            })
          );
      }
      return;
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: "auto",
        }}
      >
        <Box className={classes.row}>
          <Box
            className={classes.column}
            style={{ fontSize: "40px", flexGrow: "1", fontWeight: "600" }}
          >
            {topicState.title}
          </Box>
          <Box
            className={classes.column}
            style={{ alignContent: "right", textAlign: "right" }}
          >
            <Button
              onClick={handleEdit}
              style={{
                marginRight: "10px",
                fontWeight: "600",
                color: "#111",
                fontSize: "15px",
                borderColor: "transparent",
                backgroundColor: "#D9D9D9",
                borderRadius: "12px",
                padding: "10px 20px 10px 20px",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
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
              Delete
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
          <Avatar
            alt="userimg"
            round={true}
            size={60}
            src={topicState.avatar}
          />
          <Typography sx={{ paddingLeft: 2 }}>
            by {topicState.displayName}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "auto",
          height: "auto",
        }}
      >
        <Box className={classes.container}>
          <img
            className={classes.containerimage}
            alt="image-content"
            style={{ width: "50%" }}
            src={topicState.image}
          />
          <Box className={classes.containertext}>
            <Typography variant="h4">{topicState.subtitle}</Typography>
            <br />
            <Typography variant="h6">{topicState.content}</Typography>
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
          <Avatar
            alt="userimg"
            style={{ display: "flex" }}
            size={60}
            round={true}
            src={userInfo.photoURL || userInfo.avatar}
          />

          <TextField
            fullWidth
            sx={{ m: 1 }}
            value={values.comment}
            onInput={(e) => handleChange(e)}
            id="filled-textarea"
            name="comment"
            label="Comment Here"
            placeholder="Yeah ! it's great !!"
            multiline
            variant="filled"
          />
          <Button
            onClick={handleSubmit}
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
        {/* {FIXME PUSHER} */}
        {userComment.map((value, index) => (
          <Paper key={index} style={{ padding: "40px 20px" }}>
            <Grid item container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="userimg"
                  size={60}
                  round={true}
                  src={value.avatar || value.photoURL}
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left", fontSize: "20px" }}>
                  {value.displayName}
                </h4>
                <Typography variant="h6">{value.comment}</Typography>

                {/* <p style={{ textAlign: "left", fontSize: "13px" }}>
                  {value.comment}
                </p> */}
                {/* <p
                  style={{ textAlign: "left", color: "gray", fontSize: "12px" }}
                >
                  posted {value.timestm} minute ago
                </p> */}
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </>
  );
}
