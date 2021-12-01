export const DashboardMixin = {
  methods: {
    get_all_rate(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
        var post_config = {
          method: 'get',
          url: this.API_URL + "/provider/api/doviz/",
          headers:{
            'Content-Type': 'application/json',
            "Authorization": 'Bearer '+localStorage.access
          },          
        };
        this.axios(post_config)
        .then(response => {
          if(response.data == undefined)   reject("no response")
          if(response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
          }
          if (response.status == 200) {
            let arr_response = []
            let array_index = 0;
            response.data.forEach(el => {
              el.alis = this.format_money(el.alis,4,".",",")
              el.satis = this.format_money(el.satis,4,".",",")
              if (el.kur == "KGRTRY") {

                this.kgrtry_alis = el.alis;
                this.kgrtry_satis = el.satis;


              }else{
                arr_response.push(el)
              }
              array_index++;
            });
            // response.data.splice(0,1); // kgrtry değeri döviz kurları ile aynı data içerisinde geldiği için onu data içerisinden kaldırıyoruz
            // KGRTRY indexi 0 olmalı.
            this.rates =arr_response;
            this.loading = false;
          }
          resolve(response.data)
        })
        .catch( error => {
          this.loading = false;
          reject(error)
          
          if(error.response.status == 401){
            console.log('401 Auth!');
            this.invalid_token()
        
          }
          else{
            console.log(error);
          }
        });
      })
    },

    get_all_sarrafiye(){
      this.loading = true;
      return new Promise((resolve,reject)=>{
      var post_config = {
        method: 'get',
        url: this.API_URL + "/provider/api/sarrafiye/",
        headers:{
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+localStorage.access
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
          this.calculated.forEach(el_calculated => {
            response.data.forEach(el => {
              // console.log(el_calculated.kur);
              // console.log(el.kur);
              if (el_calculated.kur == el.kur) {
                el.hesaplanan_alis = this.format_money(el_calculated.alis,2,".",",")
                el.hesaplanan_satis = this.format_money(el_calculated.satis,2,".",",")

                el.alis = this.format_money(el.alis,4,".",",")
                el.satis = this.format_money(el.satis,4,".",",")
              }
            });
          });
          this.sarrafiye = response.data;
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

  invalid_token(){
    console.log('401 Auth!');
    this.calculated = {};
    this.rates = {};
    this.sarrafiye = {};
    localStorage.access = "";
    localStorage.refresh = "";
    this.$router.push({path: '/login'});
  },

  calculated_sarrafiye(){
    this.loading = true;
    return new Promise((resolve,reject)=>{
    var post_config = {
      method: 'get',
      url: this.API_URL + "/provider/api/milyem/",
      headers:{
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ localStorage.access
      },          
    };
    this.axios(post_config)
    .then(response => {
      if(response.data == undefined)   reject("no response")
      if(response.status == 401){
        
        this.invalid_token()
      }
      if (response.status == 200) {
        this.calculated = response.data;
        this.list_type = 0;
        this.loading = false;
      }
      resolve(response.data)
    })
    .catch( error => {
      this.loading = false;
      reject(error)
      
      if(error.response.status == 401){
        this.invalid_token()
      }
      else if(error.response.status == 500){
        // this.invalid_token()
        if (error.response.data.detail == "Veri bulunamamıştır ") {
          this.$toast.error('Sarrafiye kaydı bulunamamıştır. Lütfen en az bir sarrafiye ekleyiniz.', {
            position: 'top-right',
          })
        }
      }
      else{
        console.log(error);
      }
    });
  })
},

format_money(number, decPlaces, decSep, thouSep){
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "." : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
  },
  update_rate(item){
    this.update_sort = true
    this.loading =true;
    return new Promise((resolve,reject) => {
     
      var id= item.id
      var bodyFormData = new FormData();
      bodyFormData.append('kur', item.kur);
      bodyFormData.append('alis', item.alis);
      bodyFormData.append('satis', item.satis);

      var post_config = {
        method: 'patch',
        url:   this.API_URL + `/provider/api/doviz/${id}/`,
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.main()
        // this.loading_button = false
        
      })
      .catch( error => {
        this.main()
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  update_sarrafiye(item){
    this.update_sort = true
    this.loading =true;
    return new Promise((resolve,reject) => {
     
      var id= item.id
      var bodyFormData = new FormData();
      bodyFormData.append('kur', item.kur);
      bodyFormData.append('alis', item.alis);
      bodyFormData.append('satis', item.satis);

      var post_config = {
        method: 'patch',
        url:   this.API_URL + `/provider/api/sarrafiye/${id}/`,
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.main()
      })
      .catch( error => {
        this.main()
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },


  update_kgrtry(){
    this.update_sort = true
    this.loading =true;
    return new Promise((resolve,reject) => {
     
      var bodyFormData = new FormData();
      bodyFormData.append('kur', "KGRTRY");
      bodyFormData.append('alis', this.kgrtry_alis);
      bodyFormData.append('satis', this.kgrtry_satis);

      var post_config = {
        method: 'patch',
        url:   this.API_URL + `/provider/api/doviz/3/`, //KGRTRY ID 3 olmalıdır.
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.main()
        // this.loading_button_kgrtry = false
      })
      .catch( error => {
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  delete_rate(item){
    this.loading =true;
    return new Promise((resolve,reject) => {
     
      var id= item.id

      var post_config = {
        method: 'delete',
        url:   this.API_URL + `/provider/api/doviz/${id}/`,
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        // data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.main()
        // this.loading_button = false
        
      })
      .catch( error => {
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  delete_sarrafiye(item){
    this.loading =true;
    return new Promise((resolve,reject) => {
     
      var id= item.id

      var post_config = {
        method: 'delete',
        url:   this.API_URL + `/provider/api/sarrafiye/${id}/`,
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        // data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.main()
        // this.loading_button = false
        
      })
      .catch( error => {
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  open_add_rate_dialog(){
    this.add_rate_dialog = true;
  },

  close_add_rate_dialog(){
    this.add_rate_dialog = false;
    this.addRateForm.kur = ""
    this.addRateForm.alis = ""
    this.addRateForm.satis = ""

    this.addSarrafiyeForm.kur = ""
    this.addSarrafiyeForm.alis = ""
    this.addSarrafiyeForm.satis = ""
  },

  clear_add_rate_dialog(){

    this.addRateForm.kur = ""
    this.addRateForm.alis = ""
    this.addRateForm.satis = ""

    this.addSarrafiyeForm.kur = ""
    this.addSarrafiyeForm.alis = ""
    this.addSarrafiyeForm.satis = ""

  },

  open_add_sarrafiye_dialog(){
    this.add_sarrafiye_dialog = true;
  },

  close_add_sarrafiye_dialog(){
    this.add_sarrafiye_dialog = false;
    this.addSarrafiyeForm.kur = ""
    this.addSarrafiyeForm.alis = 0
    this.addSarrafiyeForm.satis = 0
  },


  add_rate(){
    return new Promise((resolve,reject) => {
     
      var bodyFormData = new FormData();
      bodyFormData.append('kur', this.addRateForm.kur);
      bodyFormData.append('alis', this.addRateForm.alis);
      bodyFormData.append('satis', this.addRateForm.satis);

      var post_config = {
        method: 'post',
        url:   this.API_URL + `/provider/api/doviz/`, 
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        // this.close_add_rate_dialog()
        this.clear_add_rate_dialog()
        this.get_all_rate()
      })
      .catch( error => {
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        // this.close_add_rate_dialog()
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  add_sarrafiye(){
    return new Promise((resolve,reject) => {
     
      var bodyFormData = new FormData();
      bodyFormData.append('kur', this.addSarrafiyeForm.kur);
      bodyFormData.append('alis', this.addSarrafiyeForm.alis);
      bodyFormData.append('satis', this.addSarrafiyeForm.satis);

      var post_config = {
        method: 'post',
        url:   this.API_URL + `/provider/api/sarrafiye/`,
        headers:{   
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ localStorage.access
        },
        data : bodyFormData
      };
      

      this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
            position: 'top-right',
        })
        this.clear_add_rate_dialog()
        this.main();
      })
      .catch( error => {
        this.$toast.error('İşleminiz gerçekleştirilemedi', {
            position: 'top-right',
        })
        this.clear_add_rate_dialog()
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
      
    })
  },

  update_sarrafiye_sort(){
    return new Promise((resolve,reject) => {
      this.loading = true;
      this.update_sort = true
      let index = 0;
      this.sarrafiye.forEach(el => {
        el.index = index

        var bodyFormData = new FormData();
        bodyFormData.append('kur', el.kur);
        bodyFormData.append('alis', el.alis);
        bodyFormData.append('satis', el.satis);
        bodyFormData.append('index', el.index);

        var post_config = {
          method: 'patch',
          url:   this.API_URL + `/provider/api/sarrafiye/${el.id}/`,
          headers:{   
            'Content-Type': 'application/json',
            "Authorization": 'Bearer '+ localStorage.access
          },
          data : bodyFormData
        };

        this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        // this.$toast.success('İşleminiz başarıyla gerçekleşti', {
        //     position: 'top-right',
        // })
        // this.close_add_sarrafiye_dialog()
        // this.main();
      })
      .catch( error => {
        // this.$toast.error('İşleminiz gerçekleştirilemedi', {
        //     position: 'top-right',
        // })
        // this.close_add_sarrafiye_dialog()
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
        index++;
      });

    })
  },

  update_rate_sort(){
    return new Promise((resolve,reject) => {
      this.update_sort = true
      this.loading = true;
      let index = 0;
      this.rates.forEach(el => {
        el.index = index

        var bodyFormData = new FormData();
        bodyFormData.append('kur', el.kur);
        bodyFormData.append('alis', el.alis);
        bodyFormData.append('satis', el.satis);
        bodyFormData.append('index', el.index);

        var post_config = {
          method: 'patch',
          url:   this.API_URL + `/provider/api/doviz/${el.id}/`,
          headers:{   
            'Content-Type': 'application/json',
            "Authorization": 'Bearer '+ localStorage.access
          },
          data : bodyFormData
        };

        this.axios(post_config)
      .then(response => {
        console.log("oKKK");
        // this.$toast.success('İşleminiz başarıyla gerçekleşti', {
        //     position: 'top-right',
        // })
        // this.close_add_sarrafiye_dialog()
        // this.main();
      })
      .catch( error => {
        // this.$toast.error('İşleminiz gerçekleştirilemedi', {
        //     position: 'top-right',
        // })
        // this.close_add_sarrafiye_dialog()
        if(error.response.status == 401){
          
          this.invalid_token()
        }
        else{
          console.log(error);
        }
        this.loading = false;
        reject(error);
      });
        index++;
      });

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
      // console.log(item);
      this.updateButton = false;
      this.editForm.id = item.id;
      this.editForm.name = item.name;
      this.editForm.serial = item.serial;
      this.editForm.wifi_ip = item.wifi_ip
      this.editForm.wifi_mac = item.wifi_mac
      this.editForm.lan_mac = item.lan_mac
      this.editForm.lan_ip = item.lan_ip
     
      this.edit_dialog = true;

    },
    close_edit(){
      this.editForm.name = "";
      this.editForm.serial = "";

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

    set_device_name(){
      return new Promise((resolve,reject) => {
        var data = {
          "id" : this.editForm.id,
          "name" : this.editForm.name 
        };
        var post_config = {
          method: 'put',
          url:   this.API_URL + "/customer/update_device",
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
      let set_device_name = await this.set_device_name();
      if(set_device_name == "ok"){
        this.$toast.success('İşleminiz başarıyla gerçekleşti', {
          position: 'top-right',
        })
      }
      
      this.loading = false;
    } 
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
