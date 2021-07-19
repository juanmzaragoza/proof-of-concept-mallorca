import React, { useEffect, useState } from "react";

import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";

import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "../../../hooks/tab-form";
import { TIPO_DIR_COMERCIALES_SELECTOR_VALUES } from "constants/selectors";

const CUSTOMER_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [CUSTOMER_SECTION_INDEX]: false,
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

  const DEFECTE = props.intl.formatMessage({
    id: "Proveedores.DireccionComercial.defecto",
    defaultMessage: "Defecto",
  });

  const DIR_EXCLUSIVA = props.intl.formatMessage({
    id: "DireccionesClientes.dreccion_exclusiva",
    defaultMessage: "Dir. exclusiva",
  });
  const BLOQUEJAT = props.intl.formatMessage({
    id: "Clientes.bloqueado",
    defaultMessage: "Bloqueado",
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

  const TransporterConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      noEditable: true,
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation(
          "clientAdresas",
          "codi",
          props.intl.formatMessage({
            id: "Comun.codigo",
            defaultMessage: "Código",
          })
        ),
      ],
    },

    {
      placeHolder: DOMICILI,
      type: "input",
      key: "domicili",
      breakpoints: {
        xs: 12,
        md: 8,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 60)],
    },
    ...codiPostal(3),
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.cliente",
        defaultMessage: "Cliente",
      }),
      type: "LOV",
      required: true,
      key: "client",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "nomComercial",
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
        cannotCreate: true,
        relatedWith: {
          name: "subClient",
          filterBy: "client.id",
          keyValue: "id",
        },
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.subcliente",
        defaultMessage: "Subcliente",
      }),
      type: "LOV",
      key: "subClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "subClients",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        cannotCreate: true,
      },
    },
    

    {
      placeHolder: DIR_EXCLUSIVA,
      type: "select",
      key: "direccionExclusivaEnvio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: DEFECTE,
      type: "select",
      key: "domiciliDefecte",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },

    {
      placeHolder: BLOQUEJAT,
      type: "select",
      key: "bloquejada",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
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
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"DireccionesClientes.titulo"}
              defaultMessage={"Direcciones Clientes"}
            />
          }
        >
          <GenericForm
            formComponents={TransporterConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(CUSTOMER_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(CUSTOMER_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
