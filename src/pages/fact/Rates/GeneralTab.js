import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import {
  TIPO_TARIFA_SELECTOR_VALUES,
  FORMA_CALCULO_SELECTOR_VALUES,
} from "../../../constants/selectors";

import { useTabForm } from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const PERCENTAGES_SECTION_TAB_INDEX = 1;
const VALIDITY_DATES_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: false,
      [PERCENTAGES_SECTION_TAB_INDEX]: false,
      [VALIDITY_DATES_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const [disabledCheckbox, setDisabledCheckbox] = useState(false);

  useEffect(() => {

    const tipus = getFormData("tarifaTipus");

    if (
      tipus === "TARIFA_GENERAL_SOBRE_COST" ||
      tipus === "TARIFA_GENERAL_SOBRE_PVP"
    ) {
      setDisabledCheckbox(true);
    } else {
      setDisabledCheckbox(false);
    }
    
  }, [getFormData("tarifaTipus")]);

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
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "tarifas",
          "codi",
          CODE
        ),
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
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.tarifaTipo",
        defaultMessage: "Tipo de tarifa",
      }),
      type: "select",
      key: "tarifaTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_TARIFA_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.formaCalculo",
        defaultMessage: "Forma de calculo",
      }),
      type: "select",
      key: "formaCalcul",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: FORMA_CALCULO_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.actualizarPrecio",
        defaultMessage: "Actualizar precio",
      }),
      type: "checkbox",
      disabled: disabledCheckbox,
      key: "actualitzarPreu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.descuentosGenerales",
        defaultMessage: "Descuentos generales",
      }),
      type: "checkbox",
      disabled: disabledCheckbox,
      key: "descomptesGenerals",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.tarifaOferta",
        defaultMessage: "Tarifa oferta",
      }),
      type: "checkbox",
      disabled: disabledCheckbox,
      key: "tarifaOferta",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const PorcentajeConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.porcentajeMaterial",
        defaultMessage: "Porcentaje material",
      }),
      type: "numeric",
      key: "percentatgeMaterial",
      required: true,
      suffix: "%",
      decimalScale: 2,
      fixedDecimalScale: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(-100, 100),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.porcentajeManoObra",
        defaultMessage: "Porcentaje mano de obra",
      }),
      type: "numeric",
      key: "percentatgeMaObra",
      suffix: "%",
      required: true,
      decimalScale: 2,
      fixedDecimalScale: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(-100, 100),
      ],
    },
  ];

  const FechasValidezConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaInicio",
        defaultMessage: "Fecha inicio",
      }),
      type: "date",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaFin",
        defaultMessage: "Fecha fin",
      }),
      type: "date",
      key: "dataFi",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Tarifa.titulo"}
                defaultMessage={"Tarifas"}
              />
            }
          >
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
                addValidity(CREATE_SECTION_INDEX, value)
              }
              onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
      </Grid>
      <Grid container spacing={3} margin={3}>
        <Grid xs={4} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Tarifa.porcentajes"}
                defaultMessage={"Porcentajes"}
              />
            }
          >
            <GenericForm
              formComponents={PorcentajeConfiguration}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(PERCENTAGES_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(PERCENTAGES_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
        <Grid xs={4} item>
          <OutlinedContainer
            className="general-tab-container"
            title={
              <FormattedMessage
                id={"Tarifa.fechasValidez"}
                defaultMessage={"Fechas Validez"}
              />
            }
          >
            <GenericForm
              formComponents={FechasValidezConfiguration}
              emptyPaper={true}
              setFormData={setFormData}
              getFormData={getFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(VALIDITY_DATES_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(VALIDITY_DATES_SECTION_TAB_INDEX)}
              {...props}
            />
          </OutlinedContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
