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
            <DxItem data-field="busId" />
            <DxItem data-field="driverId" />
            <DxItem data-field="time" />
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
      />
      <dx-column
        data-field="busId"
        data-type="number"
        header-cell-template="title-header"
        :caption="$t('bus.bus')"
        cell-template="cellTemplate"
        :width="500"
      >
        <dx-lookup
          :data-source="busLookUp"
          value-expr="id"
          display-expr="name"
        />
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="driverId"
        data-type="number"
        header-cell-template="title-header"
        :caption="$t('driver.driver')"
        cell-template="cellTemplate"
        :width="500"
      >
        <dx-lookup
          :data-source="driverLookUp"
          value-expr="id"
          display-expr="name"
        />
        <DxRequiredRule />
      </dx-column>
      <dx-column
        data-field="time"
        data-type="datetime"
        header-cell-template="title-header"
        :caption="$t('bus.schedule')"
        :width="200"
      >
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
import { LookUp } from '@/api/types'

interface IRowData {
  id: number
  busId: number
  driverId: number
  time: string
}
@Component({
  name: 'ScheduleTable',
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
  private list: IRowData[] = [];
  private driverLookUp: LookUp[] = [
    {
      id: 1,
      name: this.$t('driver.rohim').toString()
    },
    {
      id: 2,
      name: this.$t('driver.korim').toString()
    }
  ];

  private busLookUp: LookUp[] = [
    {
      id: 1,
      name: this.$t('bus.rupsha').toString()
    },
    {
      id: 2,
      name: this.$t('bus.meghna').toString()
    }
  ];

  private async getList() {
    this.listLoading = true
    this.list = [
      {
        id: 1,
        busId: 1,
        driverId: 1,
        time: '2019-01-01 00:00:00'
      },
      {
        id: 2,
        busId: 2,
        driverId: 2,
        time: '2019-01-01 00:00:00'
      }
    ]
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
