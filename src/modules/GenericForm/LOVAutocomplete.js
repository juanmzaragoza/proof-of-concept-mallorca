import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { some, get, unionBy } from "lodash";

import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { FormHelperText, IconButton, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

import LOVForm from "./LOVForm";
import {
  getDataFormSelectorById,
  getLoadingFormSelectorById,
  getPageFormSelectorById,
  getQueryFormSelectorById,
  getQuerySearchFormSelectorById,
  getRefreshFormSelectorById,
  getTotalPagesFormSelectorById,
  getIsDisabledById,
  getIsResetById,
} from "redux/genericForm/selectors";
import {
  appendDataToFormSelector,
  decrementPageToFormSelector,
  getFormSelectorData,
  getFormSelectorDataById,
  incrementPageToFormSelector,
  refreshAFormSelector,
  searchByQueryTerm,
  setQueryFromSelector,
  disableRelatedField,
  changeResetValue,
} from "redux/genericForm";
import LOVAdvancedSearch from "./LOVAdvancedSearch";

const filter = createFilterOptions();

const ADD_TYPE = "add";
const PAGINATION_TYPE = "pagination";
const SEARCH_TYPE = "search";

const LOVAutocomplete = (props) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [opts, setOpts] = useState([]);
  const [value, setValue] = useState();
  const [queryAdvancedSearch, setQueryAdvancedSearch] = useState([]);

  // initialization
  useEffect(() => {
    disabledRelatedField();
  }, []);

  const disabledRelatedField = (disabled = true) => {
    if (props.relatedWith) {
      props.relatedWith.map((item) => {
        props.disableRelatedField({
          name: item.name,
          disabled,
        });
      });
    }
  };

  /**
   * Functionality to reset the value of another LOV
   * One is for who fires the signal and the another for how receives it
   * Also we filtering the values of the another LOV depending on the selected value
   */
  // if this component is related with another LOV
  useEffect(() => {
    if (props.relatedWith) {
      props.relatedWith.map((item) => {
        props.resetValueRelatedField({
          name: item.name,
          reset: true,
        });
      });
    }
    // it sends a reset signal

    refreshAnotherLov(value);
  }, [value]);

  // if a reset signal is received
  useEffect(() => {
    if (props.resetByAnotherLOV) {
      // reset the signal to false and set value  to null
      props.resetValueRelatedField({
        name: props.id,
        reset: false,
      });
      handleChange({ stopPropagation: () => {} }, null);
      setValue(null);
    }
  }, [props.resetByAnotherLOV]);

  useEffect(() => {
    requestDataToServer();
  }, [props.page, props.querySearch]);

  // used to transform string values to objects
  useEffect(() => {
    setValue(
      props.transform
        ? props.transform.reverse(props.options, props.value)
        : props.value
    );
  }, [props.value, props.options, props.transform]);

  useEffect(() => {
    // if value comes from object (update population)
    if (
      value &&
      value.pk &&
      props.options.length > 0 &&
      !some(props.options, (opt) => opt.id === value.id)
    ) {
      props.searchValueById({ id: props.id, identifier: value.id });
      // if value is selected from the form or the advanced search
    } else if (
      value &&
      !value.pk &&
      props.options.length > 0 &&
      !some(props.options, (opt) => opt.id === value.id)
    ) {
      props.dispatchAppendData({ name: props.id, data: value });
    } else {
      setOpts(props.options);
    }
  }, [props.options, value]);

  // another LOV is refreshing me -> ACTION FOR ME
  useEffect(() => {
    if (props.refresh) {
      requestDataToServer();
      props.refreshData({ name: props.id, refresh: false });
    }
  }, [props.refresh]);

  const requestDataToServer = () => {
    const query =
      unionBy(
        props.extraQuery || [],
        props.query || [],
        (filter) => filter.columnName
      ) || [];

    props.responseKey &&
      props.searchData({
        id: props.id,
        key: props.responseKey,
        page: props.page,
        sorting: [{ columnName: props.sortBy }],
        search: props.querySearch,
        query,
      });
    // we save this query to use it in the future on open the advanced searching
    setQueryAdvancedSearch(query);
  };

  const buttonInsideSelector = (icon, disabled = false, onClick) => {
    return (
      <IconButton
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {icon}
      </IconButton>
    );
  };

  const handleChange = (e, v) => {
    props.onChange(e, props.transform ? props.transform.apply(v) : v);
  };

  // this method refreshes another LOV
  const refreshAnotherLov = (newValue) => {
    if (newValue && props.relatedWith) {
      props.relatedWith.map((item) => {
        props.setQuery({
          name: item.name,
          query: [
            {
              columnName: item.filterBy,
              value: `'${get(newValue, item.keyValue ? item.keyValue : "id")}'`,
              exact: true,
            },
          ],
        });

        props.refreshData({ name: item.name, refresh: true });
      });
    }
  };

  return (
    <>
      <Autocomplete
        handleHomeEndKeys
        id={props.id}
        options={opts}
        /* TODO() make more flexible this comparison -> not all the values have an id
         * Add an identifier property or something like that
         */
        value={
          value && opts.find((option) => option.id === value.id)
            ? opts.find((option) => option.id === value.id)
            : null
        }
        onChange={(e, newValue) => {
          if (newValue && newValue.id === ADD_TYPE) {
            setOpenAddModal(true);
          } else if (newValue && newValue.id === SEARCH_TYPE) {
            setOpenSearchModal(true);
          } else {
            // I'm refreshing another LOV -> ACTION FOR ANOTHER
            refreshAnotherLov(newValue);
            handleChange(e, newValue);
          }
        }}
        onBlur={(e) => props.onBlur && props.onBlur(e)}
        // Used to determine the string value for a given option.
        // It's used to fill the input (and the list box options if renderOption is not provided).
        getOptionLabel={(option) => {
          if (
            option.id &&
            option.id !== ADD_TYPE &&
            option.id !== PAGINATION_TYPE &&
            option.id !== SEARCH_TYPE
          ) {
            return typeof props.labelResponseKey === "function"
              ? props.labelResponseKey(option)
              : option[props.labelResponseKey];
          } else {
            return option.title;
          }
        }}
        // Render the option, use getOptionLabel by default.
        renderOption={(option, state) => {
          if (option.id && option.id === ADD_TYPE) {
            return <React.Fragment>{option.title}</React.Fragment>;
          } else if (option.id && option.id === PAGINATION_TYPE) {
            return (
              <React.Fragment>
                {buttonInsideSelector(<NavigateBefore />, !props.page, () =>
                  props.dispatchDecrementPage(props.id)
                )}
                {buttonInsideSelector(
                  <NavigateNext />,
                  props.page === props.totalPages,
                  () => props.dispatchIncrementPage(props.id)
                )}
              </React.Fragment>
            );
          } else if (option.id && option.id === SEARCH_TYPE) {
            return <React.Fragment>{option.title}</React.Fragment>;
          } else {
            return (
              <React.Fragment>
                {typeof props.labelResponseKey === "function"
                  ? props.labelResponseKey(option)
                  : option[props.labelResponseKey]}
              </React.Fragment>
            );
          }
        }}
        // Used to determine if an option is selected, considering the current value. Uses strict equality by default.
        getOptionSelected={(option, value) => {
          if (
            option.id === value.id &&
            (value.id === ADD_TYPE || value.id === SEARCH_TYPE)
          ) {
            return true;
          } else {
            return option.id === value.id;
          }
        }}
        getOptionDisabled={(option) => props.loading}
        loading={props.loading}
        disabled={props.disabled || props.disabledByAnotherLOV}
        required={props.required}
        noOptionsText={props.intl.formatMessage({
          id: "LOVElement.sin_resultados",
          defaultMessage: "Sin resultados ",
        })}
        loadingText={`${props.intl.formatMessage({
          id: "Comun.cargando",
          defaultMessage: "Cargando",
        })}...`}
        // A filter function that determines the options that are eligible.
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const inputValue =
            params.inputValue === "" ? "Nuevo" : params.inputValue;
          if (props.totalPages > 1) {
            filtered.push({
              id: PAGINATION_TYPE,
              inputValue: "",
              title: "",
            });
          }
          !props.cannotCreate &&
            filtered.push({
              id: ADD_TYPE,
              inputValue: inputValue,
              title: `${props.intl.formatMessage(
                {
                  id: "LOVElement.agregar_nuevo",
                  defaultMessage: "Agregar '{name}'",
                },
                { name: inputValue }
              )}`,
            });
          // only show the Advanced Search if advancedSearchColumns is not empty
          props.advancedSearchColumns &&
            props.advancedSearchColumns.length &&
            filtered.push({
              id: SEARCH_TYPE,
              inputValue: "",
              title: props.intl.formatMessage({
                id: "LOVElement.busqueda_avanzada",
                defaultMessage: "Búsqueda Avanzada",
              }),
            });
          return filtered;
        }}
        // Callback fired when the input value changes.
        onInputChange={(event, newInputValue, reason) => {
          // this reason executes when the user select an option or when the selector it loads the first time
          if (reason !== "reset") {
            props.dispatchSearchTerm({ name: props.id, text: newInputValue });
          }
          // if the user clear the value -> disabled related field if exists
          if (!newInputValue?.length) {
            disabledRelatedField();
          } else {
            disabledRelatedField(false);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant={props.variant ? props.variant : "outlined"}
            required={props.required}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  {props.loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AddCircleOutlineIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {props.creationComponents && props.creationComponents.length > 0 && (
        <LOVForm
          id={props.id}
          title={props.label}
          formComponents={props.creationComponents}
          open={openAddModal}
          close={(data) => {
            if (data) {
              const list = opts;
              list.push(data);
              setOpts(list);
              props.setValue({ value: data });
            }
            setOpenAddModal(false);
          }}
        />
      )}
      <LOVAdvancedSearch
        id={props.id}
        title={props.label}
        open={openSearchModal}
        listKey={props.responseKey}
        columns={props.advancedSearchColumns}
        extraQuery={queryAdvancedSearch}
        close={(data) => {
          if (data) {
            const list = opts;
            list.push(data);
            setOpts(list);
            props.setValue({ value: data });
          }
          setOpenSearchModal(false);
        }}
      />
      {Boolean(props.error) ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : null}
    </>
  );
};

LOVAutocomplete.propTypes = {
  id: PropTypes.any,
  responseKey: PropTypes.string,
  labelResponseKey: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
  // it transforms the data when in/out to the component
  transform: PropTypes.shape({
    apply: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
  }),
  value: PropTypes.any,
  variant: PropTypes.any,
  options: PropTypes.any,
  loading: PropTypes.bool,
  setValue: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  sortBy: PropTypes.string, // service order field
  creationComponents: PropTypes.any,
  // button add doesn't appear at the end of the list
  cannotCreate: PropTypes.bool,
  // if not empty, when this component changes value, it will update the related selector
  relatedWith: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      filterBy: PropTypes.string.isRequired,
      keyValue: PropTypes.string,
    })
  ),
  // if not empty, it shows the advanced search
  advancedSearchColumns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  extraQuery: PropTypes.arrayOf(
    PropTypes.shape({
      // for the searching
      columnName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      exact: PropTypes.bool,
    })
  ),
};

