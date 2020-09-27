<template>
  <div class="faculty-edit">
    <!-- 编辑弹窗 -->
    <!-- <cvue-dialog
      :dialogVisible="true"
      :dialogLoading="dialogLoading"
      :title="title"
      dialogWidth="800px"
      :isFullscreen="false"
      @handleOpen="getDetail"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
      @handleClose="handleClose"> -->
      <div class="dialog-body" slot="dialogBody">
        <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="130px"
              class="demo-ruleForm">
          <el-tabs type="card" v-loading="dialogLoading">
            <el-tab-pane label="基本信息">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="学校" prop="schoolName">
                    <el-input v-model.trim="schoolName" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工号" prop="empNumber">
                    <el-input v-model.trim="ruleForm.empNumber" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否在编" prop="permanentEmpFlag">
                    <el-radio-group v-model="ruleForm.permanentEmpFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证类型" prop="idTypeCode">
                    <el-select v-model="ruleForm.idTypeCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in IdCardType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号码" prop="idNumber">
                    <el-input v-model.trim="ruleForm.idNumber" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号码" prop="cellphoneNum">
                    <el-input v-model.trim="ruleForm.cellphoneNum" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="margin-bottom:2px;">
                  <el-form-item label="部门" prop="deptNames">
                    <el-input v-model.trim="ruleForm.deptNames" :disabled="true">
                      <el-button slot="append" @click="selectDept">选择</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学科" prop="subjectName">
                    <el-input placeholder="" v-model="ruleForm.subjectName" :disabled="true">
                      <el-button slot="append" @click="selectSubject">选择</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="班级" prop="className">
                    <el-input placeholder="" v-model="ruleForm.className" :disabled="true">
                      <el-button slot="append" @click="selectClass">选择</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="$route.query.eduBureauId != '8823f1994cd149009d5bdc6fd95cf4e8' && $route.query.actionType == 'edit'">
                  <el-form-item label-width="60px" style="margin-top:30px;">
                    <span style="color:#999;">* 修改手机号码将自动同步修改用户名，并重置登录密码</span>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="头像地址" prop="headImgUrl">
                    <el-input v-model.trim="ruleForm.headImgUrl" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col> -->
                <!-- <el-col :span="12">
                  <el-form-item label="老师用户名" prop="userName">
                    <el-input v-model.trim="ruleForm.userName" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="扩展信息">
              <el-row :gutter="20" :style="{height:height}" class="tab-el-row">
                <el-col :span="8">
                  <el-form-item label="曾用名" prop="formerName">
                    <el-input v-model.trim="ruleForm.formerName" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="国籍/地区" prop="nationalityCode">
                    <el-select v-model="ruleForm.nationalityCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in Nationality"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯" prop="nativePlace">
                    <el-input v-model.trim="ruleForm.nativePlace" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期" prop="birthDate">
                    <el-date-picker v-model="ruleForm.birthDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生地" prop="birthPlace">
                    <el-input v-model.trim="ruleForm.birthPlace" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="民族" prop="nationCode">
                    <el-select v-model="ruleForm.nationCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in ChineseNationality"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历" prop="eduBackgroundCode">
                    <!-- <el-select v-model="ruleForm.eduBackgroundCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in EduBackground"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.eduBackgroundCode"
                        :options="EduBackground"
                        :props="propsOption"
                        :show-all-levels="false"
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学位" prop="academicDegreeCode">
                    <el-select v-model="ruleForm.academicDegreeCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in AcademicDegree"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职称" prop="positionTitleCode">
                    <!-- <el-select v-model="ruleForm.positionTitleCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in PositionTitle"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.positionTitleCode"
                        :options="PositionTitle"
                        :props="propsOption"
                        :show-all-levels="false"
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业学校" prop="graduationSchool">
                    <el-input v-model.trim="ruleForm.graduationSchool" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学制" prop="schoolingLengthCode">
                    <el-select v-model="ruleForm.schoolingLengthCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in SchoolingLength"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所学专业" prop="specialty">
                    <el-input v-model.trim="ruleForm.specialty" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入学年月" prop="enrolmentDate">
                    <el-date-picker v-model="ruleForm.enrolmentDate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业年月" prop="graduationDate">
                    <el-date-picker v-model="ruleForm.graduationDate" type="month" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="政治面貌" prop="politicalStatusCode">
                    <el-select v-model="ruleForm.politicalStatusCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in PoliticalStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="婚姻状况" prop="maritalStatusCode">
                    <!-- <el-select v-model="ruleForm.maritalStatusCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in MaritalStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.maritalStatusCode"
                        :options="MaritalStatus"
                        :props="propsOption"
                        :show-all-levels="false"
                        change-on-select
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="健康状况" prop="healthStatusCode">
                    <el-select v-model="ruleForm.healthStatusCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in HealthStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>  
                <el-col :span="8">
                  <el-form-item label="邮政编码" prop="postalCode">
                    <el-input v-model.trim="ruleForm.postalCode" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家庭住址" prop="familyAddress">
                    <el-input v-model.trim="ruleForm.familyAddress" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="现居住地址" prop="residentAddress">
                    <el-input v-model.trim="ruleForm.residentAddress" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="通信地址" prop="commAddress">
                    <el-input v-model.trim="ruleForm.commAddress" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职务" prop="jobPosition">
                    <el-input v-model.trim="ruleForm.jobPosition" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="联系电话" prop="contactPhoneNum">
                    <el-input v-model.trim="ruleForm.contactPhoneNum" :disabled="disabled" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model.trim="ruleForm.email" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="人员状态" prop="personStatusCode">
                    <!-- <el-select v-model="ruleForm.personStatusCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in PersonStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.personStatusCode"
                        :options="PersonStatus"
                        :props="propsOption"
                        :show-all-levels="false"
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办公电话" prop="officePhoneNum">
                    <el-input v-model.trim="ruleForm.officePhoneNum" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="其它联系方式" prop="otherContactWay">
                    <el-input v-model.trim="ruleForm.otherContactWay" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参加工作年月" prop="firstJobBeginDate">
                    <el-date-picker v-model="ruleForm.firstJobBeginDate" type="month" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="教职工来源" prop="teacherSourceCode">
                    <!-- <el-select v-model="ruleForm.teacherSourceCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in TeacherSource"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.teacherSourceCode"
                        :options="TeacherSource"
                        :props="propsOption"
                        :show-all-levels="false"
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用人形式" prop="employModeCode">
                    <el-select v-model="ruleForm.employModeCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in EmployMode"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="进本校年月" prop="joinThisSchoolDate">
                    <el-date-picker v-model="ruleForm.joinThisSchoolDate" type="month" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="教职工类别" prop="teacherTypeCode">
                    <!-- <el-select v-model="ruleForm.teacherTypeCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in TeacherType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                        style="width:100%"
                        v-model="ruleForm.teacherTypeCode"
                        :options="TeacherType"
                        :props="propsOption"
                        :show-all-levels="false"
                        clearable></el-cascader>
                  </el-form-item>
                </el-col>    
                <el-col :span="8">
                  <el-form-item label="签订合同情况" prop="contractTypeCode">
                    <el-select v-model="ruleForm.contractTypeCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in ContractType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否全日制师范类专业毕业" prop="fulltimeNormalSchoolGraduateFlag">
                    <el-radio-group v-model="ruleForm.fulltimeNormalSchoolGraduateFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否特级教师" prop="specialGradeTeacherFlag">
                    <el-radio-group v-model="ruleForm.specialGradeTeacherFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否受过特教专业培养培训" prop="trainedForSpecialEduFlag">
                    <el-radio-group v-model="ruleForm.trainedForSpecialEduFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否属于免费（公费）师范生" prop="govFundsNormalSchoolStudentFlag">
                    <el-radio-group v-model="ruleForm.govFundsNormalSchoolStudentFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否心理健康教育教师" prop="mentalHealthTeacherFlag">
                    <el-radio-group v-model="ruleForm.mentalHealthTeacherFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否有特殊教育从业证书" prop="hasSpecialEduEmpCertifFlag">
                    <el-radio-group v-model="ruleForm.hasSpecialEduEmpCertifFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>  
                <el-col :span="8">
                  <el-form-item label="是否参加基层服务项目" prop="joinBasicServiceProjectFlag">
                    <el-radio-group v-model="ruleForm.joinBasicServiceProjectFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否县级及以上骨干教师" prop="countyLevelPlusCoreTeacherFlag">
                    <el-radio-group v-model="ruleForm.countyLevelPlusCoreTeacherFlag">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="margin-bottom:40px;">
                  <el-form-item label="信息技术能力" prop="infoTechAbilityCode">
                    <el-select v-model="ruleForm.infoTechAbilityCode" placeholder="请选择" style="width:100%" clearable :disabled="disabled">
                      <el-option
                        v-for="item in InfoTechAbility"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="面部图片" prop="faceImgUrl">
                    <el-input v-model.trim="ruleForm.faceImgUrl" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="参加基层服务项目起始年月" prop="basicServiceProjectBeginDate">
                    <el-date-picker v-model="ruleForm.basicServiceProjectBeginDate" type="month" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参加基层服务项目结束年月" prop=" basicServiceProjectEndDate">
                    <el-date-picker v-model="ruleForm.basicServiceProjectEndDate" type="month" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="简介" prop="profile">
                    <!-- <el-input v-model.trim="ruleForm.profile" :disabled="disabled" type="textarea"></el-input> -->
                    <div ref="editorPCEdit" class="editor"></div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <div class="sub-btn" v-if="!dialogLoading">
          <el-button @click="closeDialog">取消</el-button>
          <el-button @click="confirmDialog" type="primary">确定</el-button>
        </div>
      </div>
    <!-- </cvue-dialog> -->
    <faculty-edit-subject
      @closeSecDialog="closeSecDialog('edit')"
      @confirmSecDialog="confirmSecDialog('edit')"
      @handleSecClose="closeSecDialog('edit')"
      v-if="dialogSubjectEdit"
      :dialogVisible="dialogSubjectEdit">
    </faculty-edit-subject>
    <faculty-edit-class
      @closeSecDialog="closeSecDialog('editClass')"
      @confirmSecDialog="confirmSecDialog('editClass')"
      @handleSecClose="closeSecDialog('editClass')"
      v-if="dialogClassEdit"
      :dialogVisible="dialogClassEdit">
    </faculty-edit-class>
    <faculty-edit-depts
      @closeSecDialog="closeSecDialog('editDepts')"
      @confirmSecDialog="confirmSecDialog('editDepts')"
      @handleSecClose="closeSecDialog('editDepts')"
      v-if="dialogDeptsEdit"
      :dialogVisible="dialogDeptsEdit">
    </faculty-edit-depts>
  </div>
