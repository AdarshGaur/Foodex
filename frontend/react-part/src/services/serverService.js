import axios from "axios";

const BASE_URL = "https://f301cd771e23.ngrok.io/";

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

    otheruser(data){
      return axios.get(BASE_URL+ 'user/' +data+'/')
    }

    userdetails(){
      return axios.get(BASE_URL+ 'my-account/',
      {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
         },
         
     }
      )
    }

    searchpage(data){
      return axios.post(BASE_URL + 'search/',data)
    }

    readrecipe(data){

if(localStorage.getItem('access_token')){
  return axios.get(BASE_URL + 'recipe/'+ data+'/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )

}

else{
  return axios.get(BASE_URL + 'recipe/'+ data+'/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ``
    },
    
}
  )
}


}


  addrecipe(formdata){

  return axios.post(BASE_URL + 'recipe/post/', formdata,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
  }


  myrecipes(){

  return axios.get(BASE_URL + 'user/recipe-list/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
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