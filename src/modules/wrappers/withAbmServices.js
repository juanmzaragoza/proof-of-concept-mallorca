import React from "react";
import {injectIntl} from "react-intl";
import {withSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";

import Axios from "Axios";
import {
  addError,
  changeIsSubmitted,
  resetAllGenericForm,
  resetError,
  setDataLoaded,
  setFormData
} from "redux/genericForm";
import {finishLoading, startLoading} from "redux/app";
import {getLoading} from "redux/app/selectors";

const withAbmServices = (PassedComponent) => {

  const WrappedComponent = (props) => {
    const history = useHistory();
    const pathname = history.location.pathname;

    const create = (data, callback = () => {}) => {
      // avoid multiple calls
      if(props.isLoading) return;
      const queryString = `${props.url}`;
      props.resetError();
      props.startLoading();
      Axios.post(queryString, JSON.stringify(data), {
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(({status, data, ...rest}) => {
          const editUrl = `${pathname.substring(0, pathname.lastIndexOf("/"))}/${data.id}`;
          props.finishLoading();
          props.enqueueSnackbar(props.intl.formatMessage({
            id: "CreateUpdateForm.creacion_correcta",
            defaultMessage: "Registro creado correctamente"
          }), {variant: 'success'});
          props.changeIsSubmitted(false);
          history.push(editUrl);
        })
        .catch(error => {
          props.finishLoading();
          error.response && handlePersistError(error.response);
          callback(error);
        });
    };

    const update = (id, data) => {
      // avoid multiple calls
      if(props.isLoading) return;
      const queryString = `${props.url}/${id}`;
      props.resetError();
      props.startLoading();
      Axios.put(queryString, JSON.stringify(data), {
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(({status, data, ...rest}) => {
          props.finishLoading();
          props.changeIsSubmitted(false);
          props.enqueueSnackbar(props.intl.formatMessage({
            id: "CreateUpdateForm.actualizacion_correcta",
            defaultMessage: "Registro actualizado correctamente"
          }), {variant: 'success'});
        })
        .catch(error => {
          props.finishLoading();
          error.response && handlePersistError(error.response);
        });
    }

    const getById = (id) => {
      return new Promise((resolve, reject) => {
        const queryString = `${props.url}/${id}`;
        props.startLoading();
        Axios.get(queryString, {
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(({status, data, ...rest}) => {
            props.finishLoading();
            props.setFormData(data);
            props.setDataIsLoaded();
            resolve(data);
          })
          .catch(error => {
            props.finishLoading();
            const status = error.response && error.response.status;
            if (status === 400) {
              props.enqueueSnackbar(props.intl.formatMessage({
                id: "ReactGrid.error.algo_salio_mal",
                defaultMessage: "Ups! Algo ha salido mal :("
              }), {variant: 'error'});
            }
            history.goBack();
            reject(error);
          });
      });
    };

    const handlePersistError = ({status, data}) => {
      if (status === 400 && data.errors) {
        for (const err of data.errors) {
          props.addError({[err.field]: {message: err.defaultMessage}});
        }
        props.enqueueSnackbar(props.intl.formatMessage({
          id: "CreateUpdateForm.revise_datos",
          defaultMessage: "Revise los datos e intente nuevamente..."
        }), {variant: 'error'});
      }
    }

    return <PassedComponent services={{create, update, getById}} {...props} ></PassedComponent>;
  }

  const mapStateToProps = (state, props) => {
    return {
      isLoading: getLoading(state)
    };
  };

  const mapDispatchToProps = (dispatch, props) => {
    const actions = {
      addError: bindActionCreators(addError, dispatch),
      resetError: bindActionCreators(resetError, dispatch),
      setFormData: bindActionCreators(setFormData, dispatch),
      startLoading: bindActionCreators(startLoading, dispatch),
      finishLoading: bindActionCreators(finishLoading, dispatch),
      resetForm: bindActionCreators(resetAllGenericForm, dispatch),
      setDataIsLoaded: bindActionCreators(setDataLoaded, dispatch),
      changeIsSubmitted: bindActionCreators(changeIsSubmitted, dispatch),
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