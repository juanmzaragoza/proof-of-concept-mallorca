import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";

import {  injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";

import ExpandableGrid from "modules/ExpandableGrid";


const InitialSituationTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {

  useEffect(() => {
    props.setIsValid(true);
  },[]);

  const aSCodeAndName = [
    {
      title: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      name: "codi",
    },
    {
      title: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      name: "nom",
    },
  ];

  const aSCodeAndDescription = [
    {
      title: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      name: "codi",
    },
    {
      title: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      name: "descripcio",
    },
  ];
  const storeCodi = getFormData("codi");

  const periodConfig = {
    title: props.intl.formatMessage({
      id: "Almacen.periodos",
      defaultMessage: "Perídos",
    }),
    query: [
      {
        columnName: "magatzemCodi",
        value: `"${storeCodi}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      magatzemCodi: storeCodi,
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Alamcen.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article.description ? row.article?.description : "",
      },
      {
        name: "classe",
        title: props.intl.formatMessage({
          id: "Almacen.clase",
          defaultMessage: "Clase",
        }),
        hidden: true,
      },
      {
        name: "unitatsInicials",
        title: props.intl.formatMessage({
          id: "Almacen.unidadesIniciales",
          defaultMessage: "Unidades Iniciales",
        }),
      },
      {
        name: "unitatsMetriquesInicials",
        title: props.intl.formatMessage({
          id: "Almacen.unidadesMetricas",
          defaultMessage: "Unidades Métricas Iniciales",
        }),
      },
      {
        name: "preuCostUnitari",
        title: props.intl.formatMessage({
          id: "Almacen.precioCoste",
          defaultMessage: "Precio Coste Unitario ",
        }),
      },
      {
        name: "valorDivisaEuro",
        title: props.intl.formatMessage({
          id: "Almacen.valorDivisa",
          defaultMessage: "Valor divisa euro",
        }),
        hidden: true,
      },
      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisas",
        }),
        getCellValue: (row) =>
          row.divisa.description ? row.divisa?.description : "",
      },
      {
        name: "numMoviments",
        title: props.intl.formatMessage({
          id: "Almacen.numeroMovimientos",
          defaultMessage: "Número Movimientos ",
        }),
        hidden: true,
      },
      {
        name: "magatzemPeriode",
        title: props.intl.formatMessage({
          id: "Almacen.almacenPeriodo",
          defaultMessage: "Almacén Periodo",
        }),
        getCellValue: (row) =>
          row.magatzemPeriode.description
            ? row.magatzemPeriode?.description
            : "",
        hidden: true,
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosUbicacion.articulo.titulo",
          defaultMessage: "Articulo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.unidadesIniciales",
          defaultMessage: "Unidades Iniciales",
        }),
        type: "input",
        key: "unitatsInicials",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.commonValidations.requiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.unidadesMetricas",
          defaultMessage: "Unidades Métricas Iniciales",
        }),
        type: "input",
        key: "unitatsMetriquesInicials",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.precioCoste",
          defaultMessage: "Precio Coste Unitario",
        }),
        type: "input",
        key: "preuCostUnitari",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.clase",
          defaultMessage: "Clase",
        }),
        type: "input",
        key: "classe",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 1),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.valorDivisa",
          defaultMessage: "Valor Divisa Euro",
        }),
        type: "input",
        key: "valorDivisaEuro",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: props.commonValidations.requiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.numeroMovimientos",
          defaultMessage: "Num. Movimientos",
        }),
        type: "input",
        key: "numMoviments",
        breakpoints: {
          xs: 12,
          md: 2,
        },

      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.periodo",
          defaultMessage: "Período",
        }),
        type: "LOV",
        key: "magatzemPeriode",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "magatzemPeriodes",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="situacionsInicial"
          responseKey="situacioInicials"
          enabled={props.editMode}
          configuration={periodConfig}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(InitialSituationTab);
