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
        text: "2. Does your sleep affect your activities the next day (such as feeling unrefreshed in the morning, fatigued, unable to concentrate, or feeling irritable)?",
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
        text: "5. Do you drink alcohol, nicotine (cigarettes, vaping) or caffeine (coffee, cola, tea, chocolate, energy drinks) in the evenings? ",
        options: ["No", "Yes"]
      },
      {
        id: 6,
        text: "6. Do you nap during the day or frequently change your bedtimes or waking times?",
        options: ["No", "Yes"]
      },
      {
        id: 7,
        text: "7. Do you engage in activities that are mentally or physically intense close to bedtime? Examples include strenuous exercise, video games, screen time, doom scrolling, and work-related activities.",
        options: ["No", "Yes"]
      },
      {
        id: 8,
        text: "8. Do you frequently use the bed for activities other than sleep or intimacy? (e.g., television watching, studying, snacking, thinking, planning)",
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
        text: "16. Do you sleepwalk, sleep talk, grind your teeth, have restless legs or anything else you would consider unusual? ",
        options: ["No", "Yes"]
      },
      {
        id: 17,
        text: "17. Do you regularly use alcohol in the evenings?",
        options: ["No", "Yes"]
      },
      {
        id: 18,
        text: "18. Do you use non-prescription or recreational drugs?",
        options: ["No", "Yes"]
      },
      {
        id: 19,
        text: "19. Do you consider yourself a night-owl (go to bed after midnight)?",
        options: ["No", "Yes"]
      },
      {
        id: 20,
        text: "20. When you can, do you prefer to sleep in late in the mornings?",
        options: ["No", "Yes"]
      }
    ];

    
    function startQuestionnaire() {

      // Show the progress bar container
      document.getElementById('progressBarContainer').style.display = 'flex';

      // Initialise the progress bar to 0%
      updateProgressBar(0, questions.length);

      // Hide the instructionsDiv
      document.getElementById('instructionsDiv').style.display = 'none';

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

    // Hide the "Copy to Clipboard" button if it exists
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
      copyButton.style.display = 'none';
    }

}



//  displayQuestion function to display the quesitons and associated buttons
let currentQuestionIndex = null;
let animationsEnabled = true; // Default value is true

function displayQuestion(index) {
  updateProgressBar(index, questions.length);

  // If the current question index is not null, animate it out before displaying the new question
  if (currentQuestionIndex !== null) {
    animateQuestionOut(currentQuestionIndex, () => {
      updateQuestionContent(index);
    });
  } else {
    updateQuestionContent(index);
  }
  currentQuestionIndex = index;
}

function updateQuestionContent(index) {
  const questionDiv = document.getElementById('questionDiv');
  const question = questions[index];

  if (!question) {
    questionDiv.classList.add('hidden');
    generateRecommendations();
    return;
  }

  let mandatoryQuestions = [0, 1]; // indices of mandatory questions
  let isMandatory = mandatoryQuestions.includes(index);
  let html = '';

  // Building the question content
  html += '<div class="question-container">';
  html += '<div class="text-container">';
  html += `<p class="${isMandatory ? 'question-text-mandatory' : 'question-text'}">${question.text} ${isMandatory ? '<span class="mandatory-indicator">*</span>' : ''}</p>`;
  if (isMandatory) {
    html += '<p class="helper-text">This question can\'t be skipped</p>'; // Helper text added
  }
  html += '</div>'; // Close the text-container div
  html += '</div>'; // Close the question-container div

  // Radio container
  html += '<div class="radio-container">';
  question.options.forEach((option, i) => {
    html += `<label class="boxed-radio"><input type="radio" name="q${index}" value="${option}" style="display:none;" onclick="handleUserInput(${index}, '${option}')">${option}</label>`;
  });
  html += '</div>';

  // Error message
  html += `<div id="error-message-${index}" class="error-message"></div>`;

  // Back and Skip buttons
  html += `<button onclick="handleBackClick(${index})"${index === 0 ? ' disabled' : ''}>Back</button>`;
  html += `<button id="skip-button-${index}" onclick="handleSkipClick(${index})" ${isMandatory ? 'disabled' : ''}>Skip</button>`;

  // Update the inner HTML and animate the question in
  questionDiv.innerHTML = html;
  animateQuestionIn();
}

