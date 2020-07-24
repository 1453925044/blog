<template>
<header id="header">
    <nav class="nav-menu">
        <ul class="list">
            <li class="menu-cell" :class="{'active' :is_active==index}" v-for="(item, index) in navList" :key="index" @click="change(item,index)">
                <span class="path">
                    <i class="fa" :class="[item.icon,{'is_active' :is_active==index}]">&nbsp; {{ item.title }}</i>
                </span>
            </li>
        </ul>
    </nav>
</header>
</template>

<script>
export default {
    data() {
        return {
            is_active: 0,
            navList: [{
                    title: "首页",
                    name: "index",
                    path: "/index",
                    icon: "fa-home"
                },
                {
                    title: "MyBlogs",
                    name: "myBlogs",
                    path: "/blog",
                    icon: "fa-folder"
                },
                 {
                    title: "关于我",
                    name: "about",
                    path: "/about",
                    icon: "fa-user"
                },
                {
                    title: "个人日记",
                    name: "diary",
                    path: "/diary",
                    icon: "fa-music"
                },
                {
                    title: "学无止境",
                    name: "learn",
                    path: "/learn",
                    icon: "fa-hourglass-1"
                }
            ],

        };
    },
    watch: {
        "$route"() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var path;
            if (this.$route.matched.length) {
                path = this.$route.matched[0].path;
            } else {
                path = this.$route.path;
            }
            this.checkPath(path);
        },
        // 首页导航路由跳转
        change(e, index) {
            this.is_active = index;
            this.$router.push(e.path);
        },
        checkPath(path) {
            this.is_active = this.navList.findIndex(item => item.path === path)
        }
    }
};
</script>

<style lang="less" scoped>
@media (max-width: 1200px) {
    .nav-menu {
        width: 1200px;
    }
}

@media (min-width: 992px) {
    .nav-menu {
        width: 970px;
    }
}

@media (min-width: 768px) {
    .nav-menu {
        width: 750px;
    }

    .color-logo {
        display: none;
        float: left;
        width: 20%;
    }
}

#header {
    top: 0;
    left: 0;
    padding: 0;
    width: 100%;
    z-index: 1999;
    position: fixed;
    overflow: hidden;
    background-color: #343c47;

    .nav-menu {
        width: 1200px;
        margin: auto;

        .list {
            width: 100%;
            display: flex;

            .active {
                position: relative;
            }

            .active::after {
                left: 0;
                z-index: -1;
                bottom: 0px;
                content: "";
                width: 100%;
                height: 3px;
                border-radius: 12px;
                position: absolute;
                background-color: #45b6f7;
                animation: borderFull 0.5s ease-in-out;
            }

            .menu-cell {
                cursor: pointer;
                position: relative;
                .path {
                    display: block;
                    height: 66px;
                    padding: 0 13px;
                    line-height: 66px;
                    color: #ffffff;
                    font-weight: bold;
                    font-size: 15px;
                }

                .path:hover {
                    color: #409eff;
                }

                .is_active {
                    color: #45b6f7;
                }
            }
        }
    }
}

@keyframes borderFull {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}
</style>
