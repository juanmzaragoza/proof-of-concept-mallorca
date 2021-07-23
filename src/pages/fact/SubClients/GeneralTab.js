import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const SUBCLIENT_SECTION_INDEX = 0;
const FACT_SECTION_TAB_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });

  const LONG = props.intl.formatMessage({
    id: "Clientes.contacto.longitud",
    defaultMessage: "Longitud",
  });
  const LAT = props.intl.formatMessage({
    id: "Clientes.contacto.latitud",
    defaultMessage: "Latitud",
  });
  const DEFECTE = props.intl.formatMessage({
    id: "Proveedores.DireccionComercial.defecto",
    defaultMessage: "Defecto",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const DIR_EXCLUSIVA = props.intl.formatMessage({
    id: "Clientes.dreccion_exclusiva",
    defaultMessage: "Dirección exclusiva",
  });
  const BLOQUEJAT = props.intl.formatMessage({
    id: "Clientes.bloqueado",
    defaultMessage: "Bloqueado",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const CONTACTE = props.intl.formatMessage({
    id: "Proveedores.Contacto.contacto",
    defaultMessage: "Contacto",
  });

  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });


  const MOVIL = props.intl.formatMessage({
    id: "Clientes.Contacto.movil",
    defaultMessage: "Telf. Móvil",
  });
  const CIF = props.intl.formatMessage({
    id: "Clientes.Contacto.cif",
    defaultMessage: "CIF",
  });

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

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
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
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
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];
  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const clientConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      required:true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 6),
        ...props.stringValidations.fieldExistsValidation(
          "subclientes",
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
        md: 5,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 40),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes",
      }),
      type: "LOV",
      key: "client",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.bloqueado",
        defaultMessage: "Bloqueado",
      }),
      type: "checkbox",
      key: "bloquejat",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
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
      breakpoints: {
        xs: 12,
        md: 7,
      },
      required: true,
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 30)],
    },
    ...codiPostal(3),

    {
      placeHolder: props.intl.formatMessage({
        id: "Subclientes.preciosVolumen",
        defaultMessage: "Precios por volumen",
      }),
      type: "checkbox",
      key: "preusPerVolum",
      breakpoints: {
        xs: 12,
        md: 2,
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
      key: "codiOficinaComptable",
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
      key: "cpOficinaComptable",
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
      key: "domiciliOficinaComptable",
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
      key: "codiOrganGestor",
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
      key: "cpOrganGestor",
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
      key: "domiciliOrganGestor",
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
      key: "codiUnitatTramitadora",
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
      key: "cpUnitatTramitadora",
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
      key: "domiciliUnitatTramitadora",
      breakpoints: {
        xs: 12,
        md: 12,
      },
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
        <>
          <Grid container spacing={2}>
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
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
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
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
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
                    addValidity(FACT_SECTION_TAB_INDEX, value)
                  }
                  onBlur={(e) => handleTouched(FACT_SECTION_TAB_INDEX)}
                  {...props}
                />
              </OutlinedContainer>
            </Grid>
          </Grid>
        </>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.general"}
              defaultMessage={"General"}
            />
          }
        >
          <GenericForm
            formComponents={clientConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(SUBCLIENT_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(SUBCLIENT_SECTION_INDEX)}
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
