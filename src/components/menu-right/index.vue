<template>
<div class="box">
    <module :title="'点击排行'">
        <ul class="moudle-list">
            <li class="cell" v-for="(item,index) in rankList" :key="index" @click="jump(item.id)">
                <p>
                    <i class="icon">&#xe6e7;</i>
                    <span>{{item.title}}</span>
                </p>
            </li>
        </ul>
    </module>
    <module :title="'最新文章'">
        <ul class="moudle-list">
            <li class="cell" v-for="(item,index) in newsList" :key="index" @click="jump(item.id)">
                <p>
                    <i class="icon">&#xe6e7;</i>
                    <span>{{item.title}}</span>
                </p>
            </li>
        </ul>
    </module>
    <module :title="'标签云'" v-if="$route.path == '/index'">
        <div class="btn-tag">
            <span class="btn" v-for="(item,index) in tags" :key="index" @click="chooseArticle(item)">{{item.name}}</span>
        </div>
    </module>
</div>
</template>

<script>
import {
    blogTags,
    createTime,
    articleRank,
    filterArticle
} from "@/api/blog/index.js";
import module from "@/components/module/index";
import $ from "jquery";
export default {
    components: {
        module
    },
    data() {
        return {
            tags: [],
            rankList: [],
            newsList: []

        };
    },
    created() {
        this.getTags();
    },
    async mounted() {
        await this.getRank();
        await this.getNews();
    },
    methods: {
        // 获取标签分类
        getTags() {
            blogTags({}).then(res => {
                if (res.success && res.data) {
                    this.tags = res.data;
                    this.hoverTag();
                    return;
                }
            });
        },
        getRank() {
            articleRank({
                count: 5
            }).then(res => {
                if (res.success && res.data) {
                    this.newsList = res.data;
                    return
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getNews() {
            createTime({
                count: 5
            }).then(res => {
                if (res.success && res.data) {
                    this.rankList = res.data;
                    return
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 标签筛选
        chooseArticle(item) {
            filterArticle({
                    name: item.name
                })
                .then(res => {
                    if (res.success && res.data.length) {
                        window.scrollTo(0, 0);
                        let data = this.$unit.richFormat(res.data);
                        this.$emit("upDataArticle", data);
                        return;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 自定义彩色标签
        hoverTag() {
            $(function () {
                let tag = $(".btn");
                const selectFrom = () => {
                    return Math.floor(Math.random() * 16777215).toString(16);
                }
                for (var i = 0; i < tag.length; i++) {
                    var color = selectFrom();
                    $(tag[i]).css({
                        color: "#" + color,
                        background: "#fafafa",
                        "font-family": "pingfang"
                    });
                    $(tag[i])
                        .mouseenter(function () {
                            var target = $(this).css("color");
                            $(this).css({
                                background: target,
                                color: "#ffffff"
                            });
                        })
                        .mouseleave(function () {
                            var target = $(this).css("background-color");
                            $(this).css({
                                background: "#fafafa",
                                color: target
                            });
                        });
                }
            });
        },
        jump(id) {
            this.$router.push({
                path: 'blog/detail',
                query: {
                    id: id
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
.box {
    width: 100%;
}

.moudle-list {
    overflow: hidden;

    .cell {
        width: 100%;
        cursor: pointer;

        p {
            width: 100%;
            overflow: hidden;

            span {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
