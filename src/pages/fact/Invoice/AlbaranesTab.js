import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";

const EMPRESA_SECTION_INDEX = 0;

const ContabilidadTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: facturaId } = useParams();



  const albaranConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
    }),
    query: [
      {
        columnName: "factura.id",
        value: `"${facturaId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      factura: { id: facturaId },
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
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "Referencia",
        }),
      },
      {
        name: "data",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.data ? new Date(row.data).toLocaleDateString() : "",
      },
      {
        name: "formaPago",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.formaPago",
          defaultMessage: "Forma Pago",
        }),
      },
      {
        name: "kilos",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.kilos",
          defaultMessage: "Kilos",
        }),
      },
      {
        name: "bultos",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.bultos",
          defaultMessage: "Bultos",
        }),
      },
      {
        name: "operariCmlCodi",
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
        name: "divisaValorEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
        hidden: true,
      },
      {
        name: "serieVenda",
        title: props.intl.formatMessage({
          id: "Clientes.fact.serie",
          defaultMessage: "Serie",
        }),
        getCellValue: (row) => row.serieVenda && row.serieVenda?.description,
      },
      {
        name: "puntVenda",
        title: props.intl.formatMessage({
          id: "Presupuestos.puntoVenta",
          defaultMessage: "Punto Venta",
        }),
        getCellValue: (row) => row.puntVenda && row.puntVenda?.description,
        hidden: true,
      },
      {
        name: "desti",
        title: props.intl.formatMessage({
          id: "Clientes.destino",
          defaultMessage: "Destino",
        }),
        hidden: true,
      },
      {
        name: "nomClient",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.nombreFiscal",
          defaultMessage: "Nombre fiscal",
        }),
        hidden: true,
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
        name: "observacions",
        title: props.intl.formatMessage({
          id: "comun.observaciones",
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
          id="albarans"
          responseKey="albaras"
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
