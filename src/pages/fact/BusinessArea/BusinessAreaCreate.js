import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const BusinessAreaCreate = (props) => {

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre" });
  const CODCONT = props.intl.formatMessage({ id: "AreaNegocios.codigoContabilidad", defaultMessage: "Código de contabilidad" });
  const CONTCUENEXIS = props.intl.formatMessage({ id: "AreaNegocios.contabilidadCuentaExistencias", defaultMessage: "Contabilidad cuenta existencias" });
  const CONTCUENCOST = props.intl.formatMessage({ id: "AreaNegocios.contabilidadCuentaCostes", defaultMessage: "Contabilidad cuenta costes" });
  const CONTCUENPROV = props.intl.formatMessage({ id: "AreaNegocios.contabilidadCuentaProveedores", defaultMessage: "Contabilidad cuenta proveedores" });
  const CONTCUENCLI = props.intl.formatMessage({ id: "AreaNegocios.contabilidadCuentaClientes", defaultMessage: "Contabilidad cuenta clientes" });
  const CUENALMA = props.intl.formatMessage({ id: "AreaNegocios.cuentaAlmacen", defaultMessage: "Cuenta almacén" });
  const CUENOBREJE = props.intl.formatMessage({ id: "AreaNegocios.cuentaObraEjecutada", defaultMessage: "Cuenta obra ejecutada" });

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
        ...props.stringValidations.fieldExistsValidation('areaNegoci', 'codi', CODE)
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: CODCONT,
      type: "input",
      key: "comptabilitatCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: CONTCUENEXIS,
      type: "input",
      key: "comptabilitatCompteExistencies",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: CONTCUENCOST,
      type: "input",
      key: "comptabilitatCompteCostos",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: CONTCUENPROV,
      type: "input",
      key: "comptabilitatCompteProveidors",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: CONTCUENCLI,
      type: "input",
      key: "comptabilitatCompteClients",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: CUENALMA,
      type: "input",
      key: "compteMagatzem",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
    {
      placeHolder: CUENOBREJE,
      type: "input",
      key: "compteObraExecutada",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Proyectos.areaNegocio",
        defaultMessage: "Área negocio",
      })}
      formConfiguration={createConfiguration}
      url={API.areaNegoci}
    />
  );
};

export default compose(withValidations, injectIntl)(BusinessAreaCreate);
