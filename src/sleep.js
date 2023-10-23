    // Initialize empty object for user answers
    let userAnswers = {};

    // Sample questions
    const questions = [
      {
        id: 1,
        text: "1. Do you have trouble falling asleep, staying asleep or waking up early at least three nights a week for at least the last month?",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        text: "2. Does this interfere with your activities the next day (such as feeling unrefreshed in the morning, fatigued, unable to concentrate, or feeling irritable)?",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        text: "3. Are you a shift worker?",
        options: ["No", "Yes"]
      },
      {
        id: 4,
        text: "4. Is your bedroom hot and uncomfortable?",
        options: ["No", "Yes"]
      },
      {
        id: 5,
        text: "5. Do you drink alcohol, nicotine (cigarettes) or caffeine (coffee, cola, tea, chocolate, energy drinks) in the evenings? ",
        options: ["No", "Yes"]
      },
      {
        id: 6,
        text: "6. Do you frequently nap during the day or have highly irregular and variable bedtimes or rising times? ",
        options: ["No", "Yes"]
      },
      {
        id: 7,
        text: "7. Do you engage in mentally stimulating, moderate to strenuous exercise or emotionally upsetting activities within a couple of hours of bedtime?",
        options: ["No", "Yes"]
      },
      {
        id: 8,
        text: "8. Do you frequently use the bed for activities other than sleep or intimacy? (e.g., television watching, reading, studying, snacking, thinking, planning)",
        options: ["No", "Yes"]
      },
      {
        id: 9,
        text: "9. During the past month, have you been bothered by feeling down, depressed or hopeless?",
        options: ["No", "Yes"]
      },
      {
        id: 10,
        text: "10. Or bothered by having little interest or pleasure in doing things?",
        options: ["No", "Yes"]
      },
      {
        id: 11,
        text: "11. Over the last two weeks, have you been bothered by feeling nervous, anxious, or on edge?",
        options: ["No", "Yes"]
      },
      {
        id: 12,
        text: "12. Over the last two weeks, have you been bothered by being unable to stop or control worrying? ",
        options: ["No", "Yes"]
      },
      {
        id: 13,
        text: "13. Do you snore very loudly at night? ",
        options: ["No", "Yes"]
      },
      {
        id: 14,
        text: "14. Do you fall asleep during the day in waiting rooms or as a passenger in a vehicle? ",
        options: ["No", "Yes"]
      },
      {
        id: 15,
        text: "15. Do you have any significant health problems affecting your sleep quality, such as pain, difficulty breathing, acid reflux, or night cough? ",
        options: ["No", "Yes"]
      },
      {
        id: 16,
        text: "16. When you are asleep, do you sleepwalk, sleep talk, grind your teeth, have restless legs or anything else you would consider unusual? ",
        options: ["No", "Yes"]
      },
      {
        id: 17,
        text: "17. Do you ever feel the need to reduce the amount of alcohol you drink?",
        options: ["No", "Yes"]
      },
      {
        id: 18,
        text: "18. Do you ever feel the need to cut down on your non-prescription or recreational drug use?",
        options: ["No", "Yes"]
      },
      {
        id: 19,
        text: "19. Do you go to bed late at night (e.g. after midnight?)",
        options: ["No", "Yes"]
      },
      {
        id: 20,
        text: "20. When you can, do you prefer to sleep in late in the morning ",
        options: ["No", "Yes"]
      }
    ];

    
    function startQuestionnaire() {

      // Show the progress bar container
      document.getElementById('progressBarContainer').style.display = 'flex';

      // Initialise the progress bar to 0%
      updateProgressBar(0, questions.length);

      // Hide the Start button
      document.getElementById('startButton').style.display = 'none';

      // Show the questionDiv
      document.getElementById('questionDiv').classList.remove('hidden');

        // Reset questionnaire state
      resetQuestionnaire();

      // Begin the questionnaire
      displayQuestion(0);
    }


    function resetQuestionnaire() {
  // Clear user answers and recommendations
  userAnswers = {};
  recommendations.clear();

  // Clear the recommendations display area
  const recommendationsDiv = document.getElementById('recommendationsDiv');
  recommendationsDiv.innerText = '';
  recommendationsDiv.classList.add('hidden');

    // Clear the other resources display area
    const otherResourcesDiv = document.getElementById('otherResourcesDiv');
    otherResourcesDiv.innerText = '';
    otherResourcesDiv.classList.add('hidden');

    //clear print and credits
    document.getElementById('printButton').style.display = 'none';
    document.getElementById('creditsDiv').style.display = 'none';

}

