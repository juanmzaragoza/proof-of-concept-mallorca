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

const COMPANY_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { COMPANY_SECTION_INDEX: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const { id: groupCompanyId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });



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
          "empresesGrup",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: NOM,

      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
  ];

  const companyConfig = {
    title: props.intl.formatMessage({
      id: "GruposEmpresas.tabs.empresasGrupo",
      defaultMessage: "Empresas del Grupo",
    }),

    query: [
      {
        columnName: "grupEmpreses.id",
        value: `'${groupCompanyId}'`,
        exact: true,
      },
    ],
    extraPostBody: {
      grupEmpreses: { id: groupCompanyId },
    },

    columns: [
      {
        name: "empresa",
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa",
        }),
        getCellValue: (row) => row.empresa?.description ?? "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.empresas",
          defaultMessage: "Empresas",
        }),
        type: "LOV",
        key: "empresa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
          sort: "nomFiscal",
          cannotCreate: true,
          advancedSearchColumns: [
            {
              title: props.intl.formatMessage({
                id: "Comun.codigo",
                defaultMessage: "Código",
              }),
              name: "codi",
            },
            {
              title: props.intl.formatMessage({
                id: "Comun.nombre",
                defaultMessage: "Nombre",
              }),
              name: "nomFiscal",
            },
          ],
        },
      },
    ],
  };

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"GruposEmpresas.tabs.empresasGrupo"}
          defaultMessage={"Empresas del Grupo"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="empresesGrupEmpreses"
          responseKey="empresaGrupEmpreseses"
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
          formComponents={createConfiguration}
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
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
