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



/* Show User Feedback Div
 * @param   {object}        Uses object.message & object.code
 * @param   {string}        Element ID or class, e.g '.feedback'
*/
const userFeedback = (feedback, element) => {
  fadeInElement(element, 500);

  const status = feedback.code;
  feedbackMessage.textContent = feedback.message;
  status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = 'green' : feedbackDiv.style.backgroundColor = 'red';

  fadeOutElement(element, 1000, 4000);
}



// Hides Feedback onclick
$('.feedback').click(function () {
  $('.feedback').fadeOut(300, function () {
  });
});



/* Fade in Element
 * @param   {string}        element     Element ID or class, e.g '.feedback'
 * @param   {number}        fadeMs      Fade speed in milliseconds
*/
const fadeInElement = (element, fadeMs) => {
  $(element).fadeIn(fadeMs, function () {
  });
}



/* Fade out Element
 * @param   {string}        element     Element ID or class, e.g '.feedback'
 * @param   {number}        fadeMs      Fade speed in milliseconds
 * @param   {number}        timeoutMS   Timeout in milliseconds
*/
const fadeOutElement = (element, fadeMs, timeoutMs) => {
  setTimeout(() => {
    $(element).fadeOut(fadeMs, function () {
    })
  }, timeoutMs);
}



/* Toggles Element
* @param   {number}         fadeMs       Fade speed in milliseconds
* @param   {Array<string>}  elements     Element ID or class, e.g '.feedback'
*/
const toggleElement = (fadeMs, ...elements) => {
  elements.forEach(e => {
    $(`${e}`).toggle(fadeMs, function () {
    });
  })
}



/* Confirm Pop-Up
 * @param   {string}          action    E.g 'proceed' -> 'Sure you want to proceed?'
*/
const confirmIt = (action) => window.confirm(`Sure you want to ${action}?`);



window.addEventListener("load", getCourses(coursesUrl));
