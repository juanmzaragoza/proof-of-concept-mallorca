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

  const { id: projectId } = useParams();

  const albaranConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
    }),
    query: [
      {
        columnName: "projecte.id",
        value: `"${projectId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      projecte: { id: projectId },
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

  const albaranProveedorConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
    }),
    query: [
      {
        columnName: "projecte.id",
        value: `"${projectId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      projecte: { id: projectId },
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
        name: "dia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },
      {
        name: "tipus",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.tipo",
          defaultMessage: "Tipo",
        }),
      },
      {
        name: "cls",
        title: props.intl.formatMessage({
          id: "Presupuestos.clase",
          defaultMessage: "Clase",
        }),
      },
      {
        name: "numeroDocument",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numeroDocumento",
          defaultMessage: "Número Documento",
        }),
        hidden: true,
      },
      {
        name: "tipusDocument",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.tipoDocumento",
          defaultMessage: "Tipo Documento",
        }),
        hidden: true,
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
        name: "facturaRegimAgrari",
        title: props.intl.formatMessage({
          id: "Clientes.facturaRegAgrario",
          defaultMessage: "Fact. Règimen Agrario",
        }),
        getCellValue: (row) =>
          row.facturaRegimAgrari && row.facturaRegimAgrari === true ? (
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
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
      },
      {
        name: "transportista",
        title: props.intl.formatMessage({
          id: "Proveedores.Facturacion.transportista",
          defaultMessage: "Transportista",
        }),
        getCellValue: (row) =>
          row.transportista && row.transportista?.description,
        hidden: true,
      },
      {
        name: "conformat",
        title: props.intl.formatMessage({
          id: "Clientes.conforme",
          defaultMessage: "Conforme",
        }),
        getCellValue: (row) =>
          row.conformat && row.conformat === "S" ? (
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
        hidden: true,
      },
      {
        name: "kilos",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.kilos",
          defaultMessage: "Kilos",
        }),
        hidden: true,
      },
    ],
    formComponents: [],
  };

  const pedidosConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.Documuentos.pedidos",
      defaultMessage: "Pedidos ",
    }),
    query: [
      {
        columnName: "projecte.id",
        value: `"${projectId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      projecte: { id: projectId },
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
        name: "dia",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dia ? new Date(row.dia).toLocaleDateString() : "",
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "Presupuestos.estado",
          defaultMessage: "Estado",
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
        name: "portes",
        title: props.intl.formatMessage({
          id: "Proveedores.Facturacion.portes",
          defaultMessage: "Portes",
        }),
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
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
      },
      {
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Clientes.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => row.magatzem && row.magatzem?.description,
        hidden: true,
      },

      {
        name: "traspassat",
        title: props.intl.formatMessage({
          id: "Proveedores.traspasado",
          defaultMessage: "Traspasado",
        }),
        getCellValue: (row) =>
          row.traspassat && row.traspassat === true ? (
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
        hidden: true,
      },
    ],
    formComponents: [],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proyectos.Documentos.albaranesCli"}
          defaultMessage={"Albaranes Clientes"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="albarans"
          responseKey="albaras"
          enabled={props.editMode}
          configuration={albaranConfig}
          readOnly={true}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proyectos.Documentos.albaranesProv"}
          defaultMessage={"Albaranes Proveedores"}
        />
      ),
      key: 1,
      component: (
        <ExpandableGrid
          id="albaransProveidor"
          responseKey="albaraProveidors"
          enabled={props.editMode}
          configuration={albaranProveedorConfig}
          readOnly={true}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proveedores.Documuentos.pedidos"}
          defaultMessage={"Pedidos"}
        />
      ),
      key: 2,
      component: (
        <ExpandableGrid
          id="comandesProveidor"
          responseKey="comandaProveidors"
          enabled={props.editMode}
          configuration={pedidosConfig}
          readOnly={true}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <ConfigurableTabs tabs={tabs} />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(DocumentsTab);
