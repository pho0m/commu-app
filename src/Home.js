import { useState } from "react";
import Upload from "./Upload";

const Home = (props) => {
  const [usr, setUsr] = useState(null);

  return (
    <div className="text-center my-5 mx-auto w-50">
      {props.user ? ( // user is logged in.
        <div
          style={{
            border: "solid 1px green",
          }}
        >
          <h2 className="my-3 bg-light">Home Page</h2>
          <div>
            <img src={props.user.photoURL} alt="user" />
          </div>
          <h4 className="bg-light text-secondary my-2 py-2">
            {props.user.displayName}
          </h4>
          <Upload />
        </div>
      ) : (
        // user is not logged in.
        <h3 className="text-secondary">
          You are not logged in. If you want to Upload Please login first!!!
        </h3>
      )}
    </div>
  );
};
export default Home;
