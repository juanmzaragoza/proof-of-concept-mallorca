import React from "react";

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
  backgroundSize: "cover",
};


const AuthLayout = (props) => {
    return ( 
        <div className="auth-pages-layout" style={style}>
          {props.children}
        </div>
    );
}
 
export default AuthLayout;


