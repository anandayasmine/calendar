"use client"
import React from 'react';
import {
  Button,
  ContentLayout,
  Table,
  ModalConfirm,
} from '@/app/components';
import { getHead, locale } from '@/app/data/head';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';

export interface ITableEditorProps {
  head: any;
  rows?: Array<any> | null | undefined;
}

export interface ITableEditorState {
  mainClassName: string;
  heightTable: number | string;
  modalConfirm: any;
  modalForm: any;
  modalFilter: any;
}

export default class TableEditor extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props: ITableEditorProps) {
    super(props);

    this.state = {
      mainClassName: 'template-global-table-editor',
      heightTable: '500px',
      modalConfirm: {
        isOpen: 0,
        headType: '',
      },
      modalForm: {
        isOpen: 0,
        type: ''
      },
      modalFilter: {
        isOpen: 0,
        head: null,
        type: 'filter'
      },
    }
  }

  assignHeightTable() {

    try {

      const {
        state: {
          mainClassName
        },
        props: {

        }
      } = this


      const height1 = document.querySelector('.content-layout')?.clientHeight || 0
      const height2 = document.querySelector('.' + mainClassName + '-header')?.clientHeight || 0

      const gap = 90
      const heightTable = height1 - (height2 + gap)

      this.setState({
        heightTable: heightTable + 'px'
      })

    }
    catch (err) {


    }

  }

  async assignData() {
    try {

    }
    catch (err) {

    }
  }

  async handleEvent(params: {
    type: string,
    values?: any,
    event?: any,
  }) {



    try {

      const {
        state: {

        },
        props: {

        }
      } = this

      const {
        type,
        values
      } = params

      switch (type) {

        case 'change-search-key': {




        } break

      }


    }
    catch (err) {


    }

  }


  async componentDidMount(): Promise<void> {
    this.assignHeightTable()
  }

  public render() {

    const {
      state: {
        mainClassName,
        heightTable,
        modalFilter,
        modalForm,
        modalConfirm,
      },
      props: {
        head,
        rows,
      }
    } = this


    const title = head && locale({ label: head?.title })

    return (
      <ContentLayout title={title}>
        <Stack component={'main'} className={mainClassName} spacing={2}>
          <Stack className={mainClassName + '-header'} spacing={1}>
            <Stack className={mainClassName + '-title'}>
              <Typography variant='h4'>
                {title}
              </Typography>
            </Stack>

            {

              head?.cardOverview?.length > 0 &&
              head?.cardOverview?.map((item: any, index: number) => {

                return (
                  <Card
                    key={mainClassName + '-card-overview-' + index}
                    className={mainClassName + '-card-overview'}
                  >
                    <CardContent>
                      <Typography variant='body1'>
                        {locale({ label: item?.title })}
                      </Typography>
                      <Typography variant='h4'>
                        {(item?.value)}
                      </Typography>
                      {
                        item?.description &&
                        <Typography variant='body1'>
                          {locale({ label: item?.description })}
                        </Typography>
                      }
                    </CardContent>
                  </Card>
                )

              })

            }
            {
              (
                head?.action?.search 
                ||
                head?.action?.filter 
              )
              &&
              <Stack
                className={mainClassName + '-actions'}
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Stack>
                  {
                    head?.action?.search &&
                    <TextField
                      placeholder={locale({ key: 'search' }) + '...'}
                      onChange={async (event: any) => await this.handleEvent({
                        type: 'change-search-key',
                        event,
                      })}
                    />
                  }
                </Stack>
                <Stack>
                  {
                    head?.action?.filter &&
                    <Button
                      headType={'filter'}
                    />
                  }
                </Stack>
              </Stack>
            }
          </Stack>

          <Stack className={mainClassName + '-content'}>
            <Table
              columns={head?.table?.columns}
              rows={rows}
              height={heightTable}
              useSearch={head?.action?.searchDataGrid}
            />
          </Stack>

        </Stack>


        <ModalConfirm
          {...(modalConfirm || {})}
          handleAccept={this.handleEvent.bind(this, {
            type: 'delete-confirm'
          })}
        />

      </ContentLayout>
    );
  }
}
