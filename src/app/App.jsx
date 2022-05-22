import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import Home from "./Home";
// import Topics from "./Topics";
import Users from "./User";
import SingleTopic from "./SingleTopic";

function App(props) {
  let navigate = useNavigate();

  const drawerWidth = 140;
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [title, setTitle] = React.useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index, value) => {
    setSelectedIndex(index);
    setTitle(value.title);

    navigate(`/${value.key}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CommuAppBar props={{ drawerWidth, handleDrawerToggle, title }} />
      <CommuDrawer
        props={{
          mobileOpen,
          handleDrawerToggle,
          window,
          drawerWidth,
          selectedIndex,
          handleListItemClick,
        }}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="user" element={<Users />} />
          <Route path="register" element={<Register />} />
          <Route path="topics" element={<SingleTopic />} />
          {/* <Route path="topics/:id" element={<SingleTopic />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
