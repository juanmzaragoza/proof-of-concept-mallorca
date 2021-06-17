import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "../../modules/wrappers/index";
import * as API from "../../redux/api";

const CountryCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codigo",
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
        ...props.stringValidations.minMaxValidation(1, 4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nif",
        defaultMessage: "N.I.F"
      }),
      type: 'input',
      key: 'nif',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso",
        defaultMessage: "Codi Iso"
      }),
      type: 'input',
      key: 'codiso',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso2",
        defaultMessage: "Codi Iso 2 "
      }),
      type: 'input',
      key: 'codiso002',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.cee",
        defaultMessage: "CEE"
      }),
      type: 'checkbox',
      key: 'cee',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },


  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
      id: "Paises.titol",
      defaultMessage: "Paisos"
    })}
      formConfiguration={createConfiguration}
      url={API.pais} />

      

  )
};

export default compose(
  withValidations,
  injectIntl
)(CountryCreate);
