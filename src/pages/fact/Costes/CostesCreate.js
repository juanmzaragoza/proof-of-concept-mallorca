import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const CostesCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

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

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.tipoCoste",
        defaultMessage: "Tipo Coste",
      }),
      type: "LOV",
      key: "tipusCostCodi",
      id: "tipusCost",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "tipusCosts",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (tipusCosts) => tipusCosts && tipusCosts.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Costes.unidades",
        defaultMessage: "Unidades",
      }),
      type: "numeric",
      key: "unitats",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.articulo",
        defaultMessage: "Artículo",
      }),
      type: "LOV",
      key: "article",
      id: "articlesFact",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "articles",
        labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
        sort: "descripcioCurta",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "descripcioCurta" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Costes.formaCoste",
        defaultMessage: "formaCoste",
      }),
      type: "LOV",
      key: "formaCost",
      id: "formesCost",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "formaCosts",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "descripcio" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 10,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Costes.actualizar",
        defaultMessage: "Actualizar Coste",
      }),
      type: "checkbox",
      key: "actualitzarCostArticle",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Costes.titulo",
        defaultMessage: "Costes",
      })}
      formConfiguration={createConfiguration}
      url={API.costos}
    />
  );
};

export default compose(withValidations, injectIntl)(CostesCreate);
