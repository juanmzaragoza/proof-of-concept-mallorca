import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ReactGrid from "modules/ReactGrid";
import * as API from "redux/api";
import MasterDetailGrid from "modules/ReactGrid/MasterDetailGrid";

const ContabilidadTab = ({ setFormData, getFormData, ...props }) => {

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
        hidden:true,
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
        name: "projecte",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.proyecto",
          defaultMessage: "Proyecto",
        }),
        getCellValue: (row) => row.projecte && row.projecte?.description,
     
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
    URL: API.albaransProveidor,
    listKey: "albaraProveidors",
    disabledFiltering: true,
    disabledActions: true,
    enableInlineEdition: true,
    enableExpandableContent: true
  };

  const config = {
    title: props.intl.formatMessage({
      id: "Proveedores.titulo",
      defaultMessage: "Proveedores"
    }),
    columns: [
      {
        name: 'article',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.articulo",
          defaultMessage: "Artículo"
        }),
        getCellValue: (row) => row.article?.description,
      },
      {
        name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      {
        name: 'unitats',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.unidades",
          defaultMessage: "Unidades"
        })
      },
      {
        name: 'preu',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.precio",
          defaultMessage: "Precio"
        })
      },
      {
        name: 'iva',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.iva",
          defaultMessage: "IVA"
        }),
        getCellValue: (row) => row.iva?.description,
      },
      {
        name: 'descompte',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.descuento",
          defaultMessage: "Descuento"
        })
      },
      {
        name: 'imports',
        title: props.intl.formatMessage({
          id: "FacturasProveedor.liniaAlbaran.imports",
          defaultMessage: "Importes"
        })
      },
    ],
    URL: API.liniesAlbaraProveidor,
    listKey: 'liniaAlbaraProveidors',
    enableInlineEdition: true,
    enableExpandableContent: false
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
          <ReactGrid
            id="albaransProveidor"
            configuration={albaranConfig}
          >
            {expandedProps => {
              const query = [
                {
                  columnName: 'albaraProveidor.id',
                  value: `'${expandedProps.row.id}'`,
                  exact: true
                }
              ]
              return <MasterDetailGrid
                id={"liniesAlbaraProveidor"}
                extraQuery={query}
                configuration={config} />
            }}
          </ReactGrid>

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
