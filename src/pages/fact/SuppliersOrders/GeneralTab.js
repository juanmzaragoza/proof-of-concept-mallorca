import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import {
  ESTADO_PEDIDO_PROV_SELECTOR_VALUES,
  PORTES_PEDIDO_SELECTOR_VALUES,
  TIPO_TRANSPORTE_SELECTOR_VALUES
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const SUPPLIERS_ORDERS_SECTION_INDEX = 0;
const PRESSUPUESTO_SECTION_INDEX = 2;
const OTROS_SECTION_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [SUPPLIERS_ORDERS_SECTION_INDEX]: false,
      [OTROS_SECTION_INDEX]: false,
      [PRESSUPUESTO_SECTION_INDEX]: true,
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

  const datosGenerales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.numero",
        defaultMessage: "Número ",
      }),
      type: "numeric",
      key: "numero",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.serieCompra",
        defaultMessage: "Serie compra",
      }),
      type: "LOV",
      key: "serieCompra",

      breakpoints: {
        xs: 12,
        md: 4,
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
        id: "PedidosProveedor.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 20)],
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
        relatedWith: {
          name: "adresaComercials",
          filterBy: "proveidor.id",
          keyValue: "id",
        },
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
        relatedWith: {
          name: "tarifaProveidor",
          filterBy: "proveidor.id",
          keyValue: "proveidor.id",
        },
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
      suffix: "€",
      required:true,
      key: "valorDivisaEuros",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 999999999999999),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tarifaProv",
        defaultMessage: "Tarifa Proveedor ",
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
        md: 2,
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
        id: "PedidosProveedor.descuento1",
        defaultMessage: "Descuento 1",
      }),
      type: "numeric",
      key: "percentatgeDescompte1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.descuento2",
        defaultMessage: "Descuento 2",
      }),
      type: "numeric",
      key: "percentatgeDescompte2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
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
        relatedWith: {
          name: "vehicles",
          filterBy: "transportista.id",
          keyValue: "id",
        },
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
        id: "PedidosProveedor.vehiculo",
        defaultMessage: "Vehículo",
      }),
      type: "LOV",
      key: "vehicle",
      id: "vehicles",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "vehicles",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.estado",
        defaultMessage: "Estado",
      }),
      type: "select",
      key: "estat",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: ESTADO_PEDIDO_PROV_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.portes",
        defaultMessage: "Portes",
      }),
      type: "select",
      key: "portes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: PORTES_PEDIDO_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedores.tipoTransporte",
        defaultMessage: "Tipo transporte",
      }),
      type: "select",
      key: "tipusTransport",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_TRANSPORTE_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "LOV",
      key: "tveCodi",
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
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "tipus",
            placeHolder: props.intl.formatMessage({
              id: "TiposVencimiento.tipos",
              defaultMessage: "Tipos",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (tipusVenciments) => tipusVenciments && tipusVenciments.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.docCobro",
        defaultMessage: "Documento cobro",
      }),
      type: "LOV",
      key: "documentPagamentCodi",
      id: "documentPagamentCobrament",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        advancedSearchColumns: aSCodeAndDescription,
        cannotCreate: true,
        transform: {
          apply: (documentPagamentCobraments) =>
            documentPagamentCobraments && documentPagamentCobraments.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },

    
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.diaRecepcion",
        defaultMessage: "Fecha Recepció",
      }),
      type: "date",
      key: "diaPrevistEntrega",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.horaPrevista",
        defaultMessage: "Hora Prevista Recepción",
      }),
      type: "input",
      key: "horaPrevistaRecepcio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.horaRececpción",
        defaultMessage: "Hora Recepción",
      }),
      type: "input",
      key: "horaRebut",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.piePedido",
        defaultMessage: "Pie Pedido",
      }),
      type: "LOV",
      key: "observacionsPeuComanda",
      id: "peusDocument",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "peuDocuments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (peuDocuments) => peuDocuments && peuDocuments.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
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

  const presupostConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "preCodi",
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
        relatedWith: {
          name: "capitol",
          filterBy: "pressupostCodi",
          keyValue: "codi",
        },
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
        relatedWith: {
          name: "partida",
          filterBy: "capitol.id",
          keyValue: "id",
        },
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
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.averias",
        defaultMessage: "Averias",
      }),
      type: "LOV",
      key: "avaria",
      id: "avaries",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "avarias",
        labelKey: (data) => `${data.nom} (${data.num})`,
        sort: "num",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "num" },
          { title: NOM, name: "nom" },
        ],
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.tipoIncidenciaFactura",
        defaultMessage: "Tipo Incidencia Factura",
      }),
      type: "LOV",
      key: "tipusIncidenciaFactura",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusIncidenciaFacturas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
        advancedSearchColumns: aSCodeAndName,
        cannotCreate: true,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.mantenerCoste",
        defaultMessage: "Mantener Coste",
      }),
      type: "checkbox",
      key: "mantenirCostsArticle",
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
          id={"PedidosProveedor.tabs.otros"}
          defaultMessage={"Otros"}
        />
      ),
      key: 0,
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
          handleIsValid={(value) => addValidity(OTROS_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(OTROS_SECTION_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"PedidosProveedor.tabs.presupuestos"}
          defaultMessage={"Presupuestos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={presupostConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(PRESSUPUESTO_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(PRESSUPUESTO_SECTION_INDEX)}
          {...props}
        />
      ),
    },
   
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={datosGenerales}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(SUPPLIERS_ORDERS_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(SUPPLIERS_ORDERS_SECTION_INDEX)}
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
