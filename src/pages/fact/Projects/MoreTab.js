import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import {
  PRECIO_ALBARAN_SELECTOR_VALUES,
  TIPO_PROYECTO_ALBARAN_SELECTOR_VALUES,
  TIPO_RETENCION2_SELECTOR_VALUES,
  TIPO_CONTABILIZACION_SELECTOR_VALUES,
  TIPO_ESTADO_PROYECTO_SELECTOR_VALUES,
  TIPO_EJECUCION_PROYECTO_SELECTOR_VALUES,
} from "constants/selectors";

const PROJECT_SECTION_INDEX = 0;

const MoreTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [PROJECT_SECTION_INDEX]: false,
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
  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

  useEffect(() => {
    const codiPostal = getString("codiPostal");
    setFormData({
      key: "poblacio",
      value: codiPostal ? codiPostal.poblacio : "",
    });
  }, [getFormData("codiPostal")]);

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

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
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
              relatedWith: {
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },
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
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "poblacio" },
        ],
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

  const projectsConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.diarioContable",
        defaultMessage: "Diario contable",
      }),
      type: "input",
      key: "dricmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validation: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.zona",
        defaultMessage: "Zona"
      }),
      type: 'LOV',
      key: 'zona',
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: "zonas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'nom',
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: CODE,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'nom',
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          }
        ],
        advancedSearchColumns: aSCodeAndName
      },
     
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioGeneral",
        defaultMessage: "Estudio gastos generales",
      }),
      type: "numeric",
      key: "estudiDespesesGenerals",

      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioBaja",
        defaultMessage: "Estudio baja",
      }),
      type: "numeric",
      key: "estudiBaixaPercent",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.estudioTasa",
          defaultMessage: "Estudio Tasa",
        }),
        type: "numeric",
        key: "estudiTasaPercent",
        suffix: "%",
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.estudioSuma",
          defaultMessage: "Estudio suma valoración en exceso",
        }),
        type: "checkbox",
        key: "estudiSumarValoracioEnExces",
        breakpoints: {
          xs: 12,
          md: 4,
        },
      },
      
  ];

  const garantiaData = [
    
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.mesesGarantia",
        defaultMessage: "Meses garantía",
      }),
      type: "numeric",
      key: "mesosGarantia",
      required:true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validation: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.horasConstruccion",
        defaultMessage: "Horas equivalentes construción",
      }),
      type: "numeric",
      key: "horesEquivConstruccio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.horasGarantia",
        defaultMessage: "Horas equivalentes garantía",
      }),
      type: "numeric",
      key: "horesEquivGarantia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionLibre",
        defaultMessage: "Ejecución libre",
      }),
      type: "numeric",
      key: "percentExecucioLliure",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionConstrucion",
        defaultMessage: "Ejecución contrucción",
      }),
      type: "numeric",
      key: "percentExecucioConstruccio",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionGarantia",
        defaultMessage: "Ejecución garantía",
      }),
      type: "numeric",
      key: "percentExecucioGarantia",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  
  ];



  return (
    <Grid container spacing={2}>
      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.contabilidadEstudio"}
              defaultMessage={"Contabilidad y estudio"}
            />
          }
        >
          <GenericForm
            formComponents={projectsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(PROJECT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(PROJECT_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
        </Grid>
        <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.construccionGarantia"}
              defaultMessage={"Construcción y Garantía"}
            />
          }
        >
          <GenericForm
            formComponents={garantiaData}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(PROJECT_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(PROJECT_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>

    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(MoreTab);
