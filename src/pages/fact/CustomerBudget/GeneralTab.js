import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";



import {ESTADO_PRESUPUESTO_SELECTOR_VALUES} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import {useTabForm} from "hooks/tab-form";

const BUDGET_SECTION_INDEX = 0;
const BUDGET_LINE_SECTION_TAB_INDEX = 1;

const GeneralTab = ({formData, setFormData, getFormData, ...props}) => {
  const [
    touched,
    handleTouched,
    addValidity,
    formIsValid
  ] = useTabForm({fields: {[BUDGET_SECTION_INDEX]: false, [BUDGET_LINE_SECTION_TAB_INDEX]:true}, setIsValid: props.setIsValid});

  const { id: budgetId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const OBS = props.intl.formatMessage({id: "FamiliaProveedores.observaciones",  defaultMessage: "Observaciones"});




  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];
  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const suppliersConfig = [
    {
        placeHolder: CODE,
        type: "input",
        key: "codi",
        noEditable: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.version",
          defaultMessage: "Versión",
        }),
        type: "input",
        required: true,
        key: "versio",
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
            ...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.clase",
          defaultMessage: "Clase",
        }),
        type: "input",
        key: "classe",
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.fecha",
          defaultMessage: "Fecha",
        }),
        type: "date",
        key: "data",
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
          id: "Presupuestos.fechaInicial",
          defaultMessage: "Fecha inicial",
        }),
        type: "date",
        key: "dataInici",
        breakpoints: {
          xs: 12,
          md: 3,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.estado",
          defaultMessage: "Estado",
        }),
        type: "select",
        key: "estat",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          options: ESTADO_PRESUPUESTO_SELECTOR_VALUES,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.cliente",
          defaultMessage: "Cliente",
        }),
        type: "LOV",
        key: "client",
        required:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "clients",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "nomComercial" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.nombreCliente",
          defaultMessage: "Nombre cliente",
        }),
        type: "input",
        key: "nomClient",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
  
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.operario",
          defaultMessage: "Operario",
        }),
        type: "LOV",
        key: "operari",
        required:true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "operaris",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate:true,
          advancedSearchColumns: aSCodeAndName,
       
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
  
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.idioma",
          defaultMessage: "Idioma",
        }),
        type: "LOV",
        key: "idioma",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "idiomas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate:true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.serieVenta",
          defaultMessage: "Serie Venta",
        }),
        type: "LOV",
        key: "serieVenda",
        id:"serieVendas",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "serieVendas",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.puntoVenta",
          defaultMessage: "Puntos Venta",
        }),
        type: "LOV",
        key: "puntVenda",
        id:"puntsVenda",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "puntVendas",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.divisa",
          defaultMessage: "Divisa",
        }),
        type: "LOV",
        key: "divisa",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "divisas",
          labelKey: formatCodeAndName,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.almacen",
          defaultMessage: "Almacén",
        }),
        type: "LOV",
        key: "magatzem",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "magatzems",
          labelKey: formatCodeAndName,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.documentoPago",
          defaultMessage: "Documento pago/cobro",
        }),
        type: "LOV",
        key: "documentPagamentCobrament",
        breakpoints: {
          xs: 12,
          md: 3,
        },
        selector: {
          key: "documentPagamentCobraments",
          labelKey: formatCodeAndDescription,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
      },
    //   {
    //     placeHolder: props.intl.formatMessage({
    //       id: "Presupuestos.pais",
    //       defaultMessage: "Pais",
    //     }),
    //     type: "LOV",
    //     key: "pais",
    //     breakpoints: {
    //       xs: 12,
    //       md: 3,
    //     },
    //     noEditable: true,
    //     selector: {
    //       key: "paises",
    //       labelKey: formatCodeAndName,
    //       sort: "nom",
    //       cannotCreate: true,
    //       advancedSearchColumns: aSCodeAndName,
          
    //     },
    //   },
    //   {
    //     placeHolder: props.intl.formatMessage({
    //       id: "Presupuestos.provincia",
    //       defaultMessage: "Provincia",
    //     }),
    //     type: "LOV",
    //     key: "provincia",

    //     breakpoints: {
    //       xs: 12,
    //       md: 3,
    //     },
    //     noEditable: true,
    //     selector: {
    //       key: "provincias",
    //       labelKey: formatCodeAndName,
    //       sort: "nom",
    //       cannotCreate: true,
    //       advancedSearchColumns: aSCodeAndName,
          
    //     },
    //   },
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
          md: 3,
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
         cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        },
      },
     
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.valorDivisa",
          defaultMessage: "Valor divisa euros",
        }),
        type: "input",
        key: "valorDivisaEuros",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
     
  
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.desglose",
          defaultMessage: "desglose",
        }),
        type: "checkbox",
        key: "desglose",
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.certOrigen",
          defaultMessage: "Certificado origen",
        }),
        type: "checkbox",
        key: "certificacioOrigen",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.seguimiento",
          defaultMessage: "Seguimento Recepción Material",
        }),
        type: "checkbox",
        key: "seguimentRecepcioMaterial",
        breakpoints: {
          xs: 12,
          md: 2,
        },
      },
      {
        placeHolder: OBS,
        type: "observations",
        key: "observacions",
        breakpoints: {
          xs: 12,
          md: 1,
        },
      },
    ];


  
  const budgetLineConfig  = {
    title: props.intl.formatMessage({
      id: "Presupuestos.linias",
      defaultMessage: "Linias presupuesto",
    }),
    query: [
      {
        columnName: 'pressupost.id',
        value: `"${budgetId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      pressupost: {id: budgetId}
    },
    columns: [
      { name: 'article', title: props.intl.formatMessage({
        id: "Presupuestos.articulo",
        defaultMessage: "Artículo",
      }),
      getCellValue: row => (row.article?.description )},
      { name: 'descripcio', title: props.intl.formatMessage({
        id: "Presupuestos.descripcion",
        defaultMessage: "Descripción",
      }), },
      { name: 'preu', title:props.intl.formatMessage({
        id: "Presupuestos.precio",
        defaultMessage: "Precio",
      }), },
      { name: 'unitats', title: props.intl.formatMessage({
        id: "Presupuestos.unidades",
        defaultMessage: "Unidades",
      }), },
      { name: 'preuTotalLinia', title: props.intl.formatMessage({
        id: "Presupuestos.precioTotalLinia",
        defaultMessage: "Precio total linia",
      }), },

      { name: 'factorConversioSortides', title: props.intl.formatMessage({
        id: "Presupuestos.factorConversionSalidas",
        defaultMessage: "Factor conv. salidas",
      }), },



    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.articulo",
          defaultMessage: "Artículo",
        }),
        type: "LOV",
        key: "article",
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        noEditable: true,
        selector: {
          key: "articles",
          labelKey:  (data) => `${data.descripcioCurta} (${data.codi})`,
          sort: "nom",
          cannotCreate: true,
          advancedSearchColumns: [
            { title: CODE, name: "codi" },
            { title: NOM, name: "descripcioCurta" },
          ],
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.descripcion",
          defaultMessage: "Descripción",
        }),
        type: 'input',
        key: 'descripcio',
        required:true,
        breakpoints: {
          xs: 12,
          md: 6
        },
        validationType: "string",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.precio",
          defaultMessage: "Precio"
        }),
        type: 'input',
        key: 'preu',
        required:true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.maxValidation(100000)
        ]
      },
     
      
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.unidades",
          defaultMessage: "Unidades",
        }),
        type: 'input',
        key: 'unitats',
        required:true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.maxValidation(1000)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.precioTotalLinia",
          defaultMessage: "Precio total linia",
        }),
        type: 'input',
        key: 'preuTotalLinia',
        required:true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.maxValidation(10000)
        ]
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Presupuestos.factorConversionSalidas",
          defaultMessage: "Factor conv. salidas",
        }),
        type: 'input',
        key: 'factorConversioSortides',
        required: true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
        validations: [
          ...props.numberValidations.maxValidation(1000),
          ...props.commonValidations.requiredValidation()
        ]
      },
      
      
    ]
  }

  const tabs = [
   
    {
      label: <FormattedMessage id={"Presupuestos.linias"} defaultMessage={"Linias presupuesto"}/> ,
      key: 0,
      component: <ExpandableGrid
        id='pressupostLinias'
        responseKey='pressupostLinias'
        enabled={props.editMode}
        configuration={budgetLineConfig} />
    },
 
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Presupuestos.titulo"} defaultMessage={"Presupuestos"}/>}>
          <GenericForm formComponents={suppliersConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(BUDGET_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(BUDGET_SECTION_INDEX)}
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(GeneralTab);