const mapStateToProps = (state, props) => {
  return {
    loading: getLoadingFormSelectorById(state, props.id),
    options: getDataFormSelectorById(state, props.id),
    page: getPageFormSelectorById(state, props.id),
    totalPages: getTotalPagesFormSelectorById(state, props.id),
    querySearch: getQuerySearchFormSelectorById(state, props.id),
    refresh: getRefreshFormSelectorById(state, props.id),
    query: getQueryFormSelectorById(state, props.id),
    disabledByAnotherLOV: getIsDisabledById(state, props.id),
    resetByAnotherLOV: getIsResetById(state, props.id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    searchData: bindActionCreators(getFormSelectorData, dispatch),
    searchValueById: bindActionCreators(getFormSelectorDataById, dispatch),
    dispatchAppendData: bindActionCreators(appendDataToFormSelector, dispatch),
    dispatchIncrementPage: bindActionCreators(
      incrementPageToFormSelector,
      dispatch
    ),
    dispatchDecrementPage: bindActionCreators(
      decrementPageToFormSelector,
      dispatch
    ),
    dispatchSearchTerm: bindActionCreators(searchByQueryTerm, dispatch),
    refreshData: bindActionCreators(refreshAFormSelector, dispatch),
    setQuery: bindActionCreators(setQueryFromSelector, dispatch),
    disableRelatedField: bindActionCreators(disableRelatedField, dispatch),
    resetValueRelatedField: bindActionCreators(changeResetValue, dispatch),
  };
  return actions;
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(LOVAutocomplete);
