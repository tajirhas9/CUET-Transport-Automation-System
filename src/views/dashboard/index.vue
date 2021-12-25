<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'
import { Roles } from '@/api/enums'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get role() {
    return UserModule.role
  }

  created() {
    if (this.role !== Roles.admin) {
      this.currentRole = 'editor-dashboard'
    }
  }
}
</script>
