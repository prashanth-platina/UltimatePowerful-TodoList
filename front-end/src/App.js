import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [editid,seteditid] = useState(-1)
  const [editdescription,seteditdescription] = useState('')
  const [edittitle,setedittitle] = useState('')
  const [title,setTitle] = useState('');
  const [description,setdescription] = useState('');
  const [todos , settodo] = useState([])
  const [error,seterror]=useState('')
    const [message,setmessage]=useState('')
  
  const funsubmit = ()=>{
    seterror('')
     if ( title.trim() !== "" && description.trim() !== "" ){
        
        fetch('http://localhost:4000/todo',{

          method:"POST",
          headers :{
            'Content-type':"application/json"
          },
          body: JSON.stringify({title,description})

        }  )
        .then((res) => {
        if (res.ok) {
          setTitle('')
          setdescription('')
          setmessage("Successfully added!")
          seterror('')
          setTimeout( ()=> {setmessage("")},2000 )
          getitem()

        } else {
          seterror("Item not created")
          
        }
        console.log("hiii"+todos)
      })
      .catch((err) => {
        seterror("Item not created")
        console.error(err)
      });
     }
    
  }

  useEffect(()=>{
    getitem()
  },[])

  const getitem = () => {
    fetch('http://localhost:4000/todo')
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      settodo(res)
    })

  }

  const updatedata = ()=>{
    if ( edittitle.trim() !== "" && editdescription.trim() !== "" ){
        
        fetch('http://localhost:4000/todo/'+editid,{

          method:"PUT",
          headers :{
            'Content-type':"application/json"
          },
          body: JSON.stringify({title : edittitle,description : editdescription})

        }  )
        .then((res) => {
        if (res.ok) {
          setTitle('')
          setdescription('')
          seteditid(-1)
          getitem()

        } else {
          seterror("Item not created")
          
        }
        console.log("hiii"+todos)
      })
      .catch((err) => {
        seterror("Item not created")
        console.error(err)
      });
     }
    }
  const Delete_item=(id)=>{
    if (window.confirm("confirm delete")){
      fetch('http://localhost:4000/todo/'+id, {
        method:"DELETE"
      })
      .then(()=> {
        const update = todos.filter((item)=>item._id!==id)
        settodo(update)
      })
    }
  }
  return (
    <>
    <div className="App">
       <h2>TODO PROJECT</h2>
    </div>
    <div className='row container-sm p-4 '>
      <div className='form-group d-flex gap-3'>
       <input className='form-control' value={title}  onChange={(e)=>setTitle(e.target.value)}   placeholder='title' type='text'></input>
       <input className='form-control' value={description} onChange={(e)=>setdescription(e.target.value)}  placeholder='description' type='text'></input>
       <button className='btn btn-secondary'  onClick={funsubmit}>submit</button>
       
      </div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <div>

      </div>
    </div>
    
    <div className='row mt-3 '>
      <ul className='list-group '>
        { todos.map((items,index)=>
        <li key ={index} className='list-group-item  d-flex justify-content-between'>
       {
       (editid === -1 || items._id !== editid) ?
       <div className='d-flex flex-column'>   
        <span>{items.title}</span>
        <span>{items.description}</span>
        </div>
       :
       <div className='d-flex flex-row gap-3'>
          <input className='form-control' value={edittitle} placeholder='edit title' onChange={e => setedittitle(e.target.value)} type='text'></input>
          <input className='form-control' value={editdescription} placeholder='edit description' onChange={e => seteditdescription(e.target.value)} type='text'></input>
       </div> 
        }
        {
        (editid === -1 || items._id !== editid) ?
        <div className='d-flex gap-2' >
          <button className='btn btn-success' onClick={()=> {seteditid(items._id);   setedittitle(items.title);  seteditdescription(items.description)}}>edit</button>
          <button className='btn btn-danger' onClick={() => Delete_item(items._id)}>Delete</button>
        </div>
        :
        <div className='d-flex gap-2' >
          <button className='btn btn-warning' onClick={updatedata}>update</button>
          <button className='btn btn-danger' onClick={()=> seteditid(-1)}>cancel</button>
        </div>

}
       </li>
        )}   
      </ul>
    </div>
    </>
  );
}

export default App;