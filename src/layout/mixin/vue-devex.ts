import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxEditing,
  DxLookup,
  DxExport,
  DxPopup,
  DxForm,
  DxRequiredRule,
  DxEmailRule,
  DxPatternRule,
  DxAsyncRule,
  DxButton,
  DxFilterRow,
  DxMasterDetail,
  DxColumnChooser,
  DxSummary,
  DxTotalItem,
  DxScrolling
} from 'devextreme-vue/data-grid'
import { DxItem } from 'devextreme-vue/form'
import { DxLoadPanel } from 'devextreme-vue/load-panel'
import 'devextreme/data/odata/store'
import { exportDataGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import FileSaver from 'file-saver'
import debounce from 'lodash/debounce'
import { getEditAccess } from '@/permission'

export enum TableIds {
  Entity = 1,
  EntityChild = 2,
  EntityStock = 4,
  Model = 8,
  Driver = 16,
  Platform = 32,
  PlatformAttr = 64,
  PlatformProtocol = 128
}

@Component({
  name: 'VueDevex',
  components: {
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxEditing,
    DxLookup,
    DxLoadPanel,
    DxExport,
    DxPopup,
    DxForm,
    DxItem,
    DxRequiredRule,
    DxEmailRule,
    DxPatternRule,
    DxAsyncRule,
    DxButton,
    DxFilterRow,
    DxMasterDetail,
    DxColumnChooser,
    DxSummary,
    DxTotalItem,
    DxScrolling
  }
})
export default class extends Vue {
  @Prop() protected driverId!: string | undefined;

  protected dataGridRefKey = '';
  protected gridTableId = -1;
  protected loadPanelPosition = { of: '#gridContainer' };
  protected listLoading = false;
  protected popUpTitleState = 'New';
  protected titleLockState = false;
  protected editorTypeLockState = false;
  protected tableName = '';
  protected isEditorTypeInsert = true;
  protected pageSizes = [10, 25, 50, 100];
  protected clickedRowIdState = -1;
  protected clearFilterTriggered: boolean | null = null;

  protected statusOptions = [
    { id: 0, name: 'Inactive' },
    { id: 1, name: 'Active' }
  ];

  get getEditAccess() {
    return getEditAccess()
  }

  get clickedRowId() {
    return this.clickedRowIdState
  }

  set clickedRowId(val: number) {
    this.clickedRowIdState = val
  }

  get popUpTitle() {
    return this.popUpTitleState
  }

  set popUpTitle(val: string) {
    this.popUpTitleState = val
  }

  get titleLocked() {
    return this.titleLockState
  }

  set titleLocked(val: boolean) {
    this.titleLockState = val
  }

  get editorTypeLock() {
    return this.editorTypeLockState
  }

  set editorTypeLock(val: boolean) {
    this.editorTypeLockState = val
  }

  get dataGrid() {
    const gridKey = this.dataGridRefKey
    const dataGrid: any = this.$refs[gridKey]
    return dataGrid.$_instance
  }

  protected filterByDriver() {
    try {
      this.dataGrid.filter(['driverid', '=', this.driverId])
    } catch (e) {
      console.error(e)
    }
  }

  protected async initFilter() {
    if (this.driverId !== undefined) this.filterByDriver()
    else this.clearFilter()
  }

  protected async getLookups() {
    return null
  }

  protected clearFilter() {
    // clear
    this.dataGrid.clearFilter()
    try {
      this.driverId = undefined
    } catch (e) {
      console.log(e)
    }
  }

  protected async exportGrid(e: any) {
    /**
     * Handles exporting and downloading
     */
    const fileName = `${this.tableName}.xlsx`
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Main sheet')
    exportDataGrid({
      worksheet: worksheet,
      component: e.component
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) {
        FileSaver.saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          fileName
        )
      })
    })
    e.cancel = true
  }

  // These method is overloaded to update the title of the editor popup
  // eslint-disable-next-line
  protected onEditCanceling(e: any) {
    this.titleLocked = false
    this.editorTypeLock = false
  }

  // These method is overloaded to update the title of the editor popup
  protected onEditorPrepared(e: any) {
    const updateTitle = debounce((val: string) => {
      if (!this.titleLocked) {
        this.popUpTitle = val
        this.titleLocked = true
      }
    }, 200)

    const updateEditorType = debounce((val: boolean) => {
      if (!this.editorTypeLock) {
        this.isEditorTypeInsert = val
        this.editorTypeLock = true
      }
      console.log(`is editor type insert: ${this.isEditorTypeInsert}`)
    }, 200)

    try {
      if (e.row.isNewRow) {
        updateTitle('New ' + this.tableName)
        updateEditorType(true)
      } else {
        updateTitle('Update ' + this.tableName)
        updateEditorType(false)
      }
    } catch (e) {
      // console.warn('Not in editing mode')
    }
  }

  onInitNewRow(e: any) {
    e.data.status = 1
  }

  protected onToolbarPreparing(e: any) {
    //  this.listLoading = true;

    // Left most panel
    const groupPanel = e.toolbarOptions.items.find(
      (item: any) => item.name === 'groupPanel'
    )

    // clear filter button
    const clearFilterButton = {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'filter',

        text: 'Clear Filter',
        onClick: () => {
          this.clearFilter()
          this.clearFilterTriggered = true
        }
      }
    }

    // search element
    const searchOption = e.toolbarOptions.items.find(
      (item: any) => item.name === 'searchPanel'
    )

    // insert button
    const addOption = e.toolbarOptions.items.find(
      (item: any) => item.name === 'addRowButton'
    )

    // column chooser button
    const columnChooserButton = e.toolbarOptions.items.find(
      (item: any) => item.name === 'columnChooserButton'
    )

    // export button
    const exportButton = e.toolbarOptions.items.find(
      (item: any) => item.name === 'exportButton'
    )
    try {
      const newToolbarItems = []

      // change positions
      // verify availability before pushing

      if (columnChooserButton) {
        newToolbarItems.push(columnChooserButton)
      }

      if (clearFilterButton) {
        newToolbarItems.push(clearFilterButton)
      }
      if (searchOption) {
        newToolbarItems.push(searchOption)
      }
      if (groupPanel) {
        newToolbarItems.push(groupPanel)
      }

      if (addOption) {
        newToolbarItems.push(addOption)
      }

      newToolbarItems.push(exportButton)

      // replace the current toolbar with the new one
      e.toolbarOptions.items = newToolbarItems
      //   this.listLoading = false;
    } catch (e) {
      console.log(e)
    }
  }

  created() {
    this.getLookups()
  }

  mounted() {
    this.initFilter()
  }

  @Watch('driverId')
  OnDriverIdChange(val: string, oldVal: string) {
    console.log(
      `[vueDevex mixin] driver id props changed from ${oldVal} to ${val}`
    )
    if (val) {
      this.filterByDriver()
    } else {
      this.clearFilter()
    }
  }
}
