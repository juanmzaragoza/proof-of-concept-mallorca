import React from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";
import {TIPO_NIF_SELECTOR_VALUES} from "constants/selectors";

const CountryNifCreate = (props) => {

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "PaisNif.tamanyNif",
          defaultMessage: "Nombre",
        }),
        type: "input",
        key: "tamanyNif",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 15),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PaisNif.tipusNif",
          defaultMessage: "Tipus NIF",
        }),
        type: "select",
        key: "tipusNif",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_NIF_SELECTOR_VALUES,
        },
        validations: [
          ...props.commonValidations.requiredValidation(),
  
        ],
      },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "PaisNif.titulo",
        defaultMessage: "País NIF",
      })}
      formConfiguration={createConfiguration}
      url={API.paisNif}
    />
  );
};

export default compose(withValidations, injectIntl)(CountryNifCreate);
