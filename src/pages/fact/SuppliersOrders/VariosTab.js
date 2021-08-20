import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const VARIOS_SECTION_INDEX = 0;

const VariosTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [VARIOS_SECTION_INDEX]: true,
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



  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const datosGenerales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.entrega",
        defaultMessage: "entrega ",
      }),
      type: "input",
      key: "entrega",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 1)],
    },
   
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.recogidaObjecto",
        defaultMessage: "Recogida objeto",
      }),
      type: "LOV",
      key: "recollidaObjecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "recollidaObjectes",
        labelKey: (data) => `${data.descripcio} (${data.secuencia})`,
        sort: "descripcio",
        advancedSearchColumns: [
          { title: CODE, name: "secuencia" },
          { title: DESCRIPCIO, name: "descripcio" },
        ],
        cannotCreate: true,
      },
    },
  
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.tipoMantenimineto",
        defaultMessage: "Tipo Mantenimineto",
      }),
      type: "LOV",
      key: "mantenimentDeTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "mantenimentDeTipuses",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        advancedSearchColumns: aSCodeAndDescription,
        cannotCreate: true,
      },
    },
  ];

  const voluminoso = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.nombreVolumen",
        defaultMessage: "Nombre Volumen ",
      }),
      type: "input",
      key: "nomVol",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 40)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.telefonoVolumen",
        defaultMessage: "Teléfono Volumen ",
      }),
      type: "input",
      key: "telefonVol",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.codigoPostalVolumen",
        defaultMessage: "Código Postal Volumen ",
      }),
      type: "input",
      key: "codiPostalVol",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 8)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.direccionVolumen",
        defaultMessage: "Dirección Volumen ",
      }),
      type: "input",
      key: "direccioVol",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={datosGenerales}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(VARIOS_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid xs={8} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"PedidosProveedores.voluminoso"}
              defaultMessage={"Voluminoso"}
            />
          }
        >
          <GenericForm
            formComponents={voluminoso}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(VARIOS_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(VARIOS_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(VariosTab);
