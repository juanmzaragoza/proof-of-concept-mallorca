import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

const COUNTRY_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [COUNTRY_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const { id: paisId } = useParams();

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.stringValidations.fieldExistsValidation(
          "pais",
          "codi",
          props.intl.formatMessage({
            id: "Paises.codigo",
            defaultMessage: "Código",
          })
        ),
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nombre",
        defaultMessage: "Nombre",
      }),
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.nif",
        defaultMessage: "N.I.F",
      }),
      type: "input",
      key: "nif",
      required: false,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso",
        defaultMessage: "Codi Iso",
      }),
      type: "input",
      key: "codiso",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.codiso2",
        defaultMessage: "Codi Iso 2 ",
      }),
      type: "input",
      key: "codiso002",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Paises.cee",
        defaultMessage: "CEE",
      }),
      type: "checkbox",
      key: "cee",
      required: false,
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const provincias = {
    title: props.intl.formatMessage({
      id: "Provincias.titulo",
      defaultMessage: "Provincias",
    }),
    query: [
      {
        columnName: "pais.id",
        value: `"${paisId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      pais: { id: paisId },
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Provincias.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Provincias.nombre",
          defaultMessage: "Nombre",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Provincias.codigo",
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
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Provincias.nombre",
          defaultMessage: "Nombre",
        }),
        type: "input",
        key: "nom",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 30),
        ],
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Provincias.titulo"}
          defaultMessage={"Provincias"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="provincia"
          responseKey="provincias"
          enabled={props.editMode}
          configuration={provincias}
        />
      ),
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
          handleIsValid={(value) => addValidity(COUNTRY_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(COUNTRY_SECTION_INDEX)}
          {...props}
        />
        <Grid xs={12} item>
          <OutlinedContainer>
            <ConfigurableTabs tabs={tabs} />
          </OutlinedContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
