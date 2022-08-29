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

  }
}
