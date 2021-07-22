import { injectIntl } from "react-intl";
import React from "react";
import { compose } from "redux";

import CreateUpdateForm from "../../../modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const ProductSectorCreate = (props) => {

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
          id: "ProductosSector.sector",
          defaultMessage: "Sector"
        }),
        type: 'LOV',
        key: 'sector',
        breakpoints: {
          xs: 12,
          md: 4
        },
        selector: {
          key: "sectors",
          labelKey: (data) => `${data.nom} (${data.codi})`,
          sort: 'codi',
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName
        },
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.idioma",
          defaultMessage: "Idioma"
        }),
        type: 'LOV',
        key: 'idioma',
        disabled: true,
        breakpoints: {
          xs: 12,
          md: 4
        },
        selector: {
          key: "idiomas",
          labelKey: (data) => `${data.descripcio} (${data.codi})`,
          sort: 'codi',
          cannotCreate: true,
        },
    },
  ];
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "ProductosSector.titulo",
        defaultMessage: "Productos Sectores",
      })}
      formConfiguration={createConfiguration}
      url={API.productesSector}
    />
  );
};

export default compose(withValidations, injectIntl)(ProductSectorCreate);
