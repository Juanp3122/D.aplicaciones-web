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

}