<template>
<div>
    <transition :enter-active-class="'animate__animated animate__fadeInUp'" :leave-active-class="'animate__animated animate__fadeOut'">
        <div class="back-top " v-if="show" @click="backTop">
            <i class="icon">&#xe639;</i>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandle)
    },
    methods: {
        backTop() {
            window.scrollTo(0, 0);
        },
        scrollHandle() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 900) {
                this.show = true
                return
            }
            this.show = false;
        }
    }
};
</script>

<style lang="less" scoped>
.back-top {
    right: 46px;
    width: 46px;
    height: 46px;
    z-index: 999;
    bottom: 160px;
    display: flex;
    position: fixed;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: #00c1de;

    .icon {
        font-size: 18px;
        color: #ffffff;
    }
}
</style>
