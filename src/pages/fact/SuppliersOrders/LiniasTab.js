import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid  from "modules/ExpandableGrid";

const LiniasTab = ({ formData,setFormData, getFormData, ...props }) => {
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

  const { id: pedidoProvId } = useParams();



  const liniasPedidosConfig = {
    title: props.intl.formatMessage({
      id: "PedidosProveedor.tabs.liniasPedido",
      defaultMessage: "Líneas Pedido ",
    }),
    query: [
      {
        columnName: "comandaProveidor.id",
        value: `"${pedidoProvId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      comandaProveidor: { id: `${pedidoProvId}` },
    },

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "sequencia",
        }),
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
        hidden: true,
      },
      {
        name: "descompteProntoPago",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.descuento2",
          defaultMessage: "Descuento ",
        }),
        hidden: true,
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
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "input",
        key: "sequencia",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        noEditable: true,
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
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

      //   {
      //     placeHolder: props.intl.formatMessage({
      //       id: "Clientes.empresas",
      //       defaultMessage: "Empresas",
      //     }),
      //     type: "LOV",
      //     key: "empresa",
      //     required: true,
      //     breakpoints: {
      //       xs: 12,
      //       md: 6,
      //     },
      //     selector: {
      //       key: "empresas",
      //       labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
      //       sort: "nomFiscal",
      //       cannotCreate: true,
      //       advancedSearchColumns: [
      //         {
      //           title: props.intl.formatMessage({
      //             id: "Comun.codigo",
      //             defaultMessage: "Código",
      //           }),
      //           name: "codi",
      //         },
      //         {
      //           title: props.intl.formatMessage({
      //             id: "Comun.nombre",
      //             defaultMessage: "Nombre",
      //           }),
      //           name: "nomFiscal",
      //         },
      //       ],
      //     },
      //     validationType: "object",
      //     ...withRequiredValidation([]),
      //   },

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
              id={"PedidosProveedor.tabs.liniasPedido"}
              defaultMessage={"Linias Pedido"}
            />
          }
        >
          <ExpandableGrid
            id="liniesComandaProveidor"
            responseKey="liniaComandaProveidors"
            enabled={props.editMode}
            configuration={liniasPedidosConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(LiniasTab);
