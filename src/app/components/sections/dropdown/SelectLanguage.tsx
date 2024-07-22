"use client"

import { getHead } from '@/app/data/head'
import { Select } from '@mui/material'
import { useRouter } from 'next/router'
import { Dropdown } from '@/components/index'
import { Helpers } from '@/app/utils'

export default function SelectLanguage(props: {
  float?: boolean
}) {
  const {
    float
  } = props

  const mainClassName = 'section-dropdown-select-language'

  const router = useRouter()
  
  const lang = Helpers.getCurrentLanguage()
  
  const listLang = getHead({ name: 'headLanguage' })

  return (
    <>
      <Dropdown
        data={listLang}
        defaultValue={lang}
        handleChange={(id: any) => {
          router.push(
            router.asPath,
            router.asPath,
            { locale: id}
          )
        }}
        className={mainClassName + ' ' + (float ? 'float' : '')}

      />
      
    </>
  )
}
