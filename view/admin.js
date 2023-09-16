
document.getElementById('add_hotel').addEventListener('click',addhotel)
const token=localStorage.getItem('token')
function addhotel(e){
    e.preventDefault();
    window.location.href="./addhotel.html"
}

window.addEventListener('DOMContentLoaded',getinfo)

async function getinfo(){

    let res=await axios.get("http://localhost:3000/admin/gethotel",{headers:{"Authorization":token}})
 console.log(res.data)
    res.data.forEach(e=>{
    addingbutton(e)
   })
  
}

let ul=document.getElementById('hotellist')
function addingbutton(e){
    try{
ul.innerHTML+=`<li id='${e._id}'>
<button value="${e.name}" onclick="getrooms('${e._id}')">${e.name}</button>
<button value="${e.name}" onclick="remove('${e._id}')">remove</button>
</li> `}
catch(err){
    console.log(err)
}
}
async function remove(id){
    await axios.delete(`http://localhost:3000/admin/removeHotel/${id}`,{headers:{"Authorization":token}})

}
async function getrooms(id){
   try{
    console.log(id)
    event.preventDefault()
    
    let res=await axios.get(`http://localhost:3000/admin/getroom/${id}`,{headers:{"Authorization":token}})
    console.log(res.data)
    res.data.forEach(e => {
        addbutton(e,id)
    });
   }
   catch(err){
    console.log(err)
   }
}

async function addbutton(e,id){
document.getElementById(id).innerHTML+=`<li id='${e._id}'>${e.roomType}--${e.pricePerDay}</li><button onclick="removeRoom('${e._id}')">remove</button>`
}
async function removeRoom(id){
    event.preventDefault()
    await axios.delete(`http://localhost:3000/admin/removeRoom/${id}`,{headers:{"Authorization":token}})

}