// Add an event listener to listen for messages from the popup
(async () => {
  const domain = location.href.slice(8, 16);

  chrome.runtime.onMessage.addListener((formData) => {
    const nameLabel = document.createElement("h3");
    const themeLabel = document.createElement("h3");
    const node1 = document.createTextNode(
      "The name is " + formData.data.username
    );
    const node2 = document.createTextNode(
      "The theme is " + formData.data.theme
    );
    nameLabel.appendChild(node1);
    nameLabel.id = "lblUserName";
    nameLabel.style.position = "fixed";
    nameLabel.style.top = "50px";
    nameLabel.style.left = "30%";
    nameLabel.style.zIndex = 999999999;
    themeLabel.appendChild(node2);
    themeLabel.id = "lblTheme";
    themeLabel.style.position = "fixed";
    themeLabel.style.top = "70px";
    themeLabel.style.left = "30%";
    themeLabel.style.zIndex = 999999999;

    console.log(document.getElementById("lblUserName"));
    if (document.getElementById("lblUserName") != null) {
      document.getElementById("lblUserName").remove();
    }
    if (document.getElementById("lblTheme") != null) {
      document.getElementById("lblTheme").remove();
    }

    document.body.append(nameLabel);
    document.body.append(themeLabel);
  });

  if (domain == "material") {
    const hiddenBtn = document.createElement("button");
    const node = document.createTextNode("H");
    hiddenBtn.appendChild(node);
    hiddenBtn.style.width = "40px";
    hiddenBtn.style.height = "40px";
    hiddenBtn.style.borderRadius = "50px";
    hiddenBtn.style.backgroundColor = "#252E3E";
    hiddenBtn.style.color = "white";
    hiddenBtn.style.position = "fixed";
    hiddenBtn.style.top = "10px";
    hiddenBtn.style.right = "70%";
    hiddenBtn.style.fontSize = "20px";
    hiddenBtn.style.cursor = "pointer";
    hiddenBtn.style.border = "none";
    hiddenBtn.style.zIndex = 999999999;

    hiddenBtn.addEventListener("mouseover", () => {
      hiddenBtn.style.backgroundColor = "#1C2536";
    });

    hiddenBtn.addEventListener("mouseout", () => {
      hiddenBtn.style.backgroundColor = "#252E3E";
    });

    hiddenBtn.addEventListener("click", () => {
      location.href = "https://www.redbubble.com/shop/{QUERY}";
    });

    const index = location.href.indexOf("=");
    const username = location.href.substring(index + 1);
    hiddenBtn.addEventListener("click", () => {
      if (location.href.search("customers") == -1) {
        location.href = "https://www.redbubble.com/shop/{QUERY}";
      } else {
        location.href = `https://www.redbubble.com/people/${username}/shop`;
      }
    });

    document.body.append(hiddenBtn);
  } else {
    const addBtn = document.createElement("button");
    // addBtn.src = "dashboard.png"
    const node1 = document.createTextNode("A");
    addBtn.appendChild(node1);
    addBtn.style.width = "40px";
    addBtn.style.height = "40px";
    addBtn.style.color = "white";
    addBtn.style.borderRadius = "50px";
    addBtn.style.position = "fixed";
    addBtn.style.top = "86px";
    addBtn.style.right = "-5px";
    addBtn.style.cursor = "pointer";
    addBtn.style.border = "none";
    addBtn.style.backgroundColor = "#725BEB";
    addBtn.style.zIndex = 999999999;

    addBtn.addEventListener("mouseover", () => {
      addBtn.style.backgroundColor = "#5339D8";
    });

    addBtn.addEventListener("mouseout", () => {
      addBtn.style.backgroundColor = "#725BEB";
    });

    addBtn.addEventListener("click", () => {
      const username = document.body.querySelector(
        ".styles__display-block--3kWC4"
      ).firstChild.nodeValue;
      if (location.href.search("people") == -1) {
        location.href = `https://material-kit-react.devias.io/#/?username=${username}`;
      } else {
        location.href = `https://material-kit-react.devias.io/customers/#/?username=${username}`;
      }
    });

    document.body.append(addBtn);
  }

  chrome.runtime.sendMessage("mess", (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log("received user data", response);
  });
})();
