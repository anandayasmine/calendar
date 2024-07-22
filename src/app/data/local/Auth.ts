import { Config } from '@/app/constant'
import Cookies from 'js-cookie'

const Auth = {

  isAuthenticated: () => {

    try {

      return true

    }
    catch (err) {

      console.log("🚀 ~ file: Auth.js ~ isAuthenticated line 22 ~ err", err)

    }

  },

  logout: () => {

    try {


    }
    catch (err) {

      console.log("🚀 ~ file: Auth.js ~ logout line 60 ~ err", err)

    }

  },

  getDataUser: () => {

    try {


    }
    catch (err) {

      console.log("🚀 ~ file: Auth.js ~ getDataUser line 60 ~ err", err)

    }

  },

  getToken: () => {

    try {


    }
    catch (err) {

      console.log("🚀 ~ file: Auth.js ~ getToken line 60 ~ err", err)

    }

  },


}

export default Auth