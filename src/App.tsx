import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/signin.";
import Signup from "./pages/signup";
import HomePage from "./pages/home-page";
import AddLocation from "./pages/location/add-location";
import ProfilePage from "./pages/profile-page";
import EditLocation from "./pages/location/edit-location";
import GuessLocation from "./pages/location/guess-location";
import AdminPage from "./pages/admin-page";
import ResetPasswordPage from "./pages/reset-password";
import ScrollTracker from "./components/common/scroll-tracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTracker>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/add-location" element={<AddLocation />}></Route>
            <Route path="/edit-location" element={<EditLocation />}></Route>
            <Route path="/guess-location" element={<GuessLocation />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route
              path="/auth-reset/:token/:username"
              element={<ResetPasswordPage />}
            />
          </Routes>
        </ScrollTracker>
      </BrowserRouter>
    </div>
  );
}

export default App;
