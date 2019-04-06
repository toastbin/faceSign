<template>
  <transition name="h" mode="out-in">
    <div style="padding-top:40px;padding-bottom:50px;width:100%;height:100%;">
      <div class="loading" v-show="loading">
        <load></load>
        <!-- <div class="text">网络似乎不太好</div> -->
      </div>
      <div id="line" v-show="ifShow" @click="ifShow = false"></div>
      <mt-header fixed :title="header"></mt-header>
      <div class="qd_table">
        <el-select :value="tit" :placeholder="'请选择周数 本周是第' + weeks + '周'">
          <el-option
            v-for="(item,index) in weeks"
            :key="index"
            :value=" '第' + item + '周' "
            @click.native="changeUrl(item)"
          ></el-option>
        </el-select>
        <table
          class="table table-bordered table-hover table-striped"
          style="text-align: center;vertical-align: middle;"
          v-show="!loading"
        >
          <thead>
            <tr>
              <th style="width:20%;" @click="daySort(8)" :class="{'selected': currentDay === 8}">姓名</th>
              <th
                v-for="(item,index) in weekList"
                :key="index"
                @click="daySort(index+1)"
                :class="{'selected': currentDay === index+1}"
              >{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in tableData"
              :key="index"
              @click="drawLine(item.user_info,item.weekMap),setTop()"
            >
              <td style="border-left:none">{{item.user_info}}</td>
              <td
                v-for="(item,index) in item.weekMap"
                :key="index"
                :style="{' border-right:none': index===6}"
              >{{item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
</template>
<script>
import { px2rem } from "../utils/utils";
import load from "./common/loading.vue";
export default {
  data() {
    return {
      tableData: "",
      can: true,
      ifShow: false,
      weeks: "",
      week: "0",
      tit: "",
      id: this.$route.params.id,
      header: "",
      loading: true,
      currentDay: new Date().getDay(),
      weekList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    };
  },
  components: {
    load
  },
  methods: {
    getUrl() {
      this.$axios
        // 用 $route.params.id 获取当前路由
        .get("sel/group?week=" + this.week + "&group_id=" + this.id)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.tableData = res.data.signItemList;
          this.weeks = res.data.week;
          this.tableData.sort(this.getSortEveryDay(this.currentDay));
          this.addSum();
        });
    },
    changeUrl(item) {
      this.loading = true;
      this.$axios
        .get("sel/group?week=" + item + "&group_id=" + this.id)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.signItemList;
          this.week = res.data.week;
          this.tit = "第" + res.data.week + "周";
          this.tableData.sort(this.getSortEveryDay(this.currentDay));
          this.addSum();
          console.log(this.tableData);
        });
    },
    getSum(j) {
      let arr = [];
      for (var i in this.tableData[j].weekMap) {
        arr.push(this.tableData[j].weekMap[i]);
      }
      let sum = arr.reduce((prev, cur) => {
        return prev + cur;
      });
      return sum;
    },
    addSum() {
      this.tableData.forEach((item, index) => {
        item.allTime = this.getSum(index);
      });
    },
    daySort(day) {
      if (day === 8) {
        this.currentDay = 8;
        this.tableData.sort(this.getSortAllWeek());
        return;
      }
      this.currentDay = day;
      this.tableData.sort(this.getSortEveryDay(this.currentDay));
    },
    drawLine(name, weeks) {
      const line = document.querySelector("#line");
      const width = window.innerHeight / 2;
      this.ifShow = true;
      line.style.height = width + "px";
      line.style.marginTop = width / 2 - 40 + "px";
      let weekArr = [];
      for (let i in weeks) {
        weekArr.push(weeks[i]);
      }
      let sum = weekArr.reduce((a, b) => {
        return a + b;
      });
      sum = sum.toFixed(2);
      let ave = sum / 7;
      ave = ave.toFixed(2);

      line.style.display = "block";
      let myChart = this.$echarts.init(line);
      myChart.setOption({
        title: {
          text: `${name}同学,您${
            this.week == 0 ? "本" : "第" + this.week
          }周平均每天签到${ave}h,共计${sum}h`,
          textStyle: {
            fontSize: 13,
            color: "black"
          },
          left: "center"
        },
        tooltip: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          axisLabel: {
            formatter: "{value}h"
          }
        },
        series: [
          {
            name: "签到表",
            type: "line",
            data: weekArr,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            },
            areaStyle: {
              color: "lightblue"
            }
          }
        ]
      });
    },
    setTop() {
      const line = document.querySelector("#line");
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var x = window.outerHeight / 2;
      if (this.ifShow && line) {
        line.style.transform = "translateY( " + scrollTop + "px)";
      }
    },
    setTitle() {
      switch (this.id) {
        case "0701":
          this.header = "七期软件";
          break;
        case "0702":
          this.header = "七期UI";
          break;
        case "0703":
          this.header = "七期硬件";
          break;
        case "0601":
          this.header = "六期软件";
          break;
        case "0602":
          this.header = "六期UI";
          break;
        case "0603":
          this.header = "六期硬件";
          break;
        case "0801":
          this.header = "八期软件";
          break;
        case "0802":
          this.header = "八期UI";
          break;
        case "0803":
          this.header = "八期硬件";
          break;
      }
    },
    getSortEveryDay(attr) {
      return (obj1, obj2) => {
        if (obj1.weekMap[`week${attr}`] > obj2.weekMap[`week${attr}`]) {
          return -1;
        } else if (obj1.weekMap[`week${attr}`] == obj2.weekMap[`week${attr}`]) {
          return 0;
        } else {
          return 1;
        }
      };
    },
    getSortAllWeek() {
      return (obj1, obj2) => {
        if (obj1.allTime > obj2.allTime) {
          return -1;
        } else if (obj1.allTime == obj2.allTime) {
          return 0;
        } else {
          return 1;
        }
      };
    }
  },
  created() {
    this.getUrl(this.week);
    this.setTitle(this.id);
    window.addEventListener("scroll", () => {
      if (!this.can) {
        return;
      }
      this.can = false;
      setTimeout(() => {
        this.setTop();
        this.can = true;
      }, 400);
    });
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
  margin-top: 5px;
}
table {
  thead {
    tr {
      .selected {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        color: #666;
        font-weight: 800;
      }
      th {
        font-size: 0.4rem;
        text-align: center;
        vertical-align: middle;
        padding: 0.2rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        transition: all 0.2s linear;
      }
    }
  }
  tbody {
    td {
      font-size: 0.35rem;
      vertical-align: middle;
      padding: 0.3rem 0.2rem 0.3rem 0.2rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
#line {
  width: 100%;
  background: rgba(219, 238, 250, 0.8);
  position: absolute;
  transition: all 0.2s;
  z-index: 10000;
}
.loading {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  margin-left: -0.84rem;
  margin-top: -0.58rem;
  width: 1.68rem;
  height: 1.06rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.h-enter,
.h-leave-to {
  // transform: translate3d(0, -100%, 0);
  opacity: 0;
}
.h-enter-to,
.h-leave {
  // transform: translate3d(0, 0, 0);
  opacity: 1;
}
.h-enter-active,
.h-leave-active {
  transition: all 0.3s linear;
}
</style>
