import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getRoutes } from '@/api/bus-routes'

export interface IBusRouteState {
  id: number
  checkpoints: string[]
}

export interface IBusRoutesState {
    busRoutes: IBusRouteState[]
}

@Module({ dynamic: true, store, name: 'busRoutes' })
class BusRoute extends VuexModule implements IBusRoutesState {
  public busRoutes: IBusRouteState[] = []

  @Mutation
  private SET_BUS_ROUTES(routes: IBusRouteState[]) {
    this.busRoutes = routes
  }

  @Action
  public async getRoutes() {
    try {
      const { data } = await getRoutes()
      console.log(data)
      this.SET_BUS_ROUTES(data.routes)
    } catch (e: any) {
      throw Error(e)
    }
  }
}

export const BusRouteModule = getModule(BusRoute)
