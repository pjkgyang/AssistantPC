import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import monthReport from '@/views/BusinessPage/weekMonthReport/monthReport.vue'
import weekReport from '@/views/BusinessPage/weekMonthReport/weekReport.vue'
import weekReportWrite from '@/views/BusinessPage/weekMonthReport/weekReport-write.vue'
import monthReportWrite from '@/views/BusinessPage/weekMonthReport/monthReport-write.vue'
// import monthReportDetail from '@/views/BusinessPage/weekMonthReport/ReportDetail.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BusinessPage',
      // redirect: '/businesspage/home',
      component: resolve => require(['@/views/BusinessPage/businessHome.vue'], resolve), 
      children: [
        {
          path: '/BusinessPage/home',
          name: 'BusinessPageHome',
          component: resolve => require(['@/views/BusinessPage/home.vue'], resolve),
        },
        {
          path: '/businesspage/projects',
          name: 'Projects',
          component: resolve => require(['@/views/BusinessPage/Projects.vue'], resolve),
        },
        {
          path: '/businesspage/dataTab',
          name: 'DataTab',
          component: resolve => require(['@/views/BusinessPage/dataTab.vue'], resolve)
        },
        {
          path: '/businesspage/task',
          name: 'Task',
          component: resolve => require(['@/views/BusinessPage/projectsTask.vue'], resolve),
        },
        {
          path: '/businesspage/milestone',
          name: 'Milestone',
          component: resolve => require(['@/views/BusinessPage/milestoneCommit.vue'], resolve),
        },
        {
          path: '/businesspage/fbdetail',
          name: 'FBdetail',
          component: resolve => require(['@/views/BusinessPage/fbdetail.vue'], resolve)
        },
        {
          path: '/businesspage/dailypaper',
          name: 'DailyPaper',
          component: resolve => require(['@/views/BusinessPage/taskLog.vue'], resolve)
        },
        {
          path: '/businesspage/complain',
          name: 'Complaint',
          component: resolve => require(['@/views/BusinessPage/complain.vue'], resolve)
        },
        {
          path: '/businesspage/systemMsg',
          name: 'systemMsg',
          component: resolve => require(['@/views/BusinessPage/systemMsg.vue'], resolve)
        },{
          path: '/businesspage/question',
          name: 'Question',
          component: resolve => require(['@/views/BusinessPage/question.vue'], resolve)
        }, {
          path: '/businesspage/qut-analyse',
          name: 'QutAnalyse',
          component: resolve => require(['@/views/BusinessPage/questionAnalyse.vue'], resolve)
        },{
          path: '/questionDetail',
          name: 'questionDetail',
          component: resolve => require(['@/components/BusinessPage/questionDetail.vue'], resolve),
        },{
          path: '/businesspage/report',
          name: 'Report',
          component: resolve => require(['@/views/BusinessPage/report.vue'], resolve),
          redirect:to => {
            if(!!window.menu && window.menu.childNodes.length){
               if(window.menu.childNodes[0].childNodes.length){
                  return window.menu.childNodes[0].childNodes[0].url;
               }else{
                return window.menu.childNodes[0].url;
               }
            }
          },
          children: [
              // {
              //   path: '/businesspage/report/qareport/:id',
              //   name: 'BusinessReportQA',
              //   component: resolve => require(['@/views/BusinessPage/report/report-question.vue'], resolve),
              // },
              {
                path: '/businesspage/report/qareport/wtgz',
                name: 'BusinessReportWtgz',
                component: resolve => require(['@/views/BusinessPage/report/report-wtgz.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/ylwt',
                name: 'BusinessReportYlwt',
                component: resolve => require(['@/views/BusinessPage/report/report-ylwt.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/ylwt2',
                name: 'BusinessReportYlwt2',
                component: resolve => require(['@/views/BusinessPage/report/report-ylwt2.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/ylwt3',
                name: 'BusinessReportYlwt3',
                component: resolve => require(['@/views/BusinessPage/report/report-ylwt3.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/xxhzhb',
                name: 'BusinessReportXxhzhb',
                component: resolve => require(['@/views/BusinessPage/report/report-xxhzhb.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/qyssxx',
                name: 'BusinessReportQyssxx',
                component: resolve => require(['@/views/BusinessPage/report/report-qyssxx.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/qyjjqk',
                name: 'BusinessReportQyjjqk',
                component: resolve => require(['@/views/BusinessPage/report/report-qyjjqk.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/cpxhs',
                name: 'BusinessReportCpxhs',
                component: resolve => require(['@/views/BusinessPage/report/report-cpxhs.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/wtlxtj',
                name: 'BusinessReportWtlxtj',
                component: resolve => require(['@/views/BusinessPage/report/report-wtlxtj.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/qyxxyh',
                name: 'BusinessReportQyxxyh',
                component: resolve => require(['@/views/BusinessPage/report/report-qyxxyh.vue'], resolve),
              },
              {
                path: '/businesspage/report/logreport/:id',
                name: 'BusinessReportLog',
                component: resolve => require(['@/views/BusinessPage/report/report-log.vue'], resolve),
              },
              {
                path: '/businesspage/report/qareport/cbzxqktj',
                name: 'BusinessReportCbzxqktj',
                component: resolve => require(['@/views/BusinessPage/report/report-cbzxqktj.vue'], resolve),
              },
          ]
        },
        {
          path: '/businesspage/toplist',
          name: 'Phb',
          component: resolve => require(['@/views/BusinessPage/report.vue'], resolve),
          redirect:to => {
            if(!!window.menuTop && window.menuTop.childNodes.length){
               if(window.menuTop.childNodes[0].childNodes.length){
                 return window.menuTop.childNodes[0].childNodes[0].url
               }else{
                return window.menuTop.childNodes[0].url
               }
            }
          },
          children: [
            {
              path: '/businesspage/toplist/qareport/xjpm-qy',
              name: 'BusinessReportXjpfqy',
              component: resolve => require(['@/views/BusinessPage/report/report-xjpm-qy.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xjpm-cp',
              name: 'BusinessReportXjpfcp',
              component: resolve => require(['@/views/BusinessPage/report/report-xjpm-cp.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xjpm-xx',
              name: 'BusinessReportXjpfxx',
              component: resolve => require(['@/views/BusinessPage/report/report-xjpm-xx.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xjpm-xm',
              name: 'BusinessReportXjpfxm',
              component: resolve => require(['@/views/BusinessPage/report/report-xjpm-xm.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xjpm-gr',
              name: 'BusinessReportXjpfgr',
              component: resolve => require(['@/views/BusinessPage/report/report-xjpm-gr.vue'], resolve),
            },
          ]
        },
        {
          path: '/businesspage/resolveSet',
          name: 'QuestionSet',
          component: resolve => require(['@/views/BusinessPage/questionSet.vue'], resolve),
        },
        
        {
          path: '/businesspage/personalSetting',
          name: 'PersonalSetting',
          component: resolve => require(['@/views/BusinessPage/personalSetting.vue'], resolve),
          redirect:'/businesspage/personalSetting/grzx',
          children: [
            {
              path: '/businesspage/personalSetting/grzx',
              name: 'personalSetting-grzx',
              component: resolve => require(['@/views/BusinessPage/personalSetting/personal-center.vue'], resolve),
            },
            {
              path: '/businesspage/personalSetting/xgmm',
              name: 'personalSetting-xhmm',
              component: resolve => require(['@/views/BusinessPage/personalSetting/change-psw.vue'], resolve),
            },
            {
              path: '/businesspage/personalSetting/xxsz',
              name: 'personalSetting-xxsz',
              component: resolve => require(['@/views/BusinessPage/personalSetting/msg-setting.vue'], resolve),
            },
          ]
        },
        {
          path: '/businesspage/monthReport',
          name: 'MonthReport',
          component:monthReport,
        },
        {
          path: '/businesspage/weekReport',
          name: 'WeekReport',
          component:weekReport,
        },
        {
          path: '/businesspage/weekplanfill',
          name: 'WeekReportWrite',
          component:weekReportWrite,
        },
        {
          path: '/businesspage/monthplanfill',
          name: 'MonthReportWrite',
          component:monthReportWrite,
        },
      ]
    },
    // {
    //   path: '/businesspage/ReportDetail',
    //   name: 'MonthReportDetail',
    //   component:monthReportDetail,
    // },
    {
      path: '/report-list/:id.html',
      name: 'reportList',
      component: resolve => require(['@/views/BusinessPage/report/report-list.vue'], resolve),
    },
    {
      path: '/qyxxyhReport/:id',
      name: 'qyxxyhDetail',
      component: resolve => require(['@/views/BusinessPage/report/qyxxyh/detail.vue'], resolve),
    },
    // {
    //   path: '/qyxxyhReport/user',
    //   name: 'qyxxyhUser',
    //   component: resolve => require(['@/views/BusinessPage/report/qyxxyh/schoolUser.vue'], resolve),
    // },
    // {
    //   path: '/qyxxyhReport/project',
    //   name: 'qyxxyhProject',
    //   component: resolve => require(['@/views/BusinessPage/report/qyxxyh/project.vue'], resolve),
    // },
    {
      path: '/qyreport-nnt',
      name: 'LogPannal1',
      component: resolve => require(['@/views/logPage/log-pannal1.vue'], resolve),
    },{
      path: '/qyreport-grmx',
      name: 'LogPannal2',
      component: resolve => require(['@/views/logPage/log-pannal2.vue'], resolve),
    },{
      path: '/complaintDetail',
      name: 'complaintDetail',
      component: resolve => require(['@/components/BusinessPage/complaintDetail.vue'], resolve),
    },
    {
      path: '/dwxmList',
      name: 'DwxmList',
      component: resolve => require(['@/views/itemPage/item-pannel.vue'], resolve),
    },
    {
      path: '/itemDetailHome',
      name: 'itemDetail',
      component: resolve => require(['@/views/itemPage/itemDetail-home.vue'], resolve),
      children: [{
            path: '/itemDetail',
            name: 'ItemDetail',
            component: resolve => require(['@/views/itemPage/item-detail.vue'], resolve),
      }]
    },
  ]
})
