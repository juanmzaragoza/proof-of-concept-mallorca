import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
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
        md: 4,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.stringValidations.fieldExistsValidation('regimIvas', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
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
        md: 8,
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
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegimenIva.tipoReg",
        defaultMessage: "Tipo Régimen IVA",
      }),
      type: "select",
      key: "tip",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        options: TIPO_REG_IVA_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "RegimenIva.titulo",
        defaultMessage: "Régimen IVA",
      })}
      formConfiguration={createConfiguration}
      url={API.regimIvas}
    />
  );
};

export default compose(withValidations, injectIntl)(RegimeVatCreate);
