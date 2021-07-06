import React from "react";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import "../Suppliers/styles.scss";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import {useTabForm} from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";

const GAMA_SECTION_INDEX = 0;
const MODEL_SECTION_TAB_INDEX = 1;

const Gama_ModelTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[GAMA_SECTION_INDEX]: false, [MODEL_SECTION_TAB_INDEX]: false}, setIsValid: props.setIsValid});

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const GamaConfig = {
    title: props.intl.formatMessage({
      id: "Gama.titulo",
      defaultMessage: "Articulos Gama",
    }),
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
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Gama.titulo",
          defaultMessage: "Articulos Gama",
        }),
        type: "LOV",
        key: "articlesGama",
        breakpoints: {
          xs: 12,
        },
        selector: {
          key: "articleGammas",
          labelKey: formatCodeAndDescription,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: formatCodeAndDescription,
        },
      },
    ],
  };

  const ModelConfig = {
    title: props.intl.formatMessage({
      id: "Modelo.titulo",
      defaultMessage: "Articulos Modelo",
    }),
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
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Modelo.titulo",
          defaultMessage: "Articulos Modelo",
        }),
        type: "LOV",
        key: "articlesModel",
        breakpoints: {
          xs: 12,
        },
        selector: {
          key: "articleModels",
          labelKey: formatCodeAndDescription,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: formatCodeAndDescription,
        },
      },
    ],
  };

  const tabs = [
    {
      label: <FormattedMessage id={"Modelo.titulo"} defaultMessage={"Articulos Modelo"}/>,
      key: 0,
      component: <ExpandableGrid
        id='articlesModel'
        responseKey='articleModels'
        enabled={props.editMode}
        configuration={ModelConfig} />
    },
  ];

  return (
    <Grid container>
    <Grid xs={12} item>
      <OutlinedContainer
        className="general-tab-container"
        title={
          <FormattedMessage
            id = {"Gama.titulo"}
            defaultMessage = {"Articulos Gama"}
          />
        }
      >
       <ExpandableGrid
        id="articlesGama"
        responseKey="articleGammas"
        enabled={props.editMode}
        configuration={GamaConfig}
      />
      </OutlinedContainer>
    </Grid>
    <OutlinedContainer>
      <ConfigurableTabs tabs={tabs} />
    </OutlinedContainer>
  </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(Gama_ModelTab);
