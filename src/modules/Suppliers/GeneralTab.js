import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {injectIntl} from "react-intl";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";

const GeneralTab = ({formData, setFormData, ...props}) => {

  useEffect(() => {
    const getString = (key) => formData[key]? formData[key]:"";
    formData['concat'] = getString('domicilio')+" "+getString('numero')+" "+getString('esc')+" "+getString('piso')+" "+getString('puerta');
  },[formData]);

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
      placeHolder: "Bloqueado",
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
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: 'Código',
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'nom',
            placeHolder: 'Nombre',
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
      placeHolder: "Censado en EAT",
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
        sort: 'nom'
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
        sort: 'nom'
      }
    },
    {
      placeHolder: "Deshomologado",
      type: 'checkbox',
      key: 'dhm',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: "SubContratista",
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
        sort: 'descripcio'
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
        sort: 'descripcio'
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
        sort: 'nom'
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
        sort: 'descripcio'
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
        sort: 'descripcio'
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
        sort: 'codi'
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
      label: "Dirección",
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
      label: "Direcciones Comerciales",
      key: 1,
      component: "Direcciones Comerciales"
    },
    {
      label: "Tipos de Proveedor",
      key: 2,
      component: "Tipos de Proveedor"
    },
    {
      label: "Cajas",
      key: 3,
      component: "Cajas"
    }
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer title={"Proveedores"}>
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