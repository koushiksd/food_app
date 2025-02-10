import axios from "axios";
import acios from "axios";
const apicall = async (endurl) => {
  console.log("https://www.themealdb.com/api/json/v1/1/"+endurl)
  return await axios.get("https://www.themealdb.com/api/json/v1/1/" + endurl);
};

export {apicall}

