import React from 'react';
import { useLocation } from "react-router-dom";
import { Header } from '../components';
import { useState } from 'react';

import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import { Pie as PieChart } from '../components';
import configData from "../config.json";

const TxtAnalysisReport = () => {
  const location = useLocation();
  const stateData = location.state
  let responseobj = stateData.content;
  const domain = stateData.domain;
  const texturl = configData.API_SERVER + '/training_new_api';
  const [message, setMessage] = useState("");
  const handleClick = async (label, content) => {
    //e.preventDefault();
    //console.log('this is:'+ label);
    let formdata = {}
    formdata['label'] = label;
    formdata['content'] = content;
    try {
      let res = await fetch(texturl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: label,
          content: content,
          domain: domain,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Saved new Training data");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let hl_resp = [];
  let mark_classname = '';
  for (let hl_obj in responseobj) {
    //console.log(hl_obj);
    if (responseobj[hl_obj].flag == 'High') {
      mark_classname = 'mark-high';
    } else if (responseobj[hl_obj].flag == 'Medium') {
      mark_classname = 'mark-medium';
    } else if (responseobj[hl_obj].flag == 'Low') {
      mark_classname = 'mark-low';
    } else { 
      mark_classname = 'mark-na';
    }
  
    let tooltip = 'Label :' + responseobj[hl_obj].label + '; Risk : ' + responseobj[hl_obj].flag + '; Presence Score : ' + responseobj[hl_obj].p_score + '; Context Score : ' + responseobj[hl_obj].c_score + ';';
    hl_resp.push(<div key={hl_obj} className={mark_classname} onClick={() => handleClick(responseobj[hl_obj].label, responseobj[hl_obj].c_sentence)}><TooltipComponent content={tooltip}>{responseobj[hl_obj].c_sentence}</TooltipComponent></div>);
    console.log(responseobj[hl_obj].c_sentence);
  }

  let paichartdata1 = [
    { x: 'High Risk', y: stateData.score_report_json.score_report_risk_score, text: stateData.score_report_json.score_report_risk_score },
    { x: 'Low Risk', y: (100 - stateData.score_report_json.score_report_risk_score), text: (100 - stateData.score_report_json.score_report_risk_score) },
    ];
  let paichartdata2 = [
    { x: 'High', y: stateData.score_context_count_json.score_context_high_count, text: stateData.score_context_count_json.score_context_high_count },
    { x: 'Medium', y: stateData.score_context_count_json.score_context_medium_count, text: stateData.score_context_count_json.score_context_medium_count },
    { x: 'Low', y: stateData.score_context_count_json.score_context_low_count, text: stateData.score_context_count_json.score_context_low_count },
    ];
    
  let paichartdata3 = [];
  for (const [key, value] of Object.entries(stateData.score_presence_data)) {
    paichartdata3.push({ x: key, y: value, text: value });
  }

  let paichartdata4 = [];
  for (const [key, value] of Object.entries(stateData.class_analysis_data)) {
    paichartdata4.push({ x: key, y: value, text: value });
  }
  console.log(hl_resp);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Processed Report" />
      <p class="text-lg font-bold">Title: {location.state.title}</p>
      <p class="text-lg font-bold">Domain: {location.state.domain}</p>
        <div className="flex flex-col md:flex-row flex-wrap gap-4" align="center">
        <table width="100%">
          <tbody>
          <tr align="center">
              <td>
                <div className="w-full" >
                  <b>Document Risk Chart:</b> 
                  <PieChart id="chart-pie1" data={paichartdata1} legendVisiblity height="200" width="200"/>
                </div>
              </td>
              <td>
                <div className="w-full">
                  <b>Context Count Chart:</b> 
                  <PieChart id="chart-pie2" data={paichartdata2} legendVisiblity height="200" width="200"  />
                </div>
              </td>
              <td>
                <div className="w-full">
                  <b>Presence Count Chart:</b>
                  <PieChart id="chart-pie3" data={paichartdata3} legendVisiblity height="200" width="200" />
                </div>
              </td>
              <td>
              <div className="w-full">
                <b>Class Strength Chart:</b> 
                <PieChart id="chart-pie4" data={paichartdata4} legendVisiblity height="200" width="200" />
              </div>
              </td>
          </tr>
          </tbody>
      </table>   
      </div>  
      <b>Content: </b> {hl_resp }
      <br/>
      <div className="message"><b>Message: </b> {message ? <p>{message}</p> : null}</div>
    </div>
  );
};
export default TxtAnalysisReport;
