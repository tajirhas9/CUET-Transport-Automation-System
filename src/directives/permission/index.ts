import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const { value } = binding
    const role = UserModule.role
    if (value) {
      const permissionRole = value
      const hasPermission = role === permissionRole
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
