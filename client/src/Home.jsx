import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import './App.css';
import Create from './Create';

const Home = () => {
    const [todo,setTodo]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then(result=> setTodo(result.data))
      .catch(err=>console.log(err))
    },[])

    const handleEdit=(id)=>{
      axios.put('http://localhost:3001/update/'+id)
      .then(result=>
        location.reload()
        )
      .catch(err=>console.log(err))
      console.log("For testing Handle edit")

    }
    const handleDelete=(id)=>{
      axios.delete('http://localhost:3001/delete/'+id)
      .then(result=>
        location.reload()
        )
      .catch(err=>console.log(err))
      console.log("FOR testing")

    }


  return (
    <div className='home'>
      <h1>TO DO LIST</h1>
      <Create />
      {
        todo.length===0?(
            <h1>No record Found</h1>
        ):(
            todo.map(to=>(
              <div key={to._id} className="task">
                <div className='checkbox' onClick={()=>handleEdit(to._id)}>

                  {to.done ? <BsFillCheckCircleFill className='icon'> </BsFillCheckCircleFill > : <BsCircleFill className='icon' />}
                  
                  <p className={to.done? "line_though":""}> {to.task}</p>
                </div>
                <div onClick={()=>handleDelete(to._id)}>
                  <span>
                    <BsFillTrashFill className='icon' />
                  </span>
                </div>
                
              </div>
            )
                
            )
        )
      }
    </div>
  )
}

export default Home
