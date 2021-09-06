import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { useSelector } from "react-redux";

const HEADER_TAB_INDEX = 0;
const ALPHANUMERICS_SECTION_INDEX = 1;
const NUMERICS_SECTION_INDEX = 1;
const INFORMACION_SECTION_INDEX = 2;

const ComercialTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [HEADER_TAB_INDEX]: true,
      [ALPHANUMERICS_SECTION_INDEX]: true,
      [NUMERICS_SECTION_INDEX]: true,
      [INFORMACION_SECTION_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const [firstTime, setFirstTime] = useState(true);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

  useEffect(() => {
    const operario = getString("operari");

    setFormData({
      key: "operario",
      value: operario?.pk?.codi ? operario?.pk?.codi : operario.codi,
    });
    setFormData({
      key: "operarioNombre",
      value: operario?.description
        ? operario?.description
        : operario.nomCodiTxt,
    });
   
  }, [getFormData("operari")]);

  const header = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercialCodigo",
        defaultMessage: "Comercial",
      }),
      type: "input",
      key: "operario",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercialNombre",
        defaultMessage: "Nombre Comercial",
      }),
      type: "input",
      key: "operarioNombre",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.situacionCom",
        defaultMessage: "Situación Comercial",
      }),
      type: "LOV",
      key: "situacioComercial",
      id: "situacionsComercial",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "situacioComercials",
        labelKey: formatCodeAndName,
        sort: "description",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.proximaVisita",
        defaultMessage: "Próxima visita Comercial",
      }),
      type: "date",
      key: "proximaVisitaComercial",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const comercialAlfanumericoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.dirFinanciero",
        defaultMessage: "Dir. Financiero",
      }),
      type: "input",
      key: "parametreTxtComercial1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.dirInformatica",
        defaultMessage: "Dir. Informática",
      }),
      type: "input",
      key: "parametreTxtComercial2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.sistema",
        defaultMessage: "sistema actual",
      }),
      type: "input",
      key: "parametreTxtComercial3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.comentarios",
        defaultMessage: "Comentarios",
      }),
      type: "input",
      key: "parametreTxtComercial4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.observaciones",
        defaultMessage: "observaciones",
      }),
      type: "input",
      key: "parametreTxtComercial5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const comercialNumConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.numOperarios",
        defaultMessage: "num Operarios",
      }),
      type: "input",
      key: "parametreNumComercial1",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.numPcs",
        defaultMessage: "num Pcs",
      }),
      type: "input",
      key: "parametreNumComercial2",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.probabilidad",
        defaultMessage: "Probabilidad",
      }),
      type: "input",
      key: "parametreNumComercial3",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.comercial.facturacion",
        defaultMessage: "facturacion ",
      }),
      type: "input",
      key: "parametreNumComercial4",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.pers.paramNum5",
        defaultMessage: "Parámetro numérico 5",
      }),
      type: "input",
      key: "parametreNumComercial5",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const tabs = [
    {
      label: (
        <FormattedMessage id={"Clientes.general"} defaultMessage={"General"} />
      ),
      key: 0,
      component: (
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <OutlinedContainer
              className="contact-tab-container"
              title={
                <FormattedMessage
                  id={"Proveedores.personalizacion.alfanumericos"}
                  defaultMessage={"Parámetros Alfanuméricos"}
                />
              }
            >
              <GenericForm
                formComponents={comercialAlfanumericoConfig}
                emptyPaper={true}
                editMode={props.editMode}
                setFormData={setFormData}
                getFormData={getFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(ALPHANUMERICS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(ALPHANUMERICS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={6} item>
            <OutlinedContainer
              className="contact-tab-container"
              title={
                <FormattedMessage
                  id={"Proveedores.personalizacion.numericos"}
                  defaultMessage={"Parámetros Numéricos"}
                />
              }
            >
              <GenericForm
                formComponents={comercialNumConfig}
                emptyPaper={true}
                editMode={props.editMode}
                setFormData={setFormData}
                getFormData={getFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(NUMERICS_SECTION_INDEX, value)
                }
                onBlur={(e) => handleTouched(NUMERICS_SECTION_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Clientes.informacionComercial"}
          defaultMessage={"Información Comercial"}
        />
      ),
      key: 1,
      component: "Pendiente Servicio Backend : Informaciones Comerciales",
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={header}
          emptyPaper={true}
          editMode={props.editMode}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ALPHANUMERICS_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(ALPHANUMERICS_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(ComercialTab);
