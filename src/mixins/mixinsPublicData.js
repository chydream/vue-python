const mixinsPublicData = {
  data () {
    return {
      stageArr: [],
      stageArrBySchool: [],
      schoolYearArr: [],
      currentSchoolYearId: ''
    }
  },
  mounted () {
    // this.getStageList()
    // this.getShoolYear()
  },
  methods: {
    // 获取学段列表
    getStageList (schoolId) {
      this.tableLoading = true
      var params = {
        page: 1,
        limit: 1000,
        schoolId: schoolId
      }
      this.$store.dispatch('publicData/SchoolStagesGet', params).then(res => {
        // console.log(res)
        this.stageArr = res.data
        this.tableLoading = false
      })
    },
    // 获取指定学校的学段列表
    getStageListBySchool (schoolId) {
      this.tableLoading = true
      var params = {
        page: 1,
        limit: 1000,
        schoolId: schoolId
      }
      this.$store.dispatch('publicData/SchoolStagesGet', params).then(res => {
        // console.log(res)
        this.stageArrBySchool = res.data
        this.tableLoading = false
      })
    },
    // 获取年级列表
    getGrade (stageId) {
      var params = {
        page: 1,
        limit: 1000,
        name: '',
        stageId: stageId
      }
      return new Promise((resolve, reject) => {
        this.$store.dispatch('publicData/GradesGet', params).then(res => {
          resolve(res.data)
        })
      })
    },
    // 获取当前学年
    getShoolYear () {
      this.tableLoading = true
      var params = {
        page: 1,
        limit: 1000,
        name: ''
      }
      this.$store.dispatch('publicData/SchoolYearsGet', params).then(res => {
        this.schoolYearArr = res.data
        // var currentSchoolYearId = ''
        // this.schoolYearArr.forEach((item, index) => {
        //   if (item.isCurrent === 1) {
        //     currentSchoolYearId = item.id
        //     this.currentSchoolYearId = currentSchoolYearId
        //     if (this.$route.path == '/school-data/school-manage') {
        //       this.schoolYearId = this.currentSchoolYearId
        //     }
        //   }
        // })
        this.tableLoading = false
      })
    }
  }
}
export default mixinsPublicData
