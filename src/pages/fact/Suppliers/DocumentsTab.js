import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const DocumentsTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: true },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

  const factConfig = {
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
        getCellValue: (row) => row.facturaBruto && row.facturaBruto?.toFixed(2),
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
        name: "quantitatIva",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.cantidadIva",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) => row.quantitatIva && row.quantitatIva?.toFixed(2),
      },

      {
        name: "facturaTotal",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.facturaTotal",
          defaultMessage: "Factura Total",
        }),
        getCellValue: (row) => row.facturaTotal && row.facturaTotal?.toFixed(2),
      },

      {
        name: "nomFiscal",
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
        name: "facturaConforme",
        title: props.intl.formatMessage({
          id: "Proveedores.facturaConforme",
          defaultMessage: "Factura Conforme",
        }),
        getCellValue: (row) =>
          row.facturaConforme && row.facturaConforme === "S" ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
        hidden: true,
      },
      {
        name: "retencio",
        title: props.intl.formatMessage({
          id: "Proveedores.retencion",
          defaultMessage: "Retención",
        }),
        getCellValue: (row) =>
          row.retencio && row.retencio === true ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
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

  const movimientosCajaConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.Documentos.movimientoCaja",
      defaultMessage: "movimientos Caja",
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


  const pedidosConfig={
    title: props.intl.formatMessage({
      id: "Proveedores.Documuentos.pedidos",
      defaultMessage: "Pedidos ",
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
        name: "importTotalExtraField",
        title: props.intl.formatMessage({
          id: "Proveedores.Facturacion.ImporteTotal",
          defaultMessage: "Importe Total",
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
        hidden:true,
      },
      {
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Clientes.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) => row.magatzem && row.magatzem?.description,
        hidden:true
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
          id={"Clientes.facturas"}
          defaultMessage={"Facturas"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="facturesProveidor"
          responseKey="facturaProveidors"
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
          id="albaransProveidor"
          responseKey="albaraProveidors"
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
      key: 3,
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
