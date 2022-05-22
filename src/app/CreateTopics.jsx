import { Box, Typography, TextField, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import * as React from "react";

export default function CreateTopics() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography style={{ marginRight: "100vh", marginBottom: "3vh" }}>
        <h3> Create Topics</h3>
      </Typography>
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
              justifyContent: "center",
              paddingLeft: "3vh",
            }}
          >
            <Typography>pho0m</Typography>
            <Typography>this is public post</Typography>
          </Box>
        </Box>
        <Typography>Title</Typography>
        <TextField
          style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
          placeholder="what about your title pho0m"
          variant="outlined"
        />
        <Typography>SubTitle</Typography>
        <TextField
          style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
          placeholder="what about your sub title pho0m"
          variant="outlined"
        />
        <Typography>Content</Typography>
        <TextField
          style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
          placeholder="what are you thinking pho0m"
          variant="outlined"
          multiline
          rows={4}
        />
        <Typography>Image</Typography>
        <Box style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log("Files:", files)}
          />
        </Box>
        <Button
          style={{ width: "100%", backgroundColor: "#9BD2F0", color: "white" }}
        >
          <Typography>Post Topic</Typography>
        </Button>
      </Box>
    </Box>
  );
}