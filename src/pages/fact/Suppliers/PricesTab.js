import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const DocumentsTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

  const departamentsConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tabs.precioCoste",
      defaultMessage: "Precio Coste",
    }),
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Proveedores.Precios.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) =>
          row.article.description ? row.article?.description : "",
      },
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "preuNetExtraField",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.precioNeto",
          defaultMessage: "Precio Neto",
        }),

      },
    
    ],
    formComponents: [],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.facturas"}
              defaultMessage={"Facturas"}
            />
          }
        >
          <ExpandableGrid
            id="proveidorsArticle"
            responseKey="proveidorArticles"
            enabled={props.editMode}
            configuration={departamentsConfig}
            cannotCreate={true}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(DocumentsTab);
