<template>
    <div>
        
        <body>
            <div class="container-fluid">
                
                <div class="tabela">
                    <div class="header">
                        <div class="logo">
                            <img src="/logodoviz.png" alt="">
                        </div>
                        <div class="date">
                            <h3>{{date}} <span>/</span> {{time}}</h3>
                        </div>
                    </div>
                    <div class="main">
                    <v-col cols="5" class="first">
                        <div class="head"><h1>ALIŞ </h1> <h3>WE BUY</h3></div>
                    </v-col>
                    <v-col cols="2" class="middle">
                        <v-divider
                            vertical
                        ></v-divider>
                    </v-col>
                    <v-col cols="5" class="last">
                        <div class="head"><h1>SATIŞ </h1> <h3>WE SELL</h3></div>
                    </v-col>
                    </div>


                    <div v-if="doviz == ''" class="doviz">
                       <v-row class="screen-md" >
                            <v-col cols="12" md="5" class="first">
                                <div>
                                    <h3>----</h3>
                                </div>
                            </v-col>
                            <v-col cols="6" md="2" class="middle">
                                <div>
                                    <h3>-- --</h3>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5" class="last">
                                <div>
                                    <h3>----</h3>
                                </div>
                            </v-col>
                       </v-row>

                       <!-- <v-row class="screen-sm" v-if="index < 2" v-for="(item , index) in doviz" >
                            <v-col cols="5" md="5" class="first">
                                <div>
                                    <h3>{{item.alis}}</h3>
                                </div>
                            </v-col>
                            <v-col cols="2" md="2" class="middle">
                                <div>
                                    <h3>{{item.kur}}</h3>
                                </div>
                            </v-col>
                            <v-col cols="5" md="5" class="last">
                                <div>
                                    <h3>{{item.satis}}</h3>
                                </div>
                            </v-col>
                       </v-row> -->

                       <v-row class="screen-sm" >
                             <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                <div  class="alis"  >
                                    <h3>----</h3>
                                    <div class="sarrafiye_ad">- -</div>
                                    <h3>----</h3>
                                </div>

                         <!-- </v-row> -->
                            </v-col>
                        </v-row>

                       <!-- <v-row>
                           <v-col cols="12" md="5" class="first">
                                <div>
                                    <h3>11.0800</h3>
                                </div>
                            </v-col>
                            <v-col cols="6" md="2" class="middle">
                                <div>
                                    <h3>EUR</h3>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5" class="last">
                                <div>
                                    <h3>11.0900</h3>
                                </div>
                            </v-col>
                       </v-row> -->
                    </div>






                     <div v-else-if="doviz != ''" class="doviz ">
                       <v-row class="screen-md" v-if="index < 2" v-for="(item , index) in doviz" >
                            <v-col cols="6" md="5" class="first">
                                <div>
                                    <h2>{{item.alis}}</h2>
                                </div>
                            </v-col>
                            <v-col cols="2" md="2" class="middle">
                                <div>
                                    <h3>{{item.kur}}</h3>
                                </div>
                            </v-col>
                            <v-col cols="6" md="5" class="last">
                                <div>
                                    <h2>{{item.satis}}</h2>
                                </div>
                            </v-col>
                       </v-row>

                       <!-- <v-row class="screen-sm" v-if="index < 2" v-for="(item , index) in doviz" >
                            <v-col cols="5" md="5" class="first">
                                <div>
                                    <h3>{{item.alis}}</h3>
                                </div>
                            </v-col>
                            <v-col cols="2" md="2" class="middle">
                                <div>
                                    <h3>{{item.kur}}</h3>
                                </div>
                            </v-col>
                            <v-col cols="5" md="5" class="last">
                                <div>
                                    <h3>{{item.satis}}</h3>
                                </div>
                            </v-col>
                       </v-row> -->

                       <v-row class="screen-sm" v-if="index < 1" v-for="(item , index) in doviz">
                             <v-col  v-for="(item , index) in doviz"  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                <div  class="alis"  >
                                    <h3>{{item.alis}}</h3>
                                    <div class="sarrafiye_ad">{{item.kur}}</div>
                                    <h3>{{item.satis}}</h3>
                                </div>

                         <!-- </v-row> -->
                            </v-col>
                        </v-row>

                       <!-- <v-row>
                           <v-col cols="12" md="5" class="first">
                                <div>
                                    <h3>11.0800</h3>
                                </div>
                            </v-col>
                            <v-col cols="6" md="2" class="middle">
                                <div>
                                    <h3>EUR</h3>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5" class="last">
                                <div>
                                    <h3>11.0900</h3>
                                </div>
                            </v-col>
                       </v-row> -->
                    </div>

                    


                    <div v-if="sarrafiye == ''" class="sarrafiye">

                             <v-row class="screen-sm" >
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                                <v-col  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>----</h3>
                                        <div class="sarrafiye_ad">- -</div>
                                        <h3>----</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                            </v-row>

