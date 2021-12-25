<!--
  DevEx Component
-->

<template>
  <div class="table-holder">
    <DxLoadPanel :position="loadPanelPosition" :visible="listLoading" />
    <dx-data-grid
      id="gridContainer"
      class="grid"
      key-expr="id"
      :ref="dataGridRefKey"
      :data-source="schedules"
      :show-borders="true"
      :show-column-lines="true"
      :row-alternation-enabled="true"
      :column-auto-width="true"
      :cell-hint-enabled="true"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      @saving="onSaving"
      @exporting="exportGrid"
      @toolbar-preparing="onToolbarPreparing"
      @editor-prepared="onEditorPrepared"
      @edit-canceling="onEditCanceling"
      @init-new-row="onInitNewRow"
      @cell-click="onCellClick"
    >
      <DxFilterRow :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxGroupPanel :visible="false" />
      <DxExport :enabled="true" />
      <DxColumnChooser :enabled="true" />

      <DxEditing
        mode="popup"
        :allow-adding="getEditAccess"
        :allow-deleting="false"
        :allow-updating="getEditAccess"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          :title="popUpTitle"
        />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="bus" />
            <DxItem data-field="driver" />
            <DxItem data-field="datetime" />
          </DxItem>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="busRoute"/>
          </DxItem>
        </DxForm>
      </DxEditing>
      <!-- <DxColumn :group-index="0" data-field="Product" /> -->
      <dx-column
        data-field="id"
        :caption="$t('general.id')"
        data-type="number"
        alignment="right"
        :allow-editing="false"
        header-cell-template="title-header"
        :width="100"
        :hidden="true"
      />
      <dx-column
        data-field="bus"
        data-type="number"
        header-cell-template="title-header"
        :caption="$t('bus.bus')"
        cell-template="cellTemplate"
        :width="300"
      >
        <dx-lookup
          :data-source="buses"
          value-expr="id"
          display-expr="name"
        />
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="driver"
        data-type="number"
        header-cell-template="title-header"
        :caption="$t('driver.driver')"
        cell-template="cellTemplate"
        :width="300"
      >
        <dx-lookup
          :data-source="drivers"
          value-expr="id"
          display-expr="name"
        />
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="datetime"
        data-type="datetime"
        header-cell-template="title-header"
        :caption="$t('bus.schedule')"
        :width="300"
      >
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="busRoute"
        data-type="number"
        header-cell-template="title-header"
        :caption="$t('bus.route')"
        :width="550"
        cell-template="routeCellTemplate"
      >
       <dx-lookup
          :data-source="busRoutes"
          value-expr="id"
          display-expr="checkpoints"
        />
        <DxRequiredRule />
      </dx-column>
      <dx-column type="buttons">
        <DxButton name="edit" />
      </dx-column>
      <dx-group-panel :visible="true" />
      <dx-grouping :auto-expand-all="false" />
      <dx-pager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :show-page-size-selector="true"
      />
      <dx-paging :page-size="50" />

      <template #title-header="{data}">
        <div class="table-header">
          <p class="table-header-text">{{ data.column.caption }}</p>
        </div>
      </template>
      <template #cellTemplate="{data}">
        <div :title="data.text" style="cursor: pointer;color: blue;">
          <a>{{ data.text }}</a>
        </div>
      </template>
      <template #statusTemplate="{data}">
        <el-tag :type="data.text | statusFilter">
          {{ data.text }}
        </el-tag>
      </template>
      <template #routeCellTemplate="{data}">
        <p>
          <span v-for="(item, index) in thisRoute(data.data.route).checkpoints" :key="index">
            <span v-if="index === 0">{{ item }}</span>
            <span v-else> -> {{ item }}</span>
          </span>
        </p>
      </template>
    </dx-data-grid>
  </div>
</template>

<script lang="ts">
/**
 * @DevEx_component
 */
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import VueDevex from '@/layout/mixin/vue-devex'
import { BusModule } from '@/store/modules/bus'
import { DriverModule } from '@/store/modules/driver'
import { BusRouteModule } from '@/store/modules/bus-route'
import { BusScheduleModule } from '@/store/modules/schedule'

@Component({
  name: 'TodaySchedule',
  components: {
  }
})
export default class extends mixins(VueDevex) {
  constructor() {
    super()
    super.dataGridRefKey = this.gridRefKey
    super.tableName = 'Bus Schedule'
  }

  @Prop() driverIdProp!: any

  private gridRefKey = 'scheduleGrid';

  get drivers() {
    return DriverModule.drivers
  }

  get buses() {
    return BusModule.buses
  }

  get busRoutes() {
    return BusRouteModule.busRoutes
  }

  get schedules() {
    return BusScheduleModule.schedule.filter(schedule => this.isToday(new Date(schedule.datetime))).sort((a, b) => {
      if (new Date(a.datetime) > new Date(b.datetime)) {
        return -1
      }
      return 0
    })
  }

  private isToday = (someDate: Date) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
  }

  private thisRoute(routeId: number) {
    return BusRouteModule.busRoutes.find(route => route.id === routeId)
  }

  private async getList() {
    this.listLoading = true
    await BusModule.getBuses()
    await DriverModule.getDrivers()
    await BusRouteModule.getRoutes()
    await BusScheduleModule.getBusSchedules()
    this.listLoading = false
  }

  private onCellClick(e: any) {
    if (e.column.name === 'bus') {
      const busId = e.data.bus
      console.log(`bus: ${busId}`)
      this.$router.push({
        name: 'Buses',
        params: { busIdProp: busId.toString() }
      })
    } else if (e.column.name === 'driver') {
      const driverId = e.data.driver
      console.log(`driver: ${driverId}`)
      this.$router.push({
        name: 'Drivers',
        params: { driverIdProp: driverId.toString() }
      })
    }
  }

  // These method will get merged with the VueDevex mixin's method
  onInitNewRow() {
    throw new Error('Method not implemented.')
  }

  private async onSaving(e: any) {
    this.listLoading = true
    try {
      const changes = e.changes[0]
      console.debug(changes)
      if (changes.type === 'insert') {
        await BusScheduleModule.addBusSchedule(changes.data)
      } else if (changes.type === 'update') {
        console.log(changes)
        await BusScheduleModule.updateBusScedule({ id: changes.key, data: changes.data })
      }
      this.$notify({
        title: 'Success',
        message: 'Data updated successfully',
        type: 'success',
        duration: 2000
      })
      if (e.changes[0].type === 'insert') {
        await this.getList()
      }
    } catch (e) {
      this.$notify({
        title: 'Failed',
        message: 'Data updated failed',
        type: 'error',
        duration: 2000
      })
    }
    e.cancel = true
    this.listLoading = false
  }

  created() {
    this.getList() // table data
  }

  @Watch('driverIdProp')
  OnDriverIdPropChange(val: string, oldVal: string) {
    console.log(
      `driverIdProp props changed from ${oldVal} to ${val}`
    )
  }

  @Watch('clearFilterTriggered')
  OnClearFilterTriggered(val: boolean) {
    if (val) {
      this.driverIdProp = undefined
    }
  }
}
</script>

<style>
.grid {
  widows: 100%;
  align-self: center;
}
.dx-searchbox .dx-icon-search {
  left: 0px;
}
.dx-texteditor-input {
  margin-left: 15px;
}
.dx-placeholder:before {
  margin-left: 15px;
}
.dx-searchbox .dx-texteditor-input,
.dx-searchbox .dx-placeholder:before {
  padding-left: 8px;
  padding-right: 68px;
}
.table-header {
  font-size: 15px;
  color: black;
}
</style>
