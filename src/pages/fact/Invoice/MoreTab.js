import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { TDOC_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const INVOICE_SECTION_INDEX = 0;
const FACT_ELECT_SECTION_TAB_INDEX = 1;
const RECT_ELECT_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INVOICE_SECTION_INDEX]: true,
      [FACT_ELECT_SECTION_TAB_INDEX]: true,
      [RECT_ELECT_SECTION_TAB_INDEX]: true,
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
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
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

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
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

  const otrosDatosConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.nombreCliente3",
        defaultMessage: "Nombre Cliente 3",
      }),
      type: "input",
      key: "nomFiscalClient3",

      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.paisNif3",
        defaultMessage: "País NIF 3",
      }),
      type: "LOV",
      key: "paisNif3",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "paisNifs",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (pais) => pais && pais.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        creationComponents: [
          ...codeAndName(6, 6),
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tamanyNif",
              defaultMessage: "tamanyNif",
            }),
            type: "input",
            key: "tamanyNif",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 30)],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tipoDoc",
              defaultMessage: "Tipo Documento",
            }),
            type: "select",
            key: "tipusNif",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              options: TDOC_SELECTOR_VALUES,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.nif3",
        defaultMessage: "NIF 3",
      }),
      type: "input",
      key: "nif3",

      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const oficinaContable = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "ofiCmp",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOfiCmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domOfiCmp",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const organoGestor = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "orgGes",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalOrgGes",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domOrgGes",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const unidadTramitadora = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Empresas.codigo",
        defaultMessage: "Código",
      }),
      type: "input",
      key: "uniTrm",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.codigoPostal",
        defaultMessage: "Código postal",
      }),
      type: "input",
      key: "codiPostalUniTrm",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.domicilio",
        defaultMessage: "Domicilio",
      }),
      type: "input",
      key: "domUniTrm",
      breakpoints: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const factEleConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "clsFactEle",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descDto1",
        defaultMessage: "Desc. dto 1",
      }),
      type: "input",
      key: "dtoDes",
      breakpoints: {
        xs: 12,
        md: 9,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.numRegistro",
        defaultMessage: "Num. Registro Fact.Electrónico",
      }),
      type: "input",
      key: "numRegFacEle",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      disabled: true,
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descDto2",
        defaultMessage: "Desc. dto 2",
      }),
      type: "input",
      key: "dtoDes2",
      breakpoints: {
        xs: 12,
        md: 8,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.motivoRet",
        defaultMessage: "Motivo retención",
      }),
      type: "input",
      key: "mtuRet",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  
  ];

  const rectificacionesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.serie",
        defaultMessage: "Serie",
      }),
      type: "input",
      key: "rctSer",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.numero",
        defaultMessage: "Número",
      }),
      type: "numeric",
      key: "rctNum",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 9999999999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.codigoMotivo",
        defaultMessage: "Código Motivo",
      }),
      type: "input",
      key: "rctCodMtu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.fechaInicio",
        defaultMessage: "Fecha Inicio",
      }),
      type: "date",
      key: "rctDataIni",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.fechaFin",
        defaultMessage: "Fecha Fin",
      }),
      type: "date",
      key: "rctDataFin",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descMotivo",
        defaultMessage: "Descripción Motivo",
      }),
      type: "input",
      key: "rctDesMtu",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 130)],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Facturas.criterioRte",
          defaultMessage: "Criterio Rectificación ",
        }),
        type: "input",
        key: "rctCri",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 2)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Facturas.criterioDesc",
          defaultMessage: "Criterio Descripción",
        }),
        type: "input",
        key: "rctCriDes",
        breakpoints: {
          xs: 12,
          md: 10,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 80)],
      },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Clientes.tabs.facturacionElect"}
          defaultMessage={"Facturación electrónico"}
        />
      ),
      key: 0,
      component: (
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <GenericForm
              formComponents={factEleConfig}
              emptyPaper={true}
              editMode={props.editMode}
              getFormData={getFormData}
              setFormData={setFormData}
              loading={props.loading}
              formErrors={props.formErrors}
              submitFromOutside={props.submitFromOutside}
              onSubmit={() => props.onSubmitTab(formData)}
              handleIsValid={(value) =>
                addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)
              }
              onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
              {...props}
            />
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.ofiContable"}
                  defaultMessage={"Ofinica Contable"}
                />
              }
            >
              <GenericForm
                formComponents={oficinaContable}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.orgGestor"}
                  defaultMessage={"Órgano Gestor"}
                />
              }
            >
              <GenericForm
                formComponents={organoGestor}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
          <Grid xs={4} item>
            <OutlinedContainer
              className="general-tab-container"
              title={
                <FormattedMessage
                  id={"Clientes.fact.unidadTramitadora"}
                  defaultMessage={"Unidad Tramitadora"}
                />
              }
            >
              <GenericForm
                formComponents={unidadTramitadora}
                emptyPaper={true}
                editMode={props.editMode}
                getFormData={getFormData}
                setFormData={setFormData}
                loading={props.loading}
                formErrors={props.formErrors}
                submitFromOutside={props.submitFromOutside}
                onSubmit={() => props.onSubmitTab(formData)}
                handleIsValid={(value) =>
                  addValidity(FACT_ELECT_SECTION_TAB_INDEX, value)
                }
                onBlur={(e) => handleTouched(FACT_ELECT_SECTION_TAB_INDEX)}
                {...props}
              />
            </OutlinedContainer>
          </Grid>
        </Grid>
      ),
    },
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Facturas.rectificaciones"}
          defaultMessage={"Rectificaciones"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={rectificacionesConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(RECT_ELECT_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(RECT_ELECT_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={otrosDatosConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(INVOICE_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(INVOICE_SECTION_INDEX)}
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
