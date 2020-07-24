<template lang="en">
<div class="create-blogs">
    <div class="main">
        <h1>文章发布</h1>
    </div>
    <div class="head">
        <div class="head-cell">
            <span>标题</span>
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
        </div>
        <div class="head-cell">
            <span>描述</span>
            <el-input v-model="descript" placeholder="请输入文章描述"></el-input>
        </div>
        <div class="head-cell">
            <span>分类</span>
            <el-input v-model="classify" placeholder="多个分类请用“,”分隔开来"></el-input>
        </div>
        <div class="head-cell">
            <span>标签</span>
            <el-select @change="selectChange" v-model="tag" multiple collapse-tags style="width:100%" placeholder="请选择分类标签">
                <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </div>
    </div>
    <div class="upload">
        <span>文章封面</span>
        <el-upload class="upload-demo" drag action="/api/upload/addImg" list-type="picture" multiple :on-success="uploadImg" :on-remove="removeImg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>
    </div>
    <div class="edit">
        <span>内容编辑</span>
        <editor @updata="updata"></editor>
    </div>
    <div class="submit-btn">
        <el-button class="icon" type="primary" @click="submit">
            <i class="icon">&#xe605;</i>
            发布
        </el-button>
    </div>
</div>
</template>

<script lang="en">
import {
    addblog,
    blogTags,
    deleteImg,
    updateBlog,
    getBlogList,
} from "@/api/blog/index.js";
import editor from "@/components/editor/editor";
import module from "@/components/module/index";
export default {
    components: {
        editor,
        module
    },
    data() {
        return {
            src: "",
            tag: "",
            title: "",
            descript: "",
            classify: "",
            tags: [],
            timer: null,
            articles: null,
        };
    },
    mounted() {
        this.getTags();
    },
    methods: {
        // 图片上传、返回服务器数据
        uploadImg(e) {
            this.src = e.url;
        },
        // 图片移除
        removeImg(e) {
            const name = e.name;
            deleteImg({
                name: name
            }).then(res => {
                if (res.data.success) {
                    this.$alert('删除成功', '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                            return false;
                        }
                    })
                }
            })
        },
        // 获取标签分类
        getTags() {
            blogTags({}).then(res => {
                if (res.success && res.data) {
                    this.tags = res.data;
                    return;
                }
            });
        },
        // 文章发布
        submit() {
            if (!this.validation()) {
                return
            }
            this.tag = this.tag.toString();
            addblog({
                state: 1,
                author: "魏超",
                tags: this.tag,
                updateTime: '',
                cover: this.src,
                title: this.title,
                content: this.articles,
                classify: this.classify,
                descript: this.descript,
                createTime: this.$unit.getNowFormatDate(),

            }).then(res => {
                if (res.data.success) {
                    this.$message({
                        center: true,
                        duration: 1000,
                        type: 'success',
                        message: '发布成功',
                    })
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000)
                    return
                }
                this.$message({
                    center: true,
                    type: 'error',
                    message: '发布失败',
                })
            });
        },
        // 表单简单验证
        validation() {
            var message;
            var dialog = () => {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        return false;
                    }
                })
                return false;
            }
            if (this.title == '') {
                message = '请填写标题';
                return dialog();
            } else if (this.descript == '') {
                message = '请填描文章描述';
                return dialog();

            } else if (this.classify == '') {
                message = '请填写文章分类';
                return dialog();
            } else if (this.tag.toString() == '') {
                message = '请选择分类标签';
                return dialog();
            } else {
                return true
            }

        },
        // 博客内容更新
        updata(e) {
            e = e.replace(/'/g, '"');
            this.articles = e;
        },
        // 下拉选择框
        selectChange(e) {
            console.log(e);
        },
    }
};
</script>

<style lang="less" scoped>
.create-blogs {
    margin: 20px auto;
    overflow: hidden;
    max-width: 1200px;

    .submit-btn {
        top: 50%;
        right: 0px;
        z-index: 2000;
        position: fixed;
        transform: translate(-50%, -50%);

        .el-button {
            width: 66px;
            height: 66px;
            border-radius: 50%;
            padding: 0 !important;
        }
    }

    .head {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 24px 0;
        align-items: center;
        justify-content: space-between;

        .head-cell {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                margin: 0 10px;
                font-size: 18px;
                font-weight: bold;
                display: inline-block;
            }

            .el-input,
            .el-select {
                flex: 1;
            }
        }

        .head-cell:nth-child(1) {
            span {
                margin-left: 0;
            }
        }
    }

    .edit {
        overflow: hidden;

        span {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 6px;
            display: inline-block;
        }
    }

    .upload {
        width: 100%;
        margin-bottom: 24px;

        span {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 6px;
            display: inline-block;
        }

        .upload-demo {
            width: 100%;

            /deep/.el-upload {
                width: 100%;
                height: 260px;

                .el-upload-dragger {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .el-icon-upload {
                        margin: 0;
                    }
                }
            }
        }
    }
}
</style><style>
::-webkit-scrollbar {
    height: 0px !important;
}

::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 0px;
}
</style>
