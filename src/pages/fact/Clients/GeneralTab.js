import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_CLIENTE_SELECTOR_VALUES,
  PAISNIF_SELECTOR_VALUES,
  TDOC_SELECTOR_VALUES,
  TIPO_EXTRANJ_SELECTOR_VALUES,
  TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
} from "constants/selectors";

import { useTabForm } from "hooks/tab-form";

const CLIENT_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;
const FACT_SECTION_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: clientId } = useParams();

  const TITLE = props.intl.formatMessage({
    id: "Proveedores.direcciones_comerciales",
    defaultMessage: "Direcciones Comerciales",
  });
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });

  const LONG = props.intl.formatMessage({
    id: "Clientes.contacto.longitud",
    defaultMessage: "Longitud",
  });
  const LAT = props.intl.formatMessage({
    id: "Clientes.contacto.latitud",
    defaultMessage: "Latitud",
  });
  const DEFECTE = props.intl.formatMessage({
    id: "Proveedores.DireccionComercial.defecto",
    defaultMessage: "Defecto",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DIR_EXCLUSIVA = props.intl.formatMessage({
    id: "Clientes.dreccion_exclusiva",
    defaultMessage: "Dirección exclusiva",
  });
  const BLOQUEJAT = props.intl.formatMessage({
    id: "Clientes.bloqueado",
    defaultMessage: "Bloqueado",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const CONTACTE = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
  });

  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });
  const ACTIVIDAD = props.intl.formatMessage({
    id: "Clientes.departamentos_actividad",
    defaultMessage: "Actividad",
  });

  const MOVIL = props.intl.formatMessage({
    id: "Clientes.Contacto.movil",
    defaultMessage: "Telf. Móvil",
  });
  const CIF = props.intl.formatMessage({
    id: "Clientes.Contacto.cif",
    defaultMessage: "CIF",
  });

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");
  useEffect(() => {
    const dir =
      getString("sg") +
      " " +
      getString("nomDomicili") +
      " " +
      getString("numeroDomicili") +
      " " +
      getString("escala") +
      " " +
      getString("pis") +
      " " +
      getString("porta");
    setFormData({ key: "domicili", value: dir });
  }, [
    getFormData("sg"),
    getFormData("nomDomicili"),
    getFormData("numeroDomicili"),
    getFormData("escala"),
    getFormData("pis"),
    getFormData("porta"),
  ]);

  useEffect(() => {
    const codiPostal = getString("codiPostal");
    setFormData({
      key: "poblacio",
      value: codiPostal ? codiPostal.poblacio : "",
    });
  }, [getFormData("codiPostal")]);

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
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];
  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      ...withRequiredValidation(),
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

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const clientConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 6)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial",
      }),
      type: "input",
      key: "nomComercial",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal",
      }),
      type: "input",
      key: "nomFiscal",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 40),
      ]),
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
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias",
      }),
      type: "input",
      key: "alias",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.pais_nif",
        defaultMessage: "País NIF",
      }),
      type: "LOV",
      key: "paisNifCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "paisNifs",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (paisNifs) => paisNifs && paisNifs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        creationComponents: [
          ...codeAndName(6, 6),
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tamanyNif",
              defaultMessage: "tamanyNif",
            }),
            type: "input",
            key: "tamanyNif",
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 30)],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tipoDoc",
              defaultMessage: "Tipo Documento",
            }),
            type: "select",
            key: "tipusNif",
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              options: PAISNIF_SELECTOR_VALUES,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 30)],
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tipoDoc",
        defaultMessage: "Tipo Documento",
      }),
      type: "select",
      key: "tipusNif",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TDOC_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.censado_aeat",
        defaultMessage: "Censado AEAT",
      }),
      type: "checkbox",
      key: "censadoAEAT",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.organizacion",
        defaultMessage: "Organización",
      }),
      type: "LOV",
      key: "organitzacio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "organitzacios",
        labelKey: formatCodeAndName,
        sort: "organitzacios",
        creationComponents: [...codeAndName(4, 8)],
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "familiaClient",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "familiaClients",
        labelKey: formatCodeAndName,
        sort: "description",
        creationComponents: [...codeAndName(6, 6)],
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.idioma",
        defaultMessage: "Idioma",
      }),
      type: "LOV",
      key: "idioma",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "idiomas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [
          ...codeAndDescription(4, 4),
          {
            type: "input",
            key: "codiIso",
            placeHolder: props.intl.formatMessage({
              id: "Idiomas.codigoIso",
              defaultMessage: "código Iso",
            }),

            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.entidad_publica",
        defaultMessage: "Entidad pública",
      }),
      type: "checkbox",
      key: "entitatPublica",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.comercial",
        defaultMessage: "Comercial",
      }),
      type: "LOV",
      key: "operariCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (operaris) => operaris && operaris.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },

        creationComponents: [
          ...codeAndName(),
          {
            placeHolder: props.intl.formatMessage({
              id: "Comercial.horario",
              defaultMessage: "Horario",
            }),
            type: "LOV",
            key: "horari",
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "horaris",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            type: "input",
            key: "pin",
            placeHolder: props.intl.formatMessage({
              id: "Comercial.pin",
              defaultMessage: "Pin",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "ptenmn",
            placeHolder: props.intl.formatMessage({
              id: "Comercial.ptenmn",
              defaultMessage: "Ptenmn",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.proyectoObligatorio",
        defaultMessage: "Proyecto Obligatorio",
      }),
      type: "checkbox",
      key: "projecteObl",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  const addressConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.tipoVia",
        defaultMessage: "Tipo Vía",
      }),
      type: "input",
      key: "sg",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: DOMICILI,
      type: "input",
      key: "nomDomicili",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.numero",
        defaultMessage: "Número",
      }),
      type: "input",
      key: "numeroDomicili",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 5)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.esc",
        defaultMessage: "Esc.",
      }),
      type: "input",
      key: "escala",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.piso",
        defaultMessage: "Piso",
      }),
      type: "input",
      key: "pis",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.puerta",
        defaultMessage: "Puerta",
      }),
      type: "input",
      key: "porta",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.direccionCompleta",
        defaultMessage: "Dirección Completa",
      }),
      type: "input",
      key: "domicili",
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    ...codiPostal(3),
  ];

  const factElectConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipo_persona",
        defaultMessage: "Tipo Persona",
      }),
      type: "select",
      key: "tipusPersona",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_CLIENTE_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nomFiscal001",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.apellido1",
        defaultMessage: "Apellido",
      }),
      type: "input",
      key: "llinatgeFiscal001",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.apellido2",
        defaultMessage: "Apellido 2",
      }),
      type: "input",
      key: "llinatgeFiscal002",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipoExtranj",
        defaultMessage: "Tipo Residencia",
      }),
      type: "select",
      key: "tipusEstranger",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_EXTRANJ_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.contacto",
        defaultMessage: "Contacto",
      }),
      type: "input",
      key: "contacteFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.telefono",
        defaultMessage: "Teléfono",
      }),
      type: "input",
      key: "telefonFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.email",
        defaultMessage: "E-mail",
      }),
      type: "input",
      key: "emailFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const clienteDireccionesComerciales = {
    title: TITLE,
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
      { name: "codi", title: CODE },
      { name: "domicili", title: DOMICILI },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Proveedores.Direccion.codPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row.codiPostal && row.codiPostal?.description,
        hidden: true,
      },
      { name: "telefon", title: TELEFON },
      { name: "fax", title: FAX, hidden: true },
      { name: "latitut", title: LAT, hidden: true },
      { name: "longitut", title: LONG, hidden: true },
      { name: "contacte", title: CONTACTE, hidden: true },
      { name: "telefonMovil", title: MOVIL, hidden: true },
      { name: "email", title: EMAIL, hidden: true },
      { name: "activitat", title: ACTIVIDAD, hidden: true },
      { name: "cif", title: CIF, hidden: true },
      {
        name: "direccionExclusivaEnvio",
        title: DIR_EXCLUSIVA,

        getCellValue: (row) =>
          row.direccionExclusivaEnvio && row.direccionExclusivaEnvio === "S" ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
      },
      {
        name: "defecte",
        title: DEFECTE,
        getCellValue: (row) =>
          row?.domiciliDefecte && row.domiciliDefecte === "S" ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
      },
      {
        name: "bloquejat",
        title: BLOQUEJAT,
        getCellValue: (row) =>
          row?.bloquejada && row.bloquejada === "S" ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
      },
    ],
    formComponents: [
      code(3),
      {
        placeHolder: DOMICILI,
        type: "input",
        key: "domicili",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        required: true,
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(1, 30),
        ]),
      },
      ...codiPostal(3),

      {
        placeHolder: TELEFON,
        type: "input",
        key: "telefon",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: FAX,
        type: "input",
        key: "fax",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: LONG,
        type: "input",
        key: "longitut",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: LAT,
        type: "input",
        key: "latitut",
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
          md: 3,
        },
      },
      {
        placeHolder: MOVIL,
        type: "input",
        key: "telefonMovil",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: EMAIL,
        type: "input",
        key: "email",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: ACTIVIDAD,
        type: "input",
        key: "activitat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: CIF,
        type: "input",
        key: "cif",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },

      {
        placeHolder: DIR_EXCLUSIVA,
        type: "select",
        key: "direccionExclusivaEnvio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: DEFECTE,
        type: "select",
        key: "domiciliDefecte",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },

      {
        placeHolder: BLOQUEJAT,
        type: "select",
        key: "bloquejada",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
    ],
  };

  const tipoClientes = {
    title: props.intl.formatMessage({
      id: "Clientes.tipoCliente",
      defaultMessage: "Tipo Cliente",
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
        name: "tipusProveidorClient.description",
        title: props.intl.formatMessage({
          id: "Clientes.tiposClientes",
          defaultMessage: "Tipo Proveedor/Cliente",
        }),
        getCellValue: (row) => row.tipusProveidorClient?.description ?? "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.tiposClientes",
          defaultMessage: "Tipo Proveedor/Cliente",
        }),
        type: "LOV",
        key: "tipusProveidorClient",
        required: false,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "tipusProveidorClients",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "description",
          cannotCreate: true,
        },
      },
    ],
  };

  const oficinaContable = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "oficinaComptable",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOficinaComptableCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliOficinaComptable",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const organoGestor = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "organGestor",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOrganGestorCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliOrganGestor",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const unidadTramitadora = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "unitatTramitadora",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalUnitatTramitadoraCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domiciliUnitatTramitadora",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proveedores.direccion"}
          defaultMessage={"Dirección"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={addressConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ADDRESS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(ADDRESS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.tabs.facturacionElect"}
          defaultMessage={"Facturación electrónico"}
        />
      ),
      key: 1,
      component: (
        <>
          <GenericForm
            formComponents={factElectConfig}
            emptyPaper={true}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(FACT_SECTION_TAB_INDEX, value)
            }
            onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
            {...props}
          />
          <Grid container spacing={2}>
            <Grid xs={4} item>
              <OutlinedContainer
                className="general-tab-container"
                title={
                  <FormattedMessage
                    id={"Clientes.fact.ofiContable"}
                    defaultMessage={"Ofinica Contable"}
                  />
                }
              >
                <GenericForm
                  formComponents={oficinaContable}
                  emptyPaper={true}
                  editMode={props.editMode}
                  getFormData={getFormData}
                  setFormData={setFormData}
                  loading={props.loading}
                  formErrors={props.formErrors}
                  submitFromOutside={props.submitFromOutside}
                  onSubmit={() => props.onSubmitTab(formData)}
                  handleIsValid={(value) =>
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
            <Grid xs={4} item>
              <OutlinedContainer
                className="general-tab-container"
                title={
                  <FormattedMessage
                    id={"Clientes.fact.orgGestor"}
                    defaultMessage={"Órgano Gestor"}
                  />
                }
              >
                <GenericForm
                  formComponents={organoGestor}
                  emptyPaper={true}
                  editMode={props.editMode}
                  getFormData={getFormData}
                  setFormData={setFormData}
                  loading={props.loading}
                  formErrors={props.formErrors}
                  submitFromOutside={props.submitFromOutside}
                  onSubmit={() => props.onSubmitTab(formData)}
                  handleIsValid={(value) =>
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
            <Grid xs={4} item>
              <OutlinedContainer
                className="general-tab-container"
                title={
                  <FormattedMessage
                    id={"Clientes.fact.unidadTramitadora"}
                    defaultMessage={"Unidad Tramitadora"}
                  />
                }
              >
                <GenericForm
                  formComponents={unidadTramitadora}
                  emptyPaper={true}
                  editMode={props.editMode}
                  getFormData={getFormData}
                  setFormData={setFormData}
                  loading={props.loading}
                  formErrors={props.formErrors}
                  submitFromOutside={props.submitFromOutside}
                  onSubmit={() => props.onSubmitTab(formData)}
                  handleIsValid={(value) =>
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
          </Grid>
        </>
      ),
    },

    {
      label: TITLE,
      key: 2,
      component: (
        <ExpandableGrid
          id="clientAdresas"
          responseKey="clientAdresas"
          enabled={props.editMode}
          configuration={clienteDireccionesComerciales}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Clientes.tipoCliente"}
          defaultMessage={"Tipo Cliente"}
        />
      ),
      key: 3,
      component: (
        <ExpandableGrid
          id="tipusClient"
          responseKey="tipusClients"
          enabled={props.editMode}
          configuration={tipoClientes}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.general"}
              defaultMessage={"General"}
            />
          }
        >
          <GenericForm
            formComponents={clientConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CLIENT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CLIENT_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
