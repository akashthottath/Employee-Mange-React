import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Hometable from '../Components/Hometable'
import LoadingSpinner from '../Components/LoadingSpinner'
import { allUsers, deleteUser } from '../services/AllApi'
import userEvent from '@testing-library/user-event'
import { registerContext } from './Contextshare'
import { Alert } from 'react-bootstrap'



function Home() {

  const{registerdata,setRegisterData}=useContext(registerContext)

  const[showSpin,setShowSpin]=useState(true)
  
  const[allUserData,setallUserData]=useState([])

  const[search,setSearch]=useState("")

  const {id}=useParams()
  console.log(id);

  useEffect(() => {

    getAllEmployes()

    setTimeout(() => {
      setShowSpin(false)
    },2000)
  }, [search])

// to get all data call allusers function


const getAllEmployes=async()=>{
 const response= await allUsers(search)
 console.log(response);
 setallUserData(response.data)
}

// to delete asingle data
const removeUser=async(id)=>{
  const response=await deleteUser(id)

  if(response.status===200){
    getAllEmployes()
  }else{
    alert("operation failed please try after some time")
  }

}


  
  return (
    <>


    {
      registerdata&&<Alert variant='success' onClose={()=>setRegisterData("")} dismissible>

          {registerdata.fname.toUpperCase()} registered successfully..........

      </Alert>
    }

    {
      showSpin?
      <LoadingSpinner/>:
        <div className="container">

          <div className="search-all d-flex align-items-center">
              
              <div className="search d-flex align-items-center  mt-5">

                <span className='fw-bolder'>Search:</span>

                <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-3' style={{width:'400px'}}/>

              </div>

                <Link to={'/add'} className='btn btn-warning ms-auto mt-5'><i class="fa-solid fa-user-plus"></i>Add</Link>

          </div>
           
           <div className="table mt-5">
             
             <h1>List Of All Employees</h1>
             <Hometable displayData={allUserData} removeuser={removeUser} />
           </div>

        </div>
    }

    </>
  )
}

export default Home