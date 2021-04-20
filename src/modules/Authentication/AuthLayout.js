import React from "react";
import LandingBg from "../../assets/img/landingBg.png";
import LogoLanding from "../../assets/img/logoLanding2.png";
import "./authLayout.scss";

const style = {
  root: {
    justifyContent: "center",
  },
  width: "100vw",
  height: "100vh",
  position: "fixed",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundImage: `url(${LandingBg})`,
  backgroundSize: "cover",
};

const AuthLayout = (props) => {
    return ( 
        <div className="auth-pages-layout" style={style}>
          <div className="auth-pages-top-bar">
            <img src={LogoLanding} alt="logo" />
          </div>
          {props.children}
        </div>
    );
}
 
export default AuthLayout;


