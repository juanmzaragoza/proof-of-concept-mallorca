import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const SeriesIntracomunitariasCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const ULTFAC = props.intl.formatMessage({
    id: "SerieVenta.ultimaFactura",
    defaultMessage: "Última factura",
  });
  const DIA1 = props.intl.formatMessage({
    id: "Proyectos.dia1",
    defaultMessage: "Dia 1",
  });
  const DIA2 = props.intl.formatMessage({
    id: "Proyectos.dia2",
    defaultMessage: "Dia 2",
  });
  const SERDEF = props.intl.formatMessage({
    id: "SerieIntracomunitaria.serieDefecto",
    defaultMessage: "Séries defecto",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,
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
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.stringValidations.fieldExistsValidation(
          "serieIntracomunitaria",
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
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: ULTFAC,
      type: "numeric",
      key: "ultimaFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0,9999999999)],
    },
    {
      placeHolder: DIA1,
      type: "date",
      key: "dia1",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: DIA2,
      type: "date",
      key: "dia2",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),

      ],
    },
    {
      placeHolder: SERDEF,
      type: "checkbox",
      key: "serieDefecto",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Proyectos.serieIntracomunitari",
        defaultMessage: "Serie intracomuntaria",
      })}
      formConfiguration={createConfiguration}
      url={API.serieIntracomunitaria}
    />
  );
};

export default compose(
  withValidations,
  injectIntl
)(SeriesIntracomunitariasCreate);
