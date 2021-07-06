import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "../../../modules/wrappers";
import * as API from "../../../redux/api";

const ItemModelCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 6)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Modelo.control",
        defaultMessage: "Control articulos transportados"
      }),
      type: 'checkbox',
      key: 'control',
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Modelo.partida",
        defaultMessage: "Partida"
      }),
      type: 'checkbox',
      key: 'pda',
      breakpoints: {
        xs: 12,
        md: 6
      },
    },


  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
      id: "ArticulosModelo.titulo",
        defaultMessage: "Modelo",
    })}
      formConfiguration={createConfiguration}
      url={API.articlesModel} />

  )
};

export default compose(
  withValidations,
  injectIntl
)(ItemModelCreate);
