import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";


import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_REG_IVA_SELECTOR_VALUES,
  TIPO_RETENCION3_SELECTOR_VALUES,
} from "constants/selectors";

import { useTabForm } from "hooks/tab-form";

const EMPRESA_SECTION_INDEX = 0;

const ContabilidadTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: clientId } = useParams();

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

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

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

  const datosContablesConfig = [
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
   
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.retenciones",
        defaultMessage: "Retenciones",
      }),
      type: "LOV",
      key: "classeRetencio",
      breakpoints: {
        xs: 12,
        md: 2,
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
      key: "tipusRetencioFactura",
      breakpoints: {
        xs: 12,
        md: 2,
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
        type: "checkbox",
        key: "recEqu",
        placeHolder: props.intl.formatMessage({
          id: "Clientes.recargo.equivalencia",
          defaultMessage: "Recargo Equivalencia",
        }),
        breakpoints: {
          xs: 12,
          md: 2,
        },
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
        validations: [...props.stringValidations.minMaxValidation(0,99)],
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
        validations: [...props.stringValidations.minMaxValidation(0,99)],
      },
      {
        type: "numeric",
        key: "importIva",
        placeHolder: props.intl.formatMessage({
          id: "Facturas.importeIva",
          defaultMessage: "Importe IVA",
        }),
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [...props.stringValidations.minMaxValidation(0,999999999999999)],
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
          md: 2,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0,11)],
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
        validations: [...props.stringValidations.minMaxValidation(0,2)],
      },
      {
        type: "input",
        key: "exerciciContable",
        placeHolder: props.intl.formatMessage({
          id: "Facturas.ejercicioContable",
          defaultMessage: "Ejercicio Contabilidad",
        }),
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0,4)],
      },
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
        validations: [...props.stringValidations.minMaxValidation(0,4)],
      },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
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
            handleIsValid={(value) => addValidity(EMPRESA_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(EMPRESA_SECTION_INDEX)}
            {...props}
          />
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
