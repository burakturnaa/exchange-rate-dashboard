<template>
    <div>
        <p>{{currency_json}}</p>
    </div>
</template>

<script>
export default {
    name: 'Json',

    data:()=>({
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,
        currency_json:{
            sarrafiye_json : {},
            doviz_json: {}
        }
    }),

    methods: {
        get_sarrafiye(){


            return new Promise((resolve,reject)=>{
            var post_config = {
            method: 'get',
            url: this.API_URL + "/provider/api/sarrafiye/",
            headers:{
                'Content-Type': 'application/json',
                // "Authorization": 'Bearer '+localStorage.access
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
                // let arr_response = []
                // let array_index = 0;
                // response.data.forEach(el => {
                // el.alis = this.format_money(el.alis,4,".",",")
                // el.satis = this.format_money(el.satis,4,".",",")
                // if (el.kur == "KGRTRY") {
                //     this.kgrtry_alis = el.alis;
                //     this.kgrtry_satis = el.satis;
                // }else{
                //     arr_response.push(el)
                // }
                // array_index++;
                // });
                // response.data.splice(0,1); // kgrtry değeri döviz kurları ile aynı data içerisinde geldiği için onu data içerisinden kaldırıyoruz
                // KGRTRY indexi 0 olmalı.
                this.currency_json.sarrafiye_json =response.data;
                console.log(this.currency_json.sarrafiye_json);
                // this.loading = false;
            }
            resolve(response.data)
            })
            .catch( error => {
                reject(error)
            
            if(error.response.status == 401){
                console.log('401 Auth!');
                // this.invalid_token()
            }
            else{
                console.log(error);
            }
            });
        })

        },

        get_doviz(){
            
            return new Promise((resolve,reject)=>{
                var post_config = {
                    method: 'get',
            url: this.API_URL + "/provider/api/doviz/",
            headers:{
                'Content-Type': 'application/json',
                // "Authorization": 'Bearer '+localStorage.access
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
                // let arr_response = []
                // let array_index = 0;
                // response.data.forEach(el => {
                    // el.alis = this.format_money(el.alis,4,".",",")
                // el.satis = this.format_money(el.satis,4,".",",")
                // if (el.kur == "KGRTRY") {
                    //     this.kgrtry_alis = el.alis;
                //     this.kgrtry_satis = el.satis;
                // }else{
                    //     arr_response.push(el)
                // }
                // array_index++;
                // });
                // response.data.splice(0,1); // kgrtry değeri döviz kurları ile aynı data içerisinde geldiği için onu data içerisinden kaldırıyoruz
                // KGRTRY indexi 0 olmalı.
                this.currency_json.doviz_json =response.data;
                console.log(this.currency_json.doviz_json);
                // this.loading = false;
            }
            resolve(response.data)
            })
            .catch( error => {
            reject(error)
            
            if(error.response.status == 401){
                console.log('401 Auth!');
                // this.invalid_token()
            }
            else{
                console.log(error);
            }
            });
        })

        }
    },

    mounted(){
        this.get_doviz()
        this.get_sarrafiye()
    }
}
</script>