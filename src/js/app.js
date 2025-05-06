import "../style/index.css";

function render(variables = {}) {
  console.log("Estas son las variables actuales: ", variables);

  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) {
    cover = `<div class="cover"></div>`;
  }

  // Preparar datos con valores por defecto si son null
  let name = variables.name ? variables.name : "Nombre";
  let lastName = variables.lastName ? variables.lastName : "Apellido";
  let role = variables.role ? variables.role : "Tu rol";
  let city = variables.city ? variables.city : "Ciudad";
  let country = variables.country ? variables.country : "País";
  let avatar = variables.avatarURL;

  let socialLinks = "";
  if (variables.twitter)
    socialLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  if (variables.github)
    socialLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  if (variables.linkedin)
    socialLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  if (variables.instagram)
    socialLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${avatar}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <ul class="${variables.socialMediaPosition}">
        ${socialLinks}
      </ul>
    </div>
  `;
}

// No tocar esto
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;

      render(Object.assign(window.variables, values));
    });
  });
};
