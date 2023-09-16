document.getElementById('bookform').addEventListener('submit',bookhotel)
const token=localStorage.getItem('token')
async function bookhotel(e){
    e.preventDefault()
    let id=localStorage.getItem('hotel')
let hotelinfo={
              hotelID:id,
       
               
         startDate:e.target.start.value,
         endDate:e.target.end.value
}

let res=await axios.post("http://localhost:3000/user/bookhotel",hotelinfo,{headers:{"Authorization":token}})
if(res.status==203){
    alert('booked')
}
}