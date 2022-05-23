import * as React from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";
import CommuAppBar from "../components/AppBar";
import CommuDrawer from "../components/Drawer";

import PageNotFound from "./PageNotFound";
// import UserRegister from "./UserRegister";
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
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";

import {
  getDoc,
  collection,
  doc,
  addDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore"; //
import { db } from "./firebase_config";
import Swal from "sweetalert2";
import { loadState, saveState } from "../components/LocalStorage";

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

  // () => {
  //   // getting stored value
  //   const saved = localStorage.getItem("user");
  //   const initialValue = JSON.parse(saved);

  //   console.log(initialValue);
  //   return initialValue || "";
  // };
  const [id, setID] = React.useState();
  const userCollection = collection(db, "/users");

  React.useEffect(() => {
    if (userInfo === null || userInfo === undefined || userInfo === "") {
      navigate("/user/login");
    }
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

  // React.useEffect(() => {
  //   if (userInfo === null || userInfo === undefined || userInfo === "") {
  //     navigate("/user/login");
  //   } else {
  //     auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         // User is logged in
  //         //console.log("onAuth", user);

  //         (async () => {
  //           const q = query(userCollection, where("email", "==", user.email));
  //           const querySnapshot = await getDocs(q);
  //           let arr = [];

  //           querySnapshot.forEach((doc) => {
  //             arr.push(doc.data());
  //           });

  //           let qData = arr[0];

  //           localStorage.setItem("user", JSON.stringify(qData));

  //           setUserInfo(qData);
  //         })();
  //       } else {
  //         //  User is not logged in
  //         localStorage.setItem("user", null);
  //         setUserInfo(null);
  //       }
  //     });
  //   }
  // }, []);

  const handleLoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider).then((result) => {
      let usr = result.user;

      console.log("signInWithPopup");

      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log(accessToken);
      (async () => {
        const q = query(userCollection, where("email", "==", usr.email));
        const querySnapshot = await getDocs(q);
        let arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        let qData = arr[0];

        if (qData === undefined || qData === null) {
          let userData = {
            displayName: usr.displayName,
            email: usr.email,
            avatar: usr.photoURL,
          };

          addDoc(userCollection, userData)
            .then(() => {})
            .catch((err) => {
              navigate("/user/login");

              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
              });
            });
        } else {
          setUserInfo(qData);
        }
      })();

      navigate("/home");
    });
  };

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider).then((result) => {
      let usr = result.user;

      console.log("signInWithPopup");

      (async () => {
        const q = query(userCollection, where("email", "==", usr.email));
        const querySnapshot = await getDocs(q);
        let arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        let qData = arr[0];

        console.log(qData);

        if (qData === undefined || qData === null) {
          let userData = {
            displayName: usr.displayName,
            email: usr.email,
            avatar: usr.photoURL,
          };

          addDoc(userCollection, userData)
            .then(() => {})
            .catch((err) => {
              navigate("/user/login");

              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
              });
            });
        } else {
          console.log("in else");

          setUserInfo(qData);
        }
      })();

      navigate("/home");
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // console.log("logout "); // We don’t really do it
        navigate("/user/login");
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
      {path != "/user/login" && (
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
          <Route
            path="/user/login"
            element={
              <UserLogin
                loginGoogle={handleLoginWithGoogle}
                loginFB={handleLoginWithFacebook}
                props={{}}
              />
            }
          />

          <Route path="/" element={<Home user={userInfo} />} />
          <Route path="home" element={<Home user={userInfo} />} />
          <Route
            path="user"
            element={<UserProfile logout={handleLogout} user={userInfo} />}
          />
          {/* <Route path="user/register" element={<UserRegister />} /> */}
          <Route path="user/edit" element={<UserEdit user={userInfo} />} />
          <Route path="topics" element={<CreateTopic user={userInfo} />} />
          <Route path="topics/:id" element={<Topic user={userInfo} />} />
          <Route
            path="topics/:id/edit"
            element={<TopicEdit user={userInfo} />}
          />
          <Route path="topics/all" element={<Topics user={userInfo} />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Routes>
          {userInfo === null || userInfo === undefined ? (
            <>
              <Route
                path="/user/login"
                element={
                  <UserLogin
                    loginGoogle={handleLoginWithGoogle}
                    loginFB={handleLoginWithFacebook}
                    props={{}}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <UserLogin
                    loginGoogle={handleLoginWithGoogle}
                    loginFB={handleLoginWithFacebook}
                    props={{}}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route
                path="user"
                element={<UserProfile logout={handleLogout} user={userInfo} />}
              />
              <Route path="user/edit" element={<UserEdit />} /> */}
        {/* <Route path="user/register" element={<UserRegister />} /> */}
        {/* <Route path="topics" element={<CreateTopic user={userInfo} />} />
              <Route path="topics/:id" element={<Topic />} />
              <Route path="topics/:id/edit" element={<TopicEdit />} />
              <Route path="topics/all" element={<Topics />} />
            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes> */}
      </Box>
    </Box>
  );
}

export default App;
