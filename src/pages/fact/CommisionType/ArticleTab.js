import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";

const ArticleTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripcion",
  });

  const { id: comisionId } = useParams();

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const familyConfiguration = {
    title: props.intl.formatMessage({
      id: "TipoComision.tabs.familia",
      defaultMessage: "Familia Artículos",
    }),
    query: [
      {
        columnName: "tipusComissio.id",
        value: `"${comisionId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      tipusComissio: { id: `${comisionId}` },
    },

    columns: [
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "Referencia",
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
        name: "percentatge",
        title: props.intl.formatMessage({
          id: "TipoComision.porcentaje",
          defaultMessage: "Porcentaje",
        }),
      },

      {
        name: "minim",
        title: props.intl.formatMessage({
          id: "TipoComision.minimo",
          defaultMessage: "Mínimo",
        }),
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
        breakpoints: {
          xs: 12,
          md: 6,
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
          id: "TipoComision.porcentaje",
          defaultMessage: "Porcentaje ",
        }),
        type: "numeric",
        key: "percentatge",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        suffix: "%",
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 99)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "TipoComision.minimo",
          defaultMessage: "Mínimo ",
        }),
        type: "numeric",
        key: "minim",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="articlesFamiliaComissio"
          responseKey="articleFamiliaComissios"
          enabled={props.editMode}
          configuration={familyConfiguration}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ArticleTab);
