import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ref: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html
const WYSIWYGEditor = (props) => {
  return <CKEditor
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
      console.log( { event, editor, data } );
      props.onChange(event, data);
    } }
    onBlur={ ( event, editor ) => {
      console.log( 'Blur.', editor );
      //props.onBlur(event);
    } }
    onFocus={ ( event, editor ) => {
      console.log( 'Focus.', editor );
      //props.onBlur(event);
    } }
  />
}

export default WYSIWYGEditor;