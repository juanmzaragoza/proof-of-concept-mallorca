import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { FACTURA_RECTIFICATIVA_SELECTOR_VALUES } from "../../../constants/selectors";
import { useTabForm } from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const LAST_NUMBERS_SECTION_TAB_INDEX = 1;
const DATOS_CONTABLES_SECTION_TAB_INDEX = 2;
const OPTIONS_SECTION_TAB_INDEX = 2;
const SII_SECTION_TAB_INDEX = 2;

const SalesSeriesTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: false,
      [LAST_NUMBERS_SECTION_TAB_INDEX]: false,
      [DATOS_CONTABLES_SECTION_TAB_INDEX]: true,
      [OPTIONS_SECTION_TAB_INDEX]: false,
      [SII_SECTION_TAB_INDEX]: true,
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

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "input",
      required: true,
      noEditable: true,
      key: "codi",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.stringValidations.fieldExistsValidation(
          "serieVendas",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
      ],
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      required: true,
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
   
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.delegacion",
        defaultMessage: "Delegación",
      }),
      type: "LOV",
      key: "delegacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "delegacios",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cosIdr",
        defaultMessage: "Costes indirectos",
      }),
      type: "checkbox",
      key: "cosIdr",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const ultimosNumeros = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimoAlbaran",
        defaultMessage: "Último albarán",
      }),
      type: "numeric",
      required: true,
      key: "darrerAlbara",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimaFactura",
        defaultMessage: "Última factura",
      }),
      type: "numeric",
      required: true,
      key: "darreraFactura",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimoPresupuesto",
        defaultMessage: "Último presupuesto",
      }),
      type: "numeric",
      required: true,
      key: "darrerPressupost",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimaFacturaProforma",
        defaultMessage: "Última factura proforma",
      }),
      type: "numeric",
      required: true,
      key: "darreraFacturaProforma",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimoAlbaranProforma",
        defaultMessage: "Último albarán proforma",
      }),
      type: "numeric",
      required: true,
      key: "darrerAlbaraProforma",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.ultimaFacturaAñoAnterior",
        defaultMessage: "Última factura año anterior",
      }),
      type: "numeric",
      required: true,
      key: "darreraFacturaAnyAnterior",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];

  const datosContables = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoAsientoContable",
        defaultMessage: "Tipo asiento contable",
      }),
      type: "input",
      key: "tipusAssentamentContable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.diarioContable",
        defaultMessage: "Diario contable",
      }),
      type: "input",
      key: "diariContable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentasVentas",
        defaultMessage: "Cuentas de Ventas",
      }),
      type: "input",
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentaVentasEntidadesPublicas",
        defaultMessage: "Cuenta de ventas entidades públicas",
      }),
      type: "input",
      key: "compteVendesEntitatsPubliques",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentaPresupuesto",
        defaultMessage: "Cuenta presupuesto",
      }),
      type: "input",
      key: "comptePressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentaPresupuestoEntidadesPublicas",
        defaultMessage: "Cuenta presupuesto entidades públicas",
      }),
      type: "input",
      key: "compteEntPubPressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.traspasarAContabilidad",
        defaultMessage: "Traspasar a contabilidad",
      }),
      type: "checkbox",
      key: "traspassarAComptabilitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.combinarCuentaVentaConCliente",
        defaultMessage: "Combinar cuenta venta con cliente",
      }),
      type: "checkbox",
      key: "combinarCompteVendaAmbClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.facturaAñoAnterior",
        defaultMessage: "Factura año anterior",
      }),
      type: "checkbox",
      key: "facturaAnyAnterior",
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
          formComponents={createConfiguration}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(CREATE_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={4} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"SerieVenta.ultimosNumeros"}
                defaultMessage={"Serie ventas"}
              />
            }
          >
            <GenericForm
              formComponents={ultimosNumeros}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(LAST_NUMBERS_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(LAST_NUMBERS_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
        <Grid xs={8} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"SerieVenta.datosContables"}
                defaultMessage={"Serie ventas"}
              />
            }
          >
            <GenericForm
              formComponents={datosContables}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(DATOS_CONTABLES_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(DATOS_CONTABLES_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
    
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SalesSeriesTab);
