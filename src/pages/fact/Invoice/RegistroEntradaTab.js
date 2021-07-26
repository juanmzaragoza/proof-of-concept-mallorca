import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {
  TDOC_SELECTOR_VALUES,
  FORMA_PAGO_FACT_SELECTOR_VALUES,
  TIPO_REG_IVA_SELECTOR_VALUES,
  TIPO_RETENCION3_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const INVOICE_SECTION_INDEX = 0;
const RETENTION_SECTION_TAB_INDEX = 1;
const AEAT_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INVOICE_SECTION_INDEX]: false,
      [RETENTION_SECTION_TAB_INDEX]: false,
      [AEAT_SECTION_TAB_INDEX]: false,
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

  const invoiceConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.registroEntrada",
        defaultMessage: "Registro Entrada",
      }),
      type: "date",
      key: "registreEntrada",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.conformacio",
        defaultMessage: "Fecha conformación",
      }),
      type: "date",
      key: "dataConformacioFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.aprovacion",
        defaultMessage: "Fecha aprovación",
      }),
      type: "date",
      key: "dataAprovacioFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.prevista",
        defaultMessage: "Fecha Prevista Cobro",
      }),
      type: "date",
      key: "dataPrevistaFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.previstaAcep",
        defaultMessage: "Fecha Prevista Aceptacion",
      }),
      type: "date",
      key: "dataPrevistaAcceptacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.numRegistro",
        defaultMessage: "Num. Registro Fact.Electrónico",
      }),
      type: "input",
      key: "numRegFacEle",
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

  const addressConfig = [
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
        relatedWith: {
          name: "clientAdresa",
          filterBy: "client.id",
          keyValue: "id",
        },
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.pais_nif",
        defaultMessage: "País NIF",
      }),
      type: "LOV",
      key: "paisNif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "paisNifs",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (pais) => pais && pais.codi,
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
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              options: TDOC_SELECTOR_VALUES,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
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
        md: 3,
      },
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
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
      },
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
  ];

  const contabConfig = [
    {
      type: "input",
      key: "exerciciContable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.ejercicioContable",
        defaultMessage: "Ejercicio Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      type: "input",
      key: "diariContable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.diarioContable",
        defaultMessage: "Diario Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      type: "input",
      key: "asientoComptable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.asientoContable",
        defaultMessage: "Asiento Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 11)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.regimen.iva",
        defaultMessage: "Régimen IVA",
      }),
      type: "LOV",
      required: true,
      key: "regimIva",
      breakpoints: {
        xs: 12,
        md: 4,
      },

      selector: {
        key: "regimIvas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        advancedSearchColumns: aSCodeAndDescription,
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            breakpoints: {
              xs: 12,
              md: 2,
            },
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 2),
            ]),
          },
          {
            type: "input",
            key: "descripcio",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 30),
            ]),
          },
          {
            type: "input",
            key: "codiComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.codigo.contabilidad",
              defaultMessage: "Código contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "number",
            validations: [...props.stringValidations.minMaxValidation(1, 2)],
          },

          {
            placeHolder: props.intl.formatMessage({
              id: "Clientes.tipo",
              defaultMessage: "Tipo",
            }),
            type: "select",
            key: "tip",
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            selector: {
              options: TIPO_REG_IVA_SELECTOR_VALUES,
            },

            validationType: "string",
            ...withRequiredValidation(),
          },
          {
            type: "input",
            key: "codiFacturaElectronica",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.codigo.facturaElectronica",
              defaultMessage: "Código factura electrónica",
            }),

            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "number",
            validations: [...props.stringValidations.minMaxValidation(1, 4)],
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.re.expedida",
              defaultMessage: "Régimen especial fact expedida",
            }),
            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 2)],
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.re.recibida",
              defaultMessage: "Régimen especial fact recibida",
            }),
            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 2)],
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
  ];

  const pressupConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.codigoPresupuesto",
        defaultMessage: "Código Presupuesto",
      }),
      type: "LOV",
      key: "pressupostCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) => `(${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (pressuposts) => pressuposts && pressuposts.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto ",
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
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.certificaciones",
        defaultMessage: "Certificaciones ",
      }),
      type: "LOV",
      key: "certificacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "certificacios",
        labelKey: (data) => `(${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage id={"Facturas.cliente"} defaultMessage={"Cliente"} />
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
            addValidity(RETENTION_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(RETENTION_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.contabilidad"}
          defaultMessage={"Contabilidad"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={contabConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(AEAT_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(AEAT_SECTION_TAB_INDEX)}
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
              id={"Facturas.titulo"}
              defaultMessage={"Facturas"}
            />
          }
        >
          <GenericForm
            formComponents={invoiceConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(INVOICE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(INVOICE_SECTION_INDEX)}
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
