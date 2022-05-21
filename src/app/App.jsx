import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Box, CssBaseline, Toolbar } from "@mui/material";
// import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";
import PageNotFound from "./PageNotFound";
import Home from "./Home";

function App(props) {
  const drawerWidth = 140;
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <CommuAppBar props={{ drawerWidth, handleDrawerToggle }} /> */}
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
