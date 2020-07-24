<template>
<div class="blogs-detail hideToShow">
    <div class="blog-content">
        <div class="container-box">
            <div class="content">
                <div class="htitle">
                    <span>文章详情</span>
                </div>
                <h1 class="con_title">{{content.title}}</h1>
                <p class="user-info">
                    <i class="avatar"><img src="https://s2.ax1x.com/2019/01/29/kQlivQ.jpg"></i>
                    <span>{{content.createTime}}</span>
                    <span>{{content.views || 0}}人已围观</span>
                    <span>{{content.tags}}</span>
                </p>
                <p class="desc"><b>简介：</b>{{content.descript || '暂无简介'}}</p>
                <div class="content-box" v-html="content.content" @click="previewImg($event)"></div>
            </div>
            <div class="comment">
                <div class="htitle">
                    <span>文章评论</span>
                </div>
                <div class="comment-container">
                    <el-input type="textarea" :maxlength="200" :rows="5" placeholder="写下你的评论......" v-model="textarea">
                    </el-input>
                    <div class="comment-tool">
                        <div class="emotion">
                            <i class="icon">&#xe608;</i>
                        </div>
                        <div class="submit">
                            <div class="user">
                                <i class="icon">&#xe60e;</i>
                                <el-input type="input" :maxlength="8" placeholder="留下你的昵称" v-model="username"></el-input>
                            </div>
                            <el-button type="primary" round>发布</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 侧边菜单栏 -->
        <div class="menu-right">
            <menu-bar></menu-bar>
        </div>
    </div>
    <!-- 图片预览组件 -->
    <img-popup ref="popup" :targetImg="targetImg"></img-popup>
</div>
</template>

<script>
import {
    getBlogDate
} from "@/api/blog/index.js";
import Prism from 'prismjs';
import imgPopup from "@/components/img-popup/index";
import menuBar from "@/components/menu-right/index";
import businessCard from "@/components/myCard/index";
import comment from "@/components/blog-comment/index";
setTimeout(() => {
    Prism.highlightAll()
}, 2000)
export default {
    components: {
        comment,
        menuBar,
        imgPopup,
        businessCard,
    },
    data() {
        return {
            id: '',
            username: '',
            content: '',
            textarea: '',
            previewImage: null,
            dialogTableVisible: false,
            targetImg: 'https://weichaooqx.com/figure/blog-images/blog-list/tiny.jpg',
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getDetail();
    },
    methods: {
        doSend(e) {
            console.log(e)
            console.log(this.commentList)
        },
        doChidSend(e) {
            console.log(e)
            console.log(this.commentList)
        },
        previewImg(e) {
            if (e.target.nodeName == 'IMG') {
                const targetImg = e.target.currentSrc;
                this.targetImg = targetImg
                this.$refs.popup.show = true;
                return
            }
        },
        getDetail() {
            getBlogDate({
                id: this.id
            }).then(res => {
                if (res.success && res.data) {
                    this.content = res.data;
                    document.title = res.data.title;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.blogs-detail {
    width: 100%;

    .blog-content {
        display: flex;
        width: 1200px;
        padding: 16px 0;
        max-width: 1200px;
        border-radius: 4px;
        margin: 80px auto 0;

        .container-box {
            width: 72%;

            .content {
                width: 100%;
                overflow: hidden;
                border-radius: 4px;
                padding: 12px 16px;
                background: #ffffff;
                box-sizing: border-box;

                .con_title {
                    font-size: 26px;
                    margin-top: 20px;
                }

                .user-info {
                    width: 100%;
                    display: flex;
                    color: #999999;
                    overflow: hidden;
                    align-items: center;

                    .avatar {
                        width: 36px;
                        height: 36px;
                        padding: 2px;
                        display: block;
                        overflow: hidden;
                        position: relative;
                        border-radius: 100%;
                        background: linear-gradient(to top right, rgba(0, 153, 255, .9), rgba(42, 228, 197, .7));

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }

                    span {
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }

                .desc {
                    width: 100%;
                    padding: 10px;
                    color: #888888;
                    margin: 20px 0;
                    line-height: 24px;
                    box-sizing: border-box;
                    border: 1px solid #F3F3F3;
                    background: none repeat 0 0 #F6F6F6;

                    b {
                        color: #181818;
                    }
                }
            }

            .comment {
                margin-top: 14px;
                padding: 12px 16px;
                border-radius: 4px;
                box-sizing: border-box;
                background-color: #ffffff;

                .comment-container {
                    width: 100%;
                    height: 200px;
                    margin-top: 20px;
                    overflow: hidden;
                    padding: 12px 16px;
                    border-radius: 8px;
                    box-sizing: border-box;
                    background-color: #f2f2f2;

                    .comment-tool {
                        display: flex;
                        margin: 12px 0;
                        align-items: center;
                        justify-content: space-between;

                        .emotion {
                            color: #f7d262;
                            font-size: 22px;
                        }

                        .submit {
                            display: flex;
                            align-items: center;

                            .user {
                                display: flex;
                                padding: 0 8px;
                                border-radius: 8px;
                                align-items: center;
                                background: #e4e4e4;
                                box-sizing: border-box;

                                .icon {
                                    color: #bbbbbb;
                                    font-size: 20px;
                                }

                                /deep/.el-input__inner {
                                    border: none;
                                    background: #e4e4e4;

                                }

                                /deep/.el-input__inner:focus {
                                    border: none !important;
                                    outline: none;
                                }

                                /deep/.el-input__inner:hover {
                                    border: none;
                                    outline: none;
                                }
                            }

                            .el-button--primary {
                                height: 36px;
                                display: flex;
                                margin-left: 20px;
                                align-items: center;
                                border-radius: 12px;
                            }
                        }
                    }
                }
            }
        }

        .menu-right {
            flex: 1;
            top: 95px;
            height: 1000px;
            overflow: hidden;
            position: sticky;
            margin-left: 16px;
            position: -webkit-sticky;
        }
    }

}

.htitle {
    margin: 0;
    width: 100%;
    display: flex;
    font-size: 18px;
    align-items: center;
    border-bottom: 1px solid #eee;

    span {
        color: #181818;
        padding: 8px 0;
        font-weight: 600;
        position: relative;
    }

    span::after {
        left: 0;
        bottom: 0;
        width: 70px;
        height: 2px;
        content: "";
        background: #409eff;
        position: absolute;
        transition: all .5s ease;
        -moz-transition: all .5s ease;
        -webkit-transition: all .5s ease;

    }

    span:hover::after {
        width: 90px;
    }
}
</style>
