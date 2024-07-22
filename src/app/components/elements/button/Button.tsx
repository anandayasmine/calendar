"use client"
import React from 'react'
import { Button, CircularProgress } from '@mui/material'
import { IconCustom } from '..'
import { Helpers } from '@/app/utils'
import { getHead, locale } from '@/app/data/head'
import classnames from 'classnames'
import _ from 'lodash'
import Router from 'next/router'


export default function CustomButton(props: {
  href?: any;
  to?: any;
  type?: string;
  target?: any;
  value?: any;
  theme?: any;
  disabled?: any;
  label?: any;
  size?: any;
  headType?: any;
  startIcon?: any;
  endIcon?: any;
  id?: any;
  children?: any;
  buttonNumber?: any;
  loading?: any;
  variant?: any;
  className?: any;
  handleClick?: any
}) {

  const mainClassName = 'element-button'

  let {
    href,
    to,
    target,
    value,
    theme,
    disabled,
    label,
    size,
    headType,
    startIcon,
    endIcon,
    id,
    children,
    buttonNumber,
    loading,
    variant,
    className,
    handleClick,
    type,
  } = props

  const isLoadingButton = _.has(props, 'loading') && loading

  if (headType) {

    try {

      const head = getHead({ name: 'headButton' })[headType]

      if (head) {

        label = locale({ label: head.label })
        size = head.size
        startIcon = head.startIcon
        endIcon = head.endIcon
        disabled = disabled || head.disabled
        target = head.target
        to = head.to
        href = href || head.href

        theme = head.theme + ' ' + (theme || '')

      }
    }
    catch (err) {
      
      console.log("🚀 ~ file: Button.tsx ~ line 81 ~ err", err)

    }
  }

  const refactorClassName = classnames(
    mainClassName,
    (theme || ''),
    (size ? 'size-' + size : ''),
    (className || ''),
    (disabled ? 'disabled' : ''),
  )
  return (
    <Button
      variant={variant || ''}
      value={(value ? value : '')}
      className={refactorClassName}
      disabled={disabled}
      onClick={href ? () => Router.push(href) : handleClick}
      startIcon={
        (startIcon || buttonNumber) &&
        <>
          {
            (startIcon) &&
            <IconCustom {...(typeof startIcon == 'string' ? { icon: startIcon } : startIcon)} />

          }
        </>
      }
      endIcon={
        <>
          {
            (endIcon || isLoadingButton) &&
            <>
              {
                (endIcon && !loading) ?
                  <IconCustom {...(typeof endIcon == 'string' ? { icon: endIcon } : endIcon)} />
                  :
                  loading ?
                    <CircularProgress
                      className='mui-circular-progress'
                    />
                    :
                    <></>
              }
            </>
          }
        </>
      }
    >
      <span className={mainClassName + '-label'}>
        {locale({ label }) || children || ''}
      </span>
    </Button>
  )
}