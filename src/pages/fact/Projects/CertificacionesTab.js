import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const CertificacionesTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const { id: projectId } = useParams();

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
  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const certificaciones = {
    title: props.intl.formatMessage({
      id: "Proyectos.certificaciones",
      defaultMessage: "Certificaciones",
    }),
    query: [
      {
        columnName: "projecte.id",
        value: `"${projectId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      projecte: { id: `${projectId}` },
    },

    columns: [
      {
        name: "numeroCertificat",
        title: props.intl.formatMessage({
          id: "Clientes.Documentos.numero",
          defaultMessage: "Número",
        }),
      },
      {
        name: "dataCertificat",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        getCellValue: (row) =>
          row.dataCertificat
            ? new Date(row.dataCertificat).toLocaleDateString()
            : "",
      },
      {
        name: "valorCertificacio",
        title: props.intl.formatMessage({
          id: "Proyectos.valor",
          defaultMessage: "Valor ",
        }),
      },
      {
        name: "baseImposable",
        title: props.intl.formatMessage({
          id: "Proveedores.Documentos.baseImponible",
          defaultMessage: "Base Imponible",
        }),
      },
      {
        name: "iva",
        title: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
      },
      {
        name: "totalCertificacio",
        title: props.intl.formatMessage({
          id: "Proyectos.total",
          defaultMessage: "Total",
        }),
      },

      {
        name: "divisa",
        title: props.intl.formatMessage({
          id: "Divisas.titulo",
          defaultMessage: "Divisa",
        }),
        getCellValue: (row) => row.divisa && row.divisa?.description,
      },
      {
        name: "valorDivisaEuros",
        title: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa",
        }),
        hidden: true,
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
          id: "Clientes.Documentos.numero",
          defaultMessage: "Numero",
        }),
        type: "input",
        key: "numeroCertificat",
        noEditable:true,
        required:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
        
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Documentos.fecha",
          defaultMessage: "Fecha",
        }),
        type: "date",
        required:true,
        key: "dataCertificat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.valor",
          defaultMessage: "Valor",
        }),
        type: "input",
        key: "valorCertificacio",
        breakpoints: {
          xs: 12,
          md: 3,
        },

        
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Documentos.baseImponible",
          defaultMessage: "Base Imponible",
        }),
        type: "input",
        key: "baseImposable",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.iva",
          defaultMessage: "IVA",
        }),
        type: "input",
        key: "iva",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.total",
          defaultMessage: "Total",
        }),
        type: "input",
        required:true,
        noEditable:true,
        key: "totalCertificacio",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: formatCodeAndName,
          sort: "nom",
          advancedSearchColumns: aSCodeAndName,
          creationComponents: [
            ...codeAndName(4, 4),
            {
              type: "input",
              key: "valorEuros",
              placeHolder: props.intl.formatMessage({
                id: "Divisa.valor_euros",
                defaultMessage: "Valor Euros",
              }),
              required: true,
              breakpoints: {
                xs: 12,
                md: 4,
              },
            },
          ],
        },
        validationType: "object",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisas",
        }),
        type: "input",
        required:true,
        key: "valorDivisaEuros",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
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
              id={"Proyectos.certificaciones"}
              defaultMessage={"Certificaciones"}
            />
          }
        >
          <ExpandableGrid
            id="certificatsProjecte"
            responseKey="certificatProjectes"
            enabled={props.editMode}
            configuration={certificaciones}
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
)(CertificacionesTab);
