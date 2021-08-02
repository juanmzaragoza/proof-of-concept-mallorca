import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import {
  FACT_TIPO_SELECTOR_VALUES,
  CONTABILIDAD_SELECTOR_VALUES,
  TIPO_EXTRANJ_SELECTOR_VALUES,
  TIPO_CLIENTE_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const COMPANY_SECTION_INDEX = 0;

const LogoTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [COMPANY_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const logoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.logo",
        defaultMessage: "Ruta logo",
      }),
      type: "input",
      key: "logoPath",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.imprimirLogo",
        defaultMessage: "Imprimir Logo",
      }),
      type: "checkbox",
      key: "logoImprimir",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={logoConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(COMPANY_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(COMPANY_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(LogoTab);
