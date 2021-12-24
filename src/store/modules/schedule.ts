import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getBusSchedule } from '@/api/bus'

export interface IScheduleState {
  id: number
  bus: number
  driver: number
  route: number
  datetime: string
  isStandBy: boolean
}

export interface ISchedulesState {
    buses: IScheduleState[]
}

@Module({ dynamic: true, store, name: 'schedule' })
class Schedule extends VuexModule implements ISchedulesState {
  public buses: IScheduleState[] = []

  @Mutation
  private SET_BUS_SCHEDULE(buses: IScheduleState[]) {
    this.buses = buses
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
}

export const BusScheduleModule = getModule(Schedule)
