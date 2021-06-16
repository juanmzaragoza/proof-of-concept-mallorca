import React, { useEffect, useState } from "react";
import * as API from "../../redux/api";
import ReactGrid from "../../modules/ReactGrid";
import { bindActionCreators, compose } from "redux";
import { setBreadcrumbHeader, setListingConfig } from "../../redux/pageHeader";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

const ClientList = ({ actions, ...props }) => {

    useEffect(() => {
        actions.setListingConfig({
            title: props.intl.formatMessage({
                id: "Clientes.titulo",
                defaultMessage: " Clientes"
            }),
        });
        actions.setBreadcrumbHeader([
            { title: "Clientes", href: "/clientes" }
        ]);
    }, []);

    const listConfiguration = {
        title: props.intl.formatMessage({
            id: "Clientes.titulo",
            defaultMessage: "Clientes"
        }),
        columns: [
            {
                name: 'codi',
                title: props.intl.formatMessage({
                    id: "Proveedores.codigo",
                    defaultMessage: "Código"
                })
            },
            {
                name: 'nomFiscal',
                title: props.intl.formatMessage({
                    id: "Proveedores.nombre_fiscal",
                    defaultMessage: "Nombre fiscal"
                })
            },
            {
                name: 'nif',
                title: props.intl.formatMessage({
                    id: "Empresas.nif",
                    defaultMessage: "NIF"
                })
            },
            {
                name: 'familiaClient.description',
                title: props.intl.formatMessage({
                    id: "Proveedores.familia",
                    defaultMessage: "Familia"
                }),
                getCellValue: row => row.familiaClient?.description ? row.familiaClient.description : ""
            },
            {
                name: 'codiPostal.description',
                title: props.intl.formatMessage({
                    id: "Proveedores.Direccion.codPostal",
                    defaultMessage: "Codi postal"
                }),
                getCellValue: row => row.codiPostal?.description ? row.codiPostal.description : ""
            },
        ],
        URL: API.clientes,
        listKey: 'clients'
    };


    return (
        <>
            <ReactGrid id='clientes'
                configuration={listConfiguration} />
        </>
    )
};
const mapDispatchToProps = (dispatch, props) => {
    const actions = {
        setListingConfig: bindActionCreators(setListingConfig, dispatch),
        setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch)
    };
    return { actions };
};


export default compose(
    injectIntl,
    connect(null, mapDispatchToProps)
)(ClientList);
