import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const VatCreate = (props) => {
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
        ...props.stringValidations.minMaxValidation(1, 10),
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
        id: "Iva.porcentajeIva",
        defaultMessage: "Porcentaje IVA",
      }),
      type: "numeric",
      key: "percentatgeIva",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.porcentajeRecargo",
        defaultMessage: "Porcentaje recargo equivalencia",
      }),
      type: "numeric",
      key: "percentatgeRecarrecEquivalencia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      suffix: "%",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.codigoCont",
        defaultMessage: "Código Contabilidad",
      }),
      type: "input",
      key: "codiComptabilitat",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.codigoRecCont",
        defaultMessage: "Código recargo contabilidad",
      }),
      type: "input",
      key: "codiRecarrecComptabilitat",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.texto",
        defaultMessage: "Texto",
      }),
      type: "input",
      key: "text",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 6)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.notCreApu",
        defaultMessage: "No crear apunte sin importe 0",
      }),
      type: "checkbox",
      key: "notCreApu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "IVA",
      })}
      formConfiguration={createConfiguration}
      url={API.ives}
    />
  );
};

export default compose(withValidations, injectIntl)(VatCreate);
