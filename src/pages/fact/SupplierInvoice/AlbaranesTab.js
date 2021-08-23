import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";



const ContabilidadTab = ({ formData, setFormData, getFormData, ...props }) => {
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

//     cls: "0"
// conformat: "S"

// facturaRegimAgrari: false

// magatzemPeriode: {id: "eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOjIsIm1hZ2F0emVtQ29kaSI6IjAwMDAifQ==",…}


// pressupostCodi: 1
// proveidor: {id: "eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiIwMDAxMDYifQ==",…}
// tipus: "COMPRA"
// tipusDocument: "FACTURA"
// valorDivisaEuros: 6.55957

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "numeroDocument",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.numeroDocumento",
          defaultMessage: "Número Documento",
        }),
      },
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "Referencia",
        }),
      },
      {
        name: "cls",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.clase",
          defaultMessage: "CLase",
        }),
        hidden:true,
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
        name: "serieCompra",
        title: props.intl.formatMessage({
          id: "Clientes.fact.serie",
          defaultMessage: "Serie",
        }),
        getCellValue: (row) => row.serieCompra && row.serieCompra?.description,
        hidden:true,

      },
      {
        name: "proveidor",
        title: props.intl.formatMessage({
          id:"FacturasProveedor.proveedor",
          defaultMessage: "proveedor",
        }),
        getCellValue: (row) => row.proveidor && row.proveidor?.description,
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
              id={"Clientes.albaran"}
              defaultMessage={"albaranes"}
            />
          }
        >
          <ExpandableGrid
          id="albaransProveidor"
          responseKey="albaraProveidors"
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
)(ContabilidadTab);
