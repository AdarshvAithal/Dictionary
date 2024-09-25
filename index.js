const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");
const audioUrl ="";

function playAudio() {
  audioEl.play();
}

function pauseAudio() {
  audioEl.pause();
}

async function fetchAPI(word) {
  try {
   word = word.toLowerCase()
    console.log(word);
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    console.log(url)
    const result = await fetch(url).then((res) => res.json());
    // const aUrl = result[0].phonetics[0].audio;
     const audioUrl = `//ssl.gstatic.com/dictionary/static/sounds/20200429/${word}--_gb_1.mp3`
     audioEl.src=audioUrl

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      // const aUrl = result[0].phonetics[0].audio;
      audioEl.src=audioUrl
      // playAudio();
      
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `an error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});




