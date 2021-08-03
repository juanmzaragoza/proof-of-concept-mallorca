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
      [DATOS_CONTABLES_SECTION_TAB_INDEX]: false,
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
      key: "codi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 2),
      ],
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      required: true,
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 4,
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
        md: 2,
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
        md: 2,
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
        md: 4,
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
        md: 4,
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
        md: 4,
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
        md: 4,
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
        md: 4,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentaVentasProforma",
        defaultMessage: "Cuenta de ventas proforma",
      }),
      type: "input",
      key: "compteVendesProforma",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
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
        id: "SerieVenta.diarioContableProforma",
        defaultMessage: "Diario contable proforma",
      }),
      type: "input",
      key: "diariContableProformes",
      breakpoints: {
        xs: 12,
        md: 3,
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
      required: true,
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
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
        id: "SerieVenta.cuentaPresupuestoProforma",
        defaultMessage: "Cuenta presupuesto proforma",
      }),
      type: "input",
      key: "compteProformaPressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cuentaProformaEntidadesPublicas",
        defaultMessage: "Cuenta proforma entidades públicas",
      }),
      type: "input",
      key: "compteProformaEntPubPressupost",
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
        id: "SerieVenta.cuentaVentasEntidadesPublicasProforma",
        defaultMessage: "Cuenta de ventas entidades públicas proforma",
      }),
      type: "input",
      key: "compteVendesProformaEntPub",
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
        md: 2,
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
        md: 2,
      },
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
        md: 2,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];

  const opciones = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.facturaTitulo",
        defaultMessage: "Factura Titulo",
      }),
      type: "input",
      key: "facturaTitol",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 2,
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
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.diaInicio",
        defaultMessage: "Día Inicio",
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
        id: "SerieVenta.diaFin",
        defaultMessage: "Día Fin",
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
        id: "SerieVenta.facturaRectificativa",
        defaultMessage: "Factura rectificativa",
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
        id: "SerieVenta.desglosarIva",
        defaultMessage: "Desglorar IVA",
      }),
      type: "checkbox",
      key: "desglossarIva",
      breakpoints: {
        xs: 12,
        md: 2,
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
        id: "SerieVenta.almacen",
        defaultMessage: "Almacén",
      }),
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
        advancedSearchColumns: aSCodeAndName,
      },
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
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa",
      }),
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
        advancedSearchColumns: aSCodeAndComercialName,
      },
    },
  ];

  const sii = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoFactura",
        defaultMessage: "Tipo factura",
      }),
      type: "input",
      key: "sitCodFac",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoRectificativa",
        defaultMessage: "Tipo rectificativa",
      }),
      type: "input",
      key: "sitCodRct",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.sitCodCla",
        defaultMessage: "Clave de régimen especial",
      }),
      type: "input",
      key: "sitCodCla",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoDesglose",
        defaultMessage: "Tipo de desglose",
      }),
      type: "input",
      key: "sitCodDsgTip",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.sitCodExe",
        defaultMessage: "Causa de exención",
      }),
      type: "input",
      key: "sitCodExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiPrsSrv",
        defaultMessage: "Prestación de servicios",
      }),
      type: "checkbox",
      key: "siiPrsSrv",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiEntBin",
        defaultMessage: "Entrega de bienes",
      }),
      type: "checkbox",
      key: "siiEntBin",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiSujNotExe",
        defaultMessage: "Sujeta / No exenta",
      }),
      type: "checkbox",
      key: "siiSujNotExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiSujExe",
        defaultMessage: "Sujeta / Exenta",
      }),
      type: "checkbox",
      key: "siiSujExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiNotSuj",
        defaultMessage: "No sujeta",
      }),
      type: "checkbox",
      key: "siiNotSuj",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.imm",
        defaultMessage: "Venta de inmuebles",
      }),
      type: "checkbox",
      key: "imm",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipSbt",
        defaultMessage: "Tipo sustitutiva",
      }),
      type: "checkbox",
      key: "tipSbt",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiTip",
        defaultMessage: "Sii tipo",
      }),
      type: "checkbox",
      key: "siiTip",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiImpSuj",
        defaultMessage: "SiiImpSuj",
      }),
      type: "checkbox",
      key: "siiImpSuj",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.cmpDebNeg",
        defaultMessage: "CmpDebNeg",
      }),
      type: "checkbox",
      key: "cmpDebNeg",
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
        id: "SerieVenta.descripcionOperacion",
        defaultMessage: "Descripción operación",
      }),
      type: "input",
      key: "descripcioOperari",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 500)],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"SerieVenta.ultimosNumeros"}
          defaultMessage={"Últimos numeros"}
        />
      ),
      key: 0,
      component: (
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
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"SerieVenta.datosContables"}
          defaultMessage={"Datos contables"}
        />
      ),
      key: 1,
      component: (
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
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"SerieVenta.opciones"}
          defaultMessage={"Opciones"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={opciones}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(OPTIONS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(OPTIONS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"SerieVenta.sii"} defaultMessage={"SII"} />,
      key: 3,
      component: (
        <GenericForm
          formComponents={sii}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(SII_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(SII_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"SerieVenta.titulo"}
              defaultMessage={"Serie ventas"}
            />
          }
        >
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
export default compose(React.memo, withValidations, injectIntl)(SalesSeriesTab);
