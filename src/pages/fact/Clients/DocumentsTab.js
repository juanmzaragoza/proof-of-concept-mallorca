import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const DocumentsTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

  const { id: clientId } = useParams();

  const departamentsConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tabs.facturas",
      defaultMessage: "Facturas",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      client: { id: clientId },
    },
    columns: [
      {
        name: "nombreFactura",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numeroFactura",
          defaultMessage: "Num Factura",
        }),
      },
      {
        name: "diaFactura",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
      },
       {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa?.description,
        hidden: true,
      },
      {
        name: "baseImposable",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.baseImponible",
          defaultMessage: "Base Imponible",
        }),
        getCellValue: (row) =>
        row.baseImposable && row.baseImposable?.toFixed(2)
      },
      {
        name: "importIva",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeIva",
          defaultMessage: "Importe IVA",
        }),
        getCellValue: (row) =>
        row.importIva && row.importIva?.toFixed(2)
      },
     
      {
        name: "importFactura",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeFactura",
          defaultMessage: "Importe Factura",
        }),
        getCellValue: (row) =>
        row.importFactura && row.importFactura?.toFixed(2)
      },

      {
        name: "nomFiscalClient",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.nombreFiscal",
          defaultMessage: "Nombre fiscal",
        }),
        hidden: true
      },
      {
        name: "nif",
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "Nif",
        }),
        hidden: true,
      },

      {
        name: "recEqu",
        title:  props.intl.formatMessage({
            id: "Clientes.recargoEquivalencia",
            defaultMessage: "Recargo Equivalencia",
          }),
        getCellValue: (row) =>
          row.recEqu && row.recEqu === true ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
          hidden:true,
      },
    ],
    formComponents:[],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.facturas"}
              defaultMessage={"Facturas"}
            />
          }
        >
          <ExpandableGrid
            id="factures"
            responseKey="facturas"
            enabled={props.editMode}
            configuration={departamentsConfig}
            readOnly={true}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(DocumentsTab);
