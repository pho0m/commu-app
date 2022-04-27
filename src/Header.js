import Swal from "sweetalert2";

const Header = (props) => {
  function handleClose(props) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.logout();
      }
    });
  }

  return (
    <div>
      <h1 className="text-center bg-info text-white">
        Firebase Authen with Google Account
      </h1>
      {props.user ? ( // user is logged in.
        <div className="d-flex justify-content-between bg-light">
          <div>
            <b>Welcome: </b> {props.user.displayName}
            <span> : </span>
            <img src={props.user.photoURL} width={30} alt="user" />
          </div>
          <div>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => handleClose(props)}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        // user is not logged in.
        <div className="d-flex justify-content-between bg-light">
          <div>You are not logged in.</div>
          <div>
            <button className="btn btn-sm btn-success" onClick={props.login}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
