<template>
    <div>
        {{countDownText()}}{{countTime}}{{leftTime()}}
        <p></p>
       <ul>
           <li v-for="(list,index) in timeSelect" :key="index" :class="{current: leftTime().inx == index}">
               <p>{{list.name}}</p>
               <p v-if="!list.end">
                   {{list.start ? '火热进行中': '未开抢'}}
               </p>
               <p v-else>
                   已结束
               </p>
           </li>
       </ul>
    </div>
</template>

<script>
    let inter = null;
    export default {
        mounted () {
            this.countDown();
        },
        data () {
            return {
                activeEnd: false,  //活动是否结束
                timeSelect: [
                    {
                        name: '10月8-10',
                        startTime: '2018-10-08',
                        endTime: '2018-10-10',
                        start: false,
                        end: false,
                    },
                    {
                        name: '10月18-20',
                        startTime: '2018-10-18',
                        endTime: '2018-10-20',
                        start: false,
                        end: false,
                    },
                    {
                        name: '10月28-30',
                        startTime: '2018-10-28',
                        endTime: '2018-10-30',
                        start: false,
                        end: false,
                    },
                    {
                        name: '11月8-10',
                        startTime: '2018-11-08',
                        endTime: '2018-11-10',
                        start: false,
                        end: false,
                    }
                ],
                countTime: {
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0
                }
            }
        },
        methods: {
            countDown () {
                let day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0;
                let leftSecond = this.leftTime().leftSecond / 1000;

                let getTime = () => {
                    day = Math.floor(leftSecond / (60 * 60 * 24));
                    hour = Math.floor(leftSecond / (60 * 60)) - (day * 24);
                    minute = Math.floor(leftSecond / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(leftSecond) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    leftSecond --;
                    this.countTime = {
                        day: day,
                        hour: hour,
                        minute: minute,
                        second: second
                    }
                }
                inter = setInterval(() => {
                    if (leftSecond < 1 && this.leftTime().inx != null) {
                        leftSecond = this.leftTime().leftSecond / 1000;
                        getTime();
                    }
                    else if (leftSecond < 0 && this.leftTime().inx == null) {
                        clearInterval(inter);
                        this.activeEnd = true;
                    }
                    else {
                        getTime();
                    }
                },1000);
                
            },
            leftTime () {
                let _now = new Date().getTime();
                let _leftSecond = null,inx = null,isOn = false;
                
                for (let i = 0; i< this.timeSelect.length; i++) {
                    let _startTime = new Date(this.timeSelect[i].startTime).getTime(),
                        _endTime = new Date(this.timeSelect[i].endTime).getTime();
                    //如果大于开始时间 小于结束时间
                    if (_now >= _startTime && _now <= _endTime) {
                        this.timeSelect[i].start = true;
                        _leftSecond = _endTime - _now;
                        inx = i;
                        isOn = true;
                        break;
                    }
                    //如果大于结束时间
                    else if (_now > _endTime) {
                        this.timeSelect[i].end = true;
                    }
                    //小于开始时间
                    else if (_now < _startTime) {
                        _leftSecond = _startTime - _now;
                        inx = i;
                        break;
                    }
                }
                return {
                    leftSecond: _leftSecond,
                    inx: inx,
                    isOn: isOn
                };
            },
            countDownText () {
                let _leftTime = this.leftTime();
                let _text = '';
                if (_leftTime.inx == 0 && _leftTime.leftSecond > 0 && !_leftTime.isOn) {
                    _text = '距离活动开始还有：'
                }
                else if (_leftTime.inx > 0 && _leftTime.leftSecond > 0 && !_leftTime.isOn) {
                    _text = '距离下次活动开始还有：'
                }
                else if (_leftTime.isOn) {
                    _text = '本場距離活動結束還有'
                }
                else {
                    _text = '活动已经结束'
                }

                return _text
            }
        },
        destroyed () {
            clearInterval(inter)
        }
    }

    
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}
.current {
    color: #27a1fb
}

</style>