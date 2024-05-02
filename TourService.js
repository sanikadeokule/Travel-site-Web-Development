import axios from "axios";
const URL = "http://localhost:8080/packagedetails";
const RESTAPI_URL1 = "http://localhost:8080/packagedetails";
const RESTAPI_URL2= "http://localhost:8080/packagedetailbycityname";
const RESTAP1_URLSORT ="http://localhost:8080/packagedetailsort";
export const getAllPackage = ()=> {
    return axios.get(URL);
};
export const getPackageDetail=(id) =>{
    return axios.get(RESTAPI_URL1 +'/'+id);
}
export const getSearchData=(cityName)=>{
    return axios.get(RESTAPI_URL2+'/'+cityName);

}
export const getSortData=(sortType)=>{
    return axios.get(RESTAP1_URLSORT+'/'+sortType);
}