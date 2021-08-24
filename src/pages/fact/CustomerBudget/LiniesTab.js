import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_DESCUENTO_SELECTOR_VALUES } from "constants/selectors";

const ClientsAppTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: budgetId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

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
          id: "Presupuestos.precio",
          defaultMessage: "Precio",
        }),
        type: "numeric",
        key: "preu",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0,999999999999),
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
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0,9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.precioTotalLinia",
          defaultMessage: "Precio total linia",
        }),
        type: "input",
        key: "preuTotalLinia",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.maxValidation(10000),
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
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.maxValidation(1000),
          ...props.commonValidations.requiredValidation(),
        ],
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
export default compose(React.memo, withValidations, injectIntl)(ClientsAppTab);
