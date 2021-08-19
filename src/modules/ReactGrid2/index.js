import React, {useState} from 'react';

import DataGrid,
{
  Scrolling,
  Pager,
  Paging,
  HeaderFilter
} from 'devextreme-react/data-grid';

import {Loading} from "../shared/Loading";

let s = 123456789;
function random() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
}
const generateData = (count) => {
  let i;
  const surnames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Harris', 'Clark', 'Allen', 'Scott', 'Carter'];
  const names = ['James', 'John', 'Robert', 'Christopher', 'George', 'Mary', 'Nancy', 'Sandra', 'Michelle', 'Betty'];
  const gender = ['Male', 'Female'];
  const items = [];
  const startBirthDate = Date.parse('1/1/1975');
  const endBirthDate = Date.parse('1/1/1992');

  for(i = 0; i < count; i++) {
    const birthDate = new Date(startBirthDate + Math.floor(
      random() *
      (endBirthDate - startBirthDate) / 10));
    birthDate.setHours(12);

    const nameIndex = random();
    const item = {
      id: i + 1,
      firstName: names[nameIndex],
      lastName: surnames[random()],
      gender: gender[Math.floor(nameIndex / 5)],
      birthDate: birthDate
    };
    items.push(item);
  }
  return items;
}


const allowedPageSizes = [5, 10, 'all'];
const ReactGrid = ({ configuration, enqueueSnackbar,
                     rows, loading, pageSize, totalCount, errors,
                     extraQuery, onClickRow,
                     actions, ...props }) => {

  const customizeColumns = (columns) => {
    columns[0].width = 70;
  }

  return (
    <React.Fragment>
      <DataGrid
        id='gridContainer'
        dataSource={generateData(100000)}
        keyExpr="id"
        showBorders={true}
        customizeColumns={customizeColumns}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <HeaderFilter visible={true} allowSearch={true} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={'full'}
          showPageSizeSelector={true}
          showInfo={false}
          showNavigationButtons={true} />
      </DataGrid>
      {loading && <Loading />}
    </React.Fragment>
  )
}

export default ReactGrid;