import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const SectorCreate = (props) => {
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
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

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
        ...props.stringValidations.minMaxValidation(1, 6),
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
        md: 7,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.idioma",
        defaultMessage: "Idioma",
      }),
      type: "LOV",
      key: "idioma",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "idiomas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        creationComponents: codeAndDescription(),
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DESCRIPCIO, name: "descripcio" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Sectores.descripcionIdioma",
        defaultMessage: "Descripción Idioma",
      }),
      type: "input",
      key: "descripcioIdioma",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Sectores.titulo",
        defaultMessage: "Sectores",
      })}
      formConfiguration={createConfiguration}
      url={API.sectors}
    />
  );
};

export default compose(withValidations, injectIntl)(SectorCreate);
