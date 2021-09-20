import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { FACTURA_RECTIFICATIVA_SELECTOR_VALUES } from "../../../constants/selectors";
import { useTabForm } from "hooks/tab-form";

const OPTIONS_SECTION_INDEX = 0;

const OptionsTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [OPTIONS_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndComercialName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nomComercial" },
  ];

  const opciones = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tituloFactura",
        defaultMessage: "Título",
      }),
      type: "input",
      key: "facturaTitol",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ncf",
        defaultMessage: "NCF",
      }),
      type: "input",
      key: "ncf",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.condicionPagoPresupueto",
        defaultMessage: "Condición pago presupueto",
      }),
      type: "LOV",
      key: "condicioPagamentPressupost",
      id: "peusDocument",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "peuDocuments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.pieDocumento",
        defaultMessage: "Pié documento",
      }),
      type: "LOV",
      key: "peuDocument",
      id: "peusDocument",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "peuDocuments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.validoDesde",
        defaultMessage: "Válida Desde",
      }),
      type: "date",
      required: true,
      key: "validDesde",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.hasta",
        defaultMessage: "Hasta",
      }),
      type: "date",
      required: true,
      key: "validFins",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa",
      }),
      type: "LOV",
      key: "empresa",
      required: true,
      id: "empresa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndComercialName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.departamento",
        defaultMessage: "Departamento",
      }),
      type: "LOV",
      key: "departament",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "departaments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.rectificativa",
        defaultMessage: "Rectificativa",
      }),
      type: "select",
      key: "facturaRectificativa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: FACTURA_RECTIFICATIVA_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.numeracionManual",
        defaultMessage: "Numeración manual",
      }),
      type: "checkbox",
      key: "numeracioManual",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.aplicarDescuento",
        defaultMessage: "Aplicar descuento",
      }),
      type: "checkbox",
      key: "aplicarDescompte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.desglosarIva",
        defaultMessage: "Desglorar IVA",
      }),
      type: "checkbox",
      key: "desglossarIva",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.adjudicacionAlbaranFactura",
        defaultMessage: "Adjudicación Albaran/Factura",
      }),
      type: "checkbox",
      key: "adjalbfac",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={opciones}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(OPTIONS_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(OPTIONS_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(OptionsTab);
