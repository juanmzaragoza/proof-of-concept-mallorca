import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const PurchaseSeriesCreate = (props) => {
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
  const SITCODFAC = props.intl.formatMessage({
    id: "SerieCompra.codigoSituacionFactura",
    defaultMessage: "Código situación factura",
  });
  const SITCODRCT = props.intl.formatMessage({
    id: "SerieCompra.codigoSituacionRectificativa",
    defaultMessage: "Código situación rectificativa",
  });
  const OPEDESC = props.intl.formatMessage({
    id: "SerieCompra.descripcionOperario",
    defaultMessage: "Descripción operario",
  });
  const SITCODCLA = props.intl.formatMessage({
    id: "SerieCompra.codigoSituacionRegimenEspecial",
    defaultMessage: "Código situación régimen especial",
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
        md: 2,
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
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: TIPOASIENTO,
      type: "input",
      key: "tipusSeientComptable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
      ],
    },
    {
      placeHolder: DIARIOCONTABLE,
      type: "input",
      key: "diariComptable",
      breakpoints: {
        xs: 12,
        md: 2,
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
        md: 2,
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
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: CUENTACONTABLEPROFORMAS,
      type: "input",
      key: "compteComptableCompresProformes",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: VALIDODESDE,
      type: "date",
      key: "validDesde",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: VALIDOHASTA,
      type: "date",
      key: "validFins",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: DESGIVA,
      type: "checkbox",
      key: "desglossarIva",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: SITCODFAC,
      type: "input",
      key: "sitCodFac",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: SITCODRCT,
      type: "input",
      key: "sitCodRct",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: SITCODCLA,
      type: "input",
      key: "sitCodCla",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },

    {
      placeHolder: ALMACEN,
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
        md: 3,
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
      placeHolder: OPEDESC,
      type: "input",
      key: "desope",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 3,
      },
      validationType: "string",
      validations: [

        ...props.stringValidations.minMaxValidation(1, 500),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Proveedores.serieCompra",
        defaultMessage: "Serie Compra",
      })}
      formConfiguration={createConfiguration}
      url={API.serieCompras}
    />
  );
};

export default compose(withValidations, injectIntl)(PurchaseSeriesCreate);
