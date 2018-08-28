import axios from 'axios';

export async function toateRetetele(){

     let request = await axios.get(`/api/toateRetetele`)
                    .then(response => response.data);
        //console.log(request)
    return {
        type:'TOATE_RETETELE',
        payload:request
    }
}

export async function retetaDupaID( uuid ){

    let request = await axios.get(`/api/retetaDupaID/${ uuid }`)
                   .then(response => response.data);

   return {
       type:'RETETA',
       payload:request
   }
}

export async function adaugaReteta(titlu,descriere,ingrediente,fileUpload){
  
    let request = await axios.post(`/api/retetaNoua`, { titlu,
                                                        descriere,
                                                        ingrediente,
                                                        fileUpload} )
                        .then(response => response.data);
    return {
       type:'RETETA_NOUA',
       payload:request
    }
}

export async function editeazaReteta(_uuid, titlu,descriere,ingrediente,fileUpload){
    console.log(_uuid, titlu,descriere,ingrediente,fileUpload)
    let request = await axios.post(`/api/editeazaReteta`, { 
                                                        _uuid, 
                                                        titlu,
                                                        descriere,
                                                        ingrediente,
                                                        fileUpload} )
                        .then(response => response.data);
    return {
       type:'RETETA_EDITATA',
       payload:request
    }
}

export function stergeReteta(uuid){
  
    let request = axios.delete(`/api/stergeReteta?id=${uuid}` )
                        .then(response => response.data);
        //console.log(_uuid)
    return {
       type:'RETETA_STEARSA',
       payload:request
    }
}

export async function cautaRetetaDupaCuvant(cuvant){
    const request = await axios.get(`/api/cautaRetetaDupaCuvant?cuvant=${cuvant}`)
                    .then(response => response.data)
    return {
        type: 'RETETE_CAUTATE',
        payload: request
    }
}