<template>
    <div>
        <div  class="layout-menu">
            <div class="layout-menu-nav">
                <slot name="menu"></slot>
            </div>
            <div   class="layout-menu-content">
                <slot name="content"></slot>
            </div>
        </div> 
    </div>
</template>
<script>
import Scrollbar from 'smooth-scrollbar';
export default {
    mounted(){
         Scrollbar.init(document.querySelector('.layout-menu-nav'));
    }
}
</script>
<style scoped>
.layout-menu{
    width: 95%;
    margin: 10px auto ;
}
.layout-menu:after{
    content:'';
    display: block;
    clear: both;
}

.layout-menu-nav{
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    border-radius:4px;
    overflow-y:auto;
    overflow-x: hidden;
    width: 14%;
    min-width:200px;
    float: left;
    vertical-align:top;
    position: absolute;
    top:60;
    max-height:calc(100vh - 80px); 
}
.layout-menu-content{
    width: 83%;
    background: #fff;
    overflow-x: auto;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    float: right;
    border-radius: 4px;
}


</style>
