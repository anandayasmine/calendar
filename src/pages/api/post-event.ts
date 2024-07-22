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
    
    console.log("🚀 ~ req 12333:", req?.body)

    const response: any = await SupabaseServer
      .from('event')
      .insert(req?.body)

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

