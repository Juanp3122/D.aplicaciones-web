import axios from "axios";

export class propietarioService{
    
baseUrl="http://localhost:8080/propietarios/";


getAllPropietarios(){
    return axios.get(this.baseUrl).then(res=>res.data)
}

}