import React from 'react';

import { useLocation } from 'react-router-dom';

import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, text_report_Grid } from '../data/dummy';
import { Header, Pie as PieChart } from '../components';

const editing = { allowDeleting: true, allowEditing: true };

<<<<<<<< HEAD:src/pages/NumAnalysisReport.jsx
const NumAnalysisReport = () => {
========
const ScreeningInterview = () => {
>>>>>>>> 177838a284465e15a4696c6b819f4632c9c57e30:src/pages/ScreeningInterview.jsx
  const location = useLocation();
  const contentlist = location.state.content;
  const { amount_total } = location.state;
  const { label_total } = location.state;

  const paichartdata = [];
  for (const [key, value] of Object.entries(label_total)) {
    paichartdata.push({ x: key, y: value, text: value });
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Number Analysis Report " />
      <h3>Total Liabilities: ${amount_total.total} </h3>

      <div className="w-full">
        <PieChart id="chart-pie" data={paichartdata} legendVisiblity height="200" width="200" />
      </div>

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
    </div>
  );
};
<<<<<<<< HEAD:src/pages/NumAnalysisReport.jsx
export default NumAnalysisReport;
========
export default ScreeningInterview;
>>>>>>>> 177838a284465e15a4696c6b819f4632c9c57e30:src/pages/ScreeningInterview.jsx
