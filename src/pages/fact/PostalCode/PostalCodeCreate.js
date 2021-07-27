import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const PostalCodeCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const paisCreate = (md = 6) =>[
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nif",
        defaultMessage: "N.I.F"
      }),
      type: 'input',
      key: 'nif',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso",
        defaultMessage: "Codi Iso"
      }),
      type: 'input',
      key: 'codiso',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso2",
        defaultMessage: "Codi Iso 2 "
      }),
      type: 'input',
      key: 'codiso002',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.cee",
        defaultMessage: "CEE"
      }),
      type: 'checkbox',
      key: 'cee',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
  ]

  const provinciaCreate = (md = 6) =>[
    {
      placeHolder: props.intl.formatMessage({
        id: "Provincias.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
          xs: 12,
          md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Provincias.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Provincias.pais",
        defaultMessage: "Provincies"
      }),
      type: 'LOV',
      key: 'pais',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true,
      selector: {
        key: "paises",
        labelKey: formatCodeAndName,
        sort: 'nom',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName
      },
      validationType: "object",
      ...withRequiredValidation()
    }
  ]

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
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 8),
        ...props.stringValidations.fieldExistsValidation('codiPostal', 'codi', CODE)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CodigoPostal.poblacion",
        defaultMessage: "Población",
      }),
      type: "input",
      key: "poblacio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CodigoPostal.municipio",
        defaultMessage: "Municipio",
      }),
      type: "input",
      key: "municipi",
      required: false,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CodigoPostal.pais",
        defaultMessage: "País",
      }),
      type: "LOV",
      key: "pais",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "paises",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        creationComponents: [...paisCreate(6)],
        relatedWith: {
          name: "provincia",
          filterBy: "pais.id",
          keyValue: "id",
        },
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "CodigoPostal.provincia",
        defaultMessage: "Provincia",
      }),
      type: "LOV",
      key: "provincia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "provincias",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        creationComponents: [...provinciaCreate(6)],
        advancedSearchColumns: aSCodeAndName,
      },
    },

  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "CodigoPostal.titulo",
        defaultMessage: "Codigos Postales",
      })}
      formConfiguration={createConfiguration}
      url={API.codiPostal}
    />
  );
};

export default compose(withValidations, injectIntl)(PostalCodeCreate);
