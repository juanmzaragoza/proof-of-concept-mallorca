import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const GENERAL_SECTION_INDEX = 0;
const CATEGORIAS_SECTION_TAB_INDEX = 1;
const ALTERNATIVO_SECTION_TAB_INDEX = 2;
const CONTABILIDAD_SECTION_TAB_INDEX = 3;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [GENERAL_SECTION_INDEX]: false,
      [ALTERNATIVO_SECTION_TAB_INDEX]: true,
      [CONTABILIDAD_SECTION_TAB_INDEX]: true,
    },
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
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const generalConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 15),
        ...props.stringValidations.fieldExistsValidation(
          "articlesFact",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.titulo",
        defaultMessage: "Familia",
      }),
      type: "LOV",
      key: "familia",
      id: "articleFamilia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleFamilias",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      ...withRequiredValidation(),
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
        id: "Clientes.bloqueado",
        defaultMessage: "Bloqueado",
      }),
      type: "checkbox",
      key: "bloquejat",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.alias",
        defaultMessage: "Alias",
      }),
      type: "input",
      key: "alies",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosModelo.titulo",
        defaultMessage: "Modelo",
      }),
      type: "LOV",
      key: "model",
      id: "articlesModel",
      required: false,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleModels",
        labelKey: formatCodeAndDescription,
        sort: "codi",
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
      id: "articlesGama",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleGammas",
        labelKey: formatCodeAndDescription,
        sort: "codi",
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
      id: "articlesMarca",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articleMarcas",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.empresa",
        defaultMessage: "Empresas",
      }),
      type: "LOV",
      key: "empresa",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          {
            title: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            name: "nomComercial",
          },
        ],
        relatedWith: [
          {
            name: "projecte",
            filterBy: "empresa.id",
            keyValue: "id",
          },
          {
            name: "delegacio",
            filterBy: "empresa.id",
            keyValue: "id",
          },
        ],
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.delegacion",
        defaultMessage: "Delegación",
      }),
      type: "LOV",
      key: "delegacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "delegacios",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.crearReferencias",
        defaultMessage: "Crear referencias",
      }),
      type: "checkbox",
      key: "crearReferencies",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.agrupacionFacturas",
        defaultMessage: "Agrupación de facturas",
      }),
      type: "checkbox",
      key: "agrupacioFactures",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 11,
      },
      text: {
        multiline: 6,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 2000),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones",
      }),
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const alternativo = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.alternativo",
        defaultMessage: "Alternativo",
      }),
      type: "LOV",
      key: "alternatiu",
      id: "articlesFact",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "articles",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.alternativo2",
        defaultMessage: "Alternativo 2",
      }),
      type: "LOV",
      key: "alternatiu2",
      id: "articleFact",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "articles",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.alternativoRaee",
        defaultMessage: "Alternativo Raee",
      }),
      type: "LOV",
      key: "articleRaee",
      id: "articlesFactRae",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "articles",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      extraQuery: [
        {
          columnName: "familia.codi",
          value: `"RAEE"`,
          exact: true,
        },
      ],
      validationType: "object",
    },
  ];

  const contabilidad = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Retenciones.cuentaCompras",
        defaultMessage: "Cuenta compras",
      }),
      type: "input",
      key: "compteCompres",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.ventas",
        defaultMessage: "Cuenta ventas",
      }),
      type: "input",
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.cuentaExistencias",
        defaultMessage: "Cuenta existencias",
      }),
      type: "input",
      key: "compteExistencies",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"SerieVenta.datosContables"}
          defaultMessage={"Datos Contables"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={contabilidad}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(CONTABILIDAD_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(CONTABILIDAD_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },

    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Articulos.alternativos"}
          defaultMessage={"Alternativos"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={alternativo}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(ALTERNATIVO_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(ALTERNATIVO_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Presupuestos.articulo"}
              defaultMessage={"Artículo"}
            />
          }
        >
          <GenericForm
            formComponents={generalConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(GENERAL_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(GENERAL_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
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
