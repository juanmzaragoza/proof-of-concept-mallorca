import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";

import { withValidations } from "modules/wrappers";

import { useParams } from "react-router-dom";
import ExpandableGrid from "modules/ExpandableGrid";
import { Chip } from "@material-ui/core";

const VehicleTab = ({ formData, setFormData, getFormData, ...props }) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

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

  const { id: transpId } = useParams();

  const vehicleConfig = {
    title: props.intl.formatMessage({
      id: "Vehiculos.titulo",
      defaultMessage: "Vehículos",
    }),
    query: [
      {
        columnName: "transportista.id",
        value: `"${transpId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      transportista: { id: `${transpId}` },
    },

    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "matricula",
        title: props.intl.formatMessage({
          id: "Vehiculos.matricula",
          defaultMessage: "Matrícula ",
        }),
      },
      {
        name: "actiu",
        title: props.intl.formatMessage({
          id: "Productos.activo",
          defaultMessage: "Activo",
        }),
        getCellValue: (row) =>
          row.actiu && row.actiu === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
      },
      {
        name: "conductorHabitual",
        title: props.intl.formatMessage({
          id: "Vehiculos.conductor",
          defaultMessage: "Conductor",
        }),
      },

      {
        name: "matriculaRemolc",
        title: props.intl.formatMessage({
          id: "Vehiculos.remolque",
          defaultMessage: "remolque",
        }),
        hidden: true,
      },
      {
        name: "nif",
        title: props.intl.formatMessage({
          id: "Vehiculos.dni",
          defaultMessage: "dni",
        }),
        hidden: true,
      },
      {
        name: "vehicleEmpresa",
        title: props.intl.formatMessage({
          id: "Vehiculos.vhEmpresa",
          defaultMessage: "Vehículo Empresa",
        }),
        getCellValue: (row) =>
          row.vehicleEmpresa && row.vehicleEmpresa === true ? (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.SI",
                defaultMessage: "SI",
              })}
            />
          ) : (
            <Chip
              label={props.intl.formatMessage({
                id: "Comun.NO",
                defaultMessage: "NO",
              })}
            />
          ),
        hidden: true,
      },
      {
        name: "tara",
        title: props.intl.formatMessage({
          id: "Vehiculos.tara",
          defaultMessage: "tara",
        }),
        hidden: true,
      },
      {
        name: "pesMaxim",
        title: props.intl.formatMessage({
          id: "Vehiculos.pesoMaximo",
          defaultMessage: "Peso Máximo",
        }),
        hidden: true,
      },
      {
        name: "projecteNum",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),

        hidden: true,
      },

      {
        name: "empresaCodi",
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa",
        }),
        hidden: true,
      },
      {
        name: "delegacio",
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.delegacion",
          defaultMessage: "Delegacion",
        }),
        getCellValue: (row) =>
          row.delegacio?.description ? row.delegacio.description : "",
        hidden: true,
      },
    ],

    formComponents: [
      {
        placeHolder: CODE,
        type: "input",
        key: "codi",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        noEditable: true,
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10),
        ],
      },
      {
        placeHolder: DESCRIPCIO,
        type: "input",
        key: "descripcio",
        required: true,
        breakpoints: {
          xs: 12,
          md: 9,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 60),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.activo",
          defaultMessage: "Activo ",
        }),
        type: "checkbox",
        key: "actiu",
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.matricula",
          defaultMessage: "Matrícula",
        }),
        type: "input",
        key: "matricula",
        required: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.remolque",
          defaultMessage: "Remolque",
        }),
        type: "input",
        key: "matriculaRemolc",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 10)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.dni",
          defaultMessage: "DNI",
        }),
        type: "input",
        key: "nif",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 12)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.conductor",
          defaultMessage: "Conductor",
        }),
        type: "input",
        key: "conductorHabitual",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 30)],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.tara",
          defaultMessage: "Tara",
        }),
        type: "numeric",
        key: "tara",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.pesoMaximo",
          defaultMessage: "Peso Máximo",
        }),
        type: "numeric",
        key: "pesMaxim",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.minMaxValidation(0, 9999999999),
        ],
      },

      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.codigoMaquina",
          defaultMessage: "Código Máquina",
        }),
        type: "input",
        key: "maquinaCodi",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 15)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.pwd",
          defaultMessage: "PWD",
        }),
        type: "input",
        key: "pwd",
        breakpoints: {
          xs: 12,
          md: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 60)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Vehiculos.vhEmpresa",
          defaultMessage: "Vehículo Empresa",
        }),
        type: "checkbox",
        key: "vehicleEmpresa",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
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
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.proyecto",
          defaultMessage: "Proyecto",
        }),
        type: "LOV",
        key: "projecteNum",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "projectes",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          transform: {
            apply: (projectes) => projectes && projectes.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
          advancedSearchColumns: [
            {
              title: props.intl.formatMessage({
                id: "Comun.codigo",
                defaultMessage: "Código",
              }),
              name: "codi",
            },
            {
              title: props.intl.formatMessage({
                id: "Comun.nombre",
                defaultMessage: "Nombre",
              }),
              name: "nom",
            },
          ],
        },
        validationType: "string",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa",
        }),
        type: "LOV",
        key: "empresaCodi",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "nomComercial",
          cannotCreate: true,
          transform: {
            apply: (empresa) => empresa && empresa.codi,
            reverse: (rows, codi) => rows.find((row) => row.codi === codi),
          },
          relatedWith: [
            {
              name: "delegacio",
              filterBy: "empresa.id",
              keyValue: "id",
            },
          ],
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            {
              title: props.intl.formatMessage({
                id: "Proveedores.nombre_comercial",
                defaultMessage: "Nombre Comercial",
              }),
              name: "nomComercial",
            },
          ],
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.delegacion",
          defaultMessage: "Delegación",
        }),
        type: "LOV",
        key: "delegacio",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "delegacios",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            {
              title: NOM,
              name: "nom",
            },
          ],
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
              id={"Vehiculos.titulo"}
              defaultMessage={"Vehículos"}
            />
          }
        >
          <ExpandableGrid
            id="vehicles"
            responseKey="vehicles"
            enabled={props.editMode}
            configuration={vehicleConfig}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(VehicleTab);
