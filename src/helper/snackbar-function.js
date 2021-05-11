import { useSnackbar } from 'notistack';
import * as React from 'react';

const InnerSnackbarUtilsConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
}

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  )
}

export default {
  success(msg) {
    this.toast(msg, 'success');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  error(msg, persist = false) {
    return this.toast(msg, 'error', persist);
  },
  toast(msg, variant = 'default', persist = false) {
    return useSnackbarRef.enqueueSnackbar(msg, { variant, persist });
  },
  close(key) {
    return useSnackbarRef.closeSnackbar(key);
  }
}