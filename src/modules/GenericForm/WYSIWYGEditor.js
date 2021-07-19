import React from 'react';
import PropTypes from "prop-types";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormHelperText} from "@material-ui/core";

// ref: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html
const WYSIWYGEditor = (props) => {
  return <div className={props.error? "ck-error":""}>
    <CKEditor
      id={props.id}
      name={props.id}
      required={props.required}
      disabled={props.disabled}
      editor={ ClassicEditor }
      data={props.value}
      config={{
        placeholder: props.placeHolder
      }}
      onReady={ editor => {
        const height = `${props.rows > 0? props.rows * 100:300}px`;
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            height,
            editor.editing.view.document.getRoot()
          );
        })
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData();
        props.onChange(event, data);
      } }
      onBlur={ ( event, editor ) => {
        // little fix to avoid formik errors
        props.onBlur({...event, target: {name: props.id}});
      } }
      onFocus={ ( event, editor ) => {
        // little fix to avoid formik errors
        props.onBlur({...event, target: {name: props.id}});
      } }
    />
    {Boolean(props.error)? <FormHelperText>{props.helperText}</FormHelperText>:null}
  </div>
}

WYSIWYGEditor.propTypes = {
  id: PropTypes.any,
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.any,
};

export default WYSIWYGEditor;