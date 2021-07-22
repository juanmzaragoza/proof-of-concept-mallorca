import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

import { DIMENSION_SELECTOR_VALUES } from "../../../constants/selectors";

const PRESENTACION_SECTION_INDEX = 0;
const DIMENSIONES_SECTION_TAB_INDEX = 1;
const MULTIPLOS_SECTION_TAB_INDEX = 2;

const PresentacionTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[PRESENTACION_SECTION_INDEX]: false, [DIMENSIONES_SECTION_TAB_INDEX]:false, 
    [MULTIPLOS_SECTION_TAB_INDEX]: false}, setIsValid: props.setIsValid});

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre" });
  const DESCRIPTION = props.intl.formatMessage({ id: "Comun.descripcion", defaultMessage: "Descripción" });
  const COMERCIALNAME = props.intl.formatMessage({ id: "Presupuestos.nombreComercialCliente", defaultMessage: "Nombre Comercial" });

  const code = (md = 2) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
    validationType: "string",
    validations: [
      ...props.stringValidations.minMaxValidation(1, 4),
      ...props.stringValidations.fieldExistsValidation('categoriesToxicologiques', 'codi', CODE)
    ],
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const formatCodeAndComercialName = (data) => `${data.nomComercial} (${data.codi})`;

  const aSCodeAndComercialName = [{title: CODE, name: 'codi'},{title: COMERCIALNAME, name: 'nomComercial'}];

  const aSCodeAndName = [ { title: CODE, name: "codi" }, { title: NOM, name: "nom" } ];

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPTION, name: 'descripcio'}];

  const categoriaToxicologica = (md = 3) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.categoriaToxicologica",
        defaultMessage: "Categoría toxicológica",
      }),
      type: "LOV",
      key: "categoriaToxicologica",
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      selector: {
        key: "categoriaToxicologicas",
        labelKey: (data) =>
          `${data.empresaCodi} ( ${data.nom} )`,
        sort: "codi",
        creationComponents: [
          code(2),
          {
            type: "input",
            key: "nom",
            placeHolder: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 4)
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "PieDocumento.empresa",
              defaultMessage: "Empresa"
            }),
            type: 'LOV',
            key: 'empresaCodi',
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: 'empresas',
              labelKey: formatCodeAndComercialName,
              sort: 'nomComercial',
              cannotCreate: true,
              transform: {
                apply: (empresa) => empresa && empresa.codi,
                reverse: (rows, codi) => rows.find(row => row.codi === codi)
              },
              advancedSearchColumns: aSCodeAndComercialName
            }
          },
          {
            type: "input",
            key: "observacions",
            placeHolder: props.intl.formatMessage({
              id: "FamiliaProveedores.observaciones",
              defaultMessage: "Observaciones",
            }),
            breakpoints: {
              xs: 12,
              md: 10,
            },
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "PieDocumento.titulo",
              defaultMessage: "Pies Documentos",
            }),
            type: "LOV",
            key: "peuDocument",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              key: "peuDocuments",
              labelKey: formatCodeAndDescription,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndDescription,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  const subvencion = (md = 3) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.subvencion",
        defaultMessage: "Subvención",
      }),
      type: "LOV",
      key: "subvencions",
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      selector: {
        key: "subvencios",
        labelKey: (data) => `${data.codi} ( ${data.nom} )`,
        sort: "codi",
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 4),
              ...props.stringValidations.fieldExistsValidation('subvencions', 'codi', CODE)
            ],
          },
          {
            type: "input",
            key: "nom",
            placeHolder: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 30),
            ],
          },
          {
            type: "input",
            key: "origen",
            placeHolder: props.intl.formatMessage({
              id: "Subvencion.origen",
              defaultMessage: "Origen",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 30),
            ],
          },
          {
            type: "input",
            key: "preuPerKilo",
            placeHolder: props.intl.formatMessage({
              id: "Subvencion.precioPorKilo",
              defaultMessage: "NoPrecio por kilombre",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  const presentacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.tipoUnidad",
        defaultMessage: "Tipo de unidad",
      }),
      type: "input",
      key: "unitatTipus",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.unidadEnvase",
        defaultMessage: "Unidades envase",
      }),
      type: "numeric",
      key: "unitatsEnvas",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.envase",
        defaultMessage: "Envase",
      }),
      type: "input",
      key: "envas",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 15)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.nEtiquetas",
        defaultMessage: "Nº etiquetas",
      }),
      type: "numeric",
      key: "nombreEtiquetes",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.pesoUnidad",
        defaultMessage: "Peso por unidad",
      }),
      type: "numeric",
      key: "pesUnitat",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.unidadBasica",
        defaultMessage: "Unidades básicas",
      }),
      type: "numeric",
      key: "unitatsBasiques",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.titulo",
        defaultMessage: "Presentación",
      }),
      type: "input",
      key: "presentacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 30)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.paginaCatalogo",
        defaultMessage: "Página catálogo",
      }),
      type: "input",
      key: "paginaCataleg",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 8)
      ],
    },
    ...categoriaToxicologica(3),
    ...subvencion(3),
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.uniMetMinCompra",
        defaultMessage: "Unidades met. min. compra",
      }),
      type: "numeric",
      key: "uniMetMinimesCompra",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.uniMetMinVenta",
        defaultMessage: "Unidades met. min. venta",
      }),
      type: "numeric",
      key: "uniMetMinimesVenda",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.nRegistro",
        defaultMessage: "Nº registro",
      }),
      type: "input",
      key: "nombreRegistre",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 15)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.cultivo",
        defaultMessage: "Cultivo",
      }),
      type: "input",
      key: "cultiu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 15)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.categoria",
        defaultMessage: "Categoría",
      }),
      type: "input",
      key: "categoria",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 15)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.adr",
        defaultMessage: "ADR",
      }),
      type: "checkbox",
      key: "adr",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const Dimensiones = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.dimensiones.titulo",
        defaultMessage: "Dimensiones"
      }),
      type: 'select',
      key: 'dimensions',
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: DIMENSION_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.dimensiones.largo",
        defaultMessage: "Largo",
      }),
      type: "numeric",
      key: "llarg",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.dimensiones.ancho",
        defaultMessage: "Ancho",
      }),
      type: "numeric",
      key: "ample",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.dimensiones.alto",
        defaultMessage: "Alto",
      }),
      type: "numeric",
      key: "alt",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
  ];

  const Multiplos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.multiplos.multipleVentas",
        defaultMessage: "Múltiple ventas",
      }),
      type: "numeric",
      key: "multipleVenda",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.multiplos.minimoVentas",
        defaultMessage: "Mínimo ventas",
      }),
      type: "numeric",
      key: "minimVenda",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.multiplos.multipleCompras",
        defaultMessage: "Múltiple compras",
      }),
      type: "numeric",
      key: "multipleCompra",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.presentacion.multiplos.minimoCompras",
        defaultMessage: "Mínimo compras",
      }),
      type: "numeric",
      key: "minimCompra",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.presentacion.dimensiones.titulo"} defaultMessage={"Dimensiones"}/>,
      key: 0,
      component: <GenericForm formComponents={Dimensiones}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(DIMENSIONES_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(DIMENSIONES_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.presentacion.multiplos.titulo"} defaultMessage={"Múltiplos"}/>,
      key: 1,
      component: <GenericForm formComponents={Multiplos}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(MULTIPLOS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(MULTIPLOS_SECTION_TAB_INDEX)}
                              {...props} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Articulos.tab.presentacion"} defaultMessage={"Presentación"}/>}>
          <GenericForm formComponents={presentacionConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(PRESENTACION_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(PRESENTACION_SECTION_INDEX)}
                       {...props} />
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(PresentacionTab);
