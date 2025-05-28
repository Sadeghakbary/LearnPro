import enDictionary from "./en";
import faDictionary from "./fa";


const lang: string | null =
  localStorage.getItem("lang") !== null ? localStorage.getItem("lang") : "en";
export { lang };

const direction :{
    fa : 'rtl'
    en : 'ltr'
    } = {
        fa: 'rtl',
        en: 'ltr',
}

const direction : 'rtl' | 'ltr' = direction[lang as keyof typeof direction];
export { direction };

const font : {
    fa:string
    en:string
} ={
    fa: 'IRANSans',
    en: 'Arial'
}
function getFont() {
    return font[lang as keyof typeof font];
}
export { getFont };

const teransLates={
    en : enDictionary ,
    fa : faDictionary ,
}

const teransLates = teransLates[lang as keyof typeof teransLates];
export { teransLates };

function change_lang() {
    if (lang == 'en') {
        localStorage.setItem('lang' , 'fa');
    }else{
        localStorage.setItem('lang' , 'en');
    }
    window.location.reload()
}
export { change_lang };