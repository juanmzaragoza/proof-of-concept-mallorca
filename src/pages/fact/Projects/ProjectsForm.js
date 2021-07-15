import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import {
  setBreadcrumbHeader,
  setFireSaveFromHeader,
  setFormConfig,
} from "redux/pageHeader";
import { getFireSave } from "redux/pageHeader/selectors";
import { withAbmServices } from "modules/wrappers";
import {
  getFormData,
  getFormErrors,
  getFormDataByKey,
  getIsDataLoaded,
} from "redux/genericForm/selectors";

import { setFormDataByKey } from "redux/genericForm";
import { getLoading } from "redux/app/selectors";
import ProjectDataTab from "./ProjectDataTab";
import MoreTab from "./MoreTab";
import BudgetTab from "./BudgetTab";
import ProjectsAppTab from "./ProjectsAppTab";
import ExpirationSupplierTab from "./ExpirationSupplierTab";
import RespHistoryTab from "./RespHistoryTab";
import InvSujetoPasivoTab from "./InvSujetoPasivoTab";
import CertificacionesTab from "./CertificacionesTab";
import DocumentsTab from "./DocumentsTab";

/**
 * Suppliers form module
 * If you want add a new tab, follow the next steps
 **/
/** step 1 */
const GENERAL_TAB_INDEX = 0;
const MORE_TAB_INDEX = 1;
const BUDGET_TAB_INDEX = 2;
const PROJECT_APP_TAB_INDEX = 4;
const EXPIRATION_TAB_INDEX = 5;
const INV_SUJ_TAB_INDEX = 6;
const HISTORY_TAB_INDEX = 7;
const CERT_TAB_INDEX =3;
const DOCUMENTS_TAB_INDEX = 8;