// Modified displayQuestion function to include Back and Skip buttons
function displayQuestion(index) {
  updateProgressBar(index, questions.length);

  const questionDiv = document.getElementById('questionDiv');
  const question = questions[index];
  if (!question) {
    questionDiv.classList.add('hidden');
    generateRecommendations();
    return;
  }

  let html = `<p class="question-text">${question.text}</p><div class="flex-container">`;
  question.options.forEach((option, i) => {
    html += `<label class="boxed-radio"><input type="radio" name="q${index}" value="${option}" style="display:none;" onclick="handleUserInput(${index}, '${option}')">${option}</label>`;
  });
  html += '</div>';

  // Append Back and Skip buttons
  html += `<button onclick="handleBackClick(${index})"${index === 0 ? ' disabled' : ''}>Back</button>`;
  html += `<button onclick="handleSkipClick(${index})">Skip</button>`;

  document.getElementById('questionDiv').innerHTML = html;
}

// Function to handle Back button click
function handleBackClick(index) {
  // Navigate to the previous question by decrementing the index
  displayQuestion(index - 1);
}

// Function to handle Skip button click
function handleSkipClick(index) {
  // Navigate to the next question by incrementing the index
  displayQuestion(index + 1);
}

// Modified handleUserInput function
function handleUserInput(index, answer) {
  const questionID = questions[index].id;
  userAnswers[questionID] = answer;

  // Navigate to the next question by incrementing the index
  displayQuestion(index + 1);
}

// Initialize empty Set for unique recommendations
let recommendations = new Set();

//Defines criteria to display the sleep restriction advice in generateRecommendations
function sleepRestrictionCondition(userAnswers) {
    // Create an array of all keys except for the first and second question
    const otherQuestions = Object.keys(userAnswers).filter(id => id !== '1' && id !== '2');

    // Check if all other answers are 'No'
    const allOthersNo = otherQuestions.every(id => userAnswers[id] === 'No');

    // Check the conditions for question 1 and 2
    const condition1 = userAnswers['1'] === 'Yes' && allOthersNo;
    const condition2 = userAnswers['2'] === 'Yes' && allOthersNo;
    const condition3 = userAnswers['1'] === 'Yes' && userAnswers['2'] === 'Yes' && allOthersNo;

    return condition1 || condition2 || condition3;
}

 


