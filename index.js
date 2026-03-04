const loadLessons = async () => {
  try {
    const response = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await response.json();

    if (data.status) {
      displayLesson(data.data);
    }
  } catch (error) {
    console.error("Failed to load lessons:", error);
  }
};

const displayLesson = (levels) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerHTML = "";

  levels.forEach(level => {
    const button = document.createElement("button");
    button.className = "btn btn-outline btn-primary lesson-btn";
    button.innerHTML = `
      <i class="fa-solid fa-circle-question"></i> 
      Lesson ${level.level_no}
    `;

    //  CLICK EVENT
    button.addEventListener("click", () => {

      // Remove active class from all buttons
      document.querySelectorAll(".lesson-btn").forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
      });

      // Add active class to clicked button
      button.classList.remove("btn-outline");
      button.classList.add("btn-primary");

      loadLevelWords(level.level_no);
    });

    levelContainer.appendChild(button);
  });
};



//  Level onujai word fetch korbe
const loadLevelWords = async (levelNo) => {

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = `
    <div class="text-center py-10">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  `;

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/level/${levelNo}`
    );

    const data = await response.json();

    if (data.status) {
      displayWords(data.data);
    } else {
      wordContainer.innerHTML = `
        <p class="text-center text-red-500">No Data Found</p>
      `;
    }

  } catch (error) {
    console.error("Failed to load words:", error);
  }
};



//  Word display
const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <p class="text-center text-gray-500">No Words Available</p>
    `;
    return;
  }

  words.forEach(word => {
    const div = document.createElement("div");
    div.className = "bg-white p-5 rounded shadow m-3 inline-block";

    div.innerHTML = `
      <h3 class="text-xl font-bold">${word.word}</h3>
      <p class="text-gray-500">
        Meaning: ${word.meaning ? word.meaning : "Not Available"}
      </p>
      <p class="text-gray-400">
        Pronunciation: ${word.pronunciation || "N/A"}
      </p>
    `;

    wordContainer.appendChild(div);
  });
};

loadLessons();