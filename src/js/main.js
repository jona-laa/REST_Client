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
  feedbackMessage = document.querySelector('#feedback-message');

// Used for Total Credits Counter
let credits = 0;


//
const resetDOM = () => {
  credits = 0;
  coursesContainer.innerHTML = '';
  codeInput.value = '';
  nameInput.value = '';
  progressionInput.value = '';
  linkInput.value = '';
  creditsInput.value = '';
  iconInput.value = '';
  getCourses()
}



const getCourses = () => {
  fetch('http://localhost:8080/DEMO_REST/api/courses')
    .then(res => res.json())
    .then(data => data.courses.forEach(course => createElement(course)))
    .catch(e => console.error(e))
}



const userFeedback = (feedback) => {
  feedbackMessage.textContent = feedback.message;
  feedback.code == 201 | 200 ? feedbackMessage.style.backgroundColor = 'green' : feedbackMessage.style.backgroundColor = 'red';
}

// $('.confirm').click(function () {
//   $('.success').fadeOut(300, function () {
//   });
// });



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
    .then(feedback => userFeedback(feedback))
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



window.addEventListener("load", getCourses);
