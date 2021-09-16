import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { useTabForm } from "hooks/tab-form";

const RAPPEL_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [RAPPEL_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const [mostrarEscalat, setMostrarEscalat] = useState(false);

  useEffect(() => {
    const escalat = getFormData("escalat");
    if (escalat === undefined) {
      setMostrarEscalat(false);
    } else {
      setMostrarEscalat(escalat);
    }
  }, [getFormData("escalat")]);

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },

    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "Rappel.porcentaje2",
    //     defaultMessage: "Porcentaje 2",
    //   }),
    //   type: "numeric",
    //   key: "percentatge2",
    //   suffix: "%",
    //   breakpoints: {
    //     xs: 12,
    //     md: 1,
    //   },
    //   validationType: "number",
    //   validations: [
    //     ...props.numberValidations.minMaxValidation(0, 99),
    //   ],
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.limiteInferior",
        defaultMessage: "límite Inferior",
      }),
      type: "numeric",
      key: "limitInferior",
      decimalScale: 2,
      fixedDecimalScale: true,
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
      placeHolder: props.intl.formatMessage({
        id: "Rappel.limiteSuperior",
        defaultMessage: "límite Superior",
      }),
      type: "numeric",
      key: "limitSuperior",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      decimalScale: 2,
      fixedDecimalScale: true,
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.porcentaje",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatge",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.escalado",
        defaultMessage: "Escalado",
      }),
      type: "checkbox",
      key: "escalat",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Rappel.absoluto",
        defaultMessage: "Absoluto",
      }),
      type: "checkbox",
      key: "absolut",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const rappelEscalados = "Falda ExpandedGrid Rappels Escalados (Pendiente BackEnd)";

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
          handleIsValid={(value) => addValidity(RAPPEL_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(RAPPEL_SECTION_INDEX)}
          {...props}
        />

        {mostrarEscalat ? (
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Rappels.escalados"}
                defaultMessage={"Rappels Escalados"}
              />
            }
          >
            <Grid container spacig={5} padding={5}>
              {" "}
              {rappelEscalados}
            </Grid>
          </OutlinedContainer>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
