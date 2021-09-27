import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";
import {withValidations} from "../../../modules/wrappers";

const OrganizationList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Organizacion.titulo",
        defaultMessage: "Organizacion",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "Organizacion.titulo",
          defaultMessage: "Oganización",
        }),
        href: "/fact/organizacion",
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
        advancedSearchColumns: aSCodeAndPoblacio,
      },
    },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndPoblacio = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "poblacioMunicipiCodiTxt" },
  ];

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Provincias.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Provincias.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Organizacion.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "telefon",
        title: props.intl.formatMessage({
          id: "Organizacion.telefono",
          defaultMessage: "Teléfono",
        }),
      },
      {
        name: "fax",
        title: props.intl.formatMessage({
          id: "Organizacion.fax",
          defaultMessage: "Fax",
        }),
      },
      {
        name: "adresaWeb",
        title: props.intl.formatMessage({
          id: "Organizacion.dirWeb",
          defaultMessage: "Dirección Web",
        }),
      },
    ],
    URL: API.organitzacio,
    listKey: "organitzacios",
    enableInlineEdition: true,
    enableExpandableContent: true,
  };

  const formComponents = [
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "FamiliaProveedores.codigo",
    //     defaultMessage: "Código",
    //   }),
    //   type: "input",
    //   key: "codi",
    //   required: true,
    //   breakpoints: {
    //     xs: 12,
    //     md: 1,
    //   },
    //   noEditable: true,
    //   validationType: "string",
    //   validations: [
    //     ...props.stringValidations.fieldExistsValidation(
    //       "organitzacio",
    //       "codi",
    //       CODE
    //     ),
    //     ...props.commonValidations.requiredValidation(),
    //     ...props.stringValidations.minMaxValidation(1, 6),
    //   ],
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.email",
        defaultMessage: "email",
      }),
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domicili",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    ...codiPostal(3),
    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.telefono",
        defaultMessage: "Telefono",
      }),
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.fax",
        defaultMessage: "Fax",
      }),
      type: "input",
      key: "fax",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.gerente",
        defaultMessage: "Gerente",
      }),
      type: "input",
      key: "gerent",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.dirWeb",
        defaultMessage: "Dirección web",
      }),
      type: "input",
      key: "adresaWeb",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Organizacion.contacte",
        defaultMessage: "Contacte",
      }),
      type: "input",
      key: "contacte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];
  return (
    <ReactGrid id="organitzacio" configuration={listConfiguration}>

      {(props) => (
        <MasterDetailedForm
          url={API.organitzacio}
          formComponents={formComponents}
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
)(OrganizationList);
