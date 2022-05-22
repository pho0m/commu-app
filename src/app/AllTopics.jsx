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

const placeholder =
  "https://media.discordapp.net/attachments/977819986217304134/977820013203423232/Blue_Banner_Birthday_Party_Invitation_1.png?width=1352&height=676";

const topicsItem = [
  {
    id: 1,
    title: "first",
    imgPath: placeholder,
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    title: "second",
    imgPath: placeholder,
    subTitle: "second mockup test data",
  },
  {
    id: 3,
    title: "third",
    imgPath: placeholder,
    subTitle: "third mockup test data",
  },
  {
    id: 4,
    title: "forth",
    imgPath: placeholder,
    subTitle: "forth mockup test data",
  },
  {
    id: 5,
    title: "five",
    imgPath: placeholder,
    subTitle: "five mockup test data",
  },
  {
    id: 6,
    title: "six",
    imgPath: placeholder,
    subTitle: "six mockup test data",
  },
];

export default function Home() {
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
              justifyContent: "center",
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
            {topicsItem.map((value) => (
              <Grid key={value.id} item>
                <Card sx={{ width: 410, boxShadow: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={value.imgPath}
                      alt={value.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {value.title}
                      </Typography>
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                        }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {value.subTitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
