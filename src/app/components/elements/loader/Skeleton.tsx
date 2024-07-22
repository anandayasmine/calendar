"use client"
import React from 'react'

import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  Stack,
  Divider,
} from '@mui/material';

import classnames from 'classnames'

export default function index(props: {
  type?: string;
  row?: number;
  className?: string;
  sx?: any;
}) {

  const {
    type,
    row,
    className,
    sx,
  } = props

  const mainClassName = 'element-loader-skeleton'

  const refactorClassName = classnames(
    mainClassName,
    className,
    (type ? 'type-' + type : 'type-default')
  )


  switch (type) {

    case 'profile': {

      return (
        <Box
          className={refactorClassName}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant='body1'>
              <Skeleton width="100%" />
            </Typography>
            <Typography variant='caption'>
              <Skeleton width="100%" />
            </Typography>
          </Box>
        </Box>
      )

    } break

    case 'image': {

      return (
        <Box
          className={refactorClassName}
          sx={sx}
        >
          <Skeleton
            variant="rounded" width='100%' height='100%'
          />
        </Box>
      )

    } break

    case 'row': {

      const items = Array(row).fill(1)

      return (
        <Box
          className={refactorClassName}
          sx={sx}
        >
          {
            items.map((item, index) => [

              <div
                key={'skeleton-item-' + index}
                className='wrap-skeleton-item'
              >

                <Skeleton
                  width="100%"
                  height="50px"
                />
                <Skeleton
                  width="100%"
                />
                <Skeleton
                  width="100%"
                />

              </div>

            ])
          }
        </Box>
      )

    } break
    case 'table': {

      const rows = Array(25).fill(1)
      const columns = Array(5).fill(1)

      return (
        <Stack
          className={refactorClassName}
          sx={sx}
          spacing={2}
        >

          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack
              sx={{
                width: '100%'
              }}
            >
              <Skeleton
                variant='text'
                sx={{
                  minWidth: '5rem',
                  width: '20%',
                }}
              />
              <Skeleton
                variant='text'
                sx={{
                  minWidth: '5rem',
                  width: '30%',
                  height: '2rem'
                }}
              />
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              sx={{
                width: '100%'
              }}
              alignItems={'end'}

            >
              <Skeleton
                variant='text'
                sx={{
                  minWidth: '5rem',
                  width: '100%',
                  height: '2rem'
                }}
              />
              <Skeleton
                variant='text'
                sx={{
                  minWidth: '5rem',
                  width: '100%',
                  height: '2rem'
                }}
              />
            </Stack>
          </Stack>

          <Stack
            direction={'row'}
            spacing={1}
            sx={{
              paddingBottom: '1rem'
            }}
          >

            <Stack
              className={'card-flat'}
              sx={{
                width: '100%',
                padding: '1rem'
              }}
              spacing={3}
            >
              {
                rows?.map((row: any, indexRow: number) => {
                  return (
                    <Stack key={mainClassName + '-row-' + indexRow}>
                      <Stack direction={'row'} spacing={2}>
                        {
                          columns?.map((column: any, indexColumn: number) => {
                            return (
                              <Skeleton
                                variant='rectangular'
                                key={mainClassName + '-skeleton-' + indexColumn}
                                sx={{
                                  minWidth: '5rem',
                                  width: '100%',
                                  height: '1rem',
                                  borderRadius: '.5rem'
                                }}
                              />
                            )
                          })
                        }
                      </Stack>
                      {
                        indexRow == 0 &&
                        <Divider
                          sx={{
                            marginTop: '1rem'
                          }}
                        />
                      }
                    </Stack>
                  )
                })
              }
            </Stack>
          </Stack>

        </Stack>
      )

    } break

    default: {

      return (
        <Box
          className={refactorClassName}
          sx={sx}
        >
          <Skeleton
            variant='text'
            width="100%"
            height='100%'
          />
        </Box>
      )

    } break

  }

}
