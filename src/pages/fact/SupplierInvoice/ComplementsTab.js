import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_DESCUENTO_SELECTOR_VALUES } from "constants/selectors";
import { Chip } from "@material-ui/core";

const ComplementsTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: supplierInvoiceId } = useParams();


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

  const complementFacturaProveidor = {
    title: props.intl.formatMessage({
      id: "FacturasProveedor.complementos",
      defaultMessage: "Complementos  ",
    }),
    query: [
      {
        columnName: "facturaProveidor.id",
        value: `"${supplierInvoiceId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      facturaProveidor: { id: `${supplierInvoiceId}` },
    },
    columns: [
      {
        name: "complementFactura",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.complemento",
          defaultMessage: "Complemento",
        }),
        getCellValue: (row) =>
          row.complementFactura && row.complementFactura?.description,
      },
      {
        name: "imports",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.importe",
          defaultMessage: "Importe",
        }),
      },

      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.IVA",
          defaultMessage: "IVA",
        }),
        getCellValue: (row) => row.iva && row.iva?.description,
      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.cuentaContable",
          defaultMessage: "Cuenta Contable",
        }),
      },
      {
        name: "incrementarFactura",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.incrementarFactura",
          defaultMessage: "Incrementar Factura",
        }),
        getCellValue: (row) =>
          row.incrementarFactura && row.incrementarFactura === true ? (
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
      {
        name: "incrementarBaseImposable",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.incrementarBase",
          defaultMessage: "Incrementar Base",
        }),
        getCellValue: (row) =>
          row.incrementarBaseImposable &&
          row.incrementarBaseImposable === true ? (
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
      {
        name: "aplicarDescompte",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.aplicarDto",
          defaultMessage: "Aplicar Descuento",
        }),
        getCellValue: (row) =>
          row.aplicarDescompte && row.aplicarDescompte === true ? (
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
        hidden: true,
      },
      {
        name: "distribuirCostosEntreArticles",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.distribuirCosteArt",
          defaultMessage: "Distribuir Coste entre Artículos",
        }),
        getCellValue: (row) =>
          row.distribuirCostosEntreArticles &&
          row.distribuirCostosEntreArticles === true ? (
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
        hidden: true,
      },
      {
        name: "fechaAplicacioDistribucioCostos",
        title: props.intl.formatMessage({
          id: "FacturasProveedor.diaDistribucion",
          defaultMessage: "Día Distribución",
        }),
        getCellValue: (row) =>
          row.fechaAplicacioDistribucioCostos
            ? new Date(row.fechaAplicacioDistribucioCostos).toLocaleDateString()
            : "",
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
          id: "FacturasProveedor.complementoFactura",
          defaultMessage: "Complemento Factura",
        }),
        type: "LOV",
        key: "complementFactura",
        id:"complementsFactura",
        required: true,
        noEditable:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "complementFacturas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: "descripcio",
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
                id: "Comun.descripcion",
                defaultMessage: "descripción",
              }),
              name: "descripcio",
            },
          ],
        },
        validationType: "object",
        ...withRequiredValidation([]),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.importe",
          defaultMessage: "Importe",
        }),
        type: "numeric",
        key: "imports",
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
          id: "FacturasProveedor.incrementarFactura",
          defaultMessage: "IncrementarFactura",
        }),
        type: "checkbox",
        key: "incrementarFactura",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.incrementarBase",
          defaultMessage: "Incrementar Base",
        }),
        type: "checkbox",
        key: "incrementarBaseImposable",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Iva.titulo",
          defaultMessage: "IVA",
        }),
        type: "LOV",
        key: "iva",
        id: "ivaFact",
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
      },
  
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.cuentaContable",
          defaultMessage: "Cuenta contable",
        }),
        type: "input",
        key: "compteContable",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations:[
          ...props.stringValidations.minMaxValidation(0, 10),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.diaDistribucion",
          defaultMessage: "Día Distribución",
        }),
        type: "date",
        key: "fechaAplicacioDistribucioCostos",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.aplicarDto",
          defaultMessage: "Aplicar Descuento",
        }),
        type: "checkbox",
        key: "aplicarDescompte",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FacturasProveedor.distribuirCosteArt",
          defaultMessage: "Distribuir Coste entre artículos",
        }),
        type: "checkbox",
        key: "distribuirCostosEntreArticles",
        breakpoints: {
          xs: 12,
          md: 2,
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
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"FacturasProveedor.complementos"}
              defaultMessage={"Complementos"}
            />
          }
        >
          <ExpandableGrid
            id="complementFacturaProveidor"
            responseKey="complementFacturaProveidors"
            enabled={props.editMode}
            configuration={complementFacturaProveidor}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(ComplementsTab);
