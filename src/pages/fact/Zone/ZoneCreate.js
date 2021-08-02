import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const ZoneCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });


  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Zona.radioKm",
        defaultMessage: "radio km",
      }),
      type: "numeric",
      key: "radioKm",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 9999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Zona.precio",
        defaultMessage: "Precio",
      }),
      type: "numeric",
      key: "preu",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },

   
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Zona.titulo",
        defaultMessage: "Zona",
      })}
      formConfiguration={createConfiguration}
      url={API.zona}
    />
  );
};

export default compose(withValidations, injectIntl)(ZoneCreate);
