import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ApplicationCreate = (props) => {
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
  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;



  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      disabled:true,
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 3),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.tipoMantenimiento",
        defaultMessage: "Tipo Mantenimiento",
      }),
      type: "numeric",
      key: "tipusManteniment",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 3)
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.identificador",
        defaultMessage: "Identificador",
      }),
      type: "input",
      key: "idf",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.servidor",
        defaultMessage: "Servidor",
      }),
      type: "input",
      key: "servidor",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 60)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.instalacionParcial",
        defaultMessage: "Instalación Parcial",
      }),
      type: "checkbox",
      key: "instalacioParcial",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.producto",
        defaultMessage: "Producto",
      }),
      type: "LOV",
      key: "producte",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      noEditable: true,
      selector: {
        key: "productes",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes",
      }),
      type: "LOV",
      key: "client",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      noEditable: true,
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nomComercial" },
        ],
        relatedWith: {
          name: "subClient",
          filterBy: "client.id",
          keyValue: "id",
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.subcliente",
        defaultMessage: "SubClientes",
      }),
      type: "LOV",
      key: "subClient",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      noEditable: true,
      selector: {
        key: "subClients",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "nom" },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.usuarioPropietario",
        defaultMessage: "Usuario Propietario",
      }),
      type: "input",
      key: "usuariPropietari",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 50)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.usuario2",
        defaultMessage: "Usuario 2",
      }),
      type: "input",
      key: "usuari2",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 50)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.versionBD",
        defaultMessage: "Versión BD",
      }),
      type: "input",
      key: "versioBD",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 3)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.fechaInstalacion",
        defaultMessage: "Fecha instalación",
      }),
      type: "date",
      key: "dataInstalacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.pc",
        defaultMessage: "PC aplicacion instalada",
      }),
      type: "input",
      key: "pcOnHiHaInstaladaAplicacio",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
    },
   
    {
      placeHolder: props.intl.formatMessage({
        id: "Aplicaciones.sqlPlus",
        defaultMessage: "SQL Plus",
      }),
      type: "input",
      key: "sqlPlus",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 50)],
    },
    
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "Aplicaciones.titulo",
        defaultMessage: "Aplicaciones",
      })}
      formConfiguration={createConfiguration}
      url={API.aplicacionsClient}
    />
  );
};

export default compose(withValidations, injectIntl)(ApplicationCreate);
