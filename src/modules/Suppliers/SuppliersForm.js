import React, {useEffect, useState} from 'react';
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

import GeneralTab from "./GeneralTab";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {withAbmServices} from "../wrappers";
import {getFormData, getFormErrors} from "../../redux/genericForm/selectors";
import {useParams} from "react-router-dom";
import {setFormData} from "../../redux/genericForm";
import {getLoading} from "../../redux/app/selectors";

const SuppliersForm = ({ actions, formData, submitFromOutside, services, ...props }) => {

  const [editMode, setEditMode] = useState(false);

  const tabs = [
    {
      label: "General",
      key: 0,
      component: <GeneralTab
        editMode={editMode}
        formData={formData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={(data) => isEditable()? update(id, data):create(data)}
        formErrors={props.formErrors}
        loading={props.loading} />
    },
    {
      label: "Contactos",
      key: 1,
      component: "Contactos"
    },
    {
      label: "Contabilidad",
      key: 2,
      component: "Contabilidad"
    },
    {
      label: "Facturación",
      key: 3,
      component: "Facturación"
    },
    {
      label: "Personalización",
      key: 4,
      component: "Personalización"
    },
    {
      label: "Documentos",
      key: 5,
      component: "Documentos"
    },
    {
      label: "Precios Coste",
      key: 6,
      component: "Precios Coste"
    },
    {
      label: "Series",
      key: 7,
      component: "Series"
    },
  ];

  const { id } = useParams();

  const isEditable = () => {
    return !!id;
  };

  const create = (data) => services.create(data);
  const update = (id, data) => services.update(id, data);

  useEffect(() => {
    if(isEditable()){
      setEditMode(true);
      services.getById(id);
    }
  },[id]);

  useEffect(() => {
    if(submitFromOutside){
      actions.setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  useEffect(() => {
    actions.setFormConfig({});

    // breadcrumbs config
    if(isEditable()){
      actions.setBreadcrumbHeader([
        {title: "Proveedores", href:"/proveedores"},
        {title: "Nombre a editar", href:"/proveedores"},
        {title: "General"}
      ]);
    } else{
      actions.setBreadcrumbHeader([{title: "Proveedores", href:"/proveedores"},{title: "Nuevo"}]);
    }
  },[]);

  return (
    <div style={{padding: '10px'}}>
      <ConfigurableTabs tabs={tabs} />
    </div>
  )
};

const mapStateToProps = (state, props) => {
  return {
    submitFromOutside: getFireSave(state),
    formErrors: getFormErrors(state),
    formData: getFormData(state),
    loading: getLoading(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
    setSubmitFromOutside: bindActionCreators(setFireSaveFromHeader, dispatch),
    setFormData: bindActionCreators(setFormData, dispatch),
  };
  return { actions };
};

const component = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  withAbmServices
)(SuppliersForm);
export default component;