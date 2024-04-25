async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  async function getDataFromEndPoint(endpoint) {
    const learnersRes = await axios.get('http://localhost:3003/api/learners');
    const learnersData = learnersRes.data;
    console.log('this is learners data:', learnersData);

    const mentorsRes = await axios.get('http://localhost:3003/api/mentors');
    const mentorsData = mentorsRes.data;
    console.log('This is mentors data:', mentorsData);

    const learnersAndMentors = [];
    learnersData.forEach(learner => {
      const mentorsNames = [];
      learner.mentors.forEach(mentorId => {
        console.log('Current Mentor Id:', mentorId);
        const mentor = mentorsData.find(mentor => mentor.id === mentorId);
        console.log('found mentor:', mentor);
        mentorsNames.push(mentor ? mentor.name : `unknown mentor ${mentorId}`);
      })
      const learnersAndMentorsNamesCombined = {...learner, mentors: mentorsNames};
      learnersAndMentors.push(learnersAndMentorsNamesCombined);
      //console.log('these are learners and mentors combined', learnersAndMentors);
    })
    return learnersAndMentors


  }
  const learnersAndMentorsData = await getDataFromEndPoint();
  console.log('learners and mentors data:', learnersAndMentorsData)

  getDataFromEndPoint()

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
