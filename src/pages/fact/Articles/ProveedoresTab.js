import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

import { useTabForm } from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const PRECIO_PROVEEDOR_SECTION_TAB_INDEX = 1;

const ProveedoresTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: true,
      [PRECIO_PROVEEDOR_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const COMERCIALNAME = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });
  const NAME = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const PROVEEDOR = props.intl.formatMessage({
    id: "Proveedores.proveedor",
    defaultMessage: "Proveedor",
  });
  const DIVISA = props.intl.formatMessage({
    id: "Proyectos.divisa",
    defaultMessage: "Divisa",
  });
  const CODARTPRO = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.codigoArticuloProveedor",
    defaultMessage: "Código artículo proveedor",
  });
  const PRECIOCOSTE = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.precioCoste",
    defaultMessage: "Precio coste",
  });
  const DIASESPERA = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.diasEspera",
    defaultMessage: "Días espera",
  });
  const ULTIMACOMPRA = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimaCompra",
    defaultMessage: "Última compra",
  });
  const ULTIMOPRECIOCOMPRA = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimoPrecioCompra",
    defaultMessage: "Último precio Compra",
  });
  const ULTIMODTO = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimoDto",
    defaultMessage: "Último dto (%)",
  });
  const ULTIMODTO2 = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimoDto2",
    defaultMessage: "Último dto 2 (%)",
  });
  const OBS = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.observaciones",
    defaultMessage: "Observaciones",
  });
  const ULTIMOPRECOMP = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimoPrecioComplementos",
    defaultMessage: "Último precio complementos",
  });
  const ULTIMODIACARGOCOMP = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.ultimoDiaCargoComplementos",
    defaultMessage: "Último día cargo complementos",
  });
  const PRECIONETO = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor.precioNeto",
    defaultMessage: "Precio neto €",
  });

  const { id: articulosId } = useParams();

  const aSCodeAndComercialName = [
    { title: CODE, name: "codi" },
    { title: COMERCIALNAME, name: "nomComercial" },
  ];

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NAME, name: "nom" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.proveedores.proveedorHabitual",
        defaultMessage: "Proveedor habitual",
      }),
      type: "LOV",
      key: "proveidor",
      id: "suppliers",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "proveidors",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndComercialName,
      },
    },
  ];

  const TITLE = props.intl.formatMessage({
    id: "Articulos.proveedores.preciosProveedor",
    defaultMessage: "Precios proveedor",
  });

  const precioProveedor = {
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
        name: "proveidor",
        title: PROVEEDOR,
        getCellValue: (row) =>
          row.proveidor.description ? row.proveidor.description : "",
      },
      { name: "codi", title: CODARTPRO },
      {
        name: "actualitzarPreuCostArticle",
        title: PRECIOCOSTE,
        getCellValue: (row) =>
          row.actualitzarPreuCostArticle &&
          row.actualitzarPreuCostArticle === true ? (
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
      { name: "diesEsperaEntrega", title: DIASESPERA },
      {
        name: "ultimDiaCompra",
        title: ULTIMACOMPRA,
        getCellValue: (row) =>
          row.ultimDiaCompra
            ? new Date(row.ultimDiaCompra).toLocaleDateString()
            : "",
      },
      { name: "ultimPreuCompra", title: ULTIMOPRECIOCOMPRA },
      { name: "ultimDescompte", title: ULTIMODTO },
      { name: "ultimDescomptePp", title: ULTIMODTO2 },
      { name: "preuNetExtraField", title: PRECIONETO },
    ],
    formComponents: [
      {
        placeHolder: PROVEEDOR,
        type: "LOV",
        key: "proveidor",
        id: "suppliers",
        required:true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "proveidors",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndComercialName,
        },
        validationType:"object",
        validations:[...props.commonValidations.requiredValidation()]
      },
      {
        placeHolder: CODARTPRO,
        type: "input",
        key: "codi",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [
  
          ...props.stringValidations.minMaxValidation(1, 20),
        ],
      },
      {
        placeHolder: DIVISA,
        type: "LOV",
        key: "divisa",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: PRECIOCOSTE,
        type: "checkbox",
        key: "actualitzarPreuCostArticle",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: DIASESPERA,
        type: "numeric",
        key: "diesEsperaEntrega",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
      },
      {
        placeHolder: ULTIMACOMPRA,
        type: "date",
        key: "ultimDiaCompra",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: ULTIMOPRECIOCOMPRA,
        type: "numeric",
        key: "ultimPreuCompra",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
      },
      {
        placeHolder: ULTIMOPRECOMP,
        type: "numeric",
        key: "ultimPreuComplements",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
      },
      {
        placeHolder: ULTIMODTO,
        type: "numeric",
        key: "ultimDescompte",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
      },
      {
        placeHolder: ULTIMODTO2,
        type: "numeric",
        key: "ultimDescomptePp",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
      },
      {
        placeHolder: ULTIMODIACARGOCOMP,
        type: "date",
        key: "ultimDiaCarrecComplements",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },


      {
        placeHolder: PRECIONETO,
        type: "numeric",
        disabled: true,
        key: "preuNetExtraField",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
      },
      {
        placeHolder: OBS,
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [
         
          ...props.stringValidations.minMaxValidation(1, 1000),
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
          id="proveidorsArticle"
          responseKey="proveidorArticles"
          enabled={props.editMode}
          configuration={precioProveedor}
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
              id={"FamiliaArticulos.titulo"}
              defaultMessage={"Familia"}
            />
          }
        >
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
            handleIsValid={(value) => addValidity(CREATE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
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
export default compose(React.memo, withValidations, injectIntl)(ProveedoresTab);
