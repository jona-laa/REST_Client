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
const resetDOM = (cancelPress) => {
  updateId = null;
  credits = 0;
  codeInput.value = '';
  nameInput.value = '';
  progressionInput.value = '';
  linkInput.value = '';
  creditsInput.value = '';
  iconInput.value = '';
  cancelPress ? null : coursesContainer.innerHTML = '';
  cancelPress ? null : getCourses(coursesUrl);
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



const toggleElement = (id, fadeMs) => {
  $(`#delete-${id}`).toggle(fadeMs, function () {
  });
  $(`#update-${id}`).toggle(fadeMs, function () {
  });
}



const createElement = (course) => {
  coursesContainer.innerHTML += `
    <div class="courses-container_course" id="course-${course.id}">
      <a href="${course.link}" class="icon-link react" target="_blank">
        <i class="${course.icon || 'fas fa-university'} fa-4x"></i>
        <h3>${course.name}</h3>
      </a>
      <p><span>Code:</span><span>${course.code}</span></p>
      <p><span>Progression:</span><span>${course.progression}</span></p>
      <p><span>Credits:</span><span>${course.credits}</span></p>
      <button class="btn delete" id="delete-${course.id}" value="delete" onclick="deleteCourse(${course.id})"><i class="fas fa-trash-alt fa-1x"></i></button>
      <button class="btn update" id="update-${course.id}" value="update" onclick="initUpdate(${course.id})"><i class="fas fa-edit fa-1x"></i></button>
      <button class="btn edit" value="update" onclick="toggleElement(${course.id}, 50)"><i class="fas fa-ellipsis-v fa-1x"></i></button>
    </div>
  `;
  credits += parseFloat(course.credits)
  creditsTotal.innerHTML = `${credits} HP`;
}



let updateId;
const initUpdate = (id) => {
  updateId = id;

  fetch(`${coursesUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      let { id, code, name, progression, link, credits, icon } = data.courses[0];
      console.log(id)
      codeInput.value = code;
      nameInput.value = name;
      progressionInput.value = progression;
      linkInput.value = link;
      creditsInput.value = credits;
      iconInput.value = icon;
      window.scrollTo(0, document.body.scrollHeight);
    })
}

const updateOrAdd = (e, id) => {
  e.preventDefault()
  console.log(id)
  id ? updateCourse(id) : addCourse();
}

const updateCourse = (id) => {
  console.log('update', id)
  fetch(coursesUrl,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: id,
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

const cancelUpdate = (e) => {
  e.preventDefault();
  confirmIt('cancel') ? resetDOM(true) : null;
}

const addCourse = (e) => {
  // e.preventDefault();
  console.log('add')

  fetch(coursesUrl,
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

const confirmIt = (method) => window.confirm(`Sure you want to ${method}?`);

const deleteCourse = id => {
  confirmIt('delete this...') ? fetch(`${coursesUrl}?id=${id}`,
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
