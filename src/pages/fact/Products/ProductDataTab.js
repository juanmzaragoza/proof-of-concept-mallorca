import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import { TIPO_PRODUCTO_SELECTOR_VALUES } from "constants/selectors";

const PRODUCT_SECTION_INDEX = 0;

const ProductsDataTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [PRODUCT_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const productsDataConfig = [
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
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.fieldExistsValidation(
          "productes",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
        ...props.stringValidations.minMaxValidation(0, 16),
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
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
    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.abrv",
        defaultMessage: "Abreviatura",
      }),
      type: "input",
      key: "abreviatura",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 3)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.tipo",
        defaultMessage: "Tipo producto",
      }),
      type: "select",
      key: "tipus",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_PRODUCTO_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.activo",
        defaultMessage: "Activo",
      }),
      type: "checkbox",
      key: "actiu",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.visible",
        defaultMessage: "Visible",
      }),
      type: "checkbox",
      key: "visible",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 16,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Productos.editorHtml",
        defaultMessage: "Editor HTML",
      }),
      type: "wysiwyg",
      key: "text",
      breakpoints: {
        xs: 12,
        md: 6,
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
              id={"Productos.tabs.datosProd"}
              defaultMessage={"Datos producto"}
            />
          }
        >
          <GenericForm
            formComponents={productsDataConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(PRODUCT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(PRODUCT_SECTION_INDEX)}
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
)(ProductsDataTab);
