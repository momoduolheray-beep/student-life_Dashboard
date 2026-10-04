const grades = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
};

let courses = JSON.parse(
  localStorage.getItem("studentCourses") || "[]"
);

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem("studentCourses", JSON.stringify(courses));
  render();
}

function render() {
  $("courses").innerHTML = "";

  let units = 0;
  let points = 0;

  courses.forEach((course, index) => {
    units += course.units;
    points += course.units * grades[course.grade];

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${course.code}</td>
      <td>${course.name}</td>
      <td>${course.units}</td>
      <td>${course.grade}</td>
      <td>${grades[course.grade] * course.units}</td>
      <td>
        <button class="delete" data-index="${index}">Delete</button>
      </td>
    `;

    $("courses").appendChild(row);
  });

  $("courseCount").textContent = courses.length;
  $("unitCount").textContent = units;
  $("gpa").textContent = units ? (points / units).toFixed(2) : "0.00";
  $("empty").style.display = courses.length ? "none" : "block";
}

$("courseForm").addEventListener("submit", (event) => {
  event.preventDefault();

  courses.push({
    code: $("code").value.trim().toUpperCase(),
    name: $("name").value.trim(),
    units: Number($("units").value),
    grade: $("grade").value
  });

  event.target.reset();
  save();
});

$("courses").addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    const index = Number(event.target.dataset.index);
    courses.splice(index, 1);
    save();
  }
});

$("theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  $("theme").textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

render();
