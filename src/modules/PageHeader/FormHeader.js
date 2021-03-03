import React from "react";
import {useHistory} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import {ChevronLeft, Save} from "@material-ui/icons";

import ContentHeader from "./ContentHeader";
import HeadingHeader from "./HeadingHeader";

const FormHeader = ({ config: {title, onClick} }) => {
  const history = useHistory();
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 3
      },
      content: <HeadingHeader><IconButton onClick={() => {history.goBack()}}><ChevronLeft /></IconButton>{title}</HeadingHeader>
    },
    {
      id: 2,
      breakpoints: {
        xs: 9
      },
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      },
      content: <IconButton onClick={onClick}>
        <Save />
      </IconButton>
    },
  ];

  return (
    <ContentHeader grids={list} />
  );
}

export default FormHeader;