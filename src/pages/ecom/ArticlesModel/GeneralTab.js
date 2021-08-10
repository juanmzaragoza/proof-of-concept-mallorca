import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";

const ARTICLE_MODEL_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [ARTICLE_MODEL_SECTION_INDEX]: false, 1: true },
    setIsValid: props.setIsValid,
  });

  const { id: modelId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const ArticlesModelConfig = [
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
          "articleModels",
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
        md: 8,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
  ];

  const traducConfig = {
    title: props.intl.formatMessage({
      id: "TraducionesFamilia.titulo",
      defaultMessage: "Taducciones Familia",
    }),

    query: [
      {
        columnName: "model.id",
        value: `'${modelId}'`,
        exact: true,
      },
    ],
    extraPostBody: {
      model: { id: modelId },
    },

    columns: [
      {
        name: "idioma",
        title: props.intl.formatMessage({
          id: "Idiomas.titulo",
          defaultMessage: "Idioma",
        }),
        getCellValue: (row) => row.idioma?.description ?? "",
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "descripción",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Idiomas.titulo",
          defaultMessage: "Idiomas",
        }),
        type: "LOV",
        key: "idioma",
        id: "idiomes",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "idiomas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "nomComercial",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            {
              title: props.intl.formatMessage({
                id: "Comun.descripcion",
                defaultMessage: "Descripción",
              }),
              name: "descripcio",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Traduccion.titulo",
          defaultMessage: "Traducción",
        }),
        type: "input",
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 9,
        },
      },
    ],
  };

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"Traducciones.titulo"}
          defaultMessage={"Traducciones Familia"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="categoriesTraduccio"
          responseKey="categoriaTraduccios"
          enabled={props.editMode}
          configuration={traducConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={ArticlesModelConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ARTICLE_MODEL_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(ARTICLE_MODEL_SECTION_INDEX)}
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
