import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const [show, setShow] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div class="navBar">
      <div class="navBarComponent">
        <div class="left">
          <Link to="/" class="link">
            <h1>TenantSystem</h1>
          </Link>
        </div>
        <div class="middle">
          <Link to="/" class="link">
            <span>Home</span>
          </Link>
          <Link to="/aboutUs" class="link">
            <span>About Us</span>
          </Link>
          <Link to="/contactUs" class="link">
            <span>Contact Us</span>
          </Link>
          <Link to="/services" class="link">
            <span>Services</span>
          </Link>
          <Link to="/upload" class="link">
            <span>Upload</span>
          </Link>
        </div>
        <div class="right">
          {user ? (
            <>
              <div class="userImg">
                <img
                  src="https://images.pexels.com/photos/8978566/pexels-photo-8978566.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt=""
                  onClick={() => setShow(!show)}
                />
              </div>
              <div class="user">
                <p onClick={() => setShow(!show)}>{user.username}</p>

                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                    onClick={() => setShow(!show)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                    onClick={() => setShow(!show)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              {show && (
                <div class="dropMenu">
                  <p>Settings</p>
                  <hr />
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/signIn" class="link">
                <span>SIGN IN</span>
              </Link>
              <Link to="/signUp" class="link">
                <span>REGISTER</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
