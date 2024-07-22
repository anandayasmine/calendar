import { Helpers } from "@/app/utils";
import _ from "lodash";

export default Object.assign({
  title: {
    en: 'Posts',
  },
  action: {
    searchDataGrid: true,
  },
  table: {
    columns: Helpers.getWeekDays()?.map((item: any) => {
      return {
        field: item,
        headerName: item,
      }
    }),
    data: Object.values(_.groupBy(Helpers.getDaysInMonth()?.map((item: any) => {
      const weekdays = Helpers.getWeekDays()
      const result: any = {
        id: item.getTime(),
        date: item,
        weekNumber: Helpers.getWeek(item)
      }

      weekdays.forEach((dayName: string) => {
        if (dayName == Helpers.getDayName(item)) {
          result[dayName as keyof object] = 1
        }
        else {
          result[dayName as keyof object] = 0

        }
      })

      return result
    }), 'weekNumber'))?.map((item)=>item[0]),
  }
});
