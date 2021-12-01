export const  SettingsMixin = {
  methods: {

    // ----------------------------get_settings------------------------------------------------

    get_end_points(){
      return new Promise((resolve,reject)=>{
      var username= 'Babak'
      var password= 'Karchini'
      var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
      var post_config = {
        method: 'get',
        url: this.API_URL + "/get_end_points",
        crossDomain: true,
        headers:{
              'Content-Type': 'application/json',  // <-- here               
              "Authorization": "Basic " + authorizationBasic
        },          
      };
      this.axios(post_config)
      .then(response => {
        // console.log(response);
        
        if(response.data == undefined)   reject("no response")
        if(response.status == 401){
          console.log('401 Auth!');
          this.settings_form = {};
        }
        if (response.status == 200) {
          this.settings_form = response.data;
        }
        resolve(response.data)
      })
      .catch( error => {
        if(error.response.status == 401){
          console.log('401 Auth!');
          this.settings_form = {};
        }
        else{
          console.log(error);
        }
        reject(error)
      });
    })
  },

  async save(){
    this.loading = true;
    console.log('submit!')
    this.$v.settings_form.$touch()
    console.log(this.$v.settings_form.$invalid);
    if (this.$v.settings_form.$invalid) {
      console.log("error");
      console.log(this.$v.settings_form.$invalid);
      this.loading = false;
    } else {
      this.edit_dialog = false;
      console.log(this.$v.settings_form.$invalid);
      // do your submit logic here
      console.log("pending");

      let set_end_points = await this.set_end_ponits();
      if (set_end_points.status == "200") {
        this.$toast.success('İşleminiz başarıyla gerçekleştirildi.', {
          position: 'top-right',
        })
        this.get_end_points();
      }
      else{
        this.$toast.error('İşleminiz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.', {
          position: 'top-right',
        })
        this.get_end_points();
      }
      this.loading = false;
    }
  },

  set_end_ponits(){
    return new Promise((resolve,reject) => {
      var data = {
        "checkHesCode" : this.settings_form.checkHesCode,
        "sendCodeToLogin" : this.settings_form.sendCodeToLogin,
        "authenticateWithCode" : this.settings_form.authenticateWithCode,
        "baseUrl" : this.settings_form.baseUrl,
        "regBaseUrl" : this.settings_form.regBaseUrl
      };
      var username= 'Babak'
      var password= 'Karchini'
      var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
      var post_config = {
        method: 'post',
        url:   this.API_URL + "/set_end_points_new28",
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": "Basic " + authorizationBasic
        },
        data : data
      };



      this.axios(post_config)
      .then(response => {
        // console.log(response);
        resolve(response);
      })
      .catch( error => {
        if(error.response.status == 401){
          console.log('401 Auth!');
        }
        else{
          console.log(error);
        }
        reject(error);
      });

      
    })

  }


  }  
}
