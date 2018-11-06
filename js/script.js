$(document).ready(function () {
    getTeam();
    $('#explore-button').on('click', function () {
        console.log('Hi');
        $('#landing-overlay').css({
            'top': '-100%'
        });
        $('#main').css({
            'top': '0%'
        });
    });

    function getLinks(links) {
        var result = '';
        links.forEach(function (link) {
            if (link.linkType === 'Twitter') {
                result += '<li><a href="' +
                    link.link +
                    '" target="_blank"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>';
            }
            if (link.linkType == 'LinkedIn') {
                result += '<li><a href="' +
                    link.link +
                    '" target="_blank"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>';
            }
            if (link.linkType == 'Blog') {
                result += '<li><a href="' +
                    link.link +
                    '" target="_blank"><i class="fas fa-link" aria-hidden="true"></i></a></li>';
            }
            if (link.linkType == 'Facebook') {
                result += '<li><a href="' +
                    link.link +
                    '" target="_blank"><i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>';
            }
        });
        return result;
    }

    function getTemplate(member) {
        var template =
            `<div class="col-lg-4 container-team-member">
                <div class="clearfix float-my-children">
                    <img src="` + member.displayPicture + `">
                    <div class="team-member-details">
                        <span class="team-member-name" style="font-weight:500;" id="blue_text">` + member.name + `</span>
                        <br />
                        <span>` + member.description + `</span>
                        <span>
                            <ul>` + getLinks(member.links) + `</ul>
                        </span>
                    </div>
                </div>
            </div>`;
        return template;
    }
    var html = '';

    function getTeam() {
        console.log('team');
        $.getJSON('https://alfarhanzahedi.com/tedxhitk/js/team.json', function (members) {
            members.forEach(function (member) {
                html += getTemplate(member);
            });
            $('#container-team').append(html);
        })
    };

});