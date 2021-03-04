import CreateUpdateForm from "../ReactGrid/CreateUpdateForm";
import {injectIntl} from "react-intl";
import React from "react";

const SuppliersFamilyCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"FamiliaProveedores.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Ctaprcmp"
      }),
      type: 'input',
      key: 'ctaprcmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones"
      }),
      type: 'input',
      key: 'observacions',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.tipasicmp",
        defaultMessage: "Tipasicmp"
      }),
      type: 'input',
      key: 'tipasicmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.dricmp",
        defaultMessage: "Dricmp"
      }),
      type: 'input',
      key: 'dricmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.driprfcmp",
        defaultMessage: "Driprfcmp"
      }),
      type: 'input',
      key: 'driprfcmp',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    }
  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "FamiliaProveedores.titulo",
                        defaultMessage: "Familias proveedor"
                      })}
                      formConfiguration={createConfiguration}
                      url={'api/fact/familiesProveidor'} />
  )
};

export default injectIntl(SuppliersFamilyCreate);