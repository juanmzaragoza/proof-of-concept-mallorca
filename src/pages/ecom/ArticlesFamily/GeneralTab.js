import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";


import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";

const ARTICLE_FAMILY_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: articleFamilyId } = useParams();
  

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const ArticlesFamilyConfig = [
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
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation(
          "articleFamilias",
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
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.artExportables",
        defaultMessage: "Artículos exportables",
      }),
      type: "checkbox",
      key: "artExportables",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const companyConfig= {

    title: props.intl.formatMessage({
        id: "FamiliaArticulos.empresa",
        defaultMessage: "Empresa",
      }),

    query: [
      {
        columnName: "articleFamilia.id",
        value: `'${articleFamilyId}'`,
        exact: true,
      },
    ],
    extraPostBody: {
        articleFamilia: { id: articleFamilyId },
      },
   
    columns: [
        {
            name: "empresa",
            title: props.intl.formatMessage({
              id: "FamiliaArticulos.empresa",
              defaultMessage: "Empresa",
            }),
            getCellValue: (row) =>
            row.empresa?.description ?? ""
          },
          {
            name: "web",
            title: props.intl.formatMessage({
              id: "FamiliaArticulos.web",
              defaultMessage: "Web",
            }),
            getCellValue: (row) =>
              row.web && row.web === true ? (
                <Chip label="SI" variant="outlined" />
              ) : (
                <Chip label="NO" variant="outlined" />
              ),
          },
    ],
    formComponents: [
        {
            placeHolder: props.intl.formatMessage({
              id: "FamiliaArticulos.empresa",
              defaultMessage: "Empresas",
            }),
            type: "LOV",
            key: "empresa",
            id:"empresas",
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            selector: {
              key: "empresas",
              labelKey: (data) => `${data.nomComercial} (${data.codi})`,
              sort: "nomComercial",
              cannotCreate: true,
              advancedSearchColumns: [{title: CODE, name: 'codi'},{title: props.intl.formatMessage({
                id: "Comun.nombre",
                defaultMessage: "Nombre",
              }), name: 'nomComercial'}],
            },
        },
        {
            placeHolder: props.intl.formatMessage({
              id: "FamiliaArticulos.web",
              defaultMessage: "Web",
            }),
            type: "checkbox",
            key: "web",
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },

    
    ]
  };


  const tabs = [
    {
      label:<FormattedMessage id={"FamiliaArticulos.empresa"} defaultMessage={"Empresa"} />,
      key: 0,
      component: (
        <ExpandableGrid
          id="articleFamiliaEmpresas"
          responseKey="articleFamiliaEmpresas"
          enabled={props.editMode}
          configuration={companyConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
       
     
          <GenericForm
            formComponents={ArticlesFamilyConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(ARTICLE_FAMILY_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(ARTICLE_FAMILY_SECTION_INDEX)}
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
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
