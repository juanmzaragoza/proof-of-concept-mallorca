import React, { useEffect } from "react";
import ReactGrid from "../../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import {
  setBreadcrumbHeader,
  setListingConfig,
} from "../../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as API from "redux/api";
import {
  TIPO_REGISTRO_COMERCIAL_SELECTOR_VALUES,
  MEDIO_SELECTOR_VALUES,
} from "../../../constants/selectors";
import { withValidations } from "../../../modules/wrappers";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";

const CommercialRegisterList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "RegistroComercial.titulo",
          defaultMessage: "Registros Comerciales",
        }),
        href: "/fact/registros-comerciales",
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

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const NOM_COMERCIAL = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });

  const aSCodeAndNameComercial = [
    { title: CODE, name: "codi" },
    { title: NOM_COMERCIAL, name: "nomComercial" },
  ];

  const cliente = {
    placeHolder: props.intl.formatMessage({
      id: "Clientes.titulo",
      defaultMessage: "Clientes",
    }),
    type: "LOV",
    key: "client",
    breakpoints: {
      xs: 12,
      md: 5,
    },
    selector: {
      key: "clients",
      labelKey: (data) => `${data.nomComercial} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndNameComercial,
    },
  };

  const producto = {
    placeHolder: props.intl.formatMessage({
      id: "RegistroComercial.productos",
      defaultMessage: "Productos",
    }),
    type: "LOV",
    key: "producte",
    breakpoints: {
      xs: 12,
      md: 4,
    },
    selector: {
      key: "productes",
      labelKey: (data) => `${data.nom} (${data.codi})`,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const tipus = {
    placeHolder: props.intl.formatMessage({
      id: "Clientes.tipo",
      defaultMessage: "Tipo",
    }),
    type: "select",
    key: "tipus",
    required: true,
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      options: TIPO_REGISTRO_COMERCIAL_SELECTOR_VALUES,
    },
    validations: [...props.commonValidations.requiredValidation()],
  };

  const medio = {
    placeHolder: props.intl.formatMessage({
      id: "RegistroComercial.medio",
      defaultMessage: "Medio",
    }),
    type: "select",
    key: "mitja",
    required: true,
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      options: MEDIO_SELECTOR_VALUES,
    },
    validations: [...props.commonValidations.requiredValidation()],
  };

  const listConfiguration = {
    columns: [
      {
        name: "interessat",
        title: props.intl.formatMessage({
          id: "RegistroComercial.interesado",
          defaultMessage: "Interesado",
        }),
      },
      {
        title: props.intl.formatMessage({
          id: "RegistroComercial.medio",
          defaultMessage: "Medio",
        }),
        name: "mitja",
        field: medio,
        allowFilter: false,
        width: 280,
        getCellValue: (row) => {
          if (row.mitja) {
            switch (row.mitja) {
              case "WEB":
                return props.intl.formatMessage({
                  id: "Selector.web",
                  defaultMessage: "Web",
                });
              case "CERCADOR":
                return props.intl.formatMessage({
                  id: "Selector.buscador",
                  defaultMessage: "Buscador",
                });
              case "CONEGUT":
                return props.intl.formatMessage({
                  id: "Selector.conocido",
                  defaultMessage: "Conocido",
                });
              case "FIRA":
                return props.intl.formatMessage({
                  id: "Selector.feria",
                  defaultMessage: "Feria o acontecinmiento",
                });
              case "PUBLICITAT":
                return props.intl.formatMessage({
                  id: "Selector.publicidad",
                  defaultMessage: "Publicidad",
                });
              case "CONEIX_EMPRESA":
                return props.intl.formatMessage({
                  id: "Selector.conoceEmpresa",
                  defaultMessage: "Conoce Empresa",
                });

              case "VISITA_COMERCIAL":
                return props.intl.formatMessage({
                  id: "Selector.visitaComercial",
                  defaultMessage: "visita Comercial",
                });
              case "REUNIO_DE_TREBALL":
                return props.intl.formatMessage({
                  id: "Selector.reunionTrabajo",
                  defaultMessage: "Reunión de trabajo",
                });
              case "FORMACIO":
                return props.intl.formatMessage({
                  id: "Selector.formacion",
                  defaultMessage: "Formación",
                });
              case "ALTRES":
                return props.intl.formatMessage({
                  id: "Selector.otros",
                  defaultMessage: "Otros",
                });
            }
  
          }
        },
      },
      {
        name: "descripcioMitja",
        title: props.intl.formatMessage({
          id: "RegistroComercial.descripcion",
          defaultMessage: "Descripción del Medio",
        }),
      },
      {
        title: props.intl.formatMessage({
          id: "Clientes.tipo",
          defaultMessage: "Tipo",
        }),
        name: "tipus",

        getCellValue: (row) => {
          if (row.tipus) {
            if (row.tipus === "CRIDADA") {
              return props.intl.formatMessage({
                id: "Selector.llamada",
                defaultMessage: "Llamada",
              });
            } else if (row.tipus === "CORREU") {
              return props.intl.formatMessage({
                id: "Selector.correo",
                defaultMessage: "Correo",
              });
            } else {
              return props.intl.formatMessage({
                id: "Selector.visitaPresencial",
                defaultMessage: "Visita Presencial",
              });
            }
          }
        },
        field: tipus,
        allowFilter: false,
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        getCellValue: (row) => (row.client ? row.client.description : ""),
        field: cliente,
      },
      {
        name: "producte",
        title: props.intl.formatMessage({
          id: "RegistroComercial.productos",
          defaultMessage: "Productos",
        }),
        getCellValue: (row) => (row.producte ? row.producte.description : ""),
        field: producto,
      },
    ],
    URL: API.registreComercial,
    listKey: "registreComercials",
    enableInlineEdition: true,
    enableExpandableContent: true,
  };

  const formComponents = [
   
    
   
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.datosContacto",
        defaultMessage: "Datos de Contacto",
      }),
      type: "input",
      key: "dadesContacte",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.comentarios",
        defaultMessage: "Comentarios",
      }),
      type: "input",
      key: "comentaris",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 1500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.fecha",
        defaultMessage: "Fecha",
      }),
      type: "date",
      key: "data",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  return (
    <ReactGrid id="registreComercial" configuration={listConfiguration}>
      {(props) => (
        <MasterDetailedForm
          url={API.registreComercial}
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
)(CommercialRegisterList);
