import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import monthReport from '@/views/BusinessPage/weekMonthReport/monthReport.vue';
import weekReport from '@/views/BusinessPage/weekMonthReport/weekReport.vue';
import weekReportWrite from '@/views/BusinessPage/weekMonthReport/weekReport-write.vue';
import monthReportWrite from '@/views/BusinessPage/weekMonthReport/monthReport-write.vue';
// import monthReportDetail from '@/views/BusinessPage/weekMonthReport/ReportDetail.vue'

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
 }

 export default new Router({
  // mode:'history',
  // base:'/',
  routes: [
    {
      path: '/',
      name: 'BusinessPage',
      component: resolve => require(['@/views/BusinessPage/businessHome.vue'], resolve), 
      children: [
        {
          path: '/businesspage/home',
          name: 'BusinessPageHome',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/home.vue'], resolve),
        },
        {
          path: '/businesspage/projects',
          name: 'Projects',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/Projects.vue'], resolve),
        },
        {
          path: '/businesspage/xmlb',
          name: 'Xmlb',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/projectList.vue'], resolve),
        },
        {
          path: '/businesspage/dataTab',
          name: 'DataTab',
          component: resolve => require(['@/views/BusinessPage/dataTab.vue'], resolve)
        },
        {
          path: '/businesspage/task',
          name: 'Task',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/projectsTask.vue'], resolve),
        },
        {
          path: '/businesspage/milestone',
          name: 'Milestone',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/milestoneCommit.vue'], resolve),
        },
        {
          path: '/businesspage/fbdetail',
          name: 'FBdetail',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/fbdetail.vue'], resolve)
        },
        {
          path: '/businesspage/dailypaper',
          name: 'DailyPaper',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/taskLog.vue'], resolve)
        },
        {
          path: '/businesspage/complain',
          name: 'Complaint',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/complain.vue'], resolve)
        },
        {
          path: '/businesspage/systemMsg',
          name: 'systemMsg',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/systemMsg.vue'], resolve)
        },{
          path: '/businesspage/question',
          name: 'Question',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/question.vue'], resolve)
        }, {
          path: '/businesspage/qut-analyse',
          name: 'QutAnalyse',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/questionAnalyse.vue'], resolve)
        },{
          path: '/questionDetail',
          name: 'questionDetail',
          meta:{
          },
          component: resolve => require(['@/components/BusinessPage/questionDetail.vue'], resolve),
        },
        {
          path: '/zdsfwxmlb',
          name: 'zdsfwXmlb',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/zdsfw/zdsfwList.vue'], resolve),
        },
        {
          path: '/zdsfwlb',
          name: 'zdsfwLb',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/zdsfw/zdsfwMenu.vue'], resolve),
        },
        {
          path: '/zdsfw',
          name: 'Zdsfw',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/zdsfw/zdsfwPannel.vue'], resolve),
        },
        {
          path: '/template',
          name: 'Template',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/resource/templateTabel.vue'], resolve),
        },
        {
          path: '/courseware',
          name: 'Courseware',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/resource/courseware.vue'], resolve),
        },
        {
          path: '/expertlist',
          name: 'Expertlist',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/resource/expertlist.vue'], resolve),
        },
        {
          path: '/newspecial',
          name: 'newSpecial',
          meta:{
          },
          component: resolve => require(['@/views/BusinessPage/resource/newspecial.vue'], resolve),
        },
        {
          path: '/cpjh',
          name: 'Cpjh',
          meta:{
          },
          component: resolve => require(['@/components/wtfp/cpjhList.vue'], resolve),
        },
        {
          path: '/pxjh',
          name: 'Pxjh',
          meta:{
          },
          component: resolve => require(['@/components/wtfp/pxjhList.vue'], resolve),
        },
        {
          path: '/cpgjjhlist',
          name: 'cpjhList',
          meta:{
          },
          component: resolve => require(['@/components/wtfp/cpjhList.vue'], resolve),
        },
         {
          path: '/ssgjjhlist',
          name: 'ssjhList',
          meta:{
          },
          component: resolve => require(['@/components/wtfp/pxjhList.vue'], resolve),
        },
        {
          path: '/businesspage/xxtsql',
          name: 'BusinesspageXxtsql',
          component: resolve => require(['@/views/BusinessPage/xxtsql.vue'], resolve),
        },{
          path:'/businesspage/report',
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
              {
                path: '/businesspage/report/khbb/ydkhbb',
                name: 'BusinessReportYdkhbb',
                component: resolve => require(['@/views/BusinessPage/report/khbb/ydkhbb.vue'], resolve),
              },
              {
                path: '/businesspage/report/khbb/ydjlb',
                name: 'BusinessReportYdjlb',
                component: resolve => require(['@/views/BusinessPage/report/khbb/ydjlb.vue'], resolve),
              },
              {
                path: '/businesspage/report/khbb/shgsb',
                name: 'BusinessReportShgsb',
                component: resolve => require(['@/views/BusinessPage/report/khbb/shgsb.vue'], resolve),
              },
              // 使用报表
              {
                path: '/businesspage/report/use/wtslip',
                name: 'BusinessReportWtslip',
                component: resolve => require(['@/views/BusinessPage/report/useReport/twslip.vue'], resolve),
              },
              {
                path: '/businesspage/report/use/userlogin',
                name: 'BusinessReportUserlogin',
                component: resolve => require(['@/views/BusinessPage/report/useReport/userlogin.vue'], resolve),
              },
              {
                path: '/businesspage/report/khbb/grrzdj',
                name: 'BusinessReportGrrzdj',
                component: resolve => require(['@/views/BusinessPage/report/khbb/grrzdj.vue'], resolve),
              },
              {
                path: '/businesspage/report/khbb/grrzsj', 
                name: 'BusinessReportGrrzsj',
                component: resolve => require(['@/views/BusinessPage/report/khbb/rzsjcx.vue'], resolve),
              },
              {
                path: '/businesspage/report/common/:id', 
                name: 'ReportCommon',
                component: resolve => require(['@/views/BusinessPage/public/common.vue'], resolve),
              },
           ]
        },
        {
          path: '/businesspage/toplist',
          name: 'Phb',
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

            {
              path: '/businesspage/toplist/qareport/cptsql',
              name: 'BusinessReportCptsql',
              component: resolve => require(['@/views/BusinessPage/report/cptsql-phb.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/qynltsql',
              name: 'BusinessReportQynltsql',
              component: resolve => require(['@/views/BusinessPage/report/qynltsql-phb.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/grnlqlts',
              name: 'BusinessReportGrnlqlts',
              component: resolve => require(['@/views/BusinessPage/report/grnlqlts-phb.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xxtsql',
              name: 'BusinessReportXxtsql',
              component: resolve => require(['@/views/BusinessPage/report/xxtsql-pbh.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/qyxqts',
              name: 'BusinessReportQyxqts',
              component: resolve => require(['@/views/BusinessPage/report/qygxxq-phb.vue'], resolve),
            },

            {
              path: '/businesspage/toplist/qareport/qyyswg',
              name: 'BusinessReportQyyswg',
              component: resolve => require(['@/views/BusinessPage/report/yswgphb/qyyswg.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xxyswg',
              name: 'BusinessReportXxyswg',
              component: resolve => require(['@/views/BusinessPage/report/yswgphb/xxyswg.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/xmyswg',
              name: 'BusinessReportXmyswg',
              component: resolve => require(['@/views/BusinessPage/report/yswgphb/xmyswg.vue'], resolve),
            },
            {
              path: '/businesspage/toplist/qareport/gryswg',
              name: 'BusinessReportGryswg',
              component: resolve => require(['@/views/BusinessPage/report/yswgphb/gryswg.vue'], resolve),
            },
            

          ]
        },

        {
          path: '/businesspage/resolveSet',
          name: 'QuestionSet',
          component: resolve => require(['@/views/BusinessPage/questionSet.vue'], resolve),
        },
        {
          path: '/businesspage/teamVindicate',
          name: 'TeamVindicate',
          component: resolve => require(['@/views/BusinessPage/teamVindicate/index.vue'], resolve),
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
            {
              path: '/businesspage/personalSetting/grjs',
              name: 'personalSetting-grjs',
              component: resolve => require(['@/views/BusinessPage/personalSetting/personal-js.vue'], resolve),
            },
            {
              path: '/businesspage/personalSetting/xmjs',
              name: 'personalSetting-xmjs',
              component: resolve => require(['@/views/BusinessPage/personalSetting/item-js.vue'], resolve),
            },
            {
              path: '/businesspage/personalSetting/shgs',
              name: 'personalSetting-xmjs',
              component: resolve => require(['@/views/BusinessPage/personalSetting/shgscx.vue'], resolve),
            },
            {
              path: '/businesspage/personalSetting/grrzdj',
              name: 'personalSetting-grrzdj',
              component: resolve => require(['@/views/BusinessPage/personalSetting/grrzdj.vue'], resolve),
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
        {
          path: '/common',
          name: 'Common',
          component: resolve => require(['@/views/BusinessPage/public/common.vue'], resolve),
        },
      ]
    },
    {
      path: '/report-list/:id.html',
      name: 'reportList',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/report/report-list.vue'], resolve),
    },
    {
      path: '/qyxxyhReport/:id',
      name: 'qyxxyhDetail',
      component: resolve => require(['@/views/BusinessPage/report/qyxxyh/detail.vue'], resolve),
    },
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
    {
      path: '/xxtsql',
      name: 'Xxtsql',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/report/xxtsqlPannel.vue'], resolve),
    },
    {
      path: '/zdsfwDetail',
      name: 'ZdsfwDetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/zdsfw/zdsfwDetail.vue'], resolve),
    },
    {
      path: '/rbdetail',
      name: 'Rbdetial',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/taskpzDetail/rbDetail.vue'], resolve),
    },{
      path: '/zbdetail',
      name: 'Zbdetial',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/taskpzDetail/zbDetail.vue'], resolve),
    },{
      path: '/ybdetail',
      name: 'Ybdetial',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/taskpzDetail/ybDetail.vue'], resolve),
    },
    {
      path: '/yswgdetail',
      name: 'Yswgdetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/report/yswgphb/detail.vue'], resolve),
    },
    {
      path: '/jdgzDetail',
      name: 'JdgzDetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/jdgzDetail.vue'], resolve),
    },
    {
      path: '/erssdetail',
      name: 'Erss',
      meta:{
        title:''
      },
      component: resolve => require(['@/views/BusinessPage/report/cbzxqktj/erss.vue'], resolve),
    },
    {
      path: '/gjjhcpl',
      name: 'Gjjhcpl',
      meta:{
      },
      component: resolve => require(['@/components/wtfp/gjjhcpl.vue'], resolve),
    },
    {
      path: '/gjjhssl',
      name: 'Gjjhssl',
      meta:{
      },
      component: resolve => require(['@/components/wtfp/gjjhssl.vue'], resolve),
    },
    {
      path: '/stafflist',
      name: 'staffList',
      meta:{
      },
      component: resolve => require(['@/components/wtfp/yglist.vue'], resolve),
    },
    {
      path: '/khbbdetail/:id',
      name: 'Khbbdetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/report/khbb/khbbdetail.vue'], resolve),
    },
    {
      path: '/userDetail',
      name: 'UserDetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/report/useReport/userDetail.vue'], resolve),
    },
    {
      path: '/xxtsqlDetail',
      name: 'xxtsqlDetail',
      meta:{
      },
      component: resolve => require(['@/views/BusinessPage/xxtsqlDetail.vue'], resolve),
    },
    // {
    //   path: "/404",
    //   name: "notFound",
    //   component: resolve => require(['@/views/BusinessPage/errorpage.vue'], resolve),
    //   meta: {}
    //   },
    //   {
    //       path: "*",
    //       redirect: "/404"
    //   }
  ]
})
