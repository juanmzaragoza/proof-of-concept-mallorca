import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const RiskTypeCreate = (props) => {
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
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.fieldExistsValidation(
          "tipusRisc",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
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
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.pendienteServir",
        defaultMessage: "Pendiente Servir",
      }),
      type: "numeric",
      key: "tri_pensrv",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      decimalScale: 2,
      fixedDecimalScale: true,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.pendienteFacturar",
        defaultMessage: "Pendiente Facturar",
      }),
      type: "numeric",
      key: "tri_albnotfac",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      decimalScale: 2,
      fixedDecimalScale: true,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.vpNoVencidos",
        defaultMessage: "Vencimientos Pendientes No Vencidos",
      }),
      type: "numeric",
      key: "tri_vtopennotvnt",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      decimalScale: 2,
      fixedDecimalScale: true,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 1000)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.vpVencidos",
        defaultMessage: "Vencimientos Pendientes Vencidos",
      }),
      type: "numeric",
      key: "tri_vtopenvnt",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      decimalScale: 2,
      fixedDecimalScale: true,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.vEfectosNegociados",
        defaultMessage: "Vencimientos Efectos Negociados",
      }),
      type: "numeric",
      key: "tri_efeneg",
      decimalScale: 2,
      fixedDecimalScale: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 1000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoRiesgo.nifCoincidentes",
        defaultMessage: "NIF Coincidentes",
      }),
      type: "checkbox",
      key: "tri_nifigu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoRiesgo.titulo",
        defaultMessage: "Tipo Riesgo",
      })}
      formConfiguration={createConfiguration}
      url={API.tipusRisc}
    />
  );
};

export default compose(withValidations, injectIntl)(RiskTypeCreate);
