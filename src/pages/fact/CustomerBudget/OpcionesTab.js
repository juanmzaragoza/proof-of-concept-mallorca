import React  from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const OPCIONES_TAB_INDEX = 0;

const OpcionesTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [OPCIONES_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const opcionesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.opcion1",
        defaultMessage: "Descripción Opción 1",
      }),
      type: "input",
      key: "opcio1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.opcion2",
        defaultMessage: "Descripción Opción 2",
      }),
      type: "input",
      key: "opcio2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.opcion3",
        defaultMessage: "Descripción Opción 3",
      }),
      type: "input",
      key: "opcio3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.opcion4",
        defaultMessage: "Descripción Opción 4",
      }),
      type: "input",
      key: "opcio4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.opcion5",
        defaultMessage: "Descripción Opción 5",
      }),
      type: "input",
      key: "opcio5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={opcionesConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(OPCIONES_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(OPCIONES_TAB_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(OpcionesTab);
