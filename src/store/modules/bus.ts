import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getBuses } from '@/api/bus'

export interface IBusState {
  id: number
  name: string
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
}

export const BusModule = getModule(Bus)