function animateQuestionOut(index, callback) {
  if (!animationsEnabled) {
    callback(); // Immediately call the callback if animations are disabled
    return;
  }
  
  const questionDiv = document.getElementById('questionDiv');
  questionDiv.classList.add('animate-out');
  setTimeout(() => {
    questionDiv.classList.remove('animate-out');
    callback();
  }, 300); // Duration of the animation
}

function animateQuestionIn() {
  if (!animationsEnabled) {
    return; // Do nothing if animations are disabled
  }

  const questionDiv = document.getElementById('questionDiv');
  questionDiv.classList.add('animate-in');
  setTimeout(() => {
    questionDiv.classList.remove('animate-in');
  }, 300); // Duration of the animation
}



function toggleAnimations() {
  animationsEnabled = !animationsEnabled;
  document.getElementById('toggleAnimationButton').innerText = animationsEnabled ? "Disable Animations" : "Enable Animations";
}




// Function to handle Back button click
function handleBackClick(index) {
  // Navigate to the previous question by decrementing the index
  displayQuestion(index - 1);
}

// Function to handle Skip button click
function handleSkipClick(index) {
  displayQuestion(index + 1);
}


// Modified handleUserInput function
function handleUserInput(index, answer) {
  const questionID = questions[index].id;
  userAnswers[questionID] = answer;

  let mandatoryQuestions = [0, 1];
  let isMandatory = mandatoryQuestions.includes(index);

  if (isMandatory && answer) {
    document.getElementById(`error-message-${index}`).innerHTML = '';
    document.getElementById(`skip-button-${index}`).disabled = false;
  }

  displayQuestion(index + 1);
}



// Initialize empty Set for unique recommendations
let recommendations = new Set();


// Defines criteria for having a sleep problem. Returns True if 1 OR 2 are "Yes". Returns False if both 1 AND 2 are "No"
function sleepProblemCondition(userAnswers) {
  // Check the conditions for question 1 and 2
  const condition1or2 = userAnswers['1'] === 'Yes' || userAnswers['2'] === 'Yes';
  const bothNo = userAnswers['1'] === 'No' && userAnswers['2'] === 'No';

  return condition1or2 && !bothNo;
}

// Checks if three or more yes answers for questions 3-20
function hasThreeOrMoreYes(userAnswers) {
  let yesCount = 0;

  const totalQuestions = Object.keys(userAnswers).length;

  for (let i = 3; i <= totalQuestions; i++) {
    if (userAnswers[i.toString()] === 'Yes') {
      yesCount++;
    }

    if (yesCount >= 3) {
      return true;
    }
  }

  return false;
}



// Returns True if "Yes" to any question numbered 3 and above.
function couldSleepBeImprovedCondition(userAnswers) {
  for (const question in userAnswers) {
    if (question !== '1' && question !== '2' && userAnswers[question] === 'Yes') {
      return true;
    }
  }
  return false;
}


//Checks if every answer is No 
function allAnswersNo(userAnswers) {
  // Get all values (answers) from the userAnswers object
  const answersArray = Object.values(userAnswers);

  // Check if every answer is 'No'
  return answersArray.every(answer => answer === 'No');
}

// Returns True if has a sleep problem PLUS yes to one of the questions in the array
function sleepRestrictionWithOtherCauseCondition(userAnswers) {
  const questionsToCheck = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '15', '16', '17', '18', '19', '20'];
  
  const hasOtherCauses = questionsToCheck.some(question => userAnswers[question] === 'Yes');
  const hasSleepProblem = sleepProblemCondition(userAnswers);
  
  return hasOtherCauses && hasSleepProblem;
}

