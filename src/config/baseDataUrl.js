// 基础数据中心接口
export const baseData = {
  // 地区管理
  areasGet: '/api/areas', // 根据条件查询地区(默认查询第一页每页二十条 )
  areasPost: '/api/areas', // 新增
  areasPatch: '/api/areas/{id}', // 修改
  areasDelete: '/api/areas/{id}', // 删除
  areasDeletePost: '/api/areas/ids', // 批量删除
  // 学校基础信息
  schoolsGet: '/api/schools', // 分页获取学校信息
  schoolsPost: '/api/schools', // 新增
  schoolsPatch: '/api/schools/{id}', // 修改
  schoolsDelete: '/api/schools/{id}', // 删除
  schoolsGetById: '/api/schools/schoolById/{id}', // 根据学校ID查询学校及学校扩展信息信息
  schoolsDeptsGet: '/api/schools/depts/{schoolId}', // 获取指定学校的部门
  schoolsDeptsTeachersGet: '/api/schoolDepts/teachers', // 获取指定学校部门的教职工
  schoolsDeletePost: '/api/schools/delete', // 根据ID批量删除
  schoolsGradesGet: '/api/schools/grades', // 获取指定学校的年级
  schoolsTeachersGet: '/api/schools/teachers', // 获取指定学校的教职工
  schoolUpGradeGet: '/api/schools/upGrade', // 一键升年级
  // 学校学段管理
  schoolStagesGet: '/api/schoolStages', // 获取学段列表
  schoolStagesPost: '/api/schoolStages', // 新增
  schoolStagesPatch: '/api/schoolStages/{id}', // 修改
  schoolStagesDelete: '/api/schoolStages/{id}', // 删除
  // 学生管理
  studentsGet: '/api/students', // 学生管理列表
  studentsPost: '/api/students', // 新增
  studentsPatch: '/api/students/{id}', // 修改
  studentsDelete: '/api/students/{id}', // 删除
  studentsGetById: '/api/students/{id}', // 通过id获取学生基本信息
  studentsDeletePost: '/api/students/ids', // 批量删除
  studentsDownloadTemplateGet: '/api/students/downloadTemplate', // 学生excel模板下载
  studentsImportPost: '/api/students/importStudent', // 批量导入学生信息
  studentsGenerateUserPost: '/api/students/generateUser', // 生成用户
  // 年级信息
  gradesGet: '/api/grades', // 年级信息列表
  gradesPost: '/api/grades', // 新增
  gradesPatch: '/api/grades/{id}', // 修改
  gradesDelete: '/api/grades/{id}', // 删除
  gradesDeletePost: '/api/grades/ids', // 批量删除
  // 教职工管理
  teachersGet: '/api/teachers', // 获取教师列表,默认查询第一页每页展示20条
  teachersPost: '/api/teachers', // 新增
  teachersPatch: '/api/teachers/{id}', // 修改
  teachersDelete: '/api/teachers/{id}', // 删除
  teachersGetById: '/api/teachers/teacherById/{id}', // 根据用户id获取教师信息
  teachersDeletePost: '/api/teachers/delete', // 根据ID批量删除
  teachersDownloadTemplateGet: '/api/teachers/downloadTemplate', // 教职工模板下载
  teachersImportPost: '/api/teachers/import', // 教职工批量导入
  // 班级信息
  classesGet: '/api/classes', // 分页获取班级信息
  classesPost: '/api/classes', // 新增
  classesPatch: '/api/classes/{id}', // 修改
  classesDelete: '/api/classes/{id}', // 删除
  classesDeletePost: '/api/classes/ids', // 批量删除
  // 科目信息
  subjectsGet: '/api/subjects', // 分页获取科目信息
  subjectsPost: '/api/subjects', // 新增
  subjectsPatch: '/api/subjects/{id}', // 修改
  subjectsDelete: '/api/subjects/{id}', // 删除
  subjectsDeletePost: '/api/subjects/ids', // 批量删除
  subjectsAllGet: '/api/subjects/all', // 获取全部科目(不分页)
  subjectsSchoolsGet: '/api/schools/subjects', // 获取指定学校开设的科目
  // 父母管理
  parentsGet: '/api/parents/condition', // 根据条件查询父母列表
  parentsPost: '/api/parents', // 新增
  parentsPatch: '/api/parents/{id}', // 修改
  studentsGetByPhoneNum: '/api/parents/students/{phoneNum}', // 根据父母电话查询学生列表
  parentsDelete: '/api/parents/{id}', // 删除
  parentsGetByStudentId: '/api/students/parents/{studentId}', // 获取指定学生的家长
  parentsDeletePost: '/api/parents/ids', // 批量删除家长
  parentsGetById: '/api/parents/{id}', // 获取指定id的家长
  parentsUnlinkDelete: '/api/parents/unlink', // 解除与学生的绑定
  parentsGetByPhone: '/api/parents/relevance', // 查询家长和学生的绑定情况
  parentsLinkPost: '/api/parents/link', // 学生和家长绑定
  // 教育局或教育集团
  eduBureausGet: '/api/eduBureaus', // 教育局列表
  eduBureausPost: '/api/eduBureaus', // 新增
  eduBureausDeletePost: '/api/eduBureaus/delete', // 根据ID批量删除
  eduBureausPatch: '/api/eduBureaus/{id}', // 修改
  eduBureausSchoolsGet: '/api/eduBureaus/schools', // 获取指定教育局的学校
  eduBureausGetById: '/api/eduBureaus/{id}', // 根据教育局ID查询教育局信息
  eduBureausDelete: '/api/eduBureaus/{id}', // 删除
  // 教育局部门管理
  eduBureauDeptsGet: '/api/eduBureauDepts', // 分页获取教育局部门信息
  eduBureauDeptsPost: '/api/eduBureauDepts', // 新增
  eduBureauDeptsPatch: '/api/eduBureauDepts/{id}', // 修改
  eduBureauDeptsEmpsGet: '/api/eduBureauDepts/emps', // 获取指定教育局的职工
  eduBureauDeptsDelete: '/api/eduBureauDepts/{id}', // 删除
  // 数据字典值
  dictionaryValuesGet: '/api/dictionaryValues', // 获取数据字典值列表
  dictionaryValuesPost: '/api/dictionaryValues', // 新增
  dictionaryValuesDeletePost: '/api/dictionaryValues/ids', // 批量删除
  dictionaryValuesGetById: '/api/dictionaryValues/{id}', // 根据id获取字典值
  dictionaryValuesDelete: '/api/dictionaryValues/{id}', // 删除
  dictionaryValuesPatch: '/api/dictionaryValues/{id}', // 修改
  // 数据字典类目
  dictionaryCategoriesGet: '/api/dictionaryCategories', // 根据条件查询字典类目(分页)
  dictionaryCategoriesPost: '/api/dictionaryCategories', // 新增
  dictionaryCategoriesDeletePost: '/api/dictionaryCategories/ids', // 批量删除
  dictionaryCategoriesGetById: '/api/dictionaryCategories/{id}', // 通过id查询字典类目
  dictionaryCategoriesDelete: '/api/dictionaryCategories/{id}', // 删除
  dictionaryCategoriesPatch: '/api/dictionaryCategories/{id}', // 修改
  dictionaryCategoriesGetByaName: '/api/dictionaryCategories/categoryValues/{categoryName}', // 通过类目名称查询类目值
  dictionaryCategoriesGetByCode: '/api/dictionaryCategories/categoryValues/getByCode/{categoryCode}', // 通过类目code查询类目值
  // 学年管理
  schoolYearsGet: '/api/schoolYears', // 获取学年列表
  schoolYearsPost: '/api/schoolYears', // 新增
  schoolYearsClassGetById: '/api/schoolYears/class/{id}', // 获取指定学年的班级
  schoolYearsGetById: '/api/schoolYears/{id}', // 获取指定id的学年
  schoolYearsDelete: '/api/schoolYears/{id}', // 删除
  schoolYearsPatch: '/api/schoolYears/{id}', // 修改学年信息
  // 学界管理
  schoolPeriodsGet: '/api/schoolPeriods', // 获取学届列表
  schoolPeriodsPost: '/api/schoolPeriods', // 新增
  schoolPeriodsGetById: '/api/schoolPeriods/{id}', // 获取指定id的学届
  schoolPeriodsDelete: '/api/schoolPeriods/{id}', // 删除
  schoolPeriodsDeletePost: '/api/schoolPeriods/ids', // 批量删除
  schoolPeriodsPatch: '/api/schoolPeriods/{id}', // 修改学年信息
  // 教育局职工
  eduBureauEmpsGet: '/api/eduBureauEmps', // 分页获取BdcEduBureauEmp信息
  eduBureauEmpsPost: '/api/eduBureauEmps', // 新增
  eduBureauEmpsGetByUserId: '/api/eduBureauEmps/getByUserId/{userId}', // 获取指定userId的教育局职工(精准查询)
  eduBureauEmpsGetByUserName: '/api/eduBureauEmps/getByUserName/{userName}', // 获取指定userName的教育局职工(精准查询)
  eduBureauEmpsGetById: '/api/eduBureauEmps/{id}', // 根据职工ID查询教育局职工及教育局职工扩展信息信息
  eduBureauEmpsPatch: '/api/eduBureauEmps/{id}', // 修改
  eduBureauEmpsDelete: '/api/eduBureauEmps/{id}', // 删除
  eduBureauEmpsDeletePost: '/api/eduBureauEmps/delete', // 批量删除
  eduBureauEmpsDownloadTemplateGet: '/api/eduBureauEmps/downloadTemplate', // 教育局职工模板下载
  eduBureauEmpsImportPost: '/api/eduBureauEmps/import', // 教育局职工批量导入
  // 学校部门管理
  schoolDeptsPost: '/api/schoolDepts', // 新增
  schoolDeptsPatch: '/api/schoolDepts/{id}', // 修改
  schoolDeptsDelete: '/api/schoolDepts/{id}', // 删除
  schoolDeptsDeletePost: '/api/schoolDepts/delete', // 批量删除
  // 学期管理
  schoolTermsGet: '/api/schoolTerms', // 获取全部学期列表
  schoolTermsPost: '/api/schoolTerms', // 新增
  schoolTermsPatch: '/api/schoolTerms/{id}', // 修改
  schoolTermsDelete: '/api/schoolTerms/{id}' // 删除
}

