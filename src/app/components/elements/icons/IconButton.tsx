"use client"
import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import { IconCustom } from '.';
import classnames from 'classnames'
import { LinkWrapper } from '@/components/index';


function index(props: {
  theme?: string;
  handleClick?: any;
  value?: any;
  size?: any;
  disabled?: boolean;
  icon?: any;
  className?: string;
  href?: any;
  label?: any;
  color?: string;
}) {
  const {
    theme,
    handleClick,
    value,
    size,
    disabled,
    icon,
    className,
    href,
    label,
    color,
  } = props

  const mainClassName = classnames(
    'elements-icon-button',
    (color ? 'color-' + color : ''),
    (label ? 'use-label' : ''),
    (className ? className : ''),
    (size ? 'size-' + size : ''),
    (disabled ? 'disabled' : ''),
  )

  return (
    <LinkWrapper
      className={mainClassName}
      href={href}
      handleClick={(event: { preventDefault: () => void; }) => {


        if (!href && handleClick) {

          event?.preventDefault()

          handleClick({
            target: {
              value: value
            },
            event,
          })

        }


      }}
    >
      <IconButton
        value={value || ''}
        size={size}
        disabled={disabled}
      >
        <IconCustom
          size={size}
          color={color}
          {...(
            icon?.constructor?.name == 'Object'
              ?
              icon
              :
              { icon: icon } // ==> if string
          )}
        />
        {
          label &&
          <p className={'label'}>{label}</p>
        }
      </IconButton>
    </LinkWrapper>
  );
}

export default index;