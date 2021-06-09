let img_block = document.getElementById("loc_name_block")
let time_period = document.getElementById("time_period")
let date_time = 0;
let main_data = null
let pin = document.getElementById("pin")
let item_pos = {}
let loc = document.getElementById("location");
fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-6DB1B8BA-C3F5-49F7-8443-999865A34532"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        add_time(data)
        render_area(data)
        main_data = data
    });

function add_time(data) {
    let d = data.records.location[0].weatherElement[0].time
    let c = -1;
    d.forEach((item) => {
        c++
        let starttime = item.startTime
        let endtime = item.endTime
        let time_block = document.createElement("option")
        time_block.innerHTML = starttime + " ~ " + endtime
        time_block.value = c
        time_period.appendChild(time_block)
    })
}

time_period.addEventListener("change", change_time)

function change_time() {
    date_time = this.value;
    render_area(main_data)
}

function render_area(data) {
    img_block.innerHTML = ""
    data.records.location.forEach((element) => {
        let loc_area = document.createElement("div");
        let loc_name = document.createElement("p")
        loc_area.appendChild(loc_name)
        let des = element.weatherElement[0].time[date_time].parameter.parameterName
        if (des.includes("雨")) {
            loc_name.innerHTML = '<i class="fas fa-cloud-rain"></i>'
        } else if (des.includes("陰") || des.includes("雲")) {
            loc_name.innerHTML = '<i class="fas fa-cloud"></i>'
        } else {
            loc_name.innerHTML = '<i class="fas fa-sun"></i>'
        }
        img_block.appendChild(loc_area)
        loc_area.classList.add("loc_area")
        loc_area.classList.add(element.locationName)
        loc_area.dataset.des = element.locationName+" : "+element.weatherElement[0].time[date_time].parameter.parameterName
        loc_area.dataset.loc = element.locationName
        loc_area.addEventListener("click",function(){
            pin.style.top = this.offsetTop-20+"px"
            pin.style.left = this.offsetLeft+"px"
            change_area_select(this)
        })
        item_pos[element.locationName]={
            x:loc_area.offsetLeft,
            y:loc_area.offsetTop-20
        }
    });
}



function change_area_select(dom){

    let city_for_change = document.getElementsByClassName("loc_name_for_class")

    Array.from(city_for_change).forEach((item)=>{
        if(item.value===dom.dataset.loc){
            loc.value = dom.dataset.loc
            loc.dispatchEvent(new Event("change"))
        }
    })

}