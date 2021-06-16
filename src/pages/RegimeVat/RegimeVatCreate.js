import CreateUpdateForm from "../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../modules/wrappers";
import * as API from "redux/api";
import { TIPO_REG_IVA_SELECTOR_VALUES } from "constants/selectors";


const RegimeVatCreate = (props) => {

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
        ...props.stringValidations.minMaxValidation(1, 2),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.codigoCont",
          defaultMessage: "Código Contabilidad",
        }),
        type: "input",
        key: "codiComptabilitat",
  
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "RegimenIva.codigoFact",
          defaultMessage: "Código factura electrónica",
        }),
        type: "input",
        key: "codiFacturaElectronica",
  
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 2),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "RegimenIva.tipoReg",
          defaultMessage: "Tipo Régimen IVA"
        }),
        type: 'select',
        key: 'tip',
        breakpoints: {
          xs: 12,
          md: 3
        },
        selector: {
          options: TIPO_REG_IVA_SELECTOR_VALUES
        },
      },
      {
        type: "input",
        key: "sitCodClaExd",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.re.expedida",
          defaultMessage: "Régimen especial fact expedida",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 2)],
      },
      {
        type: "input",
        key: "sitCodClaReb",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.re.recibida",
          defaultMessage: "Régimen especial fact recibida",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 2)],
      },
     

  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "RegimenIva.titulo",
        defaultMessage: "Régimen IVA",
      })}
      formConfiguration={createConfiguration}
      url={API.regimsIva}
    />
  );
};

export default compose(withValidations, injectIntl)(RegimeVatCreate);
