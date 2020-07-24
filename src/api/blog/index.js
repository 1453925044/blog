import { httpGet, httpPost } from '@/http/http.js'

//新增博客
const addblog = (info) => httpPost('/blog/newBlog', info)

// 获取博客
const getBlogList = (info) => httpGet('/blog/list', info)

// 获取博客详情
const getBlogDate = (info) => httpGet('/blog/detail', info)

// 更新博客
const updateBlog = (info) => httpPost('/blog/update', info);

// 删除博客 
const delBlog = (info) => httpPost('/blog/del', info);

// 获取博客标签分类
const blogTags = (info) => httpGet('/blog/tags', info);

// 根据标签获取博客文章
const filterArticle = (info) => httpGet('/blog/filterArticle' ,info);

// 获取文章排行榜
const articleRank = (info) => httpGet('/blog/articleRank' ,info);

// 获取最新发布文章
const createTime = (info) => httpGet('/blog/createTime' ,info);

// 删除图片
const deleteImg = (info) => httpPost('/upload/deleteImg', info)


export {
    addblog,
    delBlog, 
    blogTags,
    deleteImg,
    getBlogDate, 
    updateBlog,
    getBlogList,
    filterArticle,
    articleRank,
    createTime
}