import axios from "axios";
import Cookies from "js-cookie";

const logAction = async (
  action: string,
  component: string | null,
  newValue: string | null,
  URL: string
) => {
  try {
    await axios.post(
      `/user/log-action`,
      { action, component, newValue, URL },
      { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
    );
  } catch (err) {
    console.log(err);
  }
};

export default logAction;
