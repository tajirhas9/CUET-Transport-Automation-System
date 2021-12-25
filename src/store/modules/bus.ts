import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { addNewBus, getBuses, updateBus } from '@/api/bus'

export interface IBusState {
  id: number
  name: string
  status: boolean
}

export interface IBusesState {
    buses: IBusState[]
}

@Module({ dynamic: true, store, name: 'bus' })
class Bus extends VuexModule implements IBusesState {
  public buses: IBusState[] = []

  @Mutation
  private SET_BUSES(buses: IBusState[]) {
    this.buses = buses
  }

  @Action
  public async getBuses() {
    try {
      const { data } = await getBuses()
      this.SET_BUSES(data.buses)
    } catch (e: any) {
      throw Error(e)
    }
  }

  @Action
  public async addNewBus(payload: { name: string, status: boolean }) {
    try {
      await addNewBus(payload)
      await this.getBuses()
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  public async updateBus(payload: { id: number, data: { name: string, status: boolean } }) {
    try {
      const currentBusInfo = this.buses.find(bus => bus.id === payload.id)
      if (currentBusInfo) {
        const requestPayload = {
          id: payload.id,
          name: payload.data.name || currentBusInfo.name,
          status: payload.data.status || currentBusInfo.status
        }
        await updateBus(requestPayload)
        await this.getBuses()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const BusModule = getModule(Bus)
