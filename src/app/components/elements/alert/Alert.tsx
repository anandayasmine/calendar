"use client"
import React from 'react';
import Router from 'next/router'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { getHead } from '@/app/data/head';


export default function TransitionAlerts(props:any) {

  const [isOpen, setIsOpen] = React.useState(false)

  let {
    message,
    type,
    theme,
    disableClose,
    disableTitle,
    customTitle,
    headType,
    useHiddenElement,
  } = props

  const [head, setHead]:any = React.useState()

  const headTitle = {
    id: {
      error: 'Error',
      warning: 'Peringatan',
      info: 'Informasi',
      success: 'Sukses',
    },
    en: {
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
      success: 'Success',
    },
  }

  let title = Router.router && Router.router.locale == 'id' ? headTitle.id : headTitle.en


  if (headType) {

    if (head) {

      type = head.type
      title = title || head.title
      message = head.message
      disableTitle = head.disableTitle

    }

  }

  const handleClose = () => {

    if (props.handleClose) {
      props.handleClose()
    }

    setIsOpen(false)

  }

  React.useEffect(() => {

    try {

      if (props?.isOpen != isOpen) {

        setIsOpen(props?.isOpen)

      }

    }
    catch (err) {

      console.log("🚀 ~ file: Alert.jsx ~ line 80 ~ React.useEffect ~ err", err)

    }


  }, [props.isOpen, isOpen]);

  React.useEffect(() => {

    try {

      const dataHead = getHead({ name: 'headAlert' })[headType]

      setHead(dataHead)

    }
    catch (err) {

      console.log("🚀 ~ file: Alert.jsx ~ line 104 ~ React.useEffect ~ err", err)
    }


  }, [headType]);

  const element = (
    <Collapse
      in={isOpen}
      className={
        ' elements-alert ' + (theme || '') + ' ' + (isOpen ? 'open' : '')
      }
    >

      <Alert
        severity={type || 'info'}
        action={
          !disableClose &&
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {
          !disableTitle &&
          (
            Boolean(customTitle) ?
              <AlertTitle>{customTitle}</AlertTitle>
              :
              <AlertTitle>{title[(type || 'info') as keyof object]}</AlertTitle>
          )
        }
        {
          Boolean(message) &&
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
        }
      </Alert>
    </Collapse>
  )

  return (
    <>
      {
        useHiddenElement ?
          isOpen ?
            element
            :
            <></>
          :
          element

      }

    </>
  );
}
