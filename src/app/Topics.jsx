import { Box, Typography, TextField, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import * as React from "react";
import { useNavigate } from "react-router";
import * as API from "../api";

export default function Topics() {
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    (async () => {
      try {
        const { data } = await API.topics.createTopic(values, "test");

        navigate("/home");

        return data;
      } catch (error) {}
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
        justifyContent: "center",
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
              justifyContent: "center",
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
            value={values.title}
            name="title"
            onInput={(e) => handleChange(e)}
            style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
            placeholder="what about your title pho0m"
            variant="outlined"
          />
          <Typography>SubTitle</Typography>
          <TextField
            value={values.subtitle}
            name="subtitle"
            onInput={(e) => handleChange(e)}
            style={{ width: "100%", marginBottom: "3vh", marginTop: "1vh" }}
            placeholder="what about your sub title pho0m"
            variant="outlined"
          />
          <Typography>Content</Typography>
          <TextField
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
            <DropzoneArea
              filesLimit={1}
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => console.log("Files:", files)}
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
