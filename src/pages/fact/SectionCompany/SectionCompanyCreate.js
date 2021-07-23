import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const SectionCompanyCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const code = (md = 3) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
    validationType: "string",
    validations: [...props.commonValidations.requiredValidation()],
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.empresas",
        defaultMessage: "Empresas",
      }),
      type: "LOV",
      key: "empresa",
      noEditable: true,
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
        sort: "nomFiscal",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomFiscal" },
        ],
        relatedWith: {
          name: "seccio",
          filterBy: "empresa.id",
          keyValue: "id",
        },
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SeccionEmpresa.seccion",
        defaultMessage: "Sección",
      }),
      type: "LOV",
      key: "seccio",
      
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "seccios",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SeccionEmpresa.familiaArticulo",
        defaultMessage: "Familia Artículo",
      }),
      type: "LOV",
      key: "articleFamilia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "articleFamilias",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SeccionEmpresa.valorPorcentual",
        defaultMessage: "Valor Porcentual",
      }),
      type: "input",
      key: "valorPercentual",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones",
      }),
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
      validations: [...props.stringValidations.minMaxValidation(1, 1000)],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "SeccionEmpresa.titulo",
        defaultMessage: "Secciones Empresa",
      })}
      formConfiguration={createConfiguration}
      url={API.seccionsEmpresa}
    />
  );
};

export default compose(withValidations, injectIntl)(SectionCompanyCreate);
