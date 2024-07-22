"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Helpers } from '@/app/utils';
import { Stack } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function Chart(props: {
  data: {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<string | number>,
      borderColor: string,
      backgroundColor: string,
    }>,
  },
  title: string,
}) {

  const {
    data,
    title,
  } = props


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  const refactorDatasets = data?.datasets?.map(item => {

    return {
      ...item,
      borderColor: item.borderColor || Helpers.getColor(),
      backgroundColor: item.backgroundColor || Helpers.getColor(),
    }

  })

  const refactorData = {
    labels: data?.labels,
    datasets: refactorDatasets,
  }

  return (
    <Stack minHeight={'400px'}>
      <Line options={options} data={refactorData} />
    </Stack>
  )
}

