import React, {Fragment, useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import {withSnackbar} from "notistack";

import Button from "@material-ui/core/Button";

import GenericForm from "../GenericForm";
import {withAbmServices} from "../wrappers";
import {getLoading} from "redux/app/selectors";
import PropTypes from "prop-types";

const MasterDetailedForm = (
  {
    formComponents,
    row,
    onCancel = () => {},
    onSuccess = () => {},
    // wrappers
    services,
    // mapStateToProps
    // mapDispatchToProps
    loading,
  }) => {

  const [data, setData] = useState({});
  const [submitFromOutside, setSubmitFromOutside] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(()=>{
    if(row) {
      setData(row);
      setIsDataLoaded(true);
    }
  },[row]);

  useEffect(() => {
    submitFromOutside && setSubmitFromOutside(false);
  },[submitFromOutside]);

  return (
    <Fragment>
      <GenericForm
        loading={loading}
        emptyPaper={true}
        editMode={true}
        getFormData={(key) => data[key]}
        setFormData={({key, value}) => setData({...data, ...{[key]: value}})}
        //formErrors={formErrors}
        formComponents={formComponents}
        submitFromOutside={submitFromOutside}
        onSubmit={() => {
          const {id, ...rest} = data;
          services.update(id, data).then(({status, data, ...rest}) => {
            onSuccess(data);
          });
        }}
        formDataLoaded={isDataLoaded}
      />
      <div className="actions-buttons-actions">
        <div className="left-side" />
        <div className="right-side">
          <Button
            variant="contained"
            onClick={onCancel} >
            <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSubmitFromOutside(true)} >
            <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

MasterDetailedForm.propTypes = {
  url: PropTypes.string.isRequired,
  formComponents: PropTypes.array.isRequired,
  row: PropTypes.any,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {
    loading: getLoading(state)
  };
};

export default compose(
  connect(mapStateToProps, null),
  withSnackbar,
  injectIntl,
  withAbmServices
)(MasterDetailedForm);