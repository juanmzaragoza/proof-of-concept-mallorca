import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import { Chip } from "@material-ui/core";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations, withDependentActions } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import {
  RAPPEL_SELECTOR_VALUES,
  TIPO_RAPPEL_SELECTOR_VALUES,
} from "constants/selectors";

const PRECIO_SECTION_INDEX = 0;
const DESCUENTOS_SECTION_INDEX = 1;
const RAPPEL_SECTION_INDEX = 2;
const PRECIO_VOLUMEN_SECTION_INDEX = 3;

const PriceTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [PRECIO_SECTION_INDEX]: false,
      [DESCUENTOS_SECTION_INDEX]: true,
      [RAPPEL_SECTION_INDEX]: true,
      [PRECIO_VOLUMEN_SECTION_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const { id: articulosId } = useParams();

  const ARTICLE = props.intl.formatMessage({
    id: "Presupuestos.articulo",
    defaultMessage: "Artículo",
  });
  const ENVAS = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.envase",
    defaultMessage: "Envase",
  });

  const TITLE = props.intl.formatMessage({
    id: "Articulos.precio.precioPorVolumen",
    defaultMessage: "Precio por volumen",
  });
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const INFLIM = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.limiteInferior",
    defaultMessage: "Límite inferior",
  });
  const SUPLIM = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.limiteSuperior",
    defaultMessage: "Límite superior",
  });
  const PRICE = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.precio",
    defaultMessage: "Precio",
  });
  const APLDTO = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.aplicarDescuento",
    defaultMessage: "Aplicar descuento",
  });
  const DTO1 = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.descuento1",
    defaultMessage: "Descuento 1",
  });
  const DTO2 = props.intl.formatMessage({
    id: "Articulos.precio.preciosPorVolumen.descuento2",
    defaultMessage: "Descuento 2",
  });

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
    validationType: "string",
    validations: [
      ...props.stringValidations.minMaxValidation(1, 4),
      ...props.stringValidations.fieldExistsValidation("ivaFact", "codi", CODE),
    ],
  });

  const aSArticleAndEnvas = [
    { title: ARTICLE, name: "article.description" },
    { title: ENVAS, name: "envas.description" },
  ];

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

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

  const fireActionOnBlur = props.articles.fireOnChangePrice;
  const fireActionOnBlurChange = props.articles.fireOnChangeUpdate;

  const iva = (md = 2) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id: "ivaFact",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      // fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "ivas",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        creationComponents: [
          code(2),
          {
            placeHolder: DESCRIPCIO,
            type: "input",
            key: "descripcio",
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 30)],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Clientes.porcentaje.iva",
              defaultMessage: "Porcentaje IVA",
            }),
            type: "numeric",
            key: "percentatgeIva",
            required: true,
            breakpoints: {
              xs: 12,
              md: 2,
            },
            validationType: "number",
          },
          {
            type: "input",
            key: "percentatgeRecarrecEquivalencia",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.recargo.equivalencia",
              defaultMessage: "Recargo equivalencia",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 2,
            },
          },
          {
            type: "input",
            key: "codiComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.codigoContab",
              defaultMessage: "Código contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "codiRecarrecComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Iva.codigoRecCont",
              defaultMessage: "Código recargo contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.texto",
              defaultMessage: "Texto",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "checkbox",
            key: "notCreApu",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.notCreApu",
              defaultMessage: "No crear apunte sin importe 0",
            }),
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const preusConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.compra",
        defaultMessage: "Precio compra",
      }),
      type: "numeric",
      key: "preuCompra",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlurChange,
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento1Compra",
        defaultMessage: "Descuento 1 compra",
      }),
      type: "numeric",
      key: "dte1Compra",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlurChange,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento2Compra",
        defaultMessage: "Descuento 2 compra",
      }),
      type: "numeric",
      key: "dte2Compra",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlurChange,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCompraTeorico",
        defaultMessage: "Precio compra teórico",
      }),
      type: "input",
      disabled: true,
      key: "preuCompraTeo",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      fireActionOnBlurChange,
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteTeorico",
        defaultMessage: "Precio coste teórico",
      }),
      type: "input",
      disabled: true,
      key: "preuCostTeo",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      fireActionOnBlurChange,
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.fechaActualizacionPrecio",
        defaultMessage: "Fecha actualización precio",
      }),
      type: "date",
      key: "dataActualitzacioPreu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlurChange,
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen",
      }),
      type: "numeric",
      key: "marge",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      // fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecio",
        defaultMessage: "Decimales precio",
      }),
      type: "numeric",
      key: "decimalsPreu",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecioIva",
        defaultMessage: "Decimales precio con IVA",
      }),
      type: "numeric",
      key: "decimalsPreuIva",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      // fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioSinIva",
        defaultMessage: "Precio sin IVA",
      }),
      required: true,
      type: "numeric",
      key: "pvpFact",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    ...iva(2),
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteIva",
        defaultMessage: "Precio con IVA",
      }),
      type: "input",
      key: "preuIva",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      // fireActionOnBlur,
      fireActionOnBlurChange,
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteExistencias",
        defaultMessage: "Precio coste existencias",
      }),
      type: "numeric",
      key: "preuCostExistencies",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioMin",
        defaultMessage: "Precio mínimo",
      }),
      type: "numeric",
      key: "preuMin",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dtoMaxProFix",
        defaultMessage: "Descuento máximo proveedor ( fijo )",
      }),
      type: "numeric",
      key: "dteMaxProvFix",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dtoMaxProTemp",
        defaultMessage: "Descuento máximo proveedor ( temporal )",
      }),
      type: "numeric",
      key: "dteMaxProvTemp",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.puntoVerde",
        defaultMessage: "Punto verde",
      }),
      type: "numeric",
      key: "puntVerd",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.impuestosIncluidos",
        defaultMessage: "Impuestos incluidos",
      }),
      type: "checkbox",
      key: "impostosIncl",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const descuentos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte1",
        defaultMessage: "Descuento 1",
      }),
      type: "numeric",
      key: "dte1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte2",
        defaultMessage: "Descuento 2",
      }),
      type: "numeric",
      key: "dte2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte3",
        defaultMessage: "Descuento 3",
      }),
      type: "numeric",
      key: "dte3",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte4",
        defaultMessage: "Descuento 4",
      }),
      type: "numeric",
      key: "dte4",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte5",
        defaultMessage: "Descuento 5",
      }),
      type: "numeric",
      key: "dte5",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvpDescuento",
        defaultMessage: "P.V.P Dto",
      }),
      type: "input",
      disabled: true,
      key: "pvpDte",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      fireActionOnBlur,
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen",
      }),
      type: "input",
      disabled: true,
      key: "margeDte",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      fireActionOnBlur,
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte1Fab",
        defaultMessage: "Dto 1 fabricante",
      }),
      type: "numeric",
      key: "dte1Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte2Fab",
        defaultMessage: "Dto 2 fabricante",
      }),
      type: "numeric",
      key: "dte2Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte3Fab",
        defaultMessage: "Dto 3 fabricante",
      }),
      type: "numeric",
      key: "dte3Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte4Fab",
        defaultMessage: "Dto 4 fabricante",
      }),
      type: "numeric",
      key: "dte4Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte5Fab",
        defaultMessage: "Dto 5 fabricante",
      }),
      type: "numeric",
      key: "dte5Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      fireActionOnBlur,
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvpDescuentoFab",
        defaultMessage: "P.V.P con dto fabricante",
      }),
      type: "input",
      disabled: true,
      key: "pvpDteFab",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      fireActionOnBlur,
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen",
      }),
      type: "input",
      disabled: true,
      key: "margeDteFab",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      fireActionOnBlur,
      validationType: "string",
    },
  ];

  const rappel = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.rappel",
        defaultMessage: "Rappel",
      }),
      type: "select",
      key: "rappel",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: RAPPEL_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.valorRappel",
        defaultMessage: "Valor Rappel",
      }),
      type: "numeric",
      key: "valorRappel",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.tipoRappel",
        defaultMessage: "Tipo Rappel",
      }),
      type: "select",
      key: "rappelTipus",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: TIPO_RAPPEL_SELECTOR_VALUES,
      },
      validationType: "string",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.navegacionAutomatica",
        defaultMessage: "Navegación automática",
      }),
      type: "checkbox",
      key: "navegacioAutomatica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const precioPorVolumen = {
    title: TITLE,
    query: [
      {
        columnName: "article.id",
        value: `"${articulosId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      article: { id: articulosId },
    },
    columns: [
      { name: "limitInferior", title: INFLIM },
      { name: "limitSuperior", title: SUPLIM },
      { name: "preu", title: PRICE },
      {
        name: "aplicaDescompte",
        title: APLDTO,
        getCellValue: (row) =>
          row.aplicaDescompte && row.aplicaDescompte === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
              variant="outlined"
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
              variant="outlined"
            />
          ),
      },
      { name: "dte001", title: DTO1 },
      { name: "dte002", title: DTO2 },
      {
        name: "article.description",
        title: ARTICLE,
        getCellValue: (row) =>
          row.article.description ? row.article.description : "",
      },
    ],
    formComponents: [
      {
        type: "numeric",
        key: "codi",
        placeHolder: CODE,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(1, 4),
        ],
      },
      {
        placeHolder: INFLIM,
        type: "numeric",
        key: "limitInferior",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: SUPLIM,
        type: "input",
        key: "limitSuperior",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: PRICE,
        type: "numeric",
        key: "preu",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: APLDTO,
        type: "checkbox",
        key: "aplicaDescompte",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: DTO1,
        type: "input",
        key: "dte001",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: DTO2,
        type: "input",
        key: "dte002",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.precio.preciosPorVolumen.precioArticuloEnvase",
          defaultMessage: "Precio artículo envase",
        }),
        type: "LOV",
        key: "preuArticleEnvas",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "preuArticleEnvases",
          labelKey: (data) =>
            `${data.article.description} ( ${data.envas.description} )`,
          sort: "article",
          cannotCreate: true,
          relatedWith: [
            {
              name: "article",
              filterBy: "article.id",
              keyValue: "id",
            },
          ],
          advancedSearchColumns: aSArticleAndEnvas,
        },
        extraQuery: [
          {
            columnName: "article.id",
            value: `"${articulosId}"`,
            exact: true,
          },
        ],
        validationType: "object",
        ...withRequiredValidation(),
      },
    ],
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.descuentos"}
          defaultMessage={"Descuentos"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={descuentos}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(DESCUENTOS_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(DESCUENTOS_SECTION_INDEX)}
          {...props}
        />
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.fact.rappel"}
          defaultMessage={"Rappel"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={rappel}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(RAPPEL_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(RAPPEL_SECTION_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: TITLE,
      key: 2,
      component: (
        <ExpandableGrid
          id="preusPerVolum"
          responseKey="preuPerVolums"
          enabled={props.editMode}
          configuration={precioPorVolumen}
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
              id={"Presupuestos.precio"}
              defaultMessage={"Precio"}
            />
          }
        >
          <GenericForm
            formComponents={preusConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(PRECIO_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(PRECIO_SECTION_INDEX)}
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

export default compose(
  React.memo,
  withValidations,
  injectIntl,
  withDependentActions
)(PriceTab);
