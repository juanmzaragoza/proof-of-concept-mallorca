import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ArticlesModelCreate = (props) => {
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
        md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1,6)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 8
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1,30)
      ]
    },
    
  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "ArticulosModelo.titulo",
                        defaultMessage: "Modelo artículos"
                      })}
                      formConfiguration={createConfiguration}
                      url={API.articleModels} />
  )
};

export default compose(
  withValidations,
  injectIntl
)(ArticlesModelCreate);