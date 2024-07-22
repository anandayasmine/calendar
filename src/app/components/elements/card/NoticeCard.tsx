"use client"
import React, { Component } from 'react'
import Router from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import {
  Button, IconCustom
} from '@/components/elements'


import {
  getHead,
} from '@/app/data/head'
import Image from 'next/image';
import { locale } from '@/app/data/head';
import { Config } from '@/app/constant';


export default function useNoticeCard(props: {
  image?: any;
  theme?: any;
  title?: any;
  message?: any;
  useButton?: any;
  headType?: any;
  icon?: any;
  imageSrc?: any;
}) {

  let {
    title,
    message,
    theme,
    useButton, // ==> see headNoticeCard
    headType,
    icon,
    imageSrc
  } = props

  const [head, setHead] = React.useState<{
    title: string;
    message?: string;
    theme?: string;
    useButton?: boolean;
    icon?: any;
    image?: any;
    imageSrc?: any;
  }>()



  const images = {
    "ImageAccessDenied": <Image src={require('@/images/illustration/illustration-access-denied.svg')} alt={Config.appName + ' Image Access Denied'} />,
    "ImageDataNotFound": <Image src={require('@/images/illustration/illustration-no-data.svg')} alt={Config.appName + ' Image Data Not Found'} />,
    "ImageUnderConstruction": <Image src={require('@/images/illustration/illustration-under-construction.svg')} alt={Config.appName + ' Image Under Construction'} />,
    "ImageDashboard": <Image src={require('@/images/illustration/illustration-table.svg')} alt={Config.appName + ' Image Dashboard'} />,
    "ImageFiles": <Image src={require('@/images/illustration/illustration-files.svg')} alt={Config.appName + ' Image Files'} />,
    "ImageNotFound": <Image src={require('@/images/illustration/illustration-page-not-found.svg')} alt={Config.appName + ' Page Not Found'} />,
    "IconRedX": <Image src={require('@/images/icon/icon-alert-red.png')} alt={Config.appName + ' Icon Red Hazard'} />,
  }

  let refactorImage:any = images[props.image as keyof object]

  if (headType && head) {

    title = head.title
    message = head.message
    theme = head.theme + ' ' + (props.theme || '')
    useButton = head.useButton || useButton
    icon = head.icon
    refactorImage = head?.imageSrc ? <Image src={head?.imageSrc} alt={Config.appName + ' Illustration Notice Card'}/> : images[head.image as keyof object] 
    
  }




  React.useEffect(() => {

    try {

      const newHead = headType && getHead({ name: 'headNoticeCard' }) && getHead({ name: 'headNoticeCard' })[headType as keyof object]

      setHead(newHead)

    }
    catch (err) {

      console.log("🚀 ~ file: NoticeCard.jsx ~ line 70 ~ React.useEffect ~ err", err)

    }

  }, [headType])


  return (
    <div className={'element-notice-card ' + (theme || '') + ' ' + (refactorImage ? 'with-image' : '')}>
      <Card>
        <CardContent>
          {
            refactorImage &&
            <div className='wrap-image'>
              {refactorImage}
            </div>
          }
          {
            icon &&
            <IconCustom
              {...(icon || {})}
            />
          }
          <div className='wrap-text'>
            <Typography className='text-1' gutterBottom>
              {locale({ label: title })}
            </Typography>
            {
              message && (locale({ label: message }) !== '') &&
              <Typography className='text-2' variant="body2">
                {locale({ label: message })}
              </Typography>
            }
          </div>
          {
            useButton &&
            useButton.length > 0 &&
            <div className='wrap-button'>
              {
                useButton.map((item: any, index: string) =>
                  <Button
                    key={'notice-card-use-button-' + index}
                    {...(item || {})}
                  />
                )
              }
            </div>

          }

        </CardContent>
      </Card>
    </div>
  )
}

