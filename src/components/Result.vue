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
        <el-button type="primary" icon="el-icon-document" @click="saveToFirestore()">Save</el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
        <el-button type="primary" icon="el-icon-download" @click="capture()">.PNG</el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
        <el-button type="primary" icon="el-icon-download" @click="exportExcel()">.XLSX</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="保存しました！"
      :visible.sync="saveDialogVisible"
      width="30%"
      center>
      <span>ログイン後、右上の保存一覧からいつでもこのアイデアを確認できます。ログインしないで使っている場合は、ブラウザを閉じるかログアウトボタンを押すと消えてしまいます。ご注意ください。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import firebase from 'firebase/app'

export default {
  data () {
    return {
      tableData: [{
        result_theme: this.$store.getters.theme,
        result_some: this.$store.getters.some
      }],
      ideaData: this.$store.state.associates,
      saveDialogVisible: false
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
    },
    saveToFirestore: function () {
      var db = firebase.firestore()
      var currentUid = this.$store.getters.userData.uid
      db.collection(currentUid).add(this.$store.getters.allData)
        .then(function (docRef) {
          this.saveDialogVisible = true
        }.bind(this))
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
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
