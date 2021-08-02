import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const COMISION_TYPE_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripcion",
  });

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
          "tipusComissio",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
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
        id: "TipoComision.porcentaje",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatge",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipoComision.minimo",
        defaultMessage: "Mínimo",
      }),
      type: "numeric",
      key: "minim",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: DESCRIPCIO,

      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      multiline: {
        options: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 1000)],
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={createConfiguration}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(COMISION_TYPE_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(COMISION_TYPE_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
