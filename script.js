const createElements = arr =>{
    const htmlElements = arr.map(el =>`<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));

}

const manageSpinner = (status) =>{
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
    document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
  }
}


const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = ()=>{
  const lessonButtons = document.querySelectorAll('.lesson-btn')
  lessonButtons.forEach(btn=>btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
  manageSpinner(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive() //Remove All Active Class
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      displayLevelWorld(data.data);
      clickBtn.classList.add('active') //Add Active Class

    });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (const lesson of lessons) {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open-reader"></i>
                Lesson - ${lesson.level_no}
            </button>
        `;
    levelContainer.appendChild(lessonBtn);
  }
};

const displayLevelWorld = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
       <div class="text-center col-span-full">
          <img class="mx-auto" src="./assets/alert-error.png" />
          <p class="text-gray-400 text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-lg font-semibold mt-1">নেক্সট Lesson এ যান</p>
          </div>
  `;
  manageSpinner(false)
  return
  }

  words.forEach((word) => {
    const cardContainer = document.createElement("div");
    cardContainer.innerHTML = `

    <div class="bg-white rounded-xl shadow-sm text-center py-15 px-10">
        <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="my-2">Meaning / Pronunciation</p>
        <h3 class="text-xl bangla-font">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</h3>
        <div class="flex justify-between items-center mt-10">
          <button onclick="loadWordDetails(${word.id})" class="btn border-none bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80 hover:text-white"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn border-none bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
  
      `;
    wordContainer.appendChild(cardContainer);
  });
  manageSpinner(false)
};

const loadWordDetails = async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data)
}

const displayWordDetails = (word)=>{
  const detailsContainer = document.getElementById('details-container')
  detailsContainer.innerHTML = `
  <div class="space-y-1">
  <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>) ${word.pronunciation}</h2>
  </div>
  <div>
  <h2 class="font-bold">Meaning</h2>
  <p>${word.meaning}</p>
  </div>
  <div>
  <h2 class="font-bold">Example</h2>
  <p>${word.sentence}</p>
  </div>
  <div>
  <h2 class="font-bold">Synonym</h2>
  <div>${createElements(word.synonyms)}</div>
  </div>
  `
  document.getElementById('word_modal').showModal()
}

loadLessons();
