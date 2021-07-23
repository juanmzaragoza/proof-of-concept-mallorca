import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { INCIDENCIA_PORCENTAJE_SELECTOR_VALUES } from "../../../constants/selectors";

const CostesTab = ({ formData, setFormData, getFormData, ...props }) => {

  const { id: articulosId } = useParams();

  const TITLE = props.intl.formatMessage({ id: "Articulos.costes.titulo", defaultMessage: "Costes" });
  const SECUENCIA = props.intl.formatMessage({ id: "Articulos.costes.secuencia", defaultMessage: "Artículo escandallo" });
  const TIPOCOSTE = props.intl.formatMessage({id: "Articulos.costes.tipoCoste", defaultMessage: "Unidades"});
  const IMPPORCENCOSTE = props.intl.formatMessage({ id: "Articulos.costes.importePorcentajeCoste", defaultMessage: "Coste" });
  const INCIDENCIAPORCEN = props.intl.formatMessage({ id: "Articulos.costes.incidenciaPorcentaje", defaultMessage: "%Margen" });

  const TYPE = props.intl.formatMessage({id: "TiposVencimiento.tipo", defaultMessage: "Tipo"});

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };
  
  const aSCodeAndType = [ { title: CODE, name: "codi" }, { title: TYPE, name: "tipus" } ];
  const formatCodeAndType = (data) => `${data.tipus} (${data.codi})`;

  const costes = {
    title: TITLE,
    query: [
      {
        columnName: 'article.id',
        value: `"${articulosId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      article: { id: articulosId }
    },
    columns: [
      { name: 'sequencia', title: SECUENCIA },
      { name: 'tipusCost', title: TIPOCOSTE,  getCellValue: row => (row.tipusCost.description ? row.tipusCost.description : "" )},
      { name: 'importPercentatgeCost', title: IMPPORCENCOSTE },
      { name: 'incidenciaPercentatge', title: INCIDENCIAPORCEN }
    ],
    formComponents: [
      {
        placeHolder: SECUENCIA,
        type: 'input',
        disabled: true,
        key: 'sequencia',
        breakpoints: {
          xs: 12,
          md: 3
        },
      },
      {
        placeHolder: IMPPORCENCOSTE,
        type: 'numeric',
        key: 'importPercentatgeCost',
        required: true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.costes.incidenciaPorcentaje",
          defaultMessage: "Incidencia porcentaje"
        }),
        type: 'select',
        key: 'incidenciaPercentatge',
        breakpoints: {
          xs: 12,
          md: 3
        },
        selector: {
          options: INCIDENCIA_PORCENTAJE_SELECTOR_VALUES
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.costes.tipoCoste",
          defaultMessage: "Tipo coste",
        }),
        type: "LOV",
        required: true,
        key: "tipusCost",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tipusCosts",
          labelKey: formatCodeAndType,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndType,
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: 'input',
        key: 'observacions',
        breakpoints: {
          xs: 12,
          md: 12
        },
        text: {
          multiline: 3
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 1000)
        ],
      },
    ]
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id = {"Articulos.costes.titulo"}
              defaultMessage = {"Costes"}
            />
          }
        >
         <ExpandableGrid
          id="articlesCost"
          responseKey="articleCosts"
          enabled={props.editMode}
          configuration={costes}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CostesTab);
