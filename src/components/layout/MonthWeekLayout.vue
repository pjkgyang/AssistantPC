<template>
 <div class="month-plan-overview">
      <div>
           <div colcenter spacebetween >
               <h4 style="font-weight:700;" v-html="title"></h4>
                <div>
                    <slot name="btn"></slot>
                </div>
           </div>
          <div class="month-plan-filter">
             <slot name="header"></slot>
          </div>
      </div>
      <div class="month-workplan">
          <slot name="content">
            
          </slot>     
      </div>
      <div v-if="shown" class="month-workplan" style="margin-top:30px">
          <slot name="contentBottom">
            
          </slot>     
      </div>
 </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    shown: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>

<style scoped>
.month-plan-overview {
  width: 95%;
  margin: 0 auto 0;
  padding-top: 10px;
}
.month-workplan {
  background: #fff;
  padding: 20px 15px 0;
  box-shadow: 0 4px 12px 0 rgba(73, 80, 96, 0.08);
  border-radius: 4px;
}
.month-plan-filter {
  margin: 10px 0 10px;
}
</style>

