<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card class="box-card" id="result">
          <div slot="header">
            <span class="bg-blue">Result</span>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="result_theme"
              label="テーマ">
            </el-table-column>
            <el-table-column
              prop="result_some"
              label="何か">
            </el-table-column>
          </el-table>
          <el-table
            :data="ideaData"
            border
            style="width: 100%">
            <el-table-column
              prop="associate"
              label="連想">
            </el-table-column>
            <el-table-column
              prop="idea"
              label="アイデア">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
        <el-button type="primary" icon="el-icon-download" @click="capture()">.PNG</el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
        <el-button type="primary" icon="el-icon-download" @click="exportExcel()">.XLSX</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
  data () {
    return {
      tableData: [{
        result_theme: this.$store.getters.theme,
        result_some: this.$store.getters.some
      }],
      ideaData: this.$store.state.associates
    }
  },
  methods: {
    capture: function () {
      html2canvas(document.querySelector('#result')).then(canvas => {
        var dataUrl = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        a.href = dataUrl
        a.download = this.$store.getters.theme + '.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    },
    exportExcel: function () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#result'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'excursion.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.bg-blue {
  color:#409EFF;
}
.el-table {
  margin-bottom:10px;
}
</style>
