const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWorld(data.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (const lesson of lessons) {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
          <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"
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

if(words.length === 0){
  wordContainer.innerHTML = `
       <div class="text-center col-span-full">
          <img class="mx-auto" src="./assets/alert-error.png" />
          <p class="text-gray-400 text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-lg font-semibold mt-1">নেক্সট Lesson এ যান</p>
          </div>
  `
}

  words.forEach((word) => {
    const cardContainer = document.createElement("div");
    cardContainer.innerHTML = `

    <div class="bg-white rounded-xl shadow-sm text-center py-15 px-10">
        <h2 class="text-xl font-bold">${word.word}</h2>
        <p class="my-2">Meaning / Pronunciation</p>
        <h3 class="text-xl bangla-font">${word.meaning} / ${word.pronunciation}</h3>
        <div class="flex justify-between items-center mt-10">
          <button class="btn border-none bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80 hover:text-white"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn border-none bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
  
      `;
    wordContainer.appendChild(cardContainer);
  });
};
loadLessons();
