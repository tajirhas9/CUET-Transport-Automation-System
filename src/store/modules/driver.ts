import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getDrivers } from '@/api/driver'

export interface IDriverState {
  id: number
  name: string
  address: string
  licenseStatus: boolean
}

export interface IDriversState {
    drivers: IDriverState[]
}

@Module({ dynamic: true, store, name: 'driver' })
class Driver extends VuexModule implements IDriversState {
  public drivers: IDriverState[] = []

  @Mutation
  private SET_DRIVERS(drivers: IDriverState[]) {
    this.drivers = drivers
  }

  @Action
  public async getDrivers() {
    try {
      const { data } = await getDrivers()
      this.SET_DRIVERS(data.drivers)
    } catch (e: any) {
      throw Error(e)
    }
  }
}

export const DriverModule = getModule(Driver)
