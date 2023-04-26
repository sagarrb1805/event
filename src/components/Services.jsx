import React from 'react'
import { useState, useEffect } from 'react'


function Services() {

    const [user, setUser] = useState([]);
    // const [showService, setShowService] = useState(false);
    const [vendorList, setVendorList] = useState([])
    
 
    useEffect(()=>{
    
        getData()
      }, [])
      const getData = async ()=>{
        const res = await fetch("http://localhost:5000/user")
        
        const data = await res.json()
        console.log(data)
        setUser(data)

      }


      const addEvent = async () =>{
        if(vendorList.length == 0){
            const res = await fetch('http://localhost:5000/Event', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(vendorList)
        })
        window.location.reload();
        alert("Event added")
        }
        
      }
      const getEvent = async ()=>{
        const res = await fetch("http://localhost:5000/Event")
        
        const data = await res.json()
        console.log(data)

      }

  return (
    <div>
        <h1> Services</h1>
        <p>Select services you need:  &#129409;</p>
        <button onClick={()=>addEvent()}>AddEvent</button>
        <button onClick={()=>getEvent()}>GetEvents</button>
      {user.map((use)=>{
        
         if (use.role === "vendor"){
            return (
                <div key={use.id}>
                    
                    <label htmlFor={use.userName}><h3>{use.service} --- {use.userName}
                     <input onChange={(e) =>{if(e.target.checked){
                        setVendorList([...vendorList,use.userName])
                     }}  } type="checkbox" id={use.userName}/></h3></label>

                </div>
            )  
            
        }
       
    })}
    </div>
  )
}

export default Services
