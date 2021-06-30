import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ArticlesBrandCreate = (props) => {
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
        ...props.stringValidations.minMaxValidation(1,6),
        ...props.stringValidations.fieldExistsValidation('articleMarcas', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"Comun.descipcion",
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
                        id: "ArticulosMarca.titol",
                        defaultMessage: "Marca artículos"
                      })}
                      formConfiguration={createConfiguration}
                      url={API.articleMarcas} />
  )
};

export default compose(
  withValidations,
  injectIntl
)(ArticlesBrandCreate);