import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Navbars from './Navbars';

const User = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://dummyjson.com/users')
        .then(response=>{
           setData(response.data.users)
           console.log(response)
    })
            // setData(response))
        .catch(error =>
          console.log(error)
          // setLoading(false)        
        )
    },[])

  return (
    <>
    <Navbars/>
    <div className=' bg-slate-400 flex justify-center items-center '>
    <div  className='font-bold flex justify-center items-center text-black'>
    </div>
      <div className='w-75 rounded flex justify-center items-center bg-white border shadow p-4'>
      <Table responsive="sm">
      <thead>   
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th> 
          </tr>
        </thead>
        <tbody>
        { 
          data.map((d,i)=>(
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.firstName}</td>
              <td>{d.lastName}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>{d.gender}</td>
              <td>{d.age}</td>
            </tr>
          ))
        }
        </tbody>
        </Table>
      </div>
    </div>
    </>
  )
}

export default User
