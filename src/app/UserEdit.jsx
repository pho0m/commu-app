import { Box, Button, Typography } from "@material-ui/core";
import * as React from "react";

export default function UserEdit() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "5vh",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          padding: "5vh",
        }}
      >
        <Box
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            backgroundColor: "grey",
            marginBottom: "3vh",
          }}
        />
        <Typography style={{ marginBottom: "1vh" }}>
          <h3>Pho0m</h3>
        </Typography>
        <Box
          style={{
            height: "1px",
            backgroundColor: "grey",
            marginBottom: "3vh",
          }}
        ></Box>
        <Typography style={{ marginBottom: "4vh" }}>
          Email: pho0m@commumail.com
        </Typography>
        <Typography style={{ marginBottom: "4vh" }}>
          With: commu account
        </Typography>
        <Typography style={{ marginBottom: "4vh" }}>
          Create At: 21/05/2022
        </Typography>
        <Box
          style={{
            display: "flex",
          }}
        >
          <Button
            style={{
              width: "20%",
              backgroundColor: "#9BD2F0",
              color: "white",
              marginRight: "10px",
            }}
          >
            <Typography>Edit</Typography>
          </Button>
          <Button
            style={{ width: "20%", backgroundColor: "#E12929", color: "white" }}
          >
            <Typography>Logout</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
