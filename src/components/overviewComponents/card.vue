<template>
  <div class="card-box" flex-column>
    <div class="card-box__title" col=1>
      <slot name="head"></slot>
    </div>
    <div class="card-box__content " col=14>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {}
  },
  props: {

  },
  mounted() {},
  methods: {},
  components: {},
}

</script>
<style lang="scss">
.card-box {
  background: #FFFFFF;
  box-shadow: 0 4px 12px 0 rgba(73, 80, 96, 0.08);
  border-radius: 4px;
  margin: 6px;
  padding: 6px 12px 8px;
}
.card-box__content {
  overflow: auto;
}


</style>
