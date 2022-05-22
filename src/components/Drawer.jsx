import * as React from "react";
import {
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Box,
  Drawer,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "react-avatar";

const useStyles = makeStyles({
  root: {
    color: "white",
    "&$selected": {
      backgroundColor: "red",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  selected: {},
});

const page = [
  {
    key: "home",
    title: "Home",
  },
  {
    key: "topics",
    title: "Topic",
  },
  {
    key: "user",
    title: "User",
  },
];

function CommuDrawer({ props }) {
  const classes = useStyles();

  const drawer = (
    <div>
      <Box
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        sx={{ flexDirection: "column" }}
      >
        <Avatar
          size="130"
          src="https://media.discordapp.net/attachments/900736408325615667/977574186740482118/Cream_Illustration_Business_Instagram_Post_1.png?width=676&height=676"
        />

        <List>
          {page.map((value, index) => (
            <ListItem
              key={value.key}
              disablePadding
              classes={{ root: classes.root, selected: classes.selected }}
            >
              <ListItemButton
                selected={props.selectedIndex === index}
                onClick={(event) => props.handleListItemClick(index, value)}
              >
                <ListItemText disableTypography primary={value.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: props.drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: props.drawerWidth,
            backgroundColor: "black",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default CommuDrawer;
