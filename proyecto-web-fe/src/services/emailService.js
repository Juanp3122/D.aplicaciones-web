import axios from "axios";

export class emailService{
    
baseUrl="http://localhost:8080/mail";


sendEmail(body){
    return axios.post(this.baseUrl,body).then(res=>res.data)
}

}