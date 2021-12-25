<template>
  <bus-table :busIdProp="groupByBusId"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BusTable from './components/table.vue'
@Component({
  name: 'Bus',
  components: {
    BusTable
  }
})
export default class extends Vue {
  @Prop() busIdProp!: any

  get groupByBusId() {
    return this.busIdProp
  }
}
</script>

<style></style>
