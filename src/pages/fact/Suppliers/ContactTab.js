import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import OutlinedContainer from "../../../modules/shared/OutlinedContainer";
import { FormattedMessage, injectIntl } from "react-intl";
import GenericForm from "../../../modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "../../../hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";

const ContactTab = ({ formData, setFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false },
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
  const TITLE = props.intl.formatMessage({
    id: "Clientes.departamentos",
    defaultMessage: "Departamentos",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const TELEFON2 = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono2",
    defaultMessage: "Telefóno 2",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });
  const FAX2 = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax2",
    defaultMessage: "Fax 2",
  });
  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });

  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const { id: supplierId } = useParams();

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
      validationType: "object",
      ...withRequiredValidation(),
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

  const contactsConfig = [
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
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nom" },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.contacto",
        defaultMessage: "Contacto",
      }),
      type: "input",
      key: "contacte",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: TELEFON,
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 6,
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
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation(),
      ],
    },
    {
      placeHolder: WWW,
      type: "input",
      key: "web",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.representante",
        defaultMessage: "Representante",
      }),
      type: "input",
      key: "representant",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.dni_representante",
        defaultMessage: "DNI Representante",
      }),
      type: "input",
      key: "dnirepresentant",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 15),
    },
  ];

  const departamentsConfig = {
    title: TITLE,
    query: [
      {
        columnName: "proveidor.id",
        value: `"${supplierId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      proveidor: { id: supplierId },
    },
    columns: [
      { name: "codi", title: CODE },
      { name: "nom", title: NOM },
      { name: "domicili", title: DOMICILI },
      // {
      //   name: "codiPostal",
      //   title: props.intl.formatMessage({
      //     id: "Proveedores.Direccion.codPostal",
      //     defaultMessage: "Código Postal",
      //   }),
      //   getCellValue: (row) => row.codiPostal?.description,
      // },
      { name: "telefon1", title: TELEFON },
      { name: "fax1", title: FAX },
      { name: "email", title: EMAIL },
      {
        name: "responsable",
        title: props.intl.formatMessage({
          id: "Proveedores.Contacto.responsable",
          defaultMessage: "Responsable",
        }),
      },
    ],
    formComponents: [
      code(1),
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
        ...withRequiredValidation(),
      },
      {
        placeHolder: TELEFON,
        type: "input",
        key: "telefon1",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: TELEFON2,
        type: "input",
        key: "telefon2",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: WWW,
        type: "input",
        key: "web",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: EMAIL,
        type: "input",
        key: "email",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: FAX,
        type: "input",
        key: "fax1",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: FAX2,
        type: "input",
        key: "fax2",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },

      {
        placeHolder: DOMICILI,
        type: "input",
        key: "domicili",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      ...codiPostal(3),

      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.Contacto.responsable",
          defaultMessage: "Responsable",
        }),
        type: "input",
        key: "responsable",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: props.stringValidations.minMaxValidation(1, 60),
      },
    ],
  };

  const tabs = [
    {
      label: props.intl.formatMessage({
        id: "Clientes.departamentos",
        defaultMessage: "Departamentos",
      }),
      key: 0,
      component: (
        <ExpandableGrid
          id="departamentProveidor"
          responseKey="departamentProveidors"
          enabled={props.editMode}
          configuration={departamentsConfig}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.contactos"}
              defaultMessage={"Contactos"}
            />
          }
        >
          <GenericForm
            formComponents={contactsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={props.getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(0, value)}
            onBlur={(e) => handleTouched(0)}
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

export default compose(injectIntl, withValidations)(ContactTab);
