$(document).ready(() => {
  countDays();
  $("#explore-button").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: $("#main").offset().top,
      },
      "slow"
    );
  });
  getSpeakers();
  getTeam();
});

/** COUNTDOWN */
const countDays = () => {
  const eventDate = new Date("16 Jan 2021");
  const today = new Date();

  let outputMarkup = "";
  if (today > eventDate) {
    outputMarkup = "See you next year :-)";
  } else {
    const days = eventDate.getDate() - today.getDate();
    if (days > 1) {
      outputMarkup = `<span class='text-red'>${days}</span> Days to go...`;
    } else if (days === 1) {
      outputMarkup = `<span class='text-red'>${days}</span> Day to go...`;
    } else if (days === 0) {
      outputMarkup = "SEE YOU <span class='text-red'>TODAY!</span>";
    } else {
      outputMarkup = "See you next year :-)";
    }
  }

  document.getElementById("day-count").innerHTML = outputMarkup;
};

/** ===Speaker rendering JS=== */
const getSpeakers = async () => {
  let cardMarkup = "";
  let modalMarkup = "";

  try {
    const speakers = await $.getJSON("/db/speakers.json");
    speakers.forEach((speaker, index) => {
      cardMarkup += generateCardMarkup(speaker, index);
      modalMarkup += generateModalMakrup(speaker, index);
    });
  } catch (error) {
    console.log(error);
    cardMarkup = "Error in loading speakers!";
  }
  document.getElementById("speakers-area").innerHTML = cardMarkup;
  document.getElementById("modals-speaker").innerHTML = modalMarkup;
};

const generateCardMarkup = (speaker, index) => `
	<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 parent-card">
							<div class="card" data-toggle="modal" data-target="#modal-${index + 1}">
								<div class="box">
								
									<div class="img">
										<img
											src=${speaker.image}
											alt="${speaker.name}'s portait"
                      class="img-styles"
										/>
									</div>
									${getCredits(speaker)}
									<h2>
										${speaker.name}<br />
										<span>${speaker.headline}</span>
									</h2>
									
									<p>
										Speaking On:<hr/>
										<h4 >${speaker.topic}</h4>
									</p>
									
								</div>
							</div>
						</div>
`;

const getCredits = (speaker) =>
  speaker.credits ? `<small>Picture: ${speaker.credits}</small>` : "";

const generateModalMakrup = (speaker, index) => `
	<div class="modal fade" id="modal-${index + 1}" role="dialog">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">
								&times;
							</button>
							<img src=${speaker.image} alt="${speaker.name}'s portrait." />
							<div class="modal-title font-bolder">
								<h3 class="font-bolder">${speaker.name}</h3>
								${speaker.headline}
							</div>
						</div>
						<div class="modal-body">
							<p>
						    ${speaker.bio}
							</p>
						</div>
					</div>
				</div>
      </div>
    </div>
`;

/** ===TEAM RENDERING JS=== */
const getTeam = async () => {
  let outputMarkup = "";
  try {
    const members = await $.getJSON("/db/team.json");
    outputMarkup += `<div class="row">`;
    members.forEach((member) => {
      outputMarkup += `
      <div class="col-sm-4 container-team-member">
        <div class="float-my-children">
          <img src="${member.picture}" alt="${
        member.name
      }'s picture"  class='img-styles'/>
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
  } catch (error) {
    console.log(error);
    outputMarkup = `Error in loading team!`;
  }

  $("#container-team").html(outputMarkup);
};

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
  if (member.instagram) {
    markup += `
    <li>
      <a href=  ${member.instagram} target="noopener noreferrer" aria-label="${member.name}' linkedin account">
        <i class="fab fa-instagram"></i>
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
