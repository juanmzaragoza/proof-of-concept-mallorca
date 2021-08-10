import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const PackagingCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const OBS = props.intl.formatMessage({
    id: "Comun.observaciones",
    defaultMessage: "Observaciones",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,

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
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation(
          "envasos",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
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
      placeHolder: OBS,
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Envases.titulo",
        defaultMessage: "Envases",
      })}
      formConfiguration={createConfiguration}
      url={API.envasos}
    />
  );
};

export default compose(withValidations, injectIntl)(PackagingCreate);
