import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../components';
import configData from "../config.json";

const AIAdminService = () => {
  const modeltesturl = configData.API_SERVER + '/model_test_service';
  const trainingurl = configData.API_SERVER + '/training_service';
  const etlserviceurl = configData.API_SERVER + '/etl_service';
  const dbserviceurl = configData.API_SERVER + '/db_service';
  const modelaccuracyeurl = configData.API_SERVER + '/model_accuracy';

  const [message, setMessage] = useState("");
  const [domain, setDomain] = useState("liabilities");
  const thresholds = [98, 85];
  let threshold = thresholds[0];
  const navigate = useNavigate();


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="AI Admin Services" />      
      <b>Domain : </b>
        <select name="domain" defaultValue="liabilities" onChange={(e) => setDomain(e.target.value)}> 
          <option value='liabilities'>Financial</option>
          <option value='esg'>Sustainability</option>
        </select>
      <br/>
      <h3>Here are Admin Service for LCA Tool. </h3>
      <li>
          <a href={modeltesturl}>
              Model Service - Testing 
          </a></li>
      <li>
          <a href={trainingurl}>
              Model Service - Training    
          </a></li>    
      <li>
          <a href={etlserviceurl}> 
              ETL Service : Run
          </a></li>
      <li>
          <a href={dbserviceurl}> 
              DB Create Service : Run
              </a></li>   
      <li>
          <a href={modelaccuracyeurl}> 
              Module Accuracy Service : Run
          </a></li>
    </div>
  );
};
export default AIAdminService;
