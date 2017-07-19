
    function resizeTextarea(ev) {
        this.style.height = '48px';
        this.style.height = this.scrollHeight + 'px';
        
        document.getElementById("temp").innerText = this.value;

        if (this.value === '') this.style.width = '360px';
        else this.style.width = (document.getElementById("temp").offsetWidth+40)+'px';
    //   this.style.width = (document.getElementById("temp").offsetWidth+40)+'px';


    }

    function guid() {
    function s4() { return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);}
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function formatDate(time, format) {
        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }