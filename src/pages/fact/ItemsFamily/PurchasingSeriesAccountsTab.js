import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const PurchasingSeriesAccountsTab = ({ formData, setFormData, getFormData, ...props }) => {

  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: itemFamilyId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;
  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];

  const ComptesFamiliaSeriesCompra = {
    title: props.intl.formatMessage({
      id: "Familia.cuentaFamiliaSerieCompra",
      defaultMessage: "Cuenta Familia Series de Compras",
    }),
    query: [
      {
        columnName: "articleFamilia.id",
        value: `"${itemFamilyId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      articleFamilia: { id: itemFamilyId },
    },
    columns: [
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Familia.articuloFamilia",
          defaultMessage: "Artículo Família",
        }),
        getCellValue: (row) =>
          row.articleFamilia.description ? row.articleFamilia?.description : "",
      },
      {
        name: "serieCompra",
        title: props.intl.formatMessage({
          id: "Proveedores.serieCompra",
          defaultMessage: "Serie Compra",
        }),
        getCellValue: (row) =>
          row.serieCompra.description ? row.serieCompra?.description : "",
      },
      {
        name: "compteContableCompres",
        title: props.intl.formatMessage({
          id: "Familia.cuentaContableCompras",
          defaultMessage: "Cuenta contable compras",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.serieCompra",
          defaultMessage: "Serie Compra",
        }),
        type: "LOV",
        key: "serieCompra",
        id: "serieCompras",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "serieCompras",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Familia.cuentaContableCompras",
          defaultMessage: "Cuenta contable compras",
        }),
        type: "input",
        key: "compteContableCompres",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
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
          multiline: 3
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
              id={"Familia.cuentaFamiliaSerieCompra"}
              defaultMessage={"Cuenta Familia Series de Compras"}
            />
          }
        >
         <ExpandableGrid
          id="comptesFamiliaSerieCompra"
          responseKey="compteFamiliaSerieCompras"
          enabled={props.editMode}
          configuration={ComptesFamiliaSeriesCompra}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(PurchasingSeriesAccountsTab);
