export const LogsAdminMixin = {
  methods: {

    invalid_token(){
      console.log('401 Auth!');

      this.doviz_logs = [];
      localStorage.access = "";
      localStorage.refresh = "";
      this.$router.push({path: '/login'});
    },

    get_doviz_logs(){

      return new Promise((resolve,reject)=>{

        var post_config = {
          method: 'get',
          url: this.API_URL + "/provider/api/doviz_h/?format=json",
          crossDomain: true,
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => {
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {

            response.data.results.forEach(el => {
              el.old_alis += " ₺"
              el.old_satis += " ₺"
              el.yeni_alis += " ₺"
              el.yeni_satis += " ₺"
              el.updated_date = el.updated_date.split("T")
              let time = el.updated_date[1].split(".")
              el.updated_date = el.updated_date[0]
              el.updated_date += " " + time[0]
            });
            this.pagination.totalItems  = response.data.count
            this.doviz_logs = response.data.results;
          }
          resolve(response.data)
        })
        .catch( error => {
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },

    get_sarrafiye_logs(){

      return new Promise((resolve,reject)=>{

        var post_config = {
          method: 'get',
          url: this.API_URL + "/provider/api/sarrafiye_h/?format=json",
          crossDomain: true,
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => {
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {

            response.data.results.forEach(el => {
              el.old_alis += " ₺"
              el.old_satis += " ₺"
              el.yeni_alis += " ₺"
              el.yeni_satis += " ₺"
              el.update_date = el.update_date.split("T")
              let time = el.update_date[1].split(".")
              el.update_date = el.update_date[0]
              el.update_date += " " + time[0]
              this.pagination.totalItems  = response.data.count
            });
            
            this.doviz_logs = response.data.results;
          }
          resolve(response.data)
        })
        .catch( error => {
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },

    get_sarrafiye_logs_filter(){
      this.loading = true;
      return new Promise((resolve,reject)=>{

        var post_config = {
          method: 'get',
          url: this.API_URL + `/provider/api/sarrafiye_h/?search=${this.title}`,
          crossDomain: true,
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => { 
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {

            response.data.forEach(el => {
              el.old_alis += " ₺"
              el.old_satis += " ₺"
              el.yeni_alis += " ₺"
              el.yeni_satis += " ₺"
              el.update_date = el.update_date.split("T")
              let time = el.update_date[1].split(".")
              el.update_date = el.update_date[0]
              el.update_date += " " + time[0]
            });
            this.loading = false;
            
            this.doviz_logs = response.data;
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading=false;
          this.title = "";
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },
    sarrafiye_clear_filters(){
      return new Promise((resolve,reject)=>{
        this.loading = true;
        var post_config = {
          method: 'get',
          url: this.API_URL + "/provider/api/sarrafiye_h/?format=json",
          crossDomain: true,
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => {
          this.title = "";
          this.first_date =""
          this.second_date =""
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {

            response.data.results.forEach(el => {
              this.title = ""
              el.old_alis += " ₺"
              el.old_satis += " ₺"
              el.yeni_alis += " ₺"
              el.yeni_satis += " ₺"
              el.update_date = el.update_date.split("T")
              let time = el.update_date[1].split(".")
              el.update_date = el.update_date[0]
              el.update_date += " " + time[0]
              this.loading = false;
            });
            
            this.pagination.totalItems  = response.data.count
            this.doviz_logs = response.data.results;
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading = false;
          this.title = "";
          this.first_date =""
          this.second_date =""
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },

    get_doviz_logs_filter(){
      this.pagination.totalItems  = 0
      this.pagination.page = 1;
      this.filtered = true;
      this.loading = true;
      console.log('submit!')

          var params = "?";
          params += "search=" + this.title;


          let first_date_text = ""
          let second_date_text = ""
          if (this.first_date != "") {
            first_date_text = this.first_date + "T00:00:00"
          }
          if (this.second_date != "") {
            second_date_text = this.second_date + "T23:59:59"
          }

          params += "&start_date="+first_date_text + "&end_date=" + second_date_text

         
          
          let offset = (this.pagination.page)
     

          let url = "";
     
          url = `/provider/api/doviz_h/${params}&page=${offset}`

          return new Promise((resolve,reject)=>{

            var post_config = {
              method: 'get',
              url: this.API_URL + url,
              crossDomain: true,
              headers:{
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.access
              },          
            };
            this.axios(post_config)
            .then(response => {
              // console.log(response);
              //console.log(response);
              if(response.data == undefined)   reject("no response")
              if(response.status == 401){
                console.log('401 Auth!');
                this.invalid_token()
              }
              if (response.status == 200) {
    
                response.data.results.forEach(el => {
                  el.old_alis += " ₺"
                  el.old_satis += " ₺"
                  el.yeni_alis += " ₺"
                  el.yeni_satis += " ₺"
                  el.updated_date = el.updated_date.split("T")
                  let time = el.updated_date[1].split(".")
                  el.updated_date = el.updated_date[0]
                  el.updated_date += " " + time[0]
                });
                this.loading = false;
                this.pagination.totalItems  = response.data.count
                
                this.doviz_logs = response.data.results;
              }
              resolve(response.data)
            })
            .catch( error => {
              this.pagination.totalItems = 0
              this.loading=false;
              this.title = "";
              if(error.response.status == 401){
                console.log('401 Auth!');
                this.invalid_token()
              }
              else{
                this.doviz_logs = []
                console.log(error);
              }
              this.pagination.page = 0;
              reject(error)
            });
          })
    },

    doviz_clear_filters(){
      return new Promise((resolve,reject)=>{
        this.loading = true;
        var post_config = {
          method: 'get',
          url: this.API_URL + "/provider/api/doviz_h/?format=json",
          crossDomain: true,
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => {
          this.title = "";
          this.first_date =""
          this.second_date =""
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {

            response.data.results.forEach(el => {
              this.title = ""
              el.old_alis += " ₺"
              el.old_satis += " ₺"
              el.yeni_alis += " ₺"
              el.yeni_satis += " ₺"
              el.updated_date = el.updated_date.split("T")
              let time = el.updated_date[1].split(".")
              el.updated_date = el.updated_date[0]
              el.updated_date += " " + time[0]
              this.loading = false;
            });
            
            this.pagination.totalItems  = response.data.count
            this.doviz_logs = response.data.results;
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading = false;
          this.title = "";
          this.first_date =""
          this.second_date =""
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },

    get_all_logs(){
        return new Promise((resolve,reject)=>{
        var username= 'Babak'
        var password= 'Karchini'
        var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        var post_config = {
          method: 'get',
          url: this.API_URL + "/get_logs_new28",
          crossDomain: true,
          headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'multipart/form-data',  // <-- here              
            "Authorization": "Basic " + authorizationBasic
          },          
        };
        this.axios(post_config)
        .then(response => {
          // console.log(response);
          //console.log(response);
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.logs = [];
          }
          if (response.status == 200) {
            this.filter_date()
            this.logs = response.data;
          }
          resolve(response.data)
        })
        .catch( error => {
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.logs = [];
          }
          else{
            console.log(error);
          }
          reject(error)
        });
      })
    },

    clear_logs(){
      this.loading = true;
      console.log('submit!')
        this.$v.clear_date.$touch()
        console.log(this.$v.clear_date.$invalid);
        if (this.$v.clear_date.$invalid) {
          console.log("error");
          console.log(this.$v.clear_date.$invalid);
          this.loading = false;
        } else {
          this.$swal.fire({
            title: 'Emin misiniz?',
            text: `${this.clear_date_text} tarihi öncesi olan tüm Log Kayıtları silinicektir. Bu işlemi geri alamazsınız. `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil',
            cancelButtonText: "Vazgeç"
          }).then((result) => {
            if (result.isConfirmed) {
              this.loading = true;
              var bodyFormData = new FormData();
              bodyFormData.append('until_date', this.clear_date_text);
              var username= 'Babak'
              var password= 'Karchini'
              var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
              var post_config = {
                method: 'post',
                url:   this.API_URL + "/clear_logs_new28",
                headers:{
                  // 'Content-Type': 'multipart/form-data',   
                  'Content-Type': 'application/json',   
                  "Authorization": "Basic " + authorizationBasic
                },
                data : bodyFormData
              };
              this.axios(post_config)
              .then(response => {
                //resolve(response.data)
                // console.log(response);
                this.get_all_logs()
                this.$toast.success('İşleminiz başarıyla gerçekleşti', {
                  position: 'top-right',
                })
                this.loading = false;
              })
              .catch( error => {
                if(error.response.status == 401){
                  console.log('401 Auth!');
                }
                else{
                  console.log(error);
                }
                this.$toast.error('İşleminiz gerçekleştirilemedi', {
                  position: 'top-right',
                })
                this.loading = false;
              });
            }
          })

          this.loading = false
        }
    },

    clear_all_logs(){
      this.$swal.fire({
        title: 'Emin misiniz?',
        text: "Tüm Log Kayıtları silinicektir. Bu işlemi geri alamazsınız.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil',
        cancelButtonText: "Vazgeç"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          var bodyFormData = new FormData();
          bodyFormData.append('until_date', "01-01-2050");
          var username= 'Babak'
          var password= 'Karchini'
          var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
          var post_config = {
            method: 'post',
            url:   this.API_URL + "/clear_logs_new28",
            headers:{
              // 'Content-Type': 'multipart/form-data',   
              'Content-Type': 'application/json',   
              "Authorization": "Basic " + authorizationBasic
            },
            data : bodyFormData
          };
          this.axios(post_config)
          .then(response => {
            //resolve(response.data)
            // console.log(response);
            this.get_all_logs()
            this.$toast.success('İşleminiz başarıyla gerçekleşti', {
              position: 'top-right',
            })
            this.loading = false;
          })
          .catch( error => {
            if(error.response.status == 401){
              console.log('401 Auth!');
              
            }
            else{
              console.log(error);
            }
            this.$toast.error('İşleminiz gerçekleştirilemedi', {
              position: 'top-right',
            })
            this.loading = false;
          });
        }
      })
    },

    filter_date(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      

      today = yyyy + '-' + mm + '-' + dd;
      var formatted = dd + '-' + mm + '-' + yyyy;
      this.latest_date_text = formatted;
      // console.log(today);
      return today
    },
    filter(){
      this.pagination.totalItems  = 0
      this.pagination.page = 1;
      this.filtered = true;
      this.loading = true;
      console.log('submit!')
        // this.$v.ip.$touch()
        // // this.$v.latest_date.$touch()
        // // console.log(this.$v.latest_date.$invalid);
        // console.log(this.$v.ip.$invalid);
        // if (this.$v.ip.$invalid) {
        //   console.log("error");
        //   console.log(this.$v.clear_date.$invalid);
        //   this.loading = false;
        // } else { 

          var params = "?";
          params += "search=" + this.title;


          let first_date_text = ""
          let second_date_text = ""
          if (this.first_date != "") {
            first_date_text = this.first_date + "T00:00:00"
          }
          if (this.second_date != "") {
            second_date_text = this.second_date + "T23:59:59"
          }

          params += "&start_date="+first_date_text + "&end_date=" + second_date_text
          
          let offset = (this.pagination.page)

          let url = "";

          url = `/provider/api/sarrafiye_h/${params}&page=${offset}`
          return new Promise((resolve,reject)=>{

            var post_config = {
              method: 'get',
              url: this.API_URL + url,
              crossDomain: true,
              headers:{
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.access
              },          
            };
            this.axios(post_config)
            .then(response => {
              // console.log(response);
              //console.log(response);
              if(response.data == undefined)   reject("no response")
              if(response.status == 401){
                console.log('401 Auth!');
                this.invalid_token()
              }
              if (response.status == 200) {
    
                response.data.results.forEach(el => {
                  el.old_alis += " ₺"
                  el.old_satis += " ₺"
                  el.yeni_alis += " ₺"
                  el.yeni_satis += " ₺"
                  el.update_date = el.update_date.split("T")
                  let time = el.update_date[1].split(".")
                  el.update_date = el.update_date[0]
                  el.update_date += " " + time[0]
                });
                this.loading = false;
                this.pagination.totalItems  = response.data.count
                
                this.doviz_logs = response.data.results;
              }
              resolve(response.data)
            })
            .catch( error => {
              this.pagination.totalItems = 0
              this.loading=false;
              this.title = "";
              if(error.response.status == 401){
                console.log('401 Auth!');
                this.invalid_token()
              }
              else{
                this.doviz_logs = []
                console.log(error);
              }
              this.pagination.page = 0;
              reject(error)
            });
          })
      },
    
      filter_doviz(){
        this.pagination.totalItems  = 0
        this.pagination.page = 1;
        this.filtered = true;
        this.loading = true;
        console.log('submit!')
        
            var params = "?";
            params += "search=" + this.title;
  
            let url = ""; 
        
            url = `/provider/api/doviz_h/${params}&page=${offset}`
         
            return new Promise((resolve,reject)=>{
  
              var post_config = {
                method: 'get',
                url: this.API_URL + url,
                crossDomain: true,
                headers:{
                  'Content-Type': 'application/json',
                  "Authorization": "Bearer " + localStorage.access
                },          
              };
              this.axios(post_config)
              .then(response => {
                // console.log(response);
                //console.log(response);
                if(response.data == undefined)   reject("no response")
                if(response.status == 401){
                  console.log('401 Auth!');
                  this.invalid_token()
                }
                if (response.status == 200) {
      
                  response.data.results.forEach(el => {
                    el.old_alis += " ₺"
                    el.old_satis += " ₺"
                    el.yeni_alis += " ₺"
                    el.yeni_satis += " ₺"
                    el.updated_date = el.updated_date.split("T")
                    let time = el.updated_date[1].split(".")
                    el.updated_date = el.updated_date[0]
                    el.updated_date += " " + time[0]
                  });
                  this.loading = false;
                  this.pagination.totalItems  = response.data.count
                  
                  this.doviz_logs = response.data.results;
                }
                resolve(response.data)
              })
              .catch( error => {
                this.pagination.totalItems = 0
                this.loading=false;
                this.title = "";
                if(error.response.status == 401){
                  console.log('401 Auth!');
                  this.invalid_token()
                }
                else{
                  this.doviz_logs = []
                  console.log(error);
                }
                this.pagination.page = 0;
                reject(error)
              });
            })        
      
        },

      get_customers(){
        var post_config = {
          method: 'get',
          url: this.API_URL + "/admin/get_customers",
          headers:{
            'Content-Type': 'application/json',
            "Authorization": localStorage.token
          },          
        };
        this.axios(post_config)
        .then(response => {
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.devices = [];
          }
          if (response.status == 200) {
              response.data.payload.forEach(el => {
                var dateFormat = require('dateformat');
                el.created_at = dateFormat(el.created_at,"dd-mm-yyyy h:MM:ss")
                
              });
            this.customers = response.data.payload;
            
            this.loading = false;
          }
        })
        .catch( error => {
          this.loading = false;
          
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.customers = [];
        
          }
          else{
            console.log(error);
          }
        });
      },

      async clear_filters(){
        this.loading = true;
        this.latest_date ="";
        this.latest_date_text ="";
        this.ip = "";
        this.title = "";
        this.selected_customer = ""
        this.state = "";
        this.start_date_text = "";

        this.limit = 500;
        this.only_uid = null;
        this.filtered = false;
        this.pagination.page = 1;
        this.pagination.rowsPerPage = 50;
        
        await this.filter();
        this.loading = false;
      },

      paginationChangeHandler(pageNumber) {
        this.progress_bar = true;
        this.pagination.page = pageNumber;
        //this.getData();
         (async()=>{
        //  var desc = "0";
        //  if (this.sort_status) {
        //    desc = "1";
        //  }else{
        //    desc = "0";
        //  }

        var params = "?";
        params += "search=" + this.title;
        let first_date_text = ""
        let second_date_text = ""
        if (this.first_date != "") {
          first_date_text = this.first_date + "T00:00:00"
        }
        if (this.second_date != "") {
          second_date_text = this.second_date + "T23:59:59"
        }

        params += "&start_date="+first_date_text + "&end_date=" + second_date_text

         let offset =  (this.pagination.page)
         let url = ""     
          
          url = `/provider/api/sarrafiye_h/${params}&page=${offset}`
          
         var dateFormat = require('dateformat')

          var post_config = {
          method: 'get',
          url:  this.API_URL + url,
          headers:{            
            "Authorization": localStorage.token,
            "Authorization": "Bearer " + localStorage.access
          },      
         };
   
         await this.axios(post_config).then(response => {
            // console.log(response);

           
            if(response.data == undefined)   reject("no response")
            if(response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            if (response.status == 200) {
  
              response.data.results.forEach(el => {
                el.old_alis += " ₺"
                el.old_satis += " ₺"
                el.yeni_alis += " ₺"
                el.yeni_satis += " ₺"
                el.update_date = el.update_date.split("T")
                let time = el.update_date[1].split(".")
                el.update_date = el.update_date[0]
                el.update_date += " " + time[0]
              });
              this.loading = false;
              
              this.doviz_logs = response.data.results;
            }
            this.pagination.totalItems  = response.data.count
            this.pagination.page = pageNumber;
            this.progress_bar=false;
            // console.log("asdasdasdasdasdasdasdasdasdasdasd");
            // resolve(response.data)

         })
         .catch( error => {
          this.loading=false;
          this.title = "";
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            this.doviz_logs = []
            console.log(error);
          }
          this.pagination.page = 0;
          this.progress_bar=false;
          // reject(error)
        });

       })()
       // <---------------i am here pagination just worked , check backend too !
       },


       paginationChangeHandlerDoviz(pageNumber) {
        this.progress_bar = true;
        this.pagination.page = pageNumber;
        //this.getData();
         (async()=>{
        var params = "?";
        params += "search=" + this.title;
        let first_date_text = ""
        let second_date_text = ""
        if (this.first_date != "") {
          first_date_text = this.first_date + "T00:00:00"
        }
        if (this.second_date != "") {
          second_date_text = this.second_date + "T23:59:59"
        }

        params += "&start_date="+first_date_text + "&end_date=" + second_date_text

         let offset =  (this.pagination.page)
         let url = ""     
          
          url = `/provider/api/doviz_h/${params}&page=${offset}`
          
         var dateFormat = require('dateformat')

          var post_config = {
          method: 'get',
          url:  this.API_URL + url,
          headers:{            
            "Authorization": localStorage.token,
            "Authorization": "Bearer " + localStorage.access
          },      
         };
   
         await this.axios(post_config).then(response => {
            // console.log(response);

           
            if(response.data == undefined)   reject("no response")
            if(response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            if (response.status == 200) {
  
              response.data.results.forEach(el => {
                el.old_alis += " ₺"
                el.old_satis += " ₺"
                el.yeni_alis += " ₺"
                el.yeni_satis += " ₺"
                el.updated_date = el.updated_date.split("T")
                let time = el.updated_date[1].split(".")
                el.updated_date = el.updated_date[0]
                el.updated_date += " " + time[0]
              });
              this.loading = false;
              
              this.doviz_logs = response.data.results;
            }
            this.pagination.totalItems  = response.data.count
            this.pagination.page = pageNumber;
            this.progress_bar=false;
            // console.log("asdasdasdasdasdasdasdasdasdasdasd");
            // resolve(response.data)

         })
         .catch( error => {
          this.loading=false;
          this.title = "";
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          else{
            this.doviz_logs = []
            console.log(error);
          }
          this.pagination.page = 0;
          this.progress_bar=false;
          // reject(error)
        });

       })()
       // <---------------i am here pagination just worked , check backend too !
       },


       updateSort(byDesc, event){
        //  console.log(byDesc);
        if (byDesc == "by") {
          if (typeof(event[0]) === "undefined") {
            
            this.sort_name = ""
          }else{
            this.sort_name = event[0];
          }

  
          // console.log(this.sort_name);
          // console.log(this.sort_status);
          if (this.sort_status !== "" && this.sort_name !== "") {

            var params = "";
            params += "latest_date=" + this.latest_date_text;

            if (this.ip != "") {
              params += "&ip=" + this.ip
            }
            if(this.only_uid != null){
              params += "&only_uid=1";
            }
            if(this.title != ""){
              params += "&title=" + this.title
            }
            
            
            let desc = "0";
            if (this.sort_status) {
              desc = "1";
            }else {
              desc = "0";
            }
  
            var offset =  (this.pagination.page)
            let url="";
            if (this.filtered) {
              url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?` + params + `&sort=${this.sort_name}&desc=${desc}`;
            }else{
              url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?sort=${this.sort_name}&desc=${desc}`;
            }
  
  
            this.progress_bar = true;
            this.dataLoading = true;

            (async()=>{
              var offset =  (this.pagination.page)
              var username= 'Babak'
              var password= 'Karchini'
              var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
              //let url = `https://ai.samsuncarsi.com.tr:8955/calls_list/${offset}/${this.pagination.rowsPerPage}`;
  
              var post_config = {
                  method: 'get',
                  url: this.API_URL + url,
                  headers:{
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'multipart/form-data',  // <-- here              
                    "Authorization": "Basic " + authorizationBasic
                  }, 
                  data : ""
                };
              
              // if you use es6 arrow function you dont need to do that = this.
              // this will work inside the function
              await this.axios(post_config).then(response => {
  
              if(response.status == 403 || response.status == 500){
                console.log('Token is required!');
                this.$router.push({path: '/login'})
                localStorage.token = "";
              }
  
              let data = response.data.list;
              
              //console.log(response.data.res.res.data)

              this.logs  = data
              this.pagination.totalItems  = response.data.total
              this.total_result = response.data.total
              }).catch( error => {
                if(error.response.status == 401){
                  console.log('401 Auth!');
                  this.logs = [];
                }
                else{
                  console.log(error);
                }
                this.loading = false;
                reject(error)
              });
              this.progress_bar = false;
              this.dataLoading = false
            })();
          }else{
              
             this.progress_bar = true;
             this.dataLoading = true;
            (async()=>{

              var params = "";
              params += "latest_date=" + this.latest_date_text;

              if (this.ip != "") {
                params += "&ip=" + this.ip
              }
              if(this.only_uid != null){
                params += "&only_uid=1";
              }
              if(this.title != ""){
                params += "&title=" + this.title;
              }

              let offset =  (this.pagination.page)
              let url="";
              if (this.filtered) {
                url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?` + params;
              }else{
                url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}`;
              }
              var username= 'Babak'
              var password= 'Karchini'
              var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  
              var post_config = {
                method: 'get',
                url: this.API_URL + url,
                headers:{
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'multipart/form-data',  // <-- here              
                  "Authorization": "Basic " + authorizationBasic
                }, 
                data : ""
              };
              

              await this.axios(post_config).then(response => {
  
              if(response.status == 403 || response.status == 500){
                console.log('Token is required!');
                this.$router.push({path: '/login'})
                localStorage.token = "";
              }
  
              let data = response.data.list;
              
           
              this.logs  = data
              this.pagination.totalItems  = response.data.total
              this.total_result = response.data.total
              }).catch( error => {
                if(error.response.status == 401){
                  console.log('401 Auth!');
                  this.logs = [];
                }
                else{
                  console.log(error);
                }
                this.loading = false;
                reject(error)
              });
              this.progress_bar = false;
              this.dataLoading = false
            })();
          }
        }else{
          if (typeof(event[0]) === "undefined") {
            this.sort_status = ""
          }else{
            this.sort_status = event[0];

           }
          
          if (this.sort_status !== "" && this.sort_name !== "") {
            
            
            let desc = "0";
            if (this.sort_status) {
              desc = "1";
            }else {
              desc = "0";
            }

            var params = "";
            params += "latest_date=" + this.latest_date_text;

            if (this.ip != "") {
              params += "&ip=" + this.ip
            }
            if(this.only_uid != null){
              params += "&only_uid=1";
            }
            if(this.title != ""){
              params += "&title=" + this.title
            }
  
            var offset =  (this.pagination.page)
            let url="";
            if (this.filtered) {
              url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?` + params + `&sort=${this.sort_name}&desc=${desc}`;
            }else{
              url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?sort=${this.sort_name}&desc=${desc}`;
            }
  
            this.progress_bar = true;
            this.dataLoading = true;
            (async()=>{
              var offset =  (this.pagination.page)
              var username= 'Babak'
              var password= 'Karchini'
              var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

              var post_config = {
                  method: 'get',
                  url: this.API_URL + url,
                  headers:{
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'multipart/form-data',  // <-- here              
                    "Authorization": "Basic " + authorizationBasic
                  }, 
                  data : ""
                };
              
              // if you use es6 arrow function you dont need to do that = this.
              // this will work inside the function
              await this.axios(post_config).then(response => {
  
              if(response.status == 403 || response.status == 500){
                console.log('Token is required!');
                this.$router.push({path: '/login'})
                localStorage.token = "";
              }
  
              let data = response.data.list;
              
              this.logs  = data
              this.pagination.totalItems  = response.data.total
              this.total_result = response.data.total
              }).catch( error => {
                if(error.response.status == 401){
                  console.log('401 Auth!');
                  this.logs = [];
                }
                else{
                  console.log(error);
                }
                this.loading = false;
                reject(error)
              });
              this.progress_bar = false;
              this.dataLoading = false
            })();
          }else{
              
             this.progress_bar = true;
             this.dataLoading = true;
              
             (async()=>{
              
              var params = "";
              params += "latest_date=" + this.latest_date_text;

              if (this.ip != "") {
                params += "&ip=" + this.ip
              }
              if(this.only_uid != null){
                params += "&only_uid=1";
              }
              if(this.title != ""){
                params += "&title=" + this.title
              }

              let offset =  (this.pagination.page)
              let url="";
              if (this.filtered) {
                url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?` + params;
              }else{
                url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}`;
              }

              var username= 'Babak'
              var password= 'Karchini'
              var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  
              var post_config = {
                  method: 'get',
                  url:  this.API_URL + url,
                  headers:{
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'multipart/form-data',  // <-- here              
                    "Authorization": "Basic " + authorizationBasic
                  }, 
                  data : ""
                };
              
              // if you use es6 arrow function you dont need to do that = this.
              // this will work inside the function
              await this.axios(post_config).then(response => {
  
              if(response.status == 403 || response.status == 500){
                console.log('Token is required!');
                this.$router.push({path: '/login'})
                localStorage.token = "";
              }
  
              let data = response.data.list;
              
              //console.log(response.data.res.res.data)

              this.logs  = data
              this.pagination.totalItems  = response.data.total
              this.total_result = response.data.total
              }).catch( error => {
                if(error.response.status == 401){
                  console.log('401 Auth!');
                  this.logs = [];
                }
                else{
                  console.log(error);
                }
                this.loading = false;
                reject(error)
              });
              this.progress_bar = false;
              this.dataLoading = false
            })();
          }
        }
      },

      get_doviz_titles(){
        return new Promise((resolve,reject)=>{

          var post_config = {
            method: 'get',
            url: this.API_URL + "/provider/api/doviz/",
            crossDomain: true,
            headers:{
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.access
            },          
          };
          this.axios(post_config)
          .then(response => {
            // console.log(response);
            //console.log(response);
            if(response.data == undefined)   reject("no response")
            if(response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            if (response.status == 200) {
  
              response.data.forEach(el => {
                this.doviz_titles.push(el.kur)
              });

            }
            resolve(response.data)
          })
          .catch( error => {
            if(error.response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            else{
              console.log(error);
            }
            reject(error)
          });
        })
      },


      get_sarrafiye_titles(){
        return new Promise((resolve,reject)=>{

          var post_config = {
            method: 'get',
            url: this.API_URL + "/provider/api/sarrafiye/",
            crossDomain: true,
            headers:{
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.access
            },          
          };
          this.axios(post_config)
          .then(response => {
            // console.log(response);
            //console.log(response);
            if(response.data == undefined)   reject("no response")
            if(response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            if (response.status == 200) {
  
              response.data.forEach(el => {
                this.sarrafiye_titles.push(el.kur)
              });

            }
            resolve(response.data)
          })
          .catch( error => {
            if(error.response.status == 401){
              console.log('401 Auth!');
              this.invalid_token()
            }
            else{
              console.log(error);
            }
            reject(error)
          });
        })
      }
  }
  
  
}
