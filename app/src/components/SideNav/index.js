import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./style.css";
import { NavContext, DisplayContext } from "../../App";
import { Hamburker, HamburkerNone, SelectBot, SelectBotWidth } from "./styled";

const SideNav = (props) => {
  const Nav = React.useContext(NavContext);
  const Display = React.useContext(DisplayContext);

  const [select, setSelect] = useState(false);
  const [currentBot, setCurrentBot] = useState(localStorage.getItem("currentBot"));

  const handleClickMenu = () => {
    console.log("message");
    Nav.setAnimateNav("0px");
    Display.setDisplay("none");
  };

  const handleSelectBot = (id) => {
    console.log(id);
    localStorage.setItem("currentBot", id);
    setCurrentBot(id);

    setSelect(!select);
  };

  const handleClickCloseNav = () => {
    console.log("message");
    Nav.setAnimateNav("0px");
    Display.setDisplay("none");
  };

  // const handleClickSelectBot = () => {
  //   console.log("Select");
  //   setSelect(!select);
  // };

  useEffect(() => {
    console.log(currentBot);
  }, [currentBot]);

  return (
    <Hamburker animateNav={props.animateNav}>
      <HamburkerNone display={props.display}>
        <div className="icon-logo">
          <div className="box-close">
            <button className="close-sidenav" onClick={handleClickCloseNav}>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <img src={logo} alt="" className="logo" />
          <br />
          <p className="name-logo">กรมการขนส่งทางบก</p>
          <p className="name-logo">Department of Land Transport</p>
        </div>
        <nav>
          <ul id="Mydiv" className="sidenav-container">
            {/* <div className="nav-container">
              <div onClick={handleClickSelectBot} className="menu">
                <i className="fa fa-pie-chart icon_nav"></i>
                {`${currentBot === 1 ? "DLT BOT 1" : "DLT BOT 2"}`}
                <i className="fa fa-sort-down"></i>
              </div>
            </div> */}

            <SelectBotWidth selectWidth={select}>
              <SelectBot select={select}>
                <li onClick={() => handleSelectBot(1)}>
                  <Link className="link" to="/">
                    <div className="container-select">
                      <div className="menu chatbot-menu">{`DLT BOT 1`}</div>
                    </div>
                  </Link>
                </li>

                <li onClick={() => handleSelectBot(2)}>
                  <Link className="link" to="/">
                    <div className="container-select">
                      <div className="menu chatbot-menu">{`DLT BOT 2`}</div>
                    </div>
                  </Link>
                </li>
              </SelectBot>
            </SelectBotWidth>

            <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/">
                <div className="menu">
                  <i className="fa fa-pie-chart icon_nav"></i>
                  Dashboard
                </div>
              </Link>
            </li>
            <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/training">
                <div className="menu">
                  <i className="fa fa-android icon_nav"></i>
                  Training
                </div>
              </Link>
            </li>
            <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/history">
                <div className="menu">
                  <i className="fa fa-rotate-left icon_nav"></i>
                  History
                </div>
              </Link>
            </li>
            {/* <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/history_detail/1">
                <div className="menu">
                  <i className="fa fa-rotate-left icon_nav"></i>
                  HistoryDetail
                </div>
              </Link>
            </li> */}
            <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/chatbot">
                <div className="menu">
                  <i className="fa fa-comments icon_nav"></i>
                  ChatBot
                </div>
              </Link>
            </li>
            {/* <li onClick={handleClickMenu} className="nav-container">
              <Link className="link" to="/config">
                <div className="menu">
                  <i className="fa fa-cogs icon_nav"></i>
                  Config
                </div>
              </Link>
            </li> */}
          </ul>
        </nav>
      </HamburkerNone>
    </Hamburker>
  );
};

export default SideNav;
