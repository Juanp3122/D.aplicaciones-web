import axios from "axios";

export class propietarioService{
    
baseUrl="http://localhost:8080/propietarios/";


getAllPropietarios(){
    return axios.get(this.baseUrl).then(res=>res.data)
}
postPropietario(propietario){
    return axios.post(this.baseUrl+"post",propietario).then(res=>res.data)
}
deletePropietario(id){
    return axios.delete(this.baseUrl+id).then(res=>res.data)
}

getPropietarioById(id){
    return axios.get(this.baseUrl+id).then(res=>res.data)
}
sendEmail(bodys){
   fetch("http://localhost:8080/mail/",{
       crossdomain:true,
       headers:{"Content-Type":"application/json"},
       mode:'cors',
       method:"POST",
       body:bodys
   })
}
putPropietario(body){
    return axios.put(this.baseUrl,body).then(res=>res.data)
}
}