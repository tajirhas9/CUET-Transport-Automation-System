<template>
  <div class="dashboard-editor-container">

    <panel-group @handle-set-line-chart-data="handleSetLineChartData" />

    <el-row :gutter="32">
      <el-col
        :xs="48"
        :sm="48"
        :lg="24"
      >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col
        :xs="48"
        :sm="48"
        :lg="24"
        style="text-align: center"
      >
        <p style="background-color: white; padding: 20px; text-align: center;">Today's Schedule</p>
        <today-schedule/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { BusModule } from '@/store/modules/bus'
import { DriverModule } from '@/store/modules/driver'
import 'echarts/theme/macarons.js' // Theme used in BarChart, LineChart, PieChart and RadarChart
import { Component, Vue } from 'vue-property-decorator'
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/PieChart.vue'
import TodaySchedule from './components/today-schedule.vue'

@Component({
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    PieChart,
    TodaySchedule
  }
})
export default class extends Vue {
  // TODO: not implemented yet
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSetLineChartData() {}
  private async init() {
    await BusModule.getBuses()
    await DriverModule.getDrivers()
  }

  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
