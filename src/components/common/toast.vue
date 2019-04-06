<template>
  <div class="toast-wrapper">
    <div class="content-wrapper">
      <div class="text-wrapper">
        <div class="text">{{`${data.name}同学,${data.res}`}}</div>
      </div>
      <div class="btn-wrapper">
        <div class="btn-wrapper" @click="close()">
          <div class="btn mui-icon mui-icon-closeempty"></div>
          <div class="text">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: Object
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="less" scoped>
div {
  margin: 0;
  padding: 0;
}
.toast-wrapper {
  width: 100%;
  .content-wrapper {
    position: relative;
    width: 90%;
    height: 5rem;
    background: #eee;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 0 auto;
    .text-wrapper {
      width: 100%;
      height: 2rem;
      .text {
        margin: 1rem auto 0 auto;
        text-align: center;
        text-indent: 36px;
        color: #666;
        font-size: 16px;
        line-height: 24px;
      }
    }
    .btn-wrapper {
      width: 100%;
      height: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      .btn {
        font-size: 28px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
}
</style>