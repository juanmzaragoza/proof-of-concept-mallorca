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

  const { id: supplierId } = useParams();

  const departamentsConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tabs.facturas",
      defaultMessage: "Facturas",
    }),
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      {
        name: "document",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.documento",
          defaultMessage: "Documento",
        }),
      },
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
      },
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.referencia",
          defaultMessage: "Referencia",
        }),
        hidden: true,
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
        name: "facturaBruto",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.facturaBruto",
          defaultMessage: "Factura Bruto",
        }),
        hidden: true,
        getCellValue: (row) =>
        row.facturaBruto && row.facturaBruto?.toFixed(2)
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
        name: "quantitatIva",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.cantidadIva",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) =>
        row.quantitatIva && row.quantitatIva?.toFixed(2)
      },
     
      {
        name: "facturaTotal",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.facturaTotal",
          defaultMessage: "Factura Total",
        }),
        getCellValue: (row) =>
        row.facturaTotal && row.facturaTotal?.toFixed(2)
      },

      {
        name: "nomFiscal",
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
        name: "facturaConforme",
        title:  props.intl.formatMessage({
            id: "Proveedores.facturaConforme",
            defaultMessage: "Factura Conforme",
          }),
        getCellValue: (row) =>
          row.facturaConforme && row.facturaConforme === "S" ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
          hidden:true,
      },
      {
        name: "retencio",
        title:  props.intl.formatMessage({
            id: "Proveedores.retencion",
            defaultMessage: "Retención",
          }),
        getCellValue: (row) =>
          row.retencio && row.retencio === true ? (
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
            id="facturesProveidor"
            responseKey="facturaProveidors"
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
