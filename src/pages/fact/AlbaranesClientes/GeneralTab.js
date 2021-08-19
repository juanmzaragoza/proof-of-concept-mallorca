import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import {
  FORMA_PAGO_FACT_SELECTOR_VALUES,
  TIPO_DESTINO_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const ALBARANES_SECTION_INDEX = 0;
const FACTURA_SECTION_TAB_INDEX = 3;
const PRESUPUESTO_SECTION_TAB_INDEX = 2;
const OTROS_SECTION_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ALBARANES_SECTION_INDEX]: false,
      [FACTURA_SECTION_TAB_INDEX]: true,
      [PRESUPUESTO_SECTION_TAB_INDEX]: true,
      [OTROS_SECTION_TAB_INDEX]: false,
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

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");


  useEffect(() => {
    const getClient = getString("nomClient");
    const client = getString("client");

    setFormData({
      key: "nomClient",
      value: client?.nomComercial ? client.nomComercial : getClient,
    });
  }, [getFormData("client")]);

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
        ...props.numberValidations.minMaxValidation(1, 999999999),
      ]),
    },
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
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "classe",
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
        id: "AlbaranesCliente.serieVenta",
        defaultMessage: "Serie Venta",
      }),
      type: "LOV",
      key: "serieVenda",
      required: true,
      id: "serieVendas",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "serieVendas",
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
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
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
      validations: [...props.stringValidations.minMaxValidation(0, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.fecha",
        defaultMessage: "Fecha",
      }),
      required: true,
      type: "date",
      key: "data",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes",
      }),
      type: "LOV",
      key: "client",
      required: true,
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
          {
            name: "departamentClients",
            filterBy: "client.id",
            keyValue: "id",
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.nombreCliente",
        defaultMessage: "Nombre Cliente",
      }),
      type: "input",
      key: "nomClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 40)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.nifCliente",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(8, 11)],
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
        id: "AlbaranesCliente.departamento",
        defaultMessage: "Departamento Cliente",
      }),
      type: "LOV",
      key: "departamentClients",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "departamentClients",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
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
      key: "divisaValorEuros",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 999999999999999),
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
        id: "AlbaranesCliente.tarifa",
        defaultMessage: "Tarifa ",
      }),
      type: "LOV",
      key: "tarifaCodi",
      id: "tarifa1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "tarifas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (tarifas) => tarifas && tarifas.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.formaPago",
        defaultMessage: "Formas Pago",
      }),
      type: "select",
      key: "formaPago",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: FORMA_PAGO_FACT_SELECTOR_VALUES,
      },
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.destino",
        defaultMessage: "Destino",
      }),
      type: "select",
      key: "desti",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DESTINO_SELECTOR_VALUES,
      },
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.facturable",
        defaultMessage: "facturable",
      }),
      type: "checkbox",
      key: "facturable",
      breakpoints: {
        xs: 12,
        md: 1,
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

  const factura = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.factura",
        defaultMessage: "Factura ",
      }),
      type: "LOV",
      key: "factura",
      id: "facturas",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "facturas",
        labelKey: (data) =>
          `${data.nombreFactura} / ${data.serieVenda?.description}`,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [{ title: CODE, name: "nombreFactura" }],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Ubicacion.titulo",
        defaultMessage: "Ubicación",
      }),
      type: "LOV",
      key: "ubicacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "ubicacios",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,

        advancedSearchColumns: aSCodeAndDescription,
      },
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
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte2",
      id: "projecte",
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
      key: "operariCmlCodi",
      id: "operari",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (operaris) => operaris && operaris.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.preparado",
        defaultMessage: "Preparado",
      }),
      type: "LOV",
      key: "operariPrpCodi",
      required: true,
      id: "operariCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        cannotCreate:true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
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
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"AlbaranesCliente.otros"}
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
          id={"AlbaranesCliente.facturas"}
          defaultMessage={"Factura"}
        />
      ),
      key: 2,
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
