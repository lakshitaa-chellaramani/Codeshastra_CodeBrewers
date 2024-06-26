import axios from "axios"
const API_URL = "http://localhost:8000/api-v1";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
});

export const apiRequest = async({url,token,data,method}) => {
    try {
        const result = await API(url, {
            method: method,
            data: data,
            headers: {
                "content-type": "application/json", Authorization: token ? `Bearer ${token}` : "",
            }
        })

        return result?.data
    }
    catch (error) {
        console.log(err)
        const err = error.response.data;
        return {
            status: err.status,
            message: err.message
        }
    }
}

export const handleFileUpload = async(uploadFile) => {
    const formData=new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_preset","jonfinder"); 

    try {
        const reponse = await axios.post( "https://api.cloudinary.com/v1_1/dxgysq4nn/image/upload/", formData)
        return reponse.data.secure_url
    }
    catch(error) {
        console.log(error)
    }
}

export const updateURL=({
    pageNum,
    query,
    keyws,
    cmpLoc,
    sort,
    navigate,
    location,
    jType,
    exp,
})=>{
    const params=new URLSearchParams();
    if(pageNum &&pageNum>1){
        params.set("page",pageNum);
    }

    if(query){
        params.set("search",query);
    }
    if(cmpLoc){
        params.set("location",cmpLoc);
    }

    if(sort){
        params.set("sort",sort);
    }
    if(jType){
        params.set("jType",jType);
    }
    if(exp){
        params.set("exp",exp);
    }
    if(keyws){
        params.set("keyws",keyws);
    }
    const newURL=`${location.pathname}?${params.toString()}`;
    navigate(newURL,{replace: true});

    return newURL;
}

