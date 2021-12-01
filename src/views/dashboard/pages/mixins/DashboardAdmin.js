import { Date } from "core-js"

export const DashboardAdminMixin = {
  methods: {
    get_all_devices(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
        var post_config = {
          method: 'get',
          url: this.API_URL + "/admin/get_devices",
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
            this.devices = response.data.payload;
            this.list_type = 0;
            this.loading = false;
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading = false;
          reject(error)
          
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.devices = [];
        
          }
          else{
            console.log(error);
          }
        });
      })
    },

    async changeDeviceStatus(item){
      // this.progress_bar = true;
      let new_status = item.status === 1 ? 0 : 1
      
      var formData = {
          "id" : item.id,
          "status" : new_status, 
      };
      var post_config = {
          method: 'put',
          url:   this.API_URL + "admin/toggle_sbox",
          headers:{
              "x-access-token" : localStorage.token,
              "x-refresh-token" : localStorage.r_token
          },
          data : formData
      };

      await this.axios(post_config).then((response) => {
          
          if (response.status === 200 && response.data.code === 200 && !response.data.a_token) {
              console.log(response.data.meta);
              this.$toast.success(this.$t("success_message"), {
                  position: 'top-right',
              })                    
              item.status = new_status
          }else if (response.status === 200 && response.data.a_token){
              localStorage.token = response.data.a_token;
              this.changeSboxStatus(item);
          }

          if(response.status === 200 && response.data.code === 500){
              this.$toast.error(this.$t("error_message_try_again"), {
                  position: 'top-right',
              })
          }
          this.progress_bar = false;
      }).catch(error => {
          this.progress_bar = false
          this.$toast.error(this.$t("error_message"), {
              position: 'top-right',
          })
          console.log(error);
          if(error.response.data.meta.errors){
              console.log(error.response.data.meta.errors.msg);
          }else{
              console.log(error.response.data.meta);
          }
          if(error.response.data.auth === 0){
              console.log("token expired");
              this.$router.push({path: '/admin/exit'});
          }
      })
  },

    // ----------------------------get_active_checkpoint------------------------------------------------
    // ----------------------------get_active_checkpoint------------------------------------------------
    // ----------------------------get_active_checkpoint------------------------------------------------
    // ----------------------------get_active_checkpoint------------------------------------------------

  //   get_active_checkpoint(){
  //     return new Promise((resolve,reject)=>{
  //     var username= 'Babak'
  //     var password= 'Karchini'
  //     var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //     var post_config = {
  //       method: 'get',
  //       url: this.API_URL + "/get_active_points_new28",
  //       crossDomain: true,
  //       headers:{
  //         "Access-Control-Allow-Origin": "*",
  //         'Content-Type': 'application/json',  // <-- here               
  //         "Authorization": "Basic " + authorizationBasic
  //       },          
  //     };
  //     this.axios(post_config)
  //     .then(response => {
  //       // console.log(response);
  //       if(response.data == undefined)   reject("no response")
  //       if(response.status == 401){
  //         console.log('401 Auth!');
  //         this.check_points = [];
  //       }
  //       if (response.status == 200) {
  //         this.check_points = response.data;
  //         this.list_type = 1;

  //       }
  //       resolve(response.data)
  //     })
  //     .catch( error => {
  //       if(error.response.status == 401){
  //         console.log('401 Auth!');
  //         this.check_points = [];
  //       }
  //       else{
  //         console.log(error);
  //       }
  //       reject(error)
  //     });
  //   })
  // },

  //   // ----------------------------remove_check_point------------------------------------------------
  //   // ----------------------------remove_check_point------------------------------------------------
  //   // ----------------------------remove_check_point------------------------------------------------
  //   // ----------------------------remove_check_point------------------------------------------------
    
  //   deleteItem(item){
  //     this.$swal.fire({
  //       title: 'Emin misiniz?',
  //       text: "Kontrol Noktası silinecektir. Bu işlemi geri alamazsınız.",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Evet, sil',
  //       cancelButtonText: "Vazgeç"
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.loading = true;
  //         var bodyFormData = new FormData();
  //         bodyFormData.append('uid', item.uid);
  //         var username= 'Babak'
  //         var password= 'Karchini'
  //         var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //         var post_config = {
  //           method: 'post',
  //           url:   this.API_URL + "/remove_check_point_new28",
  //           headers:{
  //             // 'Content-Type': 'multipart/form-data',   
  //             'Content-Type': 'application/json',   
  //             "Authorization": "Basic " + authorizationBasic
  //           },
  //           data : bodyFormData
  //         };
  //         this.axios(post_config)
  //         .then(response => {
  //           //resolve(response.data)
  //           this.loading = false;
  //           let index = this.check_points.indexOf(item);
  //           this.check_points.splice(index,1);
  //           this.$toast.success('İşleminiz başarıyla gerçekleşti', {
  //             position: 'top-right',
  //           })
  //         })
  //         .catch( error => {
  //           this.loading = false;
  //           if(error.response.status == 401){
  //             console.log('401 Auth!');
  //           }
  //           else{
  //             console.log(error);
  //           }
  //           this.$toast.error('İşleminiz gerçekleştirilemedi', {
  //             position: 'top-right',
  //           })
  //         });
  //       }
  //     })
  //   },

  //   // ----------------------------add_check_point------------------------------------------------
  //   // ----------------------------add_check_point------------------------------------------------
  //   // ----------------------------add_check_point------------------------------------------------
  //   // ----------------------------add_check_point------------------------------------------------

  //   addItem(){
  //     this.add_dialog = true;
  //     this.addForm.status = "3";
  //     this.saveButton = false;
  //   },
  //   save(){
  //     this.loading = true;
  //     this.saveButton=true;
  //       console.log('submit!')
  //         this.$v.addForm.$touch()
  //         console.log(this.$v.addForm.$invalid);
  //         if (this.$v.addForm.$invalid) {
  //           console.log("error");
  //           console.log(this.$v.addForm.$invalid);
  //           this.loading = false;
  //         } else {
  //           console.log(this.$v.addForm.$invalid);
  //           // do your submit logic here
  //           console.log("pending");
  //           setTimeout(() => {
  //             console.log("ok..");
  //             let data = {};
  //             var check_point_exists = false;
  //             data = {
  //               uid : this.addForm.uid,
  //               title : this.addForm.title,
  //               status : this.addForm.status,
  //               serial : this.addForm.serial,
  //               token : "abc",
  //             }
  //             this.check_points.forEach(el => {
  //               if(el.uid == data.uid){
  //                 alert("Kayıtlı ID");
  //                 check_point_exists = true;
  //                 this.saveButton = false;
  //                 return
  //               }
  //               if (el.serial == data.serial) {
  //                 alert("Kayıtlı Seri No!");
  //                 check_point_exists = true;
  //                 this.saveButton = false;
  //                 return
  //               }
  //             });
  //             if(!check_point_exists){
  //             this.saveButton = true;
  //             var bodyFormData = new FormData();
  //             bodyFormData.append('uid', data.uid);
  //             bodyFormData.append('title', data.title);
  //             bodyFormData.append('status', data.status);
  //             bodyFormData.append('token', data.token);
  //             bodyFormData.append('serial', data.serial);
  //             var username= 'Babak'
  //             var password= 'Karchini'
  //             var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //             var post_config = {
  //               method: 'post',
  //               url:   this.API_URL + "/add_check_point_new28",
  //               headers:{   
  //                 'Content-Type': 'application/json',
  //                 "Authorization": "Basic " + authorizationBasic
  //               },
  //               data : bodyFormData
  //             };
  //             this.axios(post_config)
  //             .then(response => {
  //               this.get_all_checkpoint()
  //               this.$toast.success('İşleminiz başarıyla gerçekleşti', {
  //                 position: 'top-right',
  //               })
  //             })
  //             .catch( error => {
  //               if(error.response.status == 401){
  //                 console.log('401 Auth!');
  //               }
  //               else{
  //                 console.log(error);
  //               }
  //               this.$toast.error('İşleminiz gerçekleştirilemedi', {
  //                 position: 'top-right',
  //               })
  //             });
  //             this.check_points.unshift(data);
  //             this.add_dialog = false;
  //             this.addForm.uid = "";
  //             this.addForm.title = "";
  //             this.addForm.status = "";
  //             this.addForm.token = "";
  //             this.addForm.serial = "";
  //             }
  //           }, 500);
  //         }
  //   },

    editItem(item){
      var dateFormat = require('dateformat');
      let created_at = dateFormat(item.created_at,"dd-mm-yyyy h:MM:ss")
        // console.log(item);
        let customer_id;
        if (item.customer_id_fk == null || item.customer_id_fk == undefined ||item.customer_id_fk == '') {
            customer_id = -1
        }else{
            customer_id = item.customer_id_fk;
        }
      this.updateButton = false;
      this.editForm.id = item.id;
      this.editForm.name = item.name;
      this.editForm.serial = item.serial;
      this.editForm.created_at = created_at;
      this.editForm.wifi_ip = item.wifi_ip
      this.editForm.wifi_mac = item.wifi_mac
      this.editForm.lan_mac = item.lan_mac
      this.editForm.lan_ip = item.lan_ip
      this.editForm.customer = customer_id
      this.editForm.customer_name = item.customer_name
      this.editForm.relay_mode = item.relay_mode == "0" ? "No" : "Yes";
      this.editForm.relay_time_1 = item.relay_time_1 == 0 ? "" : item.relay_time_1;
      this.editForm.relay_time_2 = item.relay_time_2 == 0 ? "" : item.relay_time_2;
     
      this.edit_dialog = true;

    },
    close_edit(){
      this.editForm.name = "";
      this.editForm.serial = "";
      this.editForm.created_at = "";

      this.edit_dialog = false;
    },
  //   close_add(){
  //     this.addForm.uid = "";
  //     this.addForm.title = "";
  //     this.addForm.token = "";
  //     this.addForm.status = "";
  //     this.addForm.serial = "";
  //     this.add_dialog = false;
  //   },

  //   set_register_date(){
  //     return new Promise((resolve,reject) => {
  //       let dateS = this.editForm.req_date.split("-")
  //       let date = dateS[2] +"-"+ dateS[1] +"-"+ dateS[0];
  //       var bodyFormData = new FormData();
  //       bodyFormData.append('uid', this.editForm.uid);
  //       bodyFormData.append('reg_date', date);
       
  //       var username= 'Babak'
  //       var password= 'Karchini'
  //       var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //       var post_config = {
  //         method: 'post',
  //         url:   this.API_URL + "/edit_point_register_date_new28",
  //         headers:{   
  //           'Content-Type': 'multipart/form-data',
  //           'Access-Control-Allow-Origin' : '*',
  //           "Authorization": "Basic " + authorizationBasic
  //         },
  //         data : bodyFormData
  //       };
        

  //       this.axios(post_config)
  //       .then(response => {
          
  //         this.check_points.forEach(el => {
  //           if (el.uid == this.editForm.uid) {
  //             // el.title = this.editForm.title;
  //             el.register_date = this.converToDate(this.editForm.req_date);
  //             // el.status = this.editForm.status;
  //             resolve(response);
  //           }
  //         });
          
          
  //         // console.log(response)
  //       })
  //       .catch( error => {
  //         if(error.response.status == 401){
  //           console.log('401 Auth!');
  //         }
  //         else{
  //           console.log(error);
  //         }
  //         this.loading = false;
  //         reject(error);
  //       });
        
  //     })
  //   },

  //   set_serial(){
  //     return new Promise((resolve,reject) => {
  //       var bodyFormData = new FormData();
  //       bodyFormData.append('uid', this.editForm.uid);
  //       bodyFormData.append('serial', this.editForm.serial);
        
  //       var username= 'Babak'
  //       var password= 'Karchini'
  //       var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //       var post_config = {
  //         method: 'post',
  //         url:   this.API_URL + "/edit_serial_number_new28",
  //         headers:{   
  //           'Content-Type': 'multipart/form-data',
  //           'Access-Control-Allow-Origin' : '*',
  //           "Authorization": "Basic " + authorizationBasic
  //         },
  //         data : bodyFormData
  //       };
  //       this.check_point_exists = false
        
  //       this.check_points.forEach(el => {
  //         if (el.serial == this.editForm.serial && el.uid != this.editForm.uid) {
  //             this.check_point_exists = true;
  //             // alert("Kayıtlı Token! Token alanı güncellenemedi.")
  //         }
  //       });

  //       if(this.check_point_exists){
  //         let response = {};
  //         response.status = "0";
  //         resolve(response);
  //       }else{

  //         this.axios(post_config)
  //       .then(response => {
          
  //         this.check_points.forEach(el => {
  //           if (el.uid == this.editForm.uid) {
  //             // el.title = this.editForm.title;
  //             el.serial = this.editForm.serial;
  //             // el.status = this.editForm.status;
  //             resolve(response);
  //           }
  //         });
          
          
  //         // console.log(response)
  //       })
  //       .catch( error => {
  //         if(error.response.status == 401){
  //           console.log('401 Auth!');
  //         }
  //         else{
  //           console.log(error);
  //         }
  //         this.loading = false
  //         reject(error);
  //       });

  //       }
  //     })
  //   },

    set_device(){
      return new Promise((resolve,reject) => {
          // console.log(this.editForm);
          
        if (this.editForm.relay_mode == "Yes") {
            var data = {
                "id" : this.editForm.id,
                "name" : this.editForm.name,
                "has_log" : 0,
                "customer_id" : this.editForm.customer,
                "relay_mode" : 1,
                "relay_time_1" : this.editForm.relay_time_1,
                "relay_time_2" : this.editForm.relay_time_2,
                "wifi_mac" : this.editForm.wifi_mac,
                "lan_mac" : this.editForm.lan_mac,
                "wifi_ip" : this.editForm.wifi_ip,
                "lan_ip" : this.editForm.lan_ip
            };
        }else{
            var data = {
                "id" : this.editForm.id,
                "name" : this.editForm.name,
                "has_log" : 0,
                "customer_id" : this.editForm.customer,
                "relay_mode" : 0,
                "relay_time_1" : 0,
                "relay_time_2" : 0,
                "wifi_mac" : this.editForm.wifi_mac,
                "lan_mac" : this.editForm.lan_mac,
                "wifi_ip" : this.editForm.wifi_ip,
                "lan_ip" : this.editForm.lan_ip
            };
        }
        
        var post_config = {
          method: 'put',
          url:   this.API_URL + "/admin/update_device",
          headers:{   
            'Content-Type': 'application/json',
            "Authorization": localStorage.token
          },
          data : data
        };

          this.axios(post_config)
        .then(response => {
          this.get_all_devices();
          resolve("ok")
          // console.log(response)
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

        // }
      })
    },
  //   rename_point(){
  //     return new Promise((resolve,reject)=>{
  //       var bodyFormData = new FormData();
  //       bodyFormData.append('uid', this.editForm.uid);
  //       bodyFormData.append('title', this.editForm.title);
  //       var username= 'Babak'
  //       var password= 'Karchini'
  //       var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //       var post_config = {
  //         method: 'post',
  //         url:   this.API_URL + "/rename_point_new28",
  //         headers:{   
  //           'Content-Type': 'application/json',
  //           "Authorization": "Basic " + authorizationBasic
  //         },
  //         data : bodyFormData
  //       };
        
  //       this.axios(post_config)
  //       .then(response => {
  //         // console.log(response)
  //         this.check_points.forEach(el => {
  //           if (el.uid == this.editForm.uid) {
  //             el.title = this.editForm.title;
  //             // el.token = this.editForm.token;
  //             // el.status = this.editForm.status;
  //           }
  //         resolve(response);
  //         });
          
  //         //this.edit_dialog = false;
  //       })
  //       .catch( error => {
  //         if(error.response.status == 401){
  //           console.log('401 Auth!');
  //         }
  //         else{
  //           console.log(error);
  //         }
  //         reject(error);
          
  //       });
  //     })
  //   },
  //   set_check_point_status(){
  //     return new Promise((resolve,reject)=>{

  //       var bodyFormData = new FormData();
  //       bodyFormData.append('uid', this.editForm.uid);
  //       bodyFormData.append('status', this.editForm.status);
  //       var username= 'Babak'
  //       var password= 'Karchini'
  //       var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //       var post_config = {
  //         method: 'post',
  //         url:   this.API_URL + "/set_check_point_status_new28",
  //         headers:{   
  //           'Content-Type': 'application/json',
  //           "Authorization": "Basic " + authorizationBasic
  //         },
  //         data : bodyFormData
  //       };
  //       this.axios(post_config)
  //       .then(response => {
  //         // console.log(response)
  //         this.check_points.forEach(el => {
  //           if (el.uid == this.editForm.uid) {
  //             // el.title = this.editForm.title;
  //             // el.token = this.editForm.token;
  //             el.status = this.editForm.status;
  //           }
  //           resolve(response)
  //         });
          
  //         //this.edit_dialog = false;
  //       })
  //       .catch( error => {
          
  //         if(error.response.status == 401){
  //           console.log('401 Auth!');
  //         }
  //         else{
  //           console.log(error);
  //         }
  //         reject(error)
          
          
  //       });
  //     })
  //   },
  async update(){
    this.updateButton = true;
    this.loading = true;
    console.log('submit!')
    this.$v.editForm.$touch()
    console.log(this.$v.editForm.$invalid);
    if (this.$v.editForm.$invalid) {
      console.log("error");
      console.log(this.$v.editForm.$invalid);
      this.loading = false;
    } else {
      this.edit_dialog = false;
      console.log(this.$v.editForm.$invalid);
      // do your submit logic here
      console.log("pending");
      this.updateButton = true;
      let set_device = await this.set_device();
      if(set_device == "ok"){
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
          position: 'top-right',
        })
        this.get_all_devices()
      }else{
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
          })
      }
      
      this.loading = false;
    } 
  },

  async delete_device(){
    this.$swal.fire({
        title: 'Emin misiniz?',
        text: "Seçili cihaz silinecektir. Bu işlemi geri alamazsınız.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil',
        cancelButtonText: "Vazgeç"
    }).then(async (result) => {
        if (result.isConfirmed) {
            
            this.loading = true;
            var data = {
                "id" : this.editForm.id,
            }
            
            this.edit_dialog = false;
            var post_config = {
                method: 'delete',
                url:   this.API_URL + "/admin/delete_device",
                headers:{   
                  'Content-Type': 'application/json',
                  "Authorization": localStorage.token
                },
                data : data
              };
      
            await this.axios(post_config)
              .then(response => {
                this.get_all_devices();
                this.loading = false;
                this.$toast.success('İşleminiz başarıyla gerçekleşti', {
                    position: 'top-right',
                })
                this.close_edit();
                // console.log(response)
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
                this.close_edit();
              });
        }   
    })  
},

  //   async getAllBtn(){
  //     this.search_checkpoint = "";
  //     this.loading = true;
  //     await this.get_all_checkpoint()
  //     this.loading = false;
  //   },
  //   async getActiveBtn(){
  //     this.search_checkpoint = "";
  //     this.loading = true;
  //     await this.get_active_checkpoint()
  //     this.loading = false;
  //   },

  //   devices(item){
  //     // console.log(item.uid);
  //     this.$router.push({path: '/devices?d='+ item.uid+"&t="+ localStorage.token})
  //   },

  //   async startDownload(){
  //     // this.loading = true;
  //     await this.get_all_checkpoint();
  //   },

  //   finishDownload(){
  //     this.loading = false;
  //   },

  //   dateFormat(val){
  //     console.log(val);
  //     if (typeof val != "undefined") {

  //       var d = new Date(val)
  //       console.log(d);
            
  //       var day = "";
        
  //       if (d.getDate().toString().length == 1) {
  //         day = `0${d.getDate()}`;  
  //       }else{
  //         day = d.getDate();
  //       }

  //       var month = ""
  //       if (d.getMonth().toString().length == 1) {
  //         month = `0${d.getMonth() + 1}`;  
  //       }else{
  //         month = d.getMonth() + 1;
  //       }
  //       var year = d.getFullYear()
  //       var formatted = `${day}-${month}-${year}`

  //       console.log(day);
  //       if (isNaN(day)) {
  //         this.clear_date = ""
  //       }else{
  //         this.clear_date = formatted
  //       }
  //     }else {
  //         this.clear_date = val
  //     }
    
  //   },

  //   converToDate(val){
  //     // console.log(val);
  //     let dateS = val.split("-")
  //     // console.log(dateS);
  //     let date = dateS[2] +"-"+ dateS[1] +"-"+ dateS[0];
  //     return date
  //   },

  //   async refreshTokenButton(item){
  //     // console.log(item);
  //     this.loading = true;
  //     await this.refreshToken(item);
  //     this.loading = false;
  //   },
    
  //   refreshToken(item){
  //     // console.log(item);
  //     this.$swal.fire({
  //       title: 'Emin misiniz?',
  //       text: "Seçili kaydın Token bilgisi değiştirilecektir. Bu işlemi geri alamazsınız.",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Evet, değiştir',
  //       cancelButtonText: "Vazgeç"
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.loading = true;
  //         return new Promise((resolve,reject) => {
  //           var data = {
  //             "uid" : item.uid,
  //             "token" : "abc"
  //           };
  //           var username= 'Babak'
  //           var password= 'Karchini'
  //           var authorizationBasic = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  //           var post_config = {
  //             method: 'post',
  //             url:   this.API_URL + "/set_token",
  //             headers:{   
  //               'Content-Type': 'application/json',
  //               "Authorization": "Basic " + authorizationBasic
  //             },
  //             data : data
  //           };
  //           this.axios(post_config)
  //           .then(response => {
              
  //             this.check_points.forEach(el => {
  //               if (el.uid == item.uid) {
  //                 // el.title = this.editForm.title;
  //                 el.token = "abc";
  //                 // el.status = this.editForm.status;
  //                 this.loading = false;
  //                 this.$toast.success('İşleminiz başarıyla gerçekleşti', {
  //                   position: 'top-right',
  //                 })
  //                 resolve(response);
  //               }
  //             });
              
              
  //             // console.log(response)
  //           })
  //           .catch( error => {
  //             this.loading = false;
  //             this.$toast.error('İşleminiz gerçekleştirilemedi', {
  //               position: 'top-right',
  //             })
  //             if(error.response.status == 401){
  //               console.log('401 Auth!');
  //             }
  //             else{
  //               console.log(error);
  //             }
  //             reject(error);
  //           });
    
            
  //         })


  //       }
  //     })
  //   },
    



  }
}
