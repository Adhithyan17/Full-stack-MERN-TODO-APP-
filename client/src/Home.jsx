import React, { useEffect, useState } from 'react'
import Create from './Create'
import  './App.css'
import axios from 'axios'
import { BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { BsCircleFill } from 'react-icons/bs';

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
      console.log("jhd")

    }
    const handleDelete=(id)=>{
      axios.delete('http://localhost:3001/delete/'+id)
      .then(result=>
        location.reload()
        )
      .catch(err=>console.log(err))
      console.log("j dinesh")

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
