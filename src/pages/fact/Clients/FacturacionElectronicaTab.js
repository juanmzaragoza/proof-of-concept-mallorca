import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import GenericForm from "modules/GenericForm";

import { useTabForm } from "../../../hooks/tab-form";

const FACT_ELECT_SECTION_TAB_INDEX= 0;


const FactElectronicaTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });


  const factElectronicaConfig = [

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.contacto",
        defaultMessage: "Contacto",
      }),
      type: "input",
      key: "contacteFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.telefono",
        defaultMessage: "Teléfono",
      }),
      type: "input",
      key: "telefonFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.email",
        defaultMessage: "E-mail",
      }),
      type: "input",
      key: "emailFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const oficinaContable = [

    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "oficinaComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOficinaComptableCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliOficinaComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const organoGestor = [

    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "organGestor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOrganGestorCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliOrganGestor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];


  const unidadTramitadora = [

    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "unitatTramitadora",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalUnitatTramitadoraCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliUnitatTramitadora",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.fact.ofiContable"}
              defaultMessage={"Ofinica Contable"}
            />
          }
        >
          <GenericForm
            formComponents={oficinaContable}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)}
            onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
            {...props}
          />
        </OutlinedContainer>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.fact.orgGestor"}
              defaultMessage={"Órgano Gestor"}
            />
          }
        >
          <GenericForm
            formComponents={organoGestor}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)}
            onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
            {...props}
          />
        </OutlinedContainer>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.fact.unidadTramitadora"}
              defaultMessage={"Unidad Tramitadora"}
            />
          }
        >
          <GenericForm
            formComponents={unidadTramitadora}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)}
            onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
            {...props}
          />
        </OutlinedContainer>
 
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(FactElectronicaTab);
