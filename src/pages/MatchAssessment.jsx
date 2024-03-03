import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { contextMenuItems, reportsGrid } from '../data/dummy';
import { Header } from '../components';
import configData from '../config.json';

const MatchAssessment = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const texturl = `${configData.API_SERVER}/contract_list_api`;
  const domain = 'liabilities';

  useEffect(() => {
    fetch(texturl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain,
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Seed Data" />
      <GridComponent
        id="gridcomp"
        dataSource={users}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {reportsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default MatchAssessment;
