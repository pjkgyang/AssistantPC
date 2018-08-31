<template>
    <div>
        <template v-for="(item, n) in routes">
            <!-- 循环创建子菜单 -->
            <template v-if="item.childNodes && item.childNodes.length && !item.url">
                <el-submenu :index="navIndex ? navIndex : String(n)" :show-timeout="100" :hide-timeout="100"> 
                    <!-- 创建父级菜单 -->
                    <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.privname }}</template>

                    <!-- 创建子菜单 -->
                    <template v-for="(subItem,i) in item.childNodes">
                        <!-- 如果该子节点仍旧拥有子节点则递归创建 -->
                        <nav-item v-if="subItem.childNodes && subItem.childNodes.length" :navIndex="n+'-'+i" :routes="[subItem]" ></nav-item>

                        <router-link v-else :to="subItem.url">
                            <!-- <el-menu-item :index="navIndex ? navIndex+'-'+i : n+'-'+i"> -->
                            <el-menu-item :index="subItem.url ? subItem.url : ''"><i v-if="item.icon" class="item.icon"></i>{{ subItem.privname }}</el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>

            <template v-else>
                <router-link :to="item.url">
                    <el-menu-item :index="item.url"><i v-if="item.icon" class="item.icon"></i>{{ item.privname }}</el-menu-item>
                </router-link>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'navItem',
        props: ['routes','navIndex'],
    }
</script>
