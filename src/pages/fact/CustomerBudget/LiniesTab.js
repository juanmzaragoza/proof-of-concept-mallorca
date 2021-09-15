import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_DESCUENTO_SELECTOR_VALUES } from "constants/selectors";

const LiniesTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: budgetId } = useParams();

  const pressupostCodi = getFormData("codi");

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

  const budgetLineConfig = {
    title: props.intl.formatMessage({
      id: "Presupuestos.linias",
      defaultMessage: "Linias presupuesto",
    }),
    query: [
      {
        columnName: "pressupost.id",
        value: `"${budgetId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      pressupost: { id: budgetId },
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) => row.article?.description,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Presupuestos.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "preu",
        title: props.intl.formatMessage({
          id: "Presupuestos.precio",
          defaultMessage: "Precio",
        }),
      },
      {
        name: "unitats",
        title: props.intl.formatMessage({
          id: "Presupuestos.unidades",
          defaultMessage: "Unidades",
        }),
      },

      {
        name: "factorConversioSortides",
        title: props.intl.formatMessage({
          id: "Presupuestos.factorConversionSalidas",
          defaultMessage: "Factor conv. salidas",
        }),
      },
      {
        name: "preuAmbIva",
        title: props.intl.formatMessage({
          id: "Presupuestos.precioIva",
          defaultMessage: "Precio IVA",
        }),
      },
    ],
    formComponents: [
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
          md: 3,
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
          id: "Presupuestos.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        key: "descripcio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 40000),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número ",
        }),
        type: "numeric",
        disabled:true,
        key: "numero",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "numeric",
        key: "sequencia",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.precio",
          defaultMessage: "Precio",
        }),
        type: "numeric",
        key: "preu",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.unidades",
          defaultMessage: "Unidades",
        }),
        type: "numeric",
        key: "unitats",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricas",
          defaultMessage: "Unidades Metricas",
        }),
        type: "numeric",
        key: "uniMet",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.importe",
          defaultMessage: "Importe",
        }),
        type: "numeric",
        key: "preuAmbIva",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.maxValidation(9999999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.descuento1",
          defaultMessage: "Descuento 1",
        }),
        type: "numeric",
        key: "dto",
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
        key: "dto2",
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
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        type: "LOV",
        key: "ivaCodi",
        id: "ives",
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
          transform: {
            apply: (ivas) => ivas && ivas.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.importeIva",
          defaultMessage: "Importe Iva ",
        }),
        type: "numeric",
        key: "impIva",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.factorConversionSalidas",
          defaultMessage: "Factor conv. salidas",
        }),
        type: "input",
        key: "factorConversioSortides",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.maxValidation(1000),
          ...props.commonValidations.requiredValidation(),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesEnvase",
          defaultMessage: "Unidades Envase",
        }),
        type: "numeric",
        key: "uniEvs",
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
        key: "pruEvs",
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
          id: "PedidosProveedor.largo",
          defaultMessage: "largo ",
        }),
        type: "numeric",
        key: "largo",
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
          id: "PedidosProveedor.ancho",
          defaultMessage: "Ancho",
        }),
        type: "numeric",
        key: "ancho",
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
          id: "PedidosProveedor.alto",
          defaultMessage: "Alto",
        }),
        type: "numeric",
        key: "alto",
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
          id: "Presupuestos.aprovado",
          defaultMessage: "Aprovado",
        }),
        type: "checkbox",
        key: "aprovat",
        breakpoints: {
          xs: 12,
          md: 2,
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
        extraQuery: [
          {
            columnName: "pressupost.id",
            value: `"${budgetId}"`,
            exact: true,
          },
        ],
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
          id: "Presupuestos.referencia",
          defaultMessage: "Referencia",
        }),
        type: "input",
        key: "ref",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(0, 30),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.referencia2",
          defaultMessage: "Referencia 2",
        }),
        type: "input",
        key: "ref2",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(0, 30),
        ],
      },
    
      {
        placeHolder: props.intl.formatMessage({
          id: "PresupuestosLinia.opcion1",
          defaultMessage: "Opción 1",
        }),
        type: "checkbox",
        key: "opc1",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PresupuestosLinia.opcion2",
          defaultMessage: "Opción 2",
        }),
        type: "checkbox",
        key: "opc2",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PresupuestosLinia.opcion3",
          defaultMessage: "Opción 3",
        }),
        type: "checkbox",
        key: "opc3",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PresupuestosLinia.opcion4",
          defaultMessage: "Opción 4",
        }),
        type: "checkbox",
        key: "opc4",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PresupuestosLinia.opcion5",
          defaultMessage: "Opción 5",
        }),
        type: "checkbox",
        key: "opc5",
        breakpoints: {
          xs: 12,
          md: 2,
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
              id={"Presupuestos.liniasPresupuesto"}
              defaultMessage={"Línias Presupuesto "}
            />
          }
        >
          <ExpandableGrid
            id="pressupostLinia"
            responseKey="pressupostLinias"
            enabled={props.editMode}
            configuration={budgetLineConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(LiniesTab);
