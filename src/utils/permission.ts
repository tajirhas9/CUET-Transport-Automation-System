import { Roles } from '@/api/enums'
import { UserModule } from '@/store/modules/user'

export const checkPermission = (value: Roles): boolean => {
  if (value) {
    const role = UserModule.role
    const permissionRole = value
    const hasPermission = role === permissionRole
    return hasPermission
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
