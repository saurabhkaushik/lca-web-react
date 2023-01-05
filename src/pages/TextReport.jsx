import React from 'react';
const editing = { allowDeleting: true, allowEditing: true };

import { useLocation } from "react-router-dom";

import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, text_report_Grid } from '../data/dummy';
import { Header } from '../components';

const TextReport = () => {
  const location = useLocation();
  let contentlist = location.state.content; 
  let reportlist = location.state.report; 

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Text Analysis" />
      <GridComponent
        id="gridcomp1"
        dataSource={contentlist}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {text_report_Grid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      <Header category="Page" title="Report Analysis" />
      <table align="center">
        <tr><th>Name</th><th>Value</th></tr>
        { Object.entries(reportlist).map(([key, values]) => (
          <tr>
              <td>{ key }</td>
              <td>{ values }</td>
          </tr>
          )
        )
      }
      </table>
    </div>
  );
};
export default TextReport;
