var app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
        sos_on: async function(){
            await axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=sos');
            // 上のAPIを叩くと、resでdata: 'sos'しか返ってこないので、sosのステータスを判断できない
            // なので、下のようにsosのステータス取得しにいく
            const sosStatus = await axios.get("https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=sos_read");
            alert(window.ledCharacteristic);
            alert('sosステータスです' + sosStatus.data);
            this.sendSosStatus(sosStatus.data);
        },
        state_odor: function(){
            this.count_odor += 1
            axios.get('', {
                params: {
                 p: ""
                }
            });
        },
        sendSosStatus: function (sosStatus) {
            // esp32にブザーを鳴らす値を送る関数
            window.ledCharacteristic.writeValue(
                // onの時、1
                // offのとき、0を送る
                sosStatus ? new Uint8Array([0x01]) : new Uint8Array([0x00])
            ).catch(error => {
                uiStatusError(makeErrorMsg(error), false);
            });
        }
    }
  })
