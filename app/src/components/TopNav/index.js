import React, { useState } from "react";
import "./style.css";
import { AuthContext, NavContext, DisplayContext } from "../../App";
import { Modal as Modals } from "../Modal";

function TopNav() {
  const Auth = React.useContext(AuthContext);
  const Nav = React.useContext(NavContext);
  const Display = React.useContext(DisplayContext);
  const [confirm, setConfirm] = useState(false);

  const logOut = () => {
    console.log("Logout");
    localStorage.clear();
    Auth.setAuth(false);
  };

  const handleClickSideNav = () => {
    console.log("Sidenav");
    Nav.setAnimateNav(!Nav.animateNav);
    Display.setDisplay("block");
  };

  const onClose = () => {
    console.log("clossssss");
    setConfirm(false);
  };

  const onSubmit = () => {
    console.log("submit");
    setConfirm(false);
    logOut();
  };

  const handleClickLogout = () => {
    console.log("before");
    setConfirm(true);
  };

  return (
    <>
      {confirm && <Modals onClose={onClose} onSubmit={onSubmit} text={"ยืนยันการออกจากระบบ"} />}
      <div className="topnav">
        <div className="topbar">
          <button className="hamburker" onClick={handleClickSideNav}>
            <i className="fa fa-reorder"></i>
          </button>
        </div>
        <div className="user">USER : APIROM325</div>
        <div className="logout">
          <button className="btn_logout" onClick={handleClickLogout}>
            <i className="fa fa-power-off"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default TopNav;
