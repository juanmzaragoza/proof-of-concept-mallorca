import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {
  ESTADO_PRESUPUESTO_SELECTOR_VALUES,
  TIPO_CONTABILIZACION_SELECTOR_VALUES,
  TIPO_RETENCION_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";


import { useTabForm } from "hooks/tab-form";

const BUDGET_SECTION_INDEX = 0;
const OTROS_CONFIG_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [BUDGET_SECTION_INDEX]: false,
      [OTROS_CONFIG_TAB_INDEX]: false,
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

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

  useEffect(() => {
    const getClient = getString("nomClient");
    const client = getString("client");

    setFormData({
      key: "nomClient",
      value: client?.nomComercial ? client.nomComercial : getClient,
    });
  }, [getFormData("client")]);

  const suppliersConfig = [
    {
      placeHolder: CODE,
      type: "numeric",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.numero",
        defaultMessage: "Numero",
      }),
      type: "numeric",
      key: "numero",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.version",
        defaultMessage: "Versión",
      }),
      type: "numeric",
      required: true,
      key: "versio",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.clase",
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
        id: "Proyectos.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fecha",
        defaultMessage: "Fecha",
      }),
      type: "date",
      key: "data",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.estado",
        defaultMessage: "Estado",
      }),
      type: "select",
      key: "estat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: ESTADO_PRESUPUESTO_SELECTOR_VALUES,
      },
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
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.nombreCliente",
        defaultMessage: "Nombre cliente",
      }),
      type: "input",
      key: "nomClient",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        // ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.dirEnvio",
        defaultMessage: "Dirección envio",
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
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
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
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            name: "nom",
          },
        ],
      },
    },
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
        md: 3,
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
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Presupuestos.idioma",
    //     defaultMessage: "Idioma",
    //   }),
    //   type: "LOV",
    //   key: "idioma",
    //   breakpoints: {
    //     xs: 12,
    //     md: 3,
    //   },
    //   selector: {
    //     key: "idiomas",
    //     labelKey: formatCodeAndDescription,
    //     sort: "descripcio",
    //     cannotCreate: true,
    //     advancedSearchColumns: aSCodeAndDescription,
    //   },
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.serieVenta",
        defaultMessage: "Serie Venta",
      }),
      type: "LOV",
      key: "serieVenda",
      id: "serieVendas",
      required: true,
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
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
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
        id: "Presupuestos.valorDivisa",
        defaultMessage: "Valor divisa euros",
      }),
      type: "numeric",
      key: "valorDivisaEuros",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.tarifa",
        defaultMessage: "Tarifa ",
      }),
      type: "LOV",
      key: "tarifa",
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
        id: "Presupuestos.fechaCaducidad",
        defaultMessage: "Fecha Caducidad",
      }),
      type: "date",
      key: "diaCaducitat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fechaCierre",
        defaultMessage: "Fecha Cierre",
      }),
      type: "date",
      key: "diaTancament",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fechaAceptacion",
        defaultMessage: "Fecha Aceptación",
      }),
      type: "date",
      key: "diaAcceptacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fechaInicio",
        defaultMessage: "Fecha Inicio",
      }),
      type: "date",
      key: "diaIni",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.fechaFin",
        defaultMessage: "Fecha Fin",
      }),
      type: "date",
      key: "diaFi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.presentado",
        defaultMessage: "Presentado cliente",
      }),
      type: "checkbox",
      key: "presentatClient",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Presupuestos.certOrigen",
    //     defaultMessage: "Certificado origen",
    //   }),
    //   type: "checkbox",
    //   key: "certificacioOrigen",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },

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

  const otrosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.operario",
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
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (operaris) => operaris && operaris.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
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
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.horaEntrega",
        defaultMessage: "Hora Entrega",
      }),
      type: "input",
      key: "horaEntrega",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 50)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.desgloseCap",
        defaultMessage: "desglose en cap.",
      }),
      type: "checkbox",
      key: "desglose",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.seguimiento",
        defaultMessage: "Seguimento Recepción Material",
      }),
      type: "checkbox",
      key: "seguimentRecepcioMaterial",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.mesesGarantia",
        defaultMessage: "Meses Garantía ",
      }),
      type: "numeric",
      key: "mesGar",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.descuento1",
        defaultMessage: "Descuento 1 ",
      }),
      type: "numeric",
      key: "dte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.descuento2",
        defaultMessage: "Descuento 2 ",
      }),
      type: "numeric",
      key: "dte2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
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
      key: "pteRetencio",
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
      key: "tipusRetencio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_RETENCION_SELECTOR_VALUES,
      },
    },
  ];

  const tabs = [
    {
      label: (
        <FormattedMessage id={"Presupuestos.otros"} defaultMessage={"Otros"} />
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
          handleIsValid={(value) => addValidity(OTROS_CONFIG_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(OTROS_CONFIG_TAB_INDEX)}
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
              id={"Presupuestos.titulo"}
              defaultMessage={"Presupuestos"}
            />
          }
        >
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
            handleIsValid={(value) => addValidity(BUDGET_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(BUDGET_SECTION_INDEX)}
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
