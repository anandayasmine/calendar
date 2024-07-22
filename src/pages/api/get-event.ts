'use server'

import SupabaseServer from "@/app/core/SupabaseServer";
import { TEventDataItem } from "@/app/data/api/EventAPI";
import { TResponse } from '@/app/core/enum'

import type { NextApiRequest, NextApiResponse } from 'next'
import Dayjs from "dayjs";

type TResponseEvent = TResponse & {
  payload?: TEventDataItem,
}

const isSuccess = (code: number) => code == 200

export default async function handler(
  req: any,
  res: NextApiResponse<TResponseEvent>
) {

  try {

    let start_date, end_date, response:any

    if (req?.query?.month) {

      // == Filter by month ==
      const month: number = parseInt(req?.query?.month || '0')

      console.log("🚀 ~ req:", req?.query)
      start_date = Dayjs().set('month', (month)).startOf('month').format()
      end_date = Dayjs().set('month', (month)).endOf('month').format()

      response = await SupabaseServer
        .from('event')
        .select('*')
        .gte('time', start_date)
        .lte('time', end_date)
    }
    else {

      response = await SupabaseServer
        .from('event')
        .select('*')
        
    }

    console.log("🚀 ~ start_date, end_date:", start_date, end_date)


    res.status(response?.status).json({
      status: response?.status,
      success: isSuccess(response?.status),
      payload: response?.data,
    })

  }
  catch (err) {

    res.status(500).json({
      status: 500,
      success: false,
      message: 'Error Occurred',
    })

  }

}

