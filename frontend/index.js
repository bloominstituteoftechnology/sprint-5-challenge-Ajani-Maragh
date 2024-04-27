async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  //async function getDataFromEndPoint(endpoint) {
    //const learnersRes = await axios.get('http://localhost:3003/api/learners');
    //const learnersData = learnersRes.data;
    //console.log('this is learners data:', learnersData);

    //const mentorsRes = await axios.get('http://localhost:3003/api/mentors');
    //const mentorsData = mentorsRes.data;
    //console.log('This is mentors data:', mentorsData);

    //const learnersAndMentors = [];
    //learnersData.forEach(learner => {
      //const mentorsNames = [];
      //learner.mentors.forEach(mentorId => {
        //console.log('Current Mentor Id:', mentorId);
        //const mentor = mentorsData.find(mentor => mentor.id === mentorId);
        //console.log('found mentor:', mentor);
        //mentorsNames.push(mentor ? mentor.name : `unknown mentor ${mentorId}`);
      //})
      //const learnersAndMentorsNamesCombined = {...learner, mentors: mentorsNames};
      //learnersAndMentors.push(learnersAndMentorsNamesCombined);
      //console.log('these are learners and mentors combined', learnersAndMentors);
    //})
    //return learnersAndMentors


  //}
  //const learnersAndMentorsData = await getDataFromEndPoint();
  //console.log('learners and mentors data:', learnersAndMentorsData)

  //getDataFromEndPoint()


  async function getDataFromEndPoints(endpoint) {
    console.log(`getting data from end point: ${endpoint}...`);
    const response = await axios.get(endpoint);
    const data = response.data;
    console.log(`Data From ${endpoint}:`, data);
    return data;
  }

  const learnersEndPoint = 'http://localhost:3003/api/learners';
  const mentorsEndPoint = 'http://localhost:3003/api/mentors';

  const [learnersData, mentorsData] = await Promise.all([
    getDataFromEndPoints(learnersEndPoint),
    getDataFromEndPoints(mentorsEndPoint)
  ]);
  
console.log(learnersData, mentorsData)
  console.log('combining learners and mentors data');
  const combinedData = [];
  learnersData.forEach(learner => {
    const mentorNames = [];
    learner.mentors.forEach(mentorId => {
      const mentor = mentorsData.find(mentor => mentor.id === mentorId);
      if (mentor) {
        mentorNames.push(`${mentor.firstName} ${mentor.lastName}`)
      } else {
        mentorNames.push('unknown mentor');
      }
    })
    combinedData.push({ ...learner, mentors: mentorNames });
  })

  console.log('combined data:', combinedData);

  const cards = document.querySelector('.cards');
  combinedData.forEach(learner => {
      const learnerCard = document.createElement('div');
      learnerCard.classList.add('card');
      cards.appendChild(learnerCard);
      
      const learnerName = document.createElement('h3');
      learnerName.textContent = learner.fullName;
      cards.appendChild(learnerName);
      
      const learnerEmail = document.createElement('div');
      learnerEmail.textContent = learner.email;
      cards.appendChild(learnerEmail);

      const mentors = document.createElement('h4');
      mentors.classList.add('closed');
      mentors.textContent = 'Mentors';
      cards.appendChild(mentors);

      
      const ul = document.createElement('ul');
      cards.appendChild(ul);
      
      const li = document.createElement('li');
      li.textContent = learner.mentors[0];
      ul.appendChild(li);
      
      const li2 = document.createElement('li');
      li2.textContent = learner.mentors[1]
      ul.appendChild(li2)

      cards.addEventListener('click', (evt) => {
       if (evt.target === 'card') {
           evt.target.classList = 'selected'
       }
      })
})
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
