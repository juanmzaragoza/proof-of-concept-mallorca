import React from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import {
  TIPO_ALBARAN_SELECTOR_VALUES,
  TIPO_DOC_ALBARAN_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const ALBARANES_SECTION_INDEX = 0;
const FACTURA_SECTION_TAB_INDEX = 1;
const PRESUPUESTO_SECTION_TAB_INDEX = 2;
const OTROS_SECTION_TAB_INDEX = 3;
const TOTAL_SECTION_TAB_INDEX = 4;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ALBARANES_SECTION_INDEX]: false,
      [PRESUPUESTO_SECTION_TAB_INDEX]: true,
      [FACTURA_SECTION_TAB_INDEX]: true,
      [OTROS_SECTION_TAB_INDEX]: false,
      [TOTAL_SECTION_TAB_INDEX]: true,
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
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
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
      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        transform: {
          apply: (codiPostals) => codiPostals && codiPostals.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
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
              relatedWith: [{
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },],
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

  const suppliersConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.numeroDoc",
        defaultMessage: "Número Documento ",
      }),
      type: "numeric",
      key: "numeroDocument",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 9999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.numero",
        defaultMessage: "Número ",
      }),
      type: "input",
      key: "numero",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 60),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "cls",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 1),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 6)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.fecha",
        defaultMessage: "Fecha",
      }),
      required: true,
      type: "date",
      key: "dia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.fechaDoc",
        defaultMessage: "Fecha documento",
      }),

      type: "date",
      key: "dataDocument",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.proveedor",
        defaultMessage: "Proveedor",
      }),
      type: "LOV",
      required: true,
      key: "proveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "proveidors",
        labelKey: (data) => `${data.descCodiNom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        relatedWith: [
          {
            name: "adresaComercials",
            filterBy: "proveidor.id",
            keyValue: "id",
          },
          {
            name: "tarifaProveidor",
            filterBy: "proveidor.id",
            keyValue: "id",
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation([]),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.direccionComercial",
        defaultMessage: "Dirección Comercial",
      }),
      type: "LOV",
      key: "adresaComercial",
      id: "adresaComercials",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "adresaComercials",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "codi",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
      },
    },
   
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.serieCompra",
        defaultMessage: "Serie Compra",
      }),
      type: "LOV",
      key: "serieCompra",
      id: "serieCompras",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "serieCompras",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [
          {
            title: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }),
            name: "codi",
          },
          {
            title: props.intl.formatMessage({
              id: "Comun.descripcion",
              defaultMessage: "Descripción",
            }),
            name: "descripcio",
          },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.divisa",
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
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Cajas.valorDivisa",
        defaultMessage: "Valor Divisa",
      }),
      type: "numeric",
      required: true,
      suffix: "€",
      key: "valorDivisaEuros",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9999999),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id: "ivaFact",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "ivas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.tipo",
        defaultMessage: "Tipo",
      }),
      type: "select",
      key: "tipus",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_ALBARAN_SELECTOR_VALUES,
      },
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.tipoDoc",
        defaultMessage: "Tipo Documento",
      }),
      type: "select",
      key: "tipusDocument",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DOC_ALBARAN_SELECTOR_VALUES,
      },
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const factura = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.periodo",
        defaultMessage: "Período",
      }),
      type: "LOV",
      key: "magatzemPeriode",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzemPeriodes",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.bultos",
        defaultMessage: "bultos",
      }),
      type: "numeric",
      key: "bultos",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.kilos",
        defaultMessage: "Kilos",
      }),
      type: "numeric",
      key: "kilos",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999)],
    },
  ];

  const presupuestoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "pressupostCodi",
      id: "pressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) => `${data.client.description} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        transform: {
          apply: (pressuposts) => pressuposts && pressuposts.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        relatedWith: [
          {
            name: "capitol",
            filterBy: "pressupostCodi",
            keyValue: "codi",
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.capitulos",
        defaultMessage: "Capítulos",
      }),
      type: "LOV",
      key: "capitol",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "capitols",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "nom",
        cannotCreate: true,
        relatedWith: [
          {
            name: "partida",
            filterBy: "capitol.id",
            keyValue: "id",
          },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.partida",
        defaultMessage: "Partida",
      }),
      type: "LOV",
      key: "partida",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "partidas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        cannotCreate: true,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.delegacion",
        defaultMessage: "Delegación",
      }),
      type: "LOV",
      key: "delegacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "delegacios",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          {
            title: NOM,
            name: "nom",
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.tarifa",
        defaultMessage: "Tarifa ",
      }),
      type: "LOV",
      key: "tarifaProveidor",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tarifaProveidors",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.pedido",
        defaultMessage: "Pedido",
      }),
      type: "LOV",
      key: "comandaProveidor",
      id: "comandesProveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "comandaProveidors",
        labelKey: (data) =>
          `${data.serieCompra ? data.serieCompra?.pk.codi + "/" : ""} ${
            data.numero
          }`,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.factura",
        defaultMessage: "Factura ",
      }),
      type: "LOV",
      key: "facturaProveidor",
      id: "facturesProveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "facturaProveidors",
        labelKey: (data) => `${data.numero} `,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [{ title: CODE, name: "nombreFactura" }],
      },
    },
  ];

  const otrosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.comercial",
        defaultMessage: "Comercial",
      }),
      type: "LOV",
      key: "operariCodi",
      required: true,
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
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      //   validationType: "string",
      //   validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.transportista",
        defaultMessage: "Transportista",
      }),
      type: "LOV",
      key: "transportista",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "transportistas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
        relatedWith: [
          {
            name: "vehicles",
            filterBy: "transportista.id",
            keyValue: "id",
          },
        ],
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
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.numExpedicion",
        defaultMessage: "Num Expedición",
      }),
      type: "input",
      key: "expedicioNum",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.mantenerCoste",
        defaultMessage: "Mantener Coste",
      }),
      type: "switch",
      key: "mntcos",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const totales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.importeBruto",
        defaultMessage: "Importe Bruto ",
      }),
      type: "input",
      key: "importBrut",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.totalIva",
        defaultMessage: "Total Iva ",
      }),
      type: "input",
      key: "totalIva",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.totalAlb",
        defaultMessage: "Total Albarán ",
      }),
      type: "input",
      key: "totalAlbara",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.conformado",
        defaultMessage: "Conformado ",
      }),
      type: "switch",
      key: "conformat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"AlbaranesProveedor.almacen"}
          defaultMessage={"Almacén"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={factura}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(FACTURA_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(FACTURA_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },

    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"AlbaranesCliente.presupuestos"}
          defaultMessage={"Presupuestos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={presupuestoConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(PRESUPUESTO_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(PRESUPUESTO_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },

    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"AlbaranesCliente.otros"}
          defaultMessage={"Otros"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={otrosConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(OTROS_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(OTROS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"AlbaranesProveedor.totalesAlb"}
          defaultMessage={"Albarán"}
        />
      ),
      key: 3,
      component: (
        <GenericForm
          formComponents={totales}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(TOTAL_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(TOTAL_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={suppliersConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(ALBARANES_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(ALBARANES_SECTION_INDEX)}
          {...props}
        />
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
