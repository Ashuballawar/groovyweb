async function  getinfo(){
    let res=await axios.get("http://localhost:3000/admin/gethotel")
    
}
getinfo()