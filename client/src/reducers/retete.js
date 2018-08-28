export default function(state={} , action){
    switch(action.type){
        case 'TOATE_RETETELE':
            return { ...state , retete : action.payload };
        case 'RETETA_NOUA':
        //console.log(action.payload)
            return { ...state , reteta : action.payload };
        case 'RETETA_EDITATA':
            return { ...state , reteta : action.payload };
        case 'RETETA_STEARSA':
            return { ...state , success : action.payload };
        case 'RETETA':
            return { ...state , reteta : action.payload };
        case 'RETETE_CAUTATE':
            return { ...state , retete : action.payload };
        default:
            return state;
    }
}