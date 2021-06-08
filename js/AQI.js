
function getData() {
    var req = new XMLHttpRequest();
    req.open("get", "https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=100&api_key=2a19f687-37b3-41a5-bf4d-6828ee27bbb2")

    req.onload = function () {
        // 分析JSON資料
        var airdata = JSON.parse(req.responseText);
        //測試有抓到資料
        console.log(airdata.records[39].SiteName, airdata.records[39].AQI, airdata.records[39].PublishTime)
        // airdata.fields[0].info.records[0].SiteName
        var number = airdata.records[39].AQI
        //sitename
        document.getElementById('air-sitename').innerText = airdata.records[39].SiteName
        //AQI number
        document.getElementById('AQInum').innerText = number
        //publishtime
        document.getElementById('pubtime').innerText = airdata.records[39].PublishTime

        var AQInum = document.getElementById('AQInum')
        var face=document.getElementById('level-1')
        AQInum.style.width = number * 0.78 + 'px'
        //color 呈現根據 https://zh.wikipedia.org/wiki/%E7%A9%BA%E6%B0%A3%E5%93%81%E8%B3%AA%E6%8C%87%E6%A8%99
        if (number >=0 && number<=50) {
            AQInum.style.backgroundColor = '#8ADB64'
            face.innerHTML='<i class="fa fa-smile-o" aria-hidden="true"></i>'
        } else if (number >=51 && number<=100) {
            AQInum.style.backgroundColor = '#fff136'
            face.innerHTML='<i class="fa fa-smile-o" aria-hidden="true"></i>'
        } else if (number >=101 && number<=150) {
            AQInum.style.backgroundColor = '#EFA92A'
            face.innerHTML='<i class="fa fa-meh-o" aria-hidden="true"></i>'
        } else if (number >=151 && number<=200) {
            AQInum.style.backgroundColor = '#CC2C37'
            face.innerHTML='<i class="fa fa-meh-o" aria-hidden="true"></i>'
        } else if (number >=201 && number<=300) {
            AQInum.style.backgroundColor = '#5D448A'
            face.innerHTML='<i class="fa fa-frown-o" aria-hidden="true"></i>'
        } else {
            AQInum.style.backgroundColor = '#990000'
            face.innerHTML='<i class="fa fa-frown-o" aria-hidden="true"></i>'
        }

        



    }
    req.send();
}