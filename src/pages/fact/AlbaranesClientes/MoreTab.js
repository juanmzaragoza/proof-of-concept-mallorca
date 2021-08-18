import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const ALMACEN_SECTION_INDEX = 0;
const CONTAB_SECTION_TAB_INDEX = 1;
const TIPO_COM_SECTION_INDEX = 2;
const APLICADOR_SECTION_INDEX = 3;
const MAQUINARIA_COM_SECTION_INDEX = 4;
const IMPRESION_SECTION_INDEX = 5;
const AVERIA_SECTION_INDEX = 6;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [ALMACEN_SECTION_INDEX]: false,
      [CONTAB_SECTION_TAB_INDEX]: true,
      [TIPO_COM_SECTION_INDEX]: true,
      [APLICADOR_SECTION_INDEX]: true,
      [MAQUINARIA_COM_SECTION_INDEX]: true,
      [IMPRESION_SECTION_INDEX]: true,
      [AVERIA_SECTION_INDEX]: true,
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

 

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const almacenConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.periodo",
        defaultMessage: "Período",
      }),
      type: "LOV",
      key: "magatzemPeriode",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "magatzemPeriodes",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.puntoVenta",
        defaultMessage: "Puntos Venta",
      }),
      type: "LOV",
      required: true,
      key: "puntVenda",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "puntVendas",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.zona",
        defaultMessage: "Zona",
      }),
      type: "LOV",
      key: "zona",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      selector: {
        key: "zonas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.bultos",
        defaultMessage: "bultos",
      }),
      type: "numeric",
      key: "bultos",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.kilos",
        defaultMessage: "Kilos",
      }),
      type: "numeric",
      key: "kilos",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999)],
    },
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
        id: "AlbaranesCliente.fechaRevision",
        defaultMessage: "fecha Revision",
      }),
      type: "date",
      key: "dataRevisio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.importe",
        defaultMessage: "Importe ",
      }),
      type: "numeric",
      key: "numRevisio",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 99999999999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.revisado",
        defaultMessage: "Revisado",
      }),
      type: "checkbox",
      key: "revisat",
      breakpoints: {
        xs: 12,
        md: 3,
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

  const tipoComisionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.tipoComision",
        defaultMessage: "Tipo comisión",
      }),
      type: "LOV",
      key: "tipusComissio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "tipusComissios",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ];

  const aplicadorConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.aplicadores",
        defaultMessage: "Aplicadores",
      }),
      type: "LOV",
      key: "aplicador",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "aplicadors",
        labelKey: (data) => `${data.nom} ${data.cognoms}`,
        sort: "aplicador",
        cannotCreate: true,
      },
    },
  ];

  const impresionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesCliente.fechaImpresion",
        defaultMessage: "Fecha Impresión",
      }),
      type: "date",
      key: "diaImpressio",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={8} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.almacen"}
              defaultMessage={"Almacén"}
            />
          }
        >
          <GenericForm
            formComponents={almacenConfig}
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
            handleIsValid={(value) =>
              addValidity(CONTAB_SECTION_TAB_INDEX, value)
            }
            onBlur={(e) => handleTouched(CONTAB_SECTION_TAB_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.tipoComision"}
              defaultMessage={"Tipo Comisión"}
            />
          }
        >
          <GenericForm
            formComponents={tipoComisionConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(TIPO_COM_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(TIPO_COM_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.aplicador"}
              defaultMessage={"Aplciador "}
            />
          }
        >
          <GenericForm
            formComponents={aplicadorConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(APLICADOR_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(APLICADOR_SECTION_INDEX)}
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
            handleIsValid={(value) =>
              addValidity(MAQUINARIA_COM_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(MAQUINARIA_COM_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={3} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"AlbaranesCliente.impresionAlbaran"}
              defaultMessage={"impresionAlbaran"}
            />
          }
        >
          <GenericForm
            formComponents={impresionConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(IMPRESION_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(IMPRESION_SECTION_INDEX)}
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
            handleIsValid={(value) => addValidity(AVERIA_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(AVERIA_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
