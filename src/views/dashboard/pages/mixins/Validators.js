import { ValidationObserver, ValidationProvider, extend, localize,Validator } from 'vee-validate';

// validation lib

import en from 'vee-validate/dist/locale/en.json'
import tr from 'vee-validate/dist/locale/tr.json'

import * as rules from 'vee-validate/dist/rules';

export const ValidatorsMixin = {

  components:
  {
    ValidationProvider,
    ValidationObserver
  },

  data: () => ({
    validate_phone:"",
    validate_socket:"",
    validate_timer: "",

  }),


  methods: {

    ////////////////////////////////////////////////
    register_validate_phone(){
      extend("validate_phone",{
        message: "error phone is not valid ",
        validate: value =>{

          const regex = /^\+[0-9/+-/(/) ]*$/m;
          let m;

          if ((m = regex.exec(value)) !== null) {
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
              });
              return true
          }
          else
          {
            return false
          }

        }
      })
    },
    ////////////////////////////////////////////////

    //port and ip needs more work here to avoid any characters
    register_validate_socket(){
      extend("validate_socket",{
        message: "error socket is not valid ",
        validate: value =>{

          const regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:([0-9]+)/gm;
          let m;

          let match_found = false
          while ((m = regex.exec(value)) !== null)
          {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }

              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);

                // console.log("register_validate_socket -> groupIndex", groupIndex)
                // console.log("register_validate_socket -> match", parseInt(match))

                match_found = true

                let port_num = parseInt(match)
                if((groupIndex == 1)  && ((port_num < 1) || (port_num > 65535)) )
                {
                  match_found = false
                }


              });
            }

            //avoid any character
            const regex2 = /[a-zA-Z!@#$%^&*()_+*/-/?></|/{}"]+/gm;
            let m2;

          while ((m2 = regex2.exec(value)) !== null)
          {
            // This is necessary to avoid infinite loops with zero-width matches
              if (m2.index === regex2.lastIndex) {
                  regex2.lastIndex++;
              }

              // The result can be accessed through the `m`-variable.
              m2.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                  match_found = false // found character that we dont want
                });
          }

          console.log("register_validate_socket -> match_found", match_found)
          return match_found


        }
      })
    },

    ////////////////////////////////////////////////
    register_validate_timer(){
      extend("validate_timer",{
        message: "error timer is not valid ",
        validate: value =>{

          let t = parseInt(value)
          console.log("timer:" + t);
          let timer_flag = true
          if(t < 1 || t > 60)
          {
            timer_flag = false
          }

          return timer_flag

        }
      })
    },
    ////////////////////////////////////////////////

    register_validate_latitude(){
      extend("validate_latitude",{
        message: "latitude is not valid ",
        validate: value =>{

          let latitude_value = parseInt(value)

          let latitude_flag = true
          if(latitude_value < -90 || latitude_value > 90)
          {
            latitude_flag = false
          }

          //check for characters
          const regex2 = /[a-zA-Z!@#$%^&*()_+*/-/?></|/{}"]+/gm;
          let m2;

          while ((m2 = regex2.exec(value)) !== null)
          {
            // This is necessary to avoid infinite loops with zero-width matches
              if (m2.index === regex2.lastIndex) {
                  regex2.lastIndex++;
              }

              m2.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                latitude_flag = false // found character that we dont want

                });
          }

          return latitude_flag

        }
      })

    },

    //////////////////////////////////////////////


    register_validate_longitude(){
      extend("validate_longitude",{
        message: "longitude is not valid ",
        validate: value =>{

          let longitude_value = parseInt(value)

          let longitude_flag = true
          if(longitude_value < -180 || longitude_value > 180)
          {
            longitude_flag = false
          }

          //check for characters
          const regex2 = /[a-zA-Z!@#$%^&*()_+*/-/?></|/{}"]+/gm;
          let m2;

          while ((m2 = regex2.exec(value)) !== null)
          {
            // This is necessary to avoid infinite loops with zero-width matches
              if (m2.index === regex2.lastIndex) {
                  regex2.lastIndex++;
              }

              m2.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                longitude_flag = false // found character that we dont want

                });
          }

          return longitude_flag

        }
      })

    }

    //////////////////////////////////////////////


  },

  created()
  {

  },

  mounted()
  {

  },

}
















