// Output Elements
const
  coursesContainer = document.querySelector('#courses-container'),
  creditsTotal = document.querySelector('#credits-total_score');

// Form Input Value
const
  codeInput = document.querySelector('#code'),
  nameInput = document.querySelector('#name'),
  progressionInput = document.querySelector('#progression'),
  linkInput = document.querySelector('#link'),
  creditsInput = document.querySelector('#credits'),
  iconInput = document.querySelector('#icon'),
  feedbackMessage = document.querySelector('#feedback-message'),
  feedbackDiv = document.querySelector('.feedback');

// Used for Total Credits Counter
let credits = 0;

// Courses URL
const coursesUrl = 'http://localhost:8080/DEMO_REST/api/courses';



// Empty Input Fields
const resetDOM = () => {
  credits = 0;
  coursesContainer.innerHTML = '';
  codeInput.value = '';
  nameInput.value = '';
  progressionInput.value = '';
  linkInput.value = '';
  creditsInput.value = '';
  iconInput.value = '';
  getCourses(coursesUrl);
}



// Fetch Courses
const getCourses = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => data.courses.forEach(course => createElement(course)))
    .catch(e => console.error(e))
}



// Show User Feedback
const userFeedback = (feedback) => {
  fadeInElement('.feedback', 500);

  const status = feedback.code;
  feedbackMessage.textContent = feedback.message;
  status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = 'green' : feedbackDiv.style.backgroundColor = 'red';

  fadeOutElement('.feedback', 1000, 4000);
}
// Hide Feedback onclick
$('.feedback').click(function () {
  $('.feedback').fadeOut(300, function () {
  });
});



const fadeInElement = (element, fadeMs) => {
  $(element).fadeIn(fadeMs, function () {
  });
}



const fadeOutElement = (element, fadeMs, timeoutMs) => {
  setTimeout(() => {
    $(element).fadeOut(fadeMs, function () {
    })
  }, timeoutMs);
}


const createElement = (course) => {
  coursesContainer.innerHTML += `
    <div class="courses-container_course">
    <a href="${course.link}" class="icon-link react" target="_blank">
        <i class="${course.icon || 'fas fa-university'} fa-4x"></i>
        <h3>${course.name}</h3>
      </a>
      <p><span>Code:</span><span>${course.code}</span></p>
      <p><span>Progression:</span><span>${course.progression}</span></p>
      <p><span>Credits:</span><span>${course.credits}</span></p>
      <button class="btn delete" value="delete" onclick="deleteCourse(${course.id})"><i class="fas fa-trash-alt fa-1x"></i></button>
      <button class="btn update" value="update" onclick="console.log(${course.id})"><i class="fas fa-edit fa-1x"></i></button>
    </div>
  `;
  credits += parseFloat(course.credits)
  creditsTotal.innerHTML = `${credits} HP`;
}



/* Make this POST/PUT with method variable */
const addCourse = e => {
  e.preventDefault();

  fetch('http://localhost:8080/DEMO_REST/api/courses',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          code: codeInput.value,
          name: nameInput.value,
          progression: progressionInput.value,
          link: linkInput.value,
          credits: creditsInput.value,
          icon: iconInput.value
        }
      ),
    }
  )
    .then(res => res.json())
    .then(json => userFeedback(json))
    .then(data => resetDOM())
    .catch(e => console.error(e))
}



const deleteCourse = id => {
  const confirm = window.confirm('Are you sure you want to delete course?');

  confirm == true ? fetch(`http://localhost:8080/DEMO_REST/api/courses?id=${id}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .then(feedback => userFeedback(feedback))
    .then(data => resetDOM())
    .catch(e => console.error(e)) : null;

}

window.addEventListener("load", getCourses(coursesUrl));
