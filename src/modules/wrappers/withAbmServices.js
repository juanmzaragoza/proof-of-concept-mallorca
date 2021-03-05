import React from "react";
import Axios from "Axios";
import {injectIntl} from "react-intl";
import {withSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {addError, resetError} from "../../redux/genericForm";

const withAbmServices = (PassedComponent) => {

  const WrappedComponent = (props) => {
    const history = useHistory();

    const create = (data) => {
      const queryString = `${props.url}`;
      props.resetError();
      Axios.post(queryString, JSON.stringify(data), {
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(({status, data, ...rest}) => {
          history.goBack();
          props.enqueueSnackbar(props.intl.formatMessage({
            id: "CreateUpdateForm.creacion_correcta",
            defaultMessage: "Registro creado correctamente"
          }), {variant: 'success'});
        })
        .catch(error => {
          if(error.response){
            handlePersistError(error.response);
          } else{
            props.enqueueSnackbar(props.intl.formatMessage({
              id: "CreateUpdateForm.actualizacion_correcta",
              defaultMessage: "Servidor fuera de servicio"
            }), {variant: 'error'});
          }
        });
    };

    const update = (id, data) => {
      const queryString = `${props.url}/${id}`;
      props.resetError();
      Axios.put(queryString, JSON.stringify(data), {
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(({status, data, ...rest}) => {
          history.goBack();
          props.enqueueSnackbar(props.intl.formatMessage({
            id: "CreateUpdateForm.actualizacion_correcta",
            defaultMessage: "Registro actualizado correctamente"
          }), {variant: 'success'});
        })
        .catch(error => {
          handlePersistError(error.response);
        });
    }

    const handlePersistError = ({status, data}) => {
      if (status === 400 && data.errors) {
        for (const err of data.errors) {
          props.addError({[err.field]: {message: err.defaultMessage}});
        }
      }
      props.enqueueSnackbar(props.intl.formatMessage({
        id: "CreateUpdateForm.revise_datos",
        defaultMessage: "Revise los datos e intente nuevamente..."
      }), {variant: 'error'});
    }

    return <PassedComponent services={{create, update}} {...props} ></PassedComponent>;
  }

  const mapStateToProps = (state, props) => {
    return {
      //submitFromOutside: getFireSave(state)
    };
  };

  const mapDispatchToProps = (dispatch, props) => {
    const actions = {
      addError: bindActionCreators(addError, dispatch),
      resetError: bindActionCreators(resetError, dispatch)
    };
    return actions;
  };

  return compose(
    connect(mapStateToProps,mapDispatchToProps),
    withSnackbar,
    injectIntl
  )(WrappedComponent);
}

export default withAbmServices;