import React from 'react';
const editing = { allowDeleting: true, allowEditing: true };

import { useLocation } from "react-router-dom";

import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, text_report_Grid } from '../data/dummy';
import { Header } from '../components';
import { Pie as PieChart } from '../components';

const NumAnalysisReport = () => {
  const location = useLocation();
  let contentlist = location.state.content; 
  let amount_total = location.state.amount_total; 
  let label_total = location.state.label_total; 

  let paichartdata = [];
  for (const [key, value] of Object.entries(label_total)) {
    paichartdata.push({ x: key, y: value, text: value });
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Number Analysis Report " />
      <h3>Total Liabilities: ${amount_total.total} </h3>

      <div className="w-full" >
        <PieChart id="chart-pie" data={paichartdata} legendVisiblity height="200" width="200"/>
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
export default NumAnalysisReport;
