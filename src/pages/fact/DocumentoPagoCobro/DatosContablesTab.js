import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const DATOS_CONTABLES_SECTION_INDEX = 0;
const INGRESOS_SECTION_TAB_INDEX = 1;
const PAGOS_SECTION_TAB_INDEX = 2;

const DatosContablesTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [DATOS_CONTABLES_SECTION_INDEX]: false,
      [INGRESOS_SECTION_TAB_INDEX]: true,
      [PAGOS_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.codigoContable",
        defaultMessage: "Código contable",
      }),
      type: "input",
      key: "codigoContable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.codigoFactura",
        defaultMessage: "Código factura electónica",
      }),
      type: "input",
      key: "codigoFacturaElectronica",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Documentos.cantidadIva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id: "ivaFact",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "ivas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.regimen.iva",
        defaultMessage: "Régimen IVA",
      }),
      type: "LOV",
      key: "regimIva",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "regimIvas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.porcentajeComision",
        defaultMessage: "Porcentaje comisión",
      }),
      type: "numeric",
      key: "percentatgeComisio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableComision",
        defaultMessage: "Cuenta contable comisión",
      }),
      type: "input",
      key: "compteContableComissio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 64)],
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
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
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

  const Ingresos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableOrigen",
        defaultMessage: "Cuenta contable origen",
      }),
      type: "input",
      key: "compteContableOrigenIngressos",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
  ];

  const Pagos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.cuentaContableDestino",
        defaultMessage: "Cuenta contable destino",
      }),
      type: "input",
      key: "compteContableDestiPagos",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
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
          formComponents={Ingresos}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(INGRESOS_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(INGRESOS_SECTION_TAB_INDEX)}
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
          formComponents={Pagos}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(PAGOS_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(PAGOS_SECTION_TAB_INDEX)}
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
              id={"Clientes.tabs.datosContables"}
              defaultMessage={"Datos contables"}
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
              addValidity(DATOS_CONTABLES_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(DATOS_CONTABLES_SECTION_INDEX)}
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
)(DatosContablesTab);
