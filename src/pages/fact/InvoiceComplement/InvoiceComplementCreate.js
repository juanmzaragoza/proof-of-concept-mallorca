import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const InvoiceComplementCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const TYPE = props.intl.formatMessage({
    id: "TiposVencimiento.tipo",
    defaultMessage: "Tipo",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];
  const aSCodeAndType = [
    { title: CODE, name: "codi" },
    { title: TYPE, name: "tipus" },
  ];
  const formatCodeAndType = (data) => `${data.tipus} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const createConfiguration = [
    {
      placeHolder: CODE,

      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "complementsFactura",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "ComplementosFactura.incrementarFactura",
        defaultMessage: "Incrementar Factura",
      }),
      type: "checkbox",
      key: "incrementarFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ComplementosFactura.incrementarBase",
        defaultMessage: "Incrementar Base",
      }),
      type: "checkbox",
      key: "incrementarBaseImposable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "articleFamilia",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleFamilias",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
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
        id: "Articulos.costes.tipoCoste",
        defaultMessage: "Tipo coste",
      }),
      type: "LOV",
      key: "tipusCost",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusCosts",
        labelKey: formatCodeAndType,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndType,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ComplementosFactura.distribuirCostes",
        defaultMessage: "distribuir Costes entre Artículos",
      }),
      type: "checkbox",
      key: "distribuirCostosEntreArticles",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ComplementosFactura.aplicarDto",
        defaultMessage: "Aplicar Descuento",
      }),
      type: "checkbox",
      key: "aplicarDescompte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.contable",
        defaultMessage: "Cuenta contable",
      }),
      type: "input",
      key: "compteContable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "ComplementosFactura.titulo",
        defaultMessage: "Complementos Factura",
      })}
      formConfiguration={createConfiguration}
      url={API.complementsFactura}
    />
  );
};

export default compose(withValidations, injectIntl)(InvoiceComplementCreate);
