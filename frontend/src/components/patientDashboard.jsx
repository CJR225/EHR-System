import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const PatienDashboard = () => {
  const [patient,getPatient] = useState([])

  useEffect (()=>{
    const fetchPatient = async ()=>{
      try{
        const res = await axios.get("http://localhost:3000/patient")
        getPatient(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchPatient()
  },[])
  return <div>
    <h1>Patient Dashboard</h1>
    <div className="patients">
      {patient.map(patient=>(
        <div className="patient">
          <h2>{patient.Fname}</h2>
        </div>
      ))}
    </div>
  </div>
}

export default PatienDashboard;