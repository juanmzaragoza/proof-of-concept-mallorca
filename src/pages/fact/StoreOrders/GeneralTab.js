import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { ESTADO_PEDIDO_PROV_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import { Chip } from "@material-ui/core";
import ExpandableGrid from "modules/ExpandableGrid";

const SUPPLIERS_ORDERS_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [SUPPLIERS_ORDERS_SECTION_INDEX]: false,
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

  const { id: pedidoAlmId } = useParams();

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
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 999999999),
      ]),
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
      validations: [...props.stringValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      required: true,
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
      validations: [...props.commonValidations.requiredValidation()],
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
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.cliente",
        defaultMessage: "Cliente",
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
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
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
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.dirComercial",
        defaultMessage: "Dirección comercial",
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
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          {
            title: props.intl.formatMessage({
              id: "Comun.domicilio",
              defaultMessage: "domicilio",
            }),
            name: "domicili",
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.subcliente",
        defaultMessage: "SubClientes",
      }),
      type: "LOV",
      key: "subClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "subClients",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nom" },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "pressupost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) =>
          `${data.serieVenda.pk.codi}/${data.numero}/${data.versio} (${data.codi})`,
        sort: "codi",
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
        id: "PedidosAlmacen.operario",
        defaultMessage: "Operario",
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
        id: "PedidosAlmacen.encargado",
        defaultMessage: "Encargado",
      }),
      type: "LOV",
      key: "operariCodi1",
      id: "operari",
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
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosAlmacen.hojaObra",
        defaultMessage: "hoja Obra",
      }),
      type: "LOV",
      key: "fullObra",
      id: "fullesObra",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "fullObras",
        labelKey: (data) => `${data.num}`,
        sort: "num",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "num" },
          {
            title: props.intl.formatMessage({
              id: "Presupuestos.fecha",
              defaultMessage: "Fecha",
            }),
            name: "data",
          },
        ],
      },
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
        labelKey: (data) =>
          `${data.descripcioAvaria ? data.descripcioAvaria : ""} (${data.num})`,
        sort: "num",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "num" },
          { title: NOM, name: "nom" },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.serieVenta",
        defaultMessage: "Serie Venta",
      }),
      type: "LOV",
      key: "serieVenda",
      id: "serie",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "serieVendas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosAlmacen.avisar",
        defaultMessage: "Avisar",
      }),
      type: "checkbox",
      key: "avisRebut",
      breakpoints: {
        xs: 12,
        md: 2,
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

  const liniasPedidosConfig = {
    title: props.intl.formatMessage({
      id: "PedidosProveedor.tabs.liniasPedido",
      defaultMessage: "Líneas Pedido ",
    }),
    query: [
      {
        columnName: "comandaMagatzem.id",
        value: `"${pedidoAlmId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      comandaMagatzem: { id: `${pedidoAlmId}` },
    },

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "sequencia",
        }),
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) => row.article && row.article?.pk.codi,
      },
      {
        name: "article.descripton",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.descripcionArticulo",
          defaultMessage: "Descripción Artículo",
        }),
        getCellValue: (row) => row.article && row.article?.description,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "unitats",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidades",
          defaultMessage: "Unidades",
        }),
      },
      {
        name: "unitatsMetriques",
        title: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricas",
          defaultMessage: "Unidades Métricas",
        }),
        hidden: true,
      },

      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.numero",
          defaultMessage: "Número ",
        }),
        type: "numeric",
        required: true,
        key: "numero",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999),
          ...props.commonValidations.requiredValidation(),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "numeric",
        key: "sequencia",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        noEditable: true,
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "descripcioCurta" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidades",
          defaultMessage: "Unidades",
        }),
        type: "numeric",
        required: true,
        key: "unitats",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosProveedor.unidadesMetricas",
          defaultMessage: "Unidades Metricas",
        }),
        type: "numeric",
        key: "unitatsMetriques",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Decripción",
        }),
        type: "input",
        required: true,
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 8,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 2000),
        ],
      },

     
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosAlmacen.avisar",
          defaultMessage: "Avisar",
        }),
        type: "checkbox",
        key: "avisRebut",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PedidosAlmacen.pedidoProveedor",
          defaultMessage: "pedido Proveedor",
        }),
        type: "checkbox",
        key: "comandaProveidor",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.titulo",
          defaultMessage: "Presupuesto",
        }),
        type: "LOV",
        key: "pressupost",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "pressuposts",
          labelKey: (data) =>
            `${data.serieVenda.pk.codi}/${data.numero}/${data.versio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          relatedWith: [
            {
              name: "capitol",
              filterBy: "pressupost.id",
              keyValue: "id",
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
          md: 4,
        },
        selector: {
          key: "capitols",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          // relatedWith: [
          //   {
          //     name: "partida",
          //     filterBy: "capitol.id",
          //     keyValue: "id",
          //   },
          // ],
        },
      },

      // {
      //   placeHolder: props.intl.formatMessage({
      //     id: "Proyectos.partida",
      //     defaultMessage: "Partida",
      //   }),
      //   type: "LOV",
      //   key: "partida",
      //   breakpoints: {
      //     xs: 12,
      //     md: 4,
      //   },
      //   selector: {
      //     key: "partidas",
      //     labelKey: (data) => `${data.descripcio} (${data.codi})`,
      //     sort: "descripcio",
      //     cannotCreate: true,
      //   },
      // },

      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"PedidosProveedor.tabs.liniasPedido"}
          defaultMessage={"linias Pedido"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="liniesComandaMagatzem"
          responseKey="liniaComandaMagatzems"
          enabled={props.editMode}
          configuration={liniasPedidosConfig}
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
