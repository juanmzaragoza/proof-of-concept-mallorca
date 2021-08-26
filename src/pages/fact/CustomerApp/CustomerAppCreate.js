import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const CustomerAppCreate = (props) => {
  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const COMERCIALNAME = props.intl.formatMessage({ id: "Presupuestos.nombreComercialCliente", defaultMessage: "Nombre Comercial" });
  const APP = props.intl.formatMessage({ id: "AplicacionesCliente.aplicacion", defaultMessage: "Aplicación" });
  const PERCEN = props.intl.formatMessage({ id: "AplicacionesCliente.porcentaje", defaultMessage: "Porcentaje" });
  const EMPRESA = props.intl.formatMessage({ id: "PieDocumento.empresa", defaultMessage: "Empresa" });
  const OBS = props.intl.formatMessage({ id: "DepartamentosCliente.observaciones", defaultMessage: "Observaciones" });
  const CLI = props.intl.formatMessage({ id: "DepartamentosCliente.cliente", defaultMessage: "Cliente" });

  const aSCodeAndComercialName = [ { title: CODE, name: "codi" }, { title: COMERCIALNAME, name: "nomComercial" }];

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "input",
      key: "aplicacioCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 10),
        ...props.stringValidations.fieldExistsValidation('altresAplicacionsClient', 'aplicacioCodi', CODE)
      ],
    },
    {
      placeHolder: APP,
      type: "numeric",
      key: "aplicacio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: PERCEN,
      type: "numeric",
      key: "percentatge",
      suffix:"%",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0,999),
      ],
    },
    {
      placeHolder: CLI,
      type: "LOV",
      key: "client",
      noEditable:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndComercialName,
      },
    },
    {
      placeHolder: EMPRESA,
      type: "LOV",
      key: "empresa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndComercialName,
      },
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
        multiline: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1000),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "AplicacionesCliente.titulo",
        defaultMessage: "Aplicaciones Cliente",
      })}
      formConfiguration={createConfiguration}
      url={API.altresAplicacionsClient}
    />
  );
};

export default compose(withValidations, injectIntl)(CustomerAppCreate);
