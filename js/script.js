$(document).ready(function () {
    getTeam();
    $('#explore-button').on('click', function () {
        $('html,body').animate({
            scrollTop: $("#main").offset().top},
            'slow');
    });
    $('#show-extra-members').on('click', function(){
        $('#container-team-extra').slideToggle("slow");
        var element = $('#show-extra-members-content');
        if(element.text() == 'Show \'em all')
            element.text('Hide \'em all');
        else
            element.text('Show \'em all');
    });

    function getLinks(member) {
        var result = '';
        var links = member.links;
        links.forEach(function (link) {
            if (link.linkType === 'Twitter') {
                result += '<li><a rel="noreferrer noopener" href="' +
                    link.link +
                    '" target="_blank" aria-label="' + member.name  +'\'s Twitter account."><i class="fab fa-twitter"></i></a></li>';
            }
            if (link.linkType == 'LinkedIn') {
                result += '<li><a rel="noreferrer noopener" href="' +
                    link.link +
                    '" target="_blank" aria-label="' + member.name  +'\'s LinkedIn account."><i class="fab fa-linkedin"></i></a></li>';
            }
            if (link.linkType == 'Blog') {
                result += '<li><a rel="noreferrer noopener" href="' +
                    link.link +
                    '" target="_blank" aria-label="' + member.name  +'\'s blog."><i class="fas fa-link"></i></a></li>';
            }
            if (link.linkType == 'Facebook') {
                result += '<li><a rel="noreferrer noopener" href="' +
                    link.link +
                    '" target="_blank" aria-label="' + member.name  +'\'s Facebook profile."><i class="fab fa-facebook-f"></i></a></li>';
            }
        });
        return result;
    }

    function getTemplate(member) {
        var template =
            `<div class="col-lg-3 col-md-3 col-sm-12 container-team-member">
                <div class=" float-my-children">
                    <img src="` + member.displayPicture + `" alt="` + member.name +`'s portrait." />
                    <div class="team-member-details">
                        <span class="team-member-name">` + member.name + `</span>
                        <br />
                        <span>` + member.description + `</span>
                        <span>
                            <div style="margin: 0px auto;"><ul>` + getLinks(member) + `</ul></div>
                        </span>
                    </div>
                </div>
            </div>`;
        return template;
    }
    var html = '';

    function getTeam(file) {
        $.getJSON('js/team.json', function (members) {
            members.forEach(function (member) {
                html += getTemplate(member);
            });
            $('#container-team').append(html);
            html = '';
            $.getJSON('js/extra-team.json', function (members) {
                members.forEach(function (member) {
                    html += getTemplate(member);
                });
                $('#container-team-extra').append(html);
            })
        })
    };

});