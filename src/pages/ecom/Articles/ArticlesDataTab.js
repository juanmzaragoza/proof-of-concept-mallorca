import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";

import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const ARTICLE_SECTION_INDEX = 0;

const ArticlesDataTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [ARTICLE_SECTION_INDEX]: false },
    setIsValid: props.setIsValid,
  });

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");
  useEffect(() => {
    const familia = getString("familia");
    setFormData({
      key: "familiaCodi",
      value: familia ? familia.codi : "",
    });
  }, [getFormData("familia")]);

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

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };
  const articlesDataConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.fieldExistsValidation('articles', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
      ]
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "descripcioCurta",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulo.titulo",
        defaultMessage: "Título",
      }),
      type: "input",
      key: "titol",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 20)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.titulo",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "familia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleFamilias",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations:[
        ...props.commonValidations.requiredValidation(),]
      
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosModelo.titulo",
        defaultMessage: "Modelo",
      }),
      type: "LOV",
      key: "model",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleModels",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosGama.titulo",
        defaultMessage: "Gama",
      }),
      type: "LOV",
      key: "gamma",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleGammas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosMarca.titulo",
        defaultMessage: "Marca",
      }),
      type: "LOV",
      key: "marca",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleMarcas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.tipoUnidad",
        defaultMessage: "Tipo unidad",
      }),
      type: "input",
      key: "descripcioTipusUnitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.decimalesPrecio",
        defaultMessage: "Decimales precio",
      }),
      type: "numeric",
      key: "decimalsPreu",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 9)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio",
        defaultMessage: "Precio",
      }),
      type: "numeric",
      required: true,
      key: "pvp",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations:[...props.commonValidations.requiredValidation()]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Iva.titulo",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id: "iva",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "ivas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations:[...props.commonValidations.requiredValidation()]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.decimalesPrecioIva",
        defaultMessage: "Decimales precio IVA",
      }),
      type: "numeric",
      key: "decimalsPreuIva",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(1, 9)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precioIva",
        defaultMessage: "Precio IVA",
      }),
      type: "input",
      key: "preuAmbIva",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.urlImagen",
        defaultMessage: "Url imagen",
      }),
      type: "input",
      noEditable: true,
      key: "rutaInforme",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.bloqueado",
        defaultMessage: "Bloqueado",
      }),
      type: "checkbox",
      key: "bloquejat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descrpción",
      }),
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 8,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 2000),
      ]),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Articulos.tabs.datosArt"}
              defaultMessage={"datosArt"}
            />
          }
        >


          <GenericForm
            formComponents={articlesDataConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ARTICLE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ARTICLE_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(ArticlesDataTab);
