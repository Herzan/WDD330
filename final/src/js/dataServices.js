import { convertToJson } from './utils';

let apiUrl = import.meta.env.VITE_API_URL;

export async function getJson(title) {
  return await fetch(`/json/${title}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function getAPI(url = '', filter = (info) => info) {
  let path = '';
  if (url.includes('http')) {
    path = url;
  } else {
    path = apiUrl + url;
  }

  let data = [];
  try {
    let response = await fetch(path);
    let rawData = await convertToJson(response);
    data = data.concat(rawData.results);

    if (rawData.next !== null) {
      let nextData = await getAPI(rawData.next);
      data = data.concat(nextData);
    }

    let filteredData = data.map((item) => {
      return filter(item);
    });

    // await subAPI(filteredData);
    return filteredData;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

export function planetSchema(data) {
  let template = ['name', 'climate', 'terrain', 'population'];
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => template.includes(key)),
  );
  return filteredData;
}

export function nameOnlySchema(data) {
  let template = ['name'];
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => template.includes(key)),
  );
  return filteredData;
}

async function subAPI(filteredData) {
  let newData = filteredData;
  let subPositions = [];
  let arrayKey = [];
  newData.forEach((data) => {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        arrayKey.push(key);
        for (let i = 0; i < value.length; i++) {
          subPositions.push(value[i]);
        }
      }
    }
  });

  //make api calls
  // subPositions.length
  // for (let i = 0; i < 1; i++) {
  // console.log("newData: " + JSON.stringify(subPositions[i]));
  // let subAPI = await getAPI(subPositions[i]);
  let subAPI = await getAPI(apiUrl + 'people/1/', nameOnlySchema);
  newData.arrayKey[0][i] = subAPI;
  // }
}

export function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}
