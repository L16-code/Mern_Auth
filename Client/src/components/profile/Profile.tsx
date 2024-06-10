import axios from "axios"
import { useEffect } from "react"
const Profile = () => {
  useEffect(()=>{
    axios.get("http://localhost:5000/profile").then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  })
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ width: '500px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: "aliceblue"}}>
      <div style={{ marginBottom: '15px', display:"grid" }}>
        <img src="https://i.pravatar.cc/300" alt="sdfds"  height={"100px"} width={"100px"} style={{borderRadius:"50%", border:"2px solid black"}}/>
      </div>
      <div style={{ marginBottom: '15px', display: "flex" }}>
        <h3>UserName:-</h3>
        <h4 style={{ margin: '5px' }}>name</h4>
      </div>
      <div style={{ marginBottom: '15px', display: "flex" }}>
        <h3>Email:-</h3>
        <h4 style={{ margin: '5px' }}>email</h4>
      </div>
      <div style={{ marginBottom: '15px', display: "flex" }}>
        <h3>Gender:-</h3>
        <h4 style={{ margin: '5px' }}>Gender</h4>
      </div>
      <div style={{ marginBottom: '15px', display: "flex" }}>
        <h3>DOB:-</h3>
        <h4 style={{ margin: '5px' }}>DOB</h4>
      </div>
    </div>
  </div>
  )
}

export default Profile