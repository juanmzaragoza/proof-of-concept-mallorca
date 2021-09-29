import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;


const DocumentFooterTab = ({
  formData,
  setFormData,
  getFormData,
  ...props
}) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: false,

    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "codi",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "peusDocument",
          "codi",
          CODE
        ),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      type: "input",
      key: "descripcio",
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
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.pie",
        defaultMessage: "Pie",
      }),
      type: "input",
      key: "pie",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 8,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 1000)],
    },
  ];

  const checkConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.albaran",
        defaultMessage: "Albaranes",
      }),
      type: "checkbox",
      key: "albara",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.facturas",
        defaultMessage: "Facturas",
      }),
      type: "checkbox",
      key: "factura",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.presupuestos",
        defaultMessage: "Presupuestos",
      }),
      type: "checkbox",
      key: "pre",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.pedidos",
        defaultMessage: "Pedidos",
      }),
      type: "checkbox",
      key: "com",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.certificaciones",
        defaultMessage: "Certificaciones",
      }),
      type: "checkbox",
      key: "imprimirPeuCertificacio",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.reparaciones",
        defaultMessage: "Reparaciones",
      }),
      type: "checkbox",
      key: "avr",
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.orden",
        defaultMessage: "Orden",
      }),
      type: "numeric",
      key: "ordre",
      breakpoints: {
        xs: 6,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    // {
    //   placeHolder: props.intl.formatMessage({
    //     id: "PieDocumento.serieCompra",
    //     defaultMessage: "Series de Compra",
    //   }),
    //   type: "input",
    //   key: "serieCompraCodi",
    //   breakpoints: {
    //     xs: 6,
    //     md: 3,
    //   },
    //   validationType: "string",
    //   validations: [...props.stringValidations.minMaxValidation(1, 2)],
    // },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.serieCompra",
        defaultMessage: "Serie compra",
      }),
      type: "LOV",
      key: "serieCompraCodi",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "serieCompras",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "descripcio",
        cannotCreate: true,
        transform: {
          apply: (serieCompras) => serieCompras && serieCompras.codi,
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
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa",
      }),

      type: "LOV",
      key: "empresa2",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "empresas",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        cannotCreate: true,
        transform: {
          apply: (empresa) => empresa && empresa.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          {
            title: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            name: "nomComercial",
          },
        ],
      },
    },

     
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.imprimirClase",
        defaultMessage: "Imprimir Clase",
      }),
      type: "checkbox",
      key: "impCls",
      breakpoints: {
        xs: 6,

        md: 2,

 
      },
    },
  ];




  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"PieDocumento.titulo"}
              defaultMessage={"Pies Documentos"}
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
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"PieDocumento.imprimirEn"}
              defaultMessage={"Imprimir en..."}
            />
          }
        >
          <GenericForm
            formComponents={checkConfiguration}
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
    
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(DocumentFooterTab);
