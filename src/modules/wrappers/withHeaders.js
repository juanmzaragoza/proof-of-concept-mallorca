import React, {useEffect} from "react";
import {bindActionCreators, compose} from "redux";
import {injectIntl} from "react-intl";
import {resetHeaders} from "../../redux/pageHeader";
import {connect} from "react-redux";

const withHeaders = (PassedComponent) => {

  const WrappedComponent = ({dispatcher, ...props}) => {

    // reset the header when is used
    useEffect(()=>{
      return () => dispatcher.resetHeaders();
    });

    return <PassedComponent {...props} ></PassedComponent>;
  }

  const mapDispatchToProp = (dispatch, props) => {
    const dispatcher = {
      resetHeaders: bindActionCreators(resetHeaders, dispatch),
    };
    return { dispatcher };
  };

  return compose(
    injectIntl,
    connect(null,mapDispatchToProp)
  )(WrappedComponent);
}

export default withHeaders;