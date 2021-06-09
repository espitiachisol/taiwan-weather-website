const CWB_API_KEY = "CWB-6DB1B8BA-C3F5-49F7-8443-999865A34532";
// selcet
let loc = document.getElementById("location");
let time = document.getElementById("time");
//show
const Wx = document.querySelector(".Wx");
const PoP = document.querySelector(".PoP");
const MinT = document.querySelector(".MinT");
const CI = document.querySelector(".CI");
const MaxT = document.querySelector(".MaxT");
const weatherIcon = document.querySelector(".weather-icon");
//var
let data = null;
let userSelectLoc = null;
let userSelectTime = 0;
//
const sun = [1];
const sunCloud = [2, 3];
const cloud = [4];
const cloudy = [5, 6, 7];
const sunRain = [8, 9, 10, 11, 19, 20, 21, 30];
const rain = [12, 13, 14, 29, 31, 32, 38, 37, 39];
const thunder = [15, 16, 17, 18, 22, 33, 34, 35, 36, 41];
const fog = [25, 24, 26, 27, 28];
const snow = [42, 23];

//event
const display = function (data) {
  let curdata = data[0]; //設定目前資料為location的第一筆資料“嘉義縣”
  if (userSelectLoc) {
    data.forEach((element) => {
      if (element.locationName === userSelectLoc) {
        curdata = element;
      }
    });
  }
  if (userSelectTime) {
    userSelectTime = userSelectTime;
  }

  let WxValue =
    curdata.weatherElement[0].time[userSelectTime].parameter.parameterValue;
  src = getPhoto(WxValue);
  console.log(userSelectLoc, userSelectTime);
  weatherIcon.setAttribute("src", src);
  Wx.textContent =
    curdata.weatherElement[0].time[userSelectTime].parameter.parameterName;
  PoP.textContent =
    curdata.weatherElement[1].time[userSelectTime].parameter.parameterName +
    "%";
  MinT.textContent =
    curdata.weatherElement[2].time[userSelectTime].parameter.parameterName +
    "°";
  CI.textContent =
    curdata.weatherElement[3].time[userSelectTime].parameter.parameterName;
  MaxT.textContent =
    curdata.weatherElement[4].time[userSelectTime].parameter.parameterName +
    "°";
};

const getPhoto = function (WxValue) {
  WxValue = Number(WxValue);
  console.log(WxValue);
  if (sun.includes(WxValue)) return "./img/晴.png";
  if (sunCloud.includes(WxValue)) return "./img/晴多雲.png";
  if (cloud.includes(WxValue)) return "./img/多雲.png";
  if (cloudy.includes(WxValue)) return "./img/陰.png";
  if (sunRain.includes(WxValue)) return "./img/陰雨.png";
  if (rain.includes(WxValue)) return "./img/雨.png";
  if (thunder.includes(WxValue)) return "./img/雷雨.png";
  if (fog.includes(WxValue)) return "./img/霧.png";
  if (snow.includes(WxValue)) return "./img/雪.png";
};

const displayOptions = function (data) {
  data.forEach((element) => {
    let loc_name = document.createElement("option");
    loc_name.value = element.locationName;
    loc_name.innerHTML = element.locationName;
    loc.appendChild(loc_name);
  });
  let time_pos = 0;
  data[0].weatherElement[0].time.forEach((element) => {
    let time_name = document.createElement("option");
    time_name.value = time_pos;
    time_name.textContent = element.startTime + " ~ " + element.endTime;
    time.appendChild(time_name);
    time_pos++;
  });
};
fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" +
    CWB_API_KEY
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data = data.records.location;
    displayOptions(data);
    display(data);
    loc.addEventListener("change", () => {
      userSelectLoc = loc.value;
      display(data);
      change_pin(loc.value,item_pos)
      getData()
    });
    time.addEventListener("change", () => {
      userSelectTime = time.value;
      display(data);
    });
  });


  function change_pin(item,data){
    pin.style.top = data[item].y+"px"
    pin.style.left = data[item].x+"px"
  }

// let records = null;
// fetch(
//   "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=" +
//     CWB_API_KEY
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     records = data.records;
//     console.log(records);
//     renderRaining(0);
//   });
// function renderRaining(page) {
//   let startIndex = page * 10;
//   let endIndex = (page + 1) * 10;
//   const container = document.querySelector("#raining");
//   for (let i = startIndex; i < endIndex; i++) {
//     const location = records.location[i];
//     const item = document.createElement("div");
//     item.className = "location";
//     const town = document.createElement("div");
//     town.className = "town";
//     town.textContent =
//       location.parameter[0].parameterValue +
//       "、" +
//       location.parameter[2].parameterValue;
//     const amount = document.createElement("amount");
//     amount.className = "amount";
//     amount.textContent = location.weatherElement[6].elementValue + " mm";
//     item.appendChild(town);
//     item.appendChild(amount);
//     container.appendChild(item);
//   }
// }
