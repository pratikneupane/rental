import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import "./Register.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { loading, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch({ type: "REGISTER_START" });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        credentials
      );
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/signIn");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }
  };

  return (
    <>
      <NavBar />
      <div class="register">
        <div class="registerContainer">
          <div class="left">
            <img
              src="https://images.pexels.com/photos/8962339/pexels-photo-8962339.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
            />
          </div>
          <div class="right">
            <h1>Sign Up Here.</h1>
            <form action="">
              <div class="formLabel">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="name"
                  onChange={handleChange}
                />
              </div>
              <div class="formLabel">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
              <div class="formLabel">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </div>
              <button disabled={loading} onClick={handleRegister}>
                JOIN
              </button>
              <p>
                already have an account? <Link to="/signIn">Sign in here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
