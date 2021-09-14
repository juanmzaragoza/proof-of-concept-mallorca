import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_DESCUENTO_SELECTOR_VALUES,
  TIPO_RETENCION_SELECTOR_VALUES,
  TIPO_RECIBOS_SELECTOR_VALUES,
  ALBARAN_CLIENT_SELECTOR_VALUES,
  TIPO_PUBLICAR_WEB_SELECTOR_VALUES,
} from "constants/selectors";

const SubClienteTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

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
  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });

  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const ACTIVIDAD = props.intl.formatMessage({
    id: "Clientes.departamentos_actividad",
    defaultMessage: "Actividad",
  });
  const LONG = props.intl.formatMessage({
    id: "Clientes.contacto.longitud",
    defaultMessage: "Longitud",
  });
  const LAT = props.intl.formatMessage({
    id: "Clientes.contacto.latitud",
    defaultMessage: "Latitud",
  });

  const CONTACTE = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
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

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;
  const { id: clientId } = useParams();

  const subClient = {
    title: props.intl.formatMessage({
      id: "Clientes.subClientes",
      defaultMessage: "Subclientes",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      client: { id: clientId },
    },
    columns: [
      {
        name: "codi",
        title: CODE,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
        hidden: true,
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row?.codiPostal?.description || "",
      },
      { name: "telefon", title: TELEFON },
      { name: "fax", title: FAX, hidden: true },
      { name: "latitut", title: LAT, hidden: true },
      { name: "longitut", title: LONG, hidden: true },
      {
        name: "zona",
        title: props.intl.formatMessage({
          id: "Proveedores.Contacto.zona",
          defaultMessage: "Zona",
        }),
        getCellValue: (row) => row?.zona?.description || "",
        hidden: true,
      },
      { name: "contacte", title: CONTACTE, hidden: true },
      { name: "activitat", title: ACTIVIDAD, hidden: true },
      {
        name: "tarifa1",
        title: props.intl.formatMessage({
          id: "Clientes.fact.tarifa1",
          defaultMessage: "Tarifa 1",
        }),
        getCellValue: (row) => row?.tarifa1?.description || "",
      },
      {
        name: "tarifa2",
        title: props.intl.formatMessage({
          id: "Clientes.fact.tarifa2",
          defaultMessage: "Tarifa 2",
        }),
        getCellValue: (row) => row?.tarifa2?.description || "",
        hidden: true,
      },
      {
        name: "tarifaDescompte",
        title: props.intl.formatMessage({
          id: "Clientes.fact.tarifaDescuento",
          defaultMessage: "Tarifa descuento",
        }),
        getCellValue: (row) => row?.tarifaDescompte?.description || "",
      },
      {
        name: "tipusDescompte",
        title: props.intl.formatMessage({
          id: "Clientes.fact.tipoDescuentos",
          defaultMessage: "Tipo descuento",
        }),
        hidden: true,
      },

      {
        name: "preusPerVolum",
        title: props.intl.formatMessage({
          id: "Clientes.subClientes.precioPorVolumen",
          defaultMessage: "Precios por volúmen",
        }),

        getCellValue: (row) =>
          row.preusPerVolum && row.preusPerVolum === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          ),
      },
      {
        name: "bloquejat",
        title: props.intl.formatMessage({
          id: "Clientes.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        getCellValue: (row) =>
          row.bloquejat && row.bloquejat === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          ),
      },

      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) => row?.iva?.description || "",
        hidden: true,
      },
      {
        name: "regimIva",
        title: props.intl.formatMessage({
          id: "Clientes.regimen.iva",
          defaultMessage: "Régimen IVA",
        }),
        getCellValue: (row) => row?.regimIva?.description || "",
        hidden: true,
      },
      {
        name: "tipusVencimentCodi",
        title: props.intl.formatMessage({
          id: "Proveedores.tvencimiento",
          defaultMessage: "Tipo Vencimiento",
        }),
        hidden: true,
      },

      {
        name: "tipusVenciment1Codi",
        title: props.intl.formatMessage({
          id: "Proveedores.tvencimiento2",
          defaultMessage: "Tipo Vencimiento 2",
        }),

        hidden: true,
      },

      {
        name: "tipusComissio",
        title: props.intl.formatMessage({
          id: "Clientes.fact.tipoComision",
          defaultMessage: "Tipo comisión",
        }),
        getCellValue: (row) => row?.tipusComissio?.description || "",
        hidden: true,
      },
      {
        name: "operariEncarregatCodi",
        title: props.intl.formatMessage({
          id: "Proyectos.encargado",
          defaultMessage: "Encargado",
        }),

        hidden: true,
      },
      {
        name: "operariResponsableCodi",
        title: props.intl.formatMessage({
          id: "Proyectos.responsable",
          defaultMessage: "Responsable",
        }),

        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: CODE,
        type: "input",
        required: true,
        key: "codi",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.fieldExistsValidation(
            "subClients",
            "codi",
            props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            })
          ),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
        required: true,
        type: "input",
        key: "nom",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "strings",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 30),
        ]),
      },
      {
        placeHolder: TELEFON,
        type: "input",
        key: "telefon",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(1, 60),
      },
      {
        placeHolder: FAX,
        type: "input",
        key: "fax",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(1, 60),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
        type: "input",
        key: "domicili",
        breakpoints: {
          xs: 12,
          md: 8,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 30)],
      },
      ...codiPostal(4),
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.tarifa1",
          defaultMessage: "Tarifa 1",
        }),
        type: "LOV",
        key: "tarifa1",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tarifas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.tarifa2",
          defaultMessage: "Tarifa 2",
        }),
        type: "LOV",
        key: "tarifa2",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tarifas",
          labelKey: formatCodeAndDescription,
          cannotCreate: true,
          sort: "descripcio",
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.tarifaDescuento",
          defaultMessage: "Tarifa descuento",
        }),
        type: "LOV",
        key: "tarifaDescompte",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tarifaDescomptes",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.tipoDescuentos",
          defaultMessage: "Tipo descuento",
        }),
        type: "select",
        key: "tipusDescompte",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_DESCUENTO_SELECTOR_VALUES,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        type: "LOV",
        key: "iva",
        id: "ives",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "ivas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          advancedSearchColumns: aSCodeAndDescription,
          cannotCreate: true,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.regimen.iva",
          defaultMessage: "Régimen IVA",
        }),
        type: "LOV",
        key: "regimIva",
        breakpoints: {
          xs: 12,
          md: 3,
        },

        selector: {
          key: "regimIvas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          advancedSearchColumns: aSCodeAndDescription,
          cannotCreate: true,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.tvencimiento",
          defaultMessage: "Tipo Vencimiento",
        }),
        type: "LOV",
        key: "tipusVencimentCodi",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tipusVenciments",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
          transform: {
            apply: (tipusVenciments) => tipusVenciments && tipusVenciments.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.tvencimiento2",
          defaultMessage: "Tipo Vencimiento 2",
        }),
        type: "LOV",
        key: "tipusVenciment1Codi",
        id: "tipusVenciment",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tipusVenciments",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
          transform: {
            apply: (tipusVenciments) => tipusVenciments && tipusVenciments.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.tipoComision",
          defaultMessage: "Tipo comisión",
        }),
        type: "LOV",
        key: "tipusComissio",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tipusComissios",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.encargado",
          defaultMessage: "Encargado",
        }),
        type: "LOV",
        key: "operariEncarregatCodi",
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
          transform: {
            apply: (operaris) => operaris && operaris.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.responsable",
          defaultMessage: "Responsable",
        }),
        type: "LOV",
        key: "operariResponsableCodi",
        id: "operariCodi",
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
          transform: {
            apply: (operaris) => operaris && operaris.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Contacto.zona",
          defaultMessage: "Zona",
        }),
        type: "LOV",
        key: "zona",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "zonas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.dirEnvio",
          defaultMessage: "Dirección envio",
        }),
        type: "LOV",
        key: "adresaComercialClient",

        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "clientAdresas",
          labelKey: (data) => `${data.domicili} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: DOMICILI, name: "domicili" },
          ],
        },
        extraQuery: [
          {
            columnName: "client.id",
            value: `"${clientId}"`,
            exact: true,
          },
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.retenciones",
          defaultMessage: "Retenciones",
        }),
        type: "LOV",
        key: "claseRetencio",
        id: "classeRetencio",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "classeRetencios",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.tipoRetención",
          defaultMessage: "Tipo retención",
        }),
        type: "select",

        key: "tipusRetencio",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_RETENCION_SELECTOR_VALUES,
        },
      },
      {
        type: "numeric",
        key: "percentatgeRetencio",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.retencion",
          defaultMessage: "Retención",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
        suffix: "%",
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 99)],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.alabaran.tipo",
          defaultMessage: "Tipo albarán",
        }),
        type: "select",
        key: "albaraClientSubtipus",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: ALBARAN_CLIENT_SELECTOR_VALUES,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.recibos",
          defaultMessage: "Recibos",
        }),
        type: "select",
        key: "rebuts",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_RECIBOS_SELECTOR_VALUES,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.emailEnvioFact",
          defaultMessage: "Email envio Fact.",
        }),
        type: "input",
        key: "emailFactures",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 100),
          ...props.stringValidations.emailValidation(),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Subcliente.publicarWeb",
          defaultMessage: "Publicar Doc. en la web",
        }),
        type: "select",
        key: "publicarDocumentsWeb",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_PUBLICAR_WEB_SELECTOR_VALUES,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.emailWeb",
          defaultMessage: "Email Web",
        }),
        type: "input",
        key: "emailwww",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 100),
          ...props.stringValidations.emailValidation(),
        ],
      },

      {
        placeHolder: ACTIVIDAD,
        type: "input",
        key: "actividad",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(0, 60),
      },
      {
        placeHolder: LONG,
        type: "numeric",
        key: "longitud",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: LAT,
        type: "numeric",
        key: "latitud",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: CONTACTE,
        type: "input",
        key: "contacte",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(0, 255),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        type: "checkbox",
        key: "bloquejat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.subClientes.precioPorVolumen",
          defaultMessage: "Precios por volúmen",
        }),
        type: "checkbox",
        key: "preusPerVolum",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.subClientes"}
              defaultMessage={"Subclientes"}
            />
          }
        >
          <ExpandableGrid
            id="subClients"
            responseKey="subClients"
            enabled={props.editMode}
            configuration={subClient}
            size={10}

          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SubClienteTab);
