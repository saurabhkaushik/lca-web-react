import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Header } from '../components';

const ReportAnalysis = () => {
  const classurl = 'http://localhost:8080/contract_new_api';
  const texturl = 'http://localhost:8080/text_analysis_api';
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState()
  const domain = 'liabilities';
  const threshold = 98;
  const navigate = useNavigate();
  let submit_type = '';
  let formurl = '';

  const state = {
    submit_type: '',
  };

  let handleSubmit1 = async (e) => {
    e.preventDefault();
    formurl = classurl;
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
        navigate('/reportprocessed', { state: { title: resJson.title, content: resJson.highlight_response, domain: domain, 
          score_report_json: resJson.score_report_json, score_context_count_json : resJson.score_context_count_json, 
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
          threshold: threshold,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        navigate('/textreport', { state: { title: resJson.title, content: resJson.text_analysis_response, report : resJson.report_data, domain: domain } });
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Report Analysis" />
      <form >
        <input name="title" className="e-input" type="text" placeholder="Enter Name" onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="content"
          placeholder="Copy the Report Text"
          rows="12"
          cols="50"
          maxLength="10000"
          defaultValue={content}
          className="border border-dark"
          onChange={(e) => setContent(e.target.value)}/>
        
        <div className="mx-auto"> 
          <table><tbody><tr>
            <td><ButtonComponent name='class_analysis' type="submit" onClick={handleSubmit1}>Class Analysis</ButtonComponent></td>
            <td><ButtonComponent name='text_analysis' type="submit" onClick={handleSubmit2}>Text Analysis</ButtonComponent></td></tr>
            </tbody></table>
        </div>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
};
export default ReportAnalysis;
