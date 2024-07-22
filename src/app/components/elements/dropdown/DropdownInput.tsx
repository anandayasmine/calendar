"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { Checkbox, Chip, Stack } from '@mui/material'
import { Helpers } from '@/app/utils'
import { locale } from '@/app/data/head'

export default function Asynchronous(props: {
  id?: any;
  name?: any;
  data?: any;
  label?: any;
  placeholder?: any;
  multiple?: any;
  value?: any;
  onChange?: any;
  error?: any;
  helperText?: any;
  disabled?: any;
  getData?: any;
  loading?: any;
  freeSolo?: any;
  directFetch?: any;
  required?: any
}) {


  const {
    id,
    name,
    data,
    label,
    placeholder,
    multiple,
    value,
    onChange,
    error,
    helperText,
    disabled,
    loading,
    freeSolo,
    directFetch,
    required,
  } = props

  const limitTags = 3

  const mainClassName = 'element-dropdown-input'
  const [stateValue, setStateValue]: any = React.useState('')
  const [selectAll, setSelectAll] = React.useState(false)

  const [open, setOpen] = React.useState(false)
  const [showLoader, setShowLoader] = React.useState(false)

  const [options, setOptions] = React.useState([])




  const handleSelectAll = (e: any) => {
    const newVal = !selectAll

    setSelectAll(newVal)

    if (newVal) {
      setStateValue(options)
    }
    else {
      setStateValue([])
    }

  }

  const handleChange = async (event: any, value: React.SetStateAction<string>) => {

    setStateValue(value)

    if (onChange) {
      await onChange(value)
    }

  }





  React.useEffect(() => {

    setShowLoader(loading ? true : false)

  }, [loading])




  React.useEffect(() => {

    setShowLoader(true)

    if (!directFetch) {

      if (data?.length > 0) {

        if (multiple) {

          const foundValue: any = data?.filter((item: { id: any }) => value?.includes(item?.id))

          setStateValue(foundValue || [])

        }
        else {

          const foundValue = data?.find((item: { id: any }) => item.id == value)

          setStateValue(foundValue || '')

        }

      }
      else {

        setStateValue(multiple ? [] : '')

      }
      setOptions(data || [])

    }

    setShowLoader(false)

  }, [data, multiple, value, directFetch])



  React.useEffect(() => {

    if (open && options.length === 0) {


      if (props.getData && directFetch) {

        (async () => {

          setShowLoader(true)

          const response = await props.getData()

          if (response?.length > 0) {
            setOptions(response)
          }

          setShowLoader(false)

        }
        )()
      }

      if (data?.length > 0) {

        if (multiple) {

          const foundValue: any = data?.filter((item: { id: any }) => value?.includes(item?.id))

          setStateValue(foundValue || [])

        }
        else {

          const foundValue = data?.find((item: { id: any }) => item.id == value)

          setStateValue(foundValue || '')

        }

      }
      else {

        setStateValue(multiple ? [] : '')

      }

    }

  }, [open, data, multiple, options, value, directFetch, props])

  React.useEffect(() => {

    if (multiple) {

      const isSelectAllActive = stateValue.length == options.length

      setSelectAll(isSelectAllActive)

    }

  }, [stateValue, data, directFetch, multiple, options])

  React.useEffect(() => {

    if (multiple) {

      if (onChange) {

        const change = async () => {

          await onChange(stateValue)

        }

        change()

      }

    }



  }, [selectAll, multiple, stateValue, onChange])


  return (
    <Autocomplete
      className={mainClassName + ' ' + (multiple ? 'use-multiple' : '')}
      id={id}
      freeSolo={freeSolo}
      multiple={multiple}
      disableCloseOnSelect={multiple}
      disableClearable={required}
      open={open}
      value={stateValue}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => (locale(option?.label || ''))}
      options={options}
      disabled={showLoader ? true : disabled}
      loading={showLoader}
      renderTags={(option, getTagProps) => {

        const chips = option.filter(item => stateValue.flatMap((item: { id: any }) => item.id).includes(item.id))

        const nTags = limitTags && (chips?.length > limitTags ? chips?.length - limitTags : 0)

        return (
          <Stack spacing={1}
            className={mainClassName + '-wrap-chip'}
          >
            {
              (nTags > 0) &&
              <span className={mainClassName + '-wrap-chip-length'}>
                {
                  '+' + nTags
                }
              </span>
            }
          </Stack>
        )
      }}
      renderOption={((props, option, { selected }) => {


        return (
          <li {...props}>
            {
              multiple &&
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
            }
            {
              option.label &&
              <span>
                {locale(option.label)}
                {
                  option.subtitle &&
                  <i className='text-subtitle'>{' (' + locale(option.subtitle) + ')'}</i>
                }
              </span>
            }
          </li>
        )
      })
      }


      groupBy={multiple && ((option) => true)}
      renderGroup={(params) => {

        return (
          <li key={params.key} className={mainClassName + '-options'}>
            <div className={mainClassName + '-option-select-all'} onClick={handleSelectAll}>
              {
                multiple &&
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              }
              {locale({ key: 'selectAll' })}
            </div>
            <div>{params.children}</div>
          </li>
        )
      }}


      renderInput={(params) => (
        <TextField
          {...params}
          label={locale(label)}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )


}