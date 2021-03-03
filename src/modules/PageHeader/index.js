import PropTypes from "prop-types";
import {connect} from "react-redux";

import ListingHeader from "./ListingHeader";
import FormHeader from "./FormHeader";
import {getFormConfig, getListingConfig} from "redux/pageHeader/selectors";

const PageHeader = ({ listingConfig, formConfig}) => {
  let component;
  if(listingConfig){
    component = <ListingHeader config={listingConfig} />
  } else{
    component = <FormHeader config={formConfig} />
  }
  return component;
};

PageHeader.propTypes = {
  listingConfig: PropTypes.any,
  formConfig: PropTypes.any
};

const mapStateToProps = (state, props) => {
  return {
    listingConfig: getListingConfig(state),
    formConfig: getFormConfig(state)
  };
};

const component = connect(
  mapStateToProps,
  null
)(PageHeader);

export default component;