<template>
<div>
    <editor id="tinymce" v-model="content" :init="init"></editor>
</div>
</template>

<script>
import {
    upLoadFile
} from "@/http/http.js";
// 引入富文本编辑器
import Prism from "prismjs";
import "tinymce/themes/silver";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// 编辑器插件plugins
import "tinymce/plugins/help";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/anchor";
import "tinymce/plugins/preview";
import "tinymce/plugins/charmap";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/advlist";
import "tinymce/plugins/template";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/codesample";
import "tinymce/plugins/fullscreen";
import "tinymce/icons/default/icons";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/emoticons/js/emojis";
Prism.highlightAll();
export default {
    components: {
        Editor
    },
    watch: {
        content(newVal, oldVal) {
            return this.$emit("updata", newVal);
        }
    },
    data() {
        return {
            content: null,
            init: {
                // 选择器
                selector: "#tinymce",
                theme: "silver", //设置主题
                suffix: ".min",
                branding: false, //隐藏右下角
                paste_data_images: true, // 允许粘贴图像
                contextmenu: "bold copy", //上下文菜单
                width: "100%", //编辑器宽度
                height: 710, //编辑器高度
                auto_focus: true, // 自动获取光标
                toolbar_mode: "wrap", //工具栏布局
                language: 'zh_CN', //中文语言
                language_url: "/tinymce/langs/zh_CN.js", //语言包
                skin_url: "/tinymce/skins/ui/oxide", //主题色
                plugins: "link template lists preview advlist insertdatetime emoticons codesample charmap autolink autosave anchor fullscreen image code help table wordcount ", // 插件列表
                // 工具栏列表
                toolbar1: "codesample code undo redo cut | alignleft aligncenter alignright alignjustify outdent indent |insertdatetime copy paste image preview |forecolor backcolor bold italic underline strikethrough link anchor  restoredraft |blockquote subscript superscript removeformat  emoticons table fullscreen",
                toolbar2: `charmap  help bullist numlist | styleselect formatselect fontselect fontsizeselect`,
                codesample_global_prismjs: true, //全局使用代码高亮js
                content_css: "/css/prism.css", //代码高亮css
                codesample_languages: [{
                        text: "HTML/XML",
                        value: "markup"
                    },
                    {
                        text: "JavaScript",
                        value: "javascript"
                    },
                    {
                        text: "CSS",
                        value: "css"
                    },
                    {
                        text: "Sql",
                        value: "sql"
                    },
                    {
                        text: "Nginx",
                        value: "nginx"
                    },
                    {
                        text: "PHP",
                        value: "php"
                    },
                    {
                        text: "Ruby",
                        value: "ruby"
                    },
                    {
                        text: "Python",
                        value: "python"
                    },
                    {
                        text: "Java",
                        value: "java"
                    },
                    {
                        text: "C",
                        value: "c"
                    },
                    {
                        text: "C#",
                        value: "csharp"
                    },
                    {
                        text: "C++",
                        value: "cpp"
                    },
                    {
                        text: "Dart",
                        value: "dart, "
                    }
                ],
                // 自定义特殊符号
                charmap_append: [
                    [0x2615, "morning coffee"],
                    [0x2600, "sun"],
                    [0x2601, "cloud"]
                ],
                menubar: "file edit insert view format table tools help", //菜单栏
                fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px", //字体预设大小
                images_upload_handler: (blobInfo, success, failure) => {
                    let formData = new FormData();
                    const imgFile = blobInfo.blob();
                    formData.append("file", imgFile);
                    upLoadFile("/upload/addImg", formData)
                        .then(res => {
                            if (res.success) {
                                let imgSrc = res.data.url;
                                success(imgSrc);
                                return;
                            }
                            failure: (res) => {
                                console.log(res.message)
                            }
                        })
                        .catch(err => {
                            console.log(err); 
                        });
                }
            }
        };
    },
    mounted() {}
};
</script>

<style lang="less">
@import url("/css/prism.css");
</style>
