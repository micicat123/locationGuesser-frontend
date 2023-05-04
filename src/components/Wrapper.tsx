import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import Cookies from "js-cookie";
import Nav from "./Nav";

const Wrapper = (props: any) => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get("jwt");
        const { data } = await axios.get("/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(
          new User(
            data.body.user.id,
            data.body.user.firstName,
            data.body.user.lastName,
            data.body.user.username,
            data.body.user.password,
            data.body.user.picture
          )
        );
      } catch (err) {
        console.log("Couldn't get authenticated user!");
      }
    })();
  }, []);

  return (
    <>
      <Nav user={user} />
      <main>{props.children}</main>
    </>
  );
};

//<Footer />;

export default Wrapper;
