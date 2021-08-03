import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";

import { injectIntl } from "react-intl";
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
  }, []);

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

  const { id: storeId } = useParams();
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

  const locationConfig = {
    title: props.intl.formatMessage({
      id: "Almacen.ubicaciones",
      defaultMessage: "Ubicaciones",
    }),
    query: [
      {
        columnName: "magatzem.id",
        value: `"${storeId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      magatzem: { id: storeId },
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "codiExtern",
        title: props.intl.formatMessage({
          id: "Almacen.codigoExterno",
          defaultMessage: "Código externo ",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        type: "input",
        key: "codi",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 4),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.codigoExterno",
          defaultMessage: "Código externo",
        }),
        type: "input",
        key: "codiExtern",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        key: "descripcio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: props.commonValidations.requiredValidation(),
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="ubicacios"
          responseKey="ubicacios"
          enabled={props.editMode}
          configuration={locationConfig}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(InitialSituationTab);
