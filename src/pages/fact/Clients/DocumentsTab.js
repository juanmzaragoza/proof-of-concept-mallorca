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
        name: "serieVenda",
        title: props.intl.formatMessage({
          id: "Clientes.fact.serie",
          defaultMessage: "Serie",
        }),
        getCellValue: (row) => row.serieVenda && row.serieVenda?.description,
      },
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
        getCellValue: row => row.diaFactura ? new Date(row.diaFactura).toLocaleDateString() : ""
      },
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.referencia",
          defaultMessage: "Referencia",
        }),
      },
      {
        name: "subClient",
        title: props.intl.formatMessage({
          id: "Clientes.subClientes",
          defaultMessage: "Subcliente",
        }),
        getCellValue: (row) => row.subClient && row.subClient?.description,
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id:  "Proveedores.direccion",
          defaultMessage: "Dirección",
        }),
        hidden: true
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal && row.codiPostal?.description,
        hidden:true,
      },
      {
        name: "projecte",
        title: props.intl.formatMessage({
          id:  "Clientes.Documentos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => row.projecte && row.projecte?.description,
        hidden:true,
      },
      {
        name: "pressupostCodi",
        title: props.intl.formatMessage({
          id:  "Clientes.Documuentos.presupuesto",
          defaultMessage: "Presupuesto",
        }),
      },
       {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa && row.divisa?.description,
        hidden: true,
      },
      {
        name: "regimIva",
        title: props.intl.formatMessage({
          id: "Clientes.regimen.iva",
          defaultMessage: "Régimen Iva",
        }),
        getCellValue: (row) => row.regimIva && row.regimIva?.description,
        hidden: true,
      },
      {
        name: "finalFactura",
        title: props.intl.formatMessage({
          id: "Proyectos.finalFactura",
          defaultMessage: "Final Factura",
        }),
        getCellValue: (row) => row.finalFactura && row.finalFactura?.description,
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
        name: "importAnticipat",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeAnticipado",
          defaultMessage: "Importe Anticipado",
        }),
        getCellValue: (row) =>
        row.importAnticipat && row.importAnticipat?.toFixed(2),
        hidden:true,
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
            <Chip
            label={props.intl.formatMessage({
              id: "Comun.SI",
              defaultMessage: "SI",
            })}
            variant="outlined"
          />
          ) : (
            <Chip
            label={props.intl.formatMessage({
              id: "Comun.NO",
              defaultMessage: "NO",
            })}
            variant="outlined"
          />
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
