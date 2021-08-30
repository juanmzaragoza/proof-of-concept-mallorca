import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ToxicCategoryCreate = (props) => {
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

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
      validationType: "string",
      validations: [
        ...props.stringValidations.fieldExistsValidation(
          "categoriaToxicologica",
          "codi",
          CODE
        ),
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 4),
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa",
      }),
      type: "LOV",
      key: "empresaCodi",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        cannotCreate: true,
        relatedWith: [
          {
            name: "peuDocument",
            filterBy: "empresa.id",
            keyValue: "id",
          },
        ],
        transform: {
          apply: (empresa) => empresa && empresa.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },

        advancedSearchColumns: [
          {
            title: CODE,
            name: "codi",
          },
          {
            title: props.intl.formatMessage({
              id: "Proveedores.nombre_comercial",
              defaultMessage: "Nombre Comercial",
            }),
            name: "nomComercial",
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.pieDocumento",
        defaultMessage: "Pié documento",
      }),
      type: "LOV",
      key: "peuDocument",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "peuDocuments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "CategoriaTox.titulo",
        defaultMessage: "Categorias Toxicológicas",
      })}
      formConfiguration={createConfiguration}
      url={API.categoriaToxicologica}
    />
  );
};

export default compose(withValidations, injectIntl)(ToxicCategoryCreate);
