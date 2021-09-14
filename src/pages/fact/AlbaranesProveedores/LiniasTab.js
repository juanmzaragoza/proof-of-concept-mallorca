import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";
import GenericForm from "modules/GenericForm";
import { useTabForm } from "hooks/tab-form";

// const CAMPOS_INF_SECTION_INDEX = 0;

const LiniasTab = ({ formData, setFormData, getFormData, ...props }) => {
  //   const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
  //     fields: {
  //       [CAMPOS_INF_SECTION_INDEX]: true,
  //     },
  //     setIsValid: props.setIsValid,
  //   });

  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const { id: pedidoProvId } = useParams();

  const camposInformativos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.pedidoMinimo",
        defaultMessage: "Pedido Mínimo ",
      }),
      type: "input",
      key: "pedidoMinim",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.importeBruto",
        defaultMessage: "Importe Bruto ",
      }),
      type: "input",
      key: "importBrut",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const liniasPedidosConfig = {
    title: props.intl.formatMessage({
      id: "AlbaranesProveedor.tabs.liniasAlbaran",
      defaultMessage: "Línias Albarán ",
    }),
    query: [
      {
        columnName: "albaraProveidor.id",
        value: `"${pedidoProvId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      albaraProveidor: { id: `${pedidoProvId}` },
    },

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número",
        }),
        hidden: true,
      },

      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) => row.article && row.article?.description,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.descripcionArticulo",
          defaultMessage: "Descripción Artículo",
        }),
      },
      {
        name: "unitats",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidades",
          defaultMessage: "Unidades",
        }),
      },
      {
        name: "unitatsMetriques",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricas",
          defaultMessage: "Unidades Métricas",
        }),
        hidden: true,
      },
      {
        name: "unitatsGratuites",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesGratuitas",
          defaultMessage: "Unidades Gratuitas",
        }),
      },
      {
        name: "unitatsMetriquesGtt",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricasGrat",
          defaultMessage: "Unidades Métricas Gratuitas",
        }),
        hidden: true,
      },
      {
        name: "descompte",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.descuento1",
          defaultMessage: "Descuento ",
        }),
      },
      {
        name: "descompteProntoPago",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.descuento2",
          defaultMessage: "Descuento ",
        }),
      },
      {
        name: "preu",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.precio",
          defaultMessage: "Precio ",
        }),
      },
      {
        name: "imports",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.importe",
          defaultMessage: "Importe ",
        }),
      },

      {
        name: "lote",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.lote",
          defaultMessage: "Lote",
        }),
        hidden: true,
      },
      {
        name: "llarg",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.largo",
          defaultMessage: "Largo",
        }),
        hidden: true,
      },
      {
        name: "ample",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.ancho",
          defaultMessage: "Anchos",
        }),
        hidden: true,
      },
      {
        name: "alt",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.alto",
          defaultMessage: "Alto",
        }),
        hidden: true,
      },
      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "iva",
        }),
        getCellValue: (row) => row.iva && row.iva?.description,
        hidden: true,
      },
      {
        name: "envas",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.envase",
          defaultMessage: "Envase",
        }),
        getCellValue: (row) => row.envas && row.envas?.description,
        hidden: true,
      },

      {
        name: "unitatsEnvas",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesEnvase",
          defaultMessage: "unidades Envase",
        }),
        hidden: true,
      },
      {
        name: "preuEnvas",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.precioEnvase",
          defaultMessage: "Precio Envase",
        }),
        hidden: true,
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

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número ",
        }),
        type: "numeric",
        required: true,
        key: "numero",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "descripcioCurta" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.precio",
          defaultMessage: "Importe ",
        }),
        type: "numeric",
        required: true,
        key: "preu",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.factorConversion",
          defaultMessage: "Factor Conversión ",
        }),
        type: "numeric",
        required: true,
        key: "factorConversioEntrada",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.descripcionArticulo",
          defaultMessage: "Decripción Artículo",
        }),
        type: "input",
        required: true,
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidades",
          defaultMessage: "Unidades",
        }),
        type: "numeric",
        required: true,
        key: "unitats",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricas",
          defaultMessage: "Unidades Metricas",
        }),
        type: "numeric",
        key: "unitatsMetriques",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesGratuitas",
          defaultMessage: "Unidades Gratuitas",
        }),
        type: "numeric",

        key: "unitatsGratuites",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricasGrat",
          defaultMessage: "Unidades Métricas Gratuitas",
        }),
        type: "numeric",
        key: "unitatsMetriquesGtt",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.descuento1",
          defaultMessage: "Descuento 1",
        }),
        type: "numeric",
        key: "descompte",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: [...props.stringValidations.minMaxValidation(0, 99)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.descuento2",
          defaultMessage: "Descuento 2",
        }),
        type: "numeric",
        key: "descompteProntoPago",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        validationType: "number",
        validations: [...props.stringValidations.minMaxValidation(0, 99)],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.importe",
          defaultMessage: "Importe ",
        }),
        type: "numeric",
        required: true,
        key: "imports",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        type: "LOV",
        key: "iva",
        id: "ives",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "ivas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          advancedSearchColumns: aSCodeAndDescription,
          cannotCreate: true,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.envase",
          defaultMessage: "Envase",
        }),
        type: "LOV",
        key: "envas",
        id: "envasos",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "envases",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          advancedSearchColumns: aSCodeAndDescription,
          cannotCreate: true,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesEnvase",
          defaultMessage: "Unidades Envase",
        }),
        type: "numeric",
        key: "unitatsEnvas",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.precioEnvase",
          defaultMessage: "Precio Envase",
        }),
        type: "numeric",
        key: "preuEnvas",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.lote",
          defaultMessage: "Lote ",
        }),
        type: "LOV",
        key: "lote",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "lots",
          labelKey: (data) => `(${data.codi})`,
          sort: "codi",
          advancedSearchColumns: [{ title: CODE, name: "codi" }],
          cannotCreate: true,
          transform: {
            apply: (lots) => lots && lots.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.largo",
          defaultMessage: "largo ",
        }),
        type: "numeric",
        key: "llarg",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.ancho",
          defaultMessage: "Ancho",
        }),
        type: "numeric",
        key: "ample",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.alto",
          defaultMessage: "Alto",
        }),
        type: "numeric",
        key: "alt",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.titulo",
          defaultMessage: "Presupuesto",
        }),
        type: "LOV",
        key: "pressupost",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "pressuposts",
          labelKey: (data) => `${data.client.description} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,

          relatedWith: [
            {
              name: "capitol",
              filterBy: "pressupost.id",
              keyValue: "id",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.capitulos",
          defaultMessage: "Capítulos",
        }),
        type: "LOV",
        key: "capitol",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "capitols",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          relatedWith: [
            {
              name: "partida",
              filterBy: "capitol.id",
              keyValue: "id",
            },
          ],
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.partida",
          defaultMessage: "Partida",
        }),
        type: "LOV",
        key: "partida",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "partidas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "AlbaranesProveedor.movimientosStock",
          defaultMessage: "Movimientos Stock",
        }),
        type: "numeric",
        key: "movimentStockNumero",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "AlbaranesProveedor.fechaFabricación/Cad",
          defaultMessage: "Fecha Fabricación/Caducidad ",
        }),
        type: "date",
        key: "diaFabricacioCdc",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesProveedor.tabs.liniasAlbaran"}
              defaultMessage={"Línias Albarán "}
            />
          }
        >
          <ExpandableGrid
            id="liniesAlbaraProveidor"
            responseKey="liniaAlbaraProveidors"
            enabled={props.editMode}
            configuration={liniasPedidosConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(LiniasTab);
