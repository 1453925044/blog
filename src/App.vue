<template>
<div id="app">
    <headers v-if="$route.name !='文章发布'"></headers>
    <backTop></backTop>
    <audioPlay></audioPlay>
    <router-view />
    <keep-alive>
        <footers v-if="$route.name !='文章发布'"></footers>
    </keep-alive>
</div>
</template>

<script>
import footers from "@/components/footer/index";
import backTop from "@/components/back-top/index";
import audioPlay from "@/components/audio-play/index";
export default {
    name: "App",
    components: {
        backTop,
        footers,
        audioPlay
    },
    beforeCreate() {
        window.L2Dwidget.init({
            pluginRootPath: '/live2dw/',
            pluginJsPath: 'lib/',
            pluginModelPath: '/live2d-widget-model-koharu/assets/',
            tagMode: false,
            debug: false,
            model: {
                jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json'
            },
            display: {
                position: 'left',
                width: 200,
                height: 300,
                hOffset: -30,
                vOffset: 110
            },
            mobile: {
                show: true
            },
            log: false,
            react: {
                opacityDefault: 0.7,
                opacityOnHover: 0.2
            }
        })
    }
}
</script>

<style lang="less">
@import url("/css/common.css");
@import url("/css/reset.css");
</style>