//Defines criteria to display the sleep restriction advice in generateRecommendations
function sleepRestrictionConditionWithoutCause(userAnswers) {
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
  const sleepRestrictionText = `
  <h3>Chronic Insomnia Treatments</h3>
  <h4>Time in bed restriction </h4>
  <p>One treatment option is sleep restriction or time in bed restriction. This involves creating a new sleep schedule by limiting the amount of time you spend in bed, so that the time you spend in bed matches the time you actually sleep..</p>
  <p>Read more about it and see some example plans by going to the <a href='https://healthify.nz/health-a-z/i/insomnia/#collapse20280' target='_blank'>Healthify insomnia page</a></p>
  <h4>Medication</h4>
  <p>You could consider trying <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin.</a></p>
  <p>Other medicines can help you sleep but are difficult to stop once you take them regularly and they also tend to lose effectiveness over time. </p>
  <h4>Other</h4>
  <p>A special type of therapy can be helpful called CBTi - Cognitive Behavioural Therapy for Insomnia. Just a thought course: <a href='https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/' target='_blank'>Just a Thought Insomnia Course</a></p>
  `;
  const everyNoText = `
  It sounds like none of the questions from this questionnaire apply. If despite this you still feel that you have a sleep problem you may have a condition called chronic insomnia. This is where you have a sleep disorder without any particular explanation. It is very common and can be helped by several treatments.
  `;
  const chronicInsomniaDiagnosisAdditional = `
  If you are struggling with sleep the above may not be the only cause. It is possible to also have a condition called chronic insomnia. This is a very common condition (affecting 10% to 15% of people) where you have a sleep disorder without any particular explanation. Short-term insomnia may be caused by stress or changes in your schedule or environment. It can last for a few days or weeks. Chronic (long-term) insomnia occurs 3 or more nights a week, lasts more than 3 months, and cannot be fully explained by another health problem. If fixing the things you've identified as being a problem for you doesn't work, or isn't possible, you could explore treatments for chronic insomnia. Read more about <a href='https://healthify.nz/health-a-z/i/insomnia/' target='_blank'>chronic insomnia.</a>
  `;
  const napping = `
  <p>You answered yes to frequent napping. This may be causing or contributing to your sleep problem.</p>
  <p>For most people short naps (short sleeps) generally don't interfere with nighttime sleep at night but for some, napping at the wrong time of day or for too long can cause problems. Here are a few tips to get the most out of a nap without affecting your sleep:</p>
  <ul>
    <li><strong>Take naps in the early afternoon:</strong> Most sleep experts recommend napping no later than 2pm. Napping in the late afternoon may affect your ability to fall asleep at a reasonable time later that night, and could disrupt your night-time sleep.</li>
    <li><strong>Keep naps short:</strong> Aim to nap for only 10 to 20 minutes. The longer you nap, the more likely you are to feel sleepy afterward. However, young adults might be able to manage longer naps. You can limit the time of your nap by setting an alarm.</li>
    <li><strong>Create a restful environment:</strong> Nap in a quiet, dark place with comfortable room temperature and few distractions. Consider wearing an eye mask and earplugs.</li>
    <li><strong>After napping:</strong> give yourself time to wake up before starting any activities.</li>
  </ul></br>
  <strong>Note:</strong> Napping may be due sleep deprivation from other causes such as <a href='https://healthify.nz/health-a-z/o/obstructive-sleep-apnoea/' target='_blank'>sleep apnoea.</a>. Talk to your doctor about this if you're concerned.</p>
  `
  
  if (allAnswersNo(userAnswers)) {
    recommendations.add("You don't seem to have a sleep problem based on the answers you gave to this questionnaire, and so no recommendations have been generated.");
  } else {
      if (sleepProblemCondition(userAnswers)) {
        recommendations.add("Having a sleep problem can be frustrating but the good news is there are things you can do to improve your sleep. Adopting healthy habits and behaviours and changing environmental factors to help you have a good night's sleep is often called 'sleep hygiene', <a href='https://healthify.nz/hauora-wellbeing/s/sleep-tips/' target='_blank'>Learn more about tips to improve your sleep.</a> Remember, improved sleep will not happen as soon as changes are made. But if good sleep habits are maintained, sleep will certainly get better.");
        if (hasThreeOrMoreYes(userAnswers)) {
          recommendations.add("You seem to have several areas that could be affecting your sleep. Your problem may be quite complex and so you may wish to see your GP or a sleep specialist.")
        }
      } else {
        recommendations.add("Based on your answers you may not have a sleep problem. ");
        if (couldSleepBeImprovedCondition(userAnswers)){
          recommendations.add("However based on the answers to the questions you could still take a look at the following recommendations if you wanted to try improve your sleep quality:")
        }
      }
  }

 

  if (userAnswers[3] === 'Yes') {
  recommendations.add("You answered yes to being a shift worker. Shift workers can develop a condition known as shift work sleep disorder, because the body and the sleep-wake cycle are not aligned. This can result in mood problems, poor work performance, higher accident risk and added health problems. <a href='https://healthify.nz/hauora-wellbeing/s/sleep-shift-work/' target='_blank'>Learn more about shift Work page on Healthify and how it affects your sleep</a>. You may wish to see a sleep specialist as this can be a difficult problem to solve.");
  }

  if (userAnswers[4] === 'Yes') {
  recommendations.add("You answered that your bedroom is hot and uncomfortable. To sleep well, it's important to have a restful bedroom environment. You can do this by making your bedroom dark, cool, and quiet to ensure that your bed is comfortable.");
  }

  if (userAnswers[5] === 'Yes') {
  recommendations.add("You indicated that you use alcohol, use nicotine, or have caffeine in the evenings. These substances can cause sleep problems. Learn more about:<ul><li><a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-alcohol/' target='_blank'>Sleep and alcohol</a></li><li><a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-caffeine' target='_blank'> Sleep and caffeine</a></li><li><a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-nicotine' target='_blank'>Sleep and nicotine</a></li></ul>");
  }

  if (userAnswers[6] === 'Yes') {
  recommendations.add(napping);
  }

  if (userAnswers[7] === 'Yes') {
  recommendations.add("You answered yes to engaging in mentally stimulating, moderate to strenuous exercise, or emotionally upsetting activities within a couple hours of bedtime. These may be causing or contributing to your sleep problem and are best avoided. Taking the time to relax and unwind before bed has been shown to improve sleep quality. It helps you de-stress and sends signals to your body and mind that daytime activities are over and it's time to prepare for sleep."); 
 }

  if (userAnswers[8] === 'Yes') {
  recommendations.add("You answered yes to frequently using the bed for activities other than sleep or intimacy. This may be causing or contributing to your sleep problem.  Your bed should be a place where you can relax and feel comfortable. Only use your bed for sleep or intimacy. This will help your brain to recognise your bed as a place for sleeping. Avoid using electronic devices (eg, mobile phones or laptops) in bed.");
 }

 //check for mood or anxiety problem
  const moodOrAnxiety = [userAnswers[11], userAnswers[12]].some(answer => answer === 'Yes');
  const moodOrDepression = [userAnswers[9], userAnswers[10]].some(answer => answer === 'Yes');

  const justAThoughtLinks = `
  <ul><li><a href="https://www.justathought.co.nz/anxiety" target="_blank">Generalised anxiety course</a></li>
  <li><a href="https://www.justathought.co.nz/depression" target="_blank">Depression course</a></li>
  <li><a href="https://www.justathought.co.nz/health-anxiety" target="_blank">Health anxiety course</a></li>
  <li><a href="https://www.justathought.co.nz/mixed" target="_blank">Mixed Depression & Anxiety course</a></li></ul>
  `;

  const justAThoughtLinks2 = `
  <ul><li><a href="https://www.justathought.co.nz/depression" target="_blank">Depression course</a></li></ul>
  `;


  if (moodOrAnxiety || moodOrDepression) {
    if (moodOrAnxiety) {
      recommendations.add("Based on the answers you gave you may have a mood, anxiety or stress problem. Discuss this with your GP as this could be a factor in your sleep quality. Alternatively you may want to try a self-help course to better manage your mental health. Learn more:" + justAThoughtLinks);
    } else if (moodOrDepression) {
      recommendations.add("Based on the answers you gave you may have a mood or depression problem. Discuss this with your GP as this could be a factor in your sleep quality. Alternatively you may want to try a self-help course to better manage your mental health. Learn more:" + justAThoughtLinks2);
    }
  }


  if (userAnswers[13] === 'Yes' && userAnswers[14] === 'Yes') {
  recommendations.add("You said you snore loudly and you are falling asleep during the day. If you also stop breathing at night (called 'apnoea') then you likely have Obstructive Sleep Apnoea (OSA). Morning headaches and a dry mouth are other potential symptoms of OSA. You may wish to see your GP about this. You can answer a few more questions with the <a href='https://jackofallorgans.com/stopbang'target='_blank'>STOP-BANG tool</a> here to see how likely the diagnosis is. Learn more about <a href='https://healthify.nz/health-a-z/o/obstructive-sleep-apnoea/' target='_blank'>Obstructive Sleep Apnoea</a>");
  }

  if (userAnswers[13] === 'No' && userAnswers[14] === 'Yes') {
    recommendations.add("You said you are falling asleep frequently during the day. The medical term for this is 'Excessive Daytime Sleepiness.' The most common cause is sleep deprivation. Another common cause is Obstructive Sleep Apnoea, but you said you don't snore so this is less likely. If you are going to bed too late (e.g. playing video games late in the night, partying late, etc) then go to bed earlier and try get at least 7 hours of sleep.");
  }

  if (userAnswers[15] === 'Yes') {
  recommendations.add("You said you have a significant health problem affecting sleep quality. Discuss this with your GP in case there is something that can be done about it as this could be a factor in your sleep quality.");  
 }

  if (userAnswers[16] === 'Yes') {
  recommendations.add("You have answered yes to sleepwalking, sleep talking, grinding your teeth, having restless legs.  The technical term for these is parasomnia. Parasomnias are a group of sleep problems that are described as odd behaviours or experiences when you sleep. Parasomnias are common and generally get better over time. Discuss this with your GP, and learn more about <a href='https://healthify.nz/health-a-z/p-parasomnias' target='_blank'>parasomnias.</a> ");
 }

  if (userAnswers[17] === 'Yes') {
  recommendations.add("You said yes to wanting to reduce the amount of alcohol you drink. Any alcohol may affect your sleep because after a few hours it breaks down into a stimulant. Some people have alcohol before bedtime thinking it will make them feel sleepy, but it can have the opposite effect. To reduce the effects of alcohol on sleep, give your body enough time to metabolize alcohol before you sleep which means stopping drinking alcohol at least 4 hours before bedtime. If you're concerned about your drinking, talk to your healthcare provider, or contact <a href='https://www.cads.org.nz/' target='_blank'>CADS</a> if you want extra support. Learn more about <a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-alcohol' target='_blank'>sleep and alcohol</a>");
 }

  if (userAnswers[18] === 'Yes') {
  recommendations.add("You said yes to needing to reduce your non-prescription or recreational drug use. Try and reduce this as this could be a factor in your sleep quality. Talk to your healthcare provider or contact <a href='https://www.cads.org.nz/' target='_blank'>CADS</a> if you want extra support. Learn more about <a href='https://healthify.nz/health-a-z/i/illegal-drugs' target='_blank'>illegal drugs</a>");
 }

  if (userAnswers[19] === 'Yes' || userAnswers[20] === 'Yes') {
  recommendations.add("You said that you go to bed late at night and like to sleep late in the morning. You may have a condition called delayed sleep phase disorder. This is when you have got into a habit of going to sleep and waking later than is usual or functional. It can be helped by using a light box in the morning and <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin</a> at night. It's important to use melatonin carefully with advice from a healthcare provider. Read more about <a href='https://healthify.nz/health-a-z/d/delayed-sleep-phase-disorder/' target='_blank'>delayed sleep phase disorder (DSPD).</a>");
 }

  // Check if meets the sleep restriction recommendation condition, without another cause
  if (sleepRestrictionConditionWithoutCause(userAnswers)) {
  recommendations.add(everyNoText);
  recommendations.add(sleepRestrictionText);
  }

  // Check if meets the sleep restriction recommendation condition, with another cause
  if (sleepRestrictionWithOtherCauseCondition(userAnswers)) {
    recommendations.add(chronicInsomniaDiagnosisAdditional);
    recommendations.add(sleepRestrictionText);
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
  panel.id = "answersPanel";

  // Add answers to the panel
  for (const [questionID, answer] of Object.entries(userAnswers)) {
    const question = questions.find(q => q.id === parseInt(questionID));
    if (question) {
      panel.innerHTML += `<p><strong>${question.text}</strong><br>Answer: ${answer}</p>`;
    }
  }

  // Show the recommendations with a heading
  const recommendationsDiv = document.getElementById('recommendationsDiv');
  if (animationsEnabled) {
    recommendationsDiv.classList.add('fade-in');
  } else {
    recommendationsDiv.classList.remove('fade-in');
  }
  const RecommendationIntro = `
  <h2>Your Twenty Winks Personalised Plan</h2>
 
  <p>The following plan has been generated based on the answers you provided in the online questionnaire. This plan includes your answers, suggested next steps and some resources for you to use. 
  These resources come from the Healthify He Puna Waiora website which provides easy to read health information for all New Zealanders.</p>

  <p><strong>Note</strong>: This assessment is not a substitute for professional advice. Great care has been taken to provide you with personalised recommendations based on your responses, but you should always seek the advice of a qualified health professional with any questions about your sleep problems.</p>

  `;

  if (allAnswersNo(userAnswers)){
  recommendationsDiv.innerHTML = "";
  } else {
  recommendationsDiv.innerHTML = RecommendationIntro;
  }

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

  // Create a 'Copy to Clipboard' button
  const copyButton = document.createElement('button');
  copyButton.innerHTML = 'Copy link of this page to Clipboard';
  copyButton.id = 'copyButton';
  copyButton.addEventListener('click', function() {
    // Create a temporary textarea element to hold the URL
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = generateURL();  // Assuming generateURL() returns the URL as a string
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
  });

  // Append the 'Copy to Clipboard' button to the recommendationsDiv
  startAndPrint.appendChild(copyButton);


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
  // Find the accordion button for showing answers
  const accordion = document.querySelector('.accordion');
  
  // Find the panel that is the next sibling element of the accordion
  const panel = accordion.nextElementSibling;
  
  // Check if the accordion is already open by checking the display property of the panel
  if (panel.style.display !== "block") {
    // If it's not open, simulate a click to open it
    accordion.click();
  }
  
  // Initiate print dialog
  window.print();
}


// Add this function to generate a URL based on the user's answers
function generateURL() {
  const jsonString = JSON.stringify(userAnswers);
  const base64String = btoa(jsonString);
  const newURL = `${window.location.origin}${window.location.pathname}?data=${base64String}`;
  
  // Show the new URL to the user, for example, in an alert or some UI element
  return newURL;
}

// Add this function to load answers from a URL
function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const base64String = urlParams.get('data');
  
  if (base64String) {
    const jsonString = atob(base64String);
    userAnswers = JSON.parse(jsonString);
    document.getElementById('instructionsDiv').style.display = 'none';
    // Re-generate recommendations based on these answers
    generateRecommendations();
  }
}



function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  const elementsToToggle = ['container', 'instructionsDiv', 'creditsDiv', 'questionDiv', 'recommendationsDiv', 'otherResourcesDiv'];

  elementsToToggle.forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.toggle('dark-mode');
    }
  });

  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => panel.classList.toggle('dark-mode'));

  document.getElementById('darkModeToggle').innerText = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
  
  // Save the dark mode preference to localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
}

// Function to load dark mode preference
function loadDarkModePreference() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    toggleDarkMode();
  }
}

// Call this function when the page loads
window.addEventListener("load", function() {
  loadFromURL();
  loadDarkModePreference();
});

