<template>
  <div>
    <!-- downloadApi：下载api    resourceType:文件类型-->
    <pannelComponent :resourceType="2"></pannelComponent>
  </div>
</template>

<script>
import pannelComponent from "@/components/resource/pannel.vue";
export default {
  data() {
    return {};
  },
  components: { pannelComponent }
};
</script>


<style scoped>
</style>