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

  const { id: clientId } = useParams();

  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
   props.setIsValid(true);
  },[]);

  const factConfig = {
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
        getCellValue: (row) =>
          row.diaFactura ? new Date(row.diaFactura).toLocaleDateString() : "",
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
          id: "Proveedores.direccion",
          defaultMessage: "Dirección",
        }),
        hidden: true,
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal && row.codiPostal?.description,
        hidden: true,
      },
      {
        name: "projecte",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => row.projecte && row.projecte?.description,
        hidden: true,
      },
      {
        name: "pressupostCodi",
        title: props.intl.formatMessage({
          id: "Clientes.Documuentos.presupuesto",
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
        getCellValue: (row) =>
          row.finalFactura && row.finalFactura?.description,
        hidden: true,
      },
      {
        name: "baseImposable",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.baseImponible",
          defaultMessage: "Base Imponible",
        }),
        getCellValue: (row) =>
          row.baseImposable && row.baseImposable?.toFixed(2),
      },
      {
        name: "importIva",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeIva",
          defaultMessage: "Importe IVA",
        }),
        getCellValue: (row) => row.importIva && row.importIva?.toFixed(2),
      },

      {
        name: "importFactura",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeFactura",
          defaultMessage: "Importe Factura",
        }),
        getCellValue: (row) =>
          row.importFactura && row.importFactura?.toFixed(2),
      },
      {
        name: "importAnticipat",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.importeAnticipado",
          defaultMessage: "Importe Anticipado",
        }),
        getCellValue: (row) =>
          row.importAnticipat && row.importAnticipat?.toFixed(2),
        hidden: true,
      },

      {
        name: "nomFiscalClient",
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
        name: "recEqu",
        title: props.intl.formatMessage({
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
        hidden: true,
      },
    ],
    formComponents: [],
  };

  const presupuestoConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.presupuestos",
      defaultMessage: "Presupuestos",
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
        name: "diaAcceptacio",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.fechaAceptacion",
          defaultMessage: "Fecha Aceptación",
        }),
        getCellValue: (row) =>
          row.diaAcceptacio
            ? new Date(row.diaAcceptacio).toLocaleDateString()
            : "",
        hidden: true,
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
          id: "Proveedores.direccion",
          defaultMessage: "Dirección",
        }),
        hidden: true,
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal && row.codiPostal?.description,
        hidden: true,
      },
      {
        name: "projecte",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => row.projecte && row.projecte?.description,
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
        name: "finalFacturaCodi",
        title: props.intl.formatMessage({
          id: "Proyectos.finalFactura",
          defaultMessage: "Final Factura",
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
        name: "estat",
        title: props.intl.formatMessage({
          id: "Presupuestos.estado",
          defaultMessage: "Estado ",
        }),
        hidden: true,
      },
    ],
    formComponents: [],
  };

  const movimientosCajaConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.movimientoCaja",
      defaultMessage: "movimientos Caja",
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
      },
      {
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
      },
      {
        name: "caixa",
        title: props.intl.formatMessage({
          id: "Clientes.caja",
          defaultMessage: "Caja",
        }),
        getCellValue: (row) => row.caixa && row.caixa?.description,
      },
      {
        name: "importMoviment",
        title: props.intl.formatMessage({
          id: "Clientes.importeMovimiento",
          defaultMessage: "Importe Movimiento",
        }),
      },
      {
        name: "documentPagamentCobrament",
        title: props.intl.formatMessage({
          id: "Clientes.documentoPago",
          defaultMessage: "Documento Pago/Cobro",
        }),
        getCellValue: (row) =>
          row.documentPagamentCobrament &&
          row.documentPagamentCobrament?.description,
        hidden: true,
      },
    ],
    formComponents: [],
  };

  const albaranConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.albaranes",
      defaultMessage: "Albaranes",
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

  const reparacionesConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.reparaciones",
      defaultMessage: "Reparaciones",
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
        name: "num",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "numSerie",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numeroSerie",
          defaultMessage: "Nun Serie",
        }),

      },
      {
        name: "numParte",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numeroParte",
          defaultMessage: "Nun Parte",
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
        name: "situacio",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.situacion",
          defaultMessage: "Situación",
        }),
    
      },
      {
        name: "matricula",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.matricula",
          defaultMessage: "Matricula",
        }),
        hidden: true,
      },
      {
        name: "estat",
        title: props.intl.formatMessage({
          id: "Presupuestos.estado",
          defaultMessage: "Estado ",
        }),
        hidden: true,
      },
      {
        name: "operariCodi",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.operarioCodigo",
          defaultMessage: "Código operario",
        }),
      },
      {
        name: "descripcioAvaria",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "diaCreacio",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.fechaCreacion",
          defaultMessage: "Fecha Creación",
        }),
        getCellValue: (row) =>
          row.diaCreacio ? new Date(row.diaCreacio).toLocaleDateString() : "",
      },

      {
        name: "diaAviso",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.diaAviso",
          defaultMessage: "Dia Aviso",
        }),
        getCellValue: (row) =>
          row.diaAviso ? new Date(row.diaAviso).toLocaleDateString() : "",
        hidden: true,
      },
      {
        name: "diaFin",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.diaFin",
          defaultMessage: "Dia Fin",
        }),
        getCellValue: (row) =>
          row.diaFin ? new Date(row.diaFin).toLocaleDateString() : "",
        hidden: true,
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
        name: "subClient",
        title: props.intl.formatMessage({
          id: "Proyectos.subcliente",
          defaultMessage: "Subcliente",
        }),
        getCellValue: (row) => row.subClient && row.subClient?.description,
        hidden: true,
      },
      {
        name: "projecte",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => row.projecte && row.projecte?.description,
        hidden: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
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
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal && row.codiPostal?.description,
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
          id={"Clientes.facturas"}
          defaultMessage={"Facturas"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="factures"
          responseKey="facturas"
          enabled={props.editMode}
          configuration={factConfig}
          readOnly={true}
          size={10}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.Documentos.albaranes"}
          defaultMessage={"Albaranes "}
        />
      ),
      key: 1,
      component: (
        <ExpandableGrid
          id="albarans"
          responseKey="albaras"
          enabled={props.editMode}
          configuration={albaranConfig}
          readOnly={true}
          size={10}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.Documuentos.presupuesto"}
          defaultMessage={"Presupuestos"}
        />
      ),
      key: 2,
      component: (
        <ExpandableGrid
          id="pressuposts"
          responseKey="pressuposts"
          enabled={props.editMode}
          configuration={presupuestoConfig}
          readOnly={true}
          size={10}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.Documentos.reparaciones"}
          defaultMessage={"Reparaciones"}
        />
      ),
      key: 3,
      component: (
        <ExpandableGrid
          id="avaries"
          responseKey="avarias"
          enabled={props.editMode}
          configuration={reparacionesConfig}
          readOnly={true}
          size={10}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.Documentos.movimientoCaja"}
          defaultMessage={"Movimentos Caja"}
        />
      ),
      key: 4,
      component: (
        <ExpandableGrid
          id="movimentsCaixa"
          responseKey="movimentCaixas"
          enabled={props.editMode}
          configuration={movimientosCajaConfig}
          readOnly={true}
          size={10}
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
