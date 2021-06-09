import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import "../Suppliers/styles.scss";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "../../modules/ExpandableGrid";
import {
  TIPO_REG_IVA_SELECTOR_VALUES,
  TIPO_RETENCION_SELECTOR_VALUES,
} from "constants/selectors";

import { useTabForm } from "../../hooks/tab-form";

const EMPRESA_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;

const ContabilidadTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: clientId } = useParams();

  const TITLE = props.intl.formatMessage({
    id: "Proveedores.direcciones_comerciales",
    defaultMessage: "Direcciones Comerciales",
  });
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
  const LONG = props.intl.formatMessage({
    id: "Clientes.contacto.longitud",
    defaultMessage: "Longitud",
  });
  const LAT = props.intl.formatMessage({
    id: "Clientes.contacto.latitud",
    defaultMessage: "Latitud",
  });
  const DEFECTE = props.intl.formatMessage({
    id: "Proveedores.DireccionComercial.defecto",
    defaultMessage: "Defecto",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DIR_EXCLUSIVA = props.intl.formatMessage({
    id: "Clientes.dreccion_exclusiva",
    defaultMessage: "Dirección exclusiva",
  });
  const BLOQUEJAT = props.intl.formatMessage({
    id: "Clientes.bloqueado",
    defaultMessage: "Bloqueado",
  });
  const OBV = props.intl.formatMessage({
    id: "Clientes.observaciones",
    defaultMessage: "Observaciones",
  });
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});


  const getString = (key) => (getFormData(key) ? getFormData(key) : "");
  useEffect(() => {
    const dir =
      getString("sg") +
      " " +
      getString("nomDomicili") +
      " " +
      getString("numeroDomicili") +
      " " +
      getString("escala") +
      " " +
      getString("pis") +
      " " +
      getString("porta");
    setFormData({ key: "domicili", value: dir });
  }, [
    getFormData("sg"),
    getFormData("nomDomicili"),
    getFormData("numeroDomicili"),
    getFormData("escala"),
    getFormData("pis"),
    getFormData("porta"),
  ]);

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
      type: 'input',
      key: 'descripcio',
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes
      }
    }
  ];

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal"
      }),
      type: 'LOV',
      key: 'codiPostal',
      required: true,
      breakpoints: {
        xs: 12,
        md: md
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "codiPostals",
        labelKey: (data) => `${data.poblacio} ${data.municipi?` - ${data.municipi}`:''} (${data.codi})`,
        sort: 'codi',
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País"
            }),
            type: 'LOV',
            key: 'pais',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
              relatedWith: {
                name: 'provincia',
                filterBy: 'pais.id',
                keyValue: 'id'
              },
              advancedSearchColumns: aSCodeAndName
            }
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia"
            }),
            type: 'LOV',
            key: 'provincia',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName
            }
          },
          {
            type: 'input',
            key: 'municipi',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'poblacio',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
        ],
        advancedSearchColumns: aSCodeAndDescription
      }
    },
  ];


  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];
  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];


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
        id: "Clientes.paisIban",
        defaultMessage: "Pais Iban",
      }),
      type: "input",
      key: "paisIban",

      breakpoints: {
        xs: 12,
        md: 1,
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
      key: "digitsControlIban",

      breakpoints: {
        xs: 12,
        md: 1,
      },

      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.controlDigitos",
        defaultMessage: "Control Digitos",
      }),
      type: "input",
      key: "digitsControl",

      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.codigoBanco",
        defaultMessage: "Código banco",
      }),
      type: "input",
      key: "bancCodi",

      breakpoints: {
        xs: 12,
        md: 2,
      },

      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 5)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta",
        defaultMessage: "Cuenta",
      }),
      type: "input",
      key: "numeroCC",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 12)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.bicIban",
        defaultMessage: "Bic Iban",
      }),
      type: "input",
      key: "bicIban",

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 12)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.Contab.oficines",
        defaultMessage: "Oficina Bancaria",
      }),
      type: "LOV",
      key: "oficinaBancaria",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "oficinaBancarias",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "domicili",
        advancedSearchColumns: [{title: CODE, name: 'codi'},{title: DOMICILI, name: 'domicili'}],
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
            placeHolder: props.intl.formatMessage({
              id: "Clientes.banco",
              defaultMessage: "Banco",
            }),
            type: "LOV",
            key: "banc",
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "object",
            ...withRequiredValidation(),
            selector: {
              key: "bancs",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
            },
          },
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
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "ives",
      breakpoints: {
        xs: 12,
        md: 2,
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
            type: "input",
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
              ...props.stringValidations.minMaxValidation(1, 21),
            ]),
          },
          {
            type: "input",
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
              ...props.stringValidations.minMaxValidation(1, 21),
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
            validationType: "number",
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
      key: "regimIva",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "object",
      ...withRequiredValidation(),
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
        md: 3,
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
        md: 2,
      },
      selector: {
        options: TIPO_RETENCION_SELECTOR_VALUES,
      },
    },
    {
      type: "checkbox",
      key: "recarrecEquivalencia",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.recargo.equivalencia",
        defaultMessage: "Recargo Equivalencia",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      type: "input",
      key: "percentatgeRetencio",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.porcentaje.retencion",
        defaultMessage: "Porcentaje retención",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
   
    {
      type: "input",
      key: "compteContable",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.contable",
        defaultMessage: "Cuenta Contable",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      type: "input",
      key: "compteVentesComptabilitat",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.ventas",
        defaultMessage: "Cuenta Ventas",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const cuentasCorrientes = {
    title: props.intl.formatMessage({
      id: "Clientes.cuentasCorrientes",
      defaultMessage: "Cuentas corrientes",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      client: { id: clientId },
    },
    columns: [
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        getCellValue: row => row.empresa?.description ?? ""
      },
      {
        name: "bancCodi",
        title: props.intl.formatMessage({
          id: "Clientes.codigoBanco",
          defaultMessage: "Código banco",
        }),
      },
      {
        name: "oficinaBancaria",
        title: props.intl.formatMessage({
          id: "Clientes.Contab.oficines",
          defaultMessage: "Oficinas bancarias",
        }),
        getCellValue: row => row.oficinaBancaria?.description ?? ""
      },
      {
        name: "numeroCompteCorrent",
        title: props.intl.formatMessage({
          id: "Clientes.numCuenta",
          defaultMessage: "Num cuenta",
        }),
      },
      {
        name: "digitControl",
        title:props.intl.formatMessage({
          id: "Clientes.controlDigitos",
          defaultMessage: "Control dígitos",
        }),
      },
      {
        name: "digitControlIban",
        title:props.intl.formatMessage({
          id: "Clientes.digitosIban",
          defaultMessage: "Dígitos iban",
        }),
      },
    ],
    formComponents: [
      {
        type:'input',
        key: "bancCodi",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.codigoBanco",
          defaultMessage: "Código banco",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        type: 'input',
        key: "numeroCompteCorrent",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.numCuenta",
          defaultMessage: "Num cuenta",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        type: 'input',
        key: "digitControl",
        placeHolder:props.intl.formatMessage({
          id: "Clientes.controlDigitos",
          defaultMessage: "Control dígitos",
        }),
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 2),
            ]),
      },
      {
        type: 'input',
        key: "digitControlIban",
        placeHolder:props.intl.formatMessage({
          id: "Clientes.digitosIban",
          defaultMessage: "Dígitos iban",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [{title: CODE, name: 'codi'},{title: NOM, name: 'nomFiscal'}],
        },
      }, 

      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.Contab.oficines",
          defaultMessage: "Oficina Bancaria",
        }),
        type: "LOV",
        key: "oficinaBancaria",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "oficinaBancarias",
          labelKey:  (data) => `${data.domicili} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: [{title: CODE, name: 'codi'},{title: DOMICILI, name: 'domicili'}],
        },
      }, 
      
    ],
  };


  const cuentasContables = {
    title: props.intl.formatMessage({
      id: "Clientes.cuentasContables",
      defaultMessage: "Cuentas contables",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      client: { id: clientId },
    },
    columns: [
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        getCellValue: row => row.empresa?.description ?? ""
      },
      {
        name: "compteComptable",
        title: props.intl.formatMessage({
          id: "Clientes.numCuenta",
          defaultMessage: "Num cuenta",
        }),
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
        required: false,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [{title: CODE, name: 'codi'},{title: NOM, name: 'nomFiscal'}],
        },
      },
      {
  
        type: 'input',
        key: "compteComptable",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.numCuenta",
          defaultMessage: "Num cuenta",
        }),
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      

     
      
    ],
  };

  const tabs = [
    {
      label: "Cuentas Corrientes",
      key: 0,
      component: (
        <ExpandableGrid
          id="compteCorrentEmpresas"
          enabled={props.editMode}
          configuration={cuentasCorrientes}
        />
      ),
    },
    {
      label: "Cuentas Contables",
      key: 1,
      component: (
        <ExpandableGrid
          id="compteComptableEmpresas"
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
              id={"Proveedores.tabs.contabilidad"}
              defaultMessage={"Contabilidad"}
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(ContabilidadTab);