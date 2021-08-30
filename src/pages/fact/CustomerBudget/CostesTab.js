import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_DESCUENTO_SELECTOR_VALUES,
  INCIDENCIA_PORCENTAJE_SELECTOR_VALUES,
} from "constants/selectors";

const CostesTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: budgetId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const formatCodeAndType = (data) => `${data.tipus} (${data.codi})`;

  const CostesConfig = {
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
        name: "pressupostLinia",
        title: props.intl.formatMessage({
          id: "Presupuestos.liniasPresupuesto",
          defaultMessage: "Linia Presupuesto",
        }),
        getCellValue: (row) => row.pressupostLinia?.description,
      },
      {
        name: "tipusCost",
        title: props.intl.formatMessage({
          id: "Presupuestos.tipoCoste",
          defaultMessage: "Tipo Coste",
        }),
        getCellValue: (row) => row.tipusCost?.description,
      },
      {
        name: "importCost",
        title: props.intl.formatMessage({
          id: "Presupuestos.importeCoste",
          defaultMessage: "Importe Coste",
        }),
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
          id: "Presupuestos.liniasPresupuesto",
          defaultMessage: "Linia Presupuesto",
        }),
        type: "LOV",
        key: "pressupostLinia",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },

        selector: {
          key: "pressupostLinias",
          labelKey: (data) => `${data.descripcio} (${data.numero})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "numero" },
            { title: NOM, name: "descripcio" },
          ],
        },
        extraQuery: [
          {
            columnName: "pressupost.id",
            value: `"${budgetId}"`,
            exact: true,
          },
        ],
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.costes.tipoCoste",
          defaultMessage: "Tipo coste",
        }),
        type: "LOV",
        required: true,
        noEditable: true,
        key: "tipusCost",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "tipusCosts",
          labelKey: formatCodeAndType,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            {
              title: props.intl.formatMessage({
                id: "Presupuestos.tipoCoste",
                defaultMessage: "Tipo Coste",
              }),
              name: "tipus",
            },
          ],
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.importeCoste",
          defaultMessage: "Importe Coste",
        }),
        type: "numeric",
        key: "importCost",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
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
        text: {
          multiline: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 1000)],
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
              id={"Presupuestos.costes"}
              defaultMessage={"Costes  "}
            />
          }
        >
          <ExpandableGrid
            id="costosPressupost"
            responseKey="costPressuposts"
            enabled={props.editMode}
            configuration={CostesConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CostesTab);
