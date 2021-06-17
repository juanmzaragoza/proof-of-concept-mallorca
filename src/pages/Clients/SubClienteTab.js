import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import "../Suppliers/styles.scss";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "../../modules/ExpandableGrid";

const SubClienteTab = ({ formData, setFormData, getFormData, ...props }) => {

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

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
        defaultMessage: "Código Postal"
      }),
      type: 'LOV',
      key: 'codiPostal',
      required: true,
      breakpoints: {
        xs: 12,
        md: md
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "codiPostals",
        labelKey: (data) => `${data.poblacio} ${data.municipi?` - ${data.municipi}`:''} (${data.codi})`,
        sort: 'codi',
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País"
            }),
            type: 'LOV',
            key: 'pais',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
              relatedWith: {
                name: 'provincia',
                filterBy: 'pais.id',
                keyValue: 'id'
              },
              advancedSearchColumns: aSCodeAndName
            }
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia"
            }),
            type: 'LOV',
            key: 'provincia',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndName
            }
          },
          {
            type: 'input',
            key: 'municipi',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'poblacio',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
        ],
        advancedSearchColumns: aSCodeAndDescription
      }
    },
  ];


  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];
  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];

  const { id: clientId } = useParams();


  const subClient = {
    title: props.intl.formatMessage({
      id: "Clientes.subClientes",
      defaultMessage: "Subclientes",
    }),
    query: [
      {
        columnName: "client.id",
        value: `"${clientId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      client: { id: clientId },
    },
    columns: [
      {
        name: "codi",
        title: CODE,
      },
      {
        name: "nom",
        title: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "domicili",
        title: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
      },
      {
        name: "codiPostal",
        title: props.intl.formatMessage({
          id: "Clientes.fact.codigoPostal",
          defaultMessage: "Código Postal",
        }),
        getCellValue: (row) => row?.codiPostal?.description || ""
        ,
      },
      {
        name: "bloquejat",
        title: props.intl.formatMessage({
          id: "Clientes.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        getCellValue: (row) =>
          row.bloquejat && row.bloquejat === true ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
      },
      {
        name: "preusPerVolum",
        title: props.intl.formatMessage({
          id: "Clientes.subClientes.precioPorVolumen",
          defaultMessage: "Precios por volúmen",
        }),

        getCellValue: (row) =>
          row.preusPerVolum && row.preusPerVolum === true ? (
            <Chip label="SI" variant="outlined" />
          ) : (
            <Chip label="NO" variant="outlined" />
          ),
      },
    ],

    formComponents: [
      {
        placeHolder: CODE,
        type: "input",
        required: true,
        key: "codi",
        breakpoints: {
          xs: 12,
          md: 1,
        },
        validationType: "strings",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.nombre",
          defaultMessage: "Nombre",
        }),
        type: "input",
        key: "nom",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "strings",
        ...withRequiredValidation(),
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Comun.domicilio",
          defaultMessage: "Domicilio",
        }),
        type: "input",
        key: "domicili",
        breakpoints: {
          xs: 12,
          md: 5,
        },
      },
      ...codiPostal(3),
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.bloqueado",
          defaultMessage: "Bloqueado",
        }),
        type: "checkbox",
        key: "bloquejat",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.subClientes.precioPorVolumen",
          defaultMessage: "Precios por volúmen",
        }),
        type: "checkbox",
        key: "preusPerVolum",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
    ],
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Clientes.subClientes"}
              defaultMessage={"Subclientes"}
            />
          }
        >
         <ExpandableGrid
          id="subClients"
          enabled={props.editMode}
          configuration={subClient}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SubClienteTab);
