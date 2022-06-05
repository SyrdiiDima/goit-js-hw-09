

const refs = {
    bodyEl: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),

}


refs.btnStart.addEventListener('click',onBtnStartClick)
refs.btnStop.addEventListener('click',onBtnStopClick)


refs.btnStop.setAttribute('disabled', 'disabled');

let timer = null;

function onBtnStartClick() {
    // console.log('press start');
   
    refs.btnStart.setAttribute('disabled', 'disabled');
    refs.btnStop.removeAttribute('disabled');

    timer = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000);
 }

function onBtnStopClick() { 
    // console.log('press stop');
 
     refs.btnStop.setAttribute('disabled', 'disabled');
     refs.btnStart.removeAttribute('disabled');
    clearInterval(timer);

}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
