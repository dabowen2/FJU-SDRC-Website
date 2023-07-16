// == jQuery extend 倒數計時器插件
$.fn.extend({
    _countTime: function(endTime ,opt){
        // ==  defalut
        this.endTime = endTime
        this.opt = {
            isActive: false,
            str: {
                title: '截止倒數',
                day: '天',
                hour: '時',
                min: '分',
                seconds: '秒',
            }
        }

        // == 判斷結束時間, 將字串轉換為時間格式
        this.calculateEndTime = function(){
            if (typeof this.endTime === 'undefined') {
                throw new Error('請輸入結束時間 EX:"2018-12-12 12:00:00", Please  enter endTime => ex. "2018-05-05 12:00:00"')
            } else if (typeof this.endTime != 'string') {
                throw new Error('請用字串輸入, 例如 "2018-05-05 12:00:00", Use string => ex. "2018-05-05 12:00:00"')
            } else {
                this.endTime = new Date(this.endTime).getTime()
            }
        }

        // == 算出倒數時間
        this.diff = function(){
            return (this.endTime - new Date().getTime()) / 1000
        }

        // == 轉換成html呈現格式
        this.render = function(){
            let diff = this.diff()
            let s = parseInt(diff % 60)
            let m = parseInt(diff / 60 % 60 )
            let h = parseInt(diff / 60 / 60 % 24)
            let d = parseInt(diff / 24 / 60 / 60)
            const str = this.opt.str
            if (this.opt.isActive) {
                let active = `${str.title} ${d}${str.day} ${h}${str.hour} ${m}${str.min} <span class='js-count-active'>${s}${str.seconds}</span>`
                this.html(active)
            } else {
                this.text(`${str.title} ${d}${str.day} ${h}${str.hour} ${m}${str.min} ${s}${str.seconds}`)
            }
        }

        // 自訂參數轉換
        this.changeDef = function(value){
            for (let key in this.opt ){
                for (let key2 in value) {
                    //如果有第二層物件需要進行二次判斷
                    if (value[key] != null && typeof value[key] === 'object') {
                        for (let keySecond in this.opt[key]) {
                            for (let key2Second in value[key]) {
                                if (key2Second === keySecond) {
                                    this.opt[key][keySecond] = value[key][key2Second]
                                }
                            }
                        }

                    //沒有第二層,相等就覆蓋
                    } else if (key2 === key) {
                        this.opt[key] = value[key2]
                    }
                }
            }

            this.calculateEndTime() // = 判斷自訂的結束時間,並轉換成時間格式
        }

        // 初始自訂參數,啟用timer
        this.init = function() {
            this.changeDef(opt)
            setInterval(() => {
                this.render()
            }, 1000)
        }
        this.init()
        return this
    }
})



    // base
    $('.timer')._countTime('2018-05-26 12:30:00')

    // 自訂參數
    $('.timer2')._countTime('2018-05-27 12:00:00', {
        isActive: true,
        str: {
            title: 'Countdown: ',
            day: 'day',
            hour: 'hour',
            min: 'min',
            seconds: 's'
        }
    })