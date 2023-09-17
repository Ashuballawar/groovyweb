const token=localStorage.getItem('token')
window.addEventListener('DOMContentLoaded',getinfo)

async function  getinfo(){
    
    let res=await axios.get(`http://localhost:3000/user/gethotel?name=""&price=0`,{headers:{"Authorization":token}})
    console.log(res.data.hotel)
    res.data.hotel.forEach(e=>{
        addingbutton(e)})
      
}

let ul=document.getElementById('hotellist')
function addingbutton(e){
    try{
ul.innerHTML+=`<li id='${e._id}'>
<button value="${e.name}" onclick="getrooms('${e._id}')">${e.name}</button>
 
</li> `}
catch(err){
    console.log(err)
}
}


async function bookhotel(id){
    localStorage.setItem('hotel',id)
    window.location.href="./bookhotel.html"
}

async function getrooms(id){
    try{
    let res=await axios.get(`http://localhost:3000/user/getroom/${id}`,{headers:{"Authorization":token}})
   
    console.log(res.data.resdata)
    res.data.resdata.forEach(e => {
        addbutton(e,id)
    });
}
   catch(err){
    console.log(err)
   }
}

async function addbutton(e,hotelName){
document.getElementById(hotelName).innerHTML+=`<li id='${e._id}'>${e.roomType}--${e.pricePerDay}</li><button onclick="bookroom('${e._id}','${hotelName}')">booknow</button>`
}
async function bookroom(id,hotelID){
    event.preventDefault()
    console.log(id,  hotelID)
    localStorage.setItem('room',id)
    localStorage.setItem('hotelIDforroom',hotelID)

    window.location.href="./bookroom.html"
    // await axios.delete(`http://localhost:3000/admin/removeRoom/${id}`,{headers:{"Authorization":token}})

}

document.getElementById('mybooking').addEventListener('click',mybooking)

async function mybooking(e){
    e.preventDefault()
    
    document.getElementById('bookinglist').appendChild(document.createTextNode('mybooking'))
    let res=await axios.get(`http://localhost:3000/user/mybooking`,{headers:{"Authorization":token}})
  console.log(res)
  res.data.forEach(e => {
    document.getElementById('bookinglist').innerHTML+=`<li id='${e._id}'>${e.hotelID.name}------${e.roomID.roomType}<button onclick="cancel('${e._id}','${e.roomID._id}','${e.hotelID._id}')">cancel</button></li>`
  });
   

}


async function cancel(id,roomid,hotelid){
let bookinginfo={
    id:id,
    roomid:roomid,
    hotelid:hotelid
}
    await axios.post(`http://localhost:3000/user/cancel`,bookinginfo,{headers:{"Authorization":token}})
}
