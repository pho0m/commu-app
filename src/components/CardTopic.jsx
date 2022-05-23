import { useNavigate } from "react-router";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";

export default function CardTopics(props) {
  let navigate = useNavigate();

  return (
    <Grid key={props.value.id} item>
      <Card
        sx={{ width: 410, boxShadow: 3 }}
        onClick={() => {
          navigate(`/topics/${props.value.id}`, {
            state: props.value.id,
          });
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.value.image}
            alt={props.value.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.value.title}
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
              {props.value.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
