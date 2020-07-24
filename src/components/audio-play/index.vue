<template>
<div id="aplayer"></div>
</template>

<script>
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import {
    songLrc,
    playDetail,
    songDetail,
    playSongList,
} from "@/api/music/playlist.js";
export default {
    data() {
        return {
            songId: "",
            musicUrl: "",
            auths: [],
            musicList: [],
            songDetail: {},
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.audioInit();
        })
    },
    methods: {
        // 加载音乐播放器
        audioInit() {
            const ap = new APlayer({
                container: document.getElementById('aplayer'),
                loop: 'all',
                theme: '#FADFA3',
                order: 'random',
                preload: 'auto',
                volume: 0.7,
                fixed: true,
                float: true,
                mini: true,
                lrcType: 3,
                autoplay: false,
                listFolded: true,
                listMaxHeight: 90,
                audio: [{
                        name: '胡66 - 后来遇见他',
                        artist: '另一个我',
                        url: 'http://weichaooqx.com/media/胡66 - 后来遇见他.mp3',
                        cover: 'http://weichaooqx.com/media/胡66 - 后来遇见他.jpg',
                        lrc: 'http://weichaooqx.com/media/胡66 - 后来遇见他.lrc',
                    },
                    {
                        name: '海伦 - 桥边姑娘',
                        artist: '桥边姑娘',
                        url: 'http://weichaooqx.com/media/桥边姑娘.mp3',
                        cover: 'http://weichaooqx.com/media/桥边姑娘.jpg',
                        lrc: 'http://weichaooqx.com/media/桥边姑娘.lrc',
                    },
                    {
                        name: '李玖哲 - 夏天',
                        artist: '好玖',
                        url: 'http://weichaooqx.com/media/李玖哲 - 夏天.mp3',
                        cover: 'http://weichaooqx.com/media/李玖哲 - 夏天.jpg',
                        lrc: 'http://weichaooqx.com/media/李玖哲 - 夏天.lrc',
                    },
                ],
            });
            ap.on('loadstart', function () {
                ap.lrc.hide()
            })
            ap.on('play', function () {
                ap.lrc.show()
            })
            ap.on('pause', () => {
                ap.lrc.hide()
            })
        },
    }
}
</script>

<style lang="less">

</style>
