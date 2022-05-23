import * as React from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";

import PageNotFound from "./PageNotFound";
import UserRegister from "./UserRegister";
import Home from "./Home";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";
import UserEdit from "./UserEdit";
import Topic from "./Topic";
import Topics from "./Topics";
import CreateTopic from "./TopicCreate";
import "./app.css";
import TopicEdit from "./TopicEdit";

function App(props) {
  let navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;

  const drawerWidth = 140;
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedPath, setSelectedIndex] = React.useState(path);
  const [title, setTitle] = React.useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (value) => {
    setSelectedIndex(`/${value.key}`);
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
          selectedPath,
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

          <Route path="user" element={<UserProfile />} />
          <Route path="user/login" element={<UserLogin />} />
          <Route path="user/register" element={<UserRegister />} />
          <Route path="user/edit" element={<UserEdit />} />

          <Route path="topics" element={<CreateTopic />} />
          <Route path="topics/:id" element={<Topic />} />
          <Route path="topics/:id/edit" element={<TopicEdit />} />

          <Route path="topics/all" element={<Topics />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
