import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  Button,
  MobileStepper,
  Grid,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useNavigate } from "react-router";
import CardTopics from "../components/CardTopic";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase_config";
import Swal from "sweetalert2";
import { useAsync } from "react-use";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "first",
    imgPath:
      "https://cdn.discordapp.com/attachments/977819986217304134/978337980932575262/1.jpg",
  },
  {
    label: "second",
    imgPath:
      "https://media.discordapp.net/attachments/900736408325615667/977585248890126457/2_1.png?width=1352&height=676",
  },
  {
    label: "third",
    imgPath:
      "https://media.discordapp.net/attachments/900736408325615667/977585276379627550/3_1.png?width=1352&height=676",
  },
];

export default function Home(porps) {
  let navigate = useNavigate();

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
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
          text: "unauthorized please login first",
        });
        navigate("/user/login");
      });
  }, []);

  if (tp.loading) {
    return <>Loading</>; //for loading
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        autoPlay={false}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  width: "100%",
                  objectFit: "contain",
                  height: 500,
                }}
                src={step.imgPath}
                alt="image"
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

      <Box sx={{ flexDirection: "row", pt: 2 }}>
        <Typography variant="h4" component="h2">
          Topics{" "}
          <Button
            variant="contained"
            onClick={() => {
              navigate("/topics/all");
            }}
          >
            See more
          </Button>
        </Typography>
      </Box>

      <Box sx={{ flexDirection: "row", pt: 3 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {topicsState.slice(0, 12).map((v) => (
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
