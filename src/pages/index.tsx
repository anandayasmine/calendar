"use client"
import React from 'react'

import { Calendar } from '@/components/index'
import { getHead } from '@/app/data/head';
import { EventAPI } from '@/app/data/api';
import { Helpers } from '@/app/utils';
import _ from 'lodash';
import { TEventDataItem } from '@/app/data/api/EventAPI';
import dayjs from 'dayjs';

import { connect } from 'react-redux'
import { assignMainLayout } from '@/app/contexts/redux/actions'

export interface IIndexPageProps {
  assignMainLayout: (params: any) => void;
}

export interface IIndexPageState {
  head: any,
}

type TGetEvent = {
  month: number
}

class IndexPage extends React.Component<IIndexPageProps, IIndexPageState> {
  constructor(props: IIndexPageProps) {
    super(props);

    this.state = {
      head: {},
    }
  }

  async postEvent(params: any) {

    try {

      this.props.assignMainLayout({
        type: 'ASSIGN_OPEN_LOADER',
      })

      const response: any = await EventAPI.postEvent({}, {
        name: params?.event_name,
        time: params?.date_time,
        user_id: 1,
      })
      console.log("🚀 ~ IndexPage ~ getEvent ~ response:", response)

      this.props.assignMainLayout({
        type: 'ASSIGN_CLOSE_LOADER',
      })
      if (response?.success) {

        Helpers.openSnackbar('successAdd')

      }

    }
    catch (err) {

      this.props.assignMainLayout({
        type: 'ASSIGN_CLOSE_LOADER',
      })
      
    }

  }

  async getEvent(params?: TGetEvent): Promise<number[] | []> {

    try {

      console.log("🚀 ~ IndexPage ~ getEvent ~ params:", params)


      const response: any = await EventAPI.getEvents({
        month: params?.month
      })
      console.log("🚀 ~ IndexPage ~ getEvent ~ response:", response)


      if (response?.success && Helpers.ArrayValid(response?.payload)) {

        const refactorPayload: number[] = response.payload?.map((item: TEventDataItem, index: number) => {

          const dateNumber: number = dayjs(item?.time).date()

          return {
            ...item,
            dateNumber,
          }

        })

        return refactorPayload


      }

      return []


    }
    catch (err) {

      return []

    }

  }

  async assignHead() {

    try {

      const head = getHead({ name: 'headCalendar' })
      console.log("🚀 ~ IndexPage ~ assignHead ~ head:", head)

      this.setState({
        head,
      })

    }
    catch (err) {


    }

  }

  async componentDidMount(): Promise<void> {
    await this.assignHead()
  }
  public render() {
    const {
      state: {
        head,
      },
      props: {

      }
    } = this
    return (
      <Calendar
        head={head}
        getEvent={async (params: any) => await this.getEvent(params)}
        postEvent={async (params: any) => await this.postEvent(params)}
      />
    );
  }
}
export default connect(null, { assignMainLayout })(IndexPage)
