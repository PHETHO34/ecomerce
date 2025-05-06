const items = [
  { name: "Website Design", type: "service", desc: "Responsive design for all platforms." },
  { name: "SEO Optimization", type: "service", desc: "Rank higher on Google." },
  { name: "Cloud Hosting", type: "service", desc: "Fast and secure hosting plans." },
  { name: "Data Recovery", type: "product", desc: "Restore deleted files easily." },
  { name: "Firewall Protection", type: "product", desc: "Secure your network from attacks." },
  { name: "Backup Software", type: "product", desc: "Automatic data backup tool." }
];

function displayItems(filter = "") {
  const grid = document.getElementById("itemGrid");
  grid.innerHTML = "";

  const recentViews = JSON.parse(localStorage.getItem("recentViews") || "[]");
  let sortedItems = [...items];

  // Show recent items first
  sortedItems.sort((a, b) => {
    const aIndex = recentViews.indexOf(a.name);
    const bIndex = recentViews.indexOf(b.name);
    return (bIndex !== -1 ? bIndex : Infinity) - (aIndex !== -1 ? aIndex : Infinity);
  });

  sortedItems
    .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "grid-item";
      div.innerText = item.name;
      div.onclick = () => showModal(item);
      grid.appendChild(div);
    });
}

function showModal(item) {
  const modalTitle = document.getElementById("itemModalLabel");
  const modalBody = document.getElementById("modalBody");

  modalTitle.innerText = item.name;
  modalBody.innerHTML = `<p>${item.desc}</p>`;

  // Record user's behavior
  let recent = JSON.parse(localStorage.getItem("recentViews") || "[]");
  recent = [item.name, ...recent.filter(name => name !== item.name)].slice(0, 5);
  localStorage.setItem("recentViews", JSON.stringify(recent));

  const modal = new bootstrap.Modal(document.getElementById('itemModal'));
  modal.show();
}

function filterItems() {
  const query = document.getElementById("searchBar").value;
  displayItems(query);
}

window.onload = () => displayItems();
