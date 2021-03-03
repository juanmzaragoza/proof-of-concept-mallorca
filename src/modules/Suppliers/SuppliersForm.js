import React, {useEffect} from 'react';
import {injectIntl} from "react-intl";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Breadcrumbs} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import GeneralTab from "./GeneralTab";
import ConfigurableTabs from "modules/common/ConfigurableTabs";

import {setFormConfig} from "redux/pageHeader";


const tabs = [
  {
    label: "General",
    key: 0,
    component: <GeneralTab />
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


const SuppliersForm = ({ actions }) => {

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
    })
  },[]);

  return (
    <div style={{padding: '10px'}}>
      <ConfigurableTabs tabs={tabs} />
    </div>
  )
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch)
  };
  return { actions };
};

const component = injectIntl(connect(null, mapDispatchToProps)(SuppliersForm));
export default component;