</template>
<script>
import cvueDialog from '@/components/cvue-dialog'
import { validPhone, validIp, validPhone2, validEmail, validIdCard } from '@/util/validator.js'
import facultyEditSubject from './facultyEditSubject'
import facultyEditClass from './facultyEditClass'
import facultyEditDepts from './facultyEditDepts'
import mixinsPublicDict from '@/mixins/mixinsPublicDict'
import {getClientHeight} from '@/util/tool'
import E from 'wangeditor'
import { mapGetters } from 'vuex'
var editorPC
export default {
  name: 'facultyEdit',
  mixins: [mixinsPublicDict],
  components: {
    cvueDialog,
    facultyEditSubject,
    facultyEditClass,
    facultyEditDepts
  },
  data () {
    return {
      ruleForm: {
        cellphoneNum: '',
        deptIds: [],
        deptNames: '',
        empNumber: '',
        headImgUrl: '',
        idNumber: '',
        idTypeCode: '',
        name: '',
        permanentEmpFlag: 0,
        sex: 1,
        subjectIds: '',
        userId: '',
        userName: '',
        academicDegreeCode: '',
        basicServiceProjectBeginDate: '',
        basicServiceProjectEndDate: '',
        birthDate: '',
        birthPlace: '',
        commAddress: '',
        contactPhoneNum: '',
        contractTypeCode: '',
        countyLevelPlusCoreTeacherFlag: 0,
        eduBackgroundCode: [],
        email: '',
        employModeCode: '',
        enrolmentDate: '',
        faceImgUrl: '',
        familyAddress: '',
        firstJobBeginDate: '',
        formerName: '',
        fulltimeNormalSchoolGraduateFlag: 0,
        govFundsNormalSchoolStudentFlag: 0,
        graduationDate: '',
        graduationSchool: '',
        hasSpecialEduEmpCertifFlag: 0,
        healthStatusCode: '',
        infoTechAbilityCode: '',
        jobPosition: '',
        joinBasicServiceProjectFlag: 0,
        joinThisSchoolDate: '',
        maritalStatusCode: [],
        mentalHealthTeacherFlag: 0,
        nationCode: '',
        nationalityCode: '',
        nativePlace: '',
        officePhoneNum: '',
        otherContactWay: '',
        personStatusCode: [],
        politicalStatusCode: '',
        positionTitleCode: [],
        postalCode: '',
        profile: '',
        residentAddress: '',
        schoolingLengthCode: '',
        specialGradeTeacherFlag: 0,
        specialty: '',
        teacherSourceCode: [],
        teacherTypeCode: [],
        tenantId: '',
        trainedForSpecialEduFlag: 0,
        subjectName: '',
        className: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入教师用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        cellphoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        empNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        deptNames: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        // idNumber: [
        //   { required: true, message: '请输入身份证号码', trigger: 'blur' },
        //   { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        // ],
        // idTypeCode: [
        //   { required: true, message: '请选择身份证类型', trigger: 'blur' }
        // ],
        // subjectName: [
        //   { required: true, message: '请选择学科', trigger: 'blur' }
        // ],
        // className: [
        //   { required: true, message: '请选择班级', trigger: 'blur' }
        // ],
        contactPhoneNum: [
          { validator: validPhone2, trigger: 'blur' }
        ],
        email: [
          { validator: validEmail, trigger: 'blur' }
        ],
        idNumber: [
          { validator: validIdCard, trigger: 'blur' }
        ],
        jobPosition: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        nativePlace: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        familyAddress: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        residentAddress: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        commAddress: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        postalCode: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        birthPlace: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        graduationSchool: [
          { min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        specialty: [
          { min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        officePhoneNum: [
          { min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        otherContactWay: [
          { min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        formerName: [
          { min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
        // profile: [
        //   { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        // ]
      },
      disabled: false,
      dialogLoading: false,
      status: 1,
      editContentPC: '',
      treeData: [],
      propsOption: {
        label: 'name',
        value: 'code',
        multiple: true
      },
      treeResData: [],
      dialogSubjectEdit: false,
      dialogClassEdit: false,
      schoolName: '',
      selectSubjects: [],
      selectClasses: [],
      dialogDeptsEdit: false
    }
  },
  mounted () {
    // this.schoolName = this.$route.query.name
    // this.initEditer()
    // this.getEditDetail()
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = ''
      if (this.$route.query.actionType == 'add') {
        title = '新增'
      } else {
        title = '编辑'
      }
      return title
    },
    height () {
      var height = getClientHeight() - 350
      return height + 'px'
    },
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 关闭弹窗
    closeSecDialog (params) {
      if (params == 'edit') {
        this.dialogSubjectEdit = false
      }
      if (params == 'editClass') {
        this.dialogClassEdit = false
      }
      if (params == 'editDepts') {
        this.dialogDeptsEdit = false
      }
    },
    // 确认
    confirmSecDialog (params) {
      if (params == 'edit') {
        this.dialogSubjectEdit = false
      }
      if (params == 'editClass') {
        this.dialogClassEdit = false
      }
      if (params == 'editDepts') {
        this.dialogDeptsEdit = false
      }
    },
    selectSubject () {
      this.dialogSubjectEdit = true
    },
    selectClass () {
      this.dialogClassEdit = true
    },
    initEditer () {
      this.$nextTick(res => {
        editorPC = null
        if (!editorPC) {
          editorPC = new E(this.$refs.editorPCEdit)
          editorPC.customConfig.menus = [
            'head',
            'bold',
            'justify',
            'italic',
            'underline',
            'table',
            'undo',
            'redo' 
          ]
          editorPC.customConfig.uploadImgShowBase64 = true
          editorPC.create()
          editorPC.txt.html(this.editContentPC)
        }
      })
    },
    // 触发事件
    handleClose () {
      this.$emit('handleClose')
    },
    closeDialog () {
      // this.$emit('closeDialog')
      this.closeTagTo('/school-data/school-manage', true, {schoolId: this.$route.query.schoolId, name: this.$route.query.name, currentYearId: this.$route.query.currentYearId, eduBureauId: this.$route.query.eduBureauId})
    },
    confirmDialog () {
      // console.log(this.$route.query.schoolId)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var params
          var paramsArr = ['cellphoneNum', 'deptIds', 'deptNames', 'empNumber', 'headImgUrl', 'idNumber', 'idTypeCode', 'name', 'permanentEmpFlag', 'schoolId', 'sex', 'subjectIds']
          if (this.$route.query.actionType == 'add') {
            params = {}
            params.teacherExtend = {}
            params.id = ''
            params.schoolId = this.$route.query.schoolId
            params.userName = this.ruleForm.userName
            params.teacherClassMappings = this.selectClasses
            for (var x in this.ruleForm) {
              if (paramsArr.indexOf(x) > -1) {
                if (x == 'subjectIds') {
                  params[x] = this.selectSubjects
                } else {
                  params[x] = this.ruleForm[x]
                }
              } else {
                params.teacherExtend[x] = this.ruleForm[x]
                if (x == 'personStatusCode' || x == 'teacherTypeCode' || x == 'teacherSourceCode' || x == 'maritalStatusCode' || x == 'positionTitleCode' || x == 'eduBackgroundCode') {
                  params.teacherExtend[x] = this.ruleForm[x][this.ruleForm[x].length - 1]
                }
                if (x == 'profile') {
                  this.editContentPC = editorPC.txt.html()
                  params.teacherExtend[x] = encodeURI(this.editContentPC)
                }
              }
            }
            // console.log(params)
            this.dialogLoading = true
            this.$store.dispatch('schoolData/TeachersPost', params).then(res => {
              // console.log(res)
              this.$message({
                message: '新增成功',
                duration: 2000,
                type: 'success'
              })
              // this.$emit('confirmDialog')
              this.closeDialog()
              this.dialogLoading = false
            }).catch((err) => {
              this.dialogLoading = false
              this.$message({type: 'error', message: err.resp_msg})
            })
          } else {
            params = {}
            params.teacherExtend = {}
            params.id = this.$route.query.id
            params.userName = this.ruleForm.userName
            params.userId = this.ruleForm.userId
            params.schoolId = this.$route.query.schoolId
            params.teacherClassMappings = this.selectClasses
            for (var y in this.ruleForm) {
              if (paramsArr.indexOf(y) > -1) {
                if (y == 'subjectIds') {
                  params[y] = this.selectSubjects
                } else {
                  params[y] = this.ruleForm[y]
                }
              } else {
                params.teacherExtend[y] = this.ruleForm[y]
                if (y == 'personStatusCode' || y == 'teacherTypeCode' || y == 'teacherSourceCode' || y == 'maritalStatusCode' || y == 'positionTitleCode' || y == 'eduBackgroundCode') {
                  params.teacherExtend[y] = this.ruleForm[y][this.ruleForm[y].length - 1]
                }
                if (y == 'profile') {
                  this.editContentPC = editorPC.txt.html()
                  params.teacherExtend[y] = encodeURI(this.editContentPC)
                }
              }
            }
            this.dialogLoading = true
            this.$store.dispatch('schoolData/TeachersPatch', params).then(res => {
              // console.log(res)
              this.$message({
                message: '修改成功',
                duration: 2000,
                type: 'success'
              })
              // this.$emit('confirmDialog')
              this.closeDialog()
              this.dialogLoading = false
            }).catch((err) => {
              this.dialogLoading = false
              this.$message({type: 'error', message: err.resp_msg})
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDetail () {
    },
    getEditDetail () {
      if (this.$route.query.actionType == 'edit') {
        var params = {
          id: this.$route.query.id,
          schoolId: this.$route.query.schoolId
        }
        this.dialogLoading = true
        this.$store.dispatch('schoolData/TeachersGetById', params).then(res => {
          console.log(res)
          var paramsArr = ['cellphoneNum', 'deptIds', 'deptNames', 'empNumber', 'headImgUrl', 'idNumber', 'idTypeCode', 'name', 'permanentEmpFlag', 'schoolId', 'sex', 'subjectIds', 'userName']
          for (var x in this.ruleForm) {
            if (paramsArr.indexOf(x) > -1) {
              if (x == 'subjectIds') {
                this.selectSubjects = res[x]
                // console.log(this.selectSubjects)
              } else {
                this.$set(this.ruleForm, x, res[x])
              }
            } else {
              if (res.teacherExtend) {
                this.$set(this.ruleForm, x, res.teacherExtend[x])
                if (x == 'personStatusCode' || x == 'teacherTypeCode' || x == 'teacherSourceCode' || x == 'maritalStatusCode' || x == 'positionTitleCode' || x == 'eduBackgroundCode') {
                  var arr = this.getParentId(res.teacherExtend[x], x)
                  this.$set(this.ruleForm, x, arr)
                }
                if (x == 'profile') {
                  this.editContentPC = decodeURI(res.teacherExtend[x] == null ? '' : res.teacherExtend[x])
                  editorPC.txt.html(this.editContentPC)
                }
                // console.log(this.ruleForm.profile)
              }
            }
          }
          this.$set(this.ruleForm, 'subjectName', res.subjectNames)
          this.selectClasses = res.teacherClassMappings
          var name = []
          if (res.teacherClassMappings) {
            res.teacherClassMappings.forEach((item, index) => {
              name.push(item.className)
            })
          }
          this.$set(this.ruleForm, 'className', name.join())
          this.$set(this.ruleForm, 'userId', res.userId)
          this.dialogLoading = false
        }).catch((err) => {
          console.log(err)
          // this.$message({type: 'error', message: err.resp_msg})
        })
      }
    },
    selectDept () {
      this.dialogDeptsEdit = true
    }
  }
}
</script>
<style lang="scss">
.faculty-edit{
  background: #fff;
  position: relative;
  .tab-el-row{
    // height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-left: 0px!important;
    margin-right: 0px!important;
  }
  .cvue-dialog .dialog-body .dialog-body{
    padding: 15px;
  }
  .editor .w-e-text-container{
    height: 150px !important;
  }
  .sub-btn{
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 50px;
  }
}
</style>
