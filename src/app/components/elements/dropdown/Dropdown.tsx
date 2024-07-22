"use client"
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { locale } from '@/app/data/head';

export default function Dropdown(props: {
  sortOption?: any;
  id?: any;
  data?: any;
  placeholder?: any;
  defaultValue?: any;
  value?: any;
  handleChange?: any;
  name?: any;
  disabled?: boolean;
  className?: string;
}) {
  const {
    id,
    data,
    placeholder,
    defaultValue,
    value,
    handleChange,
    name,
    disabled,
    className,
  } = props

  const mainClassName = 'element-dropdown'



  const handleEvent = (event: any) => {

    if (handleChange) {
      const val = event.target.value
      handleChange(val, event)
    }

  }

  return (

    <div className={
      mainClassName
      + ' ' + (disabled ? 'disabled' : '')
      + ' ' + (className || '')
    }>
      <FormControl className='mui-form-control'>
        <Select
          defaultValue={defaultValue}
          value={value}
          onChange={handleEvent}
          displayEmpty
          name={name}
          disabled={disabled}
        >
          {
            placeholder &&
            <MenuItem value="" disabled className='placeholder'>
              {placeholder}
            </MenuItem>
          }
          {
            data &&
            data.length > 0 &&
            data.map((item: { id: any; label: string | TrustedHTML; name: string | TrustedHTML; }, index: string) => {
              return (
                <MenuItem
                  key={'dropdown-' + index}
                  value={item.id ? item.id : item.label ? item.label : item.name}
                >
                  <div dangerouslySetInnerHTML={{ __html: locale({label: item.label ? item.label : item.name}) }} />

                </MenuItem>

              )
            }
            )
          }
        </Select>
      </FormControl>
    </div>
  );
}
