<template>
  <div id="app">
    <el-scrollbar wrap-style="overflow-x: hidden;margin-bottom:0">
      <div class="week-info">今天是星期{{ week }}，{{ chickenSoup }}</div>

      <div class="border-wrap">
        <template v-if="isWorkDay">
          <div v-if="WorkStatus === 0" class="row">
            距离上班还有<span> {{ onWork.hours }} </span>小时<span> {{ onWork.minutes }} </span>分钟<span> {{ onWork.seconds }} </span>秒
          </div>
          <div v-if="WorkStatus === 1" class="row">
            距离下班还有<span> {{ offWork.hours }} </span>小时<span> {{ offWork.minutes }} </span>分钟<span> {{ offWork.seconds }} </span>秒
          </div>
          <div v-if="WorkStatus === 2" class="row">
            <span>下班啦！快准备一下回家吧！</span>
          </div>
        </template>
        <div v-else class="row">今天不用上班，好好享受假期吧！</div>

        <div v-if="Object.keys(weekend).length" class="row">
          距离周末还有<span> {{ weekend.days }} </span>天<span> {{ weekend.hours }} </span>小时<span> {{ weekend.minutes }} </span>分钟<span> {{ weekend.seconds }} </span>秒
        </div>

        <div v-for="item in holidayList" :key="item.restDay[0]" class="row">
          距离{{ item.name }}假期还有<span> {{ item.countDown.days }} </span>天<span> {{ item.countDown.hours }} </span>小时<span> {{ item.countDown.minutes }} </span>分钟<span> {{ item.countDown.seconds }} </span>秒
        </div>

        <div class="row">
          距离发工资还有<span> {{ payOff }} </span>天
        </div>

        <div class="flex row">
          <div>当前时间：{{ dateTime }}</div>
          <el-button size="mini" type="primary" @click="setClick">{{ setStatus ? '保存' : '设置' }}</el-button>
        </div>
      </div>
      <!-- 设置面板 -->
      <SettingsPanel v-show="setStatus" ref="SettingsPanel" @updateConfig="setConfig"></SettingsPanel>
    </el-scrollbar>
  </div>
</template>

