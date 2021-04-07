import Grid from "@material-ui/core/Grid/Grid";
import OutlinedContainer from "../shared/OutlinedContainer";
import {FormattedMessage, injectIntl} from "react-intl";
import GenericForm from "../GenericForm";
import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {every} from "lodash";

const ContactTab = ({formData, setFormData, ...props}) => {
  const [formIsValid, setFormIsValid] = useState({});
  const [touched, setTouched] = useState({0:false});

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
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [props.intl.formatMessage({
            id: "Validaciones.requerido",
            defaultMessage: "Este campo es obligatorio"
          })]
        },
        {
          type: "min",
          params: [5, props.intl.formatMessage({
            id: "Validaciones.numeros.min",
            defaultMessage: "Debe ingresar al menos {min} carácteres"
          },{min: 5})]
        },
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.telefono",
        defaultMessage: "Telefóno"
      }),
      type: 'input',
      key: 'telefon',
      required: true,
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
      breakpoints: {
        xs: 12,
        md: 6
      },
    },
  ];

  //TODO() REFACTOR -> can we move this?
  useEffect(()=>{
    /** We can take the formIsValid, only if all fields are touched*/
    if(isTouched()){
      validation(every(formIsValid, (v) => v));
    } else{
      /** Else, we depend on editMode property */
      validation(props.editMode);
    }
  },[formIsValid]);

  const validation = (validity) => {
    props.setIsValid && props.setIsValid(validity);
  }

  const addValidity = (key, value) => {
    setFormIsValid({...formIsValid, [key]: value});
  }

  /** All forms are touched? */
  const handleTouched = (key) => {
    setTouched({...touched,[key]: true});
  }

  const isTouched = () => {
    return every(touched, (v) => v);
  }

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="contact-tab-container" title={<FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"}/>}>
          <GenericForm
            formComponents={contactsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            formData={formData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={value => addValidity(0,value)}
            onBlur={(e) => handleTouched(0)}/>
        </OutlinedContainer>
      </Grid>
    </Grid>
  )
}

export default compose(injectIntl)(ContactTab);