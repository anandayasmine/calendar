// == Will Set Temporary Data for Session Storage ==
// == Option For Only Specific Page Or For Passing Data to Other Page ==

import _ from 'lodash'

const main = {
  dataName: 'tempData',

  getCurrentItemName: (name: string) => {

    try {

      return main.dataName + '' + name

    }
    catch (err) {

      return name

    }

  },

  setDataMain: (data: any) => {

    try {

      sessionStorage.setItem(main.dataName, JSON.stringify(data))

    }
    catch (err) {


    }

  },

  getDataMain: () => {

    try {

      const data = sessionStorage?.getItem(main.dataName)

      return JSON.parse(data||"{}")

    }
    catch (err) {

      return null

    }

  },

  getData: (name: string | number, isFullData?: any) => {

    try {

      if (name) {

        const dataMain = main.getDataMain()

        if (dataMain) {

          if (isFullData) {

            return dataMain[name]

          }
          else {

            return dataMain[name]?.data

          }
        }

      }


    }
    catch (err) {

      return null

    }

  },

  setData: (params: { name?: any; type?: string; data?: any; pathname?: any; asPath?: any }) => {

    // => params = name , data, type 
    // =>  type ex: 'session' (on entire session)  
    // || 'pathname'  (on specific page via pathname) 
    // || 'asPath'
    // || 'session' (will keep data for the entire session)

    try {

      if (params?.name) { //=> required

        const type = params?.type || 'session'

        const router = require('next/router').default

        const refactorJSON = {
          ...(main.getDataMain() || {}),
          [params?.name]: {
            data: params?.data,
            pathname: params?.pathname || router.pathname,
            asPath: params?.asPath || router.asPath,
            type: type
          },
        }

        sessionStorage.setItem(main.dataName, JSON.stringify(refactorJSON))

      }

    }
    catch (err) {


    }

  },

  init: () => {

    try {

      const dataMain = main.getDataMain()

      if (dataMain) {

        const refactorDataMain = { ...(dataMain || {}) }

        const Router = require('next/router')?.default

        _.forEach(dataMain, (val, key) => {

          if (val.type == 'pathname' && val.pathname != Router?.pathname) {
            //=> remove temp data for specific page (type: page) 
            // => on slug usually keep the id (ex: /detail/[id])

            delete refactorDataMain[key]

          }
          else if (val.type == 'asPath' && val.asPath != Router?.asPath) {
            //=> remove temp data for specific page (type: page) 
            // => on slug it will show the id & query (ex: /detail/100&query1=123)

            delete refactorDataMain[key]

          }

        })

        main.setDataMain(refactorDataMain)

      }

    }
    catch (err) {


    }

  },

  removeData: (name: string) => {

    try {

      const dataMain = main.getDataMain()

      if (dataMain && name) {

        const refactorDataMain = { ...(dataMain || {}) }

        _.forEach(dataMain, (val, key) => {

          if (key == name) {

            delete refactorDataMain[key]

          }

        })

        main.setDataMain(refactorDataMain)



      }

    }
    catch (err) {


    }

  }

}

export default main;
