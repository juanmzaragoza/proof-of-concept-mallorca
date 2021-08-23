import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import { tipusCost } from "redux/api";

const ALMACEN_SECTION_INDEX = 0;

const VariosTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ALMACEN_SECTION_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

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

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostalVol",
      id:"codiPostal",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      selector: {
        key: "codiPostals",
        labelKey: (data) =>
          `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
            data.codi
          })`,
        sort: "codi",
        transform: {
          apply: (codiPostals) => codiPostals && codiPostals.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País",
            }),
            type: "LOV",
            key: "pais",
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              relatedWith: [{
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },],
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia",
            }),
            type: "LOV",
            key: "provincia",
            required: false,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName,
            },
          },
          {
            type: "input",
            key: "municipi",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "poblacio",
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];



  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const contabilidadConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.ejercicio",
        defaultMessage: "Ejercicio",
      }),
      type: "input",
      key: "exerciciComptable",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.diario",
        defaultMessage: "Diario",
      }),
      type: "input",
      key: "diariComptable",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.asiento",
        defaultMessage: "Asiento",
      }),
      type: "numeric",
      key: "asiento",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.facturaRegimA",
        defaultMessage: "Factura Régimen Agrario",
      }),
      type: "checkbox",
      key: "facturaRegimAgrari",
      breakpoints: {
        xs: 12,
        md: 5,
      },
    },
  ];

  const maquinaConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.maquina",
        defaultMessage: "Máquina Código",
      }),
      type: "input",
      key: "maquinaCodi",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const reparacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.averias",
        defaultMessage: "Averias",
      }),
      type: "LOV",
      key: "avaria",
      id: "avaries",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "avarias",
        labelKey: (data) => `${data.descripcioAvaria} (${data.num})`,
        sort: "num",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "num" },
          { title: DESCRIPCIO, name: "descripcioAvaria" },
        ],
      },
      validationType: "object",
    },
  ];

  const tipusCostConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.tipoCoste",
        defaultMessage: "Tipo Coste",
      }),
      type: "LOV",
      key: "tipusCost",

      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "tipusCosts",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const voluminoso = [
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.nombreVolumen",
        defaultMessage: "Nombre Volumen ",
      }),
      type: "input",
      key: "nomVol",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 40)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.telefonoVolumen",
        defaultMessage: "Teléfono Volumen ",
      }),
      type: "input",
      key: "telefonVol",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.voluminoso",
        defaultMessage: "Voluminoso ",
      }),
      type: "switch",
      key: "vol",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.direccionVolumen",
        defaultMessage: "Dirección Volumen ",
      }),
      type: "input",
      key: "direccioVol",
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    ...codiPostal(4)

  ];

  const complementoConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.fechaComple",
        defaultMessage: "Fecha Compl. ",
      }),
      type: "date",
      key: "diadistribucioComplements",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const clienteConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.albaran",
        defaultMessage: "Albarán",
      }),
      type: "LOV",
      key: "albara",
      id:"albarans",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "albaras",
        labelKey: (data) => `${data.serieVenda.pk.codi}/ ${data.numero}`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesProveedor.tipoCoste"}
              defaultMessage={"Tipo Comisión"}
            />
          }
        >
          <GenericForm
            formComponents={tipusCostConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.parteReparacion"}
              defaultMessage={"Parte Reparación"}
            />
          }
        >
          <GenericForm
            formComponents={reparacionConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>

      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.maquinaria"}
              defaultMessage={"Maquinaria"}
            />
          }
        >
          <GenericForm
            formComponents={maquinaConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesProveedor.complementos"}
              defaultMessage={" complementos"}
            />
          }
        >
          <GenericForm
            formComponents={complementoConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>

      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.contabilidad"}
              defaultMessage={"contabilidad"}
            />
          }
        >
          <GenericForm
            formComponents={contabilidadConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>

      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"PedidosProveedores.voluminoso"}
              defaultMessage={"Voluminoso"}
            />
          }
        >
          <GenericForm
            formComponents={voluminoso}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={4} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesProveedor.cliente"}
              defaultMessage={" Cliente"}
            />
          }
        >
          <GenericForm
            formComponents={clienteConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(ALMACEN_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(ALMACEN_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(VariosTab);
