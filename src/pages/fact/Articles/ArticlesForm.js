import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import PriceTab from "./PriceTab";
import StockTab from "./StockTab";
import PresentacionTab from "./PresentacionTab";
import ProveedoresTab from "./ProveedoresTab";
import CostesTab from "./CostesTab";
import PersonalizacionTab from "./PersonalizacionTab";
import EscandallosTab from "./EscandallosTab";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig } from "redux/pageHeader";
import { getFireSave } from "redux/pageHeader/selectors";
import { withAbmServices } from "../../../modules/wrappers";
import { getFormData, getFormErrors, getFormDataByKey, getIsDataLoaded } from "../../../redux/genericForm/selectors";

import { setFormDataByKey } from "../../../redux/genericForm";
import { getLoading } from "../../../redux/app/selectors";

const GENERAL_TAB_INDEX = 0;
const PRICE_TAB_INDEX = 1;
const STOCK_TAB_INDEX = 2;
const PRESENTACION_TAB_INDEX = 3;
const PROVEEDORES_TAB_INDEX = 4 ;
const COSTES_TAB_INDEX = 5;
const PERSONALIZACION_TAB_INDEX = 6;
const ESCANDALLOS_TAB_INDEX = 7;


const ArticlesForm = React.memo(({ actions, allFormData, getFormData, submitFromOutside, services, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const [tabIndex, setTabIndex] = useState(GENERAL_TAB_INDEX);
  const [tabIndexWithError, setTabIndexWithError] = useState({ [GENERAL_TAB_INDEX]: false, [PRICE_TAB_INDEX]: false, 
    [STOCK_TAB_INDEX]: false, [PRESENTACION_TAB_INDEX]: false, [PROVEEDORES_TAB_INDEX]: false, [COSTES_TAB_INDEX]: false, 
    [PERSONALIZACION_TAB_INDEX]: false, [ESCANDALLOS_TAB_INDEX]: false });

  const [forceTabChange, setForceTabChange] = useState(false);

  const tabHasError = (index) => {
    return !!tabIndexWithError[index];
  }

  const goToTab = (index) => {
    setForceTabChange(true);
    setTabIndex(parseInt(index));
    setForceTabChange(false);
  }

  const handleSubmitTab = () => {
    // TODO() improve this to make it more generic
    // if exists some error -> go to minimum index
    if (some(Object.keys(tabIndexWithError), (index) => tabIndexWithError[index])) {
      // of all keys === true -> get the min
      goToTab(min(Object.keys(pickBy(tabIndexWithError, (value, key) => value))));
    } else {
      isEditable() ? update(id, allFormData) : create(allFormData, () => {
        goToTab(GENERAL_TAB_INDEX);
      });
    }
  }

  const tabs = [
    {
      label: <FormattedMessage id={"Proveedores.tabs.general"} defaultMessage={"General"} />,
      key: GENERAL_TAB_INDEX,
      error: tabHasError(GENERAL_TAB_INDEX),
      component: <GeneralTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [GENERAL_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Articulos.precio"} defaultMessage={"Precio"} />,
      key: PRICE_TAB_INDEX,
      error: tabHasError(PRICE_TAB_INDEX),
      component: <PriceTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [PRICE_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Articulos.tab.stock"} defaultMessage={"Stock"} />,
      key: STOCK_TAB_INDEX,
      error: tabHasError(STOCK_TAB_INDEX),
      component: <StockTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [STOCK_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Articulos.tab.presentacion"} defaultMessage={"Presentación"} />,
      key: PRESENTACION_TAB_INDEX,
      error: tabHasError(PRESENTACION_TAB_INDEX),
      component: <PresentacionTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [PRESENTACION_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Proveedores.titulo"} defaultMessage={"Proveedores"} />,
      key: PROVEEDORES_TAB_INDEX,
      error: tabHasError(PROVEEDORES_TAB_INDEX),
      component: <ProveedoresTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [PROVEEDORES_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },

    {
      label: <FormattedMessage id={"Articulos.tab.costes"} defaultMessage={"Costes"} />,
      key: COSTES_TAB_INDEX,
      error: tabHasError(COSTES_TAB_INDEX),
      component: <CostesTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [COSTES_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Proveedores.tabs.personalizacion"} defaultMessage={"Personalización"} />,
      key: PERSONALIZACION_TAB_INDEX,
      error: tabHasError(PERSONALIZACION_TAB_INDEX),
      component: <PersonalizacionTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [PERSONALIZACION_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
    {
      label: <FormattedMessage id={"Articulos.tab.escandallos"} defaultMessage={"Escandallos"} />,
      key: ESCANDALLOS_TAB_INDEX,
      error: tabHasError(ESCANDALLOS_TAB_INDEX),
      component: <EscandallosTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [ESCANDALLOS_TAB_INDEX ]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
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
        { title: props.intl.formatMessage({ id: "Articulos.titulo", defaultMessage: "Artículos" }), href: "/article" },
        { title: props.intl.formatMessage({ id: "Comun.nuevo", defaultMessage: "Nuevo" }) }
      ]);
    }
    return () => {
      props.resetForm();
    }
  }, [id]);

  /** Update HEADER */
  useEffect(() => {
    if (isEditable()) {
      const descripcioCurta = getFormData('descripcioCurta');
      const des = descripcioCurta ?
      descripcioCurta
        :
        `${props.intl.formatMessage({ id: "Comun.cargando", defaultMessage: "Cargando" })}...`;
      actions.setBreadcrumbHeader([
        { title: props.intl.formatMessage({ id: "Articulos.titulo", defaultMessage: "Artículos" }), href: "/article" },
        { title: des, href: "/article" },
        { title: "Modificar" }
      ]);
    }
  }, [getFormData('descripcioCurta')]);

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

  return (
    <div style={{ padding: '10px' }}>
      <ConfigurableTabs
        tabs={tabs}
        tabIndex={tabIndex}
        forceChange={forceTabChange} />
    </div>
  )
});

const mapStateToProps = (state, props) => {
  return {
    submitFromOutside: getFireSave(state),
    formErrors: getFormErrors(state),
    loading: getLoading(state),
    allFormData: getFormData(state),
    getFormData: getFormDataByKey(state),
    formDataLoaded: getIsDataLoaded(state)
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
)(ArticlesForm);
export default component;