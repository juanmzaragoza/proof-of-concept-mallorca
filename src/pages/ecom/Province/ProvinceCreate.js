
import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";

const ProvinceCreate = (props) => {

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }
  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md
    }
  });

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: 'input',
      key: 'nom',
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName
      }
    }
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];

  const createConfiguration = [
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
        ...props.stringValidations.minMaxValidation(1, 3)
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
      id:'paises',
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
        creationComponents: codeAndName(),
        advancedSearchColumns: aSCodeAndName
      },
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Paises.importeReparto",
          defaultMessage: "Importe reparto",
        }),
        type: "numeric",
        key: "importRepartiment",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 900000000000)
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Paises.importeMinimoReparto",
          defaultMessage: "Importe mínimo reparto",
        }),
        type: "numeric",
        key: "importMinimRepartiment",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 900000000000)
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Paises.importeNoPrecioReparto",
          defaultMessage: "Importe compra sin precio reparto",
        }),
        type: "numeric",
        key: "importCompraNoPreuRepartiment",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 900000000000)
        ],
      },

    ];
    return (
      <CreateUpdateForm
        title={props.intl.formatMessage({
          id: "Provincias.titol",
          defaultMessage: "Provincies"
        })}
        formConfiguration={createConfiguration}
        url={API.provincias} />
    )
};

export default compose(
    withValidations,
    injectIntl
)(ProvinceCreate);
