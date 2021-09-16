import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import Grid from "@material-ui/core/Grid/Grid";
import GenericForm from "modules/GenericForm";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import OutlinedContainer from "modules/shared/OutlinedContainer";

const GENERAL_SECTION_INDEX = 0;
const DATOS_CONTABLES_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [GENERAL_SECTION_INDEX]: false,
      [DATOS_CONTABLES_SECTION_INDEX]: false,
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

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DOMICILI = props.intl.formatMessage({
    id: "Comun.domicilio",
    defaultMessage: "Domicilio",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

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
          "documentPagament",
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
        id: "DocumentosPago.controlarEfectos",
        defaultMessage: "Controlar efectos",
      }),
      type: "checkbox",
      key: "controlarEfectes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.agruparVencimiento",
        defaultMessage: "Agrupar vencimiento en remesas",
      }),
      type: "checkbox",
      key: "agruparVencimentsRemeses",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.naturalezaPago",
        defaultMessage: "Naturaleza pago",
      }),
      type: "LOV",
      key: "naturalesaPagamentCobrament",
      id: "naturalesaPagoCobro",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "naturalesaPagamentCobraments",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.numeroDias",
        defaultMessage: "Número días valoración",
      }),
      type: "numeric",
      key: "numeroDias",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.diasEfectosNegociados",
        defaultMessage: "Días para efectos negociados",
      }),
      type: "numeric",
      key: "diaEfectosNegociados",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.aplicarDescuentos",
        defaultMessage: "Aplicar descuentos pronto pago",
      }),
      type: "checkbox",
      key: "aplicarDescuentosProntoPago",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const datosContables = [
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.traspasar",
        defaultMessage: "Traspasar",
      }),
      type: "checkbox",
      key: "transpasar",
      breakpoints: {
        xs: 12,
        md: 1,
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
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.codigoContable",
        defaultMessage: "Código contable",
      }),
      type: "input",
      key: "codigoContable",
      breakpoints: {
        xs: 12,
        md: 1,
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
        md: 1,
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
        md: 2,
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
        md: 2,
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
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 1,
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
        md: 3,
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
        id: "Clientes.codigoBanco",
        defaultMessage: "Código Banco",
      }),
      type: "LOV",
      key: "bancCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "bancs",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        transform: {
          apply: (bancCodi) => bancCodi && bancCodi.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OficinasBancarias.titulo",
        defaultMessage: "Oficinas Bancarias",
      }),
      type: "LOV",
      key: "oficinaBancariaCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "oficinaBancarias",
        labelKey: (data) => `${data.domicili} (${data.codi})`,
        sort: "domicili",
        cannotCreate: true,
        transform: {
          apply: (oficinaBancariaCodi) =>
            oficinaBancariaCodi && oficinaBancariaCodi.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: DOMICILI, name: "domicili" },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.ibcIban",
        defaultMessage: "Ibc iban",
      }),
      type: "input",
      key: "ibnibc",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.paisIban",
        defaultMessage: "País iban",
      }),
      type: "input",
      key: "ibnpai",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.numeroCuentaCorriente",
        defaultMessage: "Número de cuenta corriente",
      }),
      type: "numeric",
      key: "ccr",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.digitosControl",
        defaultMessage: "Dígitos de control",
      }),
      type: "input",
      key: "dcc",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "DocumentosPago.digitosControlIban",
        defaultMessage: "Dígitos de control iban",
      }),
      type: "numeric",
      key: "ibndcc",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
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
          handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
          {...props}
        />
      </Grid>
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
            formComponents={datosContables}
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
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
