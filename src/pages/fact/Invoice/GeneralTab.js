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
const CLIENT_SECTION_TAB_INDEX = 1;
const CONTAB_SECTION_TAB_INDEX = 2;
const PRESS_SECTION_TAB_INDEX = 3;
const TOTAL_SECTION_TAB_INDEX = 4;
const FINAL_FACTURA_TAB_INDEX = 5;
const EMAIL_TAB_INDEX = 6;
const FACT_SECTION_TAB_INDEX = 7;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INVOICE_SECTION_INDEX]: false,
      [CLIENT_SECTION_TAB_INDEX]: false,
      [FINAL_FACTURA_TAB_INDEX]: false,
      [EMAIL_TAB_INDEX]: false,
      [FACT_SECTION_TAB_INDEX]: false,
      [CONTAB_SECTION_TAB_INDEX]:false,
      [TOTAL_SECTION_TAB_INDEX]:false,
      [PRESS_SECTION_TAB_INDEX]:false
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

  const invoiceConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.numero",
        defaultMessage: "Número",
      }),
      type: "input",
      key: "nombreFactura",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "cls",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 1),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.nombreFiscalCliente",
        defaultMessage: "Nombre fiscal cliente",
      }),
      type: "input",
      key: "nomFiscalClient",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 40),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.fechaFactura",
        defaultMessage: "Fecha factura",
      }),
      type: "date",
      key: "diaFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.valorDivisa",
    //     defaultMessage: "Valor divisa Euro",
    //   }),
    //   type: "input",
    //   key: "valorDivisaEuro",
    //   required: true,
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   ...withRequiredValidation([
    //     ...props.stringValidations.minMaxValidation(1, 99999999999),
    //   ]),
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.importeBruto",
    //     defaultMessage: "Importe bruto",
    //   }),
    //   required: true,
    //   type: "input",
    //   key: "importBrut",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   ...withRequiredValidation([
    //     ...props.stringValidations.minMaxValidation(1, 999999999999999),
    //   ]),
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.baseImponible",
    //     defaultMessage: "Base imponible",
    //   }),
    //   type: "input",
    //   key: "baseInponible",
    //   required: true,
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   ...withRequiredValidation([
    //     ...props.stringValidations.minMaxValidation(1, 999999999999999),
    //   ]),
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.importeFactura",
    //     defaultMessage: "Importe factura",
    //   }),
    //   required: true,
    //   type: "input",
    //   key: "importFactura",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   ...withRequiredValidation([
    //     ...props.stringValidations.minMaxValidation(1, 999999999999999),
    //   ]),
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.cuerpo",
    //     defaultMessage: "Cuerpo",
    //   }),
    //   type: "input",
    //   key: "cos",
    //   required: true,
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   ...withRequiredValidation([
    //     ...props.stringValidations.minMaxValidation(1, 999999999999999),
    //   ]),
    // },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.serie",
        defaultMessage: "Serie",
      }),
      type: "LOV",
      key: "serieVenda",
      id: "serieVendas",
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
        id: "Facturas.formaPago",
        defaultMessage: "Forma pago",
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
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "LOV",
      key: "tipusVencimentCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
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
      validationType: "string",
      ...withRequiredValidation(),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.comercial",
        defaultMessage: "Comercial",
      }),
      type: "LOV",
      key: "operariCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
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
        transform: {
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Proveedores.censado_eat",
    //     defaultMessage: "Censado en EAT",
    //   }),
    //   type: "checkbox",
    //   key: "ceaet",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },
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
    ...codiPostal(3),
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

  const oficinaContable = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "ofiCmp",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOfiCmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domOfiCmp",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const organoGestor = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "orgGes",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOrgGes",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domOrgGes",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const unidadTramitadora = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "uniTrm",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalUniTrm",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domUniTrm",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const emails = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.email",
        defaultMessage: "Email Factura",
      }),
      type: "input",
      key: "emialFactura",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.fechaEnvio",
        defaultMessage: "Fecha envio Email",
      }),
      type: "date",
      key: "dataEnvioEmail",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.confeccionEmail",
        defaultMessage: "Confección Email ",
      }),
      type: "checkbox",
      key: "confLecEml",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  ];

  const totalesFactura = [
    {
      type: "input",
      key: "suplidos",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.suplidos",
        defaultMessage: "Suplidos",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      type: "numeric",
      key: "dto",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descuento",
        defaultMessage: "Descuento",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      type: "numeric",
      key: "dto2",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descuento2",
        defaultMessage: "Descuento 2",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      type: "checkbox",
      key: "recEqu",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.recargo.equivalencia",
        defaultMessage: "Recargo Equivalencia",
      }),
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipoRetención",
        defaultMessage: "Tipo retención",
      }),
      type: "select",
      key: "tipusRetencioFactura",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_RETENCION3_SELECTOR_VALUES,
      },
    },
    {
      type: "numeric",
      key: "pteRetencio",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.porcentaje.retencion",
        defaultMessage: "Porcentaje retención",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
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
        md: 4,
      },
      selector: {
        key: "classeRetencios",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    // {
    //   type: "numeric",
    //   key: "importIva",
    //   placeHolder: props.intl.formatMessage({
    //     id: "Facturas.importeIva",
    //     defaultMessage: "Importe IVA",
    //   }),
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    //   validationType: "number",
    //   validations: [...props.stringValidations.minMaxValidation(0,999999999999999)],
    // },
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
          handleIsValid={(value) => addValidity(CONTAB_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(CONTAB_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Facturas.presupuestoProyecto"}
          defaultMessage={"Presupuesto/Proyecto"}
        />
      ),
      key: 2,
      component: (
        <GenericForm
          formComponents={pressupConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(PRESS_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(PRESS_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Facturas.totalesFactura"}
          defaultMessage={"Totales Factura"}
        />
      ),
      key: 3,
      component: (
        <GenericForm
          formComponents={totalesFactura}
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
          handleIsValid={(value) => addValidity(FINAL_FACTURA_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(FINAL_FACTURA_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.tabs.facturacionElect"}
          defaultMessage={"Facturación electrónico"}
        />
      ),
      key: 5,
      component: (
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.ofiContable"}
                  defaultMessage={"Ofinica Contable"}
                />
              }
            >
              <GenericForm
                formComponents={oficinaContable}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.orgGestor"}
                  defaultMessage={"Órgano Gestor"}
                />
              }
            >
              <GenericForm
                formComponents={organoGestor}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.unidadTramitadora"}
                  defaultMessage={"Unidad Tramitadora"}
                />
              }
            >
              <GenericForm
                formComponents={unidadTramitadora}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      ),
    },
    {
      label: (
        <FormattedMessage id={"Facturas.emails"} defaultMessage={"Email"} />
      ),
      key: 6,
      component: (
        <GenericForm
          formComponents={emails}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(EMAIL_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(EMAIL_TAB_INDEX)}
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
