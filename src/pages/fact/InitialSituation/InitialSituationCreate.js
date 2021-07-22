import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const InitialSituationCreate = (props) => {
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

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "SituacionesIniciales.codigoAlmacen",
        defaultMessage: "Código Almacén",
      }),
      type: "LOV",
      key: "magatzemCodi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (magatzems) => magatzems && magatzems.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosUbicacion.articulo.titulo",
        defaultMessage: "Articulo",
      }),
      type: "LOV",
      key: "article",
      id: "articlesFact",
      noEditable: true,
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
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "classe",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(0, 1),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.unidadesIniciales",
        defaultMessage: "Unidades Iniciales",
      }),
      type: "input",
      key: "unitatsInicials",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.commonValidations.requiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.unidadesMetricas",
        defaultMessage: "Unidades Métricas Iniciales",
      }),
      type: "input",
      key: "unitatsMetriquesInicials",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      noEditable: true,
      required: true,
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
      placeHolder: props.intl.formatMessage({
        id: "Almacen.periodo",
        defaultMessage: "Período",
      }),
      type: "LOV",
      key: "magatzemPeriode",
      noEditable: true,
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzemPeriodes",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.precioCoste",
        defaultMessage: "Precio Coste Unitario",
      }),
      type: "input",
      key: "preuCostUnitari",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.valorDivisa",
        defaultMessage: "Valor Divisa Euro",
      }),
      type: "input",
      key: "valorDivisaEuro",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: props.commonValidations.requiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.numeroMovimientos",
        defaultMessage: "Num. Movimientos",
      }),
      type: "input",
      key: "numMoviments",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "SituacionesIniciales.titulo",
        defaultMessage: "Situaciones Iniciales ",
      })}
      formConfiguration={createConfiguration}
      url={API.situacionsInicial}
    />
  );
};

export default compose(withValidations, injectIntl)(InitialSituationCreate);
