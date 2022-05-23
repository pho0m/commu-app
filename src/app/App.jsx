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
import { auth } from "./firebase_config";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDoc, collection, doc } from "firebase/firestore"; //addDoc
import { db } from "./firebase_config";
// import Swal from "sweetalert2";

function App(props) {
  let navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;

  const drawerWidth = 140;
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedPath, setSelectedIndex] = React.useState(path);
  const [title, setTitle] = React.useState("Home");
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        //console.log("onAuth", user);
        setUserInfo(user);
      } else {
        //  User is not logged in
        setUserInfo(null);
      }
    });
  }, []);

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then((result) => {
        //FIXME
        // console.log("in login with google");

        const userCollection = collection(db, "/users");
        const targetDoc = doc(userCollection, result.user.uid);

        // console.log(targetDoc);

        //#FIXME
        getDoc(targetDoc)
          .then((data) => {
            // console.log(data.data());

            if (data.data() !== undefined || data.data() !== null) {
              // console.log("have user in db");
            } else {
              // console.log("don't have user in db");
              // let usr = result.user;
              // const d = Date.now();
              // let userData = {
              //   uid: usr.uid,
              //   displayName: usr.displayName,
              //   email: usr.email,
              //   avatar: usr.photoURL,
              //   createAt: d,
              // };
              // console.log(userData);
              // console.log(result.user);
              // addDoc(userCollection, userData)
              //   .then(() => {})
              //   .catch((err) => {
              //     Swal.fire({
              //       icon: "error",
              //       title: "Oops...",
              //       text: err,
              //     });
              //   });
            }
          })
          .catch((err) => {
            // console.log("db error");
          });

        navigate("/home");
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // console.log("logout "); // We don’t really do it
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

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
      {userInfo === undefined || userInfo === null ? (
        <></>
      ) : (
        <>
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
        </>
      )}

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
          {userInfo === undefined || userInfo === null ? (
            <Route
              path="/"
              element={<UserLogin login={handleLoginWithGoogle} props={{}} />}
            />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route
                path="user"
                element={<UserProfile logout={handleLogout} user={userInfo} />}
              />
              <Route path="user/register" element={<UserRegister />} />
              <Route path="user/edit" element={<UserEdit />} />
              <Route path="topics" element={<CreateTopic user={userInfo} />} />
              <Route path="topics/:id" element={<Topic />} />
              <Route path="topics/:id/edit" element={<TopicEdit />} />
              <Route path="topics/all" element={<Topics />} />
            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
