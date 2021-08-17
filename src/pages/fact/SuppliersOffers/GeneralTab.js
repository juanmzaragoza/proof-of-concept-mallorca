import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { ESTADO_OFERTA_PROV_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const SUPPLIERS_ORDERS_SECTION_INDEX = 0;
const TEXTO_SECTION_INDEX = 2;
const CONTRATO_SECTION_INDEX = 1;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [SUPPLIERS_ORDERS_SECTION_INDEX]: false,
      [CONTRATO_SECTION_INDEX]:true,
      [TEXTO_SECTION_INDEX]:true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
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

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];

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

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
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

  const datosGenerales = [
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.numero",
        defaultMessage: "Número ",
      }),
      type: "numeric",
      key: "numero",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(1, 999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.fecha",
        defaultMessage: "Fecha",
      }),
      required: true,
      type: "date",
      key: "dia",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PedidosProveedor.estado",
        defaultMessage: "Estado",
      }),
      type: "select",
      key: "estat",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        options: ESTADO_OFERTA_PROV_SELECTOR_VALUES,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
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
        id: "Cajas.valorDivisa",
        defaultMessage: "Valor Divisa",
      }),
      type: "numeric",
      suffix: "€",
      required: true,
      key: "valorDivisaEuros",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 9999999),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "OfertasProveedor.TipoOferta",
        defaultMessage: "Tipo Oferta",
      }),
      type: "LOV",
      key: "tipusOfertaProveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusOfertaProveidors",
        labelKey: (data) =>
          `${data.descripcioTipusOfertesProveidors} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "codi" },
          { title: NOM, name: "descripcioTipusOfertesProveidors" },
        ],
        // relatedWith: {
        //   name: "adresaComercials",
        //   filterBy: "proveidor.id",
        //   keyValue: "id",
        // },
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: formatCodeAndName,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "LOV",
      key: "tipusVenciment",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusVenciments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "tipus",
            placeHolder: props.intl.formatMessage({
              id: "TiposVencimiento.tipos",
              defaultMessage: "Tipos",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
      validationType: "object",
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.porcentaje",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatge",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "OfertaProveedores.porcentajeRetencion",
        defaultMessage: "Porcentaje",
      }),
      type: "numeric",
      key: "percentatgeRetencio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Presupuestos.titulo",
        defaultMessage: "Presupuesto",
      }),
      type: "LOV",
      key: "pressupost",
      breakpoints: {
        xs: 12,
        md: 5,
      },
      selector: {
        key: "pressuposts",
        labelKey: (data) => `${data.client.description} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
      },
    },

    {
      placeHolder:  props.intl.formatMessage({
        id: "OfertaProveedores.concepto",
        defaultMessage: "Concepto",
      }),
      type: "input",
      key: "concepteOferta",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      text: {
        multiline: 5,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 500)],
    },
    {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.condiciones",
          defaultMessage: "Condiciones Ejecución",
        }),
        type: "input",
        key: "condicionsExecucio",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
  ];

  const textosConfig = [
     {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.texto1",
          defaultMessage: "Texto 1 ",
        }),
        type: "input",
        key: "texte1",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.texto2",
          defaultMessage: "Texto 2 ",
        }),
        type: "input",
        key: "texte2",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.texto3",
          defaultMessage: "Texto 3 ",
        }),
        type: "input",
        key: "texte3",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.texto4",
          defaultMessage: "Texto 4 ",
        }),
        type: "input",
        key: "texte4",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.texto5",
          defaultMessage: "Texto 5 ",
        }),
        type: "input",
        key: "texte5",
        breakpoints: {
          xs: 12,
          md: 6,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
  ];

  const contratoConfig = [
    {
        placeHolder: props.intl.formatMessage({
          id: "OfertaProveedores.contrato",
          defaultMessage: "Contrato ",
        }),
        type: "input",
        key: "contracte",
        breakpoints: {
          xs: 12,
          md: 12,
        },
        text: {
          multiline: 5,
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(0, 1000)],
      },
  
  ];

  const tabs = [

    {
        className: "general-tab-subtab",
        label: (
          <FormattedMessage
            id={"OfertaProveedores.contrato"}
            defaultMessage={"Contrato"}
          />
        ),
        key: 0,
        component: (
          <GenericForm
            formComponents={contratoConfig}
            emptyPaper={true}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(CONTRATO_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(CONTRATO_SECTION_INDEX)}
            {...props}
          />
        ),
      },
    {
        className: "general-tab-subtab",
        label: (
          <FormattedMessage
            id={"OfertaProveedores.textos"}
            defaultMessage={"Textos"}
          />
        ),
        key: 1,
        component: (
          <GenericForm
            formComponents={textosConfig}
            emptyPaper={true}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) =>
              addValidity(TEXTO_SECTION_INDEX, value)
            }
            onBlur={(e) => handleTouched(TEXTO_SECTION_INDEX)}
            {...props}
          />
        ),
      },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={datosGenerales}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(SUPPLIERS_ORDERS_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(SUPPLIERS_ORDERS_SECTION_INDEX)}
          {...props}
        />
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
