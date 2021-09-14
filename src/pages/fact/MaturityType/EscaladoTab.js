import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
const EscaladoTab = ({ formData, setFormData, getFormData, ...props }) => {
  // warning!!! It's always valid because we haven't validations
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: tipusVencimentId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPTION, name: "descripcio" },
  ];

  const EscaladosConfig = {
    title: props.intl.formatMessage({
      id: "TiposVencimiento.escalado",
      defaultMessage: "Escalado",
    }),
    query: [
      {
        columnName: "tipusVenciment.id",
        value: `"${tipusVencimentId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      tipusVenciment: { id: tipusVencimentId },
    },
    columns: [
      {
        name: "tipusVenciment000",
        title: props.intl.formatMessage({
          id: "TiposVencimiento.titulo",
          defaultMessage: "Tipos Vencimiento",
        }),
      },
      {
        name: "tipusVenciment",
        title: props.intl.formatMessage({
          id: "TiposVencimiento.tipo",
          defaultMessage: "Tipo",
        }),
        getCellValue: (row) =>
          row.tipusVenciment && row.tipusVenciment?.description,
      },
      {
        name: "imports",
        title: props.intl.formatMessage({
          id: "TiposVencimiento.importe",
          defaultMessage: "Importe",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.tvencimiento",
          defaultMessage: "Tipo Vencimiento",
        }),
        type: "LOV",
        key: "tipusVenciment000",
        id: "tipusVenciment",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "tipusVenciments",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          creationComponents: [
            {
              type: "input",
              key: "codi",
              placeHolder: CODE,
              required: true,
              noEditable: true,
              breakpoints: {
                xs: 12,
                md: 4,
              },
            },
            {
              type: "input",
              key: "nom",
              placeHolder: NOM,
              required: true,
              breakpoints: {
                xs: 12,
                md: 4,
              },
            },
            {
              type: "input",
              key: "tipus",
              placeHolder: props.intl.formatMessage({
                id: "TiposVencimiento.tipos",
                defaultMessage: "Tipos",
              }),
              required: true,
              breakpoints: {
                xs: 12,
                md: 4,
              },
            },
          ],
          advancedSearchColumns: aSCodeAndDescription,
          transform: {
            apply: (tipusVenciments) => tipusVenciments && tipusVenciments.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
        },
        extraQuery: [
          {
            columnName: "tipus",
            value: `"ESCALAT"`,
            diference: true,
          },
        ],
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "TiposVencimiento.importe",
          defaultMessage: "Importe",
        }),
        type: "numeric",
        key: "imports",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 999999999999),
        ],
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"TiposVencimiento.titulo"}
              defaultMessage={"Tarifas"}
            />
          }
        >
          <ExpandableGrid
            id="escalatsTipusVenciment"
            responseKey="escalatTipusVenciments"
            enabled={props.editMode}
            configuration={EscaladosConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(EscaladoTab);
