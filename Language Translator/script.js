const fromtext = document.querySelector('.from-text');
const totext = document.querySelector('.to-text');
exchange = document.querySelector('.exchange');
selectTag = document.querySelectorAll('select');
translateBtn = document.querySelector('button');
icons = document.querySelectorAll('.row i');


selectTag.forEach((tag, id)=>{
    for(const country_code in countries)
    {
        let selected;
        if(id==0 && country_code=='en-GB'){
            selected='selected';
        }
        else if(id==1 && country_code=='hi-IN'){
            selected='selected';
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend',option);
    }


})



translateBtn.addEventListener('click',()=>{
    let text = fromtext.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;

    let apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    fetch(apiURL).then(res=>res.json()).then(data=>{
        // console.log(data.responseData.translatedText)
        totext.value = data.responseData.translatedText;
    })

});

exchange.addEventListener('click',()=>{
    let tempText = fromtext.value;
    fromtext.value = totext.value;
    totext.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});


icons.forEach(icon=>{
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromtext.value);
            }
            else{
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
            let utterance;
            if(target.id=="from"){
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
});