import React from "react";

import IconButton from "@material-ui/core/IconButton";
import {Save, Undo, Delete, ChevronLeft, ChevronRight} from "@material-ui/icons";

import ContentHeader from "./ContentHeader";
import BreadcrumbHeader from "./BreadcrumbHeader";

const FormHeader = ({ config: {title, onClick} }) => {
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 3
      },
      content: <BreadcrumbHeader />
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
      content: <div>
        <IconButton onClick={onClick}>
          <Save />
        </IconButton>
        <IconButton >
          <Undo />
        </IconButton>
        <IconButton >
          <Delete />
        </IconButton>
        <span>
          <IconButton disabled>
            <ChevronLeft />
          </IconButton>
          <span>
            1 / 250
          </span>
          <IconButton >
            <ChevronRight />
          </IconButton>
        </span>
      </div>
    },
  ];

  return (
    <ContentHeader grids={list} />
  );
}

export default FormHeader;