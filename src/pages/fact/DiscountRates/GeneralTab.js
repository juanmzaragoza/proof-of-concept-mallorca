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

const VALORES_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [VALORES_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

  const { id: tarifaID } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

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
          "tipusFacturacio",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: DESCRIPTION,

      type: "input",
      key: "descripcio",
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
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
    },
  ];

  const valoresConfig = {
    title: props.intl.formatMessage({
      id: "TarifaDescuentos.tabs.valores",
      defaultMessage: "Valores Tarifa",
    }),

    query: [
      {
        columnName: "tarifaDescompte.id",
        value: `'${tarifaID}'`,
        exact: true,
      },
    ],
    extraPostBody: {
      tarifaDescompte: { id: tarifaID },
    },

    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "article",
        title: props.intl.formatMessage({
          id: "ArticulosUbicacion.articulo.titulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) => row.article?.description ?? "",
      },
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.titulo",
          defaultMessage: "Familia",
        }),
        getCellValue: (row) => row.articleFamilia?.description ?? "",
      },
      {
        name: "descompte001",
        title: props.intl.formatMessage({
          id: "TarifasDescuento.desc1",
          defaultMessage: "Descuento 1",
        }),
      },
      {
        name: "descompte002",
        title: props.intl.formatMessage({
          id: "TarifasDescuento.desc2",
          defaultMessage: "Descuento 2",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: CODE,

        type: "numeric",
        key: "codi",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        noEditable: true,
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(1, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosUbicacion.articulo.titulo",
          defaultMessage: "Articulo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.titulo",
          defaultMessage: "Familia",
        }),
        type: "LOV",
        key: "articleFamilia",
        required: true,
        disabled: true,
        breakpoints: {
          xs: 12,
          md: 5,
        },
        selector: {
          key: "articleFamilias",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "TarifasDescuento.desc1",
          defaultMessage: "DEscuento 1",
        }),
        type: "numeric",
        key: "descompte001",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        decimalScale: 2,
        fixedDecimalScale: true,
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 100)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "TarifasDescuento.desc2",
          defaultMessage: "DEscuento 2",
        }),
        type: "numeric",
        key: "descompte002",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        suffix: "%",
        decimalScale: 2,
        fixedDecimalScale: true,
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 100)],
      },
    ],
  };

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"TarifaDescuentos.tabs.valores"}
          defaultMessage={"Valores Tarifas"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="valorsTarifaDescompte"
          responseKey="valorTarifaDescomptes"
          enabled={props.editMode}
          configuration={valoresConfig}
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
          handleIsValid={(value) => addValidity(VALORES_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(VALORES_SECTION_INDEX)}
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
