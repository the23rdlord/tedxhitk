$(document).ready(function() {
  countDownTimer();
  $("#explore-button").on("click", function() {
    $("html,body").animate(
      {
        scrollTop: $("#main").offset().top
      },
      "slow"
    );
  });

  getTeam();
});

/** ===TEAM RENDERING JS=== */
async function getTeam() {
  const members = await $.getJSON("/js/team.json");
  let outputMarkup = "";
  members.forEach(row => {
    outputMarkup += `<div class="row">`;
    row.forEach(member => {
      outputMarkup += `
      <div class="col-sm-4 container-team-member">
        <div class="float-my-children">
          <img src="${member.picture}" alt="${member.name}'s picture" />
          <div class="team-member-details">
            <span class="team-member-name">${member.name}</span><br/>
            <span>${member.designation}</span><br />
            <span>
              <div style="margin:0px auto">
                <ul>
                  ${getLinks(member)}
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
    `;
    });
    outputMarkup += "</div>";
  });

  $("#container-team").html(outputMarkup);
}

function getLinks(member) {
  let markup = "";
  if (member.facebook) {
    markup += `
    <li>
      <a href=  ${member.facebook} target="noopener noreferrer" aria-label="${member.name}' facebook account">
        <i class="fab fa-facebook"></i>
      </a>
    </li>
    `;
  }

  if (member.linkedin) {
    markup += `
    <li>
      <a href=  ${member.linkedin} target="noopener noreferrer" aria-label="${member.name}' linkedin account">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </li>
    `;
  }

  if (member.twitter) {
    markup += `
    <li>
      <a href=  ${member.twitter} target="noopener noreferrer" aria-label="${member.name}' twitter account">
        <i class="fab fa-twitter"></i>
      </a>
    </li>
    `;
  }

  if (member.website) {
    markup += `
    <li>
      <a href=  ${member.website} target="noopener noreferrer" aria-label="${member.name}' website">
        <i class="fa fa-globe"></i>
      </a>
    </li>
    `;
  }

  return markup;
}

/** COUNTDOWN */
var eventDate = new Date("Mar 24, 2020 10:00:00").getTime();

var countDownTimer = () =>
  setInterval(function() {
    var now = new Date().getTime();
    var distance = eventDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("countdown-timer-days").textContent = days;
    document.getElementById("countdown-timer-hours").textContent = hours;
    document.getElementById("countdown-timer-minutes").textContent = minutes;
    document.getElementById("countdown-timer-seconds").textContent = seconds;
  }, 1000);
