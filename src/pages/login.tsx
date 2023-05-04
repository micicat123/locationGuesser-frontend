import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("/auth/login", { username, password });
      setRedirect(true);
    } catch (err) {
      setErrorMessage("Username or password incorrect!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Wrapper>
      <div>
        <div>
          <h4>
            Welcome <span>back!</span>
          </h4>
          <p>
            Thank you for coming back. Hope you have a good day and inspire
            others.
          </p>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input
            type="email"
            id="email"
            required
            autoComplete="email username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="password">
            <p>Password</p>
          </label>
          <input
            type="password"
            id="password"
            required
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>{errorMessage}</div>

          <input type="submit" value="Login" />

          <div>
            <p>Dont have account?</p>
            <p>
              <a href="/signup">Sign up</a>
            </p>
          </div>
        </form>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Login;
