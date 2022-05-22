import * as React from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Avatar, Grid, Paper } from "@material-ui/core";

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
  {
    id: 3,
    user: "Anonymous",
    imgPath: imgLink,
    timestm: "53",
    CommentDetail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus.",
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
  usertagname: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: "10px",
  },
  editbutton: {
    borderColor: "transparent",
    backgroundColor: "#D9D9D9",
    borderRadius: "12px",
    padding: "10px 20px 10px 20px",
  },
  deletebutton: {
    borderColor: "transparent",
    backgroundColor: "#E12929",
    borderRadius: "12px",
    padding: "10px 20px 10px 20px",
  },
  sendbutton: {
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

export function Header() {
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: "auto",
          // border: "solid 2px ",
        }}
      >
        <div className={classes.row}>
          <div
            className={classes.column}
            style={{ fontSize: "30px", flexGrow: "1", fontWeight: "500" }}
          >
            Who is she?
          </div>
          <div
            className={classes.column}
            style={{ alignContent: "right", textAlign: "right" }}
          >
            <button
              className={classes.editbutton}
              style={{
                marginRight: "10px",
                fontWeight: "600",
                color: "#111",
                fontSize: "15px",
              }}
            >
              Edit
            </button>
            <button
              className={classes.deletebutton}
              style={{ fontWeight: "600", color: "#fff", fontSize: "15px" }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            <button className={classes.usertagname}>
              <span>
                <img
                  alt="usersmallpic"
                  src={imgLink}
                  style={{ height: "30px" }}
                ></img>
              </span>
              <span> pho0m</span>
            </button>
          </div>
        </div>
      </Box>
    </>
  );
}

export function Topic() {
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: "auto",
          // border: "solid 2px ",
        }}
      >
        {" "}
        <div className={classes.container}>
          <img
            className={classes.containerimage}
            alt="content"
            style={{ maxwidth: "100%" }}
            src="https://cdn.discordapp.com/attachments/935973325707030568/977884916916301864/unknown.png"
          />
          <div className={classes.containertext}>
            <h2>Head content</h2>
            <p>
              r u ready ? y a a a a a a a a a Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type spec
            </p>
          </div>
        </div>
      </Box>
    </>
  );
}

export function Comments() {
  const classes = useStyles();

  return (
    <div style={{ padding: 30 }} className="App">
      <h3 style={{ fontSize: "23px" }}>Leave us a comment</h3>
      <Box
        sx={{
          width: "auto",
          height: "auto",
          // border: "solid 2px ",
        }}
      >
        <div className={classes.row} style={{ padding: "20px 0 5px" }}>
          <div className={classes.column}>
            <img
              alt="usersmallpic"
              src={imgLink}
              style={{ height: "50px" }}
            ></img>
          </div>
          <div className={classes.column} style={{ marginLeft: "20px" }}>
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="..."
                id="fullWidth"
                // onChange={this.handleOnChange}
              />
            </Box>
          </div>
        </div>
        <div className={classes.row} style={{ justifyContent: "right" }}>
          <button
            className={classes.sendbutton}
            style={{ fontSize: "15px" }}
            // onClick={this.handleSend}
          >
            SEND
          </button>
        </div>
      </Box>
      {userComment.map((value) => (
        <Paper style={{ padding: "40px 20px" }}>
          <Grid key={value.id} item container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="userimg" src={value.imgPath} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left", fontSize: "20px" }}>
                {value.user}
              </h4>
              <p style={{ textAlign: "left", fontSize: "13px" }}>
                {value.CommentDetail}
              </p>
              <p style={{ textAlign: "left", color: "gray", fontSize: "12px" }}>
                posted {value.timestm} minute ago
              </p>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default function SingleTopic() {
  return (
    <>
      <Header />
      <Topic />
      <Comments />
    </>
  );
}
