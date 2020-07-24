<template>
<div class="blogs-container hideToShow">
    <div class="artic">
        <!-- 文章头部专栏 -->
        <div class="head">
            <div class="head-left">
                <img src="https://weichaooqx.com/figure/blog-images/my_avatar.jpg" alt="专栏封面" />
            </div>
            <div class="head-right">
                <h1>博客日记</h1>
                <p>这是我的个人博客，我的个人博客网站它不仅仅是我个人兴趣和爱好，还是我创业的起点。我爱网页设计，我爱写前端代码。它充实了我的生活，实现了我的目标和梦想。</p>
            </div>
        </div>
        <!-- 文章列表页 -->
        <articles :article="article"></articles>
        <div class="block">
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination> -->
        </div>
    </div>
    <!-- 侧边菜单栏 -->
    <div class="menu-right">
        <menu-bar></menu-bar>
    </div>
</div>
</template>

<script>
import {
    getBlogList
} from "@/api/blog/index.js";
import articles from "@/components/article/index";
import menuBar from "@/components/menu-right/index";
export default {
    components: {
        menuBar,
        articles,
    },
    data() {
        return {
            article: [],
            content: '',
        }
    },
    created() {
        this.getList();
    },
    methods: {
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
    }
};
</script>

<style lang="less" scoped>
.blogs-container {
    display: flex;
    width: 1200px;
    max-width: 1200px;
    position: relative;
    margin: 90px auto 0 auto;
    justify-content: space-between;

    .artic {
        width: 74%;

        .head {
            width: 100%;
            background: #ffffff;
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;

            &-left {
                img {
                    width: 130px;
                    height: 120px;
                }
            }

            &-right {
                margin-left: 16px;

                h1 {
                    font-size: 20px;
                    color: #1487f4;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 14px;
                    color: #888;
                }
            }
        }
    }

    .menu-right {
        flex: 1;
        top: 95px;
        height: 1000px;
        overflow: hidden;
        margin-left: 16px;
        position: sticky;
        position: -webkit-sticky;
    }

    .block {
        display: flex;
    }
}
</style><style lang="less">
.el-pagination {
    padding: 24px 0;
    margin: auto;
}

::-webkit-scrollbar {
    height: 0px !important;
}

::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 0px;
}
</style>
