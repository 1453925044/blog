<template>
<footer id="footer">
    <div class="footBox">
        <div class="pesonalCard">
            <ul>
                <li>
                    <img class="img" src="/images/wx_card.png" alt="微信名片" />
                    <span>我的微信</span>
                </li>
            </ul>
        </div>
        <div class="personalStatement">
            <p>
                <b>站点声明</b>
            </p>
            <p>{{webInfo.text_one || '本个人博客网站，均为魏超本人设计，未经博主许可不得用于任何商业目的。'}}</p>
            <p>{{webInfo.text_two || '所有文章、个人博客未经授权禁止转载、摘编、复制或建立镜像，如有违反，追究法律责任。举报邮箱：1453925044@qq.com'}}</p>
            <div class="beian-info">
                <div class="public">
                    {{webInfo.copyright || '© 2018 魏超个人博客 All Rights Reserved.'}}
                </div>
                <div class="public" @click="jump('http://www.beian.miit.gov.cn')">
                    <img src="/images/icp.png" alt="">
                    <span> {{webInfo.record || '蜀ICP备18020325号'}}</span>
                </div>
                <div class="public" @click="jump('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002002992')">
                    <img src="/images/ba.png" alt="">
                    <span> {{webInfo.beian || '川公网安备 51019002002992号'}}</span>
                </div>
            </div>
        </div>
    </div>
</footer>
</template>

<script>
import {
    website
} from '@/api/website/website';
export default {
    data() {
        return {
            webInfo: {}
        };
    },
    mounted() {
        // this.webSiteInfo();
    },
    methods: {
        // 获取站点描述信息
        webSiteInfo() {
            website().then(res => {
                if (res.success) {
                    this.webInfo = res.data;
                    return
                }
            })
        },
        // 跳转备案查询网站
        jump(url) {
            window.open(url);
        }
    }
};
</script>

<style lang="less" scoped>
footer::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    top: 0;
    left: 0;
    background: linear-gradient(to left,
            #4cd964,
            #5ac8fa,
            #007aff,
            #34aadc,
            #5856d6,
            #ff2d55);
}

footer {
    position: relative;
    background: #373d41;

    .footBox {
        max-width: 1200px;
        margin: auto;
        padding: 16px 0 10px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;

        .pesonalCard {
            ul {
                width: 100%;
                display: flex;

                li {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-right: 24px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    span {
                        color: #73777a;
                    }
                }
            }
        }

        .personalStatement {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 24px;

            p {
                color: #73777a;

                b {
                    color: #00c1de;
                }
            }

            .beian-info {
                display: flex;
                align-items: center;

                .public {
                    display: flex;
                    color: #73777a;
                    margin-right: 10px;
                    align-items: center;
                }
            }
        }
    }
}

span:hover {
    color: #00C1DE;
    cursor: pointer;
}
</style>
