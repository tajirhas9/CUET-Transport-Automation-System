import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { addBusSchedule, getBusSchedule, updateBusSchedule } from '@/api/bus'

export interface IScheduleState {
  id: number
  bus: number
  driver: number
  route: number
  datetime: string
}

export interface ISchedulesState {
  schedule: IScheduleState[]
}

@Module({ dynamic: true, store, name: 'schedule' })
class Schedule extends VuexModule implements ISchedulesState {
  public schedule: IScheduleState[] = [];

  @Mutation
  private SET_BUS_SCHEDULE(buses: IScheduleState[]) {
    this.schedule = buses
  }

  @Action
  public async getBusSchedules() {
    try {
      const { data } = await getBusSchedule()
      this.SET_BUS_SCHEDULE(data.schedule)
    } catch (e: any) {
      throw Error(e)
    }
  }

  @Action
  public async addBusSchedule(payload: {
    bus: number
    driver: number
    route: number
    datetime: string
  }) {
    try {
      await addBusSchedule(payload)
      await this.getBusSchedules()
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  public async updateBusScedule(payload: {
    id: number
    data: {
      bus?: number
      driver?: number
      busRoute?: number
      datetime?: string
    }
  }) {
    try {
      const currentSchedule = this.schedule.find(schdl => schdl.id === payload.id)
      if (currentSchedule) {
        const requestPayload = {
          id: payload.id,
          bus: payload.data.bus || currentSchedule.bus,
          driver: payload.data.driver || currentSchedule.driver,
          route: payload.data.busRoute || currentSchedule.route,
          datetime: payload.data.datetime || currentSchedule.datetime
        }
        await updateBusSchedule(requestPayload)
        await this.getBusSchedules()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const BusScheduleModule = getModule(Schedule)
