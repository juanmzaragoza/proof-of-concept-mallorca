import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import ExpandableGrid from "modules/ExpandableGrid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";
import { useParams } from "react-router";

const AREA_NEGOCIO_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [AREA_NEGOCIO_SECTION_INDEX]: false,
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

  const { id: areaId } = useParams();

 
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
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

  const areasConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "areaNegocis",
          "codi",
          CODE
        ),
      ]),
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.codigoContable",
        defaultMessage: "Código Contable",
      }),
      type: "input",
      key: "comptabilitatCodi",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.cuentaExistencias",
        defaultMessage: "cuenta Existencias",
      }),
      type: "input",
      key: "comptabilitatCompteExistencies",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.cuentaAlmacen",
        defaultMessage: "cuenta Almacén",
      }),
      type: "input",
      key: "compteMagatzem",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.cuentaCostes",
        defaultMessage: "Cuenta Costes",
      }),
      type: "input",
      key: "comptabilitatCompteCostos",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.cuentaCliente",
        defaultMessage: "Cuenta Cliente",
      }),
      type: "input",
      key: "comptabilitatCompteClients",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AreasNegocio.cuentaProveedor",
        defaultMessage: "Cuenta Proveedor",
      }),
      type: "input",
      key: "comptabilitatCompteProveidors",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "AreasNegocio.cuentaObraEjecutada",
          defaultMessage: "cuenta Obra Ejecutada pendiente certificar",
        }),
        type: "input",
        key: "compteObraExecutada",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 10)],
      },
  ];

  const seriesConfig = {
    title: props.intl.formatMessage({
      id: "AreasNegocio.tabs.series",
      defaultMessage: "Series del Área",
    }),
    query: [
      {
        columnName: "areaNegoci.id",
        value: `"${areaId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      areaNegoci: { id: `${areaId}` },
    },

    columns: [
      {
        name: "serieVenda.pk.codi",
        title: props.intl.formatMessage({
          id: "Presupuestos.codigoSerieVenta",
          defaultMessage: "Código Serie Venta",
        }),
        getCellValue: (row) => row?.serieVenda?.pk.codi || "",
      },
      {
        name: "serieVenda.description",
        title: props.intl.formatMessage({
          id: "Presupuestos.serieVenta",
          defaultMessage: "Serie Venta",
        }),
        getCellValue: (row) => row?.serieVenda?.description || "",
      },

    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.fact.serie",
          defaultMessage: "Serie",
        }),
        type: "LOV",
        key: "serieVenda",
        id:"serie",
        noEditable:true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "serieVendas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
    ],
  };

  return (
    <Grid container>
      <Grid xs={12} item>

          <GenericForm
            formComponents={areasConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(AREA_NEGOCIO_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(AREA_NEGOCIO_SECTION_INDEX)}
            {...props}
          />


        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AreasNegocio.tabs.series"}
              defaultMessage={"Series"}
            />
          }
        >
          <ExpandableGrid
            id="seriesAreaNegoci"
            responseKey="serieAreaNegocis"
            enabled={props.editMode}
            configuration={seriesConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
