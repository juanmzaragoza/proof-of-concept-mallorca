import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";
import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";
import { TIPO_DIR_COMERCIALES_SELECTOR_VALUES } from "constants/selectors";
import { withValidations } from "modules/wrappers";

const FactoringLineList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "LiniasFactoring.titulo",
        defaultMessage: "Linias Factoring",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "LiniasFactoring.titulo",
          defaultMessage: "Linias Factoring",
        }),
        href: "/fact/linias-factoring",
      },
    ]);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
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

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
      breakpoints: {
        xs: 12,
        md: md,
      },
      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País",
            }),
            type: "LOV",
            key: "pais",
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              relatedWith: [
                {
                  name: "provincia",
                  filterBy: "pais.id",
                  keyValue: "id",
                },
              ],
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
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            type: "input",
            key: "municipi",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "poblacio",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const banco = {
    placeHolder: props.intl.formatMessage({
      id: "LiniasFactoring.bancCodi",
      defaultMessage: "Banco",
    }),
    type: "LOV",
    key: "banc",
    breakpoints: {
      xs: 12,
      md: 5,
    },
    selector: {
      key: "bancs",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      transform: {
        apply: (bancs) => bancs && bancs.codi,
        reverse: (rows, codi) => rows.find((row) => row.codi == codi),
      },
      cannotCreate: true,

      advancedSearchColumns: [
        { title: CODE, name: "codi" },
        { title: NOM, name: "nom" },
      ],
    },
  };

  const recurso = {
    placeHolder: props.intl.formatMessage({
      id: "LiniasFactoring.recurso",
      defaultMessage: "Recurso",
    }),
    type: "select",
    key: "recursSiONo",
    required: true,
    breakpoints: {
      xs: 12,
      md: 2,
    },
    selector: {
      options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
    },
    validationType: "string",
    validations: [...props.commonValidations.requiredValidation()],
  };

  const listConfiguration = {
    columns: [
      {
        name: "contracteNumero",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.numContrato",
          defaultMessage: "Num. Contrato",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "banc",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.codigoBanco",
          defaultMessage: "Código Banco",
        }),

        field: banco,
      },
      {
        name: "bancNom",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.nombreBanco",
          defaultMessage: "Nombre Banco",
        }),
      },
      {
        name: "bancNif",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.cif",
          defaultMessage: "CIF",
        }),
      },
      {
        name: "importLimit",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.importeLimite",
          defaultMessage: "Importe Límite",
        }),
      },
      {
        name: "recursSiONo",
        title: props.intl.formatMessage({
          id: "LiniasFactoring.recurso",
          defaultMessage: "Recurso",
        }),
          getCellValue: (row) => {
            if (row.recursSiONo) {
              if (row.recursSiONo === "S") {
                return props.intl.formatMessage({
                  id: "Comun.si",
                  defaultMessage: "Si",
                });
              } else {
                return props.intl.formatMessage({
                  id: "Comun.no",
                  defaultMessage: "No",
                });
              }
            }
          },
          field: recurso,
          allowFilter: false,
      
      },
    ],
    URL: API.liniaFactoring,
    listKey: "liniaFactorings",
    enableInlineEdition: true,
    enableExpandableContent: true,
  };

  const createConfiguration = [
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "LiniasFactoring.numContrato",
    //     defaultMessage: "Num. Contrato",
    //   }),
    //   type: "input",
    //   key: "contracteNumero",
    //   required: true,
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   noEditable: true,
    //   validationType: "string",
    //   validations: [
    //     ...props.commonValidations.requiredValidation(),
    //     ...props.stringValidations.fieldExistsValidation(
    //       "liniaFactoring",
    //       "contracteNumero",
    //       props.intl.formatMessage({
    //         id: "LiniasFactoring.numContrato",
    //         defaultMessage: "Num. Contrato",
    //       })
    //     ),
    //     ...props.stringValidations.minMaxValidation(0, 20),
    //   ],
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.bancCodi",
        defaultMessage: "Banco",
      }),
      type: "LOV",
      key: "banc",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      required: true,
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        transform: {
          apply: (bancs) => bancs && bancs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi == codi),
        },
        cannotCreate: true,

        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.bancNom",
        defaultMessage: "Banco Nombre",
      }),
      type: "input",
      key: "bancNom",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.cif",
        defaultMessage: "CIF",
      }),
      type: "input",
      key: "bancNif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 12)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.cuentaContable",
        defaultMessage: "Cuenta Contable",
      }),
      type: "input",
      key: "compteComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.importeLimite",
        defaultMessage: "Importe Límite",
      }),
      type: "numeric",
      key: "importLimit",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.diaNumero",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diaNumero",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999)],
    },

    recurso,

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "divisas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    ...codiPostal(3),
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  return (
    <ReactGrid id="liniaFactoring" configuration={listConfiguration}>
      {(props) => (
        <MasterDetailedForm
          url={API.liniaFactoring}
          formComponents={createConfiguration}
          {...props}
        />
      )}
    </ReactGrid>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  withValidations,
  injectIntl,
  connect(null, mapDispatchToProps)
)(FactoringLineList);
