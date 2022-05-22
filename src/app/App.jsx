import * as React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import Home from "./Home";
// import Topics from "./Topics";
import Users from "./User";
import UserEdit from "./UserEdit";
import SingleTopic from "./SingleTopic";

import CreateTopicsPage from "./CreateTopics";
import CreateTopics from "./CreateTopics";
import AllTopics from "./AllTopics";

import "./app.css";
import Topics from "./Topics";

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
          <Route path="user" element={<Users />} />
          <Route path="register" element={<Register />} />
          <Route path="user/edit" element={<UserEdit />} />

          <Route path="topics" element={<Topics />} />
          <Route path="topics/:id" element={<SingleTopic />} />

          <Route path="topics" element={<SingleTopic />} />
          {/* <Route path="topics/:id" element={<SingleTopic />} /> */}
          <Route path="create" element={<CreateTopics />} />

          <Route path="alltopics" element={<AllTopics />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
