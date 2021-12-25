<template>
  <driver-table :driverIdProp="groupByDriverId"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DriverTable from './components/table.vue'
@Component({
  name: 'Driver',
  components: {
    DriverTable
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
