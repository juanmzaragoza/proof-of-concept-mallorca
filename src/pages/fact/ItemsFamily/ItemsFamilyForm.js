import React, {useEffect, useState} from 'react';
import {FormattedMessage, injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import SalesSeriesAccountsTab from "./SalesSeriesAccountsTab";
import PurchasingSeriesAccountsTab from "./PurchasingSeriesAccountsTab";
import WarehouseTransferAccount from "./WarehouseTransferAccount";
import CustomerAccountTab from "./CustomerAccountTab";
import SupplierAccountTab from "./SupplierAccountTab";
import Gama_ModelTab from "./Gama_ModelTab";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {withAbmServices} from "../../../modules/wrappers";
import {getFormData, getFormErrors, getFormDataByKey, getIsDataLoaded} from "../../../redux/genericForm/selectors";

import {setFormDataByKey} from "../../../redux/genericForm";
import {getLoading} from "../../../redux/app/selectors";

/**
 * Items Family form module
 * If you want add a new tab, follow the next steps
 **/
/** step 1 */
const GENERAL_TAB_INDEX = 0;
const SALES_SERIES_ACCOUNTS_TAB_INDEX = 1;
const PURCHASING_SERIES_ACCOUNTS_TAB_INDEX = 2;
const WHAREHOUSE_TRANSFER_ACCOUNT_TAB_INDEX = 3;
const CUSTOMER_ACCOUNT_TAB_INDEX = 4;
const SUPPLIER_ACCOUNT_TAB_INDEX = 5;
const GAMA_MODEL_TAB_INDEX = 6;

const ItemsFamilyForm = React.memo(({ actions, allFormData, getFormData, submitFromOutside, services, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const [tabIndex, setTabIndex] = useState(GENERAL_TAB_INDEX);
  const [nameSelectedTab, setNameSelectedTab] = useState('');

  /** step 2 */
  const [tabIndexWithError, setTabIndexWithError] = useState({[GENERAL_TAB_INDEX]: false, 
    [SALES_SERIES_ACCOUNTS_TAB_INDEX]: false, [PURCHASING_SERIES_ACCOUNTS_TAB_INDEX]: false, 
    [WHAREHOUSE_TRANSFER_ACCOUNT_TAB_INDEX]: false, [CUSTOMER_ACCOUNT_TAB_INDEX]: false,
    [SUPPLIER_ACCOUNT_TAB_INDEX]: false, [GAMA_MODEL_TAB_INDEX]: false,
  });
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
    if(some(Object.keys(tabIndexWithError), (index) => tabIndexWithError[index])){
      // of all keys === true -> get the min
      goToTab(min(Object.keys(pickBy(tabIndexWithError,(value, key) => value))));
    } else{
      isEditable()? update(id, allFormData):create(allFormData, () => {
        goToTab(GENERAL_TAB_INDEX);
      });
    }
  }

  const getTranslations = (id, defaultMessage) => {
    return {
      label: <FormattedMessage id={id} defaultMessage={defaultMessage}/>,
      labelStr: props.intl.formatMessage({id: id, defaultMessage: defaultMessage}),
    }
  }
  
  /** step 3 */
  const tabs = [
    {
      ...getTranslations("Proveedores.tabs.general","General"),
      key: GENERAL_TAB_INDEX,
      error: tabHasError(GENERAL_TAB_INDEX),
      component: <GeneralTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [GENERAL_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.seriesVenta","Cuentas Series Ventas"),
      key: SALES_SERIES_ACCOUNTS_TAB_INDEX,
      error: tabHasError(SALES_SERIES_ACCOUNTS_TAB_INDEX),
      component: <SalesSeriesAccountsTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [SALES_SERIES_ACCOUNTS_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.seriesCompra","Cuentas Series Compras"),
      key: PURCHASING_SERIES_ACCOUNTS_TAB_INDEX,
      error: tabHasError(PURCHASING_SERIES_ACCOUNTS_TAB_INDEX),
      component: <PurchasingSeriesAccountsTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [PURCHASING_SERIES_ACCOUNTS_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.cuentasTraspasos","Cuentas Traspasos Almacenes"),
      key: WHAREHOUSE_TRANSFER_ACCOUNT_TAB_INDEX,
      error: tabHasError(WHAREHOUSE_TRANSFER_ACCOUNT_TAB_INDEX),
      component: <WarehouseTransferAccount
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [WHAREHOUSE_TRANSFER_ACCOUNT_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.cuentasClientes","Cuentas Clientes"),
      key: CUSTOMER_ACCOUNT_TAB_INDEX,
      error: tabHasError(CUSTOMER_ACCOUNT_TAB_INDEX),
      component: <CustomerAccountTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [CUSTOMER_ACCOUNT_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.cuentasProveedores","Cuentas Proveedores"),
      key: SUPPLIER_ACCOUNT_TAB_INDEX,
      error: tabHasError(SUPPLIER_ACCOUNT_TAB_INDEX),
      component: <SupplierAccountTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [SUPPLIER_ACCOUNT_TAB_INDEX]: !value})}
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
      ...getTranslations("FamiliaArticulos.tabs.gama_Modelo","Gamas-Modelos"),
      key: GAMA_MODEL_TAB_INDEX,
      error: tabHasError(GAMA_MODEL_TAB_INDEX),
      component: <Gama_ModelTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [GAMA_MODEL_TAB_INDEX]: !value})}
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
    if(isEditable()){
      setEditMode(true);
      services.getById(id);
    } else{
      actions.setBreadcrumbHeader([
        {title: props.intl.formatMessage({id: "FamiliasArticulos.titulo", defaultMessage: "Familia de Artículos"}), href:"/article-familia"},
        {title: props.intl.formatMessage({id: "Comun.nuevo", defaultMessage: "Nuevo"})}
      ]);
    }
    return () => {
      props.resetForm();
    }
  },[id]);

  useEffect(()=>{
    setNameSelectedTab(getTabName(tabIndex));
  },[tabIndex]);

  /** Update HEADER */
  useEffect(()=>{
    if(isEditable()){
      const descripcio = getFormData('descripcio');
      const desc = descripcio?
      descripcio
        :
        `${props.intl.formatMessage({id: "Comun.cargando", defaultMessage: "Cargando"})}...`;
      actions.setBreadcrumbHeader([
        {title: props.intl.formatMessage({id: "FamiliasArticulos.titulo", defaultMessage: "Familia de Artículos"}), href:"/article-familia"},
        {title: desc, href:"/article-familia"},
        {title: nameSelectedTab}
      ]);
    }
  },[getFormData('descripcio'),nameSelectedTab]);

  useEffect(() => {
    if(submitFromOutside){
      actions.setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  useEffect(()=>{
    if(editMode){
      const tabsWithErrors = cloneDeep(tabIndexWithError);
      Object.keys(tabsWithErrors).map((t,index) => {
        tabsWithErrors[index] = editMode? !editMode:tabsWithErrors[index];
      });
      setTabIndexWithError(tabsWithErrors);
    }
  },[editMode]);

  const getTabName = (value) => {
    const tab = tabs.find(tab => tab.key === value);
    return tab?.labelStr;
  }

  return (
    <div style={{padding: '10px'}}>
      <ConfigurableTabs
        tabs={tabs}
        tabIndex={tabIndex}
        forceChange={forceTabChange}
        onChange={(value) => setNameSelectedTab(getTabName(value))} />
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
)(ItemsFamilyForm);
export default component;