import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useParams } from "react-router-dom";
import { useTabForm } from "hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";

const FAM_SECTION_INDEX = 0;

const DocumentFooterTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [FAM_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

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

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const checkConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.familiaClienteProveedor",
        defaultMessage: "Familia Cliente/Proveedor",
      }),
      type: "checkbox",
      key: "familiaCliProv",
      breakpoints: {
        xs: 6,
        md: 6,
      },
    },
  ];

  const { id: peuDocument } = useParams();

  const familiaConfig = {
    title: props.intl.formatMessage({
      id: "Clientes.aplicadores",
      defaultMessage: "Aplicadores",
    }),
    query: [
      {
        columnName: "peuDocument.id",
        value: `"${peuDocument}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      peuDocument: { id: `${peuDocument}` },
    },

    columns: [
      {
        name: "numero",
        title: props.intl.formatMessage({
          id: "PieDocumnentos.numero",
          defaultMessage: "Numero ",
        }),
    
      },
  
      {
        name: "familiaClient.description",
        title: props.intl.formatMessage({
          id: "FamiliaClientes.titulo",
          defaultMessage: "Familia Clientes",
        }),
        getCellValue: (row) => row?.familiaClient?.description || "",
      },
      {
        name: "familiaProveidor.description",
        title: props.intl.formatMessage({
          id: "FamiliaProveedores.titulo",
          defaultMessage: "Familia Proveedores",
        }),
        getCellValue: (row) => row?.familiaProveidor?.description || "",
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "PieDocumento.numero",
          defaultMessage: "Numero",
        }),
        type: "input",
        required:true,
        key: "numero",
        breakpoints: {
          xs: 6,
          md: 2,
        },
        validationType:"string",
        validations:[...props.commonValidations.requiredValidation()]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.familia",
          defaultMessage: "Familia",
        }),
        type: "LOV",
        key: "familiaClient",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "familiaClients",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id:  "FamiliaProveedores.titulo",
          defaultMessage: "Familia",
        }),
        type: "LOV",
        key: "familiaProveidor",
        required: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "familiaProveidors",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
    ],
  };

  return (
    <Grid container>

        <Grid xs={12} item>
          <GenericForm
            formComponents={checkConfiguration}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(FAM_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(FAM_SECTION_INDEX)}
            {...props}
          />
        </Grid>
        <Grid xs={12} item>
          <ExpandableGrid
            id="peusDocumentFamilia"
            responseKey="peuDocumentFamilias"
            enabled={props.editMode}
            configuration={familiaConfig}
          />
        </Grid>

    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(DocumentFooterTab);
