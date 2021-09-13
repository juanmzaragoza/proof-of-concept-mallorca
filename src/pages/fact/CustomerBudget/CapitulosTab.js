import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import ReactGrid from "modules/ReactGrid";
import * as API from "redux/api";
import MasterDetailGrid from "modules/ReactGrid/MasterDetailGrid";

const CapitulosTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: presupuestoId } = useParams();

  const presupuestoCodigo = getFormData("codi");

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const capitulosConfig = {
    title: props.intl.formatMessage({
      id: "Presupuestos.tabs.capitulos",
      defaultMessage: "Capítulos",
    }),
    query: [
      {
        columnName: "pressupostCodi",
        value: `"${presupuestoCodigo}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      pressupostCodi: `${presupuestoCodigo}`,
      empresaCodi: "",
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "referencia",
        title: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "referencia",
        }),
      },
      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
      },
      {
        name: "operariResponsableCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.gestor",
          defaultMessage: "Gestor",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "seriaVendaCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.serieVenta",
          defaultMessage: "serie Venta",
        }),
        hidden: true,
        inlineEditionDisabled: true,
      },

      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        type: "input",
        key: "codi",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation([
          ...props.stringValidations.minMaxValidation(0, 4),
        ]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.referencia",
          defaultMessage: "referencia",
        }),
        type: "input",
        key: "referencia",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(0, 20),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "numeric",
        key: "sequencia",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: props.numberValidations.minMaxValidation(
          0,
          999999999999999999999
        ),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "AlbaranesCliente.serieVenta",
          defaultMessage: "Serie Venta",
        }),
        type: "LOV",
        key: "serieVendaCodi",
        id: "serieVendas",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "serieVendas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
          transform: {
            apply: (serieVendas) => serieVendas && serieVendas.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
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
                id: "Comun.descripcion",
                defaultMessage: "Descripción",
              }),
              name: "descripcio",
            },
          ],
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        required: true,
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 250),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.gestor",
          defaultMessage: "Gestor",
        }),
        type: "LOV",
        key: "operariResponsableCodi",
        noEditable: true,
        id: "operari",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "operaris",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
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
              name: "nom",
            },
          ],
          transform: {
            apply: (operari) => operari && operari.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
      },
    ],
    URL: API.capitol,
    listKey: "capitols",
    disabledFiltering: true,
    disabledActions: true,
    enableInlineEdition: true,
    enableExpandableContent: true,
  };

  const partidasConfig = {
    title: props.intl.formatMessage({
      id: "Presupuestos.tabs.partidas",
      defaultMessage: "partidas",
    }),
    query: [
      {
        columnName: "pressupostCodi",
        value: `"${presupuestoCodigo}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      pressupostCodi: `${presupuestoCodigo}`,
      empresaCodi: "",
    },
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true,
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "capitol",
        title: props.intl.formatMessage({
          id: "Presupuesto.capitulo",
          defaultMessage: "Capítulo",
        }),
        getCellValue: (row) => row.capitol?.description ?? "",
        inlineEditionDisabled: true,
      },

      {
        name: "sequencia",
        title: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
      },

      {
        name: "operariResponsableCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.gestor",
          defaultMessage: "Gestor",
        }),
        hidden: true,
        inlineEditionDisabled: true,
      },
      {
        name: "seriaVendaCodi",
        title: props.intl.formatMessage({
          id: "Presupuestos.serieVenta",
          defaultMessage: "serie Venta",
        }),
        hidden: true,
        inlineEditionDisabled: true,
      },

      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
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
        ]),
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Clasificaciones.sequencia",
          defaultMessage: "Sequencia",
        }),
        type: "numeric",
        key: "sequencia",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: props.numberValidations.minMaxValidation(
          0,
          999999999999999999999
        ),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.capitulos",
          defaultMessage: "Capítulos",
        }),
        type: "LOV",
        key: "capitol",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "capitols",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
        },
        extraQuery: [
          {
            columnName: "pressupostCodi",
            value: `"${presupuestoCodigo}"`,
            exact: true,
          },
        ],
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "AlbaranesCliente.serieVenta",
          defaultMessage: "Serie Venta",
        }),
        type: "LOV",
        key: "serieVendaCodi",
        id: "serieVendas",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "serieVendas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
          transform: {
            apply: (serieVendas) => serieVendas && serieVendas.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
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
                id: "Comun.descripcion",
                defaultMessage: "Descripción",
              }),
              name: "descripcio",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.subcontratado",
          defaultMessage: "subcontratado",
        }),
        type: "checkbox",
        key: "subcontratat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.gestor",
          defaultMessage: "Gestor",
        }),
        type: "LOV",
        key: "operariResponsableCodi",
        noEditable: true,
        id: "operari",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "operaris",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
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
              name: "nom",
            },
          ],
          transform: {
            apply: (operari) => operari && operari.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.tipoUnidades",
          defaultMessage: "tipo Unidades",
        }),
        type: "input",
        key: "tipusUnitat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 4)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.unidades",
          defaultMessage: "Unidades",
        }),
        type: "numeric",
        key: "unitats",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.stringValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.valorSub",
          defaultMessage: "valor Sub",
        }),
        type: "numeric",
        key: "valorSub",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.stringValidations.minMaxValidation(0, 999999999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.fechaPrevision",
          defaultMessage: "Fecha Previsión",
        }),
        type: "date",
        key: "previsioEntrega",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
        type: "input",
        required: true,
        key: "descripcio",
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(0, 250),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuesto.previsionChequeada",
          defaultMessage: "prevision Chequeada",
        }),
        type: "checkbox",
        key: "previsioChequeada",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: "input",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 12,
        },
      },
    ],
    URL: API.partida,
    listKey: "partidas",
    enableInlineEdition: true,
    enableExpandableContent: false,
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Presupuestos.tabs.capitulosPartidas"}
              defaultMessage={"Capítulos - Partidas"}
            />
          }
        >
          <ReactGrid
            id="capitol"
            configuration={capitulosConfig}
            extraQuery={[
              {
                columnName: "pressupostCodi",
                value: `"${presupuestoCodigo}"`,
                exact: true,
              },
            ]}
          >
            {(expandedProps) => {
              console.log(expandedProps);
              const query = [
                {
                  columnName: "capitol.id",
                  value: `'${expandedProps.row.id}'`,
                  exact: true,
                },
              ];
              return (
                <MasterDetailGrid
                  id={"partida"}
                  extraQuery={query}
                  configuration={partidasConfig}
                  row={expandedProps.row}
                  onCancel={expandedProps.onCancel}
                  onSuccess={expandedProps.onSuccess}
                />
              );
            }}
          </ReactGrid>

          {/* <ExpandableGrid
            id="capitol"
            responseKey="capitols"
            enabled={props.editMode}
            configuration={capitulosConfig}
          /> */}
        </OutlinedContainer>
      </Grid>
      {/* <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Presupuestos.tabs.partidas"}
              defaultMessage={"Partidas"}
            />
          }
        >
          <ExpandableGrid
            id="partida"
            responseKey="partidas"
            enabled={props.editMode}
            configuration={partidasConfig}
          />
        </OutlinedContainer>
      </Grid> */}
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CapitulosTab);
