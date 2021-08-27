import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const AlbaranTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: certificationId } = useParams();
  const certificacioNum = getFormData("numeroCertificat");
  console.log(getFormData("numeroCertificat"));

  const albaranConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
    }),
    query: [
      {
        columnName: "certificacioNum",
        value: `"${certificacioNum}"`,
        exact: true,
      },
    ],

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
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
      },
      {
        name: "divisaValorEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
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
    ],
    formComponents: [],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Facturas.titulo"}
              defaultMessage={"Facturas"}
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
export default compose(React.memo, withValidations, injectIntl)(AlbaranTab);