const ProjectsForm = React.memo(
  ({
    actions,
    allFormData,
    getFormData,
    submitFromOutside,
    services,
    ...props
  }) => {
    const [editMode, setEditMode] = useState(false);
    const [tabIndex, setTabIndex] = useState(GENERAL_TAB_INDEX);
    const [nameSelectedTab, setNameSelectedTab] = useState("");

    /** step 2 */
    const [tabIndexWithError, setTabIndexWithError] = useState({
      [GENERAL_TAB_INDEX]: false,
      [MORE_TAB_INDEX]: false,
      [BUDGET_TAB_INDEX]:false,
      [PROJECT_APP_TAB_INDEX]:false,
      [EXPIRATION_TAB_INDEX]:false,
      [INV_SUJ_TAB_INDEX]:false,
      [HISTORY_TAB_INDEX]:false,
      [CERT_TAB_INDEX]:false,
      [DOCUMENTS_TAB_INDEX]:false
    });
    const [forceTabChange, setForceTabChange] = useState(false);

    const tabHasError = (index) => {
      return !!tabIndexWithError[index];
    };

    const goToTab = (index) => {
      setForceTabChange(true);
      setTabIndex(parseInt(index));
      setForceTabChange(false);
    };

    const handleSubmitTab = () => {
      // TODO() improve this to make it more generic
      // if exists some error -> go to minimum index
      if (
        some(
          Object.keys(tabIndexWithError),
          (index) => tabIndexWithError[index]
        )
      ) {
        // of all keys === true -> get the min
        goToTab(
          min(Object.keys(pickBy(tabIndexWithError, (value, key) => value)))
        );
      } else {
        isEditable()
          ? update(id, allFormData)
          : create(allFormData, () => {
              goToTab(GENERAL_TAB_INDEX);
            });
      }
    };

    const getTranslations = (id, defaultMessage) => {
      return {
        label: <FormattedMessage id={id} defaultMessage={defaultMessage} />,
        labelStr: props.intl.formatMessage({
          id: id,
          defaultMessage: defaultMessage,
        }),
      };
    };

    /** step 3 */
    const tabs = [
      {
        ...getTranslations("Proyectos.tabs.datosProyecto", "Datos proyecto"),
        key: GENERAL_TAB_INDEX,
        error: tabHasError(GENERAL_TAB_INDEX),
        component: (
          <ProjectDataTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [GENERAL_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations("Proyectos.tabs.mas", "Más"),
        key: MORE_TAB_INDEX,
        error: tabHasError(MORE_TAB_INDEX),
        component: (
          <MoreTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [MORE_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations("Proyectos.presupuestos", "Presupuestos"),
        key: BUDGET_TAB_INDEX,
        error: tabHasError(BUDGET_TAB_INDEX),
        component: (
          <BudgetTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [BUDGET_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations("Proyectos.certificaciones", "Certificaciones"),
        key: CERT_TAB_INDEX,
        error: tabHasError(CERT_TAB_INDEX),
        component: (
          <CertificacionesTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [CERT_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      
      {
        ...getTranslations("Proyectos.otraAplicacion", "Proyectos otras App"),
        key: PROJECT_APP_TAB_INDEX,
        error: tabHasError(PROJECT_APP_TAB_INDEX),
        component: (
          <ProjectsAppTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [PROJECT_APP_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations("Proyectos.vencProv", "Vencimeintos por proveedor"),
        key: EXPIRATION_TAB_INDEX,
        error: tabHasError(EXPIRATION_TAB_INDEX),
        component: (
          <ExpirationSupplierTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [EXPIRATION_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations("Proyectos.inversionSujeto", "Inversión Sujeto Pasivo"),
        key: INV_SUJ_TAB_INDEX,
        error: tabHasError(INV_SUJ_TAB_INDEX),
        component: (
          <InvSujetoPasivoTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [INV_SUJ_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      
      {
        ...getTranslations("Proyectos.historialResp", "Historial Responsables"),
        key: HISTORY_TAB_INDEX,
        error: tabHasError(HISTORY_TAB_INDEX),
        component: (
          <RespHistoryTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [HISTORY_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },
      {
        ...getTranslations( "Proveedores.tabs.documentos", "Documentos "),
        key: DOCUMENTS_TAB_INDEX,
        error: tabHasError(DOCUMENTS_TAB_INDEX),
        component: (
          <DocumentsTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [DOCUMENTS_TAB_INDEX]: !value,
              })
            }
            editMode={editMode}
            getFormData={getFormData}
            setFormData={actions.setFormData}
            submitFromOutside={submitFromOutside}
            onSubmitTab={handleSubmitTab}
            formErrors={props.formErrors}
            loading={props.loading}
            formDataLoaded={props.formDataLoaded}
          />
        ),
      },


      
    ];

    const { id } = useParams();

    const isEditable = () => {
      return !!id;
    };

    const create = (data, callback) => services.create(data, callback);
    const update = (id, data) => services.update(id, data);

    useEffect(() => {
      actions.setFormConfig({});
      if (isEditable()) {
        setEditMode(true);
        services.getById(id);
      } else {
        actions.setBreadcrumbHeader([
          {
            title: props.intl.formatMessage({
              id: "Proyectos.titulo",
              defaultMessage: "Proyectos",
            }),
            href: "/proyectos",
          },
          {
            title: props.intl.formatMessage({
              id: "Comun.nuevo",
              defaultMessage: "Nuevo",
            }),
          },
        ]);
      }
      return () => {
        props.resetForm();
      };
    }, [id]);

    useEffect(() => {
      setNameSelectedTab(getTabName(tabIndex));
    }, [tabIndex]);

    /** Update HEADER */
    useEffect(() => {
      if (isEditable()) {
        const nomComercial = getFormData("nom");
        const nom = nomComercial
          ? nomComercial
          : `${props.intl.formatMessage({
              id: "Comun.cargando",
              defaultMessage: "Cargando",
            })}...`;
        actions.setBreadcrumbHeader([
          {
            title: props.intl.formatMessage({
              id: "Proyectos.titulo",
              defaultMessage: "Proyectos",
            }),
            href: "/proyectos",
          },
          { title: nom, href: "/proyectos" },
          { title: nameSelectedTab },
        ]);
      }
    }, [getFormData("nom"), nameSelectedTab]);

    useEffect(() => {
      if (submitFromOutside) {
        actions.setSubmitFromOutside(false);
      }
    }, [submitFromOutside]);

    useEffect(() => {
      if (editMode) {
        const tabsWithErrors = cloneDeep(tabIndexWithError);
        Object.keys(tabsWithErrors).map((t, index) => {
          tabsWithErrors[index] = editMode ? !editMode : tabsWithErrors[index];
        });
        setTabIndexWithError(tabsWithErrors);
      }
    }, [editMode]);

    const getTabName = (value) => {
      const tab = tabs.find((tab) => tab.key === value);
      return tab?.labelStr;
    };

    return (
      <div style={{ padding: "10px" }}>
        <ConfigurableTabs
          tabs={tabs}
          tabIndex={tabIndex}
          forceChange={forceTabChange}
          onChange={(value) => setNameSelectedTab(getTabName(value))}
        />
      </div>
    );
  }
);

const mapStateToProps = (state, props) => {
  return {
    submitFromOutside: getFireSave(state),
    formErrors: getFormErrors(state),
    loading: getLoading(state),
    allFormData: getFormData(state),
    getFormData: getFormDataByKey(state),
    formDataLoaded: getIsDataLoaded(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
    setSubmitFromOutside: bindActionCreators(setFireSaveFromHeader, dispatch),
    setFormData: bindActionCreators(setFormDataByKey, dispatch),
  };
  return { actions };
};

const component = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  withAbmServices
)(ProjectsForm);
export default component;
