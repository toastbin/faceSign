<template>
  <div class="loading">
    <div class="loading-wrapper">
      <div class="loading-item" v-for="(item,index) in data" :key="index">
        <div class="loading-line-wrapper" v-for="(_item,_index) in item" :key="_index">
          <div class="loading-mask" ref="mask"></div>
          <div class="loading-line" ref="line"></div>
        </div>
      </div>
      <div class="loading-center"></div>
    </div>
  </div>
</template>

<script>
// import { setInterval } from "timers";
import { px2rem } from "../../utils/utils";
export default {
  data() {
    return {
      data: [[{}, {}, {}], [{}, {}, {}]],
      maskWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      lineWidth: [
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 }
      ],
      add: true,
      end: false
    };
  },
  mounted() {
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index];
        const line = this.$refs.line[index];
        let maskWidth = this.maskWidth[index];
        let lineWidth = this.lineWidth[index];
        if (index === 0) {
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++;
            lineWidth.value--;
          } else if (!this.add && lineWidth.value < 16) {
            maskWidth.value--;
            lineWidth.value++;
          }
        } else {
          if (this.add && maskWidth.value < 16) {
            let preMaskWidth = this.maskWidth[index - 1];
            if (preMaskWidth.value >= 8) {
              maskWidth.value++;
              lineWidth.value--;
            }
          } else if (!this.add && lineWidth.value < 16) {
            let preLineWidth = this.lineWidth[index - 1];
            if (preLineWidth.value >= 8) {
              maskWidth.value--;
              lineWidth.value++;
            }
          }
        }
        mask.style.width = `${px2rem(maskWidth.value)}rem`;
        mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`;
        line.style.width = `${px2rem(lineWidth.value)}rem`;
        line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`;

        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 16) this.end = true;
          } else {
            if (maskWidth.value === 0) this.end = true;
          }
        }
        if (this.end) {
          this.add = !this.add;
          this.end = false;
        }
      });
    }, 10);
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: relative;
  z-index: 5;
  width: 1.68rem;
  height: 1.06rem;
  background: transparent;
  border: 0.05rem solid #d7d7d7;
  border-radius: 0.08rem;
  .loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0.13rem 0;
      box-sizing: border-box;
      .loading-line-wrapper {
        padding: 0 0.13rem;
        box-sizing: border-box;
        flex: 1;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        .loading-line {
          flex: 0 0 0.42rem;
          width: 0.42rem;
          height: 0.05rem;
          background: #d7d7d7;
        }
        .loading-mask {
          flex: 0 0 0;
          width: 0;
          height: 0.05rem;
        }
      }
    }
    .loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: 0.05rem;
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>