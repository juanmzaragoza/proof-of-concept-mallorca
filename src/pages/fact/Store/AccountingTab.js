import React,{useEffect} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
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

  const { id: storeId } = useParams();

  const accountingAccountConfig = {
    title: props.intl.formatMessage({
      id: "Almacen.proyectosCuentas",
      defaultMessage: "Proyectos y cuentas",
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
        name: "empresa",
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa ",
        }),
        getCellValue: (row) =>
          row.empresa.description ? row.empresa?.description : "",
      },
      {
        name: "projecteNum",
        title: props.intl.formatMessage({
          id: "Almacen.numProyecto",
          defaultMessage: "Num. Proyecto",
        }),
      },
      {
        name: "ctacmp",
        title: props.intl.formatMessage({
          id: "Almacen.cuentaContable",
          defaultMessage: "Cuenta contable",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
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
              name: "nomFiscal",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        type: "LOV",
        key: "projecteNum",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "projectes",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          transform: {
            apply: (projectes) => projectes && projectes.codi,
            reverse: (rows, codi) => rows.find(row => row.codi === codi)
          },
          advancedSearchColumns: [
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
          ],
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.cuentaContable",
          defaultMessage: "Cuenta contable",
        }),
        type: "input",
        key: "ctacmp",
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <ExpandableGrid
          id="magatzemsComptes"
          responseKey="magatzemComptes"
          enabled={props.editMode}
          configuration={accountingAccountConfig}
        />
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(InitialSituationTab);
