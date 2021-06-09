let site_select = document.getElementById("sitename_for_select")
let location_select = document.getElementById("location")
let airdata = null
let Data_AQI = null

function getData() {
    var req = new XMLHttpRequest();
    req.open("get", "https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=100&api_key=2a19f687-37b3-41a5-bf4d-6828ee27bbb2")

    req.onload = function () {
        // 分析JSON資料
        airdata = JSON.parse(req.responseText);
        // //測試有抓到資料
        // console.log(airdata.records[39].SiteName, airdata.records[39].AQI, airdata.records[39].PublishTime)
        // airdata.fields[0].info.records[0].SiteName
        Data_AQI = get_city_AQI(airdata.records,location_select.value)
    
        append_city_AQI(Data_AQI)
        chanage_bar(airdata,Data_AQI)
    }
    req.send();
}

function get_city_AQI(list,val){

    let dict_for_siteName = {}

    list.forEach(element => {
        if(element.County===val){
            dict_for_siteName[element.SiteName]=element.AQI
        }
    });

    return dict_for_siteName

}

function append_city_AQI(dict){
    site_select.innerHTML = ""

    for(const [key,value] of Object.entries(dict)){
        let op = document.createElement("option")
        site_select.appendChild(op)
        op.value = key
        op.innerHTML = key
    }

}

site_select.addEventListener("change",function(){
    chanage_bar(airdata,Data_AQI)
})

function chanage_bar(RawData,dict){
    var number = dict[site_select.value]
    //sitename
    document.getElementById('air-sitename').innerText = site_select.value
    //AQI number
    document.getElementById('AQInum').innerText = number
    //publishtime
    document.getElementById('pubtime').innerText = RawData.records[39].PublishTime

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