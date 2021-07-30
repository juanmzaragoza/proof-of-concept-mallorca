import React from "react";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import {useTabForm} from "hooks/tab-form";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";

const CREATE_SECTION_INDEX = 0;
const SUPPLIER_ACCOUNT_SECTION_TAB_INDEX = 1;

const SupplierAccountTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [ touched, handleTouched, addValidity, formIsValid ] = useTabForm({
    fields: {
      [CREATE_SECTION_INDEX]: false,
      [SUPPLIER_ACCOUNT_SECTION_TAB_INDEX]: false},
    setIsValid: props.setIsValid
  });

  const formatCodeAndComercialName = (data) => `${data.nomComercial} (${data.codi})`;

  const Create = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 6)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 30)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Cuenta Compras"
      }),
      type: 'input',
      key: 'compteCompres',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.ventas",
        defaultMessage: "Cuenta ventas"
      }),
      type: 'input',
      key: 'compteVentes',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10)
      ]
    },
  ];

  const SupplierAccount = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.cuentasProveedores",
      defaultMessage: "Cuentas Proveedores",
    }),
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Proveedores.proveedor",
          defaultMessage: "Proveedor",
        }),
      },
      {
        name: "nomComercial",
        title: props.intl.formatMessage({
          id: "Cliente.nombre",
          defaultMessage: "Nombre",
        }),
      },
      {
        name: "contaComptable",
        title: props.intl.formatMessage({
          id: "Almacen.cuenta",
          defaultMessage: "Cuenta contable",
        }),
      },
    ],

    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proveedores.titulo",
          defaultMessage: "Proveedores",
        }),
        type: "LOV",
        key: "suppliers",
        breakpoints: {
          xs: 12,
        },
        selector: {
          key: "proveidors",
          labelKey: formatCodeAndComercialName,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: formatCodeAndComercialName,
        },
      },
    ],
  };

  const tabs = [
    {
      label: <FormattedMessage id={"FamiliaArticulos.tabs.cuentasProveedores"} defaultMessage={"Cuentas Proveedores"}/>,
      key: 0,
      component: <ExpandableGrid
        id='suppliers'
        responseKey='proveidors'
        enabled={props.editMode}
        configuration={SupplierAccount} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"FamiliaArticulos.titulo"} defaultMessage={"Familia"}/>}>
          <GenericForm formComponents={Create}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(CREATE_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(CREATE_SECTION_INDEX)}
                       {...props} />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(SupplierAccountTab);
