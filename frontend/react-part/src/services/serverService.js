import axios from "axios";

const BASE_URL = "https://776d58591d10.ngrok.io/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'api/token/', data)
    }

    signup(data){
      return axios.post(BASE_URL + 'auth/register/', data)
   }

    otp(data){
      return axios.post(BASE_URL + 'auth/register/otp/', data)
   }

    forgototp(data){
      return axios.post(BASE_URL + 'auth/forgot-password/otp/',data)
   }

    forgotform(data){
      return axios.post(BASE_URL + 'auth/forgot-password/',data)
   }

    passresetform(data){
      return axios.post(BASE_URL + 'auth/forgot-password/new-password/',data)
   }

   resendotp(resenddata){
    return axios.post(BASE_URL + 'auth/register/otp/resend/',resenddata)
   }

    homecards(){
      return axios.get(BASE_URL)
    }

    searchpage(data){
      return axios.post(BASE_URL + 'search/',data)
    }

    readrecipe(data){
      return axios.get(BASE_URL + 'recipe/'+ data+'/')
    }

    sort(sortdata){
      return axios.post(BASE_URL + 'search/sort/',sortdata)
    }

    starters(){
      return axios.get(BASE_URL +'starters/')
    }

    maincourse(){
      return axios.get(BASE_URL +'main-course/')
    }
    
    desserts(){
      return axios.get(BASE_URL +'desserts/')
    }

    drinks(){
      return axios.get(BASE_URL +'drinks/')
    }

    others(){
      return axios.get(BASE_URL +'others/')
    }

    bookmark(data){
      return axios.post(BASE_URL + 'recipe/bookmark/', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

    like(data){
      return axios.post(BASE_URL + 'recipe/like/', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

}
  
  export default new ServerService();