import React from "react";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const Price2Tab = ({ formData, setFormData, getFormData, ...props }) => {

  const Price2 = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Artículos",
    }),
    columns: [
      {
        name: 'codi',
       title: props.intl.formatMessage({
         id: "Comun.codigo",
         defaultMessage: "Código",
       })
     },
     { 
       name: 'descripcioCurta',
       title: props.intl.formatMessage({
         id: "Comun.nombre",
         defaultMessage: "Nombre"
       })
     },
     { 
       name: 'alies',
       title: props.intl.formatMessage({
         id: "Articulos.alias",
         defaultMessage: "Alias"
       }),
     },
     { 
       name: 'preuCostTeo',
       title: props.intl.formatMessage({
         id: "Articulos.precio",
         defaultMessage: "Precio"
       }),
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
              id = {"Articulos.titulo"}
              defaultMessage = {"Artículos"}
            />
          }
        >
         <ExpandableGrid
         readOnly={true}
          id="articlesFact"
          responseKey="articles"
          enabled={props.editMode}
          configuration={Price2}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(Price2Tab);
