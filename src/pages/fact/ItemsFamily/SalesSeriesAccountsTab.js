import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {FACTURA_RECTIFICATIVA_SELECTOR_VALUES} from "../../../constants/selectors";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const SalesSeriesAccountsTab = ({ formData, setFormData, getFormData, ...props }) => {

  const CODE = props.intl.formatMessage({id: "SerieVenta.serie", defaultMessage: "Série"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const NOM = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];
  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];
  const aSCodeAndComercialName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nomComercial'}];

  const seriesVenta = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.seriesVenta",
      defaultMessage: "Cuentas Series Ventas",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "SerieVenta.serie",
          defaultMessage: "Série",
        }),
      },
      {
        name: "descripcio",
        title: DESCRIPCIO,
      },
      {
        name: "validDesde",
        title: props.intl.formatMessage({
          id: "SerieVenta.diaInicio",
          defaultMessage: "Día Inicio",
        }),
        getCellValue: row => row.validDesde ? new Date(row.validDesde).toLocaleDateString() : "" 
      },
      {
        name: "validFins",
        title: props.intl.formatMessage({
          id: "SerieVenta.diaFin",
          defaultMessage: "Día Fin",
        }),
        getCellValue: row => row.validFins ? new Date(row.validFins).toLocaleDateString() : "" 
      },
      {
        name: "compteVendes",
        title: props.intl.formatMessage({
          id: "Clientes.cuenta.ventas",
          defaultMessage: "Cuenta ventas",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: CODE,
        type: "input",
        required: true,
        key: "codi",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
          ...props.stringValidations.minMaxValidation(1, 30)
        ]
      },
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
          md: 4,
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.traspasarAContabilidad",
          defaultMessage: "Traspasar a contabilidad"
        }),
        type: 'checkbox',
        key: 'traspassarAComptabilitat',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.combinarCuentaVentaConCliente",
          defaultMessage: "Combinar cuenta venta con cliente"
        }),
        type: 'checkbox',
        key: 'combinarCompteVendaAmbClient',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 4
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.tipoAsientoContable",
          defaultMessage: "Tipo asiento contable",
        }),
        type: "input",
        key: "tipusAssentamentContable",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.tipoFactura",
          defaultMessage: "Tipo Factura",
        }),
        type: "input",
        key: "sitCodFac",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
      },
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
          multiline: 3
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 500)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.adjudicacionAlbaranFactura",
          defaultMessage: "Adjudicación Albaran/Factura"
        }),
        type: 'checkbox',
        key: 'adjalbfac',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.imm",
          defaultMessage: "Venta de inmuebles"
        }),
        type: 'checkbox',
        key: 'imm',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiTip",
          defaultMessage: "Sii tipo"
        }),
        type: 'checkbox',
        key: 'siiTip',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiPrsSrv",
          defaultMessage: "Prestación de servicios"
        }),
        type: 'checkbox',
        key: 'siiPrsSrv',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiEntBin",
          defaultMessage: "Entrega de bienes"
        }),
        type: 'checkbox',
        key: 'siiEntBin',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiSujNotExe",
          defaultMessage: "Sujeta / No exenta"
        }),
        type: 'checkbox',
        key: 'siiSujNotExe',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiSujExe",
          defaultMessage: "Sujeta / Exenta"
        }),
        type: 'checkbox',
        key: 'siiSujExe',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiNotSuj",
          defaultMessage: "No sujeta"
        }),
        type: 'checkbox',
        key: 'siiNotSuj',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.siiImpSuj",
          defaultMessage: "SiiImpSuj"
        }),
        type: 'checkbox',
        key: 'siiImpSuj',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.facturaAñoAnterior",
          defaultMessage: "Factura año anterior"
        }),
        type: 'checkbox',
        key: 'facturaAnyAnterior',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.tipSbt",
          defaultMessage: "Tipo sustitutiva"
        }),
        type: 'checkbox',
        key: 'tipSbt',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.cosIdr",
          defaultMessage: "Costes indirectos"
        }),
        type: 'checkbox',
        key: 'cosIdr',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.cmpDebNeg",
          defaultMessage: "CmpDebNeg"
        }),
        type: 'checkbox',
        key: 'cmpDebNeg',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
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
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.sitCodCla",
          defaultMessage: "Clave del regimen especial",
        }),
        type: "input",
        key: "sitCodCla",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
        validations: [
          ...props.stringValidations.minMaxValidation(1, 20)
        ]
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
          multiline: 3
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 500)
        ]
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
          md: 4,
        },
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
          md: 4,
        },
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
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
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
        validations: [
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.cuentaVentasProforma",
          defaultMessage: "Cuenta de ventas proforma",
        }),
        type: "LOV",
        key: "condicioPagamentPressupost",
        id: "peusDocument",
        breakpoints: {
          xs: 12,
          md: 4,
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
          md: 4,
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
          id: "SerieVenta.almacen",
          defaultMessage: "Almacén",
        }),
        type: "LOV",
        key: "magatzem",
        breakpoints: {
          xs: 12,
          md: 4,
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
        key: "empresaOp",
        id: "empresa",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndComercialName,
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
          md: 4,
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
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        type: "LOV",
        key: "projecte",
        breakpoints: {
          xs: 12,
          md: 4,
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
          id: "FamiliaArticulos.delegacion",
          defaultMessage: "Delegación",
        }),
        type: "LOV",
        key: "delegacio",
        breakpoints: {
          xs: 12,
          md: 4,
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
          id: "SerieVenta.facturaRectificativa",
          defaultMessage: "Factura rectificativa"
        }),
        type: "select",
        key: 'facturaRectificativa',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 4
        },
        selector: {
          options: FACTURA_RECTIFICATIVA_SELECTOR_VALUES
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.numeracionManual",
          defaultMessage: "Numeración manual"
        }),
        type: 'checkbox',
        key: 'numeracioManual',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.aplicarDescuento",
          defaultMessage: "Aplicar descuento"
        }),
        type: 'checkbox',
        key: 'aplicarDescompte',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.desglosarIva",
          defaultMessage: "Desglorar IVA"
        }),
        type: 'checkbox',
        key: 'desglossarIva',
        breakpoints: {
          xs: 12,
          sm: 6,
          md: 3
        },
      },
    ],
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"SerieVenta.cuentasVentas"}
              defaultMessage={"Cuentas de Ventas"}
            />
          }
        >
         <ExpandableGrid
          id="serieVendas"
          responseKey="serieVendas"
          enabled={props.editMode}
          configuration={seriesVenta}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SalesSeriesAccountsTab);
