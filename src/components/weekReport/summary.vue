<template>
 <div>
    <tableLayout :title="'里程碑工作'+snippet">
         <div slot="bottom">
              <WeekLcbTable></WeekLcbTable>
         </div>
    </tableLayout>    
    <tableLayout :title="'进度任务'+snippet">
         <div slot="bottom">
              <processTable></processTable>
         </div>
    </tableLayout>    
    <tableLayout :title="'问题处理'+snippet">
         <div slot="bottom">
              <MonthWeekQuestionTable></MonthWeekQuestionTable>
         </div>
    </tableLayout>    
 </div>
</template>

<script>
import WeekLcbTable from '@/components/BusinessPage/MonthWeekTable.vue'
import MonthWeekQuestionTable from '@/components/BusinessPage/MonthWeekQuestionTable.vue'
import processTable from '@/components/weekReport/processTable.vue'
import tableLayout from '@/components/layout/tableLayout.vue'
 export default {
   data () {
     return {

     }
   },
   props:{
       snippet:{
        type:String,
        default:'111'
       }
   },
   components: {WeekLcbTable,MonthWeekQuestionTable,tableLayout,processTable}
 }
</script>

<style scoped>

 
</style>
