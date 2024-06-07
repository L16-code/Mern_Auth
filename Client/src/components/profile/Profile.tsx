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
    <div>Profile</div>
  )
}

export default Profile