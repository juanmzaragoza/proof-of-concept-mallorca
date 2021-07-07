import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import { TIPO_MENSAJE_SELECTOR_VALUES } from "constants/selectors";

const PRECIO_SECTION_INDEX = 0;
const DESCUENTOS_SECTION_INDEX = 1;
const RAPPEL_SECTION_INDEX = 2;
const PRECIO_VOLUMEN_SECTION_INDEX = 3;

const PriceTab = ({ formData, setFormData, getFormData, ...props }) => {
  
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[PRECIO_SECTION_INDEX]: false, [DESCUENTOS_SECTION_INDEX]:false, 
    [RAPPEL_SECTION_INDEX]: false, [PRECIO_VOLUMEN_SECTION_INDEX]:false}, 
    setIsValid: props.setIsValid});


  const { id: clienteId } = useParams();

  const TITLE = props.intl.formatMessage({ id: "Presupuestos.precio", defaultMessage: "Precio" });
  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});


  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md
    },
    validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('ivaFact', 'codi', CODE)
      ],
  });

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const iva = (md = 2) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id:"ivaFact",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "ivas",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        creationComponents: [
          code(2),
          {
            placeHolder: DESCRIPCIO,
            type: 'input',
            key: 'descripcio',
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 30)
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Clientes.porcentaje.iva",
              defaultMessage: "Porcentaje IVA",
            }),
            type: 'input',
            key: 'percentatgeIva',
            required: true,
            breakpoints: {
              xs: 12,
              md: 2
            },
            validationType: "number",
          },
          {
            type: "input",
            key: "percentatgeRecarrecEquivalencia",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.recargo.equivalencia",
              defaultMessage: "Recargo equivalencia",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 2,
            },
          },
          {
            type: "input",
            key: "codiComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.codigoContab",
              defaultMessage: "Código contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "codiRecarrecComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Iva.codigoRecCont",
              defaultMessage: "Código recargo contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.texto",
              defaultMessage: "Texto",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "checkbox",
            key: "notCreApu",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.notCreApu",
              defaultMessage: "No crear apunte sin importe 0",
            }),
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndPoblacio,
      },
    },
  ];

  const preusConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.compra",
        defaultMessage: "Precio compra"
      }),
      type: 'input',
      key: 'preuCompra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento1Compra",
        defaultMessage: "Descuento 1 compra"
      }),
      type: 'input',
      key: 'dte1Compra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento2Compra",
        defaultMessage: "Descuento 2 compra"
      }),
      type: 'input',
      key: 'dte2Compra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCompraTeorico",
        defaultMessage: "Precio compra teórico"
      }),
      type: 'input',
      disabled: true,
      key: 'preuCompraTeo',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteTeorico",
        defaultMessage: "Precio coste teórico"
      }),
      type: 'input',
      disabled: true,
      key: 'preuCostTeo',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.fechaActualizacionPrecio",
        defaultMessage: "Fecha actualización precio"
      }),
      type: 'date',
      key: 'dataActualitzacioPreu',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen"
      }),
      type: 'input',
      key: 'marge',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecio",
        defaultMessage: "Decimales precio"
      }),
      type: 'input',
      key: 'decimalsPreu',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecioIva",
        defaultMessage: "Decimales precio con IVA"
      }),
      type: 'input',
      key: 'decimalsPreuIva',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvp",
        defaultMessage: "Precio con IVA"
      }),
      type: 'input',
      key: 'pvpFact',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "number",
    },
    ...iva(2),
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteExistencias",
        defaultMessage: "Precio coste existencias"
      }),
      type: 'input',
      disabled: true,
      key: 'preuCostExistencies',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
  


















































    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "Tipo Mensaje"
      }),
      type: 'select',
      key: 'tipusMissatge',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: TIPO_MENSAJE_SELECTOR_VALUES,
       
      },
     
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.latitud",
        defaultMessage: "Lazonatitud"
      }),
      type: 'input',
      key: 'latitud',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60)
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.longitud",
        defaultMessage: "Longitud"
      }),
      type: 'input',
      key: 'longitud',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 15)
    },
  
  ];

  const descuentos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Retenciones.cuentaCompras",
        defaultMessage: "Cuenta compras",
      }),
      type: "input",
      key: "compteCompres",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.ventas",
        defaultMessage: "Cuenta ventas",
      }),
      type: "input",
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.cuentaExistencias",
        defaultMessage: "Cuenta existencias",
      }),
      type: "input",
      key: "compteExistencies",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
  ];

  const rappel = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Retenciones.cuentaCompras",
        defaultMessage: "Cuenta compras",
      }),
      type: "input",
      key: "compteCompres",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.cuenta.ventas",
        defaultMessage: "Cuenta ventas",
      }),
      type: "input",
      key: "compteVendes",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.cuentaExistencias",
        defaultMessage: "Cuenta existencias",
      }),
      type: "input",
      key: "compteExistencies",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(1, 10)],
    },
  ];

  const precioPorVolumen = {
    title: TITLE,
    query: [
      {
        columnName: 'client.id',
        value: `"${clienteId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      client: { id: clienteId }
    },
    columns: [
      { name: 'codi', title: CODE },
      { name: 'nom', title: NOM },
      { name: 'telefon1', title: TELEFON },
      { name: 'email', title: EMAIL },
      { name: 'domicili', title: DOMICILI },
      { name: 'activitat', title: ACTIVIDAD },

    ],
    formComponents: [
      code(3),
      {
        placeHolder: NOM,
        type: 'input',
        key: 'nom',
        required: true,
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "string",
        ...withRequiredValidation(),
      },
      {
        placeHolder: TELEFON,
        type: 'input',
        key: 'telefon1',
        breakpoints: {
          xs: 12,
          md: 3
        },
      },
      {
        placeHolder: EMAIL,
        type: 'input',
        key: 'email',
        breakpoints: {
          xs: 12,
          md: 3
        },
      },
      {
        placeHolder: DOMICILI,
        type: 'input',
        key: 'domicili',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: ACTIVIDAD,
        type: 'input',
        key: 'activitat',
        breakpoints: {
          xs: 12,
          md: 3
        },
      },
      ...codiPostal(3)



    ]
  };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.categorias"} defaultMessage={"Categorías"}/>,
      key: 0,
      component: <GenericForm formComponents={categoria}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(CATEGORIAS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(CATEGORIAS_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.alternativos"} defaultMessage={"Alternativos"}/>,
      key: 1,
      component: <GenericForm formComponents={alternativo}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(ALTERNATIVO_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(ALTERNATIVO_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Articulos.contabilidad"} defaultMessage={"Contabilidad"}/>,
      key: 2,
      component: <GenericForm formComponents={contabilidad}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(CONTABILIDAD_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(CONTABILIDAD_SECTION_TAB_INDEX)}
                              {...props} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Presupuestos.precio"} defaultMessage={"Precio"}/>}>
          <GenericForm formComponents={preusConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(PRECIO_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(PRECIO_SECTION_INDEX)}
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
)(PriceTab);