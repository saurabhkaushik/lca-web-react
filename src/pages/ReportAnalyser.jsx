import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header , Button} from '../components';
import configData from '../config.json';
import { useStateContext } from '../contexts/ContextProvider';

const ReportAnalyser = () => {
  const { currentColor, currentMode } = useStateContext();
  const classurl = `${configData.API_SERVER}/contract_new_api`;
  const texturl = `${configData.API_SERVER}/text_analysis_api`;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [domain, setDomain] = useState('liabilities');
  const thresholds = [98, 85];
  let threshold = thresholds[0];
  const navigate = useNavigate();
  let formurl = '';
  const state = {
    submit_type: '',
  };
  // console.log(process.env.API_URL);

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    formurl = classurl;
    if (domain === 'liabilities') {
      threshold = thresholds[0];
    }
    if (domain === 'esg') {
      threshold = thresholds[1];
    }
    console.log(`${domain} : ${threshold}`);
    try {
      const res = await fetch(formurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          domain,
          threshold,
        }),
      });
      const resJson = await res.json();
      if (res.status === 200) {
        navigate('/txtreport', { state: { title: resJson.title,
          content: resJson.highlight_response,
          domain,
          score_report_json: resJson.score_report_json,
          score_context_count_json: resJson.score_context_count_json,
          score_presence_data: resJson.score_presence_data,
          score_presence_count_json: resJson.score_presence_count_json,
          class_analysis_data: resJson.class_analysis_data } });
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    formurl = texturl;
    try {
      const res = await fetch(formurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          domain,
        }),
      });
      const resJson = await res.json();
      if (res.status === 200) {
        navigate('/numreport', { state: { title: resJson.title,
          content: resJson.text_analysis_response,
          amount_total: resJson.amount_total,
          label_total: resJson.label_total,
          domain } });
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Report Analyser" />
      <p className="text-md font-semibold">Helps business reduce their Financial & Sustainability Risk using the power of AI.</p> <br/>
      <form>Select the Domain : 
        <select name="domain" defaultValue="liabilities" onChange={(e) => setDomain(e.target.value)}>
          <option value="liabilities">Financial</option>
          <option value="esg">Sustainability</option>
        </select>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div >
            <input name="title" className="e-input" type="text" placeholder="Enter the Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div >
            <textarea
            name="content"
            rows="15" 
            cols="100"
            placeholder="Copy the Report Text"
            maxLength="10000"
            defaultValue={content}
            className="border border-dark"
            onChange={(e) => setContent(e.target.value)}
          />
          </div>
        </div>
        <div className="flex justify-between items-center w-400 ">
          <div className="mt-6" onClick={handleSubmit1}>
            <Button
              name="class_analysis"
              color="white"
              bgColor={currentColor}
              type="submit"
              text="Text Analysis"
              borderRadius="10px"
            />
          </div>
          <div className="mt-6" onClick={handleSubmit2}>
            <Button
              name="text_analysis"
              color="white"
              bgColor={currentColor}
              type="submit"
              text="Number Analysis"
              borderRadius="10px"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ReportAnalyser;
