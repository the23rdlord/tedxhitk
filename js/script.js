$(document).ready(function () {
	countDays();
	$("#explore-button").on("click", function () {
		$("html,body").animate(
			{
				scrollTop: $("#main").offset().top,
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
	members.forEach((row) => {
		outputMarkup += `<div class="row">`;
		row.forEach((member) => {
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

/** COUNTDOWN */
var eventDate = new Date("Mar 24, 2020 10:00:00").getTime();

var countDays = () => {
	const eventDate = new Date("16 Jan 2021");
	const today = new Date();

	const days = eventDate.getDate() - today.getDate();
	document.getElementById(
		"day-count"
	).innerHTML = `<span class='text-red'>${days}</span> Days to go...`;
};
