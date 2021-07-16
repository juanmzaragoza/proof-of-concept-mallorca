import React, {useEffect, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";

import {TIPO_VENCIMIENTO_SELECTOR_VALUES, TIPO_MES_SELECTOR_VALUES} from "../../../constants/selectors";

import {useTabForm} from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const PERCENTAGES_SECTION_TAB_INDEX = 1;
const PLAZOS_SECTION_TAB_INDEX = 2;

const GeneralTab = ({formData, setFormData, getFormData, ...props}) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[CREATE_SECTION_INDEX]: false, [PERCENTAGES_SECTION_TAB_INDEX]:false, [PLAZOS_SECTION_TAB_INDEX]:false}, setIsValid: props.setIsValid});

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre" });
  const DESCRIPTION = props.intl.formatMessage({ id: "Comun.descripcion", defaultMessage: "Descripción" });

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('tipusVenciment', 'codi', CODE)
      ]
    },
    {
      placeHolder: DESCRIPTION,
      type: 'input',
      key: 'descripcio',
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipo",
        defaultMessage: "Tipo"
      }),
      type: 'select',
      key: 'tipus',
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: TIPO_VENCIMIENTO_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipusVencimiento.generarCobro",
        defaultMessage: "Generación cobro/pago"
      }),
      type: 'checkbox',
      key: 'generarCobramentPagament',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.importeTerminio",
        defaultMessage: "Importe terminio"
      }),
      type: 'numeric',
      key: 'importTermini',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diasTerminio",
        defaultMessage: "Días terminio"
      }),
      type: 'numeric',
      key: 'diaTermini',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.terminioAMesesCompletos",
        defaultMessage: "Terminio a meses completos"
      }),
      type: 'checkbox',
      key: 'terminiAMesosComplets',
      breakpoints: {
        xs: 12,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.numeroTerminios",
        defaultMessage: "Numero terminios"
      }),
      type: 'numeric',
      key: 'nombreTerminis',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
  ];

  const PorcentajeConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo1Porcentaje",
        defaultMessage: "Porcentaje 1º Plazo"
      }),
      type: 'numeric',
      key: 'percentatgePrimerTermini',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo2Porcentaje",
        defaultMessage: "Porcentaje 2º Plazo"
      }),
      type: 'numeric',
      key: 'percentatgeSegonTermini',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo3Porcentaje",
        defaultMessage: "Porcentaje 3º Plazo"
      }),
      type: 'numeric',
      key: 'percentatgeTercerTermini',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo4Porcentaje",
        defaultMessage: "Porcentaje 4º Plazo"
      }),
      type: 'numeric',
      key: 'percentatgeQuartTermini',
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo5Porcentaje",
        defaultMessage: "Porcentaje 5º Plazo"
      }),
      type: 'numeric',
      key: 'percentatgeQuintTermini',
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "number",
    },
  ];

  const PlazosConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias1Terminio",
        defaultMessage: "Días 1º Terminio",
      }),
      type: "numeric",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias2Terminio",
        defaultMessage: "Días 2º Terminio",
      }),
      type: "numeric",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias3Terminio",
        defaultMessage: "Días 3º Terminio",
      }),
      type: "numeric",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias4Terminio",
        defaultMessage: "Días 4º Terminio",
      }),
      type: "numeric",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias5Terminio",
        defaultMessage: "Días 5º Terminio",
      }),
      type: "numeric",
      key: "dataInici",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
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
        md: 2
      },
      validationType: "number",
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dia2Terminio",
        defaultMessage: "Día 2 terminio",
      }),
      type: "numeric",
      key: "dia2Terminis",
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesCierre",
        defaultMessage: "Mes cierre"
      }),
      type: 'select',
      key: 'mesTan',
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diaPago",
        defaultMessage: "Día Pago",
      }),
      type: "numeric",
      key: "diaPagament",
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesPago",
        defaultMessage: "Mes pago"
      }),
      type: 'select',
      key: 'mesPagament',
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES
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
        md: 3
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
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.clase",
        defaultMessage: "Clase vencimineto",
      }),
      type: "input",
      key: "classeVenciment",
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 1)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.fechaCreacionVenCompras",
        defaultMessage: "Fecha de creación del vencimiento de compras",
      }),
      type: "input",
      key: "datCreVenCpr",
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 1)
      ],
    },
  ]

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Tarifa.porcentajes"} defaultMessage={"Porcentajes"}/>,
      key: 0,
      component: <GenericForm formComponents={PorcentajeConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(PERCENTAGES_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(PERCENTAGES_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"TiposVencimiento.plazos"} defaultMessage={"Plazos"}/>,
      key: 1,
      component: <GenericForm formComponents={PlazosConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(PLAZOS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(PLAZOS_SECTION_TAB_INDEX)}
                              {...props} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Tarifa.titulo"} defaultMessage={"Tarifas"}/>}>
          <GenericForm formComponents={createConfiguration}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(CREATE_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
                       {...props} />
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
)(GeneralTab);