import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const LimitCreditTab = ({ formData, setFormData, getFormData, ...props }) => {
  const { id: cajaId } = useParams();

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const limitCreditConfig = {
    title: props.intl.formatMessage({
      id: "Cajas.tabs.limiteCredito",
      defaultMessage: "Límite Crédito",
    }),
    query: [
      {
        columnName: "caixa.id",
        value: `"${cajaId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      caixa: { id: `${cajaId}` },
    },

    columns: [
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Cajas.divisa",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa && row.divisa?.description,
      },
      {
        name: "importLimitCredit",
        title: props.intl.formatMessage({
          id: "Cajas.importe",
          defaultMessage: "Importe",
        }),
      },
      {
        name: "naturalesaPagamentCobrament",
        title: props.intl.formatMessage({
          id: "Cajas.naturalezaPago",
          defaultMessage: "Naturaleza Pago",
        }),
        getCellValue: (row) =>
          row.naturalesaPagamentCobrament &&
          row.naturalesaPagamentCobrament?.description,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Cajas.clase",
          defaultMessage: "Clase",
        }),
        type: "input",
        key: "classe",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 1),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Cajas.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "divisas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Cajas.importe",
          defaultMessage: "Importe",
        }),
        type: "numeric",
        required: true,
        key: "importLimitCredit",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Cajas.valorDivisa",
          defaultMessage: "Valor Divisa",
        }),
        type: "numeric",
        suffix: "€",
        key: "valorDivisaEuros",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "DocumentosPago.naturaleza",
          defaultMessage: "Naturaleza pago/cobro",
        }),
        type: "LOV",
        key: "naturalesaPagamentCobrament",
        id: "naturalesaPagoCobro",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "naturalesaPagamentCobraments",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
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
              id={"Cajas.tabs.limiteCredito"}
              defaultMessage={"Límite Crédito"}
            />
          }
        >
          <ExpandableGrid
            id="limitsCredit"
            responseKey="limitsCredits"
            enabled={props.editMode}
            configuration={limitCreditConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(LimitCreditTab);
