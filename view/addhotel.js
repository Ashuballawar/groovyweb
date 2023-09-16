document.getElementById('form_addhotel').addEventListener('submit',addhotelinfo)
const token=localStorage.getItem('token')
async function addhotelinfo(e){
    e.preventDefault();
let hotelinfo={
    name:e.target.Hotel_Name.value,
    city:e.target.city.value,
   Price:e.target.price.value,
}
let res=await axios.post("http://localhost:3000/admin/addHotel",hotelinfo,{headers:{"Authorization":token}})
if(res.status==201){
    window.location.href="./room.html"
}
}