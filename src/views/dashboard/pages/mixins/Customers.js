export const CustomersMixin = {
  methods: {
    get_all_customers(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
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
    get_devices(){
        return new Promise((resolve,reject) => {
            
            var post_config = {
                method: 'get',
                url:   this.API_URL + "/admin/get_devices",
                headers:{   
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
                },
            };
        
            this.axios(post_config)
            .then(response => {
                response.data.payload.forEach(el => {
                    if (el.customer_id_fk == null || el.customer_id_fk == -1) {
                        this.devices.push(el.serial);
                    }
                    
                });
                resolve("ok")
                // console.log(response)
            })
            .catch( error => {
                this.loading = false;
                if(error.response.status == 401){
                console.log('401 Auth!');
                }
                else{
                console.log(error);
                }
                reject(error);
            });
        })
    },

    get_admins(){
        return new Promise((resolve,reject) => {
            
            var post_config = {
                method: 'get',
                url:   this.API_URL + "/admin/get_admins",
                headers:{   
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
                },
            };
        
            this.axios(post_config)
            .then(response => {
                response.data.payload.forEach(el => {
                    this.admins.push(el);
                });
                resolve("ok")
                // console.log(response)
            })
            .catch( error => {
                this.loading = false;
                if(error.response.status == 401){
                console.log('401 Auth!');
                }
                else{
                console.log(error);
                }
                reject(error);
            });
        })
    },
    
    async openAddForm(){
      this.loading = true;
      let get_devices = await this.get_devices();
      // console.log(get_devices );
      let get_admins = await this.get_admins();
      // console.log(get_admins );
      
        
      if(get_devices == "ok" && get_admins == "ok"){
        this.loading = false;
            this.add_customer_dialog = true;
            // this.add_customer_dialog = true;
        }

    },

    close_addform(){
        this.add_customer_dialog = false;
        this.admins = [];
        this.devices = [];
        this.values = [];
        this.admin = [];
        this.addForm.fname = "";
        this.addForm.lname = "";
        this.addForm.title = "";
        this.addForm.email = "";
        this.addForm.address = "";
        this.addForm.phone = "0212";
        this.addForm.mobile = "+90";

    },

    async save(){
        this.loading = true;
        this.saveButton = true;
        console.log('submit!')
        this.$v.addForm.$touch()
        this.$v.admin_id.$touch()
        console.log(this.$v.addForm.$invalid );
        if (this.$v.addForm.$invalid && this.$v.admin_id.$invalid) {
          console.log("error");
          console.log(this.$v.addForm.$invalid);
          this.saveButton = false;
          this.loading = false;
        } else {
          let save_customer = await this.save_customer();
          console.log(save_customer);
          if(save_customer == "ok"){
              this.close_addform();
              this.get_all_customers();
              this.loading= false;
              this.saveButton = false;
              this.$toast.success('İşleminiz başarıyla gerçekleşti', {
                  position: 'top-right',
              })
          }else{
              this.close_addform();
              this.loading = false
              this.saveButton = false;
              this.$toast.error('İşleminiz gerçekleştirilemedi', {
                  position: 'top-right',
              })
          }
        }
    },

    async update(){
      this.loading = true;
      this.saveButton = true;
      console.log('submit!')
      this.$v.editForm.$touch()
      this.$v.admin_id.$touch()
      console.log(this.$v.editForm.$invalid );
      if (this.admin_id == null) {
        this.saveButton = false;
        this.loading = false;
      }
      if ((this.$v.editForm.$invalid && this.$v.admin_id.$invalid) || (this.admin_id == "" && this.admin_id == null)) {
        console.log("error");
        console.log(this.$v.editForm.$invalid);
        this.saveButton = false;
        this.loading = false;
      } else {
        let update_customer = await this.update_customer();
        // console.log(update_customer);
        if(update_customer == "ok"){
            this.close_edit();
            this.get_all_customers();
            this.loading= false;
            this.saveButton = false;
            this.$toast.success('İşleminiz başarıyla gerçekleşti', {
                position: 'top-right',
            })
        }else{
            this.close_edit();
            this.loading = false
            this.saveButton = false;
            this.$toast.error('İşleminiz gerçekleştirilemedi', {
                position: 'top-right',
            })
        }
      }
  },

    save_customer(){
        return new Promise((resolve,reject) => {
            let formData = {};
            formData.fname = this.addForm.fname;
            formData.lname = this.addForm.lname;
            formData.title = this.addForm.title;
            formData.email = this.addForm.email;
            formData.address = this.addForm.address;
            formData.admin_id_fk = this.admin.id;
            formData.phone = this.addForm.phone;
            formData.mobile = this.addForm.mobile;
            formData.status = 1;
            formData.devices = this.values;
            var post_config = {
                method: 'post',
                url:   this.API_URL + "/admin/add_customer",
                headers:{   
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
                },
                data: formData
            };
        
            this.axios(post_config)
            .then(response => {
                console.log(response);
                resolve("ok")
                // console.log(response)
            })
            .catch( error => {
                this.loading = false
                this.saveButton = false;
                if(error.response.status == 401){
                console.log('401 Auth!');
                }
                else{
                  if (error.response.data.code == 4001) {
                    this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı mail adresi.', {
                      position: 'top-right',
                    })
                    return;
                  }
                  if (error.response.data.code == 4002) {
                    this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı telefon numarası.', {
                      position: 'top-right',
                    })
                    return;
                  }
                  if (error.response.data.code == 4003) {
                    this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı cep telefonu numarası.', {
                      position: 'top-right',
                    })
                    return;
                  }
                console.log(error);
                }
                reject(error);
            });
        })
    },

    update_customer(){
      return new Promise((resolve,reject) => {
          let formData = {};
          formData.id = this.editForm.id;
          formData.fname = this.editForm.fname;
          formData.lname = this.editForm.lname;
          formData.title = this.editForm.title;
          formData.email = this.editForm.email;
          formData.address = this.editForm.address;
          formData.admin_id_fk = this.admin_id.id ? this.admin_id.id : this.admin_id;
          formData.phone = this.editForm.phone;
          formData.mobile = this.editForm.mobile;
          formData.status = 1;
          formData.devices = this.values;
          var post_config = {
              method: 'put',
              url:   this.API_URL + "/admin/update_customer",
              headers:{   
              'Content-Type': 'application/json',
              "Authorization": localStorage.token
              },
              data: formData
          };
      
          this.axios(post_config)
          .then(response => {
              // console.log(response);
              resolve("ok")
              // console.log(response)
          })
          .catch( error => {
              this.loading = false
              this.saveButton = false;
              if(error.response.status == 401){
              console.log('401 Auth!');
              }
              else{
                if (error.response.data.code == 4001) {
                  this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı mail adresi.', {
                    position: 'top-right',
                  })
                  return;
                }
                if (error.response.data.code == 4002) {
                  this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı telefon numarası.', {
                    position: 'top-right',
                  })
                  return;
                }
                if (error.response.data.code == 4003) {
                  this.$toast.error('İşleminiz gerçekleştirilemedi. Kayıtlı cep telefonu numarası.', {
                    position: 'top-right',
                  })
                  return;
                }
              console.log(error);
              }
              reject(error);
          });
      })
    },

    async refreshTokenButton(item){
      this.loading = true;
      await this.refreshToken(item);
      this.loading = false;
    },

    refreshToken(item){
      // console.log(item);
      this.$swal.fire({
        title: 'Emin misiniz?',
        text: "Seçili müşterinin şifresi değiştirilecektir. Bu işlemi geri alamazsınız.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, değiştir',
        cancelButtonText: "Vazgeç"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          return new Promise((resolve,reject) => {
            var data = {
              "id" : item.id,
            };
            var post_config = {
              method: 'put',
              url:   this.API_URL + "/admin/reset_customer_password",
              headers:{   
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
              },
              data : data
            };
            this.axios(post_config)
            .then(response => {
              
             
              this.loading = false;
              this.$toast.success('İşleminiz başarıyla gerçekleşti', {
                position: 'top-right',
              })
              resolve(response);
              
              
              
              // console.log(response)
            })
            .catch( error => {
              this.loading = false;
              this.$toast.error('İşleminiz gerçekleştirilemedi', {
                position: 'top-right',
              })
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
      })
    },

    get_customer_devices(){
      return new Promise((resolve,reject) => {
          
          var post_config = {
              method: 'get',
              url:   this.API_URL + "/admin/get_devices",
              headers:{   
              'Content-Type': 'application/json',
              "Authorization": localStorage.token
              },
          };
      
          this.axios(post_config)
          .then(response => {
              response.data.payload.forEach(el => {
                if (el.customer_id_fk == null || el.customer_id_fk == -1) {
                    this.devices.push(el.serial);
                }
                if ( el.customer_id_fk == this.editForm.id ) {
                    this.devices.push(el.serial);
                    this.values.push(el.serial);
                }
                  
              });
              resolve("ok")
              // console.log(response)
          })
          .catch( error => {
              this.loading=false;
              if(error.response.status == 401){
              console.log('401 Auth!');
              }
              else{
              console.log(error);
              }
              reject(error);
          });
      })
  },

    async openEditForm(item){
      console.log(item);
      this.editForm.id = item.id;
      this.editForm.fname = item.fname;
      this.editForm.lname = item.lname;
      this.editForm.title = item.title;
      this.editForm.phone = item.phone;
      this.editForm.mobile = item.mobile;
      this.editForm.email = item.email;
      this.editForm.address = item.address;
      if (item.admin_id_fk != "" && item.admin_id_fk != null) {
        this.admin_id = item.admin_id_fk;
      }

      
      
      this.loading = true;
      let get_devices = await this.get_customer_devices();
      // console.log(get_devices );
      let get_admins = await this.get_admins();
      // console.log(get_admins );
      if(get_devices == "ok" && get_admins == "ok"){
        if (this.admin_id != '' && this.admin_id != null) {
          this.admins.forEach(el => {
            if (el.id == this.admin_id) {
              this.admin_id = el;
            }
          });
        }
        this.loading = false;
        this.edit_dialog = true;
      }
    },
    
    close_edit(){
      this.edit_dialog = false;
      this.admins = [];
      this.devices = [];
      this.values = [];
      this.admin = [];
      this.editForm.id = ""
      this.editForm.fname = ""
      this.editForm.lname = ""
      this.editForm.title = ""
      this.editForm.phone = "0212"
      this.editForm.mobile = "+09"
      this.editForm.email = ""
      this.editForm.address = ""
    
    },

    deleteItem(item){
      this.$swal.fire({
        title: 'Emin misiniz?',
        text: "Müşteri silinecektir. Bu işlemi geri alamazsınız.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil',
        cancelButtonText: "Vazgeç"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          let formData = {};
          formData.id = item.id;
          
         
          var post_config = {
            method: 'delete',
            url:   this.API_URL + "/admin/delete_customer",
            headers:{
              'Content-Type': 'application/json',
              "Authorization": localStorage.token
            },
            data : formData
          };
          this.axios(post_config)
          .then(response => {
            //resolve(response.data)
            this.loading = false;
            this.get_all_customers()
            this.$toast.success('İşleminiz başarıyla gerçekleşti', {
              position: 'top-right',
            })
          })
          .catch( error => {
            this.loading = false;
            if(error.response.status == 401){
              console.log('401 Auth!');
            }
            else{
              console.log(error);
            }
            this.$toast.error('İşleminiz gerçekleştirilemedi', {
              position: 'top-right',
            })
          });
        }
      })
    },
  }
}
