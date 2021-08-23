import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import OutlinedContainer from "modules/shared/OutlinedContainer";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";




const MovimientosCajaTab = ({ formData, setFormData, getFormData, ...props }) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);


  const { id: facturaId } = useParams();



  const albaranConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
    }),
    query: [
      {
        columnName: "facturaProveidor.id",
        value: `"${facturaId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
        facturaProveidor: { id: facturaId },
    },
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "classe",
        title: props.intl.formatMessage({
          id: "Proyectos.clase",
          defaultMessage: "Clase",
        }),
      },
      {
        name: "dia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },
      {
        name: "cnc",
        title: props.intl.formatMessage({
          id: "Facturas.concepto",
          defaultMessage: "Concepto ",
        }),
      },
      {
        name: "importMoviment",
        title: props.intl.formatMessage({
          id: "Facturas.importeMov",
          defaultMessage: "Importe Movimiento",
        }),
      },


      {
        name: "operariCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.operario",
          defaultMessage: "Operario",
        }),
        hidden: true,
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
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
        hidden: true,
      },
      {
        name: "documentPagamentCobrament",
        title: props.intl.formatMessage({
          id:  "Presupuestos.documentoPago",
          defaultMessage: "Documento Pago",
        }),
        getCellValue: (row) => row.documentPagamentCobrament && row.documentPagamentCobrament?.description,
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id:   "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) => row.client && row.client?.description,
      },
    
    
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden: true,
      },
    ],
    formComponents: [],
  };


  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.Documentos.movimientoCaja"}
              defaultMessage={"Movimiento Caja"}
            />
          }
        >
          <ExpandableGrid
          id="movimentsCaixa"
          responseKey="movimentCaixas"
          enabled={props.editMode}
          configuration={albaranConfig}
          readOnly={true}
        />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(MovimientosCajaTab);
