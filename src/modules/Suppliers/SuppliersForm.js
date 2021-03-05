import React, {useEffect} from 'react';
import {injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

import {Breadcrumbs} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import GeneralTab from "./GeneralTab";
import ConfigurableTabs from "modules/common/ConfigurableTabs";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {withAbmServices} from "../wrappers";
import {getFormData, getFormErrors} from "../../redux/genericForm/selectors";
import {useParams} from "react-router-dom";
import {setFormData} from "../../redux/genericForm";

const SuppliersForm = ({ actions, formData, submitFromOutside, services, ...props }) => {

  const tabs = [
    {
      label: "General",
      key: 0,
      component: <GeneralTab
        formData={formData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={(data) => create(data)}
        formErrors={props.formErrors}/>
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

  useEffect(() => {
    if(isEditable()){
      setBreadcrumbHeader([{title: "h", href: "/"}, {title: "Modificar"}]);
      //setEditMode(true);
      services.getById(id);
    }
  },[id]);

  const create = (data) => services.create(data);

  useEffect(() => {
    if(submitFromOutside){
      actions.setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  useEffect(() => {
    actions.setFormConfig({
      title: <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={() => {}}>
          Proveedores
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={() => {}}>
          Ruedas Mateu
        </Link>
        <Typography color="textPrimary">General</Typography>
      </Breadcrumbs>,
      onClick: () => {
        console.log("hola")
      }
    });
    actions.setBreadcrumbHeader([
      {title: "Proveedores", href:"/proveedores"},
      {title: "Un Nombre", href:"hol"},
      {title: "General"}
    ]);
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
    formData: getFormData(state)
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