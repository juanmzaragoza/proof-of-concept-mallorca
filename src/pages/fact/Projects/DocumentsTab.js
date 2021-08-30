import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";

import { FormattedMessage, injectIntl } from "react-intl";

import { withValidations } from "modules/wrappers";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const DocumentsTab = ({ formData, setFormData, ...props }) => {

  useEffect(() => {
    props.setIsValid(true);
  },[]);

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
        name: "mantenirCostsArticle",
        title: props.intl.formatMessage({
          id: "Proyectos.mantenerCoste",
          defaultMessage: "Mantener Coste Artículo",
        }),
        getCellValue: (row) =>
          row.mantenirCostsArticle && row.mantenirCostsArticle === true ? (
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

  const hojasObraConfig = {
    title: props.intl.formatMessage({
      id: "Proyectos.Documentos.hojasObra",
      defaultMessage: "Hojas Obra",
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
        name: "num",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "tip",
        title: props.intl.formatMessage({
          id: "Proyectos.Documentos.tipo",
          defaultMessage: "Tipo",
        }),
      },
      {
        name: "nivelUrg",
        title: props.intl.formatMessage({
          id: "Proyectos.Documentos.nivelUrgencia",
          defaultMessage: "Nivel Urgencia",
        }),
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "Proyectos.estado",
          defaultMessage: "Estado",
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
        name: "dataPrevEntrega",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fechaPrevistaEntrega",
          defaultMessage: "Fecha Prevista Entrega",
        }),
        getCellValue: (row) =>
          row.dataPrevEntrega
            ? new Date(row.dataPrevEntrega).toLocaleDateString()
            : "",
        hidden: true,
      },
      {
        name: "dataFin",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fechaFin",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dataFin ? new Date(row.dataFin).toLocaleDateString() : "",
        hidden: true,
      },
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "Referencia ",
        }),
      },
      {
        name: "operariCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.operario",
          defaultMessage: "Operario",
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
        name: "valorDivisaEuro",
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
        hidden: true,
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) => row.client && row.client?.description,
        hidden: true,
      },

      {
        name: "nomClient",
        title: props.intl.formatMessage({
          id: "Proyectos.Documentos.nombreCliente",
          defaultMessage: "Nombre Cliente",
        }),
        hidden: true,
      },
      {
        name: "subClient",
        title: props.intl.formatMessage({
          id: "Proyectos.Documentos.subCliente",
          defaultMessage: "SubCliente",
        }),
        getCellValue: (row) => row.subClient && row.subClient?.description,
        hidden: true,
      },
      {
        name: "nomSubClient",
        title: props.intl.formatMessage({
          id: "Proyectos.Documentos.nombreSubcliente",
          defaultMessage: "Nombre Subcliente",
        }),
        hidden: true,
      },
      {
        name: "capitol",
        title: props.intl.formatMessage({
          id:"Proyectos.capitulo",
          defaultMessage: "Capítulo",
        }),
        getCellValue: (row) => row.capitol && row.capitol?.description,
        hidden: true,
      },

      {
        name: "partida",
        title: props.intl.formatMessage({
          id: "Modelo.partida",
          defaultMessage: "Partida",
        }),
        getCellValue: (row) => row.partida && row.partida?.description,
        hidden: true,
      },
      {
        name: "pressupost",
        title: props.intl.formatMessage({
          id: "Presupuesto.titulo",
          defaultMessage: "Presupuesto",
        }),
        getCellValue: (row) => row.pressupost && row.pressupost?.description,
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
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proyectos.Documentos.hojasObra"}
          defaultMessage={"Hojas Obra"}
        />
      ),
      key: 3,
      component: (
        <ExpandableGrid
          id="fullesObra"
          responseKey="fullObras"
          enabled={props.editMode}
          configuration={hojasObraConfig}
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
