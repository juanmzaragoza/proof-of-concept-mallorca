import intl from "./helper/intl-function";

const CODE = intl.formatMessage({
  id: "Comun.codigo",
  defaultMessage: "Código",
});

const DESCRIPTION = intl.formatMessage({
  id: "Comun.descripcion",
  defaultMessage: "Descripción",
});

const OBS = intl.formatMessage({
  id: "Comun.observaciones",
  defaultMessage: "Observaciones",
});

export const creationFields = (props) => [
  {
    placeHolder: CODE,
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
      ...props.stringValidations.fieldExistsValidation(
        "tipusOfertesProveidor",
        "codi",
        CODE
      ),
    ],
  },
  {
    placeHolder: DESCRIPTION,
    type: "input",
    key: "descripcioTipusOfertesProveidors",
    required: true,
    breakpoints: {
      xs: 12,
      md: 9,
    },
    validationType: "string",
    validations: [
      ...props.commonValidations.requiredValidation(),
      ...props.stringValidations.minMaxValidation(1, 50),
    ],
  },
  {
    placeHolder: OBS,
    type: "input",
    key: "observacions",
    breakpoints: {
      xs: 12,
      md: 12,
    },
    text: {
      multiline: 2,
    },
  },
];