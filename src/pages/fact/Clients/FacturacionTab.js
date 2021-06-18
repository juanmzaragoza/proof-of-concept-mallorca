import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import "../Suppliers/styles.scss";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import {
  TIPO_FACTURA_SELECTOR_VALUES,
  TIPO_ENVIO_FACT_SELECTOR_VALUES,
  TIPO_RECIBOS_SELECTOR_VALUES,
  ALBARAN_CLIENT_SELECTOR_VALUES,
  TIPO_DESCUENTO_SELECTOR_VALUES,
} from "constants/selectors";

import { useTabForm } from "../../../hooks/tab-form";

const EMPRESA_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;
const DESCUENTOS_SECTION_TAB_INDEX = 2;
const FACT2_SECTION_TAB_INDEX = 3;

const FacturacionTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});
  const DOMICILI = props.intl.formatMessage({id: "Proveedores.Direccion.domicilio", defaultMessage: "Domicilio"});


  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];
  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];

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
      placeHolder: "NOM",
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

  const facturacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.empresaCodigo",
        defaultMessage: "código empresa",
      }),
      type: "input",
      key: "empresaCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tarifa1",
        defaultMessage: "Tarifa 1",
      }),
      type: "LOV",
      key: "tarifa1",
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
        md: 2,
      },
      selector: {
        key: "tarifas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.serie",
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
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
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
        id: "Clientes.fact.tipoFactura",
        defaultMessage: "Tipo factura",
      }),
      type: "select",
      key: "tipusFactura",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_FACTURA_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.envioFactura",
        defaultMessage: "Envio de factura",
      }),
      type: "select",
      key: "enviamentFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_ENVIO_FACT_SELECTOR_VALUES,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.recibos",
        defaultMessage: "Recibos",
      }),
      type: "select",
      key: "rebuts",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_RECIBOS_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoFact",
        defaultMessage: "Tipo Facturación",
      }),
      type: "LOV",
      key: "tipusFacturacio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusFacturacios",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
        
      },
      validationType: "object",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.docCobro",
        defaultMessage: "Documento cobro",
      }),
      type: "LOV",
      key: "documentPagament",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        advancedSearchColumns: aSCodeAndDescription,
        creationComponents: [...codeAndDescription(6, 6)],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoVencimiento",
        defaultMessage: "Código tipo vencimiento",
      }),
      type: "input",
      key: "tipusVencimentCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 4),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoVencimiento1",
        defaultMessage: "Código tipo vencimiento 1",
      }),
      type: "input",
      key: "tipusVenciment1Codi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.paletsDevueltos",
        defaultMessage: "No imprimir palets devueltos",
      }),
      type: "checkbox",
      key: "noImprimirPaletsRetornats",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.publicaDocumentos",
        defaultMessage: "Publicar domumentos en la web",
      }),
      type: "checkbox",
      key: "publicarDocumentsWeb",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.facturas_sinDescuento",
        defaultMessage: "Imprimir facturas sin descuento",
      }),
      type: "checkbox",
      key: "facturesSenseDescompte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.numCopias",
        defaultMessage: "Num copias a imprimir",
      }),
      type: "input",
      key: "copiesFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.emailEnvio",
        defaultMessage: "Email envio factura",
      }),
      type: "input",
      key: "emailFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 4)],
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
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: [{title: CODE, name: 'codi'},{title: DOMICILI, name: 'domicili'}],
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
        creationComponents: [...codeAndName(6, 6)],
        advancedSearchColumns: aSCodeAndName,
      },

    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacionsFactura",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const albaranConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.alabaran.cliente",
        defaultMessage: "albarán cliente-subtipo",
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
        id: "Clientes.fact.emailAlb",
        defaultMessage: "Email envio albarán",
      }),
      type: "input",
      key: "emailEnviamentAlbarans",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.albaran_valorado",
        defaultMessage: "Albarán valorado",
      }),
      type: "checkbox",
      key: "albaraValorat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const descuentosConfig = [
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
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.descFinal",
        defaultMessage: "Descuento final factura al contado",
      }),
      type: "input",
      key: "descompteFinalFacturesComptatClase1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.descTerminio",
        defaultMessage: "Descuento final factura en terminio",
      }),
      type: "input",
      key: "descompteFinalFacturesTerminiClase1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tarifaDescuento",
        defaultMessage: "Tarifa descuento",
      }),
      type: "LOV",
      key: "tarifaDescompte2",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tarifaDescomptes",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },

    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.descFinal2",
        defaultMessage: "Descuento final factura al contado",
      }),
      type: "input",
      key: "descompteComptats",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.descTerminio2",
        defaultMessage: "Descuento final factura en terminio",
      }),
      type: "input",
      key: "descompteTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.aplicarPrecios",
        defaultMessage: "Aplicar precios por volumen",
      }),
      type: "checkbox",
      key: "aplicarPreusPerVolum",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const fact2Config = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.rappel",
        defaultMessage: "Rappel",
      }),
      type: "LOV",
      key: "rappel",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "rappels",
        labelKey: (data) => `${data.descripcio}`,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.transportista",
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
        labelKey: (data) => `${data.nom}`,
        sort: "nom",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndName
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.riesgoMax",
        defaultMessage: "Riesgo máximo",
      }),
      type: "input",
      key: "riscMaxim",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.riesgoLimite",
        defaultMessage: "Riesgo Límite",
      }),
      type: "input",
      key: "riscLimit",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.cantidadMin",
        defaultMessage: "Cantidad mínima a facturar",
      }),
      type: "input",
      key: "facturacioMinima",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.impuestoVerde",
        defaultMessage: "Aplicar impuesto punto verde",
      }),
      type: "checkbox",
      key: "aplicarImpostPuntVerd",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.impuestoServicio",
          defaultMessage: "Aplicar impuesto de servicio",
        }),
        type: "checkbox",
        key: "aplicarImpostServei",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.impuestoIncluido",
          defaultMessage: "Impuesto incluido",
        }),
        type: "checkbox",
        key: "impostInclos",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id:  "Clientes.fact.controlOperario",
          defaultMessage: "Control operario",
        }),
        type: "checkbox",
        key: "permesEntrarPartes",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id:  "Clientes.fact.cobrarDias",
          defaultMessage: "Cobrar dias alquiler",
        }),
        type: "checkbox",
        key: "cobrarDiesLloguer",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id:  "Clientes.fact.facturaE",
          defaultMessage: "Factura Electrónica",
        }),
        type: "checkbox",
        key: "facturaElectronica",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.referenciaMandato",
          defaultMessage: "Referencia única mandato",
        }),
        type: "input",
        key: "referenciaUnicaMandat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.referenciaMandato",
          defaultMessage: "Referencia única mandato",
        }),
        type: "date",
        key: "dataFirmaMandat",
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
        <FormattedMessage id={"Clientes.albaran"} defaultMessage={"Albarán"} />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={albaranConfig}
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
          id={"Clientes.descuentos"}
          defaultMessage={"Descuentos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={descuentosConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(DESCUENTOS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(DESCUENTOS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.facturacion2"}
          defaultMessage={"Facturación 2"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={fact2Config}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(FACT2_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(FACT2_SECTION_TAB_INDEX)}
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
              id={"Proveedores.tabs.facturacion"}
              defaultMessage={"Facturación"}
            />
          }
        >
          <GenericForm
            formComponents={facturacionConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(EMPRESA_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(EMPRESA_SECTION_INDEX)}
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
export default compose(React.memo, withValidations, injectIntl)(FacturacionTab);
