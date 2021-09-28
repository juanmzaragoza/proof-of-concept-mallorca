import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";
import { withValidations } from "../../../modules/wrappers";
import * as API from "redux/api";
import {TIPO_REGISTRO_COMERCIAL_SELECTOR_VALUES, MEDIO_SELECTOR_VALUES} from "../../../constants/selectors";

const CommercialRegisterCreate = (props) => {

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

  const NOM_COMERCIAL = props.intl.formatMessage({
    id: "Proveedores.nombre_comercial",
    defaultMessage: "Nombre Comercial",
  });

  const aSCodeAndNameComercial = [
    { title: CODE, name: "codi" },
    { title: NOM_COMERCIAL, name: "nomComercial" },
  ];

  const createConfiguration = [
   
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.interesado",
        defaultMessage: "Interesado",
      }),
      type: "input",
      key: "interessat",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.medio",
        defaultMessage: "Medio"
      }),
      type: 'select',
      key: 'mitja',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: MEDIO_SELECTOR_VALUES
      },
      validations: [
        ...props.commonValidations.requiredValidation()
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.descripcion",
        defaultMessage: "Descripción del Medio",
      }),
      type: "input",
      key: "descripcioMitja",
      required: true,
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
        id: "Clientes.tipo",
        defaultMessage: "Tipo"
      }),
      type: 'select',
      key: 'tipus',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: TIPO_REGISTRO_COMERCIAL_SELECTOR_VALUES
      },
      validations: [
        ...props.commonValidations.requiredValidation()
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.fecha",
        defaultMessage: "Fecha",
      }),
      type: "date",
      key: "data",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.titulo",
        defaultMessage: "Clientes"
      }),
      type: 'LOV',
      key: 'client',
      breakpoints: {
        xs: 12,
        md: 5
      },
      selector: {
        key: "clients",
        labelKey: (data) => `${data.nomComercial} (${data.codi})`,
        sort: 'codi',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndNameComercial
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.productos",
        defaultMessage: "Productos"
      }),
      type: 'LOV',
      key: 'producte',
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: "productes",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'codi',
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.datosContacto",
        defaultMessage: "Datos de Contacto",
      }),
      type: "input",
      key: "dadesContacte",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 500),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "RegistroComercial.comentarios",
        defaultMessage: "Comentarios",
      }),
      type: "input",
      key: "comentaris",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 1500),
      ],
    },
    
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "RegistroComercial.titulo",
        defaultMessage: "Registros Comerciales",
      })}
      formConfiguration={createConfiguration}
      url={API.registreComercial}
    />
  );
};

export default compose(withValidations, injectIntl)(CommercialRegisterCreate);
