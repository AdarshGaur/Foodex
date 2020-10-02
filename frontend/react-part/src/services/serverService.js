import axios from "axios";

const BASE_URL = "http://af3c2d386213.ngrok.io/";

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

    readrecipe(data){
      return axios.get(BASE_URL+ 'recipe/'+ data+'/')
    }

}
  
  export default new ServerService();