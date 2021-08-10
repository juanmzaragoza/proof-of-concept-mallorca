import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const ACCOUNTING_SECTION_INDEX = 0;
const INCOME_SECTION_INDEX = 1;
const PAYMENT_SECTION_INDEX = 2;

const AccountingDataTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ACCOUNTING_SECTION_INDEX]: false,
      [INCOME_SECTION_INDEX]: false,
      [PAYMENT_SECTION_INDEX]: false,
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

  const accountingDataConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.codigoContable",
        defaultMessage: "Código contable",
      }),
      type: "input",
      key: "codigoContable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.codigoFactura",
        defaultMessage: "Código factura electrónica",
      }),
      type: "input",
      key: "codigoFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "Iva",
      }),
      required: true,
      type: "LOV",
      key: "iva",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "ivas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        creationComponents: [...codeAndDescription()],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DESCRIPCIO, name: "descripcio" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.traspasar",
        defaultMessage: "Traspasar",
      }),
      type: "checkbox",
      key: "transpasar",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.porcentajeComision",
        defaultMessage: "Porcentaje comisión",
      }),
      type: "numeric",
      suffix: "%",
      key: "percentatgeComisio",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      required: true,
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableComision",
        defaultMessage: "Cuenta contable comisión",
      }),
      type: "numeric",
      key: "compteContableComissio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      required: true,
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.conceptoContable",
        defaultMessage: "Concepto contable",
      }),
      type: "input",
      key: "concepteContable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      required: true,
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegimenIva.titulo",
        defaultMessage: "regimIva",
      }),
      type: "LOV",
      key: "regimIva",
      id: "regimIvas",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "regimIvas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        creationComponents: [...codeAndDescription()],
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DESCRIPCIO, name: "descripcio" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.asientoCompuesto",
        defaultMessage: "Asiento compuesto",
      }),
      type: "checkbox",
      key: "asientoCompuesto",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const incomeConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableOrigen",
        defaultMessage: "Cuenta contable origen",
      }),
      type: "input",
      key: "compteContableOrigenIngressos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.tipoAsiento",
        defaultMessage: "Tipo Asiento",
      }),
      type: "input",
      key: "tipusSeientIngressos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diarioContable",
        defaultMessage: "Diario contable",
      }),
      type: "input",
      key: "diariContableIngressos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diarioContable2",
        defaultMessage: "Diario contable 2",
      }),
      type: "input",
      key: "diariContableIngressos2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
  ];

  const paymentsConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableDestino",
        defaultMessage: "Cuenta contable destino",
      }),
      type: "input",
      key: "compteContableDestiPagos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
      ...props.commonValidations.requiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.tipoAsiento",
        defaultMessage: "Tipo Asiento",
      }),
      type: "input",
      key: "tipusSeientPagos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diarioContable",
        defaultMessage: "Diario contable",
      }),
      type: "input",
      key: "diariContablePagos",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diarioContable2",
        defaultMessage: "Diario contable 2",
      }),
      type: "input",
      key: "diariContablePagos2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      required: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 2),
        ...props.commonValidations.requiredValidation(),
      ],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"DocumentosPago.ingresos"}
          defaultMessage={"Ingresos"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={incomeConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(INCOME_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(INCOME_SECTION_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"DocumentosPago.pagos"}
          defaultMessage={"Pagos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={paymentsConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(PAYMENT_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(PAYMENT_SECTION_INDEX)}
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
              id={"DocumentosPago.datosContables"}
              defaultMessage={"Datos Contables"}
            />
          }
        >
          <GenericForm
            formComponents={accountingDataConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(ACCOUNTING_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(ACCOUNTING_SECTION_INDEX)}
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(AccountingDataTab);
