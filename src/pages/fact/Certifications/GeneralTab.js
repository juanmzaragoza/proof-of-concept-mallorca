import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import { CERTIFICATION_SELECTOR_VALUES } from "../../../constants/selectors";

const CERT_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CERT_SECTION_INDEX]: false,
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
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const certificationConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.numeroCertificado",
        defaultMessage: "Número",
      }),
      type: "numeric",
      key: "numeroCertificat",
      noEditable: true,
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(1, 99999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "presupostCodi",
      id: "pressupostCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) =>
          `${data.serieVenda.pk.codi}/${data.numero}/${data.versio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (pressuposts) => pressuposts && pressuposts.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.numeroCertificadoCliente",
        defaultMessage: "Número cliente",
      }),
      type: "numeric",
      key: "numeroCertificatClient",
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(1, 99999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.valorDivisa",
        defaultMessage: "Valor Divisa Euro",
      }),
      type: "numeric",
      key: "valorDivisaEuros",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.diaInicio",
        defaultMessage: "Dia Inicio",
      }),
      required: true,
      type: "date",
      key: "diaInici",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.diaCierre",
        defaultMessage: "Dia Cierre",
      }),
      type: "date",
      key: "diaTancament",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.ultimaCertificacion",
        defaultMessage: "Última Certificacion",
      }),
      required: true,
      type: "select",
      key: "darreraCertificacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: CERTIFICATION_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.certificacionOrigen",
        defaultMessage: "Certificacion Origen",
      }),
      required: true,
      type: "select",
      key: "certificacioOrigen",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: CERTIFICATION_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.complementaria",
        defaultMessage: "Complementaria ",
      }),
      type: "select",
      key: "complementaria",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: CERTIFICATION_SELECTOR_VALUES,
      },
      validationType: "string",

    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Certificaciones.porcentajeEjecucion",
        defaultMessage: "% Ejecución",
      }),
      type: "numeric",
      key: "pteeje",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      sufix: "%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },

    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={certificationConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(CERT_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(CERT_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
