import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ReactGrid from "modules/ReactGrid";
import MasterDetailedForm from "modules/ReactGrid/MasterDetailForm";
import * as API from "redux/api";
import { ESTADO_AVISO_SELECTOR_VALUE } from "constants/selectors";


const AvisosTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: true },
    setIsValid: props.setIsValid,
  });

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

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const { id: budgetId } = useParams();

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });

  const dataEntrada = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaEntrada",
      defaultMessage: "Fecha Entrada",
    }),
    type: "date",
    key: "datEnt",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };
  const dataFi = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaFin",
      defaultMessage: "Fecha Fin",
    }),
    type: "date",
    key: "datFin",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };

  const dataFiPrevista = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.fechaPrevistaFin",
      defaultMessage: "Fecha Prevista Fin",
    }),
    type: "date",
    key: "datFinCal",
    breakpoints: {
      xs: 12,
      md: 3,
    },
  };

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

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const tipoEstat = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.estado",
      defaultMessage: "Estado",
    }),
    type: "select",
    key: "estado",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      options: ESTADO_AVISO_SELECTOR_VALUE,
    },
  };

  

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

  const emisor = {
    placeHolder: props.intl.formatMessage({
      id: "PedidosAlmacen.encargado",
      defaultMessage: "Encargado",
    }),
    type: "LOV",
    key: "operariReb",
    id: "operari",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "operaris",
      labelKey: formatCodeAndName,
      sort: "nom",
    
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const destinatario = {
    placeHolder: props.intl.formatMessage({
      id: "PedidosAlmacen.encargado",
      defaultMessage: "Encargado",
    }),
    type: "LOV",
    key: "operariDti",
    id:"operariCodi",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "operaris",
      labelKey: formatCodeAndName,
      sort: "nom",
     
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
    },
  };

  const tipoAviso = {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.tipoAviso",
      defaultMessage: "Tipo Aviso",
    }),
    type: "LOV",
    key: "tipusAviso",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "tipusAvisoes",
      labelKey: formatCodeAndDescription,
      sort: "nom",

      cannotCreate: true,
      advancedSearchColumns: aSCodeAndDescription,
    },
  };

  const seccio = {
    placeHolder: props.intl.formatMessage({
      id: "SeccionEmpresa.seccion",
      defaultMessage: "Sección",
    }),
    type: "LOV",
    key: "seccio",

    required: true,
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "seccios",
      labelKey: formatCodeAndName,
      sort: "codi",
      cannotCreate: true,
      advancedSearchColumns: aSCodeAndName,
     
    },
    validationType: "object",
    ...withRequiredValidation(),
  };

  const avisosConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.avisos",
      defaultMessage: "Avisos",
    }),
    query: [
      {
        columnName: "pressupost.id",
        value: `"${budgetId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      pressupost: { id: budgetId },
    },
    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "Proveedores.numero",
          defaultMessage: "Número",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "seccio",
        title: props.intl.formatMessage({
          id: "SeccionEmpresa.seccion",
          defaultMessage: "Sección",
        }),
        getCellValue: (row) => row.seccio?.description,
        field: seccio,
      },

      {
        name: "datEnt",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaEntrada",
          defaultMessage: "Fecha Entrada",
        }),

        getCellValue: (row) =>
          row.datEnt ? new Date(row.datEnt).toLocaleDateString() : "",
        field: dataEntrada,
        allowFilter: false,
      },
      {
        name: "tipusAviso",
        title: props.intl.formatMessage({
          id: "Proveedores.tipoAviso",
          defaultMessage: "Tipo Aviso",
        }),
        getCellValue: (row) => row.tipusAviso?.description,
        field: tipoAviso,
      },
      {
        name: "descripcio",
        title: DESCRIPCIO,
      },
      {
        name: "operariReb",
        title: props.intl.formatMessage({
          id: "Proveedores.emisor",
          defaultMessage: "Emisor",
        }),
        getCellValue: (row) => row.operariReb?.description,
        field: emisor,
      },
      {
        name: "operariDti",
        title: props.intl.formatMessage({
          id: "Proveedores.destinatario",
          defaultMessage: "Destinatario",
        }),
        getCellValue: (row) => row.operariDti?.description,
        field: destinatario,
      },

      {
        name: "datFin",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaFin",
          defaultMessage: "Fecha Fin",
        }),
        getCellValue: (row) =>
          row.datFin ? new Date(row.datFin).toLocaleDateString() : "",
        field: dataFi,
        allowFilter: false,
      },

      {
        name: "datFinCal",
        title: props.intl.formatMessage({
          id: "Proveedores.fechaPrevistaFin",
          defaultMessage: "Fecha Prevista Fin",
        }),
        getCellValue: (row) =>
          row.datFinCal ? new Date(row.datFinCal).toLocaleDateString() : "",
        field: dataFiPrevista,
        allowFilter: false,
      },
      {
        name: "estado",
        title: props.intl.formatMessage({
          id: "Proveedores.estado",
          defaultMessage: "Estado",
        }),
        getCellValue: (row) => {
          if (row.estado) {
            if (row.estado === "PENDENT") {
              return props.intl.formatMessage({
                id: "Selector.pendiente",
                defaultMessage: "Pendiente",
              });
            } else if (row.estado === "EN_CURS") {
              return props.intl.formatMessage({
                id: "Selector.enCurso",
                defaultMessage: "En Curso",
              });
            } else {
              return props.intl.formatMessage({
                id: "Selector.finalizado",
                defaultMessage: "Finalizado",
              });
            }
          }
        },
        field:tipoEstat,
        allowFilter: false,
      },
    ],
    listKey: "avisoes",
    enableInlineEdition: true,
    enableExpandableContent: true,
    disabledUpdate: true,
  };
  const commercialAddressesFormConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.destinatario2",
        defaultMessage: "Destinatario 2",
      }),
      type: "LOV",
      key: "operariDti2",
      id: "operari",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
       
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.numPedido",
        defaultMessage: "Num Pedido",
      }),
      type: "numeric",
      key: "numPer",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.descripcionCorta",
        defaultMessage: "descripcion corta",
      }),
      type: "input",
      key: "descripcioCurta",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType:"string",
      validations:[...props.stringValidations.minMaxValidation(0,60)]
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes",
      }),
      type: "LOV",
      key: "client",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        relatedWith: [
          {
            name: "clientAdresa",
            filterBy: "client.id",
            keyValue: "id",
          },
          {
            name: "subClient",
            filterBy: "client.id",
            keyValue: "id",
          },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.direccionComercial",
        defaultMessage: "Dirección Comercial",
      }),
      type: "LOV",
      key: "clientAdresa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clientAdresas",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "codi",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
      },
    },
    ...codiPostal(3),

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.subcliente",
        defaultMessage: "Subcliente",
      }),
      type: "LOV",
      key: "subClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "subClients",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        cannotCreate: true,
      },
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Contacto.telefono",
          defaultMessage: "Teléfono",
        }),
        type: "input",
        key: "tel",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 60),
        ],
      },
    {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.contacto.latitud",
          defaultMessage: "Latitud",
        }),
        type: "input",
        key: "lat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(1, 60),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.contacto.longitud",
          defaultMessage: "Longitud",
        }),
        type: "input",
        key: "lon",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(1, 15),
      },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <ReactGrid
          id="avisos"
          extraQuery={[
            {
              columnName: "pressupost.id",
              value: `"${budgetId}"`,
              exact: true,
            },
          ]}
          configuration={avisosConfig}
        >
          {(properties) => (
            <MasterDetailedForm
              url={API.avisos}
              formComponents={commercialAddressesFormConfig}
              {...properties}
            />
          )}
        </ReactGrid>
      </Grid>
    </Grid>
  );
};

export default compose(injectIntl, withValidations)(AvisosTab);
