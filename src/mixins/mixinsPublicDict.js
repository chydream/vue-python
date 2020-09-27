const mixinsPublicDict = {
  data () {
    return {
      UrbanRuralType: [], // 城乡分类
      SchoolType: [], // 办学类型
      SchoolFounderType: [], // 学校举办者类型
      AttachedClassType: [], // 附设班类型
      PsSchoolingLength: [], // 小学学制
      JhsSchoolingLength: [], // 初中学制
      ShsSchoolingLength: [], // 高中学制
      LandPropertyRightType: [], // 土地产权类型
      BoardingType: [], // 寄宿制形式
      IdCardType: [], // 身份证类型
      ChineseLanguage: [], // 中国语种
      ChineseNationality: [], // 中国民族
      Nationality: [], // 国籍
      EduBackground: [], // 学历
      AcademicDegree: [], // 学位
      SchoolingLength: [], // 学制
      PositionTitle: [], // 职称
      PoliticalStatus: [], // 政治面貌
      MaritalStatus: [], // 婚姻状况
      HealthStatus: [], // 健康状况
      TeacherSource: [], // 教职工来源
      TeacherType: [], // 教职工类别
      EmployMode: [], // 用人形式
      ContractType: [], // 签订合同情况
      InfoTechAbility: [], // 信息技术能力
      PersonStatus: [], // 人员状态
      Alien: [], // 港澳台侨外
      HouseholdRegType: [], // 户口性质
      EnrolmentMode: [], // 入学方式
      StudyMode: [], // 就读方式
      StudentSource: [], // 学生来源
      DisabilityType: [], // 残疾人类型
      FollowStudyType: [], // 残疾人随班就读类型
      TransportMode: [], // 上下学交通方式
      LocationAdminDept: [], // 属地管理教育行政部门
      SubjectCategory: [], // 科目类型
      FamilyRelation: [], // 家庭关系
      studentSourceCodeData: [],
      personStatusCodeData: [],
      teacherTypeCodeData: [],
      teacherSourceCodeData: [],
      maritalStatusCodeData: [],
      positionTitleCodeData: [],
      eduBackgroundCodeData: [],
      schoolTypeCodeData: [], 
      propsOption: {
        label: 'name',
        value: 'id'
      }
    }
  },
  mounted () {
    this.getDictList('UrbanRuralType') // 城乡分类
    this.getDictList('SchoolType', 'tree') // 办学类型
    this.getDictList('SchoolFounderType') // 学校举办者类型
    this.getDictList('AttachedClassType') // 附设班类型
    this.getDictList('PsSchoolingLength') // 小学学制
    this.getDictList('JhsSchoolingLength') // 初中学制
    this.getDictList('ShsSchoolingLength') // 高中学制
    this.getDictList('LandPropertyRightType') // 土地产权类型
    this.getDictList('BoardingType') // 寄宿制形式
    this.getDictList('IdCardType') // 身份证类型
    this.getDictList('ChineseLanguage') // 中国语种
    this.getDictList('ChineseNationality') // 中国民族
    this.getDictList('Nationality') // 国籍
    this.getDictList('EduBackground', 'tree') // 学历
    this.getDictList('AcademicDegree') // 学位
    this.getDictList('SchoolingLength') // 学制
    this.getDictList('PositionTitle', 'tree')// 职称
    this.getDictList('PoliticalStatus') // 政治面貌
    this.getDictList('MaritalStatus', 'tree') // 婚姻状况
    this.getDictList('HealthStatus') // 健康状况
    this.getDictList('TeacherSource', 'tree') // 教职工来源
    this.getDictList('TeacherType', 'tree') // 教职工类别
    this.getDictList('EmployMode') // 用人形式
    this.getDictList('ContractType') // 签订合同情况
    this.getDictList('InfoTechAbility') // 信息技术能力
    this.getDictList('PersonStatus', 'tree') // 人员状态
    this.getDictList('Alien') // 港澳台侨外
    this.getDictList('HouseholdRegType') // 户口性质
    this.getDictList('EnrolmentMode') // 入学方式
    this.getDictList('StudyMode') // 就读方式
    this.getDictList('StudentSource', 'tree') // 学生来源
    this.getDictList('DisabilityType') // 残疾人类型
    this.getDictList('FollowStudyType') // 残疾人随班就读类型
    this.getDictList('TransportMode') // 上下学交通方式
    // this.getDictList('LocationAdminDept') // 属地管理教育行政部门
    this.getDictList('SubjectCategory') // 科目类型
    this.getDictList('FamilyRelation') //  家庭关系
  },
  methods: {
    // 获取字典列表
    getDictList (code, type) {
      var params = {
        categoryCode: code
      }
      this.$store.dispatch('publicData/DictionaryCategoriesGetByCode', params).then(res => {
        if (type == 'tree') {
          if (code == 'SchoolType') {
            this.schoolTypeCodeData = res.data
          }
          if (code == 'EduBackground') {
            this.eduBackgroundCodeData = res.data
          }
          if (code == 'PositionTitle') {
            this.positionTitleCodeData = res.data
          }
          if (code == 'MaritalStatus') {
            this.maritalStatusCodeData = res.data
          }
          if (code == 'TeacherSource') {
            this.teacherSourceCodeData = res.data
          }
          if (code == 'TeacherType') {
            this.teacherTypeCodeData = res.data
          }
          if (code == 'PersonStatus') {
            this.personStatusCodeData = res.data
          }
          if (code == 'StudentSource') {
            this.studentSourceCodeData = res.data
          }
          this[code] = this.getDictTree(res.data)
          this[code] = this.setTreeData(this[code])
          // console.log(this[code])
        } else {
          this[code] = res.data
        }
      })
    },
    // 递归树
    getDictTree (treeData) {
      for (var i = 0; i < treeData.length; i++) {
        treeData[i].children = []
        for (var j = 0; j < treeData.length; j++) {
          if (treeData[i].id == treeData[j].parentId) {
            treeData[i].children.push(treeData[j])
          }
        }
      }
      var arr = []
      for (i = 0; i < treeData.length; i++) {
        if (treeData[i].parentId == null) {
          arr.push(treeData[i])
        }
      }
      return arr
    },
    // 递归
    setTreeData (arr) { 
      arr.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          this.setTreeData(item.children)
        } else {
          item.children = null
        }
      })
      return arr
    },
    getParentId (code, codeName) {
      var self = this
      var idArr = []
      idArr.unshift(code)
      
      function getId (code) {
        self[codeName + 'Data'].forEach((item, index) => {
          if (item.code == code && item.parentId) {
            if (idArr.indexOf(item.code) < 0) {
              idArr.unshift(item.code)
            }
            self[codeName + 'Data'].forEach((it, ix) => {
              if (it.id == item.parentId) {
                idArr.unshift(it.code)
                getId(it.code) 
              }
            })
          }
        })
      }
      getId(code)
      return idArr
    },
    getParentById (id, code) {
      // console.log(this.treeResData)
      var idArr = []
      idArr.unshift(id)
      var self = this
      function getId (id) {
        // console.log(self[code + 'Data'])
        self[code + 'Data'].forEach((item, index) => {
          if (item.id == id && item.parentId) {
            idArr.unshift(item.parentId)
            getId(item.parentId) 
          }
        })
      }
      getId(id)
      return idArr
    }
  }
}
export default mixinsPublicDict
