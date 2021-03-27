import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "../shared/OutlinedContainer";
import {FormattedMessage, injectIntl} from "react-intl";
import GenericForm from "../GenericForm";
import React, {useEffect} from "react";
import {compose} from "redux";

const ContactTab = ({formData, setFormData, ...props}) => {

  const contactsConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.zona",
        defaultMessage: "Zona"
      }),
      type: 'LOV',
      key: 'zona',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      selector: {
        key: "zonas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'nom',
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: props.intl.formatMessage({
              id: "Comun.codigo",
              defaultMessage: "Código"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
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
              md: 6
            }
          }
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.contacto",
        defaultMessage: "Contacto"
      }),
      type: 'input',
      key: 'contacte',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.telefono",
        defaultMessage: "Telefóno"
      }),
      type: 'input',
      key: 'telefon',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.fax",
        defaultMessage: "Fax"
      }),
      type: 'input',
      key: 'fax',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.email",
        defaultMessage: "E-mail"
      }),
      type: 'input',
      key: 'email',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.web",
        defaultMessage: "WWW"
      }),
      type: 'input',
      key: 'web',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.representante",
        defaultMessage: "Representante"
      }),
      type: 'input',
      key: 'representant',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.dni_representante",
        defaultMessage: "DNI Representante"
      }),
      type: 'input',
      key: 'dnirepresentant',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
  ];

  //TODO() think then how resolve it
  useEffect(()=>{
    props.setIsValid && props.setIsValid(true);
  },[formData])

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="contact-tab-container" title={<FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"}/>}>
          <GenericForm formComponents={contactsConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       formData={formData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  )
}

export default compose(injectIntl)(ContactTab);