<template>
  <div class="container">
    <!-- {{ orderData }} -->
    <div class="logo" style="display: flex; justify-content: center">
      <img
        v-show="platformId == 5 || platformId == 54 || platformId == 53"
        src="@/assets/images/uxiaoyuan.png"
        alt=""
      />
      <img v-show="platformId == 9" src="@/assets/images/welearn.png" alt="" />
    </div>
    <!-- {{ platformId }} -->

    <div class="step" v-show="step === 1">
      <Group title="基本信息" label-align="left" label-width="5rem">
        <!-- <selector
          v-model="schoolId"
          :value="schoolId"
          title="学 校"
          :options="schoolList"
        ></selector> -->
        <popup-radio
          title="平 台"
          :options="platformList"
          v-model="platformId"
          placeholder="请选择您的做题平台"
        ></popup-radio>
        <!-- <selector
          v-model="platformId"
          :value="platformId"
          title="平 台"
          :options="platformList"
        ></selector> -->
        <XInput
          type="number"
          pattern="[0-9]*"
          title="账    号"
          v-model="account"
          autofocus="autofocus"
          placeholder="请输入您的账号"
        ></XInput>
        <XInput
          type="password"
          title="密    码"
          v-model="password"
          placeholder="请输入您的密码"
        ></XInput>
        <cell title="做题范围">
          <checker
            type="radio"
            radio-required
            class="mode"
            v-model="openUnit"
            default-item-class="item"
            selected-item-class="item-selected"
          >
            <checker-item v-for="i in ['1', '2']" :key="i" :value="i">{{
              i == '2' ? '部分单元' : '做整本书'
            }}</checker-item>
          </checker></cell
        >
      </Group>
      <!-- <Group title="代刷模式">
        <checker
          type="radio"
          radio-required
          class="mode"
          v-model="openUnit"
          default-item-class="item"
          selected-item-class="item-selected"
        >
          <checker-item v-for="i in ['1', '2']" :key="i" :value="i">{{
            i == '2' ? '部分单元' : '做整本书'
          }}</checker-item>
        </checker>
      </Group> -->

      <XButton style="margin-top: 14px" type="primary" @click.native="query"
        >下一步</XButton
      >
    </div>
    <div class="step" v-show="step === 2">
      <div class="tips">请勾选您需要代做的课程</div>
      <div class="tree">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          @check-change="checkChange"
        >
        </el-tree>
      </div>
      <div class="buttons" style="display: flex">
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="pre()"
          >上一步</XButton
        >
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="next()"
          >下一步</XButton
        >
      </div>
    </div>
    <div class="step" v-show="step === 3">
      <div class="tips">选择您需要的做题模式，登录时长和分数参考范围</div>
      <Group title="做题模式">
        <radio
          title="title"
          :selected-label-style="{ color: '#468847' }"
          :options="['普通订单：（1-3天完成）', '紧急订单：（24小时内完成）']"
        ></radio>
      </Group>
      <Group title="个性化定制">
        <x-number
          title="参考分数"
          align="right"
          v-model="score"
          button-style="round"
          :min="90"
          :max="100"
        ></x-number>
        <cell title="口语部分">
          <checker
            type="radio"
            radio-required
            v-model="sex"
            default-item-class="item"
            selected-item-class="item-selected"
          >
            <checker-item v-for="i in ['male', 'female']" :key="i" :value="i">{{
              i == 'male' ? '男生' : '女生'
            }}</checker-item>
          </checker></cell
        >
        <cell title="代做同学">
          <checker
            type="radio"
            radio-required
            class="mode"
            v-model="ip"
            default-item-class="item"
            selected-item-class="item-selected"
          >
            <checker-item
              v-for="i in ['inner', 'outter']"
              :key="i"
              :value="i"
              >{{ i == 'inner' ? '本校(内网)' : '不限(外网)' }}</checker-item
            >
          </checker></cell
        >
        <cell title="整本时长" value-align="right">
          <checker
            type="radio"
            radio-required
            class="mode"
            v-model="orderDuration"
            default-item-class="item"
            selected-item-class="item-selected"
          >
            <checker-item
              style="width: 40px"
              v-for="i in ['10', '15', '20', '25']"
              :key="i"
              :value="i"
              >{{ i }}h</checker-item
            >
          </checker></cell
        >
      </Group>
      <div class="buttons" style="display: flex">
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="pre()"
          >上一步</XButton
        >
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="next()"
          >下一步</XButton
        >
      </div>
    </div>
    <div class="step" v-show="step === 4">
      <div class="tips">
        请填写您的手机号和QQ号，订单完成或者做题信息有误，我们会及时通知您的！
      </div>
      <Group label-width="4rem" title="联系信息">
        <XInput
          type="number"
          pattern="[0-9]*"
          title="手机号"
          v-model="telephone"
          autofocus="autofocus"
          placeholder="请输入您的手机号"
        ></XInput>
        <XInput
          type="number"
          pattern="[0-9]*"
          title="QQ号"
          v-model="qq"
          autofocus="autofocus"
          placeholder="请输入您的手机号"
        ></XInput>
      </Group>
      <Group title="给代做同学说句话">
        <x-textarea
          :show-counter="true"
          title=""
          placeholder="给代做的同学捎句话(温馨提示：请勿填写与订单进度有关的要求，如有需要设置进度请点“上一步”，在做题模式中设置)"
          v-model="message"
        ></x-textarea>
      </Group>

      <Group title="小费"> <pop </Group>

      <div class="buttons" style="display: flex">
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="pre()"
          >上一步</XButton
        >
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="next()"
          >下一步</XButton
        >
      </div>
    </div>
    <div class="step" v-show="step === 5">
      <div class="tips">请确认您的订单信息</div>
      <div style="padding: 0 15px">
        <x-table>
          <thead>
            <tr>
              <th>平台</th>
              <th>{{ platformList[platformId] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>账号</td>
              <td>{{ account }}</td>
            </tr>
            <tr>
              <td>密码</td>
              <td>{{ password }}</td>
            </tr>
            <tr>
              <td>做题范围</td>
              <td>{{ openUnit == '1' ? '部分单元' : '全部单元' }}</td>
            </tr>
            <tr>
              <td>参考分数</td>
              <td>{{ score }}左右</td>
            </tr>
            <tr>
              <td>整本时长</td>
              <td>{{ orderDuration }}小时</td>
            </tr>
            <tr>
              <td>留言</td>
              <td>{{ message }}</td>
            </tr>
          </tbody>
        </x-table>
        <Group label-width="4rem" title="支付信息">
          <cell title="价格">{{ price.toFixed(2) }}</cell>
          <cell title="小费">{{ fee.toFixed(2) }}</cell>
        </Group>
        <h3 style="text-align: center">
          本订单需要支付{{ price.toFixed(2) }}元
        </h3>
      </div>
      <div class="buttons" style="display: flex">
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="pre()"
          >上一步</XButton
        >
        <XButton
          style="margin-top: 14px; width: 45%"
          type="primary"
          @click.native="next()"
          >下一步</XButton
        >
      </div>

      <div class="step" v-show="step == 6"></div>
    </div>
    <div v-transfer-dom>
      <confirm v-model="confirm" title="提示" :content="confirmTitle">
      </confirm>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading" text="加载中"></loading>
    </div>
  </div>
</template>

<script>
import {
  Group, XInput, XButton, XNumber, Datetime, Checker, CheckerItem, Confirm, Loading, Radio, PopupRadio, CellBox, Cell, XTextarea, XTable
} from "vux";

export default {
  components: {
    XInput, Group, XButton, XNumber, Datetime, Checker, CheckerItem, Confirm, Loading, Radio, PopupRadio, CellBox, Cell, XTextarea, XTable
  },
  data () {
    return {
      step: 2,
      sex: 'male',
      ip: 'inner',
      orderData: [],
      school: "",
      account: "18390819475",
      password: "ycyc718718",
      orderDuration: "20",
      openUnit: "1",
      platformId: "",
      orderMajor: "",
      score: 95,
      telephone: '',
      qq: '',
      message: '',
      price: 0,
      fee: 0,
      data: [{ "id": "0", "pId": null, "name": "13531173357 aA3386905", "title": null, "checked": false, "open": false, "nocheck": false, "children": [{ "id": "course-v1:Unipus+nhce_3_vls_2+2018_03", "pId": "0", "name": "新视野大学英语（第三版）视听说2", "title": null, "checked": false, "open": false, "nocheck": false, "children": [{ "id": "u1", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit1Lifeisalearningcurve", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u2", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit2Journeyintotheunknown", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u3", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit3Timeout", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u4", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit4Lifeunderthespotlight", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u5", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit5Urbanpulse", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u6", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit6Climbingthecareerladder", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u7", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit7Timeoftechnology:Ablessingoracurse?", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }, { "id": "u8", "pId": "course-v1:Unipus+nhce_3_vls_2+2018_03", "name": "Unit8Discoveringyourtrueidentity", "title": null, "checked": false, "open": false, "nocheck": false, "children": [] }] }] }],
      defaultProps: {
        children: "children",
        label: "name"
      },
      confirmTitle: '',
      confirm: false,
      showLoading: false,
      platformList: [
        { key: 0, value: "找不到平台？请联系客服" },
        { key: 5, value: "U校园" }
        , { key: 53, value: "U校园(补时长)" }
        , { key: 54, value: "U校园(只做题)" }
        , { key: 9, value: "随行课堂/Welearn" }
        , { key: 15, value: "智慧树/知到" }
        , { key: 16, value: "智慧树/知到-秒刷" }
        , { key: 14, value: "中国大学(慕课号)" }
        , { key: 7, value: "中国大学(爱课程)" }
        , { key: 19, value: "清华英语在线" }
        , { key: 6, value: "清华外语/新世界" }
        // , { key: 46, value: "智慧职教" }
        // , { key: 43, value: "词达人" }
        // , { key: 18, value: "ISMART" }
        // , { key: 2, value: "优学院网页版" }
        // , { key: 37, value: "优学院APP" }
        // , { key: 33, value: "学堂在线" }
        // , { key: 50, value: "青书学堂" }
        // , { key: 49, value: "好策" }
        // , { key: 48, value: "池馆" }
        // , { key: 25, value: "FiF英语" }
        // , { key: 52, value: "FiF英语(包号)" }
        // , { key: 42, value: "学历教育云课堂" }
        // , { key: 17, value: "微知库" }
        // , { key: 47, value: "微知库学生版" }
        // , { key: 8, value: "U慕课/Umoocs" }
        // , { key: 56, value: "安全微伴" }
        // , { key: 58, value: "i学" }
        // , { key: 23, value: "Utalk" }
        // , { key: 57, value: "Utalk2.0(APP)" }
        // , { key: 22, value: "云班课" }
        // , { key: 20, value: "安徽创业云" }
        // , { key: 32, value: "国开在线" }
        // , { key: 51, value: "国开(全包内测)" }
        // , { key: 55, value: "江苏安全知识竞赛" }
        // , { key: 59, value: "青桔创课" }
        // , { key: 60, value: "链工宝" }
        // , { key: 36, value: "iSmartVocabulary" }
        // , { key: 31, value: "创就业云课堂" }
        // , { key: 40, value: "九斗" }
        // , { key: 21, value: "就创业直播" }
        // , { key: 61, value: "就创业直播(课外)" }
        // , { key: 29, value: "乐讯课堂" }
        // , { key: 27, value: "新概念英语" }
        // , { key: 26, value: "易班" }
        // , { key: 28, value: "e会学" }
        // , { key: 30, value: "好大学" }
        // , { key: 41, value: "新锦成" }
        // , { key: 35, value: "大英思博英语" }
        // , { key: 34, value: "联大成教" }
      ],
      // schoolList: ['找不到学校请联系客服添加', '中南大学', '北京交通大学', '中南林业科技大学']
    };
  },
  methods: {
    query () {
      let school = this.school,
        account = this.account,
        password = this.password,
        orderDuration = this.orderDuration,
        openUnit = this.openUnit,
        platformId = this.platformId,
        orderMajor = this.orderMajor;
      let queryData = [
        {
          school,
          account,
          password,
          orderDuration,
          openUnit,
          platformId,
          orderMajor
        }
      ];

      if (platformId == '') {
        this.confirmTitle = "请选择平台"
        this.confirm = true
        return
      }
      if (account == '') {
        this.confirmTitle = "账号不能为空"
        this.confirm = true
        return
      }
      if (password == '') {
        this.confirmTitle = "密码不能为空"
        this.confirm = true
        return
      }
      console.log(queryData);
      this.showLoading = true
      this.$axios.post("/api/index.php?cmd=query", { queryData }).then(res => {
        this.showLoading = false
        if (res.data.data.code !== 0) {
          this.confirmTitle = "数据错误，请联系客服"
          this.confirm = true
          return
        }
        let resData = res.data.data.data
        console.log(JSON.stringify(resData).indexOf('账号密码错误'))
        if (JSON.stringify(resData).indexOf('账号密码错误') > -1) {
          this.confirmTitle = "账号密码错误"
          this.confirm = true
          return
        }
        resData = JSON.parse(JSON.stringify(resData).replace("大学英语系列", ""))
        this.data = resData
        this.step = 2
      });
    },
    getCourse () {

    },
    pre () {
      this.step--;
    },
    next () {
      if (this.step == 4) {
        this.$axios.post('/api/index.php?cmd=getPrice').then(res => {
          console.log(res.data.data)
          this.price = res.data.data
        })
      }
      if (this.step == 5) {
        let date = new Date()
        let orderid = 'AK' + date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "" + Math.floor(Math.random() * (9999 - 1000) + 1000)
        let school = this.school,
          account = this.account,
          password = this.password,
          orderDuration = this.orderDuration,
          platformId = this.platformId,
          orderMajor = this.orderMajor,
          courseId = this.courseId,
          courseName = this.courseName,
          flag = this.flag,
          units = this.units,
          fee = this.fee,
          message = this.message,
          title = this.courseName;
        let rawData = [{ account, courseId, courseName, flag, orderDuration, orderMajor, password, platformId, school, units }]
        this.$axios.post('/api/index.php?cmd=addOrder', { rawData, fee, message, orderid, title }).then(res => {
          console.log(res.data.data)
        })
      }
      this.step++
    },
    checkChange (data) {
      console.log(data)
      // console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys());
    }
  }
};

// 分单元 全选 [{"platformId":"5","school":"","account":"18781914676","password":"15002806457a","courseId":"course-v1:Unipus+nhce_3_vls_2+2018_03","units":"u1,u2,u3,u4,u5,u6,u7,u8,","courseName":"新视野大学英语（第三版）视听说2","flag":"1","orderDuration":"20","orderMajor":""}]
// 分单元 部分 [{"platformId":"5","school":"","account":"18781914676","password":"15002806457a","courseId":"course-v1:Unipus+nhce_3_vls_2+2018_03","units":"u1,u2,","courseName":"新视野大学英语（第三版）视听说2","flag":"0","orderDuration":"20","orderMajor":""}]
// 全部做 全选 [{"platformId":"5","school":"","account":"18781914676","password":"15002806457a","courseId":"course-v1:Unipus+nhce_3_vls_2+2018_03","units":",","courseName":"新视野大学英语（第三版）视听说2","flag":"1","orderDuration":"20","orderMajor":""}]
</script>

<style scoped >
.logo img {
  width: 150px;
}
.logo {
  margin: 10px auto;
}
.tips {
  font-size: 0.9em;
  padding: 8px 14px;
  margin-bottom: 20px;
  text-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.5);
  background-color: #fcf8e3;
  border: 1px solid #fbeed5;
  border-radius: 4px;
  color: #468847;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.tree {
  overflow-x: auto;
}
.tree .el-tree-node {
  white-space: normal;
}
.container {
  height: 85vh;
  padding: 10px;
}
.item {
  width: 75px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: 1px solid #ccc;
  color: black;
  background-color: #fff;
  margin-right: 6px;
  font-size: 12px;
}
.item-selected {
  background: #ffffff
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC)
    no-repeat right bottom;
  border-width: 1.5px;
  color: #468847;
  border-color: #468847;
}
</style>
