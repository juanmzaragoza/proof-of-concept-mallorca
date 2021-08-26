import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

import { VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES } from "../../../constants/selectors";

const TermStoreCreate = (props) => {
  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

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

  const code = (md = 3) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
    validationType: "string",
    validations: [
      ...props.commonValidations.requiredValidation(),
      ...props.stringValidations.minMaxValidation(1, 4),
      ...props.stringValidations.fieldExistsValidation(
        "magatzem",
        "codi",
        CODE
      ),
    ],
  });

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const aSCodeAndPoblacio = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "poblacioMunicipiCodiTxt" },
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

  const createConfiguration = [
    {
      placeHolder: CODE,
      type: "numeric",
      key: "codi",
      disabled:true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      noEditable: true,
    
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción",
      }),
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
        ...props.stringValidations.minMaxValidation(1, 30),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Almacen.fechaInicio",
        defaultMessage: "Fecha Inicio",
      }),
      type: "date",
      key: "dataInici",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.almacen",
        defaultMessage: "Almacén",
      }),
      type: "LOV",
      key: "magatzem",
      required: true,
      noEditable:true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "object",
      ...withRequiredValidation(),
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
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "AlmacenPeriodo.titulo",
        defaultMessage: "Almacen Periodo",
      })}
      formConfiguration={createConfiguration}
      url={API.magatzemPeriode}
    />
  );
};

export default compose(withValidations, injectIntl)(TermStoreCreate);