<!-- 
                             <v-col  cols="12" md="6" class="last">
                                 
                                <div class="alis"  style="font-size:4   0px">
                                    <h3>{{index}}</h3>
                                    <div class="sarrafiye_ad">{{item.kur}}</div>
                                    <h3>{{item.satis}}</h3>
                                </div> -->
                                
                            <!-- </v-col> -->

                            <!-- <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>2,107.00</h3>
                                    <div class="sarrafiye_ad">YARIM</div>
                                    <h3>2,159.00</h3>
                                </div>
                            </v-col> -->

                         <!-- <v-row v-if="item.index%2!=0"  v-for="(item , index) in sarrafiye">
                             <v-col cols="12" md="6" class="first float-right">
                                <div class="alis"  >
                                    <h3>{{item.alis}}</h3>
                                    <div class="sarrafiye_ad">{{item.kur}}</div>
                                    <h3>{{item.satis}}</h3>
                                </div>
                                
                            </v-col>
                         </v-row> -->

                         <!-- <v-row>
                             <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>4,376.00</h3>
                                    <div class="sarrafiye_ad">ATA</div>
                                    <h3>4,476.00</h3>
                                </div>
                                
                            </v-col>
                            <v-col cols="12" md="6" class="last">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">HAS</div>
                                    <h3>874.28</h3>
                                </div>
                            </v-col>
                         </v-row> -->

                         <!-- <v-row>
                             <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">22 GRAM</div>
                                    <h3>874.28</h3>
                                </div>
                                
                            </v-col>
                            <v-col cols="12" md="6" class="last">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">24 GRAM</div>
                                    <h3>874.28</h3>
                                </div>
                            </v-col>
                         </v-row> -->

                    </div>


                    <div v-else class="sarrafiye">

                            <!-- <v-row>
                                <v-col  v-for="(item , index) in sarrafiye"  cols="12" md="6" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <div v-if="index%2==0"  class="alis"  style="font-size:40px">
                                        <h3>{{item.alis}}</h3>
                                        <div class="sarrafiye_ad">{{item.kur}}</div>
                                        <h3>{{item.satis}}</h3>
                                    </div>

                                    <div  v-else class="alis"  style="font-size:40px">
                                        <h3>{{item.alis}}</h3>
                                        <div class="sarrafiye_ad">{{item.kur}}</div>
                                        <h3>{{item.satis}}</h3>
                                    </div>
                                </v-col>
                            </v-row> -->

                            <v-row class="screen-sm" v-if="index < 1" v-for="(item , index) in sarrafiye">
                                <v-col v-if="index < 8"  v-for="(item , index) in sarrafiye"  cols="12" md="6" sm="12" class="last" style="display:flex !important; padding: 10px 10px !important; max-width:100% !important">
                                    <!-- <v-row  v-for="(item , index) in sarrafiye"> -->
                                    <div  class="alis"  >
                                        <h3>{{item.alis}}</h3>
                                        <div class="sarrafiye_ad">{{item.kur}}</div>
                                        <h3>{{item.satis}}</h3>
                                    </div>

                            <!-- </v-row> -->
                                </v-col>
                            </v-row>
