import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import ContactTab from "./ContactTab";
import ContabilidadTab from "./ContabilidadTab";
import FacturacionTab from "./FacturacionTab";
import TipoClienteTab from "./TiposClienteTab";
import AplicadoresTab from "./AplicadoresTab";
import PersonalizacionTab from "./PersonalizacionTab";
import ComercialTab from "./ComercialTab";

import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig } from "redux/pageHeader";
import { getFireSave } from "redux/pageHeader/selectors";
import { withAbmServices } from "../../modules/wrappers";
import { getFormData, getFormErrors, getFormDataByKey, getIsDataLoaded } from "../../redux/genericForm/selectors";

import { setFormDataByKey } from "../../redux/genericForm";
import { getLoading } from "../../redux/app/selectors";

const GENERAL_TAB_INDEX = 0;
const CONTACT_TAB_INDEX = 1;
const CONTAB_TAB_INDEX = 2;
const FACT_TAB_INDEX = 3;
const CLIENTE_TAB_INDEX = 4;
const PERSONAL_TAB_INDEX = 5;
const COMERCIAL_TAB_INDEX = 7;
const APLICADORES_TAB_INDEX = 8;


const ClientesForm = React.memo(({ actions, allFormData, getFormData, submitFromOutside, services, ...props }) => {
    const [editMode, setEditMode] = useState(false);
    const [tabIndex, setTabIndex] = useState(GENERAL_TAB_INDEX);
    const [tabIndexWithError, setTabIndexWithError] = useState({ [GENERAL_TAB_INDEX]: false, [CONTACT_TAB_INDEX]: false, [CONTAB_TAB_INDEX]: false, [FACT_TAB_INDEX]: false,[CLIENTE_TAB_INDEX]: false,[APLICADORES_TAB_INDEX]: false, [PERSONAL_TAB_INDEX]: false  });
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
            label: <FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"} />,
            key: CONTACT_TAB_INDEX,
            error: tabHasError(CONTACT_TAB_INDEX),
            component: <ContactTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [CONTACT_TAB_INDEX]: !value })}
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
            label: <FormattedMessage id={"Proveedores.tabs.contabilidad"} defaultMessage={"Contabilidad"} />,
            key: CONTAB_TAB_INDEX,
            error: tabHasError(CONTAB_TAB_INDEX),
            component: <ContabilidadTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [CONTAB_TAB_INDEX]: !value })}
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
            label: <FormattedMessage id={"Proveedores.tabs.facturacion"} defaultMessage={"Facturación"} />,
            key: FACT_TAB_INDEX,
            error: tabHasError(FACT_TAB_INDEX),
            component: <FacturacionTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [FACT_TAB_INDEX]: !value })}
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
            label: <FormattedMessage id={"Clientes.tipoCliente"} defaultMessage={"Tipo Cliente"} />,
            key: CLIENTE_TAB_INDEX,
            error: tabHasError(CLIENTE_TAB_INDEX),
            component: <TipoClienteTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [CLIENTE_TAB_INDEX]: !value })}
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
            key: PERSONAL_TAB_INDEX,
            error: tabHasError(PERSONAL_TAB_INDEX),
            component: <PersonalizacionTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [PERSONAL_TAB_INDEX]: !value })}
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
            label: <FormattedMessage id={"Proveedores.tabs.documentos"} defaultMessage={"Documentos"} />,
            key: 6,
            component: "Documentos"
        },
        {
            label: <FormattedMessage id={"Clientes.comercial"} defaultMessage={"Comercial"} />,
            key: COMERCIAL_TAB_INDEX,
            error: tabHasError(COMERCIAL_TAB_INDEX),
            component: <ComercialTab
            setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [COMERCIAL_TAB_INDEX ]: !value })}
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
            label: <FormattedMessage id={"Clientes.aplicadores"} defaultMessage={"Aplicadores"} />,
            key: 8,
            error: tabHasError(APLICADORES_TAB_INDEX ),
            component: <AplicadoresTab
                setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [APLICADORES_TAB_INDEX ]: !value })}
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
                { title: props.intl.formatMessage({ id: "Clientes.titulo", defaultMessage: "Clientes" }), href: "/clientes" },
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
            const nomComercial = getFormData('nomFiscal');
            const nom = nomComercial ?
                nomComercial
                :
                `${props.intl.formatMessage({ id: "Comun.cargando", defaultMessage: "Cargando" })}...`;
            actions.setBreadcrumbHeader([
                { title: props.intl.formatMessage({ id: "Clientes.titulo", defaultMessage: "Clientes" }), href: "/clientes" },
                { title: nom, href: "/clientes" },
                { title: "Modificar" }
            ]);
        }
    }, [getFormData('nomFiscal')]);

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
)(ClientesForm);
export default component;