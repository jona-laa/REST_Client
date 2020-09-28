// DOM Elements
const coursesContainer = document.querySelector('#courses-container')
const creditsTotal = document.querySelector('#credits-total_score')

const getCourses = () => {
  fetch('http://localhost:8080/DEMO_REST/api/courses')
    .then(res => res.json())
    .then(data => data.courses.forEach(course => createElement(course)))
    .catch(e => console.log(e))
}

let credits = 0;

const createElement = (course) => {
  coursesContainer.innerHTML += `
    <div class="courses-container_course">
    <i class="${course.icon} fa-4x"></i>
      <a href="${course.link}" class="icon-link react" target="_blank">
        <h3>${course.name}</h3>
      </a>
      <p>${course.code}</p>
      <p>${course.progression}</p>
      <p>${course.credits}</p>
    </div>
  `;
  credits += parseFloat(course.credits)
  creditsTotal.innerHTML = `${credits}HP`;
}

const addCourse = (e) => {
  e.preventDefault();
  fetch()
  console.log('added')
}

window.addEventListener("load", getCourses);
