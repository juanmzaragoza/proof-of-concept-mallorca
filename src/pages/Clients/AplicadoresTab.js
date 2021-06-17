import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import "../Suppliers/styles.scss";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "../../modules/ExpandableGrid";

const AplicadoresTab = ({ formData, setFormData, getFormData, ...props }) => {

  const { id: clientId } = useParams();

  const aplicadores = {
    title: props.intl.formatMessage({
      id: "Clientes.aplicadores",
      defaultMessage: "Aplicadores",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      client: { id: `"${clientId}"` }
    },

    columns: [
      {
        name: "aplicador.description",
        title: props.intl.formatMessage({
          id: "Clientes.aplicadores",
          defaultMessage: "Aplicadores",
        }),
        getCellValue: (row) => row?.aplicador?.description || "",
      },
    ],

    formComponents: [
      {
        
        placeHolder: props.intl.formatMessage({
          id: "Clientes.aplicadores",
          defaultMessage: "Aplicadores",
        }),
        type: "LOV",
        key: "aplicadorClients",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "aplicadorClients",
          labelKey: (data) => `${data.aplicador.description}`,
          sort: "aplicador",
          cannotCreate: true,
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
              id={"Clientes.aplicadores"}
              defaultMessage={"Aplicadores"}
            />
          }
        
        >
          <ExpandableGrid
            id="aplicadorClients"
            enabled={props.editMode}
            configuration={aplicadores}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(AplicadoresTab);
