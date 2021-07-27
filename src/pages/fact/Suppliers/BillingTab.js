import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "../../../modules/shared/ConfigurableTabs";
import { PORTES_SELECTOR_VALUES } from "../../../constants/selectors";
import ExpandableGrid from "modules/ExpandableGrid";
import { useParams } from "react-router-dom";

const BILLING_DATA_SECTION_INDEX = 0;
const ORDERS_SECTION_TAB_INDEX = 1;
const VARIOUS_SECTION_TAB_INDEX = 2;

const BillingTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [BILLING_DATA_SECTION_INDEX]: false,
      [ORDERS_SECTION_TAB_INDEX]: false,
      [VARIOUS_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

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

  const dataConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "nom",
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
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "LOV",
      key: "tipusVenciment",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "tipusVenciments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
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
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.docpago",
        defaultMessage: "Documento de Pago",
      }),
      type: "LOV",
      key: "documentPagamentCobrament",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
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
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.periodo",
        defaultMessage: "Período de Facturación",
      }),
      type: "numeric",
      key: "periodeFacturacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: props.numberValidations.maxValidation(999),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.importe_servicio",
        defaultMessage: "Importe de Servicio",
      }),
      type: "numeric",
      key: "importServeiProveidor",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: props.numberValidations.minMaxValidation(0, 99999999999.99),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.descuento1",
        defaultMessage: "Descuento 1",
      }),
      type: "numeric",
      key: "descompteHabitual",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.maxValidation(100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.descuento2",
        defaultMessage: "Descuento 2",
      }),
      type: "numeric",
      key: "descomptePagamentRapid",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.maxValidation(100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.descuento_factura1",
        defaultMessage: "Descuento Factura 1",
      }),
      type: "numeric",
      key: "descompteFactura1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.maxValidation(100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.descuento_factura2",
        defaultMessage: "Descuento Factura 2",
      }),
      type: "numeric",
      key: "descompteFactura2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.maxValidation(100)],
    },
  ];

  const ordersConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.rappel",
        defaultMessage: "Rappel",
      }),
      type: "LOV",
      key: "rappel",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "rappels",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
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
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.pedido_minimo",
        defaultMessage: "Pedido Mínimo",
      }),
      type: "numeric",
      key: "comandaMinimaDivisa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: props.numberValidations.maxValidation(99999999999.99),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.plazo_entrega",
        defaultMessage: "Plazo de Entrega",
      }),
      type: "input",
      key: "terminiEntrega",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.plazo_entrega",
        defaultMessage: "Plazo de Entrega",
      }),
      type: "observations",
      key: "observacionsCom",
      required: false,
      breakpoints: {
        xs: 12,
        md: 2,
      },
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
        md: 4,
      },
      selector: {
        key: "transportistas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
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
        id: "Proveedores.Facturacion.portes",
        defaultMessage: "Portes",
      }),
      type: "select",
      key: "ports",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: PORTES_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.cod_client",
        defaultMessage: "Cod. Cliente",
      }),
      type: "input",
      key: "codiClientQueTenimPelProveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.pedidos_automaticos",
        defaultMessage: "Pedidos automáticos",
      }),
      type: "checkbox",
      key: "comandesAutomatiques",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const variosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.vacaciones",
        defaultMessage: "Vacaciones",
      }),
      type: "input",
      key: "periodeVacances",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.horario",
        defaultMessage: "Horario",
      }),
      type: "input",
      key: "horariAtencio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const expirationTypeConfig = {
    title: props.intl.formatMessage({
      id: "Proveedores.tvencimiento",
      defaultMessage: "Tipos Vencimiento",
    }),
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      {
        name: "tipusVenciment",
        title: props.intl.formatMessage({
          id: "Proveedores.tvencimiento",
          defaultMessage: "Tipo Venicimiento",
        }),
        getCellValue: (row) => row.tipusVenciment?.description ?? "",
      },
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        getCellValue: (row) => row.empresa?.description ?? "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.tvencimiento",
          defaultMessage: "Tipos Venicimiento",
        }),
        type: "LOV",
        key: "tipusVenciment",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "tipusVenciments",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Empresas.titulo",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "nomFiscal" },
          ],
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proveedores.Facturacion.pedidos"}
          defaultMessage={"Pedidos"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={ordersConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ORDERS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(ORDERS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proveedores.tvencimiento"}
          defaultMessage={"Tipos de Vencimiento"}
        />
      ),
      key: 1,
      component: (
        <ExpandableGrid
          id="proveidorsVencimentEmpresa"
          responseKey="proveidorVencimentEmpresas"
          enabled={props.editMode}
          configuration={expirationTypeConfig}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proveedores.Facturacion.varios"}
          defaultMessage={"Varios"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={variosConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(VARIOUS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(VARIOUS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.Facturacion.titulo"}
              defaultMessage={"Datos de Facturación"}
            />
          }
        >
          <GenericForm
            formComponents={dataConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(BILLING_DATA_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(BILLING_DATA_SECTION_INDEX)}
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

export default compose(injectIntl, withValidations)(BillingTab);
