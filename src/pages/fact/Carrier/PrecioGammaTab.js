import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";

import { withValidations } from "modules/wrappers";

import { useParams } from "react-router-dom";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const PricesTab = ({
  formData,
  setFormData,
  getFormData,

  ...props
}) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const { id: transpId } = useParams();

  const preciosConfig = {
    title: props.intl.formatMessage({
      id: "Transportistas.precioGamma",
      defaultMessage: "Precio Por Gamma",
    }),
    query: [
      {
        columnName: "transportista.id",
        value: `"${transpId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      transportista: { id: `${transpId}` },
    },

    columns: [
      {
        name: "gamma",
        title: props.intl.formatMessage({
          id: "Transportistas.gamma",
          defaultMessage: "gamma",
        }),
        getCellValue: (row) => (row.gamma ? row.gamma?.description : ""),
      },
      {
        name: "preu1",
        title: props.intl.formatMessage({
          id: "Transportistas.precioMañana",
          defaultMessage: "Precio Mañana",
        }),
      },
      {
        name: "preu2",
        title: props.intl.formatMessage({
          id: "Transportistas.precioTarde",
          defaultMessage: "Precio Tarde",
        }),
      },
      {
        name: "preu3",
        title: props.intl.formatMessage({
          id: "Transportistas.precioFestivo",
          defaultMessage: "Precio Festivo",
        }),
      },
      {
        name: "preu4",
        title: props.intl.formatMessage({
          id: "Transportistas.precioPalet",
          defaultMessage: "Precio Palet",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosGama.titulo",
          defaultMessage: "Gama",
        }),
        type: "LOV",
        key: "gamma",
        id: "articlesGama",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "articleGammas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Transportistas.precioMañana",
          defaultMessage: "Precio Mañana",
        }),
        type: "numeric",
        key: "preu1",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Transportistas.precioTarde",
          defaultMessage: "Precio Tarde",
        }),
        type: "numeric",
        key: "preu2",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Transportistas.precioFestivo",
          defaultMessage: "Precio Festivo",
        }),
        type: "numeric",
        key: "preu3",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Transportistas.precioPalet",
          defaultMessage: "Precio Palet",
        }),
        type: "numeric",
        key: "preu4",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999999),
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
              id={"Transportistas.precioPorZona"}
              defaultMessage={"Precios Por Zona"}
            />
          }
        >
          <ExpandableGrid
            id="preusPerGamma"
            responseKey="preuPerGammas"
            enabled={props.editMode}
            configuration={preciosConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(PricesTab);