// 基础数据中心接口权限
export const baseDataPermission = {
  // 地区管理
  areasGet: 'areas:get/api/areas', // 根据条件查询地区(默认查询第一页每页二十条 )
  areasPost: 'areas:post/api/areas', // 新增
  areasPatch: 'areas:patch/api/areas/{id}', // 修改
  areasDelete: 'areas:delete/api/areas/{id}', // 删除
  areasDeletePost: 'areas:post/api/areas/ids', // 批量删除
  // 学校基础信息
  schoolsGet: 'schools:get/api/schools', // 分页获取学校信息
  schoolsPost: 'schools:post/api/schools', // 新增
  schoolsPatch: 'schools:patch/api/schools/{id}', // 修改
  schoolsDelete: 'schools:delete/api/schools/{id}', // 删除
  schoolsGetById: 'schools:get/api/schools/{id}', // 获取指定Id的学校
  schoolsDeptsGet: 'schools:get/api/schools/depts/{schoolId}', // 获取指定学校的部门
  schoolsDeptsTeachersGet: 'schools:get/api/schoolDepts/teachers', // 获取指定学校部门的教职工
  schoolsDeletePost: 'schools:post/api/schools/delete', // 根据ID批量删除
  schoolsGradesGet: 'schools:get/api/schools/grades', // 获取指定学校的年级
  schoolsTeachersGet: 'schools:get/api/schools/teachers', // 获取指定学校的教职工
  schoolUpGradeGet: 'schools:get/api/schools/upGrade', // 一键升年级
  // 学校学段管理
  schoolStagesGet: 'schoolStages:get/api/schoolStages', // 获取学段列表
  schoolStagesPost: 'schoolStages:post/api/schoolStages', // 新增
  schoolStagesPatch: 'schoolStages:patch/api/schoolStages/{id}', // 修改
  schoolStagesDelete: 'schoolStages:delete/api/schoolStages/{id}', // 删除
  // 学生管理
  studentsGet: 'students:get/api/students', // 学生管理
  studentsPost: 'students:post/api/students', // 新增
  studentsPatch: 'students:patch/api/students/{id}', // 修改
  studentsDelete: 'students:delete/api/students/{id}', // 删除
  studentsGetById: 'students:get/api/students/{id}', // 通过id获取学生基本信息
  studentsDeletePost: 'students:post/api/students/ids', // 批量删除
  studentsDownloadTemplateGet: 'students:get/api/students/downloadTemplate', // 学生excel模板下载
  studentsImportPost: 'students:post/api/students/importStudent', // 批量导入学生信息
  studentsGenerateUserPost: 'students:post/api/students/generateUser', // 生成用户
  // 年级信息
  gradesGet: 'grades:get/api/grades', // 学生管理
  gradesPost: 'grades:post/api/grades', // 新增
  gradesPatch: 'grades:patch/api/grades/{id}', // 修改
  gradesDelete: 'grades:delete/api/grades/{id}', // 删除
  gradesDeletePost: 'grades:post/api/grades/ids', // 批量删除
  // 教职工管理
  teachersGet: 'teachers:get/api/teachers', // 获取教师列表,默认查询第一页每页展示20条
  teachersPost: 'teachers:post/api/teachers', // 新增
  teachersPatch: 'teachers:patch/api/teachers/{id}', // 修改
  teachersDelete: 'teachers:delete/api/teachers/{id}', // 删除
  teachersGetById: 'teachers:get/api/teachers/{id}', // 根据用户id获取教师信息
  teachersDeletePost: 'teachers:post/api/teachers/delete', // 根据ID批量删除
  teachersDownloadTemplateGet: 'teachers:get/api/teachers/downloadTemplate', // 教职工模板下载
  teachersImportPost: 'teachers:post/api/teachers/import', // 教职工批量导入
  // 班级信息
  classesGet: 'classes:get/api/classes', // 分页获取班级信息
  classesPost: 'classes:post/api/classes', // 新增
  classesPatch: 'classes:patch/api/classes/{id}', // 修改
  classesDelete: 'classes:delete/api/classes/{id}', // 删除
  classesDeletePost: 'classes:post/api/classes/ids', // 批量删除
  // 科目信息
  subjectsGet: 'subjects:get/api/subjects', // 分页获取科目信息
  subjectsPost: 'subjects:post/api/subjects', // 新增
  subjectsPatch: 'subjects:patch/api/subjects/{id}', // 修改
  subjectsDelete: 'subjects:delete/api/subjects/{id}', // 删除
  subjectsAllGet: 'subjects:get/api/subjects/all', // 获取全部科目(不分页)
  subjectsSchoolsGet: 'subjects:get/api/schools/subjects', // 获取指定学校开设的科目
  subjectsDeletePost: 'subjects:post/api/subjects/ids', // 批量删除
   // 父母管理
  parentsGet: 'parents:get/api/parents/condition', // 根据条件查询父母列表
  parentsPost: 'parents:post/api/parents', // 新增
  parentsPatch: 'parents:patch/api/parents/{id}', // 修改
  studentsGetByPhoneNum: 'parents:get/api/parents/students/{phoneNum}', // 根据父母电话查询学生列表
  parentsDelete: 'parents:delete/api/parents/{id}', // 删除
  parentsGetByStudentId: 'parents:get/api/students/parents/{studentId}', // 获取指定学生的家长
  parentsDeletePost: 'parents:post/api/parents/ids', // 批量删除家长
  parentsGetById: 'parents:get/api/parents/{id}', // 获取指定id的家长
  parentsUnlinkDelete: 'parents:delete/api/parents/unlink', // 解除与学生的绑定
  parentsGetByPhone: 'parents:get/api/parents/relevance', // 查询家长和学生的绑定情况
  parentsLinkPost: 'parents:post/api/parents/link', // 学生和家长绑定
  // 教育局或教育集团
  eduBureausGet: 'eduBureaus:get/api/eduBureaus', // 教育局列表
  eduBureausPost: 'eduBureaus:post/api/eduBureaus', // 新增
  eduBureausDeletePost: 'eduBureaus:post/api/eduBureaus/delete', // 根据ID批量删除
  eduBureausPatch: 'eduBureaus:patch/api/eduBureaus/{id}', // 修改
  eduBureausSchoolsGet: 'eduBureaus:get/api/eduBureaus/schools', // 获取指定教育局的学校
  eduBureausGetById: 'eduBureaus:get/api/eduBureaus/{id}', // 根据教育局ID查询教育局信息
  eduBureausDelete: 'eduBureaus:delete/api/eduBureaus/{id}', // 删除
  // 教育局部门管理
  eduBureauDeptsGet: 'eduBureauDepts:get/api/eduBureauDepts', // 分页获取教育局部门信息
  eduBureauDeptsPost: 'eduBureauDepts:post/api/eduBureauDepts', // 新增
  eduBureauDeptsPatch: 'eduBureauDepts:patch/api/eduBureauDepts/{id}', // 修改
  eduBureauDeptsEmpsGet: 'eduBureauDepts:get/api/eduBureauDepts/emps', // 获取指定教育局的职工
  eduBureauDeptsDelete: 'eduBureauDepts:delete/api/eduBureauDepts/{id}', // 删除
  // 数据字典值
  dictionaryValuesGet: 'dictionaryValues:get/api/dictionaryValues', // 获取数据字典值列表
  dictionaryValuesPost: 'dictionaryValues:post/api/dictionaryValues', // 新增
  dictionaryValuesDeletePost: 'dictionaryValues:post/api/dictionaryValues/ids', // 批量删除
  dictionaryValuesGetById: 'dictionaryValues:get/api/dictionaryValues/{id}', // 根据id获取字典值
  dictionaryValuesDelete: 'dictionaryValues:delete/api/dictionaryValues/{id}', // 删除
  dictionaryValuesPatch: 'dictionaryValues:patch/api/dictionaryValues/{id}', // 修改
  // 数据字典类目
  dictionaryCategoriesGet: 'dictionaryCategories:get/api/dictionaryCategories', // 根据条件查询字典类目(分页)
  dictionaryCategoriesPost: 'dictionaryCategories:post/api/dictionaryCategories', // 新增
  dictionaryCategoriesDeletePost: 'dictionaryCategories:post/api/dictionaryCategories/ids', // 批量删除
  dictionaryCategoriesGetById: 'dictionaryCategories:get/api/dictionaryCategories/{id}', // 通过id查询字典类目
  dictionaryCategoriesDelete: 'dictionaryCategories:delete/api/dictionaryCategories/{id}', // 删除
  dictionaryCategoriesPatch: 'dictionaryCategories:patch/api/dictionaryCategories/{id}', // 修改
  dictionaryCategoriesGetByaName: 'dictionaryCategories:get/api/dictionaryCategories/categoryValues/{categoryName}', // 通过类目名称查询类目值
  dictionaryCategoriesGetByCode: 'dictionaryCategories:get/api/dictionaryCategories/categoryValues/getByCode/{categoryCode}', // 通过类目code查询类目值
  // 学年管理
  schoolYearsGet: 'schoolYears:get/api/schoolYears', // 获取学年列表
  schoolYearsPost: 'schoolYears:post/api/schoolYears', // 新增
  schoolYearsClassGetById: 'schoolYears:get/api/schoolYears/class/{id}', // 获取指定学年的班级
  schoolYearsGetById: 'schoolYears:get/api/schoolYears/{id}', // 获取指定id的学年
  schoolYearsDelete: 'schoolYears:delete/api/schoolYears/{id}', // 删除
  schoolYearsPatch: 'schoolYears:patch/api/schoolYears/{id}', // 修改学年信息
  // 学界管理
  schoolPeriodsGet: 'schoolPeriods:get/api/schoolPeriods', // 获取学届列表
  schoolPeriodsPost: 'schoolPeriods:post/api/schoolPeriods', // 新增
  schoolPeriodsGetById: 'schoolPeriods:get/api/schoolPeriods/{id}', // 获取指定id的学届
  schoolPeriodsDelete: 'schoolPeriods:delete/api/schoolPeriods/{id}', // 删除
  schoolPeriodsDeletePost: 'schoolPeriods:post/api/schoolPeriods/ids', // 批量删除
  schoolPeriodsPatch: 'schoolPeriods:patch/api/schoolPeriods/{id}', // 修改学年信息
  // 教育局职工
  eduBureauEmpsGet: 'eduBureauEmps:get/api/eduBureauEmps', // 分页获取BdcEduBureauEmp信息
  eduBureauEmpsPost: 'eduBureauEmps:post/api/eduBureauEmps', // 新增
  eduBureauEmpsGetByUserId: 'eduBureauEmps:get/api/eduBureauEmps/getByUserId/{userId}', // 获取指定userId的教育局职工(精准查询)
  eduBureauEmpsGetByUserName: 'eduBureauEmps:get/api/eduBureauEmps/getByUserName/{userName}', // 获取指定userName的教育局职工(精准查询)
  eduBureauEmpsGetById: 'eduBureauEmps:get/api/eduBureauEmps/{id}', // 根据职工ID查询教育局职工及教育局职工扩展信息信息
  eduBureauEmpsPatch: 'eduBureauEmps:patch/api/eduBureauEmps/{id}', // 修改
  eduBureauEmpsDelete: 'eduBureauEmps:delete/api/eduBureauEmps/{id}', // 删除
  eduBureauEmpsDeletePost: 'eduBureauEmps:post/api/eduBureauEmps/delete', // 批量删除
  eduBureauEmpsDownloadTemplateGet: 'eduBureauEmps:get/api/eduBureauEmps/downloadTemplate', // 教育局职工模板下载
  eduBureauEmpsImportPost: 'eduBureauEmps:post/api/eduBureauEmps/import', // 教育局职工批量导入
  // 学校部门管理
  schoolDeptsPost: 'schoolDepts:post/api/schoolDepts', // 新增
  schoolDeptsPatch: 'schoolDepts:patch/api/schoolDepts/{id}', // 修改
  schoolDeptsDelete: 'schoolDepts:delete/api/schoolDepts/{id}', // 删除
  schoolDeptsDeletePost: 'schoolDepts:post/api/schoolDepts/delete', // 批量删除
  // 学期管理
  schoolTermsGet: 'schoolTerms:get/api/schoolTerms', // 获取全部学期列表
  schoolTermsPost: 'schoolTerms:post/api/schoolTerms', // 新增
  schoolTermsPatch: 'schoolTerms:patch/api/schoolTerms/{id}', // 修改
  schoolTermsDelete: 'schoolTerms:delete/api/schoolTerms/{id}' // 删除
}
