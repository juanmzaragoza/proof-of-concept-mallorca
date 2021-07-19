import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import {
  PRECIO_ALBARAN_SELECTOR_VALUES,
  TIPO_PROYECTO_ALBARAN_SELECTOR_VALUES,
  TIPO_RETENCION2_SELECTOR_VALUES,
  TIPO_CONTABILIZACION_SELECTOR_VALUES,
  TIPO_ESTADO_PROYECTO_SELECTOR_VALUES,
  TIPO_EJECUCION_PROYECTO_SELECTOR_VALUES,
} from "constants/selectors";

const PROJECT_SECTION_INDEX = 0;
const CLIENT_SECTION_TAB_INDEX = 1;
const TECNIC_SECTION_TAB_INDEX = 2;
const DATES_SECTION_TAB_INDEX = 3;
const CONFIG_SECTION_TAB_INDEX = 4;

const ProjectDataTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [PROJECT_SECTION_INDEX]: false,
      [TECNIC_SECTION_TAB_INDEX]: false,
      [CLIENT_SECTION_TAB_INDEX]: false,
      [DATES_SECTION_TAB_INDEX]: false,
      [CONFIG_SECTION_TAB_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

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
  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

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
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "poblacio" },
        ],
      },
    },
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const projectsConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",

      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation(
          "projectes",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 210),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.serie",
        defaultMessage: "Serie",
      }),
      type: "LOV",
      key: "serie",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "serieVendas",
        labelKey: formatCodeAndDescription,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.codigoAlternativo",
        defaultMessage: "Código alternativo",
      }),
      type: "input",
      key: "codiAlternatiu",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 35)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.responsable",
        defaultMessage: "Responsable",
      }),
      type: "input",
      key: "responsable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.valorEstimado",
        defaultMessage: "Valor estimado",
      }),
      type: "numeric",
      key: "valorEstimat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(1, 100000000)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        creationComponents: [
          ...codeAndName(4, 4),
          {
            type: "input",
            key: "valorEuros",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoProyecto",
        defaultMessage: "Tipo proyecto",
      }),
      type: "LOV",
      key: "projecteTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      variant: "outlined",
      selector: {
        key: "projecteTipuses",
        labelKey: formatCodeAndName,
        sort: "nom",
        creationComponents: codeAndName(),
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      required:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        cannotCreate: true,
      },
      validationType: "object",
      validations:[...props.commonValidations.requiredValidation()]
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 11,
      },
      text: {
        multiline: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2000)],
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const technicalData = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.direccionTecnica",
        defaultMessage: "Dirección técnica ",
      }),
      type: "input",
      key: "direccioTecnica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.depositoFianza",
        defaultMessage: "Depósito fianza ",
      }),
      type: "input",
      key: "dipositFianca",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.importeFianza",
        defaultMessage: "Importe fianza ",
      }),
      type: "input",
      key: "importFianca",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estado",
        defaultMessage: "Estado",
      }),
      type: "select",
      key: "estat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_ESTADO_PROYECTO_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoEjecucion",
        defaultMessage: "Tipo ejecución",
      }),
      required: true,
      type: "select",
      key: "tipusExecucio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_EJECUCION_PROYECTO_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.devolucionAval",
        defaultMessage: "Devolución aval ",
      }),
      type: "date",
      key: "dataDevolucioAval",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.previsionFin",
        defaultMessage: "Previsión fin",
      }),
      type: "date",
      required: true,
      key: "dataFiPrevist",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaInicio",
        defaultMessage: "Fecha inicio",
      }),
      type: "date",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaFin",
        defaultMessage: "Fecha fin",
      }),
      required: true,
      type: "date",
      key: "dataFi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.responsable",
        defaultMessage: "Responsable",
      }),
      type: "input",
      key: "operariResponsableCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.jefeGrupo",
        defaultMessage: "Jefe de grupo",
      }),
      type: "input",
      key: "operariCapGrupCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.encargado",
        defaultMessage: "Encargado",
      }),
      type: "input",
      key: "operariEncarregatCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.administrativo",
        defaultMessage: "Administrativo",
      }),
      type: "input",
      key: "operariAdministratiuCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.personaContacto",
        defaultMessage: "Persona de contacto",
      }),
      type: "input",
      key: "personaContacte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.telefonoContacto",
        defaultMessage: "Teléfono de contacto",
      }),
      type: "input",
      key: "telefonContacte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.direccionFisica",
        defaultMessage: "Dirección física",
      }),
      type: "input",
      key: "direccioFiscal",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    ...codiPostal(4),
  ];

  console.log(getFormData('client'));
  const customerData = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.cliente",
        defaultMessage: "Cliente",
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
        sort: "nomComercial",
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
        cannotCreate: true,
        relatedWith: 
          {
            name: "clientAdresa",
            filterBy: "client.id",
            keyValue: "id",
          },
        relatedWith: 
          {
            name: "subClient",
            filterBy: "client.id",
            keyValue: "id",
          },
        
      },
    },
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
        id: "Proyectos.direccionComercial",
        defaultMessage: "Dirección Comercial",
      }),
      type: "LOV",
      key: "clientAdresa",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "clientAdresas",
        labelKey: (data) => `${data.descCliAdreComCodi} (${data.codi})`,
        sort: "codi",
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "descCliAdreComCodi" },
        ],
        cannotCreate: true,
      },
    },
  ];

  const projectDates = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaAdjudicacion",
        defaultMessage: "Adjudicación",
      }),
      required: true,
      type: "date",
      key: "dataAdjudicacio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaRecepcionProv",
        defaultMessage: "Recepción provisional",
      }),
      type: "date",
      key: "dataRecepcioProvisional",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.inicioGarantia",
        defaultMessage: "Inicio garantía",
      }),
      required: true,
      type: "date",
      key: "dataIniciGarantia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucion",
        defaultMessage: "Ejecución",
      }),
      type: "date",
      key: "dataExecucio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.recepcionFinal",
        defaultMessage: "Recepción final",
      }),

      type: "date",
      key: "dataRecepcioFinal",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.finalGarantia",
        defaultMessage: "Final garantía",
      }),
      type: "date",
      key: "dataFinalGarantia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  ];

  const configPartes = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.dietas",
        defaultMessage: "Dietas",
      }),
      type: "checkbox",
      key: "dietes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.plusPeligrosidad",
        defaultMessage: "Plus peligrosidad",
      }),
      type: "checkbox",
      key: "plusPerillositat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.controlCostes",
        defaultMessage: "Controlar costes",
      }),
      type: "checkbox",
      key: "controlarCostos",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.exportarMovil",
        defaultMessage: "Exportar a Disp. Moviles",
      }),
      type: "checkbox",
      key: "exportarMobil",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.horasCamino",
        defaultMessage: "Horas camino",
      }),
      type: "input",
      key: "horesCami",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const configAlbaran = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.precioAlbaran",
        defaultMessage: "Precio albarán cliente",
      }),
      type: "select",
      key: "albaransClientPreu",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: PRECIO_ALBARAN_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoProyecto",
        defaultMessage: "Tipo proyecto ",
      }),
      type: "select",
      key: "albaransClientProjecteTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_PROYECTO_ALBARAN_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.crearAlbaranes",
        defaultMessage: "Crear albaranes cliente",
      }),
      type: "checkbox",
      key: "albaransClientCrear",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const configRentenciones = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.clase",
        defaultMessage: "Clase retención",
      }),
      type: "LOV",
      key: "classeRetencio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "classeRetencios",
        labelKey: formatCodeAndDescription,
        sort: "nom",
        advancedSearchColumns: aSCodeAndDescription,
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
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
              md: 6,
            },
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Retenciones.tipoContab",
              defaultMessage: "Tipo contabilización",
            }),
            type: "select",
            key: "tipusComptabilitzacio",
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              options: TIPO_CONTABILIZACION_SELECTOR_VALUES,
            },
            validationType: "string",
            validations: [...props.commonValidations.requiredValidation()],
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tantoPorCientoRetencion",
        defaultMessage: "% de retención",
      }),
      type: "numeric",
      key: "retencioPercent",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.maxValidation(100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoRetencion",
        defaultMessage: "Tipo retención ",
      }),
      type: "select",
      key: "retencioTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_RETENCION2_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.codigoContabilidad",
        defaultMessage: "Código contabilidad",
      }),
      type: "input",
      key: "comptabilitatCodiProjecte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.areaNegocio",
        defaultMessage: "Área negocio",
      }),
      type: "LOV",
      key: "areaNegoci",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "areaNegocis",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        creationComponents: [
          code(6),
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
      },
    },
  ];

  const finalFactura = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.facturaFinal",
        defaultMessage: "Final factura",
      }),
      type: "LOV",
      key: "finalFactura",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      variant: "outlined",
      selector: {
        key: "finalFacturas",
        labelKey: formatCodeAndName,
        sort: "nom",
        creationComponents: codeAndName(),
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"Proyectos.datosCliente"}
          defaultMessage={"Datos Cliente"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={customerData}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(CLIENT_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(CLIENT_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.datosTecnicos"}
          defaultMessage={"Datos Técnicos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={technicalData}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(TECNIC_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(TECNIC_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.fechasProyecto"}
          defaultMessage={"Fechas proyecto"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={projectDates}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(DATES_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(DATES_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.configuracion"}
          defaultMessage={"Configuración"}
        />
      ),
      key: 3,
      component: (
        <>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Proyectos.partesTrabajo"}
                defaultMessage={"Partes trabajo"}
              />
            }
          >
            <GenericForm
              formComponents={configPartes}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(CONFIG_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(CONFIG_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Proyectos.crearAlbaran"}
                defaultMessage={"Crear albaranes"}
              />
            }
          >
            <GenericForm
              formComponents={configAlbaran}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(CONFIG_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(CONFIG_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Proyectos.retencionContab"}
                defaultMessage={"Rentención y Contabilidad"}
              />
            }
          >
            <GenericForm
              formComponents={configRentenciones}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(CONFIG_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(CONFIG_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </>
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.finalFactura"}
          defaultMessage={"Final factura"}
        />
      ),
      key: 4,
      component: (
        <GenericForm
          formComponents={finalFactura}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(CONFIG_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(CONFIG_SECTION_TAB_INDEX)}
          {...props}
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
              id={"Proyectos.datosGenerales"}
              defaultMessage={"Datos Generales"}
            />
          }
        >
          <GenericForm
            formComponents={projectsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(PROJECT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(PROJECT_SECTION_INDEX)}
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
export default compose(React.memo, withValidations, injectIntl)(ProjectDataTab);
