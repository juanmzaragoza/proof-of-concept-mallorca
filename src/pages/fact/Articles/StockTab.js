import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { CLASIFICACION_SELECTOR_VALUES } from "constants/selectors";

import { useTabForm } from "hooks/tab-form";

const STOCK_SECTION_INDEX = 0;
const DESCUENTO_SECTION_INDEX = 1;

const StockTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { [STOCK_SECTION_INDEX]: false, [DESCUENTO_SECTION_INDEX]: true },
    setIsValid: props.setIsValid,
  });

  const { id: articulosId } = useParams();

  const TITLE = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.titulo",
    defaultMessage: "Descuentos",
  });
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const ALMACEN = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.almacen",
    defaultMessage: "Almacén",
  });
  const UBICACION = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.ubicacion",
    defaultMessage: "Ubicación",
  });
  const STOCKMIN = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.stockMin",
    defaultMessage: "Stock mínimo",
  });
  const STOCKMAX = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.stockMax",
    defaultMessage: "Stock máximo",
  });
  const DIAULTIMACOMPRA = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.diaUltimaCompra",
    defaultMessage: "Día última compra",
  });
  const ULTIMOPRECIOCOSTE = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.ultimoPrecioCoste",
    defaultMessage: "Último precio coste",
  });

  const PRECIOCOSTEEXIST = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.precioCosteExistencias",
    defaultMessage: "Precio coste existencias",
  });
  const ULTIMOAJUSTEINVENT = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.ultimoAjusteInventario",
    defaultMessage: "Último ajuste inventario",
  });
  const ULTIMOPRECIOCOMPLEMENT = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.ultimoPrecioComplemento",
    defaultMessage: "Último precio complemento",
  });
  const ULTIMAIMPUTACIONPCOSTESCOMPLEMENT = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.ultimaImputacionCostesImplementados",
    defaultMessage: "Última imputación costes implementados",
  });
  const PRECIOCOSTEEXISTCOMPL = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.precioCosteExistenciasYComplementos",
    defaultMessage: "Precio coste existencias y complementos",
  });
  const DEMANDAMEDIAANUAL = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.demandaMediaAnual",
    defaultMessage: "Demanda media anual",
  });
  const DIASESPERAPEDIDO = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.diasEsperaPedido",
    defaultMessage: "Días de espera del pedido",
  });
  const COSTEALMACENAMINETO = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.costeAlmacenamiento",
    defaultMessage: "Coste almacenamiento",
  });
  const LOTEECONOMICO = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.loteEconomico",
    defaultMessage: "Lote económico",
  });
  const STOCKSEGURIDAD = props.intl.formatMessage({
    id: "Articulos.stock.descuentos.stockSeguridad",
    defaultMessage: "Stock de seguridad",
  });

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

  const StockConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.factorConversionEntrada",
        defaultMessage: "Factor de conversion entrada",
      }),
      type: "numeric",
      required: true,
      key: "factorConversioEntrada",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.factorConversionSalida",
        defaultMessage: "Factor de conversion salida",
      }),
      type: "numeric",
      required: true,
      key: "factorConversioSortida",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.stockMinimoGlobal",
        defaultMessage: "Stock mínimo global",
      }),
      type: "numeric",
      key: "stockMinimGlobal",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 99999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.stockMaximoGlobal",
        defaultMessage: "Stock máximo global",
      }),
      type: "numeric",
      key: "stockMaximGlobal",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 99999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.controlStock",
        defaultMessage: "Stock máximo global",
      }),
      type: "checkbox",
      key: "controlStock",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.noAvisarSinExistencias",
        defaultMessage: "No avisar sin existencias",
      }),
      type: "checkbox",
      key: "noAvisarSense",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.descuentos.select.titulo",
        defaultMessage: "Clasificación",
      }),
      type: "select",
      key: "clasificacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: CLASIFICACION_SELECTOR_VALUES,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.stock.consultarArticulosSinMovimientos",
        defaultMessage: "Consultar artículos sin movimientos",
      }),
      type: "checkbox",
      key: "consultarArticlesSenseMoviments",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const Descuentos = {
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
      {
        name: "magatzem",
        title: ALMACEN,
        getCellValue: (row) =>
          row.magatzem.description ? row.magatzem.description : "",
      },
      { name: "ubicacio", title: UBICACION },
      { name: "estocMin", title: STOCKMIN },
      { name: "estocMax", title: STOCKMAX },
      {
        name: "diaUltimaCompra",
        title: DIAULTIMACOMPRA,
        getCellValue: (row) =>
          row.diaUltimaCompra
            ? new Date(row.diaUltimaCompra).toLocaleDateString()
            : "",
      },
      { name: "ultimPreuCost", title: ULTIMOPRECIOCOSTE },
    ],
    formComponents: [
      {
        placeHolder: ALMACEN,
        type: "LOV",
        key: "magatzem",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "magatzems",
          labelKey: (data) => `${data.codi} ( ${data.nom} )`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: UBICACION,
        type: "input",
        key: "ubicacio",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 30)],
      },
      {
        placeHolder: STOCKMIN,
        type: "numeric",
        key: "estocMin",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: STOCKMAX,
        type: "numeric",
        key: "estocMax",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: PRECIOCOSTEEXIST,
        type: "numeric",
        key: "preuCostExistencies",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: DIAULTIMACOMPRA,
        type: "date",
        key: "diaUltimaCompra",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: ULTIMOPRECIOCOSTE,
        type: "numeric",
        key: "ultimPreuCost",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: ULTIMOAJUSTEINVENT,
        type: "date",
        key: "ultimAjustInventari",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: ULTIMOPRECIOCOMPLEMENT,
        type: "numeric",
        key: "ultimPreuComplement",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999999999),
        ],
      },
      {
        placeHolder: ULTIMAIMPUTACIONPCOSTESCOMPLEMENT,
        type: "date",
        key: "ultimaImputacioCostosComplements",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: PRECIOCOSTEEXISTCOMPL,
        type: "numeric",
        key: "preuCostExistenciesAmbComplements",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
      {
        placeHolder: DEMANDAMEDIAANUAL,
        type: "numeric",
        key: "demandaMitjanaAnual",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 99999999999),
        ],
      },
      {
        placeHolder: DIASESPERAPEDIDO,
        type: "numeric",
        key: "diesEsperaDemanat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [...props.numberValidations.minMaxValidation(0, 9999)],
      },
      {
        placeHolder: COSTEALMACENAMINETO,
        type: "numeric",
        key: "costEmmagatzematge",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999999),
        ],
      },
      {
        placeHolder: LOTEECONOMICO,
        type: "numeric",
        key: "lotEconomic",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999999),
        ],
      },
      {
        placeHolder: STOCKSEGURIDAD,
        type: "numeric",
        key: "estocDeSeguretat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999999),
        ],
      },
    ],
  };

  const tabs = [
    {
      label: TITLE,
      key: 0,
      component: (
        <ExpandableGrid
          id="magatzemsArticlesFact"
          responseKey="magatzemArticleFacts"
          enabled={props.editMode}
          configuration={Descuentos}
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
              id={"Articulos.tab.stock"}
              defaultMessage={"Stock"}
            />
          }
        >
          <GenericForm
            formComponents={StockConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(STOCK_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(STOCK_SECTION_INDEX)}
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

export default compose(React.memo, withValidations, injectIntl)(StockTab);
