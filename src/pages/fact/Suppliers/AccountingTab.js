import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_REG_IVA_SELECTOR_VALUES,
  TIPO_RETENCION_SELECTOR_VALUES,
} from "constants/selectors";

import { useTabForm } from "hooks/tab-form";

const ACCOUNT_NUMBER_INDEX = 0;
const IBAN_INDEX = 1;
const ACCOUNTING_DATA_INDEX = 2;
const ACCOUNTING_ACCOUNTS_INDEX = 3;

const AccountingTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ACCOUNT_NUMBER_INDEX]: false,
      [IBAN_INDEX]: false,
      [ACCOUNTING_DATA_INDEX]: false,
      [ACCOUNTING_ACCOUNTS_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const { id: supplierId } = useParams();

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
  const CONTACTO = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBV = props.intl.formatMessage({
    id: "Clientes.observaciones",
    defaultMessage: "Observaciones",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
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

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const contabilidadConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.banco",
        defaultMessage: "Banco",
      }),
      type: "LOV",
      key: "bancCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        relatedWith: [{
          name: "oficinaBancariaCodi",
          filterBy: "banc.id",
          keyValue: "id",
        },],
        transform: {
          apply: (bancs) => bancs && bancs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.Contab.oficines",
        defaultMessage: "Oficina Bancaria",
      }),
      type: "LOV",
      key: "oficinaBancariaCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "oficinaBancarias",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "domicili",
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
        transform: {
          apply: (oficinaBancarias) =>
            oficinaBancarias && oficinaBancarias.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
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
          },
          {
            type: "input",
            key: "domicili",
            placeHolder: DOMICILI,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          ...codiPostal(4),

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
            placeHolder: CONTACTO,
            type: "input",
            key: "contacto",
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            placeHolder: OBV,
            type: "input",
            key: "observacions",
            breakpoints: {
              xs: 12,
              md: 12,
            },
            text: {
              multiline: 4,
            },
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.controlDigitos",
        defaultMessage: "Control Digitos",
      }),
      type: "input",
      key: "digitsControls",

      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta",
        defaultMessage: "Cuenta",
      }),
      type: "input",
      key: "contaCorrent",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
  ];

  const ibanConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.paisIban",
        defaultMessage: "Pais Iban",
      }),
      type: "input",
      key: "codiPais",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.digitosIban",
        defaultMessage: "Digitos Iban",
      }),
      type: "input",
      key: "digitsControlsIban",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.numeroCuentaNacional",
        defaultMessage: "Num Cuenta Nacional",
      }),
      type: "input",
      key: "numeroContaNacional",

      breakpoints: {
        xs: 12,
        md: 5,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.bicIban",
        defaultMessage: "Bic Iban",
      }),
      type: "input",
      key: "bankIdentificationCode",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },
  ];

  const datosContablesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id: "ives",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      selector: {
        key: "ivas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
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
              ...props.stringValidations.minMaxValidation(1, 4),
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
            type: "numeric",
            key: "percentatgeIva",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.porcentaje.iva",
              defaultMessage: "Porcentaje IVA",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "number",
            ...withRequiredValidation([
              ...props.numberValidations.minMaxValidation(0, 99),
            ]),
          },
          {
            type: "numeric",
            key: "percentatgeRecarrecEquivalencia",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.porcentaje.recargo",
              defaultMessage: "Porcentaje Recargo",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "number",
            ...withRequiredValidation([
              ...props.numberValidations.minMaxValidation(0, 99),
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
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 4),
            ]),
          },
          {
            type: "input",
            key: "codiRecarrecComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.codigo.recargo",
              defaultMessage: "Código recargo",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 4),
            ]),
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.texto",
              defaultMessage: "Texto",
            }),
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 12)],
          },
          {
            type: "checkbox",
            key: "notCreApu",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.notCreApu",
              defaultMessage: "No crear apunte sin importe 0",
            }),
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
        ],
      },
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
            validationType: "string",
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
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 4)],
          },
          {
            type: "input",
            key: "sitCodClaExd",
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
            key: "sitCodClaReb",
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
    {
      type: "checkbox",
      key: "regimCaixa",
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.regimenCaja",
        defaultMessage: "Régimen criterio caja",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.retenciones",
        defaultMessage: "Retenciones",
      }),
      type: "LOV",
      key: "classeRetencio",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      selector: {
        key: "classeRetencios",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipoRetención",
        defaultMessage: "Tipo retención",
      }),
      type: "select",
      key: "tipusRetencio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        options: TIPO_RETENCION_SELECTOR_VALUES,
      },
    },
    {
      type: "numeric",
      key: "percentatgeRetencio",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.porcentaje.retencion",
        defaultMessage: "Porcentaje retención",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
    },
  ];

  const cuentasConfig = [
    {
      type: "input",
      key: "contaComptable",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.contable",
        defaultMessage: "Cuenta Contable",
      }),
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
    {
      type: "input",
      key: "contaCompres",
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.cuenta.compra",
        defaultMessage: "Cuenta Compras",
      }),
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
  ];

  const cuentasContables = {
    title: props.intl.formatMessage({
      id: "Clientes.cuentasContables",
      defaultMessage: "Cuentas contables",
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
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        getCellValue: (row) => row.empresa?.description ?? "",
      },
      {
        name: "compteComptable",
        title: props.intl.formatMessage({
          id: "Clientes.numCuenta",
          defaultMessage: "Num cuenta",
        }),
      },
      {
        name: "compteCompres",
        title: props.intl.formatMessage({
          id: "Proveedores.cuenta.compra",
          defaultMessage: "Num cuenta Compras",
        }),
      },
      {
        name: "noTraspassar",
        title: props.intl.formatMessage({
          id: "Proveedores.contab.noTraspasar",
          defaultMessage: "No Traspasar",
        }),
        getCellValue: (row) =>
          row.noTraspassar && row.noTraspassar === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          ),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
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
      },
      {
        type: "input",
        key: "compteComptable",
        required: true,
        placeHolder: props.intl.formatMessage({
          id: "Clientes.cuentasContables",
          defaultMessage: "Num cuenta contable",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 10),
        ]),
      },
      {
        type: "input",
        key: "compteCompres",
        required: true,
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.cuenta.compra",
          defaultMessage: "Num cuenta Compras",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 10),
        ]),
      },
      {
        type: "checkbox",
        key: "noTraspassar",
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.contab.noTraspasar",
          defaultMessage: "No traspasar ",
        }),
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
    ],
  };

  const tabs = [
    {
      label: "Cuentas Contables",
      key: 0,
      component: (
        <ExpandableGrid
          id="comptesProveidorEmpresa"
          responseKey="compteProveidorEmpresas"
          enabled={props.editMode}
          configuration={cuentasContables}
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
              id={"Clientes.tabs.cuentasCorrientes"}
              defaultMessage={"Cuentas corrientes"}
            />
          }
        >
          <Grid container spacing={2}>
            <Grid xs={7} item>
              <OutlinedContainer
                className="general-tab-container"
                title={
                  <FormattedMessage
                    id={"Clientes.tabs.numeroCuenta"}
                    defaultMessage={"Número Cuenta"}
                  />
                }
              >
                <GenericForm
                  formComponents={contabilidadConfig}
                  emptyPaper={true}
                  editMode={props.editMode}
                  getFormData={getFormData}
                  setFormData={setFormData}
                  loading={props.loading}
                  formErrors={props.formErrors}
                  submitFromOutside={props.submitFromOutside}
                  onSubmit={() => props.onSubmitTab(formData)}
                  handleIsValid={(value) =>
                    addValidity(ACCOUNT_NUMBER_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(ACCOUNT_NUMBER_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
            <Grid xs={5} item>
              <OutlinedContainer
                className="general-tab-container"
                title={
                  <FormattedMessage
                    id={"Clientes.tabs.iban"}
                    defaultMessage={"Iban"}
                  />
                }
              >
                <GenericForm
                  formComponents={ibanConfig}
                  emptyPaper={true}
                  editMode={props.editMode}
                  getFormData={getFormData}
                  setFormData={setFormData}
                  loading={props.loading}
                  formErrors={props.formErrors}
                  submitFromOutside={props.submitFromOutside}
                  onSubmit={() => props.onSubmitTab(formData)}
                  handleIsValid={(value) => addValidity(IBAN_INDEX, value)}
                  onBlur={(e) => handleTouched(IBAN_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
          </Grid>
        </OutlinedContainer>

        <Grid container spacing={2}>
          <Grid xs={7} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.tabs.datosContables"}
                  defaultMessage={"Datos Contables"}
                />
              }
            >
              <GenericForm
                formComponents={datosContablesConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(ACCOUNTING_DATA_INDEX, value)
                }
                onBlur={(e) => handleTouched(ACCOUNTING_DATA_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={5} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.tabs.cuentasContables"}
                  defaultMessage={"Cuentas Contables"}
                />
              }
            >
              <GenericForm
                formComponents={cuentasConfig}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(ACCOUNTING_ACCOUNTS_INDEX, value)
                }
                onBlur={(e) => handleTouched(ACCOUNTING_ACCOUNTS_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(AccountingTab);
