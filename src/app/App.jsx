import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Box, CssBaseline, Toolbar } from "@mui/material";
import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import Topics from "./Topics";
import Users from "./User";
import SingleTopic from "./SingleTopic";

function App(props) {
  const drawerWidth = 140;
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navigate = useNavigate();

  const handleListItemClick = (index, value) => {
    setSelectedIndex(index);

    navigate(`/${value.key}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CommuAppBar props={{ drawerWidth, handleDrawerToggle }} />
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
          <Route path="/home" element={<Home />} />
          <Route path="user" element={<Users />} />
          <Route path="topics" element={<Topics />} />
          <Route path="topics/:id" element={<SingleTopic />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
