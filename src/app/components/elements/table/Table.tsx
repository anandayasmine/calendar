import { Stack, Typography } from '@mui/material'
import { DataGrid, GridCell, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { NoticeCard, Skeleton } from '@/components/elements'
import classNames from 'classnames'

type TProps = {
  columns?: Array<any>,
  rows?: Array<any> | null | undefined,
  height?: any,
  useSearch?: Boolean,
}

export default function Table(props: TProps) {

  const {
    columns,
    rows,
    height,
    useSearch,
  } = props


  const mainClassName = 'element-table'

  const isRowExist = rows && Array.isArray(rows) && rows?.length > 0

  const isRowEmpty = rows && Array.isArray(rows) && rows?.length == 0

  const refactorClassName = classNames(
    mainClassName,
    useSearch ? 'use-toolbar' : ''
  )


  return (
    <Stack
      className={refactorClassName}
      sx={{
        height: height
      }}
    >

      {
        isRowExist ?
          <DataGrid
            columns={columns || []}
            rows={rows || []}
            getRowHeight={() => 'auto'}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{
              toolbar: GridToolbar,
              cell: (params) => {

                return (
                  <GridCell
                    {...params}
                  >
                    <Typography
                       dangerouslySetInnerHTML={{
                        __html: params?.value
                       }}
                    >
                    </Typography>
                  </GridCell>
                )

              }
            }}
            slotProps={{
              toolbar: {
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
                showQuickFilter: Boolean(useSearch),
              },
            }}

          />
          :
          (
            isRowEmpty ?
              <NoticeCard
                headType={'dataEmpty'}
              />
              :
              <Skeleton
                type='table'
              />
          )
      }


    </Stack>
  )
}