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
    const a = document.createElement("a");
    a.href = "#";
    a.className = "btn btn-outline btn-primary";
    a.innerHTML = `<i class="fa-solid fa-circle-question"></i> Lesson ${level.level_no}`;
    levelContainer.appendChild(a);
  });
};

loadLessons();