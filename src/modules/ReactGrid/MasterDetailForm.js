import React, {Fragment, useEffect, useState} from "react";
import {compose} from "redux";
import Button from "@material-ui/core/Button";

import GenericForm from "../GenericForm";
import {withSnackbar} from "notistack";
import {FormattedMessage, injectIntl} from "react-intl";

const MasterDetailedForm = ({ formComponents, row, onCancel }) => {

  const [data, setData] = useState({});
  const [submitFromOutside, setSubmitFromOutside] = useState(false);

  useEffect(()=>{
    setData(row);
  },[row]);

  useEffect(() => {
    submitFromOutside && setSubmitFromOutside(false);
  },[submitFromOutside]);

  return (
    <Fragment>
      <GenericForm
        //loading={loading}
        emptyPaper={true}
        editMode={true}
        getFormData={(key) => data[key]}
        setFormData={({key, value}) => setData({...data, ...{[key]: value}})}
        //formErrors={formErrors}
        formComponents={formComponents}
        submitFromOutside={submitFromOutside}
        onSubmit={(submittedData) => window.alert(JSON.stringify(data))}
        //formDataLoaded={props.formDataLoaded}
      />
      <div className="actions-buttons-actions">
        <div className="left-side" />
        <div className="right-side">
          <Button
            variant="contained"
            onClick={() => onCancel && onCancel()} >
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

export default compose(
  withSnackbar,
  injectIntl,
)(MasterDetailedForm);