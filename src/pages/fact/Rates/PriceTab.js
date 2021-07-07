import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const CustomerAccountTab = ({ formData, setFormData, getFormData, ...props }) => {

  const formatCodeAndComercialName = (data) => `${data.nomComercial} (${data.codi})`;

  const CustomerAccount = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.cuentasClientes",
      defaultMessage: "Cuentas Clientes",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "CuentaClientes.cliente",
          defaultMessage: "Cliente",
        }),
      },
      {
        name: "nomComercial",
        title: props.intl.formatMessage({
          id: "Cliente.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "Almacen.cuenta",
          defaultMessage: "Cuenta contable",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        type: "LOV",
        key: "client",
        breakpoints: {
          xs: 12,
        },
        selector: {
          key: "clients",
          labelKey: formatCodeAndComercialName,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: formatCodeAndComercialName,
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
              id = {"FamiliaArticulos.tabs.cuentasClientes"}
              defaultMessage = {"Cuentas Clientes"}
            />
          }
        >
         <ExpandableGrid
          id="client"
          responseKey="clients"
          enabled={props.editMode}
          configuration={CustomerAccount}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CustomerAccountTab);
