import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {FormattedMessage, injectIntl} from "react-intl";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

const GeneralTab = ({formData, setFormData, ...props}) => {

  useEffect(() => {
    const getString = (key) => formData[key]? formData[key]:"";
    formData['concat'] = getString('domicilio')+" "+getString('numero')+" "+getString('esc')+" "+getString('piso')+" "+getString('puerta');
  },[formData]);

  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: props.intl.formatMessage({
      id: "Comun.codigo",
      defaultMessage: "Código"
    }),
    required: true,
    breakpoints: {
      xs: 12,
      md: md
    }
  });

  const codeAndName = (mdCode = 6, mdName = 6) => [code(mdCode),
    {
      type: 'input',
      key: 'nom',
      placeHolder: props.intl.formatMessage({
        id: "Comun.nombre",
        defaultMessage: "Nombre"
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName
      }
    }
  ];

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [code(mdCode),
    {
      type: 'input',
      key: 'nom',
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes
      }
    }
  ];

  const suppliersConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial"
      }),
      type: 'input',
      key: 'nomComercial',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal"
      }),
      type: 'input',
      key: 'nomFiscal',
      required: true,
      breakpoints: {
        xs: 12,
        md: 5
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.bloqueado",
        defaultMessage: "Bloqueado"
      }),
      type: 'checkbox',
      key: 'bloquejat',
      breakpoints: {
        xs: 12,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias"
      }),
      type: 'input',
      key: 'alias',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.pais",
        defaultMessage: "País"
      }),
      type: 'LOV',
      key: 'pais',
      required: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
      selector: {
        key: 'paises',
        labelKey: (data) => `(${data.nom}) ${data.codi}`,
        sort: 'nom',
        creationComponents: codeAndName()
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tipoDoc",
        defaultMessage: "Tipo Documento"
      }),
      type: 'select',
      key: 'tdoc',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: [
          {value: "1", label:"One"},
          {value: "2", label:"Two"},
          {value: "3", label:"Three"},
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF"
      }),
      type: 'input',
      key: 'nif',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.censado_eat",
        defaultMessage: "Censado en EAT"
      }),
      type: 'checkbox',
      key: 'eat',
      breakpoints: {
        xs: 12,
        md: 3
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia"
      }),
      type: 'LOV',
      key: 'familiaProveidor',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: 'familiaProveidors',
        labelKey: (data) => `(${data.nom}) ${data.codi}`,
        sort: 'nom',
        creationComponents: codeAndName()
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.comercial",
        defaultMessage: "Comercial"
      }),
      type: 'LOV',
      key: 'comercial',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        key: 'operaris',
        labelKey: (data) => `(${data.nom}) ${data.codi}`,
        sort: 'nom',
        creationComponents: [
          ...codeAndName(),
          {
            type: 'input',
            key: 'horari',
            placeHolder: props.intl.formatMessage({
              id: "Comercial.horario",
              defaultMessage: "Horario"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            }
          },
          {
            type: 'input',
            key: 'pin',
            placeHolder: props.intl.formatMessage({
              id: "Comercial.pin",
              defaultMessage: "Pin"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'ptenmn',
            placeHolder: props.intl.formatMessage({
              id: "Comercial.ptenmn",
              defaultMessage: "Ptenmn"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          }
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.deshomologado",
        defaultMessage: "Deshomologado"
      }),
      type: 'checkbox',
      key: 'dhm',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.sub_contratista",
        defaultMessage: "SubContratista"
      }),
      type: 'checkbox',
      key: 'subcontratista',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.idioma",
        defaultMessage: "Idioma"
      }),
      type: 'LOV',
      key: 'idioma',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: 'idiomas',
        labelKey: (data) => `(${data.descripcio}) ${data.codi}`,
        sort: 'descripcio',
        creationComponents: codeAndDescription()
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.regiva",
        defaultMessage: "Reg. IVA"
      }),
      type: 'LOV',
      key: 'regimIva',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "regimIvas",
        labelKey: (data) => `(${data.descripcio}) ${data.codi}`,
        sort: 'descripcio',
        creationComponents: codeAndDescription()
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa"
      }),
      type: 'LOV',
      key: 'divisa',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "divisas",
        labelKey: (data) => `(${data.nom}) ${data.codi}`,
        sort: 'nom',
        creationComponents: [
          ...codeAndName(4,4),
          {
            type: 'input',
            key: 'valorEuros',
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          }
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento"
      }),
      type: 'LOV',
      key: 'tipusVenciment',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        key: "tipusVenciments",
        labelKey: (data) => `(${data.descripcio}) ${data.codi}`,
        sort: 'descripcio',
        creationComponents: [
          ...codeAndDescription(4,4),
          {
            type: 'input',
            key: 'tipus',
            placeHolder: props.intl.formatMessage({
              id: "TiposVencimiento.tipos",
              defaultMessage: "Tipos"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          }
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.docpago",
        defaultMessage: "Documento de Pago"
      }),
      type: 'LOV',
      key: 'documentPagamentCobrament',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: (data) => `(${data.descripcio}) ${data.codi}`,
        sort: 'descripcio',
        creationComponents: [
          codeAndDescription(),
        ]
      }
    },
  ];

  const addressConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.tipoVia",
        defaultMessage: "Tipo Vía"
      }),
      type: 'select',
      key: 'tvia',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: [
          {value: "1", label:"One"},
          {value: "2", label:"Two"},
          {value: "3", label:"Three"},
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.domicilio",
        defaultMessage: "Domicilio"
      }),
      type: 'input',
      key: 'domicilio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.numero",
        defaultMessage: "Número"
      }),
      type: 'input',
      key: 'numero',
      required: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.esc",
        defaultMessage: "Esc."
      }),
      type: 'input',
      key: 'esc',
      required: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.piso",
        defaultMessage: "Piso"
      }),
      type: 'input',
      key: 'piso',
      required: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.puerta",
        defaultMessage: "Puerta"
      }),
      type: 'input',
      key: 'puerta',
      required: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.direccionCompleta",
        defaultMessage: "Dirección Completa"
      }),
      type: 'input',
      key: 'concat',
      breakpoints: {
        xs: 12,
        md: 12
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal"
      }),
      type: 'LOV',
      key: 'codiPostal',
      required: false,
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: "codiPostals",
        labelKey: (data) => `(${data.descPostNomCodi}) ${data.codi}`,
        sort: 'codi',
        creationComponents: [
          code(3),
          {
            type: 'input',
            key: 'pais',
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.pais",
              defaultMessage: "País"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3
            }
          },
          {
            type: 'input',
            key: 'poblacio',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3
            }
          },
          {
            type: 'input',
            key: 'provincia',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3
            }
          },
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.poblacion",
        defaultMessage: "Población"
      }),
      type: 'input',
      key: 'poblacion',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
    },
  ];

  const tabs = [
    {
      label: <FormattedMessage id={"Proveedores.direccion"} defaultMessage={"Dirección"}/>,
      key: 0,
      component: <GenericForm formComponents={addressConfig}
                              emptyPaper={true}
                              formData={formData}
                              setFormData={setFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)} />
    },
    {
      label: <FormattedMessage id={"Proveedores.direcciones_comerciales"} defaultMessage={"Direcciones Comerciales"}/>,
      key: 1,
      component: "Direcciones Comerciales"
    },
    {
      label: <FormattedMessage id={"Proveedores.tipos_proveedor"} defaultMessage={"Tipos de Proveedor"}/>,
      key: 2,
      component: "Tipos de Proveedor"
    },
    {
      label: <FormattedMessage id={"Proveedores.cajas"} defaultMessage={"Cajas"}/>,
      key: 3,
      component: "Cajas"
    }
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer title={<FormattedMessage id={"Proveedores.titulo"} defaultMessage={"Proveedores"}/>}>
          <GenericForm formComponents={suppliersConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       formData={formData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}/>
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
export default injectIntl(GeneralTab);