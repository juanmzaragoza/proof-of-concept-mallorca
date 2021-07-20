import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const CustomerDepartmentsCreate = (props) => {
  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const NOM = props.intl.formatMessage({ id: "Comun.nombre", defaultMessage: "Nombre" });
  const COMERCIALNAME = props.intl.formatMessage({ id: "Proveedores.nombre_comercial", defaultMessage: "Nombre Comercial" });
  const DOMICILI = props.intl.formatMessage({ id: "Proveedores.Direccion.domicilio", defaultMessage: "Domicilio" });
  const TEL1 = props.intl.formatMessage({ id: "DepartamentosCliente.tel1", defaultMessage: "Teléfono 1" });
  const TEL2 = props.intl.formatMessage({ id: "DepartamentosCliente.tel2", defaultMessage: "Teléfono 2" });
  const FAX1 = props.intl.formatMessage({ id: "DepartamentosCliente.fax1", defaultMessage: "Fax 1" });
  const FAX2 = props.intl.formatMessage({ id: "DepartamentosCliente.fax2", defaultMessage: "Fax 2" });
  const EMAIL = props.intl.formatMessage({ id: "DepartamentosCliente.email", defaultMessage: "eMail" });
  const DIRWEB = props.intl.formatMessage({ id: "DepartamentosCliente.dirWeb", defaultMessage: "Dirección Web" });
  const RESPONSABLE = props.intl.formatMessage({ id: "DepartamentosCliente.responsable", defaultMessage: "Responsable" });
  const OBS = props.intl.formatMessage({ id: "DepartamentosCliente.observaciones", defaultMessage: "Observaciones" });
  const CIF = props.intl.formatMessage({ id: "DepartamentosCliente.cif", defaultMessage: "CIF" });
  const ACT = props.intl.formatMessage({ id: "DepartamentosCliente.actividad", defaultMessage: "Actividad" });
  const BLOQ = props.intl.formatMessage({ id: "DepartamentosCliente.bloqueado", defaultMessage: "Bloqueado" });
  const CLI = props.intl.formatMessage({ id: "DepartamentosCliente.cliente", defaultMessage: "Cliente" });
  const CP = props.intl.formatMessage({ id: "DepartamentosCliente.codigoPostal", defaultMessage: "Código Postal" });
  const SUBCLI = props.intl.formatMessage({ id: "DepartamentosCliente.subCliente", defaultMessage: "Subcliente" });

  const aSCodeAndComercialName = [ { title: CODE, name: "codi" }, { title: COMERCIALNAME, name: "nomComercial" }];
  const aSCodeAndName = [ { title: CODE, name: "codi" }, { title: NOM, name: "nom" }];
  const aSCodeAndPoblacio = [ { title: CODE, name: "codi" }, { title: NOM, name: "poblacioMunicipiCodiTxt" }];

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
        advancedSearchColumns: aSCodeAndPoblacio,
      },
    },
  ];

  const createConfiguration = [
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
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('departamentClients', 'codi', CODE)
      ],
    },
    {
      placeHolder: NOM,
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
      placeHolder: DOMICILI,
      type: "input",
      key: "domicili",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
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
      ],
    },
    {
      placeHolder: TEL1,
      type: "input",
      key: "telefon1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: TEL2,
      type: "input",
      key: "telefon2",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: FAX1,
      type: "input",
      key: "fax1",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: FAX2,
      type: "input",
      key: "fax2",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: DIRWEB,
      type: "input",
      key: "adressaWeb",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
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
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: CIF,
      type: "input",
      key: "cif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 50),
      ],
    },
    {
      placeHolder: ACT,
      type: "input",
      key: "activitat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 50),
      ],
    },
    {
      placeHolder: BLOQ,
      type: "input",
      key: "bloquejat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1),
      ],
    },
    ...codiPostal(3),
    {
      placeHolder: CLI,
      type: "LOV",
      key: "client",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        relatedWith: {
          name: "subClient",
          filterBy: "client.id",
          keyValue: "id",
        },
        advancedSearchColumns: aSCodeAndComercialName,
      },
    },
    {
      placeHolder: SUBCLI,
      type: "LOV",
      key: "subClient",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "subClients",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: OBS,
      type: "input",
      key: "observacions",
      breakpoints: {
        xs: 12,
        md: 12,
      },
      text: {
        multiline: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1000),
      ],
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "DepartamentosCliente.titulo",
        defaultMessage: "Departamentos Cliente",
      })}
      formConfiguration={createConfiguration}
      url={API.departamentClients}
    />
  );
};

export default compose(withValidations, injectIntl)(CustomerDepartmentsCreate);
