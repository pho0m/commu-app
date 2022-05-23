import { Box, Button, Typography } from "@material-ui/core";
import * as React from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router";
import { useAsync } from "react-use";
import Swal from "sweetalert2";

export default function UserProfile(props) {
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const tp = useAsync(async () => {
    setLoading(true);
    if (props.user === undefined || props.user === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "unauthorized please login first",
      });
      navigate("/user/login");
    }
  }, []);

  if (tp.loading) {
    return <>Loading</>; //for loading
  }

  return (
    <Box
      style={{ display: "flex", justifyContent: "center", paddingTop: "5vh" }}
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
        <Avatar alt="userimg" size={150} round={true} src={props.user.avatar} />
        <br />

        <Typography style={{ marginBottom: "1vh" }}>
          {props.user.displayName}
        </Typography>
        <Box
          style={{
            height: "1px",
            backgroundColor: "grey",
            marginBottom: "3vh",
          }}
        ></Box>
        <Typography style={{ marginBottom: "4vh" }}>
          Email: {props.user.email}
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "end",
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
            onClick={props.logout}
            style={{ width: "20%", backgroundColor: "#E12929", color: "white" }}
          >
            <Typography>Logout</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