function generateRecommendations() {
  // Implement your logic to generate recommendations
  // based on the answers in userAnswers

  // Convert the object values to an array
  const answersArray = Object.values(userAnswers);

  // Check if meets the sleep restriction recommendation condition
  if (sleepRestrictionCondition(userAnswers)) {
    const everyNoText = `
  <p>If none of the above applies and you still have a sleep problem, you may have chronic insomnia. This is where you have a sleep disorder without any particular explanation. It is very common and can be helped by several treatments.</p>
  <p>One treatment option is sleep restriction or time in bed restriction. This is where you go to bed later and spend fewer hours in bed.</p>
  <p>Other medicines can help you sleep but are difficult to stop once you take them regularly and also tend to lose effectiveness. </p>
  <h3>Time in bed restriction </h3>
  <p>Ensure the diagnosis is most likely to be chronic insomnia, the old name is primary insomnia. You've answered no to all the questions so other common conditions are less likely.<p>
  <p>If for work you drive vehicles, operate heavy machinery, or do delicate procedures, e.g. surgeons, you should consider treatment during your vacation- sleep deprivation is a short-term safety risk.</p>
  <p>Estimate time spent in bed versus time spent asleep. If you cannot do this from memory, you can use a sleep diary if necessary. Work out what time you go to bed and wake up. Work out how long you stay asleep. Usually, there is a mismatch, e.g. 9 hours in bed and 6 hours asleep. would mean you are diluting their good sleep over 9 rather than 6 hours. Try go to bed later and wake up simultaneously with the rest of your household. Do only quiet, relaxing activities before bedtime. These activities must be done outside the bed and not lying down to avoid naps, which can disrupt the routine. We recommend you keep this new time in bed for two weeks before making any adjustments. People usually reportd that the quality of their sleep improves as they feel they are starting to have a deep sleep and the sleep period is consolidated.</p>
  <p>After two weeks: Nothing else is needed if you is sleeping better and functioning well. Many people prefer to continue on the bed restriction schedule as they find it very effective.</p>
  <p>If you are sleeping better but feel sleep deprived the next day, you may wish to add 30 minutes to the time allowed in bed for another two weeks and continue doing so until the feelings of sleep deprivation disappear while still maintaining continuous sleep at night </p>
  <p>If you are not sleeping better, you may wish to reduce the time in bed by 30 minutes (but not to less than five hours at night). Try each option for at least two weeks before making another change. If you are not sleeping better at five hours per night, you may wish to get some advice from a sleep specialist. You may need an overnight sleep study to see if there are other causes of insomnia, e.g. sleep apnoea or a movement disorder.</p>
  `;
    recommendations.add(everyNoText);
  }

  if (userAnswers[3] === 'Yes') {
  recommendations.add("You answered yes to being a shift worker. See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-shift-work/' target='_blank'>Shift Work page on Healthify</a>. You may wish to see a sleep specialist if you are having sleep problems.");
  }

  if (userAnswers[4] === 'Yes') {
  recommendations.add("You answered that your bedroom is hot and uncomfortable. You should attend to this if you aren't happy with your sleep.");
  }

  if (userAnswers[5] === 'Yes') {
  recommendations.add("You answered that you drink alcohol, nicotine, or caffeine in the evenings. You should attend to this if you aren't happy with your sleep. See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-caffeine/' target='_blank'>Sleep and Caffeine page</a> and <a href='https://healthify.nz/hauora-wellbeing/s/sleep-how-food-drink-affects/' target='_blank'>Food and Drink effects on Sleep page on Healthify</a>");
  }

  if (userAnswers[6] === 'Yes') {
  recommendations.add("You answered yes to frequent napping. This may be causing your sleep problem. Napping should be limited to about 30 minutes and be done before 1500 hrs.");
  }

  if (userAnswers[7] === 'Yes') {
  recommendations.add("You answered yes to engaging in mentally stimulating, moderate to strenous exercise, or emotionally upsetting acitvities within a couple hours of bedtime. This may be causing or contributing to your sleep problem. You may wish to change these behaviours.");
  }

  if (userAnswers[8] === 'Yes') {
  recommendations.add("You answered yes to frequently using the bed for activities other than sleep or intimacy. This may be causing or contributing to your sleep problem. You may wish to change these behaviours");
  }

  if (userAnswers[9] === 'Yes' || userAnswers[10] === 'Yes') {
  recommendations.add("You may have a mood or depression problem. Discuss this with your GP as this could be a factor in your sleep quality.");
  }

  if (userAnswers[11] === 'Yes' || userAnswers[12] === 'Yes') {
  recommendations.add("You may have a mood, anxiety or stress problem. Discuss this with your GP as this could be a factor in your sleep quality.");
  }

  if (userAnswers[13] === 'Yes' || userAnswers[14] === 'Yes') {
  recommendations.add("You said you snore loudly. If you stop breathing at night and have a morning headache and a dry mouth, you likely have Obstructive Sleep Apnoea (OSA). You may wish to see your GP about this. See <a href='https://healthify.nz/health-a-z/o/obstructive-sleep-apnoea/' target='_blank'>Obstructive Sleep Apnoea page on Healthify</a>");
  }

  if (userAnswers[15] === 'Yes') {
  recommendations.add("You said you have a significant health problem affecting sleep quality. Discuss this with your GP as this could be a factor in your sleep quality.");
  }

  if (userAnswers[16] === 'Yes') {
  recommendations.add("You may have restless legs or some other issue with your brain (e.g. sleep walking, sleep talking, etc). The technical term for this is a parasomnia. Discuss this with your GP as this could be a factor in your sleep quality.");
  }

  if (userAnswers[17] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of alcohol you drink. Try and reduce this, discuss this with your GP, or self refer to <a href='https://www.cads.org.nz/' target='_blank'>CADS</a> if you want extra support");
  }

  if (userAnswers[18] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of non-prescription or recreational drug use. Try and reduce this as this could be a factor in your sleep quality. Or discuss this with your GP.");
  }

  if (userAnswers[19] === 'Yes' || userAnswers[20] === 'Yes') {
  recommendations.add("You may have a condition called delayed sleep phase disorder. It can be helped by using a light box in the morning and <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin</a> at night.");
  }

  // Display recommendations
  displayRecommendations();

  // Display the other resources
  displayOtherResources();
}

