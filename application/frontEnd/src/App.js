import "./App.css";
import React, { useContext } from "react";
import Header from "./Header/header";
import LoggedInHeader from "./Header/LoggedInHeader";
import Footer from "./Footer/footer.jsx";
import Home from "./Main/home.jsx";
import About from "./Main/about.jsx";
import North from "./Members/north.jsx";
import Umid from "./Members/umid.jsx";
import Matthew from "./Members/matthew.jsx";
import Edward from "./Members/edward.jsx";
import Khabibullo from "./Members/khabibullo.jsx";
import Arin from "./Members/arin.jsx";
import Weather from "./Main/weather.jsx";
import Security from "./Main/security.jsx";
import Wildfire from "./Main/wildfire";
import Covid from "./Main/covid";
import Login from "./Main/Authentication/login";
import Registration from "./Main/Authentication/registration";
import ForgotPassword from "./Main/Authentication/forgotPassword";
import Manage from "./Main/Manage/manageAccount";
import ChangePassword from "./Main/Manage/changePassword";
import AddData from "./Main/Manage/addData";
import ChangeAccount from "./Main/Manage/changeAccountType";
import Alert from "./Main/Manage/Alerts/alerts";
import NewPassword from "./Main/Authentication/newPassword";
import { AuthContext } from "./Main/Authentication/Auth";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  const { isLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state from AuthContext
  return (
    <div className="App">
      <BrowserRouter className="vh-100" basename="/">
        <Routes>
          <Route
            element={
              <>
                {isLoggedIn ? <LoggedInHeader /> : <Header />}
                {/* <LoggedInHeader /> */}
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members/umid" element={<Umid />} />
            <Route path="/members/north" element={<North />} />
            <Route path="/members/matthew" element={<Matthew />} />
            <Route path="/members/edward" element={<Edward />} />
            <Route path="/members/khabibullo" element={<Khabibullo />} />
            <Route path="/members/arin" element={<Arin />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/security" element={<Security />} />
            <Route path="/wildfire" element={<Wildfire />} />
            <Route path="/covid" element={<Covid />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/manage/changePassword" element={<ChangePassword />} />
            <Route path="/manage/addData" element={<AddData />} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route
              path="/manage/changeAccountType"
              element={<ChangeAccount />}
            />
            <Route path="/manage/alerts" element={<Alert />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
