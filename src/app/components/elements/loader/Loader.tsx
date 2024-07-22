"use client"
import React from 'react'
import { CircularProgress,  } from '@mui/material'
import { getHead, locale } from '@/app/data/head'
import { ModalScreen } from '..';

export default function Loader(props: { isOpen: any;}) {

  try {

    if (typeof window != 'undefined') {

      const {
        isOpen,
      } = props


      const mainClassName = 'elements-custom-loader'
      const label = locale({key: 'pleaseWait'})

      return (
        <ModalScreen
          isOpen={isOpen}
          className={mainClassName}
          preventClose={true}
        >
          <div className={mainClassName + '-content'}>

            <div className={mainClassName + '-content-wrap-title'}>
              {label}
            </div>

            <div className={mainClassName + '-content-wrap-loader'}>
              <CircularProgress
              />
            </div>

          </div>
        </ModalScreen>

      )

    }
    else {
      return null
    }

  }
  catch (err) {

    console.log("🚀 ~ file: Loader.jsx ~ line 46 ~ Loader ~ err", err)
    return null

  }


}
