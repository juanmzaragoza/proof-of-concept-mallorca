import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const PurchasingSeriesAccountsTab = ({ formData, setFormData, getFormData, ...props }) => {

  const CODE = props.intl.formatMessage({id: "SerieVenta.Serie", defaultMessage: "Série"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const NOM = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];
  const aSCodeAndComercialName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nomComercial'}];

  const PurchasingSeries = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.seriesVenta",
      defaultMessage: "Cuentas Series Ventas",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "SerieVenta.Serie",
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
      },
      {
        name: "validFins",
        title: props.intl.formatMessage({
          id: "SerieVenta.diaFin",
          defaultMessage: "Día Fin",
        }),
      },
      {
        name: "compteComptableCompres",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.ctaprcmp",
          defaultMessage: "Cuenta Compras",
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
          md: 2,
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
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 30)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.tipoAsiento",
          defaultMessage: "Tipo asiento contable",
        }),
        type: "input",
        required: true,
        key: "tipusSeientComptable",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.diarioContable",
          defaultMessage: "Diario contable",
        }),
        type: "input",
        required: true,
        key: "diariComptable",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 2)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.cuenta",
          defaultMessage: "Cuenta contable",
        }),
        type: "input",
        required: true,
        key: "compteComptableCompres",
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
          id: "SerieVenta.cuentasContablesProforma",
          defaultMessage: "Cuenta contable proformas",
        }),
        type: "input",
        required: true,
        key: "compteComptableCompres",
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
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.cuentasContablesComprasProforma",
          defaultMessage: "Cuenta contable compras proformas",
        }),
        type: "input",
        required: true,
        key: "diariComptableProformes",
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
          id: "SerieVenta.situacionCodigoFacturacion",
          defaultMessage: "Situación código facturación",
        }),
        type: "input",
        key: "sitCodFac",
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
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.situacionCodigoRectificativo",
          defaultMessage: "Situación código rectificativo",
        }),
        type: "input",
        key: "sitCodRct",
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
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.descripcionOperario",
          defaultMessage: "Descripción operario",
        }),
        type: "input",
        key: "desope",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 500)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.sitCodCla",
          defaultMessage: "SitCodCla",
        }),
        type: "input",
        key: "sitCodCla",
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
        placeHolder: props.intl.formatMessage({
          id: "SerieVenta.desglosarIva",
          defaultMessage: "Desglorar IVA"
        }),
        type: 'checkbox',
        key: 'desglossarIva',
        breakpoints: {
          xs: 12,
          md: 4
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
    ],
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"SerieVenta.cuentasCompras"}
              defaultMessage={"Cuentas de Compras"}
            />
          }
        >
         <ExpandableGrid
          id="serieCompras"
          responseKey="serieCompras"
          enabled={props.editMode}
          configuration={PurchasingSeries}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(PurchasingSeriesAccountsTab);
