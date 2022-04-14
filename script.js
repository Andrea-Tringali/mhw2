/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const userAnswers = {};

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click',Click);
}


function Click(event) {

  const box = event.currentTarget;
  const userAnswerId = box.dataset.choiceId;
  const answers = box.parentNode.querySelectorAll('div');

  box.querySelector('.checkbox').src = "images/checked.png";
  box.classList.add('seleziona');
  box.classList.remove('opacity');
  
  for (const ans of answers) {
      if(ans.dataset.choiceId !== userAnswerId){
          ans.classList.add('opacity');
          ans.querySelector('.checkbox').src = "images/unchecked.png";
          ans.classList.remove('seleziona');
      }
  }

  userAnswers[box.dataset.questionId] = box.dataset.choiceId;

  if(userAnswers.one && userAnswers.two && userAnswers.three){
    for (const box of boxes) {
        box.removeEventListener('click',Click);
    }
  
    viewResult(chooseResult());
  }
  
}

function chooseResult(){
  if(userAnswers.one === userAnswers.two || userAnswers.one === userAnswers.three)
      return userAnswers.one;
  if(userAnswers.two === userAnswers.one || userAnswers.two === userAnswers.three)
      return userAnswers.two;
  if(userAnswers.three === userAnswers.one || userAnswers.three === userAnswers.two)
      return userAnswers.three;
  return userAnswers.one;
}

function resettaQuiz(){
  for (const key in userAnswers) {
      delete userAnswers[key];
  }
  const not_view = document.querySelector('#result');
  not_view.classList.add('hidden');
  for (const box of boxes) {
      box.classList.remove('opacity');
      box.classList.remove('seleziona');
      box.addEventListener('click', Click);
      box.querySelector('.checkbox').src = "images/unchecked.png";
  }
}

function viewResult(key){
  const view = document.querySelector('#result');
  view.querySelector('h1').textContent = RESULTS_MAP[key].title;
  view.querySelector('p').textContent = RESULTS_MAP[key].contents;
  view.classList.remove('hidden');
  const button = document.querySelector('#button');
  button.addEventListener('click',resettaQuiz);
}

