import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { useTabForm } from "hooks/tab-form";

const GENERAL_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [GENERAL_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const NOMCOMERCIAL = props.intl.formatMessage({
    id: "Presupuestos.nombreComercialCliente",
    defaultMessage: "Nombre Comercial",
  });
  const TIPOASIENTO = props.intl.formatMessage({
    id: "SerieVenta.tipoAsientoContable",
    defaultMessage: "Tipo asiento contable",
  });
  const DIARIOCONTABLE = props.intl.formatMessage({
    id: "SerieVenta.diarioContable",
    defaultMessage: "Diario contable",
  });
  const CUENTACONTABLE = props.intl.formatMessage({
    id: "SerieCompra.cuentaContableCompras",
    defaultMessage: "Cuenta contable compras",
  });
  const DIARIOCONTABLEPROFORMAS = props.intl.formatMessage({
    id: "SerieVenta.diarioContableProforma",
    defaultMessage: "Diario contable proforma",
  });
  const CUENTACONTABLEPROFORMAS = props.intl.formatMessage({
    id: "SerieVenta.cuentasContablesComprasProforma",
    defaultMessage: "Cuenta contable compras proformas",
  });
  const VALIDODESDE = props.intl.formatMessage({
    id: "SerieCompra.validoDesde",
    defaultMessage: "Válido desde",
  });
  const VALIDOHASTA = props.intl.formatMessage({
    id: "SerieCompra.validoHasta",
    defaultMessage: "Válido hasta",
  });
  const DESGIVA = props.intl.formatMessage({
    id: "SerieVenta.desglosarIva",
    defaultMessage: "Desglorar IVA",
  });
  const ALMACEN = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.almacen",
    defaultMessage: "Almacén",
  });
  const EMPRESA = props.intl.formatMessage({
    id: "FamiliaArticulos.empresa",
    defaultMessage: "Empresa",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.stringValidations.fieldExistsValidation(
          "serieCompras",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: ALMACEN,
      type: "LOV",
      key: "magatzem",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "magatzems",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nom" },
        ],
      },
    },
    {
      placeHolder: EMPRESA,
      type: "LOV",
      key: "empresaOp",
      id: "empresa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOMCOMERCIAL, name: "nomComercial" },
        ],
      },
    },
    {
      placeHolder: DESGIVA,
      type: "checkbox",
      key: "desglossarIva",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const datosContables = [
    {
      placeHolder: TIPOASIENTO,
      type: "input",
      key: "tipusSeientComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: DIARIOCONTABLE,
      type: "input",
      key: "diariComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: CUENTACONTABLE,
      type: "input",
      key: "compteComptableCompres",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: CUENTACONTABLEPROFORMAS,
      type: "input",
      key: "compteComptableCompresProformes",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: DIARIOCONTABLEPROFORMAS,
      type: "input",
      key: "diariComptableProformes",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
  ];

  const validez = [
    {
      placeHolder: VALIDODESDE,
      type: "date",
      key: "validDesde",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: VALIDOHASTA,
      type: "date",
      key: "validFins",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={createConfiguration}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={8}>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"SerieVenta.datosContables"}
              defaultMessage={"Datos Contables"}
            />
          }
        >
          <GenericForm
            formComponents={datosContables}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid item xs={4}>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"SeriesCompras.periodoValidez"}
              defaultMessage={"Período Validez"}
            />
          }
        >
          <GenericForm
            formComponents={validez}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