<script>
import { getChickenSoup } from './chickenSoup'
import { weekEnum } from './enum'
import { getHourAndMinute } from './utils'
import holiday from './holiday'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    SettingsPanel: () => import('./SettingsPanel')
  },
  data() {
    return {
      week: '', //今天周几
      chickenSoup: getChickenSoup(), //一句毒鸡汤

      onWork: {}, //上班倒计时
      offWork: {}, //下班倒计时

      weekend: null, // 距离周末的天数

      holidayList: [], //节假日倒计时，因为有多个节假日，所以是个数组

      payOff: null, //距离发工资的天数

      dateTime: '', //当前时间

      WorkStatus: null, //工作状态：0未开始上班，1正在上班，2已经下班
      isWorkDay: true, //今天是否需要上班

      setStatus: false, //设置面板是否展开

      config: {}, //用户自定义的设置设置

      timeer: null //页面定时器
    }
  },
  created() {
    this.setConfig()
    this.update()
    this.timeer = setInterval(() => {
      this.update()
    }, 1000)
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.timeer)
  },
  methods: {
    //读取用户自定义设置
    setConfig() {
      const config = JSON.parse(localStorage.getItem('goHomeConfig') || '{}')
      this.config.onWorkTime = config.onWorkTime || '09:00'
      this.config.offWorkTime = config.offWorkTime || '18:00'
      this.config.workType = config.workType || 0
      this.config.payOffDay = config.payOffDay || 10
    },
    //每秒更新一次
    update() {
      this.setWorkStatus()
      this.setIsWorkDay()
      this.setHoliday()
      this.setWeekend()
      this.setPayOff()
    },

    //设置工作状态
    setWorkStatus() {
      const now = new moment()
      const [onWorkHours, onWorkMinute] = getHourAndMinute(this.config.onWorkTime)
      const [offWorkHours, offWorkMinute] = getHourAndMinute(this.config.offWorkTime)

      if (now.hours() < onWorkHours || (now.hours() === onWorkHours && now.minute() < onWorkMinute)) {
        this.WorkStatus = 0 //未开始工作
        this.setOnWork() //设置上班倒计时
      } else if (now.hours() > offWorkHours || (now.hours() === offWorkHours && now.minute() >= offWorkMinute)) {
        this.WorkStatus = 2 //已下班
      } else {
        this.WorkStatus = 1 //工作中
        this.setOffWork() //设置下班倒计时
      }
      this.dateTime = now.format('YYYY-MM-DD HH:mm:ss') //当前时间
      this.week = weekEnum[now.format('d')] //当天周几
    },

    //设置今天是否需要上班
    setIsWorkDay() {
      const now = new moment()
      const date = now.format('YYYY-MM-DD') //当前日期
      const inWorkDay = holiday.some(item => item.workDay.some(item => item === date))
      const inRestDay = holiday.some(item => item.restDay.some(item => item === date))
      if (inWorkDay) {
        this.isWorkDay = true
        return
      }
      if (inRestDay) {
        this.isWorkDay = false
        return
      }
      this.isWorkDay = now.format('d') > 0 && now.format('d') < 6
    },
    //上班倒计时
    setOnWork() {
      const now = new moment()
      const [onWorkHours, onWorkMinute] = getHourAndMinute(this.config.onWorkTime)
      const onWorkTime = new moment()
      onWorkTime.hours(onWorkHours)
      onWorkTime.minute(onWorkMinute)
      onWorkTime.second(0)
      onWorkTime.millisecond(0)
      this.onWork = moment.duration(onWorkTime.diff(now))._data
    },
    //下班倒计时
    setOffWork() {
      const now = new moment()
      const [offWorkHours, offWorkMinute] = getHourAndMinute(this.config.offWorkTime)
      const offWorkTime = new moment()
      offWorkTime.hours(offWorkHours)
      offWorkTime.minute(offWorkMinute)
      offWorkTime.second(0)
      offWorkTime.millisecond(0)
      this.offWork = moment.duration(offWorkTime.diff(now))._data
    },

    //设置距离节假日天数
    setHoliday() {
      const [offWorkHours, offWorkMinute] = getHourAndMinute(this.config.offWorkTime)
      this.holidayList = holiday
        .map(item => {
          const now = new moment()
          const firstDay = new moment(item.restDay[0])
          const yesterday = firstDay.date(firstDay.date() - 1)
          yesterday.hours(offWorkHours)
          yesterday.minute(offWorkMinute)
          yesterday.second(0)
          yesterday.millisecond(0)
          item.countDown = moment.duration(yesterday.diff(now))._data
          item.countDown.days = yesterday.diff(now, 'days')
          item.countDown.months = 0
          item.countDown.years = 0
          return item
        })
        .filter(item => item.countDown.days >= 0) //过滤已过期的节假日
        .filter((item, index) => index <= 2) //取前三条数据
    },

    //设置距离周末天数
    setWeekend() {
      const now = new moment()
      const weekend = new moment()
      //week是距离下一个周六的天数
      let week = weekend.day()
      if (week != 6) {
        week = 6 - week
      }
      //设置日期为下一个周六
      weekend.date(weekend.date() + week)

      //判断周六当天是否在调休或者节假日中
      const isInHoliday = holiday.some(item => {
        const date = weekend.format('YYYY-MM-DD')
        return item.workDay.includes(date) || item.restDay.includes(date)
      })

      //如果本周六在调休或者节假日中，就不展示周末倒计时
      if (isInHoliday) {
        this.weekend = {}
      } else {
        const [offWorkHours, offWorkMinute] = getHourAndMinute(this.config.offWorkTime)
        weekend.date(weekend.date() - 1)
        weekend.hours(offWorkHours)
        weekend.minute(offWorkMinute)
        weekend.second(0)
        weekend.millisecond(0)
        this.weekend = moment.duration(weekend.diff(now))._data
      }
    },

    //设置距离发工资天数
    setPayOff() {
      const now = new moment()
      const payOff = new moment()

      //如果本月已经过了发薪日，月份往后加一个月
      if (payOff.date() > this.config.payOffDay) {
        payOff.month(payOff.month() + 1)
      }

      //将日期设为发薪日
      payOff.date(Math.min(this.config.payOffDay, payOff.daysInMonth()))

      //和现在相差天数
      this.payOff = payOff.diff(now, 'days')
    },
    async setClick() {
      if (this.setStatus) {
        await this.$refs.SettingsPanel.save()
      }
      this.setStatus = !this.setStatus
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  color: #303133;
  width: 500px;
  // height: 600px;
  overflow: hidden;
  .el-scrollbar {
    height: 100%;
    /deep/ .el-scrollbar__view {
      padding: 20px;
    }
  }
  .week-info {
    font-size: 16px;
    border-left: 5px solid #50bfff;
    padding: 8px 0 8px 20px;
    line-height: 24px;
    margin-bottom: 10px;
    background: #ecf8ff;
    color: #606266;
  }
  .border-wrap {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 20px;
    .row {
      font-size: 14px;
      line-height: 20px;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      span {
        color: #f56c6c;
        font-weight: bold;
        font-size: 15px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
