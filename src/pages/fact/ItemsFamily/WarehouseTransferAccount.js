import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const WarehouseTransferAccount = ({ formData, setFormData, getFormData, ...props }) => {

  const { id: itemFamilyId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const aSCodeAndName = [{ title: CODE, name: "codi" }, { title: NOM, name: "nom" }];

  const ComptesTraspasMagatzem = {
    title: props.intl.formatMessage({
      id: "Familia.cuentaTraspasosAlmacenes",
      defaultMessage: "Cuenta Traspaso Almacén",
    }),
    query: [
      {
        columnName: "articleFamilia.id",
        value: `"${itemFamilyId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      articleFamilia: { id: itemFamilyId },
    },
    columns: [
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Familia.articuloFamilia",
          defaultMessage: "Artículo Família",
        }),
        getCellValue: (row) =>
          row.articleFamilia.description ? row.articleFamilia?.description : "",
      },
      {
        name: "magatzem",
        title: props.intl.formatMessage({
          id: "Presupuestos.almacen",
          defaultMessage: "Almacén",
        }),
        getCellValue: (row) =>
          row.magatzem.description ? row.magatzem?.description : "",
      },
      {
        name: "compteTraspas",
        title: props.intl.formatMessage({
          id: "Almacen.cuentaTraspasos",
          defaultMessage: "Cuenta traspasos",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "Proyectos.almacen",
          defaultMessage: "Almacén",
        }),
        type: "LOV",
        key: "magatzem",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "magatzems",
          labelKey: formatCodeAndName,
          sort: "nom",
          advancedSearchColumns: aSCodeAndName,
          cannotCreate: true,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Almacen.cuentaTraspasos",
          defaultMessage: "Cuenta traspasos",
        }),
        type: "input",
        key: "compteTraspas",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
      },
    ],
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Familia.cuentaTraspasosAlmacenes"}
              defaultMessage={"Cuenta Traspaso Almacén"}
            />
          }
        >
         <ExpandableGrid
          id="comptesTraspasMagatzem"
          responseKey="compteTraspasMagatzems"
          enabled={props.editMode}
          configuration={ComptesTraspasMagatzem}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(WarehouseTransferAccount);
