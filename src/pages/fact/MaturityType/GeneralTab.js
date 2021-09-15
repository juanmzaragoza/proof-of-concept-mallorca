import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  TIPO_VENCIMIENTO_SELECTOR_VALUES,
  TIPO_MES_SELECTOR_VALUES,
} from "../../../constants/selectors";
import { useTabForm } from "hooks/tab-form";
import AlertError from "modules/AlertError";

const CREATE_SECTION_INDEX = 0;
const PERCENTAGES_SECTION_TAB_INDEX = 1;
const PLAZOS_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: false,
      [PERCENTAGES_SECTION_TAB_INDEX]: false,
      [PLAZOS_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const { id: tipusVencimentId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];
  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

  const [disabledImporte, setDisabledImporte] = useState(true);
  const [disabledPlazos, setDisabledPlazos] = useState(true);
  const [disabledEscalado, setDisabledEscalado] = useState(false);
  const [disabledCampoImporteFijo, setDisabledCampoImporteFijo] =
    useState(false);
  const [disabledCampoImportePlazos, setDisabledCampoImportePlazos] =
    useState(false);
  const [requiredImportePlazos, setRequiredImportePlazos] = useState(false);
  const [requiredDiaPlazos, setRequiredDiaPlazos] = useState(false);
  const [errorCount, setErrorCount] = useState(false);
  const [requiredDia1, setRequiredDia1] = useState(false);
  const [requiredDia2, setRequiredDia2] = useState(false);
  const [requiredDia3, setRequiredDia3] = useState(false);
  const [requiredDia4, setRequiredDia4] = useState(false);
  const [requiredDia5, setRequiredDia5] = useState(false);
  const [errorDies, setErrorDies] = useState(0);

  const getNumber = (key) => (getFormData(key) ? getFormData(key) : 0);

  useEffect(() => {
    const tipoVencimiento = getString("tipus");
    const mesesCompletos = getString("terminiAMesosComplets");

    if (tipoVencimiento === "IMPORT_FIXE") {
      setDisabledImporte(false);
      setDisabledPlazos(true);
      setErrorCount(false);
      setRequiredDia1(false);
      setRequiredDia2(false);
      setRequiredDia3(false);
      setRequiredDia4(false);
      setRequiredDia5(false);
      if (mesesCompletos) {
        setDisabledCampoImporteFijo(true);
        setRequiredDiaPlazos(false);
        setDisabledCampoImportePlazos(false);
        setRequiredImportePlazos(true);
      } else {
        setRequiredDiaPlazos(true);
        setDisabledCampoImporteFijo(false);
        setDisabledCampoImportePlazos(false);
        setRequiredImportePlazos(true);
      }
    } else if (tipoVencimiento === "PAGAMENT_TERMINIS") {
      setDisabledImporte(false);
      setDisabledPlazos(true);
      setErrorCount(false);
      setRequiredDia1(false);
      setRequiredDia2(false);
      setRequiredDia3(false);
      setRequiredDia4(false);
      setRequiredDia5(false);
      if (mesesCompletos) {
        setDisabledCampoImportePlazos(true);
        setDisabledCampoImporteFijo(false);
        setRequiredDiaPlazos(false);
        setRequiredImportePlazos(false);
      } else {
        setRequiredDiaPlazos(true);
        setDisabledCampoImportePlazos(false);
        setDisabledCampoImporteFijo(false);
        setRequiredImportePlazos(false);
      }
    } else if (tipoVencimiento === "IMPORT_PORCENTUAL") {
      setDisabledPlazos(false);
      setDisabledImporte(true);
      setRequiredImportePlazos(false);
      setRequiredDiaPlazos(false);

      const p1 = getNumber("percentatgePrimerTermini");
      const p2 = getNumber("percentatgeSegonTermini");
      const p3 = getNumber("percentatgeTercerTermini");
      const p4 = getNumber("percentatgeQuartTermini");
      const p5 = getNumber("percentatgeQuintTermini");

      const total = p1 + p2 + p3 + p4 + p5;

      if (total !== 100) {
        setErrorCount(true);
      } else {
        setErrorCount(false);
      }
      console.log(requiredDia4);

      if (getNumber("percentatgePrimerTermini") !== 0) {
        setRequiredDia1(true);
      }
      if (getNumber("percentatgeSegonTermini") !== 0) {
        setRequiredDia2(true);
      }
      if (getNumber("percentatgeTercerTermini") !== 0) {
        setRequiredDia3(true);
      }
      if (getNumber("percentatgeQuartTermini") !== 0) {
        setRequiredDia4(true);
      }
      if (getNumber("percentatgeQuintTermini") !== 0) {
        setRequiredDia5(true);
      }
    } else {
      setDisabledImporte(true);
    }

    if (tipoVencimiento === "ESCALAT") {
      setDisabledPlazos(true);
      setDisabledImporte(true);
      setDisabledEscalado(true);
      setErrorCount(false);
      setRequiredDia1(false);
      setRequiredDia2(false);
      setRequiredDia3(false);
      setRequiredDia4(false);
      setRequiredDia5(false);
    } else {
      setDisabledEscalado(false);
    }
  }, [
    getFormData("tipus"),
    getFormData("terminiAMesosComplets"),
    getFormData("diesPrimerTermini"),
    getFormData("diesSegonTermini"),
    getFormData("diesTercerTermini"),
    getFormData("diesQuartTermini"),
    getFormData("diesQuintTermini"),
    getFormData("percentatgePrimerTermini"),
    getFormData("percentatgeSegonTermini"),
    getFormData("percentatgeTercerTermini"),
    getFormData("percentatgeQuartTermini"),
    getFormData("percentatgeQuintTermini"),
  ]);

  // useEffect(() => {
  //   const dia1 = getNumber("diesPrimerTermini");
  //   const dia2 = getNumber("diesSegonTermini");
  //   const dia3 = getNumber("diesTercerTermini");
  //   const dia4 = getNumber("diesQuartTermini");
  //   const dia5 = getNumber("diesQuintTermini");

  //   if (dia2 !== 0) {
  //     if (dia2 < dia1) {
  //       setErrorDies(2);
  //     } else {
  //       setErrorDies(0);
  //     }
  //   }

  //   if (dia3 !== 0) {
  //     if (dia3 < dia2) {
  //       setErrorDies(3);
  //     } else {
  //       setErrorDies(0);
  //     }
  //   }

  //   if (dia4 !== 0) {
  //     if (dia4 < dia3) {
  //       setErrorDies(4);
  //     } else {
  //       setErrorDies(0);
  //     }
  //   }

  //   if (dia5 !== 0) {
  //     if (dia5 < dia4) {
  //       setErrorDies(5);
  //     } else {
  //       setErrorDies(0);
  //     }
  //   }
  // }, [
  //   getFormData("diesPrimerTermini"),
  //   getFormData("diesSegonTermini"),
  //   getFormData("diesTercerTermini"),
  //   getFormData("diesQuartTermini"),
  //   getFormData("diesQuintTermini"),
  // ]);

  const createConfiguration = [
    {
      placeHolder: CODE,
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
          "tipusVenciment",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipo",
        defaultMessage: "Tipo",
      }),
      type: "select",
      required: true,
      key: "tipus",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_VENCIMIENTO_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TipusVencimiento.generarCobro",
        defaultMessage: "Generación cobro/pago",
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
        id: "TiposVencimiento.mesCierre",
        defaultMessage: "Mes cierre",
      }),
      type: "select",
      key: "mesTan",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.mesPropuesto",
        defaultMessage: "Mes propuesto",
      }),
      type: "select",
      key: "mesPagament",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_MES_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diaPropuesto",
        defaultMessage: "Día propuesto",
      }),
      type: "numeric",
      key: "diaPagament",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
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
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.clase",
        defaultMessage: "Clase vencimineto",
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
  ];

  const Importeconfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.importeTerminio",
        defaultMessage: "Importe terminio",
      }),
      type: "numeric",
      key: "importTermini",
      required: requiredImportePlazos,
      disabled: disabledImporte,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      suffix: "€",
      validationType: "number",
      validations: requiredImportePlazos
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(0, 99999999),
          ]
        : [...props.numberValidations.minMaxValidation(0, 99999999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.terminioAMesesCompletos",
        defaultMessage: "Meses completos",
      }),
      type: "checkbox",
      key: "terminiAMesosComplets",
      disabled: disabledImporte,
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.diasTerminio",
        defaultMessage: "Días terminio",
      }),
      type: "numeric",
      key: "diaTermini",
      required: requiredDiaPlazos,
      disabled:
        disabledImporte ||
        disabledCampoImporteFijo ||
        disabledCampoImportePlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDiaPlazos
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(1, 31),
          ]
        : [...props.numberValidations.minMaxValidation(0, 31)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dia2Terminio",
        defaultMessage: "Día 2 terminio",
      }),
      type: "numeric",
      key: "dia2Terminis",
      disabled:
        disabledImporte ||
        disabledCampoImporteFijo ||
        disabledCampoImportePlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(1, 31)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.numeroTerminios",
        defaultMessage: "Numero terminios",
      }),
      type: "numeric",
      key: "nombreTerminis",
      disabled: disabledImporte || disabledCampoImporteFijo,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(1, 72)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.minimoDias",
        defaultMessage: "Mínimo días",
      }),
      type: "numeric",
      key: "minimDies",
      disabled: disabledImporte,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
  ];

  const PlazosConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo1Porcentaje",
        defaultMessage: "Porcentaje 1º Plazo",
      }),
      type: "numeric",
      key: "percentatgePrimerTermini",
      disabled: disabledPlazos,
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias1Terminio",
        defaultMessage: "Días 1º Terminio",
      }),
      type: "numeric",
      key: "diesPrimerTermini",
      disabled: disabledPlazos,
      required: requiredDia1,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDia1
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(-999, 999),
          ]
        : [...props.numberValidations.minMaxValidation(-999, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo2Porcentaje",
        defaultMessage: "Porcentaje 2º Plazo",
      }),
      suffix: "%",
      type: "numeric",
      key: "percentatgeSegonTermini",
      disabled: disabledPlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias2Terminio",
        defaultMessage: "Días 2º Terminio",
      }),
      type: "numeric",
      key: "diesSegonTermini",
      disabled: disabledPlazos,
      required: requiredDia2,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDia2
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(-999, 999),
          ]
        : [...props.numberValidations.minMaxValidation(-999, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo3Porcentaje",
        defaultMessage: "Porcentaje 3º Plazo",
      }),
      suffix: "%",
      type: "numeric",
      key: "percentatgeTercerTermini",
      disabled: disabledPlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias3Terminio",
        defaultMessage: "Días 3º Terminio",
      }),
      type: "numeric",
      key: "diesTercerTermini",
      disabled: disabledPlazos,
      required: requiredDia3,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDia3
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(-999, 999),
          ]
        : [...props.numberValidations.minMaxValidation(-999, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo4Porcentaje",
        defaultMessage: "Porcentaje 4º Plazo",
      }),
      suffix: "%",
      type: "numeric",
      key: "percentatgeQuartTermini",
      disabled: disabledPlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias4Terminio",
        defaultMessage: "Días 4º Terminio",
      }),
      type: "numeric",
      key: "diesQuartTermini",
      disabled: disabledPlazos,
      required: requiredDia4,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDia4
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(-999, 999),
          ]
        : [...props.numberValidations.minMaxValidation(-999, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.plazo5Porcentaje",
        defaultMessage: "Porcentaje 5º Plazo",
      }),
      suffix: "%",
      type: "numeric",
      key: "percentatgeQuintTermini",
      disabled: disabledPlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 100)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "TiposVencimiento.dias5Terminio",
        defaultMessage: "Días 5º Terminio",
      }),
      type: "numeric",
      key: "diesQuintTermini",
      required: requiredDia5,
      disabled: disabledPlazos,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: requiredDia5
        ? [
            ...props.commonValidations.requiredValidation(),
            ...props.numberValidations.minMaxValidation(-999, 999),
          ]
        : [...props.numberValidations.minMaxValidation(-999, 999)],
    },
  ];

  return (
    <Grid container spacing={2}>
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
      <Grid xs={4} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"TiposVencimiento.importe"}
              defaultMessage={"Importe"}
            />
          }
        >
          <GenericForm
            formComponents={Importeconfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
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
              id={"TiposVencimiento.plazos"}
              defaultMessage={"Plazos"}
            />
          }
        >
          <Grid container spacing={2}>
            {errorCount ? (
              <AlertError
                type="error"
                description={
                  <FormattedMessage
                    id={"TiposVencimiento.errorPorcentaje"}
                    defaultMessage={"Error Porcentaje"}
                  />
                }
                cols={12}
              />
            ) : (
              ""
            )}
            {errorDies !== 0 ? (
              <AlertError
                type="error"
                description={
                  <FormattedMessage
                    id={"TiposVencimiento.errorPorcentaje"}
                    defaultMessage={"Error Porcentaje"}
                  />
                }
                cols={12}
              />
            ) : (
              ""
            )}
          </Grid>
          <GenericForm
            formComponents={PlazosConfiguration}
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
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
