import CreateUpdateForm from "../../modules/ReactGrid/CreateUpdateForm";

import {injectIntl} from "react-intl";
import React from "react";
import {compose} from "redux";
import { withValidations } from "../../modules/wrappers";


const IdiomasCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Idiomas.codigo",
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
        ...props.stringValidations.minMaxValidation(1,4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"Idiomas.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1,30)
      ]
    },
    {
        placeHolder: props.intl.formatMessage({
          id:"Idiomas.codigoIso",
          defaultMessage: "Código Iso"
        }),
        type: 'input',
        key: 'codiIso',
        required: false,
        breakpoints: {
          xs: 12,
          md: 4
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1,2)
        ]
      },

  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "Idiomas.titol",
                        defaultMessage: "Idiomes"
                      })}
                      formConfiguration={createConfiguration}
                      url={'api/fact/idiomes'} />
  )
};

export default compose(
  withValidations,
  injectIntl
)(IdiomasCreate);