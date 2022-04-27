import { auth } from "./firebase_config";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Home from "./Home";
import Header from "./Header";

const App = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
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

  const login = () => {
    const provider = new GoogleAuthProvider();
    auth.languageCode = "th";
    //auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log(result.user); // We don’t really do it
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <div className="container">
      <Header user={userInfo} login={login} logout={logout} />
      <Home user={userInfo} logout={logout} />
    </div>
  );
};
export default App;
