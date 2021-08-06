import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const Prices2 = ({ formData, setFormData, getFormData, ...props }) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const formaCalcul = getFormData("formaCalcul");
  const percentatgeMaObra = getFormData("percentatgeMaObra");
  const percentatgeMaterial = getFormData("percentatgeMaterial");
  const tarifaTipus = getFormData("tarifaTipus");

  const priceGenerals = {
    title: props.intl.formatMessage({
      id: "Articulos.titulo",
      defaultMessage: "Artículos",
    }),
    size: 10,
    method: 'post',
    body: {
      "tarifaTipus": getFormData('tarifaTipus'),
      "formaCalcul": getFormData('formaCalcul'),
      "percentatgeMaterial": getFormData('percentatgeMaterial'),
      "percentatgeMaObra": getFormData('percentatgeMaObra'),
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
        name: "descripcioCurta",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "alies",
        title: props.intl.formatMessage({
          id: "Articulos.alias",
          defaultMessage: "Alias",
        }),
      },
      {
        name: "pvpFact",
        title: props.intl.formatMessage({
          id: "Articulos.precio",
          defaultMessage: "Precio",
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
              id={"Articulos.tipoGeneral"}
              defaultMessage={"Precios para tarifas tipo general"}
            />
          }
        >
          <ExpandableGrid
            id="articlesFactByTarifa"
            responseKey="articles"
            enabled={props.editMode}
            configuration={priceGenerals}
            readOnly={true}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(Prices2);
