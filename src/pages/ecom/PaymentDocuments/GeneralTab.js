import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const GENERAL_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [GENERAL_SECTION_INDEX]: false },
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


  const paymentDocConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      required:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "documentPagamentCobraments",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },

   
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.agruparVencimiento",
        defaultMessage: "Agrupar vencimiento remesas",
      }),
      type: "checkbox",
      key: "agruparVencimentsRemeses",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.naturaleza",
        defaultMessage: "Naturaleza Pago",
      }),
      type: "LOV",
      key: "naturalesaPagamentCobrament",
      required:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "naturalesaPagamentCobraments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        creationComponents: [
          ...codeAndDescription(),
          {
            placeHolder: OBS,
            type: "input",
            key: "observacions",
            required: true,
            breakpoints: {
              xs: 12,
              md: 12,
            },
            text: {
              multiline: 3,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60),
            ],
          },
        ],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DESCRIPCIO, name: "descripcio" },
        ],
      },
      validationType: "object",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
  
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.numeroDias",
        defaultMessage: "Número días valoración",
      }),
      type: "numeric",
      key: "numeroDias",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      required:true,
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diasEfectosNegociados",
        defaultMessage: "Días para efectos negociados",
      }),
      type: "numeric",
      key: "diaEfectosNegociados",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      required:true,
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "DocumentosPago.controlarEfectos",
          defaultMessage: "Controlar efectos",
        }),
        type: "checkbox",
        key: "controlarEfectes",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
    {
        placeHolder: props.intl.formatMessage({
          id: "DocumentosPago.aplicarDescuentos",
          defaultMessage: "Aplicar descunetos pronto pago",
        }),
        type: "checkbox",
        key: "aplicarDescuentosProntoPago",
        breakpoints: {
          xs: 12,
          md: 3,
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
              id={"DocumentosPago.titulo"}
              defaultMessage={"DocumentosPago"}
            />
          }
        >
          <GenericForm
            formComponents={paymentDocConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
