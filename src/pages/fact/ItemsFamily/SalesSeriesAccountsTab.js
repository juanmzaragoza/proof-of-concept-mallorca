import React, {useEffect, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";

import {useTabForm} from "hooks/tab-form";

const SalesSeriesAccountsTab = ({formData, setFormData, getFormData, ...props}) => {
  const [ touched, handleTouched, addValidity, formIsValid ] = useTabForm({fields: {0:false}, setIsValid: props.setIsValid});
  
  const TITLE = props.intl.formatMessage({id: "FamiliaArticulos.tabs.seriesVenta", defaultMessage: "Cuentas Series Ventas"});

  const SerieVentasConfiguration = {
    title: TITLE,
    // query: [
    //   {
    //     columnName: 'articleFamilia.id',
    //     value: `"${ItemFamilyId}"`,
    //     exact: true
    //   }
    // ],
    // extraPostBody: {
    //   articleFamilia: {id: ItemFamilyId}
    // },
    columns: [
      { 
        name: 'emprcodiesa',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        }),
      },
      { 
        name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        }),
      },
      { 
        name: 'validDesde',
        title: props.intl.formatMessage({
          id: "SerieVenta.diaInicio",
          defaultMessage: "Día Inicio"
        }),
      },
      { 
        name: 'validDesde',
        title: props.intl.formatMessage({
          id: "SerieVenta.diaFin",
          defaultMessage: "Día Fin"
        }),
      },
      { 
        name: 'validDesde',
        title: props.intl.formatMessage({
          id: "Clientes.cuenta.ventas",
          defaultMessage: "Cuenta ventas"
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.web",
          defaultMessage: "Web",
        }),
        type: 'checkbox',
        key: 'web',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
    ],
  }

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="contact-tab-container" title={<FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"}/>}>
          <GenericForm
            formComponents={SerieVentasConfiguration}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={props.getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={value => addValidity(0,value)}
            onBlur={(e) => handleTouched(0)}
            {...props} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(SalesSeriesAccountsTab);