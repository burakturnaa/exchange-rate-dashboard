export const CommonMixin = {

  beforeMount(){

    //this.localStorage.token = this.$route.query.t
  },

  data() {
    return {
      API_URL:process.env.VUE_APP_API_URL,
      BASE_URL:process.env.VUE_APP_BASE_URL,
      token_ticker : {},
    };
  },


  mounted() {
    //this.localStorage.token = this.$route.query.t
    if(localStorage.token == "" || localStorage.token == "undefined"){
      localStorage.token = "";
      this.$router.push({path: '/user/login'});
    }
    this.check_token()

    //check token every 5 mins
    
    this.auto_check_tocken(300000)
    
  },

  destroyed(){
    console.log("clearing token_ticker");

    clearInterval(this.token_ticker);
  },

  computed: {
    _T() { return localStorage.token }, // for i18 ;)
    token() { return localStorage.token }
  }, 

  methods: {
    // ----------------------------check_token------------------------------------------------
    
    auto_check_tocken(tick)
    {
      this.token_ticker = setInterval(() => {
        this.check_token()
      }, tick);
    },
    
    check_token(){
      
      return new Promise((resolve,reject) =>{
        
        let formData = {};
        formData.token = localStorage.token;
        // start axios
        var post_config =
        {
          method: 'post',
          url:  this.API_URL+"/customer/check_token",
          headers: {
            'Content-Type': 'application/json'
          },
          data : formData
        };

        this.axios(post_config)
        .then(response => {
          if(response.data == undefined)   reject("no response")
          if (response.status === 401)
          {
            //invalid token
            console.log("check_token 200  -> invalid token")
            localStorage.token = "";
            window.location.href = this.BASE_URL + "/user/login"
            reject("invalid_token")
          }
          resolve(response.data)
        })
        .catch( e =>
          {
            console.log("horor:" + e);
            localStorage.token = "";
            window.location.href = this.BASE_URL + "/user/login"
            reject("invalid_token")
          });
      });

    }, 

  } 
}
