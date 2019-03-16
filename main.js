axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=temp').then(function(response){count_temp = response.data}); //寒くしたいの押された数

setTimeout(function(){
    var app = new Vue({
        el: '#app',
        data: {
            train_number: 0, //車両ナンバー
            temperature: count_temp, //温度
            temperature_controller_count: 0,
            count_comfortable: 0, //快適の押された数
            count_temperatureUp: 0, //暑くしたいの押された数
            count_temperatureDown: 0, //寒くしたいの押された数
            count_odor: 0, //臭いの押された数
            change_image: 0
        },
        methods: {
            state_comfortable: function(){ //快適
                this.count_comfortable = axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=comfortable_read'
                ).then(function(response){console.log(response)});
                axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=comfortable'
                ).then(function(response){console.log(response)});
            },
            state_temperatureUp: function(){ //暑くしたい
                this.temperature_controller_count += 1;
                this.count_temperatureUp = axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=cold_read'
                ).then(function(response){console.log(response)});
                axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=cold'
                ).then(function(response){console.log(response)});
                this.change_image = 1;
                setTimeout(this.image_delete, 1000);
                console.log(this.change_image);
            },
            state_temperatureDown: function(){ //寒くしたい
                this.temperature_controller_count -= 1;
                this.count_temperatureDown = axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=hot_read'
                ).then(function(response){console.log(response)});
                axios.get('https://script.google.com/macros/s/AKfycbwyOx1qqIu0SYBEFWROiUjKNN0Ar_vscxjke41e7-XfYCqsPKtJ/exec?q=hot'
                ).then(function(response){console.log(response)});
                this.change_image = 2;
                setTimeout(this.image_delete, 1000);
                console.log(this.change_image);
            },
            state_odor: function(){ //臭い
                this.count_odor += 1
            },
            image_delete: function(){
                this.change_image = 0;
            }
        }
    })
}, 3000)
