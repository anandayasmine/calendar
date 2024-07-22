"use client"
import React from 'react'
import Router from 'next/router'



import {
  Button,
  IconButton,
  IconCustom,
  ImageHandler,
  ModalScreen,
} from '@/components/index'


import {
  getHead, locale
} from '@/app/data/head'
import Image from 'next/image'



function DialogConfirm(props: {
  type?: any;
  head?: any;
  handleConfirm?: any;
  handleAccept?: any;
  handleDecline?: any;
  message?: any
}) {


  const {
    head,
    handleConfirm,
    handleAccept,
    handleDecline,
    message,
  } = props




  const mainClassName = 'modules-modal-confirm'

  const type: string = props.type || 'confirm'

  const labels = getHead({
    name: 'headLabel'
  })


  if (message) {

    head['message'] = message

  }



  return (
    <div className={mainClassName}>
      {

        head

        &&

        <div className={mainClassName + '-content'}>

          {
            (
              (head.showCloseButton)
            ) &&
            <div className={mainClassName + '-close-button '}>

              <IconButton
                icon={{
                  name: 'close',
                  type: 'mui'
                }}
                handleClick={handleDecline}
              />

            </div>
          }


          <div className={mainClassName + '-icon ' + (head?.iconSize || '')}>

            {
              head?.image ?
                <ImageHandler
                  className={mainClassName + '-icon-image'}
                  src={head?.image}
                />
                :
                head?.icon &&
                <IconCustom
                  name={head?.icon?.name || head?.icon}
                  size={head?.icon?.size || 'large'}
                />
            }

          </div>


          {
            head.label
            &&
            <p className={mainClassName + '-title'}>{locale({label:head.label})}</p>
          }

          {

            head.explanation
            &&
            <p className={mainClassName + '-explanation'}>{locale({label:head.explanation})}</p>

          }

          {
            head.message
            &&
            <p className={mainClassName + '-message'} dangerouslySetInnerHTML={{ __html: locale({label:head.message}) }}></p>
          }


          <div className={mainClassName + '-button'}>
            {
              {
                'confirm':
                  <>
                    <Button
                      handleClick={handleAccept}
                      headType='confirmAccepted'
                    />
                    <Button
                      handleClick={handleDecline}
                      headType='confirmDecline'
                    />

                  </>
                ,
                'feedback':

                  <Button
                    handleClick={handleConfirm}
                    label={head?.button?.label || locale({key: 'close'})}
                    href={head?.button?.href}
                  />

              }[type || '']
            }
          </div>

        </div>
      }
    </div>
  )
}



export default function ModalConfirm(props: {
  type?: any;
  head?: any;
  isOpen?: any;
  handleAccept?: any;
  handleDecline?: any;
  handleConfirm?: any;
  handleClose?: any;
  headType?: any;
  preventCloseBackdrop?: any;
  strictOnClose?: any;
  message?: any
}) {

  const {
    isOpen,
    handleAccept,
    handleDecline,
    handleConfirm,
    handleClose,
    headType,
    preventCloseBackdrop,
    strictOnClose,
    message,
  } = props


  const type = props.type || 'confirm' // ==> Confirm (With button Accept & Decline) || Feedback (With Single Confirm Button)

  const [open, setOpen] = React.useState(isOpen || false)
  const [head, setHead] = React.useState(props.head)



  const closeModal = () => {

    if (!strictOnClose) {

      setOpen(false)

    }

    if (handleDecline) {

      handleDecline()

    }

    if (handleClose) {

      handleClose()

    }

  }



  const acceptConfirm = () => {


    if (handleAccept) {
      handleAccept()
    }
    else if (handleConfirm) {
      handleConfirm()
    }

    closeModal()

  }


  React.useEffect(() => {

    if (isOpen != open) {

      setOpen(isOpen)

    }

  }, [isOpen, open])


  React.useEffect(() => {


    if (headType) {

      const newHead = headType && getHead({ name: 'headModalConfirm' }) && getHead({ name: 'headModalConfirm' })[headType as keyof object]
      setHead(newHead)


    }


  }, [headType])

  React.useEffect(() => {


    if ((JSON.stringify(head) != JSON.stringify(props.head)) && props.head) {
      setHead(props.head)
    }

  }, [props.head, head])



  return (
    <ModalScreen
      isOpen={open}
      handleClose={!preventCloseBackdrop && closeModal}
    >

      <DialogConfirm
        type={head?.type || type}
        head={head}
        handleConfirm={acceptConfirm}
        handleAccept={acceptConfirm}
        handleDecline={closeModal}
        message={message}
      />

    </ModalScreen>
  )
}

