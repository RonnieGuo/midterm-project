$(() => {
  window.header = {};

  const $pageHeader = $("#page-header");
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">Home</li>
          <li class="search_button">Search</li>
          <li class="login_button">Log In</li>
          <li class="sign-up_button">Sign Up</li>
        </ul>
      </nav>
      `;
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">Home</li>
          <li class="search_button">Search</li>
          <li>${user.name}</li>
          <li class="add_button">Add</li>
          <li class="my_resouces_button">My Resouces</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `;
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;

  getMyDetails().then(function (json) {
    updateHeader(json.user);
  });
});
