import axios from "axios";

const BASE_URL = "https://8ca171214697.ngrok.io/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'api/token/', data)
    }
}
  
  export default new ServerService();