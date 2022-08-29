export const LogsMixin = {
  methods: {
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
      this.pagination.page = 1;
      this.filtered = true;
      this.loading = true;
      console.log('submit!')
        this.$v.ip.$touch()
        // this.$v.latest_date.$touch()
        // console.log(this.$v.latest_date.$invalid);
        console.log(this.$v.ip.$invalid);
        if (this.$v.ip.$invalid) {
          console.log("error");
          console.log(this.$v.clear_date.$invalid);
          this.loading = false;
        } else { 

          var params = "?";
          params += "title=" + this.title.toUpperCase();

          if (this.state != "") {
            params += "&status=" + this.state;
          }

          if (this.start_date_text != ""){
            params += "&sdate=" +this.start_date_text;
          }

          if (this.latest_date_text != ""){
            params += "&edate=" +this.latest_date_text;
          }
          // if(this.only_uid != null){
          //   params += "&only_uid=1";
          // }

          // if (this.limit != "" && this.limit != 0) {
          //   params += "&limit=" + this.limit
          // }

          // if(this.title != ""){
          //   params += "&title=" + this.title
          // }
          
          let offset = (this.pagination.page)
          var desc = "0";
          if (this.sort_status) {
            desc = "1";
          }else{
            desc = "0";
          }

          let url = "";

          if ( this.sort_status !== "" && this.sort_name !== "") {
            // url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?sort=${this.sort_name}&desc=${desc}&` + params;
            url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/` + params
          }else{
            // url = `/get_logs_new28/${offset}/${this.pagination.rowsPerPage}?` + params;
            url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/` + params
          }
          var dateFormat = require('dateformat');
          

          return new Promise((resolve,reject)=>{
            
            var post_config = {
              method: 'get',
              url: this.API_URL + url,
              headers:{  
                "Authorization": localStorage.token
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
                response.data.payload.forEach(el => {
                  let log_time = dateFormat(el.log_time,"dd-mm-yyyy hh:MM:ss")
                  el.log_time = log_time;
                });
                // console.log(response.data.payload);
                this.logs = response.data.payload;
                this.loading = false
                this.pagination.totalItems  = response.data.length
              }
              resolve(response.data)
            })
            .catch( error => {
              this.pagination.totalItems = 0
              if(error.response.status == 401){
                console.log('401 Auth!');
                this.logs = [];
               
              }
              if(error.response.status == 404){
                this.logs = [];
                
              }
              else{
                console.log(error);
              }
              this.loading = false;
              reject(error)
            });
          
          })
        }
      },

      async clear_filters(){
        this.loading = true;
        this.latest_date ="";
        this.latest_date_text ="";
        this.ip = "";
        this.title = "";
        this.limit = 500;
        this.only_uid = null;
        this.state = "";
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
         var desc = "0";
         if (this.sort_status) {
           desc = "1";
         }else{
           desc = "0";
         }

        var params = "?";
        params += "title=" + this.title;

        if (this.state != "") {
          params += "&status=" + this.state;
        }

        if (this.start_date_text != ""){
          params += "&sdate=" +this.start_date_text;
        }

        if (this.latest_date_text != ""){
          params += "&edate=" +this.latest_date_text;
        }


         let offset =  (this.pagination.page)
         let url = ""
         if (this.filtered) {
           
           if ( this.sort_status !== "" && this.sort_name !== "") {
             url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/?sort=${this.sort_name}&desc=${desc}&` + params;
           }else{
             url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/` + params;
           }
                           
         }else{
           if  ((this.sort_status !== "undefined" && this.sort_status !== "") && (this.sort_name !== "undefined" && this.sort_name !== "")){
             url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/?sort=${this.sort_name}&desc=${desc}&` + params;
           }else{
             url = `/customer/get_log_by_filter/${offset}/${this.pagination.rowsPerPage}/` + params;
           }
         }


         var dateFormat = require('dateformat')

          var post_config = {
          method: 'get',
          url:  this.API_URL + url,
          headers:{            
            "Authorization": localStorage.token
          },      
          data : ""
         };
   
         await this.axios(post_config).then(response => {
            // console.log(response);
            response.data.payload.forEach(el => {
              let log_time = dateFormat(el.log_time,"dd-mm-yyyy hh:MM:ss")
              el.log_time = log_time;
            });
           this.logs = response.data.payload;
           this.pagination.totalItems  = response.data.length
           this.pagination.page = pageNumber;
           this.progress_bar=false;
         })
         .catch( error => {
          this.pagination.totalItems = 0
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.logs = [];
          }
          else{
            console.log(error);
          }
          this.progress_bar=false;
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


  }
  
  
}
