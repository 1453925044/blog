<template>
<div class="banner" :style="{'background-image':'url('+ bgImg +')',height:bHeight+'px'}">
    <div class="box">
        <h2>{{title}}</h2>
        <p>{{ctx}}</p>
    </div>
    <!-- 雪花组件 -->
    <div class="snow" v-if="isShow">
        <canvas id="Snow"></canvas>
    </div>
</div>
</template>

<script>
export default {
    props: {
        bHeight: {
            type: Number,
            default: 320
        },
        title: {
            type: String,
            default: "Mr.Wei"
        },
        ctx: {
            type: String,
            default: "不轻诺，故我不负人。不信诺，故人不负我"
        },
        isShow: {
            type: Boolean,
            default: true
        },
        bgImg: {
            type: String,
            default: "https://s2.ax1x.com/2019/01/29/kQQfBR.jpg"
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.banner {
    width: 100%;
    margin-top: 50px;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-position: top;

    .box {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        margin: auto;
        display: flex;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        h2 {
            color: #fff;
            text-transform: none;
            font-size: 40px;
            margin-bottom: 10px;
        }

        p {
            color: #fff;
            margin-bottom: 30px;
            font-size: 25px;
            letter-spacing: 1px;
        }
    }

    #Snow {
        width: 100%;
        pointer-events: none;
    }
}
</style>
