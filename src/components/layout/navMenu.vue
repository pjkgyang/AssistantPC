<template>

    <!-- <el-submenu v-if="item.child && item.child.length" :index="navIndex"> 
        <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>
        <nav-bar-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" ></nav-bar-item>
    </el-submenu>
    <el-menu-item v-else :index="navIndex" :route="{path: item.path}"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item> -->
<!-- item.path -->
    <el-submenu v-if="item.childNodes && item.childNodes.length && !item.url" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"><i v-if="item.icon" :class="item.icon"></i><span>{{ item.privname }}</span></template>
        <!-- 创建子菜单 -->
        <nav-bar-item v-for="(subItem,i) in item.childNodes" :key="navIndex+'-'+i+1" :navIndex="navIndex+'-'+(i+1)" :item="subItem" ></nav-bar-item>
    </el-submenu>
    <el-menu-item v-else :index="navIndex" :route="{path: item.url}"><i v-if="item.icon" :class="item.icon"></i>{{ item.privname}}</el-menu-item>
</template>

<script>
import NavBarItem from './navMenu.vue'
export default {
    name: 'NavBarItem',
    props: {
        item:{
            type:Object,
            default:function(){
                return {}
            }
        },
        navIndex:{
            type:String,
            default:''
        },
        urlIndex:{
            type:String,
            default:''
        },
    },
    components:{NavBarItem}
}
</script>