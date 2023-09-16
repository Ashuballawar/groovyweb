document.getElementById('form_room').addEventListener('submit',addroominfo)
const token=localStorage.getItem('token')
async function addroominfo(e){
    e.preventDefault();
let roominfo={
    roomType:e.target.Room_Type.value,
    hotelName:e.target.Hotel_Name.value,
    pricePerDay:e.target.price.value,
}
let res=await axios.post("http://localhost:3000/admin/addRoom",roominfo,{headers:{"Authorization":token}})
if(res.status==201){
    window.location.href="./adminpage.html"
}
}