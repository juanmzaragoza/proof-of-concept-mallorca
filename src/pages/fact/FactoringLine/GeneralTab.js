import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import { TIPO_DIR_COMERCIALES_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";
import ContactTab from "../Suppliers/ContactTab";
import { magatzems } from "redux/api";

const COMPANY_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;
const CONTACT_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [COMPANY_SECTION_INDEX]: false,
      [ADDRESS_SECTION_TAB_INDEX]: false,
      [CONTACT_SECTION_TAB_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  //   const { id: supplierId } = useParams();

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });
  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });
  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
  });


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

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];

  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.numContrato",
        defaultMessage: "Num. Contrato",
      }),
      type: "input",
      key: "contracteNumero",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.fieldExistsValidation(
          "liniaFactoring",
          "contracteNumero",
          props.intl.formatMessage({
            id: "LiniasFactoring.numContrato",
            defaultMessage: "Num. Contrato",
          })
        ),
        ...props.stringValidations.minMaxValidation(0, 20),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.bancCodi",
        defaultMessage: "Banco",
      }),
      type: "LOV",
      key: "banc",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      required: true,
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        transform: {
          apply: (bancs) => bancs && bancs.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi == codi),
        },
        cannotCreate: true,

        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.bancNom",
        defaultMessage: "Banco Nombre",
      }),
      type: "input",
      key: "bancNom",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.cif",
        defaultMessage: "CIF",
      }),
      type: "input",
      key: "bancNif",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 12)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.cuentaContable",
        defaultMessage: "Cuenta Contable",
      }),
      type: "input",
      key: "compteComptable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.importeLimite",
        defaultMessage: "Importe Límite",
      }),
      type: "numeric",
      key: "importLimit",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.diaNumero",
        defaultMessage: "Días",
      }),
      type: "numeric",
      key: "diaNumero",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "LiniasFactoring.recurso",
        defaultMessage: "Recurso",
      }),
      type: "select",
      key: "recursSiONo",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "divisas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    ...codiPostal(4),
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.observaciones",
        defaultMessage: "Observaciones",
      }),
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
        <GenericForm
          formComponents={createConfiguration}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(COMPANY_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(COMPANY_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