<!-- 
                             <v-col  cols="12" md="6" class="last">
                                 
                                <div class="alis"  style="font-size:4   0px">
                                    <h3>{{index}}</h3>
                                    <div class="sarrafiye_ad">{{item.kur}}</div>
                                    <h3>{{item.satis}}</h3>
                                </div> -->
                                
                            <!-- </v-col> -->

                            <!-- <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>2,107.00</h3>
                                    <div class="sarrafiye_ad">YARIM</div>
                                    <h3>2,159.00</h3>
                                </div>
                            </v-col> -->

                         <!-- <v-row v-if="item.index%2!=0"  v-for="(item , index) in sarrafiye">
                             <v-col cols="12" md="6" class="first float-right">
                                <div class="alis"  >
                                    <h3>{{item.alis}}</h3>
                                    <div class="sarrafiye_ad">{{item.kur}}</div>
                                    <h3>{{item.satis}}</h3>
                                </div>
                                
                            </v-col>
                         </v-row> -->

                         <!-- <v-row>
                             <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>4,376.00</h3>
                                    <div class="sarrafiye_ad">ATA</div>
                                    <h3>4,476.00</h3>
                                </div>
                                
                            </v-col>
                            <v-col cols="12" md="6" class="last">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">HAS</div>
                                    <h3>874.28</h3>
                                </div>
                            </v-col>
                         </v-row> -->

                         <!-- <v-row>
                             <v-col cols="12" md="6" class="first">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">22 GRAM</div>
                                    <h3>874.28</h3>
                                </div>
                                
                            </v-col>
                            <v-col cols="12" md="6" class="last">
                                <div class="alis">
                                    <h3>874.28</h3>
                                    <div class="sarrafiye_ad">24 GRAM</div>
                                    <h3>874.28</h3>
                                </div>
                            </v-col>
                         </v-row> -->

                    </div>
                    
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import format from 'date-fns/fp/format/index.js';
export default {
    name: 'Json',

    data:()=>({
        BASE_URL:process.env.VUE_APP_BASE_URL,
        API_URL:process.env.VUE_APP_API_URL,
        currency_json:{
            sarrafiye_json : {},
            doviz_json: {}
        },

        doviz : [],
        sarrafiye : [],

        interval: null,
        time: "--:--:--",
        date : "",
        day : "",
    }),

    methods: {
        get_sarrafiye(){


            return new Promise((resolve,reject)=>{
            var post_config = {
            method: 'get',
            url: this.API_URL + "/provider/api/milyem/",
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
                this.currency_json.sarrafiye_json.forEach(el => {
                        el.alis = this.format_money(el.alis,2,".",",")
                        el.satis = this.format_money(el.satis,2,".",",")
                        // this.sarrafiye.push(el)
                });
                this.sarrafiye = this.currency_json.sarrafiye_json
                // console.log(this.currency_json.sarrafiye_json);
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
                this.currency_json.doviz_json.forEach(el => {
                    if(el.kur != "KGRTRY"){
                        el.alis = this.format_money(el.alis,4,".",",")
                        el.satis = this.format_money(el.satis,4,".",",")
                        this.doviz.push(el)
                    }

                    
                });
                this.doviz = this.currency_json.doviz_json
                console.log(this.doviz);
                this.doviz.splice(0,1)
                // console.log(this.doviz);
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
    },

    mounted(){
        this.get_doviz()
        this.get_sarrafiye()
    },
    created(){



        this.date = Intl.DateTimeFormat("tr-TR", {
            day: 'numeric',
            month: 'long',
            weekday: 'long'
            
        }).format()



        this.interval = setInterval(() => {
        // this.doviz=[]
        // this.sarrafiye=[]

        // this.get_doviz()
        // this.get_sarrafiye()

        

        // Concise way to format time according to system locale.
        // In my case this returns "3:48:00 am"
        // var moment = require('moment-timezone');
        // var date = new Date();
        // this.time = moment(date).tz("Europe/Istanbul").format();

        this.time = Intl.DateTimeFormat("tr-TR", {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone:'Europe/Istanbul'
        }).format()


        

        
        // console.log(this.time);
        }, 1000)
        
    },
    beforeDestroy() {
        // prevent memory leak
        clearInterval(this.interval)
    },
}
</script>

<style >

@font-face {
  font-family: Digital;
  src: url('../../../assets/fonts/digital-7.ttf'); 
}

@media screen and (min-width: 960px) {

    .tabela .header .date{
        font-size: 25px !important;
    }
    .tabela .header .logo img{
        width: 250px !important;
    }
    .tabela .header{
        /* margin-bottom: 3% !important; */
    }

    .doviz .screen-sm{
        display: none;
    }
    .doviz .screen-md {
        margin-top: 20px !important;
    }
    .doviz .screen-md .first{
        font-size: 12px !important;
        height: 100px;
    }
    .doviz .screen-md .middle{
        height: 100px;
    }
    .doviz .screen-md .last{
        font-size: 12px !important;
        height: 100px;
    }
    .doviz .screen-md .first div{
        height: 100%;
    }
    .doviz .screen-md .last div{
        height: 100%;
    }
    .doviz .screen-md .first  h3{
        font-size: 60px !important;
    }
    .doviz .screen-md .last  h2{
        font-size: 60px !important;
    }
    .doviz .screen-md .middle h3 {
        font-size :35px !important
    }
    

}


@media screen and (max-width: 960px) {


   .doviz .screen-md{
       display: none;
   }

   .doviz .screen-sm .last .alis{
       height: 65px !important;
   }
   .doviz .screen-sm .sarrafiye_ad{
       /* height: 65px !important;
       width: 190px;
       max-width: 190px;
       min-width: 190px; */


    font-size: 30px !important;
    background-color: #000 !important;
    color: #fff;
    margin: 0px;
    padding: 5px;
    padding-right: 5px;
    padding-left: 5px;
    margin-top: -40px !important;
    margin-bottom: -40px !important;
    height: 65px !important;
    border: 1px solid #000 !important;
    border-radius: 15px;
    margin-left: 40px;
    margin-right: 40px;
    padding-right: 30px;
    padding-left: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
    width: 190px !important;
    font-family: serif !important;
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
    letter-spacing: 0px !important;
   }

   .doviz .screen-sm .last .alis h3{
       font-size: 30px !important;
       letter-spacing: 3px;
       font-weight: 700;
   }
  .container-fluid{
        background-color: #CD9338;
        height: 100% !important;
    }
    .tabela{
        height: 100% !important;
        padding: 0px 5%;
    }
    .header{
        padding: 10px;
        font-size: 18px;
        display: flex;
        width: 100%;
    }
    .header .date{
        margin-left: auto;
        color: #fff;
        display: flex;
        /* align-items: center !important; */
    }
    .header img{
        width: 200px;
    }
    .main{
        /* text-align: center; */
        display: flex;
        /* padding-left:10%; */
    }
    .sarrafiye{
        /* text-align: center; */
        display: block;
        margin: 20px 5%
        /* padding-left:10%; */
    }
    .doviz{
        /* text-align: center; */
        display: block;
        margin: 0px 5% !important
        /* padding-left:10%; */
    }
    .doviz .row{
        margin-bottom: 10px;
    }
    .main .middle{
        text-align: center !important;
        display: flex;
        width: 100px !important;
    }
    .doviz .middle{
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 45px;
        color: #fff;
        justify-content: center;
        background-color: #000;
        border: solid 1px;
        border-radius: 20px;
        border-color: #000;
    }
    /* .main .first{
        padding-left: 10%;
    }
    
    .main .last{
        padding-left: 10%;
    } */
    .main .first{
        text-align: right !important;
    }
    .doviz .first{
        text-align: right !important;
        padding-top: 0px;
        padding-bottom: 0px;
        
    }
    .doviz .last {
        padding-top: 0px;
        padding-bottom: 0px;
    }
    .main .first .head {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px !important;
        color: #fff;
        justify-content: end;
    }
    .doviz .first div {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 90px;
        color: #000;
        justify-content: center;
        border: 5px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 10px;
        
        border-radius: 20px;
    }

    .sarrafiye .first .alis {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #000;
        justify-content: center;
        border: 3px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 2px !important; 
        border-radius: 20px;
        /* padding :10px 0px !important */
        padding:0px;
        
    }
    .sarrafiye .first .alis h3{
        margin:10px 0px
    }
    .sarrafiye .last .alis h3{
        margin:10px 0px
    }
    .sarrafiye .first .alis .sarrafiye_ad{
        background-color: #000;
        color: #fff;
        margin: 0px;
        padding:5px;
        margin-top: -40px !important;
        margin-bottom: -40px !important; 
        height: 65px !important;
        border: 1px solid #000;
        border-radius: 15px;
        margin-left: 40px;
        margin-right: 40px;
        padding-right: 30px;
        padding-left: 30px;
        display: flex;
        align-items: center !important;
         width: 190px !important;
         min-width: 190px !important;
         max-width: 190px !important;
         justify-content: center !important;
         font-family: serif !important;
         letter-spacing: 0px !important; 
    }
    .sarrafiye .last .alis .sarrafiye_ad{
        background-color: #000;
        color: #fff;
        margin: 0px;
        padding:5px;
        margin-top: -40px !important;
        margin-bottom: -40px !important; 
        height: 65px !important;
        border: 1px solid #000;
        border-radius: 15px;
        margin-left: 40px;
        margin-right: 40px;
        padding-right: 30px;
        padding-left: 30px;
        display: flex;
        align-items: center !important;
         width: 190px !important;
         font-family: serif !important;
         justify-content: center !important;
         letter-spacing: 0px !important;
    }
    .sarrafiye .last .alis {
      width: 100%;
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #000;
        justify-content: center;
        border: 3px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 2px !important; 
        border-radius: 20px;
        /* padding :10px 0px !important */
        padding:0px;
    }

    .main .first h3 {
        margin-left: 20px;
    }
    
    .main .last .head {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px !important;
        color: #fff;
    }
     .doviz .last div {
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 90px;
        color: #000;
        justify-content: center;
        border: 5px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 10px;
        border-radius: 20px;
    }
    .main .last h3 {
        margin-left: 20px;
    }
    .main .middle .v-divider {
        padding:0.5px;
        background-color: #B87D1F;
        margin: 0px auto !important
    }
    .doviz .middle .div {
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 25px;
        color: #fff;
    }

    .doviz .screen-sm .last .alis  h3{
        font-size: 40px !important;
    }


    
}

@media screen and (min-width: 1420px) {
    .sarrafiye .screen-sm{
        display: flex !important;
    }
    .sarrafiye {
        height: 12% !important;
    }
    .sarrafiye .row{
        height: 100% !important;
    }
    .sarrafiye .row .last{
        height: 100% !important;
    }
    .sarrafiye .row .last .alis .sarrafiye_ad{
        height: 100% !important;
    }
    .doviz .screen-md .middle h3 {
        font-size: 45px !important
    }
    .doviz .screen-md .middle{
        height: 100% !important
    }
    .doviz .screen-md .last{
        height: 100% !important
    }
    .doviz .screen-md {
        height: 130px !important;
    }
    .doviz .screen-md .first {
        height: 100% !important;
    }
    .doviz .screen-md h2 {
        font-size: 90px !important
    }
    .doviz .screen-md .first  h2{
        font-size: 120px !important;
    }
    .doviz .screen-md .last  h2{
        font-size: 120px !important;
    }

    .sarrafiye .screen-sm .alis h3{
        font-size:45px !important;
        /* letter-spacing: 10px !important; */
    }

    .main{
        margin-top: 30px !important;
    }

    .main .first .head {
        justify-content: center !important;
        font-size:30px !important;
        margin-left: 100px !important;
    }

    .main .last .head {
        justify-content: center !important;
        font-size:30px !important;
        padding-right: 100px !important;
    }

    .sarrafiye .screen-sm .alis h3{
        font-size: 60px !important;
    }
}


@media screen and (max-width: 1420px) {
    .sarrafiye .screen-sm{
        display: block !important;
    }
    .doviz .screen-md h2 {
        font-size: 65px !important
    }
    /* .sarrafiye .first .alis h3{
        font-size: 23px !important;
    }

    .sarrafiye .first .alis .sarrafiye_ad{
          
        margin-left: 10px !important;
        margin-right: 10px !important;
        min-width: 170px !important;
        text-align: center !important;
        justify-content: center !important;
        
    }
    .sarrafiye .last .alis .sarrafiye_ad{
        
        margin-left: 10px !important;
        margin-right: 10px !important;
        
    }
    .sarrafiye .last .alis h3{
        font-size: 23px !important;
    }

    .sarrafiye .last .alis .sarrafiye_ad{
          
        margin-left: 10px !important;
        margin-right: 10px !important;
        min-width: 170px !important;
        text-align: center !important;
        justify-content: center !important;
        
    } */

    


}


@media screen and (max-width: 1767px) {
.sarrafiye .screen-sm .alis h3{
    font-size:40px !important;
}
}


/* PHONE SIZE */

    @media screen and (max-width: 600px) {
        .main .first .head {
            /* width: 100%; */
            display: block !important;
            /* align-items: center; */
            font-size: 12px !important;
            color: #fff;
            /* justify-content: center !important; */
        }
        .main .middle{
            /* display: none !important; */
        }
        .main .last .head {
            /* width: 100%; */
            /* display: flex !important; */
            /* align-items: center; */
            /* font-size: 15px !important;
            color: #fff; */
            /* justify-content: center !important; */
        }
        .tabela{
            padding: 0px !important
        }
        .header img{
            width: 120px !important;
            
        }
        .header .date{
            margin-left: auto;
            color: #fff;
            display: flex;
            justify-content: end !important;
            /* align-items: center !important; */
            font-size: 10px !important;
        }
        .main .last .head {
            width: 100%;
            display: block !important;
            align-items: center;
            font-size: 12px !important;
            color: #fff;
        }
        .main .last .head h3 {
            margin-left: 0px !important;
            font-size:10px !important;
            justify-content: start !important;
            display: flex;
            margin-left: 9px !important;
            /* margin-right: 10px; */
        }
        .main .first .head h3 {
            margin-left: 0px !important;
            font-size:10px;
            justify-content : end !important;
            margin-right: 8px;
        }
        .doviz .middle{
            width: 50% !important;
            display: flex;
            align-items: center;
            font-size: 30px !important;
            color: #fff;
            justify-content: center;
            background-color: #000;
            border: solid 1px;
            border-radius: 20px;
            border-color: #000;
            margin-left: 25% !important;
            /* padding:10px !important;
            padding-right: 10px !important; */
            padding: 0px !important;
            padding-bottom: 0px !important;
            padding-top: 0px !important;
            
        }
         .doviz .first{
             padding-bottom: 0px !important;
             padding-top: 0px !important;
         }
         .doviz .last{
             padding-bottom: 0px !important;
             padding-top: 0px !important;
         }
         .doviz .screen-md {
             display: none;
         }
         .doviz .screen-sm{
             display: block;
         }
         .doviz .screen-sm .last  .alis {
             border: 3px solid #956518 !important;
            height: 40px !important;
            letter-spacing: 0px !important;
         }
         .doviz .screen-sm .last .alis h3{
             font-size: 20px !important;
             letter-spacing: 3px !important;
             margin: 0px 15px !important;
             
         }
         .doviz .screen-sm .last {
             padding: 0px !important;
             
         }
         .doviz .screen-sm .last .alis .sarrafiye_ad{
             font-size: 18px !important;
             height: 40px !important;
             letter-spacing: 3px !important;
             padding: 5px;
             border-radius: 10px;
             background-color: #000 !important;
             color: #fff;
             border-color : #000 !important;
             font-family: serif;
             margin:0px !important;
             width:100px !important;
             min-width: 100px !important;
             max-width: 100px !important;
             /* margin: 0px 15px !important; */
         }
         .sarrafiye .screen-md {
             display: none;
         }
         .sarrafiye .screen-sm{
             display: block;
         }
         .sarrafiye .screen-sm .last .alis h3{
             font-size: 20px !important;
             letter-spacing: 3px !important;
             margin: 0px 15px !important;
             
         }
         .sarrafiye .screen-sm .last {
             padding: 0px !important;
             
         }
         .sarrafiye{
             margin-left : 5% !important;
             margin-right: 5% !important;
             display: block;
             margin-top : 0px !important
         }
         .sarrafiye .screen-sm .last .alis .sarrafiye_ad{
             font-size: 18px !important;
             /* letter-spacing: 3px !important; */
             padding: 5px;
             border-radius: 10px;
             background-color: #000 !important;
             color: #fff;
             border-color : #000 !important;
             font-family: serif;
             margin:0px !important;
             max-width: 100px !important;
             min-width: 100px !important;
             width: 100px !important;
             /* margin: 0px 15px !important; */
             height: 40px !important;
         }
         .sarrafiye .screen-sm .last .alis .sarrafiye_ad h3{
             font-weight: 700px;
         }
         .doviz .first div {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 50px !important;
            color: #000;
            justify-content: center;
            border: 5px solid #B87D1F;
            border-radius: 20px;
        }
        .doviz .last div {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 50px !important;
            color: #000;
            justify-content: center;
            border: 5px solid #B87D1F;
            border-radius: 20px;
        }
        /* .sarrafiye{
            margin-top: 100px !important;
        } */
        .sarrafiye{
            /* text-align: center; */
            /* display: block; */
            /* margin: 100px 0px !important; */
            /* padding-left:10%; */
        }

        

        .sarrafiye .first .alis .sarrafiye_ad{
            /* background-color: #000;
            font-size:20px !important;
            color: #fff;
            margin: 0px;
            padding:5px;
            margin-top: -40px !important;
            margin-bottom: -40px !important; 
            height: 65px !important;
            border: 1px solid #000;
            border-radius: 15px;
            margin-left: 30px !important;
            margin-right: 30px !important;
            padding-right: 20px !important;
            padding-left: 20px !important;
            display: flex;
            align-items: center !important;
            width: 170px !important; */
        }
        .sarrafiye .last .alis .sarrafiye_ad{
            /* background-color: #000;
            font-size:20px !important;
            color: rgb(167, 141, 141);
            margin: 0px;
            padding:5px;
            margin-top: -40px !important;
            margin-bottom: -40px !important; 
            height: 65px !important;
            border: 1px solid #000;
            border-radius: 15px;
            margin-left: 30px !important;
            margin-right: 30px !important;
            padding-right: 20px !important;
            padding-left: 20px !important;
            display: flex;
            align-items: center !important;
            width: 170px !important; */
        }
    }
    body{
        background-color: #CD9338;
        height: 100vh !important;
        width: 100%;
    }
    
    .container-fluid{
        background-color: #CD9338;
        height: 100% !important;
    }
    .tabela{
        height: 100% !important;
        padding: 0px 5%;
    }
    .header{
        padding: 10px;
        font-size: 18px;
        display: flex;
        width: 100%;
    }
    .header .date{
        margin-left: auto;
        color: #fff;
        display: flex;
        /* align-items: center !important; */
    }
    .header img{
        width: 200px;
    }
    .main{
        /* text-align: center; */
        display: flex;
        /* padding-left:10%; */
    }
    .sarrafiye{
        /* text-align: center; */
        display: block;
        margin: 20px 5%
        /* padding-left:10%; */
    }
    .doviz{
        /* text-align: center; */
        display: block;
        margin: 0px 5% !important
        /* padding-left:10%; */
    }
    .doviz .row{
        margin-bottom: 10px;
    }
    .main .middle{
        text-align: center !important;
        display: flex;
        width: 100px !important;
    }
    .doviz .middle{
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 45px;
        color: #fff;
        justify-content: center;
        background-color: #000;
        border: solid 1px;
        border-radius: 20px;
        border-color: #000;
    }
    /* .main .first{
        padding-left: 10%;
    }
    
    .main .last{
        padding-left: 10%;
    } */
    .main .first{
        text-align: right !important;
    }
    .doviz .first{
        text-align: right !important;
        padding-top: 0px;
        padding-bottom: 0px;
        
    }
    .doviz .last {
        padding-top: 0px;
        padding-bottom: 0px;
    }
    .main .first .head {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #fff;
        justify-content: end;
    }
    .doviz .first div {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 90px;
        color: #000;
        justify-content: center;
        border: 5px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 10px;
        
        border-radius: 20px;
    }

    .sarrafiye .first .alis {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #000;
        justify-content: center;
        border: 3px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 2px !important; 
        border-radius: 20px;
        /* padding :10px 0px !important */
        padding:0px;
        
    }
    .sarrafiye .first .alis h3{
        margin:10px 0px
    }
    .sarrafiye .last .alis h3{
        margin:10px 0px
    }
    .sarrafiye .first .alis .sarrafiye_ad{
        background-color: #000;
        color: #fff;
        margin: 0px;
        padding:5px;
        margin-top: -40px !important;
        margin-bottom: -40px !important; 
        height: 65px !important;
        border: 1px solid #000;
        border-radius: 15px;
        margin-left: 40px;
        margin-right: 40px;
        padding-right: 30px;
        padding-left: 30px;
        display: flex;
        align-items: center !important;
         width: 190px !important;
         justify-content: center !important;
         font-family: serif !important;
         letter-spacing: 0px !important; 
    }
    .sarrafiye .last .alis .sarrafiye_ad{
        background-color: #000;
        color: #fff;
        margin: 0px;
        padding:5px;
        margin-top: -40px !important;
        margin-bottom: -40px !important; 
        height: 65px !important;
        border: 1px solid #000;
        border-radius: 15px;
        margin-left: 40px;
        margin-right: 40px;
        padding-right: 30px;
        padding-left: 30px;
        display: flex;
        align-items: center !important;
         width: 190px !important;
         font-family: serif !important;
         justify-content: center !important;
         letter-spacing: 0px !important;
    }
    .sarrafiye .last .alis {
      width: 100%;
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #000;
        justify-content: center;
        border: 3px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 2px !important; 
        border-radius: 20px;
        /* padding :10px 0px !important */
        padding:0px;
    }

    .main .first h3 {
        margin-left: 20px;
    }
    
    .main .last .head {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 25px;
        color: #fff;
    }
     .doviz .last div {
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 90px;
        color: #000;
        justify-content: center;
        border: 5px solid #956518 !important;
        background-color: #B87D1F !important;
        font-family: Digital;
        letter-spacing: 10px;
        border-radius: 20px;
    }
    .main .last h3 {
        margin-left: 20px;
    }
    .main .middle .v-divider {
        padding:0.5px;
        background-color: #B87D1F;
        margin: 0px auto !important
    }
    .doviz .middle .div {
       width: 100%;
        display: flex;
        align-items: center;
        font-size: 25px;
        color: #fff;
    }
</style>