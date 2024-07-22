"use client"
import React from 'react';
import Modal from '@mui/material/Modal';
import ModalConfirm from './ModalConfirm';
import { Stack, Typography } from '@mui/material';
import { locale } from '@/app/data/head';
import { IconButton, Skeleton } from '@/components/elements';

type TProps = {
  children: any;
  isOpen: any;
  handleClose?: any;
  onRendered?: any;
  className?: any;
  confirmClose?: any;
  preventClose?: any;
  title?: any;
}

export default function ModalScreen(props: TProps) {

  const {
    children,
    isOpen,
    handleClose,
    onRendered,
    className,
    confirmClose,
    preventClose,
    title,
  } = props

  const [open, setOpen] = React.useState(Boolean(isOpen))
  const [openModalConfirm, setOpenModalConfirm] = React.useState(false)

  const onClose = (type: string) => {

    if (!preventClose) {


      if (type == 'modal-confirm-done') {

        setOpen(false)
        setOpenModalConfirm(false)
        if (handleClose) handleClose()

      }
      else if (confirmClose) {

        setOpenModalConfirm(true)

      }
      else {

        setOpen(false)
        if (handleClose) handleClose()


      }

    }

  }

  React.useEffect(() => {

    setOpen(Boolean(isOpen))

  }, [isOpen])

  const mainClassName = 'modules-modal-screen'

  return (
    <>
      <Modal
        className={mainClassName + ' ' + (className || '')}
        open={open}
        onClose={onClose}
      >

        <div className={mainClassName + '-content ' + (title ? 'use-title' : '')}>

          {
            title &&
            <Stack className={mainClassName + '-content-header'}
              sx={{
              }}
            >

              <Typography variant='h5' component='h3' className='text-title'>
                {
                  locale({ label: title }) || <Skeleton />
                }
              </Typography>

              <IconButton
                icon='close'
                handleClick={onClose}
              />


            </Stack>
          }

          {children}

          {
            confirmClose &&
            <ModalConfirm
              isOpen={openModalConfirm}
              headType='leave'
              handleClose={() => setOpenModalConfirm(false)}
              handleAccept={() => onClose('modal-confirm-done')}
            />
          }

        </div>

      </Modal>
    </>
  );
}
