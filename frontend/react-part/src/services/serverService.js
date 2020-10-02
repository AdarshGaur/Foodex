import axios from "axios";

const BASE_URL = "https://b841ca4ed474.ngrok.io/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'api/token/', data)
    }

    homecards(){
      return axios.get(BASE_URL)
    }

    searchpage(data){
      return axios.post(BASE_URL + 'search/',data)
    }

}
  
  export default new ServerService();