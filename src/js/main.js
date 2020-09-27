// DOM Elements
const coursesContainer = document.querySelector('#courses-container')

const getCourses = () => {
  fetch('http://localhost:8080/DEMO_REST/api/courses')
    .then(res => res.json())
    .then(data => data.courses.forEach(course => createElement(course)))
}

const createElement = (course) => {
  console.log(course)
  coursesContainer.innerHTML += `
    <div>
      <a href="${course.link}" class="icon-link react" target="_blank">
        <i class="fas fa-university fa-3x"></i>
        <h3>${course.name}</h3>
      </a>
      <p>${course.code}</p>
      <p>${course.progression}</p>
    </div>
  `
}

window.addEventListener("load", getCourses);

/*
Lägg till HP per kurs samt HP totalt

WU I - HTML5


*/
