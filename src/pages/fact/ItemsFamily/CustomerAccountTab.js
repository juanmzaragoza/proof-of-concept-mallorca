import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const CustomerAccountTab = ({ formData, setFormData, getFormData, ...props }) => {

  const { id: itemFamilyId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;
  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];

  const ComptesFamiliaSeriesVenta = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.cuentasClientes",
      defaultMessage: "Cuentas Clientes",
    }),
    query: [
      {
        columnName: "articleFamilia.id",
        value: `"${itemFamilyId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      articleFamilia: { id: itemFamilyId },
    },
    columns: [
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Familia.articuloFamilia",
          defaultMessage: "Artículo Família",
        }),
        getCellValue: (row) =>
          row.articleFamilia.description ? row.articleFamilia?.description : "",
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "CuentaClientes.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) =>
          row.client.description ? row.client?.description : "",
      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "Clientes.cuenta.contable",
          defaultMessage: "Cuenta contable",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "CuentaClientes.cliente",
          defaultMessage: "Cliente",
        }),
        type: "LOV",
        key: "client",
        id: "clientes",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "clientes",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Familia.cuentaContableVentas",
          defaultMessage: "Cuenta contable ventas",
        }),
        type: "input",
        key: "compteContableVentes",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
        text: {
          multiline: 3
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 1000)],
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
              id={"Familia.cuentaFamiliaSerieVenta"}
              defaultMessage={"Cuenta Familia Series de Ventas"}
            />
          }
        >
         <ExpandableGrid
          id="comptesFamiliaSerieVenda"
          responseKey="compteFamiliaSerieVendas"
          enabled={props.editMode}
          configuration={ComptesFamiliaSeriesVenta}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CustomerAccountTab);
