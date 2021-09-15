import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";

import { withValidations } from "modules/wrappers";

import { useParams } from "react-router-dom";
import ExpandableGrid from "modules/ExpandableGrid";

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

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const { id: transpId } = useParams();

  const preciosConfig = {
    title: props.intl.formatMessage({
      id: "Transportistas.precioPorZona",
      defaultMessage: "Precio Por Zona",
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
        name: "zona",
        title: props.intl.formatMessage({
          id: "Transportistas.zona",
          defaultMessage: "zona",
        }),
        getCellValue: (row) =>
          row.zona ? `${row.zona.description} (${row.zona.pk.codi})` : "",
      },
      {
        name: "precio",
        title: props.intl.formatMessage({
          id: "Transportistas.precio",
          defaultMessage: "Precio",
        }),
      },
      {
        name: "divisa.codi",
        title: props.intl.formatMessage({
          id: "Transportistas.codigoDivisa",
          defaultMessage: "Código Divisa",
        }),
        getCellValue: (row) => (row.divisa ? row.divisa.pk.codi : ""),
      },
      {
        name: "divisa.description",
        title: props.intl.formatMessage({
          id: "Transportistas.divisa",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => (row.divisa ? row.divisa.description : ""),
      },

      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Contacto.zona",
          defaultMessage: "Zona",
        }),
        type: "LOV",
        key: "zona",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "zonas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
          creationComponents: [
            {
              type: "input",
              key: "codi",
              placeHolder: CODE,
              required: true,
              breakpoints: {
                xs: 12,
                md: 6,
              },
            },
            {
              type: "input",
              key: "nom",
              placeHolder: NOM,
              required: true,
              breakpoints: {
                xs: 12,
                md: 6,
              },
            },
          ],
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Transportistas.precio",
          defaultMessage: "Precio",
        }),
        type: "numeric",
        key: "precio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
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
              id={"Transportistas.precioPorZona"}
              defaultMessage={"Precios Por Zona"}
            />
          }
        >
          <ExpandableGrid
            id="preusPerZona"
            responseKey="preuPerZonas"
            enabled={props.editMode}
            configuration={preciosConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(PricesTab);
