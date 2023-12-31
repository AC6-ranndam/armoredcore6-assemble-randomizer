import { browser } from "$app/environment";
export function saveLocale(locale) {
    if (browser){
    console.log(locale)
    localStorage.setItem('appLocale', locale);
    console.log(localStorage.getItem("appLocale"))
    }
  }
  
  export function loadLocale() {
    if (browser){
    console.log(localStorage.getItem('appLocale'))
    return localStorage.getItem('appLocale') || 'ja'; // デフォルトの言語を指定
    }
  }
  