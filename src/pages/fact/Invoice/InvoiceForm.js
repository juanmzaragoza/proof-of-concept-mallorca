import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import AlbaranesTab from "./AlbaranesTab";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import {
  setBreadcrumbHeader,
  setFireSaveFromHeader,
  setFormConfig,
} from "redux/pageHeader";
import { getFireSave } from "redux/pageHeader/selectors";
import { withAbmServices } from "../../../modules/wrappers";
import {
  getFormData,
  getFormErrors,
  getFormDataByKey,
  getIsDataLoaded,
} from "../../../redux/genericForm/selectors";

import { setFormDataByKey } from "../../../redux/genericForm";
import { getLoading } from "../../../redux/app/selectors";
import RegistroEntradaTab from "./RegistroEntradaTab";

const GENERAL_TAB_INDEX = 0;
const CONTAB_TAB_INDEX = 1;
const REG_EN_TAB_INDEX = 2;

const InvoiceForm = React.memo(
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

    const [tabIndexWithError, setTabIndexWithError] = useState({
      [GENERAL_TAB_INDEX]: false,
      [CONTAB_TAB_INDEX]: false,
      [REG_EN_TAB_INDEX]: false,
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

    const tabs = [
      {
        ...getTranslations("Proveedores.tabs.general", "General"),
        key: GENERAL_TAB_INDEX,
        error: tabHasError(GENERAL_TAB_INDEX),
        component: (
          <GeneralTab
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
        ...getTranslations("Clientes.Documentos.albaranes", "Albaranes"),
        key: CONTAB_TAB_INDEX,
        error: tabHasError(CONTAB_TAB_INDEX),
        component: (
          <AlbaranesTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [CONTAB_TAB_INDEX]: !value,
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
        ...getTranslations("Facturas.tabs.registroEntrada", "Registro Entrada"),
        key: REG_EN_TAB_INDEX,
        error: tabHasError(REG_EN_TAB_INDEX),
        component: (
          <RegistroEntradaTab
            setIsValid={(value) =>
              setTabIndexWithError({
                ...tabIndexWithError,
                [REG_EN_TAB_INDEX]: !value,
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
              id: "Facturas.titulo",
              defaultMessage: "Facturas",
            }),
            href: "/fact/facturas",
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
        const nomComercial = getFormData("nomFiscalClient");
        const nom = nomComercial
          ? nomComercial
          : `${props.intl.formatMessage({
              id: "Comun.cargando",
              defaultMessage: "Cargando",
            })}...`;
        actions.setBreadcrumbHeader([
          {
            title: props.intl.formatMessage({
              id: "Facturas.titulo",
              defaultMessage: "Facturas",
            }),
            href: "/fact/facturas",
          },
          { title: nom, href: "/fact/facturas" },
          { title: nameSelectedTab },
        ]);
      }
    }, [getFormData("nomFiscalClient"), nameSelectedTab]);

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
)(InvoiceForm);
export default component;
