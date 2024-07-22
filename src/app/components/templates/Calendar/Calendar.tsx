import * as React from 'react';
import { Button, ContentLayout, ModalScreen } from '@/components/index'
import { DateCalendar, DateTimePicker, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Badge, Modal, Stack, TextField } from '@mui/material';
import { THeadCalendar } from '@/app/data/head/components';
import dayjs, { Dayjs } from 'dayjs';
import { Helpers } from '@/app/utils';
import _ from 'lodash';


function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: any[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Stack className='mui-picker-root-custom'>
      <Badge
        key={props.day.toString()}
        badgeContent={isSelected ? "" : undefined}
        color="secondary"
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    </Stack>
  );
}

export interface ICalendarProps {
  head: THeadCalendar,
  getEvent: (params: object) => void,
  postEvent: (params: object) => void,
}

export interface ICalendarState {
  highlightedDays?: any[] | [],
  modalForm: any,
  selectedDate?: Dayjs,
  form: any,
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(props: ICalendarProps) {
    super(props);

    this.state = {
      modalForm: {
        isOpen: false,
        selectedDate: null,
      },
      form: {},
    }
  }


  async handleEvent({
    type,
    value,
    event
  }: {
    type: string,
    value?: any,
    event?: any,
  }) {


    try {

      const {
        state: {
          highlightedDays,
        },
        props: {

        }
      } = this


      console.log("🚀 ~ Calendar ~ params:", type, value, event)

      switch (type) {

        case 'change-month': {

          this.setState({
            highlightedDays: [],
          })

          const currentMonth: number = value?.month()
          console.log("🚀 ~ Calendar ~ currentMonth:", currentMonth)

          const highlightedDays: any = await this.props.getEvent({
            month: currentMonth
          })

          this.setState({
            highlightedDays: highlightedDays,
          })

        } break

        case 'select-date': {

          let newSelectedDate = dayjs(value)
          let foundIndex: number = highlightedDays?.findIndex(item => item == newSelectedDate?.date()) || -1

          if (foundIndex >= 0) {

            newSelectedDate = newSelectedDate

          }

          this.setState({
            selectedDate: newSelectedDate,
            form: {
              ...this.state.form,
              date_time: newSelectedDate
            },
            modalForm: {
              isOpen: _.uniqueId()
            },
          })

        } break

        case 'form-change': {

          const fieldName = event?.target?.name
          console.log("🚀 ~ Calendar ~ fieldName:", fieldName)

          this.setState({
            form: {
              ...this.state.form,
              [fieldName]: event?.target?.value
            }
          })


        } break

        case 'submit': {

          const response: any = await this.props.postEvent(this.state.form)

          await this.getData({
            date: this.state.selectedDate,
        
          })

          this.setState({
            modalForm:{
              isOpen: 0,
            }
          })


        } break

      }


    }
    catch (err) {


    }

  }

  async getData(params?: any) {

    const monthNow: number = params?.date ? dayjs(params?.date).month() : dayjs().month()
    console.log("🚀 ~ Calendar ~ componentDidMount ~ monthNow:", monthNow)

    const highlightedDays: any = await this.props.getEvent({ month: monthNow })
    console.log("🚀 ~ IndexPage ~ assignHead ~ highlightedDays:", highlightedDays)


    this.setState({
      highlightedDays: highlightedDays,
    })
  }

  async componentDidMount(): Promise<void> {

    await this.getData()

  }
  public render() {

    const {
      state: {
        highlightedDays,
        modalForm,
        selectedDate,
      },
      props: {
        head,
      },
    } = this


    console.log("🚀 ~ Calendar ~ render ~ highlightedDays:", highlightedDays)


    return (
      <ContentLayout title={head?.title} access={true}>
        <Stack component={'main'} spacing={2}>
          <DateCalendar
            className='mui-calendar-full'
            slots={{
              day: ServerDay
            }}
            slotProps={{
              day: {
                highlightedDays: highlightedDays?.flatMap(item => item.dateNumber),
              } as any,
            }}
            onMonthChange={async (value: Dayjs) => await this.handleEvent({
              type: 'change-month',
              value,
            })}
            onChange={async (value: Dayjs) => await this.handleEvent({
              type: 'select-date',
              value,
            })}
          />
          <ModalScreen
            isOpen={modalForm?.isOpen}
            title="Add Event"
            className={'paper'}
          >
            <Stack
              sx={{
                display: 'grid',
                gap: '2rem'
              }}
            >
              <TextField
                label='Event Name'
                name='event_name'
                onChange={async (event: any) => await this.handleEvent({
                  type: 'form-change',
                  event,
                })}
              />
              <DateTimePicker
                label='Date & Time'
                name='date_time'
                onChange={async (event: any) => await this.handleEvent({
                  type: 'form-change',
                  event,
                })}
                minDate={dayjs().startOf('year')}
                maxDate={dayjs().endOf('year')}
                value={selectedDate}
              />
              <Stack>
                <Button
                  headType="finish"
                  handleClick={async () => await this.handleEvent({
                    type: 'submit',
                  })}
                />
              </Stack>

            </Stack>

          </ModalScreen>
        </Stack>
      </ContentLayout>
    );
  }
}
