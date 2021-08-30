import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const INVOICE_SECTION_INDEX = 0;
const FACTORING_SECTION_TAB_INDEX = 1;
const RETENTION_SECTION_TAB_INDEX = 2;
const AEAT_SECTION_TAB_INDEX = 3;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INVOICE_SECTION_INDEX]: true,
      [FACTORING_SECTION_TAB_INDEX]: true,
      [RETENTION_SECTION_TAB_INDEX]: true,
      [AEAT_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });


  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });







  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];



  const invoiceConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.registroEntrada",
        defaultMessage: "Registro Entrada",
      }),
      type: "date",
      key: "registreEntrada",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsDataRegistre",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.conformacio",
        defaultMessage: "Fecha conformación",
      }),
      type: "date",
      key: "dataConformacioFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsDataReclamacio",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.aprovacion",
        defaultMessage: "Fecha aprovación",
      }),
      type: "date",
      key: "dataAprovacioFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsDataAprovacio",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.prevista",
        defaultMessage: "Fecha Prevista Cobro",
      }),
      type: "date",
      key: "dataPrevistaFactura",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsDataPrevista",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.previstaAcep",
        defaultMessage: "Fecha Prevista Aceptacion",
      }),
      type: "date",
      key: "dataPrevistaAcceptacio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.numRegistro",
        defaultMessage: "Num. Registro Fact.Electrónico",
      }),
      type: "input",
      key: "numRegFacEle",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.morosa",
        defaultMessage: "Factura Morosa",
      }),
      type: "checkbox",
      key: "morosa",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  const factorizacionConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.liniaFactoring",
        defaultMessage: "Línia Factoring",
      }),
      type: "LOV",
      key: "liniaFactoring",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "liniaFactorings",
        labelKey: (data) => `${data.bancNom} (${data.contracteNumero}) `,
        sort: "bancNom",
        cannotCreate: true,
        advancedSearchColumns: [
          { title: CODE, name: "contracteNumero" },
          {
            title: props.intl.formatMessage({
              id: "Clientes.banco",
              defaultMessage: "Banco",
            }),
            name: "bancNom",
          },
        ],
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.fechaFactorizacion",
        defaultMessage: "Fecha Factorización ",
      }),
      type: "date",
      key: "dataFactoring",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.vencimientoFactorizacion",
        defaultMessage: "Vencimiento Factorización ",
      }),
      type: "date",
      key: "dataVencimentFactoring",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.importeAnticipado",
        defaultMessage: "Importe Anticipado ",
      }),
      type: "numeric",
      key: "importAnticipat",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  const retencionesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.reclamacionRetencion",
        defaultMessage: "Fecha Reclamación Retención",
      }),
      type: "date",
      key: "dataReclamacioRetencio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsReclamacioRetencio",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.aprovacionRetencion",
        defaultMessage: "Fecha Aprovación Retención",
      }),
      type: "date",
      key: "dataAprovacioRetencio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsAprovacioRetencio",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.previstaRetencion",
        defaultMessage: "Fecha Prevista Cobro Retención",
      }),
      type: "date",
      key: "dataPrevistaRetencio",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacionsPrevistaRetencio",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const aeatConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.banco",
        defaultMessage: "Banco ",
      }),
      type: "LOV",
      key: "banc",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "bancs",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.aeat",
        defaultMessage: "AEAT ",
      }),
      type: "checkbox",
      key: "aeat",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.aceptado",
        defaultMessage: "Aceptado ",
      }),
      type: "checkbox",
      key: "aeatAcc",
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
  ];

  const tabs = [
    {
      className: "general-tab-subtab",
      label: (
        <FormattedMessage
          id={"Facturas.factorizacion"}
          defaultMessage={"Factorización"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={factorizacionConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(FACTORING_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(FACTORING_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Facturas.estadoRetenciones"}
          defaultMessage={"Estado Retenciones"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={retencionesConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(RETENTION_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(RETENTION_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: <FormattedMessage id={"Facturas.aeat"} defaultMessage={"AEAT"} />,
      key: 2,
      component: (
        <GenericForm
          formComponents={aeatConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(AEAT_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(AEAT_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Facturas.tabs.registroEntrada"}
              defaultMessage={"Registro Entrada"}
            />
          }
        >
          <GenericForm
            formComponents={invoiceConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(INVOICE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(INVOICE_SECTION_INDEX)}
            {...props}
          />
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
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
