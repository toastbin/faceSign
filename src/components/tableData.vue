<template>
  <div style="padding-top:40px;padding-bottom:50px">
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
      >
        <thead>
          <tr>
            <th style="width:20%;">姓名</th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
            <th>周日</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in tableData"
            :key="index"
            @click="drawLine(item.user_info,item.weekMap),setTop()"
          >
            <td>{{item.user_info}}</td>
            <td v-for="(item,index) in item.weekMap" :key="index">{{item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: "",
      can: true,
      ifShow: false,
      weeks: "",
      week: '0',
      tit: '',
      id: this.$route.params.id,
      header: ''
    };
  },
  methods: {
    getUrl() {
      this.$axios
        // 用 $route.params.id 获取当前路由
        .get("/group?week="+this.week+"&group_id=" + this.id)
        .then(res => {
          this.tableData = res.data.signItemList;
          this.weeks = res.data.week;
        });
    },
    changeUrl(item){
       this.$axios
        .get("/group?week="+item+"&group_id=" + this.id)
        .then(res => {
          this.tableData = res.data.signItemList;
          this.week = res.data.week
          console.log(this.week);
          this.tit = '第' + res.data.week + '周';
        });  
    },
    test(item){
      console.log(item);
    }
    ,
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
      // let date = new Date();
      // let week = date.getDay() == 0 ? 7 : date.getDay();
      // console.log(week);
      let sum = weekArr.reduce((a, b) => {
        return a + b;
      });
      sum = sum.toFixed(2);
      let ave = sum / 7;
      ave = ave.toFixed(2);

      line.style.display = "block";
      let myChart = this.$echarts.init(line);
      /*
      myChart.setOption({
        title: {
          text: `${name}同学,到今天,您平均每天签到${ave}小时`,
          textStyle: {
            fontSizen: 14,
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
            formatter: "{value}时"
          }
        },
        series: [
          {
            name: "签到时间",
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
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "yellow",
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "red" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            lineStyle: {
              normal: {
                color: "red",
                width: 3,
                type: "solid"
              }
            },
            areaStyle: {
              color: "lightcyan"
            }
          }
        ]
      })
      ;*/
      myChart.setOption({
        title: {
          text: `${name}同学,您${this.week==0?'本':'第'+this.week}周平均每天签到${ave}小时`,
          textStyle: {
            fontSize: 14,
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
      var x = window.outerHeight / 2 ;
      if (this.ifShow && line) {
        // line.style.top = scrollTop + x + "px";
        line.style.transform = "translateY( " + scrollTop + "px)"
      }
    },
    setTitle(){
      switch(this.id){
        case '0701': this.header = '七期软件';break;
        case '0702': this.header = '七期UI';break;
        case '0601': this.header = '六期软件';break;
        case '0602': this.header = '六期UI';break;
        case '0801': this.header = '八期软件';break;
        case '0802': this.header = '八期UI';break;
      }
    }
  },
  created() {
    this.getUrl(this.week);
    this.setTitle();
  },
  mounted() {

    // 函数节流  监听滚动
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
  }
};
</script>
<style lang="less" scoped>
.el-select{
  width: 100%;
  margin-top: 5px;
}
table {
  thead {
    tr {
      th {
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
        padding: 0.5rem;
      }
    }
  }
  tbody {
    td {
      font-size: 14px;
      vertical-align: middle;
      padding: 0.5rem;
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
</style>
