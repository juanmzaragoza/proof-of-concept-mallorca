import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ArticleFamilyTransCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamTransp.num",
        defaultMessage: "Num.",
      }),
      type: "input",
      key: "numero",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      disabled: true,
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "articleFamilia",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleFamilias",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamTransp.nombreTransp",
        defaultMessage: "Nombre Transportista",
      }),
      type: "input",
      key: "nomTransportista",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamTransp.nifTransp",
        defaultMessage: "NIF Transportista",
      }),
      type: "input",
      key: "nifTransportista",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 15)],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "FamTransp.titulo",
        defaultMessage: "Familias y Transportistas",
      })}
      formConfiguration={createConfiguration}
      url={API.articlesFamiliaTransportista}
    />
  );
};

export default compose(withValidations, injectIntl)(ArticleFamilyTransCreate);
