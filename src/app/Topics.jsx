import * as React from "react";

import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  IconButton,
} from "@mui/material";
import { TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { mockData } from "./mockup";
import CardTopics from "../components/CardTopic";
import { useAsync } from "react-use";
import { collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "./firebase_config";

const placeholder =
  "https://media.discordapp.net/attachments/977819986217304134/977820013203423232/Blue_Banner_Birthday_Party_Invitation_1.png?width=1352&height=676";

export default function Topics() {
  const [loading, setLoading] = React.useState(false);
  const topicCollection = collection(db, "/topics");
  const [topicsState, setTopicsState] = React.useState([]);

  const tp = useAsync(async () => {
    setLoading(true);

    await getDocs(topicCollection)
      .then((values) => {
        let topics = [];
        values.docs.map((doc) => {
          return (topics = [...topics, { id: doc.id, ...doc.data() }]);
        });

        setTopicsState(topics);
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
    return <>Loading</>; //for loading
  }

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h2">
          Topics
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField
            style={{
              borderRadius: "30px",
              backgroundColor: "#D9D9D9",
              paddingLeft: "10px",
            }}
            placeholder="Search ...."
            InputProps={{ disableUnderline: true }}
          />
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flexDirection: "row", pt: 3 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {topicsState.map((v) => (
              <Grid key={v.id} item>
                <CardTopics value={v} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
