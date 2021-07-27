import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import {
  TIPO_INVERSION_SELECTOR_VALUES,
  TIPO_REG_IVA_SELECTOR_VALUES,
  TIPO_OBRA_SELECTOR_VALUES,
} from "constants/selectors";

const INV_SECTION_INDEX = 0;

const InvSujetoPasivoTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INV_SECTION_INDEX]: false,
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

  const InvSujetoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoInversion",
        defaultMessage: "Tipo Inversión",
      }),
      type: "select",
      key: "tipusInversio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_INVERSION_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.tipoObra",
        defaultMessage: "Tipo obra",
      }),
      type: "select",
      key: "tipusObra",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_OBRA_SELECTOR_VALUES,
      },
    },

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
          md: 3,
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
                ...props.numberValidations.minMaxValidation(0, 99)
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
                ...props.numberValidations.minMaxValidation(0, 99)
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
      key: "regimIva",
      breakpoints: {
        xs: 12,
        md: 3,
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
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.serieIntracomunitari",
        defaultMessage: "Serie Intracomunitari",
      }),
      type: "LOV",
      key: "serieIntracomunitaria",
      breakpoints: {
        xs: 12,
        md: 3,
      },

      selector: {
        key: "serieIntracomunitarias",
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
              md: 3,
            },
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 2),
            ]),
          },
          {
            type: "input",
            key: "descripcio",
            placeHolder: DESCRIPCIO,
            required: true,
            breakpoints: {
              xs: 12,
              md: 9,
            },
            validationType: "string",
            ...withRequiredValidation([
              ...props.stringValidations.minMaxValidation(1, 30),
            ]),
          },
          {
            type: "date",
            key: "dia1",
            placeHolder: props.intl.formatMessage({
              id: "Proyectos.dia1",
              defaultMessage: "Dia 1",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 5,
            },
            validationType: "string",
            ...withRequiredValidation(),
          },
          {
            type: "date",
            key: "dia2",
            placeHolder: props.intl.formatMessage({
              id: "Proyectos.dia2",
              defaultMessage: "Dia 2",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 5,
            },
            validationType: "string",
            ...withRequiredValidation(),
          },
        ],
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.datosGenerales"}
              defaultMessage={"Datos Generales"}
            />
          }
        >
          <GenericForm
            formComponents={InvSujetoConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(INV_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(INV_SECTION_INDEX)}
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
)(InvSujetoPasivoTab);
