<template>
<div class="index-container hideToShow">
    <!-- 首页大屏banner展示 -->
    <snow-banner></snow-banner>
    <!-- 内容区 -->
    <panel-container v-show="show">
        <!-- 内容主要区域 -->
        <div class="main-content">
            <!-- 首页轮播专栏 -->
            <div class="section-one">
                <div class="banner radiu4px">
                    <el-carousel class="radiu4px" trigger="click" height="260px">
                        <el-carousel-item v-for="(image,index) in banner" :key="index">
                            <img style="width:100%;height:100%;object-fit:cover" :src="image" alt="轮播图片" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="special-column">
                    <p class="column">
                        <span>这是内容</span>
                        <img src="https://s2.ax1x.com/2019/01/29/kQK7a6.png" alt="专栏" />
                    </p>
                    <p class="column">
                        <span>这是内容</span>
                        <img src="https://s2.ax1x.com/2019/01/29/kQK7a6.png" alt="专栏" />
                    </p>
                </div>
            </div>
            <!-- 文章展示区 -->
            <div class="section-two">
                <div class="artic">
                    <articles :article="article"></articles>
                </div>
            </div>
        </div>
        <!-- 侧边菜单栏 -->
        <div class="main-menu">
            <div class="personal-card">
                <businessCard></businessCard>
            </div>
            <div class="menu">
                <menu-bar @upDataArticle="upDataArticle"></menu-bar>
            </div>
        </div>
    </panel-container>
    <sidebar></sidebar>
    <!-- <audioPlay></audioPlay> -->
</div>
</template>

<script>
import {
    getBlogList
} from "@/api/blog/index.js";
import snow from "@/library/snow.js";
import backTop from "@/components/back-top/index";
import sidebar from "@/components/sidebar/index";
import articles from "@/components/article/index";
import panelContainer from '@/components/panel/index'

import menuBar from "@/components/menu-right/index";
import businessCard from "@/components/myCard/index";
import snowBanner from "@/components/banner-index/index";
export default {
    components: {
        backTop,
        sidebar,
        menuBar,
        articles,
        snowBanner,
        businessCard,
        panelContainer,
    },
    data() {
        return {
            show: true,
            article: [],
            scrollTop: 0,
            isShow: false,
            banner: [
                "https://weichaooqx.com/figure/blog-images/b1.jpg",
                "https://weichaooqx.com/figure/blog-images/b2.jpg",
            ],
        }
    },
    created() {
        this.getList();
    },
    mounted() {
        this.pageInit();
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        // 页面初始化
        pageInit() {
            snow.snows();
            snow.framework();
        },
        // 监听页面滚动
        handleScroll() {
            const scrollTop = window.pageYOffset || document.body.scrollTop;
            this.scrollTop = scrollTop;
            if (scrollTop > 350) {
                this.isShow = true;
                return;
            }
            this.isShow = false;
        },
        // 获取博客文章列表
        getList() {
            getBlogList({
                author: "魏超",
                keyword: ""
            }).then(res => {
                if (res.success && res.data) {
                    let data = res.data;
                    // 列表去富文本格式
                    this.article = this.$unit.richFormat(data);
                    return;
                }
            });
        },
        // 更新博客文章列表
        upDataArticle(data) {
            this.article = data;
        },
    }
}
</script>

<style lang="less" scoped>
.index-container {
    width: 100%;
    // overflow: hidden;

    .main-content {
        width: 72%;

        .section-one {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .banner {
                width: 65%;
            }

            .special-column {
                flex: 1;
                height: 260px;
                display: flex;
                margin-left: 16px;
                flex-direction: column;
                justify-content: space-between;

                .column {
                    width: 100%;
                    height: 48%;
                    display: flex;
                    overflow: hidden;
                    border-radius: 3px;
                    position: relative;
                    align-items: center;
                    justify-content: center;

                    span {
                        z-index: 999;
                        color: #ffffff;
                        font-size: 18px;
                        position: absolute;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        filter: grayscale(50%);
                        transition: all linear .4s;
                    }

                    img:hover {
                        transform: scale(1.1);
                        transition: all linear .4s;
                    }
                }
            }
        }

        .section-two {
            width: 100%;

            .artic {
                width: 100%;
            }
        }
    }

    .main-menu {
        flex: 1;
        top: 80px;
        height: 1200px;
        overflow: hidden;
        margin-left: 16px;
        position: sticky;
        position: -webkit-sticky;

        .personal-card {
            overflow: hidden;
        }

        .menu {
            overflow: hidden;
            margin-top: 23px;
        }
    }
}
</style>
