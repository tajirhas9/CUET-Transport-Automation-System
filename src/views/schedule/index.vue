<template>
  <schedule-table :driverIdProp="groupByDriverId"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ScheduleTable from './components/table.vue'
@Component({
  name: 'Schedule',
  components: {
    ScheduleTable
  }
})
export default class extends Vue {
  @Prop() driverIdProp!: any

  get groupByDriverId() {
    return this.driverIdProp
  }
}
</script>

<style></style>
