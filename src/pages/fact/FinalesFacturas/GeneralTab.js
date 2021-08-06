import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { Chip } from "@material-ui/core";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import ExpandableGrid from "modules/ExpandableGrid";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {TIPO_DIR_COMERCIALES_SELECTOR_VALUES} from "constants/selectors"

const FINAL_FACTURA_SECTION_INDEX = 0;
const LINEAS_SECTION_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [FINAL_FACTURA_SECTION_INDEX]: false,
      [LINEAS_SECTION_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const { id: finalFacturaId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const DESCRIPTION = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const ACT = props.intl.formatMessage({
    id: "FinalFacturas.activo",
    defaultMessage: "Activo",
  });

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "finalFactura",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: ACT,
      type: "checkbox",
      key: "actiu",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: DESCRIPTION,
      type: "input",
      key: "descripcio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 1000)],
    },
  ];

  const traducConfig = {
    title: props.intl.formatMessage({
      id: "FinalFacturas.lineas",
      defaultMessage: "Lineas",
    }),

    query: [
      {
        columnName: "finalFactura.id",
        value: `'${finalFacturaId}'`,
        exact: true,
      },
    ],
    extraPostBody: {
      finalFactura: { id: finalFacturaId },
    },

    columns: [
      {
        name: "ordre",
        title: props.intl.formatMessage({
          id: "FinalFacturas.posicion",
          defaultMessage: "Posición",
        }),
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "FinalFacturas.titulos",
          defaultMessage: "Título",
        }),
      },
      {
        name: "formula",
        title: props.intl.formatMessage({
          id: "FinalFacturas.formula",
          defaultMessage: "Fórmula",
        }),
      },
      {
        name: "aplicaTotal",
        title: props.intl.formatMessage({
          id: "FinalFacturas.aplicarTotal",
          defaultMessage: "Aplicar Total",
        }),
        getCellValue: (row) =>
          row.aplicaTotal && row.aplicaTotal === "S" ? (
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
        name: "cncFactura",
        title: props.intl.formatMessage({
          id: "FinalFacturas.cncFactura",
          defaultMessage: "Campo de la Factura",
        }),
      },
      {
        name: "imprimir",
        title: props.intl.formatMessage({
          id: "FinalFacturas.imprimir",
          defaultMessage: "Imprimir",
        }),
        getCellValue: (row) =>
          row.imprimir && row.imprimir === "S" ? (
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
        name: "importFacturat",
        title: props.intl.formatMessage({
          id: "FinalFacturas.importeFacturado",
          defaultMessage: "Importe Facturado",
        }),
        getCellValue: (row) =>
          row.importFacturat && row.importFacturat === "S" ? (
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
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.posicion",
          defaultMessage: "Posición",
        }),
        type: "numeric",
        key: "ordre",
        required: true,
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(1, 99999999999999999999),
          ...props.stringValidations.fieldExistsValidation(
            "liniesFinalFactura",
            "ordre",
            CODE
          ),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.titulos",
          defaultMessage: "Título",
        }),
        type: "input",
        key: "nom",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(1, 60),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.cncFactura",
          defaultMessage: "Campo de la Factura",
        }),
        type: "input",
        key: "cncFactura",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.formula",
          defaultMessage: "Fórmula",
        }),
        type: "input",
        key: "formula",
        breakpoints: {
          xs: 12,
          md: 10,
        },
        validationType: "string",
        validations: [...props.numberValidations.minMaxValidation(0, 250)],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.imprimir",
          defaultMessage: "Imprimir",
        }),
        type: "select",
        required:true,
        key: "imprimir",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        selector:{
            options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
        ],
   
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.aplicarTotal",
          defaultMessage: "Aplicar Total",
        }),
        type: "switch",
        key: "aplicaTotal",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
  
      {
        placeHolder: props.intl.formatMessage({
          id: "FinalFacturas.importeFacturado",
          defaultMessage: "Importe Facturado",
        }),
        type: "switch",
        key: "importFacturat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
    ],
  };

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"FinalFacturas.lineas"}
          defaultMessage={"Líneas Final Facturas"}
        />
      ),
      key: 0,
      component: (
        <ExpandableGrid
          id="liniesFinalFactura"
          responseKey="liniaFinalFacturas"
          enabled={props.editMode}
          configuration={traducConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
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
          handleIsValid={(value) =>
            addValidity(FINAL_FACTURA_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(FINAL_FACTURA_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
