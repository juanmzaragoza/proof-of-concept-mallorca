import { injectIntl } from "react-intl";
import React, { useEffect } from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const VatCreate = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

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
        md: 1,
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
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Rappel.porcentaje2",
    //     defaultMessage: "Porcentaje 2",
    //   }),
    //   type: "numeric",
    //   key: "percentatge2",
    //   suffix: "%",
    //   breakpoints: {
    //     xs: 12,
    //     md: 1,
    //   },
    //   validationType: "number",
    //   validations: [
    //     ...props.numberValidations.minMaxValidation(0, 99),
    //   ],
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.limiteInferior",
        defaultMessage: "límite Inferior",
      }),
      type: "numeric",
      key: "limitInferior",
      decimalScale: 2,
      fixedDecimalScale: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.limiteSuperior",
        defaultMessage: "límite Superior",
      }),
      type: "numeric",
      key: "limitSuperior",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      decimalScale: 2,
      fixedDecimalScale: true,
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.porcentaje",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatge",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.escalado",
        defaultMessage: "Escalado",
      }),
      type: "checkbox",
      key: "escalat",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.absoluto",
        defaultMessage: "Absoluto",
      }),
      type: "checkbox",
      key: "absolut",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Rappel.titulo",
        defaultMessage: "Rappel",
      })}
      formConfiguration={createConfiguration}
      url={API.rappel}
    />
  );
};

export default compose(withValidations, injectIntl)(VatCreate);
