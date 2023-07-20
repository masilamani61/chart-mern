import React, { useEffect, useState } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import {Chart as charJS} from 'chart.js/auto'
import axios from 'axios'
import io from 'socket.io-client'

import './barchart.css';
const socket=io('http://localhost:5000')
function Barchart() {
    const [chart,setchart]=useState()
    const [label,setlabel]=useState('')
    const [update,setupdate]=useState(false)
    const [data,setdata]=useState('')
    const [list,setlist]=useState()
    
    const handleclick=async(e)=>{
        e.preventDefault()
        const res=await axios.put('http://localhost:5000/chart/add',{group:label,data})
        console.log(res)
        setupdate(!update)

    }
    useEffect(()=>{
        const fetch=async()=>{
            const res=await axios.get('http://localhost:5000/chart/get')

            console.log(res.data)
            setchart(res.data)         
        }
        fetch() 
    },[update])

    useEffect(()=>{
        if (chart)
{        const value=Object.entries(chart).map(x=>x[1])
    const a=[]
    function calculateAverage(arr) {
        if (arr.length === 0) {
          return 0; // Return 0 for an empty array to avoid division by zero.
        }
      
        const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const average = sum / arr.length;
        a.push(average)
        setlist(a)
        return average;
      }

        
const averageOfMpcData = calculateAverage(chart.mpc.data);
const averageOfBipcData = calculateAverage(chart.bipc.data);
const averageOfMecData = calculateAverage(chart.mec.data);


console.log(a)

}

    },[chart])
    const handledelte=async()=>{
        
        const res=await axios.delete('http://localhost:5000/chart/delete')
        setupdate(!update)

    }
    console.log(label)
  return (
    
    <div style={{width:'50%'}}>
        { chart && (<>
        <Bar data={{labels:['mpc','Bipc','mec'],datasets:[{label:'age',data:list}]}} />
        </>
        ) } 

    <div className='card'>
        <div  className='label'>
         <label >Students Group</label>
         </div>
         <div className='group'>
        <select onChange={(e)=>setlabel(e.target.value)} >
        <option>select an option</option>
       
            <option >mpc</option>
            <option >bipc</option>
            <option >mec</option>
        </select>
        </div>
        
        <input placeholder="Enter your age" onChange={(e)=>setdata(e.target.value)} type='number'/>
        <div className='button'>
        <button onClick={handleclick}>Submit</button>
        </div>
    </div>
    </div>
      
  )
}

export default Barchart