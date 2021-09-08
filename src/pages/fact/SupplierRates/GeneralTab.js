import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import {
  TIPO_TARIFA_PROVEEDOR_SELECTOR_VALUES,
  TIPO_DESC_PROVEEDOR_SELECTOR_VALUES,
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
        md: 2,
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
        id: "Tarifa.tarifaTipo",
        defaultMessage: "Tipo de tarifa",
      }),
      type: "select",
      key: "tipusTarifa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_TARIFA_PROVEEDOR_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.fechaInicio",
        defaultMessage: "Fecha Inicio",
      }),
      type: "date",
      key: "diaInici",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const PorcentajeConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.descuentoPrecio",
        defaultMessage: "Descuento Precio",
      }),
      type: "numeric",
      key: "dtePreu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix:"%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.tipoDescuento1",
        defaultMessage: "Tipo Descuento",
      }),
      type: "select",
      required: true,
      key: "tipusDte1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_DESC_PROVEEDOR_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.descuento1",
        defaultMessage: "Descuento 1",
      }),
      type: "numeric",
      key: "dte1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix:"%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.tipoDescuento1",
        defaultMessage: "Tipo Descuento",
      }),
      type: "select",
      required: true,
      key: "tipusDte1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_DESC_PROVEEDOR_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Tarifa.descuento2",
        defaultMessage: "Descuento 2",
      }),
      type: "numeric",
      key: "dte2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix:"%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
  ];

  return (
    <>
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
            handleIsValid={(value) => addValidity(CREATE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
            {...props}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={8} item>
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
      </Grid>
    </>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
