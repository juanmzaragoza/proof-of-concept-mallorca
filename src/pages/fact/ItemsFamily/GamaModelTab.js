import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";



const Gama_ModelTab = ({ formData, setFormData, getFormData, ...props }) => {


  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const { id: itemFamilyId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;
  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];

  const FamiliaGamma = {
    title: props.intl.formatMessage({
      id: "Familia.familiaGama",
      defaultMessage: "Familia Gama",
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
        name: "articleGamma",
        title: props.intl.formatMessage({
          id: "ArticulosGama.titulo",
          defaultMessage: "Gama",
        }),
        getCellValue: (row) =>
          row.articleGamma.description ? row.articleGamma?.description : "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosGama.titulo",
          defaultMessage: "Gama",
        }),
        type: "LOV",
        key: "articleGamma",
        id: "articlesGama",
        breakpoints: {
          xs: 12,
          md: 12,
        },
        selector: {
          key: "articleGammas",
          labelKey: formatCodeAndDescription,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
      },
    ],
  };

  const FamiliaModel = {
    title: props.intl.formatMessage({
      id: "Familia.familiaModelo",
      defaultMessage: "Familia Modelo",
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
        name: "articleModel",
        title: props.intl.formatMessage({
          id: "ArticulosModelo.titulo",
          defaultMessage: "Modelo",
        }),
        getCellValue: (row) =>
          row.articleModel.description ? row.articleModel?.description : "",
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "ArticulosModelo.titulo",
          defaultMessage: "Modelo",
        }),
        type: "LOV",
        key: "articleModel",
        id: "articlesModel",
        required: true,
        breakpoints: {
          xs: 12,
          md: 12,
        },
        selector: {
          key: "articleModels",
          labelKey: formatCodeAndDescription,
          sort: "codi",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndDescription,
        },
        validationType: "object",
      },
    ],
  };

  return (
    <Grid container>
    <Grid xs={6} item>
      <OutlinedContainer
        className="general-tab-container"
        title={
          <FormattedMessage
            id = {"Familia.familiaGama"}
            defaultMessage = {"Familia Gama"}
          />
        }
      >
       <ExpandableGrid
        id="familiesGamma"
        responseKey="familiaGammas"
        enabled={props.editMode}
        configuration={FamiliaGamma}
      />
      </OutlinedContainer>
    </Grid>

    <Grid xs={6} item>
      <OutlinedContainer
        className="general-tab-container"
        title={
          <FormattedMessage
            id = {"Familia.familiaModelo"}
            defaultMessage = {"Familia Modelo"}
          />
        }
      >
       <ExpandableGrid
        id="familiesModel"
        responseKey="familiaModels"
        enabled={props.editMode}
        configuration={FamiliaModel}
      />
      </OutlinedContainer>
    </Grid>
    {/* <OutlinedContainer>
      <ConfigurableTabs tabs={tabs} />
    </OutlinedContainer> */}
  </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(Gama_ModelTab);
