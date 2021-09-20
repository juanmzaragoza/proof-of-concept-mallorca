import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

import { creationFields } from "./configuration";

const OfferSupplierTypeCreate = (props) => {
  return (
    <CreateUpdateForm
      title={props.intl.formatMessage({
        id: "TipoOfertaProv.titulo",
        defaultMessage: "Tipo Ofertas Prov",
      })}
      formConfiguration={creationFields(props)}
      url={API.tipusOfertesProveidor}
    />
  );
};

export default compose(withValidations, injectIntl)(OfferSupplierTypeCreate);
