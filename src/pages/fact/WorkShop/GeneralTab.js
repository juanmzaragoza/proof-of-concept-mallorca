import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import { VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";
import { NoMeetingRoom } from "@material-ui/icons";

const WORKSHOP_SECTION_INDEX = 0;
const CONTAB_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [WORKSHOP_SECTION_INDEX]: false,
      [CONTAB_SECTION_INDEX]:false,
    },
    setIsValid: props.setIsValid,
  });

  const { id: workShopId } = useParams();

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

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
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

  const aSCodeAndPoblacio = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "poblacioMunicipiCodiTxt" },
  ];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const workShopConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 4),
        ...props.stringValidations.fieldExistsValidation(
          "tallers",
          "codi",
          CODE
        ),
      ]),
    },
    {
      placeHolder: NOM,
      type: "input",
      key: "nom",
      required: true,
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 60),
      ]),
    },
    {
      placeHolder: DOMICILI,
      type: "input",
      key: "direccio",
      breakpoints: {
        xs: 12,
        md: 9,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.color",
        defaultMessage: "color",
      }),
      type: "input",
      key: "col",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 15)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "magatzems",
        labelKey: formatCodeAndName,
        sort: "codi",
        creationComponents: [
          code(3),
          {
            placeHolder: props.intl.formatMessage({
              id: "Comun.nombre",
              defaultMessage: "Nombre",
            }),
            type: "input",
            key: "nom",
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 30),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.Direccion.domicilio",
              defaultMessage: "Domicilio",
            }),
            type: "input",
            key: "domicili",
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.select.valoracionInventarioTrabajo",
              defaultMessage: "Valoración inventario traspaso",
            }),
            type: "select",
            key: "valoracioInventariTraspas",
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
            selector: {
              options: VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES,
            },
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.Contacto.telefono",
              defaultMessage: "Teléfono",
            }),
            type: "input",
            key: "telefon",
            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.Contacto.fax",
              defaultMessage: "Fax",
            }),
            type: "input",
            key: "fax",
            breakpoints: {
              xs: 12,
              md: 4,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.Contacto.email",
              defaultMessage: "E-mail",
            }),
            type: "input",
            key: "email",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.responsable",
              defaultMessage: "Responsable",
            }),
            type: "input",
            key: "responsable",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 30),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "SerieVenta.tipoAsientoContable",
              defaultMessage: "Tipo asiento contable",
            }),
            type: "input",
            key: "tipusAssentamentComptable",
            breakpoints: {
              xs: 12,
              md: 5,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 2),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.diarioContableTraspasos1",
              defaultMessage: "Diario contable traspasos 1",
            }),
            type: "input",
            key: "diariComptableTraspassos1",
            breakpoints: {
              xs: 12,
              md: 7,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 2),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.diarioContableTraspasos2",
              defaultMessage: "Diario contable traspasos 2",
            }),
            type: "input",
            key: "diariComptableTraspassos2",
            breakpoints: {
              xs: 12,
              md: 7,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 2),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.cuentaTraspasos",
              defaultMessage: "Cuenta traspasos",
            }),
            type: "input",
            key: "compteTraspassos",
            breakpoints: {
              xs: 12,
              md: 5,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 10),
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Almacen.codigoPostal.titulo",
              defaultMessage: "Codigo Postal",
            }),
            type: "LOV",
            key: "codiPostal",
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              key: "codiPostals",
              labelKey: (data) =>
                `${data.poblacio} ${
                  data.municipi ? ` - ${data.municipi}` : ""
                } (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndPoblacio,
            },
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
              md: 6,
            },
            selector: {
              key: "divisas",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.diaAvisoAbierto",
        defaultMessage: "Dia aviso abierto",
      }),
      type: "numeric",
      key: "diaOberta",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.diaAvisoSinTrabajar",
        defaultMessage: "Dia aviso sin trabajar",
      }),
      type: "numeric",
      key: "diaSensa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.porcentajeControl",
        defaultMessage: "Porcentaje Control",
      }),
      type: "numeric",
      key: "percControl",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
  ];

  const contabAnaliticaConfig = [

    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.ctaExistencias",
        defaultMessage: "Cuenta Existencias",
      }),
      type: "input",
      key: "ctecmpexi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.ctaFacturas",
        defaultMessage: "Cuentas Facturas a Contabilizar",
      }),
      type: "input",
      key: "ctecmpfacpdt",
      breakpoints: {
        xs: 12,
        md:3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.ctaGastos",
        defaultMessage: "Cuentas Gastos",
      }),
      type: "input",
      key: "ctecmpdsp",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
  
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.proyectoTaller",
        defaultMessage: "Proyecto de Taller",
      }),
      type: "input",
      key: "prjnumtlr",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 6)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Talleres.analiticaContable",
        defaultMessage: "Analítica Contable",
      }),
      type: "checkbox",
      key: "ana",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
   
  ];

    const tabs = [
      {
        className: "general-tab-subtab",
        label: (
          <FormattedMessage
            id={"Talleres.ContabAnalitica"}
            defaultMessage={"Contabilidad - Analítica"}
          />
        ),
        key: 0,
        component: (
          <GenericForm
            formComponents={contabAnaliticaConfig}
            emptyPaper={true}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(CONTAB_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(CONTAB_SECTION_INDEX)}
            {...props}
          />
        ),
      },
      {
        className: "general-tab-subtab",
        label: "OPERARIOS TALLER",
        key: 1,
        component: "Operarios Taller (Pendiente Backend)"
      },
    ];

  return (
    <Grid container>
      <Grid xs={12} item>

          <GenericForm
            formComponents={workShopConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(WORKSHOP_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(WORKSHOP_SECTION_INDEX)}
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
