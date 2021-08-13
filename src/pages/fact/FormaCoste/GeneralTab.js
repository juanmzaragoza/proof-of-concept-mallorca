import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";
import { useTabForm } from "hooks/tab-form";
import OutlinedContainer from "modules/shared/OutlinedContainer";

const FORMA_COSTE_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [FORMA_COSTE_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const { id: FormaCosteId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });
  const TYPE = props.intl.formatMessage({
    id: "TiposVencimiento.tipo",
    defaultMessage: "Tipo",
  });

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];


  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;


  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndType = [
    { title: CODE, name: "codi" },
    { title: TYPE, name: "tipus" },
  ];
  const formatCodeAndType = (data) => `${data.tipus} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const suppliersConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 4),
        ...props.stringValidations.fieldExistsValidation(
          "formesCost",
          "codi",
          CODE
        ),
      ]),
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 60),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.actualizar",
        defaultMessage: "Actualizar Precio",
      }),
      type: "checkbox",
      key: "actualitzarPreu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.costes.tipoCoste",
        defaultMessage: "Tipo coste",
      }),
      type: "LOV",
      key: "tipusCost",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusCosts",
        labelKey: formatCodeAndType,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndType,
      },
      validationType: "object",
      ...withRequiredValidation([]),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        creationComponents: [
          ...codeAndName(4, 4),
          {
            type: "input",
            key: "valorEuros",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosUbicacion.articulo.titulo",
        defaultMessage: "Articulo",
      }),
      type: "LOV",
      key: "article",
      id: "articlesFact",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articles",
        labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      ...withRequiredValidation([]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.precioCoste",
        defaultMessage: "Precio Coste",
      }),
      type: "numeric",
      key: "preuCost",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ]),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.pesoMaximo",
        defaultMessage: "Peso Maximo",
      }),
      type: "numeric",
      key: "pesMaximKg",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "Kg",
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.volumenMaximo",
        defaultMessage: "Volumen Maximo",
      }),
      type: "numeric",
      key: "volumMaximM3",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      suffix: "m3",
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
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
    },
  ];

  const costesTeoricos = {
    title: props.intl.formatMessage({
      id: "FormasCoste.costeTeorico",
      defaultMessage: "Costes Teóricos",
    }),
    query: [
      {
        columnName: "formaCost.id",
        value: `"${FormaCosteId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      formaCost: { id: `${FormaCosteId}` },
    },

    columns: [
      {
        name: "tipusCostCodi",
        title: props.intl.formatMessage({
          id: "FormasCoste.tipoCosteCodigo",
          defaultMessage: "Aplicación",
        }),
      },

      {
        name: "article",
        title: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        getCellValue: (row) => row.article && row.article?.description,
      },
      {
        name: "unitats",
        title: props.intl.formatMessage({
          id: "FormasCoste.unidades",
          defaultMessage: "Unidades",
        }),
      },
      {
        name: "aplicacioCodi",
        title: props.intl.formatMessage({
          id: "FormasCoste.costeUnitario",
          defaultMessage: "Coste Unitario",
        }),
      },
      {
        name: "aactualitzarCostArticlectiu",
        title: props.intl.formatMessage({
          id: "FormasCoste.actualizarCoste",
          defaultMessage: "Actualizar Coste Art.",
        }),
        getCellValue: (row) =>
          row.actualitzarCostArticle && row.actualitzarCostArticle === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "FormasCoste.tipoCosteCodigo",
          defaultMessage: "Cödigo Tipo coste",
        }),
        type: "input",
        key: "tipusCostCodi",
        noEditable: true,
        disabled: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        type: "LOV",
        key: "article",
        id: "articlesFact",
        required: true,
        breakpoints: {
          xs: 12,
          md: 10,
        },
        noEditable: true,
        selector: {
          key: "articles",
          labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "descripcioCurta" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FormasCoste.unidades",
          defaultMessage: "Unidades ",
        }),
        type: "numeric",
        key: "unitats",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 99999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FormasCoste.actualizarCoste",
          defaultMessage: "Actualizar Coste Art.",
        }),
        type: "checkbox",
        key: "actualitzarCostArticle",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },

      {
        placeHolder: OBS,
        type: "observations",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
    ],
  };

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"FormasCoste.costeTeorico"}
          defaultMessage={"Coste Teorico"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="costos"
          responseKey="costs"
          enabled={props.editMode}
          configuration={costesTeoricos}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={suppliersConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(FORMA_COSTE_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(FORMA_COSTE_SECTION_INDEX)}
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
