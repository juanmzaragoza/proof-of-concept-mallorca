import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {
  TIPO_VENCIMIENTO_SELECTOR_VALUES,
  TIPO_MES_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";

const EXPIRATION_SECTION_INDEX = 0;
const AMOUNT_SECTION_INDEX = 1;
const TERM_SECTION_INDEX = 2;

const ExpirationTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [EXPIRATION_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

  const ExpirationTypeConfig = [
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
          "tipusVenciments",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
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
        id: "TiposVencimiento.tipo",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "select",
      key: "tipus",
      required:true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_VENCIMIENTO_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TipusVencimiento.generarCobro",
        defaultMessage: "Generar cobro/pago",
      }),
      type: "checkbox",
      key: "generarCobramentPagament",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.clase",
        defaultMessage: "Clase vencimiento",
      }),
      type: "input",
      key: "classeVenciment",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesPago",
        defaultMessage: "Mes pago",
      }),
      type: "select",
      key: "mesPagament",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesCierre",
        defaultMessage: "Mes cierre",
      }),
      type: "select",
      key: "mesTan",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.ultimoDiaVentas",
        defaultMessage: "Último dia mes ventas",
      }),
      type: "checkbox",
      key: "darrerDiaMesVentes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.ultimoDiaCompras",
        defaultMessage: "Último dia mes compras",
      }),
      type: "checkbox",
      key: "darrerDiaMesCompres",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const amountConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.importePlazos",
        defaultMessage: "Importe plazos",
      }),
      type: "numeric",
      key: "importTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "€",
      validationType: "number",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diaPlazos",
        defaultMessage: "Dia plazos",
      }),
      type: "numeric",
      key: "diaTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diaPlazos2",
        defaultMessage: "Dia plazos 2",
      }),
      type: "numeric",
      key: "dia2Terminis",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesesCompletos",
        defaultMessage: "Meses completos",
      }),
      type: "checkbox",
      key: "terminiAMesosComplets",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.numeroPlazos",
        defaultMessage: "Número plazos",
      }),
      type: "numeric",
      key: "nombreTerminis",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.minimoDias",
        defaultMessage: "Mínimo días",
      }),
      type: "numeric",
      key: "minimDies",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
  ];

  const termConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo1Porcentaje",
        defaultMessage: "Plazo 1 Porcentaje",
      }),
      type: "numeric",
      key: "percentatgePrimerTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diesPrimerTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo2Porcentaje",
        defaultMessage: "Plazo 2 Porcentaje",
      }),
      type: "numeric",
      key: "percentatgeSegonTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diesSegonTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo3Porcentaje",
        defaultMessage: "Plazo 3 Porcentaje",
      }),
      type: "numeric",
      key: "percentatgeTercerTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diesTercerTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo4Porcentaje",
        defaultMessage: "Plazo 4 Porcentaje",
      }),
      type: "numeric",
      key: "percentatgeQuartTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diesQuartTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo5Porcentaje",
        defaultMessage: "Plazo 5 Porcentaje",
      }),
      type: "numeric",
      key: "percentatgeQuintTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diesQuintTermini",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"TiposVencimiento.importe"}
          defaultMessage={"Importe"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={amountConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(AMOUNT_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(AMOUNT_SECTION_INDEX)}
          {...props}
        />
      ),
    },

    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"TiposVencimiento.plazos"}
          defaultMessage={"Plazos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={termConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(TERM_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(TERM_SECTION_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Presupuestos.titulo"}
              defaultMessage={"Presupuestos"}
            />
          }
        >
          <GenericForm
            formComponents={ExpirationTypeConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(EXPIRATION_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(EXPIRATION_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ExpirationTab);
