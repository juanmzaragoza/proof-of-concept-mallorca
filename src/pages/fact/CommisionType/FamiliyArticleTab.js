import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";

const FAM_ART_SECTION_INDEX = 0;

const FamilyArticleTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

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
    defaultMessage: "Descripcion",
  });

  const { id: comisionId } = useParams();

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
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
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia",
        }),
        getCellValue: (row) =>
          row.articleFamilia && row.articleFamilia?.description,
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
          id: "FamiliaArticulos.titulo",
          defaultMessage: "Familia",
        }),
        type: "LOV",
        key: "familia",
        id: "articleFamilia",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "articleFamilias",
          labelKey: formatCodeAndDescription,
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
        validations: [...props.numberValidations.minMaxValidation(0, 999999999999)],
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(FamilyArticleTab);
