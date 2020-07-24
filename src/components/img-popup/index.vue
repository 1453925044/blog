<template>
<div class="popup hideToShow" v-if="show" @click="show = false">
    <div class="icon-box"><i class="icon">&#xe690;</i></div>
    <img :src="targetImg" alt="预览图片">
</div>
</template>

<script>
export default {
    props: {
        targetImg: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            show: false,
        }
    },
}
</script>

<style lang="less" scoped>
.popup {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: fixed;
    z-index: 9999999;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);

    .icon-box {
        top: 18px;
        right: 24px;
        cursor: pointer;
        color: #ffffff;
        font-size: 30px;
        position: absolute;
    }

    img {
        width: 60%;
        height: 60%;
        object-fit: contain;
    }
}
</style>
