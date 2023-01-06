import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Header } from '../components';
import configData from "../config.json";

const ReportAnalyser = () => {
  const classurl = configData.API_SERVER + '/contract_new_api';
  const texturl = configData.API_SERVER + '/text_analysis_api';
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [domain, setDomain] = useState("liabilities");
  const thresholds = [98, 85];
  let threshold = thresholds[0];
  const navigate = useNavigate();
  let formurl = '';
  const state = {
    submit_type: '',
  };

  let handleSubmit1 = async (e) => {
    e.preventDefault();
    formurl = classurl;
    if (domain == 'liabilities') {
      threshold = thresholds[0];
    } 
    if (domain == 'esg') {
      threshold = thresholds[1];
    }
    console.log(domain + " : " + threshold);
    try {
      let res = await fetch(formurl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          domain: domain,
          threshold: threshold,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        navigate('/txtreport', { state: { title: resJson.title, content: resJson.highlight_response, domain: domain, 
          score_report_json: resJson.score_report_json, score_context_count_json : resJson.score_context_count_json, 
          score_presence_data: resJson.score_presence_data,
          score_presence_count_json : resJson.score_presence_count_json, class_analysis_data: resJson.class_analysis_data } });
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmit2 = async (e) => {
    e.preventDefault();
    formurl = texturl;
    try {
      let res = await fetch(formurl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          domain: domain,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        navigate('/numreport', { state: { title: resJson.title, content: resJson.text_analysis_response, 
          amount_total : resJson.amount_total, label_total : resJson.label_total, domain: domain } });
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Report Analyser" />      
      <form ><b>Domain : </b>
        <select name="domain" defaultValue="liabilities" onChange={(e) => setDomain(e.target.value)}> 
          <option value='liabilities'>Financial</option>
          <option value='esg'>Sustainability</option>
        </select>
        <input name="title" className="e-input" type="text" placeholder="Enter the Title" onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="content"
          placeholder="Copy the Report Text"
          rows="12"
          cols="100"
          maxLength="10000"
          defaultValue={content}
          className="border border-dark"
          onChange={(e) => setContent(e.target.value)}/>
        
        <div className="mx-auto"> 
          <table><tbody><tr>
            <td><ButtonComponent name='class_analysis' type="submit" onClick={handleSubmit1}>Text Analysis</ButtonComponent></td>
            <td><ButtonComponent name='text_analysis' type="submit" onClick={handleSubmit2}>Number Analysis</ButtonComponent></td></tr>
            </tbody></table>
        </div>
      </form>
    </div>
  );
};
export default ReportAnalyser;
