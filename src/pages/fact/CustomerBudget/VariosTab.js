import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const VARIOS_SECTION_INDEX = 0;
const NUMERIC_SECTION_INDEX = 1;

const VariosTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [VARIOS_SECTION_INDEX]: true,
      [NUMERIC_SECTION_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });


  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;


  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const variosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.pteRealizacion",
        defaultMessage: "Porcentaje Relaización",
      }),
      type: "numeric",
      key: "pteRealitzacio",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.pteBaja",
        defaultMessage: "Porcetnaje Baja",
      }),
      type: "numeric",
      key: "pteBaixa",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.horasEquiv",
        defaultMessage: "horas Equivalencia",
      }),
      type: "numeric",
      key: "horesEquiv",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.pteComision",
        defaultMessage: "Porcentaje Comisión",
      }),
      type: "numeric",
      key: "pteComisio",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.impComision",
        defaultMessage: "Imp Comisión",
      }),
      type: "numeric",
      key: "importComisionable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 9999999999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.acumularImporte",
        defaultMessage: "Acumular Importe",
      }),
      type: "checkbox",
      key: "acumularImportAcceptat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
  ];

  const finalFacturaConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.facturaFinal",
        defaultMessage: "Final factura",
      }),
      type: "LOV",
      key: "finalFacturaCodi",
      id: "finalFactura",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
      selector: {
        key: "finalFacturas",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (finalFacturas) => finalFacturas && finalFacturas.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.facturaFinal",
        defaultMessage: "Final factura",
      }),
      type: "LOV",
      key: "finalFacturaCerCodi",
      id: "finalFacturas",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
      selector: {
        key: "finalFacturas",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (finalFacturas) => finalFacturas && finalFacturas.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
  ];

  const ubicacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.latitud",
        defaultMessage: "Latitud",
      }),
      type: "numeric",
      key: "lat",

      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.longitud",
        defaultMessage: "Longitud",
      }),
      type: "numeric",
      key: "lon",

      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
  ];

  const proformaConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.numero",
        defaultMessage: "Número",
      }),
      type: "numeric",
      key: "numeroProforma",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fecha",
        defaultMessage: "Fecha",
      }),
      type: "date",
      key: "dataProforma",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];



  const tipoComisionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoComision",
        defaultMessage: "Tipo comisión",
      }),
      type: "LOV",
      key: "tipusComissio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "tipusComissios",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  const aplicadorConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.aplicadores",
        defaultMessage: "Aplicadores",
      }),
      type: "LOV",
      key: "aplicador",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "aplicadors",
        labelKey: (data) => `${data.nom} ${data.cognoms}`,
        sort: "aplicador",
        cannotCreate: true,
      },
    },
  ];


  const personalAlfConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa1",
        defaultMessage: "Parámetro alfanumérico 1",
      }),
      type: "input",
      key: "parametreTxt1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa2",
        defaultMessage: "Parámetro alfanumérico 2",
      }),
      type: "input",
      key: "parametreTxt2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa3",
        defaultMessage: "Parámetro alfanumérico 3",
      }),
      type: "input",
      key: "parametreTxt3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa4",
        defaultMessage: "Parámetro alfanumérico 4",
      }),
      type: "input",
      key: "parametreTxt4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramAlfa5",
        defaultMessage: "Parámetro alfanumérico 5",
      }),
      type: "input",
      key: "parametreTxt5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const personalNumConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum1",
        defaultMessage: "Parámetro numérico 1",
      }),
      type: "numeric",
      key: "parametreNum1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum2",
        defaultMessage: "Parámetro numérico 2",
      }),
      type: "numeric",
      key: "parametreNum2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum3",
        defaultMessage: "Parámetro numérico 3",
      }),
      type: "numeric",
      key: "parametreNum3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum4",
        defaultMessage: "Parámetro numérico 4",
      }),
      type: "numeric",
      key: "parametreNum4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum5",
        defaultMessage: "Parámetro numérico 5",
      }),
      type: "numeric",
      key: "parametreNum5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const tabs = [
    {
      label: props.intl.formatMessage({
        id: "Presupuestos.parametros",
        defaultMessage: "Parámetros",
      }),
      key: 0,
      component: (
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <OutlinedContainer
              className="contact-tab-container"
              title={
                <FormattedMessage
                  id={"Proveedores.personalizacion.alfanumericos"}
                  defaultMessage={"Parámetros Alfanuméricos"}
                />
              }
            >
              <GenericForm
                formComponents={personalAlfConfig}
                emptyPaper={true}
                editMode={props.editMode}
                setFormData={setFormData}
                getFormData={getFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(NUMERIC_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(NUMERIC_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={6} item>
            <OutlinedContainer
              className="contact-tab-container"
              title={
                <FormattedMessage
                  id={"Proveedores.personalizacion.numericos"}
                  defaultMessage={"Parámetros Numéricos"}
                />
              }
            >
              <GenericForm
                formComponents={personalNumConfig}
                emptyPaper={true}
                editMode={props.editMode}
                setFormData={setFormData}
                getFormData={getFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(NUMERIC_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(NUMERIC_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <GenericForm
          formComponents={variosConfig}
          emptyPaper={true}
          editMode={props.editMode}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(VARIOS_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
          {...props}
        />
      </Grid>

      <Grid xs={9} item>
        <Grid container spacing={2}>
          <Grid xs={8} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Presupuestos.finalFactura"}
                  defaultMessage={"Final Factura"}
                />
              }
            >
              <GenericForm
                formComponents={finalFacturaConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(VARIOS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"AlbaranesCliente.tipoComision"}
                  defaultMessage={"Tipo Comisión"}
                />
              }
            >
              <GenericForm
                formComponents={tipoComisionConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(VARIOS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={8} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Articulos.stock.descuentos.ubicacion"}
                  defaultMessage={"ubicación"}
                />
              }
            >
              <GenericForm
                formComponents={ubicacionConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(VARIOS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"AlbaranesCliente.aplicador"}
                  defaultMessage={"Aplciador "}
                />
              }
            >
              <GenericForm
                formComponents={aplicadorConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(VARIOS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={3} item>
        <Grid xs={12} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Presupuestos.proforma"}
                defaultMessage={"proforma"}
              />
            }
          >
            <GenericForm
              formComponents={proformaConfig}
              emptyPaper={true}
              editMode={props.editMode}
              getFormData={getFormData}
              setFormData={setFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(VARIOS_SECTION_INDEX, value)
              }
              onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(VariosTab);
