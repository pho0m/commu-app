import * as React from "react";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useLocation } from "react-use";
import { mockData } from "./mockup";
import SendIcon from "@mui/icons-material/Send";

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

export default function SingleTopic() {
  const { state } = useLocation();
  const { usr } = state;
  const classes = useStyles();

  // console.log(usr);
  let single = mockData[0];

  console.log(single.title);
  // console.log(mockData[usr - 1]);

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
            {single.title}
          </Box>
          <Box
            className={classes.column}
            style={{ alignContent: "right", textAlign: "right" }}
          >
            <Button
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
            justifyContent: "start",
            padding: "20px 40px 5px",
          }}
        >
          <img
            alt="user-image"
            src={single.avatar}
            style={{ height: "30px" }}
          ></img>
          <Typography sx={{ paddingLeft: 2 }}>{single.displayname}</Typography>
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
            src={single.image}
          />
          <Box className={classes.containertext}>
            <Typography variant="h4">{single.subtitle}</Typography>
            <br />
            <Typography variant="h6">{single.content}</Typography>
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
            justifyContent: "start",
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
          <Box
            className={classes.row}
            style={{ justifyContent: "right" }}
          ></Box>
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
                <p
                  style={{ textAlign: "left", color: "gray", fontSize: "12px" }}
                >
                  posted {value.timestm} minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>{" "}
    </>
  );
}