function displayRecommendations() {
  // Clear the question display area
  document.getElementById('questionDiv').innerHTML = '';

  // Create the accordion button
  let accordion = document.createElement('button');
  accordion.innerHTML = "Show Questionnaire Answers";
  accordion.className = "accordion";

  // Create the panel to display answers
  let panel = document.createElement('div');
  panel.className = "panel";

  // Add answers to the panel
  for (const [questionID, answer] of Object.entries(userAnswers)) {
    const question = questions.find(q => q.id === parseInt(questionID));
    if (question) {
      panel.innerHTML += `<p><strong>${question.text}</strong><br>Answer: ${answer}</p>`;
    }
  }

  // Show the recommendations with a heading
  const recommendationsDiv = document.getElementById('recommendationsDiv');
  recommendationsDiv.innerHTML = "<h2>Recommendations</h2>";

  // Check if there is more than one recommendation
  if (recommendations.size > 1) {
    let ul = document.createElement('ul');
    recommendations.forEach(recommendation => {
      let li = document.createElement('li');
      li.innerHTML = recommendation;
      ul.appendChild(li);
    });
    recommendationsDiv.appendChild(ul);
  } else if (recommendations.size === 1) {
    let p = document.createElement('p');
    p.innerHTML = Array.from(recommendations)[0];  // Convert set to array and get the first element
    recommendationsDiv.appendChild(p);
  }

  recommendationsDiv.appendChild(accordion);
  recommendationsDiv.appendChild(panel);
  recommendationsDiv.classList.remove('hidden');

  // Add accordion functionality
  accordion.addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });

  // Change button text to 'Restart' and show the button
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('startButton').innerText = 'Restart';


  // Show the Print button
document.getElementById('printButton').style.display = 'block';


// Show the credits Div
document.getElementById('creditsDiv').style.display = 'block';


}



function updateProgressBar(currentQuestionIndex, totalQuestions) {
  const progressBar = document.getElementById('progressBar');
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = progress + '%';
  
  if (progress > 0) {
    progressBar.innerText = Math.round(progress) + '%';
  } else {
    progressBar.innerText = '';  // Empty string when progress is 0
  }
}

function displayOtherResources() {
  const otherResourcesDiv = document.getElementById('otherResourcesDiv');
  otherResourcesDiv.innerHTML = `
    <h2>Other Resources</h2>
    <ul>
      <li>Te Kete Sleep resource: <a href='https://healthify.nz/tools/t/te-kete-haerenga-and-sleep/' target='_blank'>Te Kete Sleep resource on Healthify</a></li>
      <li>Sleep apps: <a href='https://healthify.nz/apps/s/sleep-apps/' target='_blank'>Sleep App Reviews on Healthify</a></li>
      <li>Just a thought course: <a href='https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/' target='_blank'>Just a Thought Insomnia Course</a></li>
    </ul>
  `;
  otherResourcesDiv.classList.remove('hidden');
}

function printQuestionnaire() {
  // Find the accordion button for show answers
  const accordion = document.querySelector('.accordion');
  
  // Simulate a click to expand the show answers
  accordion.click();
  
  // Initiate print dialog
  window.print();
}



