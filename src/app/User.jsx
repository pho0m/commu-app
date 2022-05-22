import { getByPlaceholderText } from "@testing-library/react";
import React from "react";
import { DialogAuth } from "react-mui-auth-page";

const App = () => {
  const handleSignIn = ({ email, password }) => {
    console.log({ email, password });
  };
  const handleSignUp = ({ email, name, password }) => {
    console.log({ email, name, password });
  };
  const handleForget = ({ email }) => {
    console.log({ email });
  };
  const handleClose = ({ onClose }) => {
    console.handleClose({ onClose });
  };
  const [open, setOpen] = React.useState(false);


  return (
    <>
      <button onClick={() => setOpen(1)}>Login</button>
      <DialogAuth
        open={open}
        logoComponent={
          <>
            <img
              src="https://media.discordapp.net/attachments/900736408325615667/977574186740482118/Cream_Illustration_Business_Instagram_Post_1.png?width=676&height=676"
              alt="Logo"
              height="120px"
            />
          </>
        }
        textFieldVariant="outlined"

        onClose={handleClose}
        handleSignUp={handleSignUp}
        handleForget={handleForget}
        handleSignIn={handleSignIn}
        handleSocial={{
          Google: () => { },
          Facebook: () => { }
        }}
      />
    </>
  );
};

export default App;
