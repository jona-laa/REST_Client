// DOM Elements
const coursesContainer = document.querySelector('#courses-container')
const creditsTotal = document.querySelector('#credits-total_score')

// Form Input Value
const codeInput = document.querySelector('#code'),
  nameInput = document.querySelector('#name'),
  progressionInput = document.querySelector('#progression'),
  linkInput = document.querySelector('#link'),
  creditsInput = document.querySelector('#credits'),
  iconInput = document.querySelector('#icon');


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
  creditsTotal.innerHTML = `${credits} HP`;
}

const addCourse = (e) => {
  e.preventDefault();

  // fetch(url, {
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify()
  // })

  console.log(codeInput.value)
  console.log(nameInput.value)
  console.log(progressionInput.value)
  console.log(linkInput.value)
  console.log(creditsInput.value)
  console.log(iconInput.value)
}

window.addEventListener("load", getCourses);
