<!--
  DevEx Component
-->

<template>
  <div class="table-holder">
    <DxLoadPanel :position="loadPanelPosition" :visible="listLoading" />
    <dx-data-grid
      id="gridContainer"
      class="grid"
      key-expr="driverId"
      :ref="dataGridRefKey"
      :data-source="list"
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
            <DxItem data-field="name" />
            <DxItem data-field="address" />
            <DxItem data-field="licenseStatus" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <dx-column
        data-field="name"
        data-type="string"
        header-cell-template="title-header"
        :caption="$t('driver.name')"
        :width="500"
      >
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="address"
        data-type="string"
        header-cell-template="title-header"
        :caption="$t('driver.address')"
        :width="500"
      >
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="licenseStatus"
        data-type="boolean"
        header-cell-template="title-header"
        :caption="$t('driver.licenseStatus')"
        cell-template="licenseStatusTemplate"
      >
        <dx-lookup
          :data-source="licenseStatusOptions"
          value-expr="value"
          display-expr="name"
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
      <template #licenseStatusTemplate="{data}">
        <el-tag :type="data.text | driverLicenseStatusFilter">
          {{ data.text }}
        </el-tag>
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
import { DriverModule } from '@/store/modules/driver'

interface IRowData {
  driverId: number
  name: string
  address: string
  licenseStatus: boolean
}
@Component({
  name: 'DriverTable',
  components: {
  }
})
export default class extends mixins(VueDevex) {
  constructor() {
    super()
    super.dataGridRefKey = this.gridRefKey
    super.tableName = 'Drivers'
  }

  @Prop() driverIdProp!: any

  private gridRefKey = 'driverGrid';
  private list: IRowData[] = [];
  private licenseStatusOptions = [
    { value: false, name: 'Invalid' },
    { value: true, name: 'Valid' }
  ]

  get drivers() {
    return DriverModule.drivers
  }

  private async getDrivers() {
    await DriverModule.getDrivers()
  }

  private async getList() {
    this.listLoading = true
    this.list = []
    this.drivers.forEach(driver => {
      this.list.push({
        driverId: driver.id,
        name: driver.name,
        address: driver.address,
        licenseStatus: driver.licenseStatus
      })
    })
    this.listLoading = false
  }

  private onCellClick(e: any) {
    throw new Error('Method not implemented.')
  }

  // These method will get merged with the VueDevex mixin's method
  onInitNewRow(e: any) {
    throw new Error('Method not implemented.')
  }

  private async onSaving(e: any) {
    throw new Error('Method not implemented.')
  }

  created() {
    this.getDrivers()
    this.getList() // table data
  }

  @Watch('driverIdProp')
  OnDriverIdPropChange(val: string, oldVal: string) {
    console.log(
      `driverIdProp props changed from ${oldVal} to ${val}`
    )
  }

  @Watch('drivers')
  OnDriversChange() {
    this.getList()
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
  width: 93%;
  align-self: center;
  margin-left: 3.5%;
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
