import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_DESCUENTO_SELECTOR_VALUES } from "constants/selectors";

const ClientsAppTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: supplierInvoiceId } = useParams();

  const clientCodi = getFormData("codi");

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const complementFacturaProveidor = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.complementos",
      defaultMessage: "Complementos  ",
    }),
    query: [
      {
        columnName: "facturaProveidor.id",
        value: `"${supplierInvoiceId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
        facturaProveidor: { id: `${supplierInvoiceId}` },
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "imports",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.importe",
          defaultMessage: "Importe",
        }),
      },
    
      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.IVA",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) => row.iva && row.iva?.description,
      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.cuentaContable",
          defaultMessage: "Cuenta Contable",
        }),
      },
      {
        name: "complementFactura",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.complemento",
          defaultMessage: "Complemento",
        }),
        getCellValue: (row) => row.complementFactura && row.complementFactura?.description,
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
        type: "input",
        key: "aplicacio",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 3),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigoOtraApp",
          defaultMessage: "Código cliente otra Aplicación",
        }),
        type: "input",
        key: "aplicacioCodi",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 10),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.porcentaje",
          defaultMessage: "Porcentaje ",
        }),
        type: "numeric",
        key: "percentatge",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: props.numberValidations.minMaxValidation(0, 99),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
            {
              title: props.intl.formatMessage({
                id: "Comun.codigo",
                defaultMessage: "Código",
              }),
              name: "codi",
            },
            {
              title: props.intl.formatMessage({
                id: "Comun.nombre",
                defaultMessage: "Nombre",
              }),
              name: "nomFiscal",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
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
              id={"FacturasProveedor.complementos"}
              defaultMessage={"Complementos"}
            />
          }
        >
          <ExpandableGrid
            id="complementFacturaProveidor"
            responseKey="complementFacturaProveidors"
            enabled={props.editMode}
            configuration={complementFacturaProveidor}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ClientsAppTab);
