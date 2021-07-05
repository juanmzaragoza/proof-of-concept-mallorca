import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const ClientsFamilyCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

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
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('familiaClients', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaClientes.cuentaVentas",
        defaultMessage: "Cuenta Ventas Contabilidad",
      }),
      type: "input",
      key: "compteVendesComptabilitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 10),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaClientes.tipoRiesgo",
        defaultMessage: "Tipo Riesgo",
      }),
      type: "LOV",
      key: "tipusRisc",
      id:'tipusRiscs',
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusRiscs",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },


    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      required: false,
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "FamiliaClientes.titulo",
        defaultMessage: "Familias cliente",
      })}
      formConfiguration={createConfiguration}
      url={API.familiaClients}
    />
  );
};

export default compose(withValidations, injectIntl)(ClientsFamilyCreate);
