import React, {useEffect, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import {useParams} from "react-router-dom";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import {Chip} from "@material-ui/core";

import {AVISO_ALBARANES_CLIENTE_SELECTOR_VALUES, TIPO_FAMILIA_ARTICULO_SELECTOR_VALUES, TIPO_SERVEI_FAMILIA_ARTICULO_SELECTOR_VALUES} from "../../../constants/selectors";

import {useTabForm} from "hooks/tab-form";

const CREATE_SECTION_INDEX = 0;
const ACCOUNTING_SECTION_TAB_INDEX = 1;
const OPEARTION_SECTION_TAB_INDEX = 2;
const OPTIONS_SECTION_TAB_INDEX = 3;
const BUSINESS_SECTION_TAB_INDEX = 4;

const GeneralTab = ({formData, setFormData, getFormData, ...props}) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[CREATE_SECTION_INDEX]: false, [ACCOUNTING_SECTION_TAB_INDEX]:false, [OPEARTION_SECTION_TAB_INDEX]:false,
    [OPTIONS_SECTION_TAB_INDEX]:false, [ACCOUNTING_SECTION_TAB_INDEX]:false, [BUSINESS_SECTION_TAB_INDEX]:false}, setIsValid: props.setIsValid});

  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});
  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPTION = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});
  const COMERCIALNAME = props.intl.formatMessage({id: "Proveedores.nombre_comercial", defaultMessage: "Nombre Comercial"});

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

  const { id: ItemFamilyId } = useParams();

  const formatCodeAndComercialName = (data) => `${data.nomComercial} (${data.codi})`;

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const aSCodeAndName = [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}];

  const aSCodeAndComercialName = [{title: CODE, name: 'codi'},{title: COMERCIALNAME, name: 'nomComercial'}];

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPTION, name: 'descripcio'}];

  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md
    }
  });

  const familiaCoste = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.familiaCoste",
        defaultMessage: "Familia Coste",
      }),
      type: "LOV",
      key: "familiaCost",
      breakpoints: {
        xs: 12,
        md: md,
      },
      selector: {
        key: "familiaCosts",
        labelKey: (data) => `${data.codi} (${data.descripcio})`,
        sort: "codi",
        creationComponents: [
          code(4),
          {
            type: "input",
            key: "codi",
            placeHolder: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 4)
            ]
          },
          {
            type: "input",
            key: "descripcio",
            placeHolder: props.intl.formatMessage({
              id: "Comun.descripcion",
              defaultMessage: "Descripción",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.commonValidations.requiredValidation(),
              ...props.stringValidations.minMaxValidation(1, 60)
            ]
          },
          {
            type: "input",
            key: "observacions",
            placeHolder: props.intl.formatMessage({
              id: "FamiliaProveedores.observaciones",
              defaultMessage: "Observaciones",
            }),
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 1000)
            ]
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "FamiliaArticulos.titulo",
              defaultMessage: "Familia de Artículos",
            }),
            type: "LOV",
            key: "articleFamilia",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              key: "articleFamilias",
              labelKey: formatCodeAndDescription,
              sort: "codi",
              cannotCreate: true,
              advancedSearchColumns: aSCodeAndDescription,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription
      },
    },
  ];

  const delegacioCreate = (md = 6) =>[
    {
      placeHolder: props.intl.formatMessage({
        id: "Provincias.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
          xs: 12,
          md: 6
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 4)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Provincias.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'nom',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1, 60)
      ]
    },
  ]

  const createConfiguration = [
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
        md: 3
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
        id: "FamiliaArticulos.secuencia",
        defaultMessage: "Secuencia Ordenación"
      }),
      type: 'input',
      key: 'sequenciaOrdenacio',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 9999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.margenSobreCoste",
        defaultMessage: "Margen Sobre Coste %"
      }),
      type: 'input',
      key: 'margeSobreCost',
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.minimo",
        defaultMessage: "Margen Mínimo %"
      }),
      type: 'input',
      key: 'margeMinim',
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.porcentajePenalizacionDevolucion",
        defaultMessage: "Porcentaje de penalización devolución %"
      }),
      type: 'input',
      key: 'percentatgePenalitzacioDevolucio',
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.excluirAlGenerarAlbaran",
        defaultMessage: "Excluir al generar albarán"
      }),
      type: 'checkbox',
      key: 'excloureAlGenerarAlbara',
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.grupoRecursos",
        defaultMessage: "Grupo de Recursos"
      }),
      type: 'LOV',
      key: 'recursGrupCodi',
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: 'recursGrups',
        labelKey: formatCodeAndName,
        sort: 'nom',
        cannotCreate: true,
        transform: {
          apply: (recursGrup) => recursGrup && recursGrup.codi,
          reverse: (rows, codi) => rows.find(row => row.codi === codi)
        },
        advancedSearchColumns: aSCodeAndName
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.avisosAlbaranesCliente",
        defaultMessage: "Avisos en albaranes de cliente"
      }),
      type: 'select',
      key: 'avisAlbaraClient',
      required: true,
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 4
      },
      selector: {
        options: AVISO_ALBARANES_CLIENTE_SELECTOR_VALUES
      },
      validations: [
        ...props.commonValidations.requiredValidation()
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.tipoServicio",
        defaultMessage: "Tipo de Servicio"
      }),
      type: 'select',
      key: 'tipusServei',
      breakpoints: {
        xs: 12,
        sm: 6,
        md: 4
      },
      selector: {
        options: TIPO_SERVEI_FAMILIA_ARTICULO_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.productoPropio",
        defaultMessage: "Producto propio"
      }),
      type: 'checkbox',
      key: 'productePropi',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.tiempoFabricacionUnidadesMetricas",
        defaultMessage: "Tiempo de fabricación por unidades metricas"
      }),
      type: 'checkbox',
      key: 'tempsFabricacioUnitatsMetriques',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.distribuirCosteAdicional",
        defaultMessage: "Distribuir coste adicional"
      }),
      type: 'checkbox',
      key: 'distribuirCostAdicional',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.articulosExportables",
        defaultMessage: "Articulos exportables"
      }),
      type: 'checkbox',
      key: 'artExportables',
      breakpoints: {
        xs: 6,
        sm: 4,
        md: 3
      },
    },
    ...familiaCoste(5),
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.tipoFamilia",
        defaultMessage: "Tipos de Família"
      }),
      type: 'select',
      key: 'tipus',
      breakpoints: {
        xs: 12,
        md: 5
      },
      selector: {
        options: TIPO_FAMILIA_ARTICULO_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.observaciones",
        defaultMessage: "Observaciones"
      }),
      type: 'observations',
      key: 'observacions',
      required: false,
      breakpoints: {
        xs: 12,
        md: 2
      },
    }
  ];

  const ContabilidadConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaProveedores.ctaprcmp",
        defaultMessage: "Cuenta Compras"
      }),
      type: 'input',
      key: 'compteCompres',
      breakpoints: {
        xs: 12,
        md: 4
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
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.cuentaExistencias",
        defaultMessage: "Cuenta existencias"
      }),
      type: 'input',
      key: 'compteExistencies',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 10)
      ]
    },
  ];

  const OperacionesConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.descripcionOperacion",
        defaultMessage: "Descripción operación"
      }),
      type: 'input',
      key: 'descOperacio',
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 500)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.nde",
        defaultMessage: "Numero Días, Máxima Entrada"
      }),
      type: 'input',
      key: 'nde',
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.ndf",
        defaultMessage: "Numero Días, Máximo Fabricación"
      }),
      type: 'input',
      key: 'ndf',
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PieDocumento.empresa",
        defaultMessage: "Empresa"
      }),
      type: 'LOV',
      key: 'empresaCodi',
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: 'empresas',
        labelKey: formatCodeAndComercialName,
        sort: 'nomComercial',
        cannotCreate: true,
        transform: {
          apply: (empresa) => empresa && empresa.codi,
          reverse: (rows, codi) => rows.find(row => row.codi === codi)
        },
        advancedSearchColumns: aSCodeAndComercialName
      }
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
        md: 4,
      },
      selector: {
        key: "projectes",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.delegacion",
        defaultMessage: "Delegación",
      }),
      type: "LOV",
      key: "delegacio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "delegacios",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "codi",
        creationComponents: [...delegacioCreate(6)],
        advancedSearchColumns: aSCodeAndName,
      },
    },
  ]

  const OpcionesConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.loteNavegable",
        defaultMessage: "Lote navegable"
      }),
      type: 'checkbox',
      key: 'lotNavegable',
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.ubicacionNavegable",
        defaultMessage: "Ubicación navegable"
      }),
      type: 'checkbox',
      key: 'ubicacioNavegable',
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
  ];

  const TITLE = props.intl.formatMessage({id: "Clientes.empresas", defaultMessage: "Empresas"});

  const EmpresasConfiguration = {
    title: TITLE,
    query: [
      {
        columnName: 'articleFamilia.id',
        value: `"${ItemFamilyId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      articleFamilia: {id: ItemFamilyId}
    },
    columns: [
      { 
        name: 'empresa',
        title: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa"
        }),
        getCellValue: row => row.empresa?.description ?? ""
      },
      { 
        name: 'web',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.web",
          defaultMessage: "Web"
        }),
        getCellValue: row => (row.web && row.web === true)?
          <Chip label="SI" variant="outlined" />
          :
          <Chip label="NO" variant="outlined" />
      },
      { 
        name: 'articleFamilia',
        title: props.intl.formatMessage({
          id: "FamiliaArticulos.articuloFamilia",
          defaultMessage: "Articulo Familia"
        }),
        getCellValue: row => row.articleFamilia?.description ?? ""
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "PieDocumento.empresa",
          defaultMessage: "Empresa"
        }),
        type: "LOV",
        key: "empresa",
        breakpoints: {
          xs: 12,
          md: 4,
        },
        selector: {
          key: "empresas",
          labelKey: (data) => `${data.nomComercial} (${data.codi})`,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndComercialName,
        },
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaArticulos.web",
          defaultMessage: "Web",
        }),
        type: 'checkbox',
        key: 'web',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
    ],
  }

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Proveedores.tabs.contabilidad"} defaultMessage={"Contabilidad"}/>,
      key: 0,
      component: <GenericForm formComponents={ContabilidadConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(ACCOUNTING_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(ACCOUNTING_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"FamiliaArticulos.operaciones"} defaultMessage={"Operaciones"}/>,
      key: 1,
      component: <GenericForm formComponents={OperacionesConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(ACCOUNTING_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(ACCOUNTING_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"FamiliaArticulos.opciones"} defaultMessage={"Opciones"}/>,
      key: 2,
      component: <GenericForm formComponents={OpcionesConfiguration}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(OPTIONS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(OPTIONS_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      label: TITLE,
      key: 3,
      component: <ExpandableGrid
        id='articlesFamiliaEmpresas'
        responseKey='articleFamiliaEmpresas'
        enabled={props.editMode}
        configuration={EmpresasConfiguration} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"PieDocumento.titulo"} defaultMessage={"Pies Documentos"}/>}>
          <GenericForm formComponents={createConfiguration}
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
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(GeneralTab);