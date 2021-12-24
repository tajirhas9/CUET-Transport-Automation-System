import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getUserInfo, login, logout } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import { Roles } from '@/api/enums'

export interface IUserState {
  token: string
  id: number
  username: string
  role: Roles
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public username = ''
  public id = -1
  public role = Roles.undefined

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username
  }

  @Mutation
  private SET_ROLE(role: number) {
    this.role = role
  }

  @Mutation
  private SET_ID(id: number) {
    this.id = id
  }

  @Action
  public async Login(userInfo: { username: string, password: string}) {
    let { username, password } = userInfo
    username = username.trim()
    try {
      const { data } = await login({ username, password })
      const user = data.user
      setToken(data.accessToken)
      this.SET_TOKEN(data.accessToken)
      this.SET_USERNAME(user.username)
      this.SET_ID(user.id)
      this.SET_ROLE(user.role)
    } catch (e: any) {
      throw Error(e)
    }
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      const localToken = getToken() || ''
      if (localToken === '') {
        throw Error('GetUserInfo: token is undefined!')
      }
      this.SET_TOKEN(localToken)
    }
    try {
      const { data } = await getUserInfo()
      const user = data.user
      console.log(user)
      this.SET_USERNAME(user.username)
      this.SET_ID(user.id)
      this.SET_ROLE(user.role)
    } catch (e) {
      throw Error('Failed to get user info')
    }
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLE(-1)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.role)
    // Add generated routes
    PermissionModule.dynamicRoutes.forEach(route => {
      router.addRoute(route)
    })
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLE(-1)
  }
}

export const UserModule = getModule(User)
