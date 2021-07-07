import React, {useEffect, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";

import {useTabForm} from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const CHECKBOX_SECTION_TAB_INDEX = 1;
const FAMILY_CLIENTS_SUPPLIERS_SECTION_TAB_INDEX = 2;

const DocumentFooterTab = ({formData, setFormData, getFormData, ...props}) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[CREATE_SECTION_INDEX]: false, [CHECKBOX_SECTION_TAB_INDEX]:false, [FAMILY_CLIENTS_SUPPLIERS_SECTION_TAB_INDEX]:false}, setIsValid: props.setIsValid});

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  }); 

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('peusDocument', 'codi', CODE)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 8
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.pie",
        defaultMessage: "Pie"
      }),
      type: 'input',
      key: 'pie',
      breakpoints: {
        xs: 12,
        md: 12
      },
      text: {
        multiline: 8
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1000)
      ]
    },
  ];

  const checkConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.albaran",
        defaultMessage: "Albaranes"
      }),
      type: 'checkbox',
      key: 'albara',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.facturas",
        defaultMessage: "Facturas"
      }),
      type: 'checkbox',
      key: 'factura',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.presupuestos",
        defaultMessage: "Presupuestos"
      }),
      type: 'checkbox',
      key: 'pre',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.pedidos",
        defaultMessage: "Pedidos"
      }),
      type: 'checkbox',
      key: 'com',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.certificaciones",
        defaultMessage: "Certificaciones"
      }),
      type: 'checkbox',
      key: 'imprimirPeuCertificacio',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.reparaciones",
        defaultMessage: "Reparaciones"
      }),
      type: 'checkbox',
      key: 'avr',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.orden",
        defaultMessage: "Orden"
      }),
      type: 'input',
      key: 'ordre',
      breakpoints: {
        xs: 6,
        md: 3
      },
      validationType: "number",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 99)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.serieCompra",
        defaultMessage: "Series de Compra"
      }),
      type: 'input',
      key: 'serieCompraCodi',
      breakpoints: {
        xs: 6,
        md: 3
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa"
      }),
      type: 'input',
      key: 'empresa2',
      breakpoints: {
        xs: 6,
        md: 3
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.imprimirClase",
        defaultMessage: "Imprimir Clase"
      }),
      type: 'checkbox',
      key: 'impCls',
      breakpoints: {
        xs: 6,
        md: 3
      },
    },
  ];

  const familyClientsSuppliersConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.familiaClienteProveedor",
        defaultMessage: "Familia Cliente/Proveedor"
      }),
      type: 'checkbox',
      key: 'familiaCliProv',
      breakpoints: {
        xs: 6,
        md: 6
      },
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"PieDocumento.imprimirEn"} defaultMessage={"Imprimir en..."}/>,
      key: 0,
      component: <GenericForm formComponents={checkConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(CHECKBOX_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(CHECKBOX_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Proveedores.familia"} defaultMessage={"Familia"}/>,
      key: 1,
      component: <GenericForm formComponents={familyClientsSuppliersConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(FAMILY_CLIENTS_SUPPLIERS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(FAMILY_CLIENTS_SUPPLIERS_SECTION_TAB_INDEX)}
                              {...props} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"PieDocumento.titulo"} defaultMessage={"Pies Documentos"}/>}>
          <GenericForm formComponents={createConfiguration}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(CREATE_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
                       {...props} />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(DocumentFooterTab);