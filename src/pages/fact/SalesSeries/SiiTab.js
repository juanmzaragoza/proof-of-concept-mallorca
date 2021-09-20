import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { FACTURA_RECTIFICATIVA_SELECTOR_VALUES } from "../../../constants/selectors";
import { useTabForm } from "hooks/tab-form";

const SII_SECTION_INDEX = 0;

const SiiTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [SII_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const sii = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoFactura",
        defaultMessage: "Tipo factura",
      }),
      type: "input",
      key: "sitCodFac",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoRectificativa",
        defaultMessage: "Tipo rectificativa",
      }),
      type: "input",
      key: "sitCodRct",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.sitCodCla",
        defaultMessage: "Clave de régimen especial",
      }),
      type: "input",
      key: "sitCodCla",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipoDesglose",
        defaultMessage: "Tipo de desglose",
      }),
      type: "input",
      key: "sitCodDsgTip",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.sitCodExe",
        defaultMessage: "Causa de exención",
      }),
      type: "input",
      key: "sitCodExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiPrsSrv",
        defaultMessage: "Prestación de servicios",
      }),
      type: "checkbox",
      key: "siiPrsSrv",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.descripcionOperacion",
        defaultMessage: "Descripción operación",
      }),
      type: "input",
      key: "descripcioOperari",
      breakpoints: {
        xs: 12,
        md: 8,
      },
      text: {
        multiline: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 500)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiEntBin",
        defaultMessage: "Entrega de bienes",
      }),
      type: "checkbox",
      key: "siiEntBin",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiSujNotExe",
        defaultMessage: "Sujeta / No exenta",
      }),
      type: "checkbox",
      key: "siiSujNotExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiSujExe",
        defaultMessage: "Sujeta / Exenta",
      }),
      type: "checkbox",
      key: "siiSujExe",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.siiNotSuj",
        defaultMessage: "No sujeta",
      }),
      type: "checkbox",
      key: "siiNotSuj",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.imm",
        defaultMessage: "Venta de inmuebles",
      }),
      type: "checkbox",
      key: "imm",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "SerieVenta.tipSbt",
        defaultMessage: "Tipo sustitutiva",
      }),
      type: "checkbox",
      key: "tipSbt",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "SerieVenta.siiTip",
    //     defaultMessage: "Sii tipo",
    //   }),
    //   type: "checkbox",
    //   key: "siiTip",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "SerieVenta.siiImpSuj",
    //     defaultMessage: "SiiImpSuj",
    //   }),
    //   type: "checkbox",
    //   key: "siiImpSuj",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "SerieVenta.cmpDebNeg",
    //     defaultMessage: "CmpDebNeg",
    //   }),
    //   type: "checkbox",
    //   key: "cmpDebNeg",
    //   breakpoints: {
    //     xs: 12,
    //     md: 2,
    //   },
    // },

 
  ];

  //   const tabs = [
  //     {
  //       className: "general-tab-subtab",
  //       label: <FormattedMessage id={"SerieVenta.sii"} defaultMessage={"SII"} />,
  //       key: 1,
  //       component: (
  //         <GenericForm
  //           formComponents={sii}
  //           emptyPaper={true}
  //           setFormData={setFormData}
  //           getFormData={getFormData}
  //           loading={props.loading}
  //           formErrors={props.formErrors}
  //           submitFromOutside={props.submitFromOutside}
  //           onSubmit={() => props.onSubmitTab(formData)}
  //           handleIsValid={(value) => addValidity(CREATE_SECTION_INDEX, value)}
  //           onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
  //           {...props}
  //         />
  //       ),
  //     },
  //   ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={sii}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(SII_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(SII_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SiiTab);
