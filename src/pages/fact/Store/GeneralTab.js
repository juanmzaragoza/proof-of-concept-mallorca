import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES } from "constants/selectors";
import { useTabForm } from "../../../hooks/tab-form";

const STORE_SECTION_INDEX = 0;
const CONTACT_SECTION_TAB_INDEX = 1;
const CONTAB_SECTION_TAB_INDEX =2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [STORE_SECTION_INDEX]: false,
      [CONTACT_SECTION_TAB_INDEX]: true,
      [CONTAB_SECTION_TAB_INDEX]:true
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

  const TELEFON = props.intl.formatMessage({
    id: "Comun.telefono",
    defaultMessage: "Telefóno",
  });
  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });
  const RESPONSABLE = props.intl.formatMessage({
    id: "Almacen.responsable",
    defaultMessage: "Responsable",
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

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
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
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País",
            }),
            type: "LOV",
            key: "pais",
            id: "paises",
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
            id: "provincias",
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
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

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

  const StoreConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "magatzem",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
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
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(1, 40),
      ]),
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: DOMICILI,
      type: "input",
      key: "domicili",
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
    ...codiPostal(4),
  ];

  const stockConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 12,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.valoracionInventario",
        defaultMessage: "Valoracion Iventarios transpasos",
      }),
      required: true,
      type: "select",
      key: "valoracioInventariTraspas",
      selector:{
          options:VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES
      },
      breakpoints: {
        xs: 12,
        md: 12,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];

  const contactsConfig = [
    {
      placeHolder: TELEFON,
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: FAX,
      type: "input",
      key: "fax",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },

    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation(),
      ],
    },
    {
      placeHolder: RESPONSABLE,
      type: "input",
      key: "responsable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const contabConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.tipoAsiento",
        defaultMessage: "Tipo asiento contable",
      }),
      type: "input",
      key: "tipusAssentamentComptable",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.diarioContable",
        defaultMessage: "Diario contable transpasos 1",
      }),
      type: "input",
      key: "diariComptableTraspassos1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.diarioContabl2",
        defaultMessage: "Diario contable transpasos 2",
      }),
      type: "input",
      key: "diariComptableTraspassos2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.cuenta",
        defaultMessage: "Cuenta transpasos ",
      }),
      type: "input",
      key: "compteTraspassos",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Proveedores.Contacto.contacto"}
          defaultMessage={"Contacto"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={contactsConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(CONTACT_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(CONTACT_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
        className: "general-tab-subtab",
        label: (
          <FormattedMessage
            id={"Almacen.datosContables"}
            defaultMessage={"Datos Contables"}
          />
        ),
        key: 1,
        component: (
          <GenericForm
            formComponents={contabConfig}
            emptyPaper={true}
            setFormData={setFormData}
            getFormData={getFormData}
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
        ),
      },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={7} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Almacen.datosComerciales"}
              defaultMessage={"Datos Comerciales"}
            />
          }
        >
          <GenericForm
            formComponents={StoreConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(STORE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(STORE_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={5} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Almacen.datosStock"}
              defaultMessage={"Datos Stock"}
            />
          }
        >
          <GenericForm
            formComponents={stockConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(STORE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(STORE_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
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
