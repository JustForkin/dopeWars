import {City} from './city';

let cityInfos = [
  {
    Name: "Dublin",
    AvailableThreshold: .6
  },
  {
    Name: "London",
    AvailableThreshold: .8
  },
  {
    Name: "Paris",
    AvailableThreshold: .9
  },
  {
    Name: "Amsterdam",
    AvailableThreshold: .1
  },
  {
    Name: "Munich",
    AvailableThreshold: .6
  },
  {
    Name: "Prague",
    AvailableThreshold: .4
  },
  {
    Name: "Rome",
    AvailableThreshold: .5
  },
  {
    Name: "Ibiza",
    AvailableThreshold: 0
  }
];

let cities = cityInfos.map(cityInfo => {
  let city = {};
  city.Name = cityInfo.Name;
  city.AvailableThreshold = cityInfo.AvailableThreshold;
  return city;
});

export class CityService {
  GetCityList() {
    return new Promise( // Faking out a promise in case down the road this becomes an actual server call
      function (resolve, reject) {
          resolve(cities);
      });
  }
}