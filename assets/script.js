/* gptme Plugin Registry — client-side filtering and sorting */

(function () {
  const table = document.getElementById("registry-table");
  if (!table) return;
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const tabs = document.querySelectorAll(".tab");
  const allTab = document.querySelector(".tab-all");

  // --- Filtering ---
  function filter(topic) {
    rows.forEach((row) => {
      const tags = row.querySelector("td:nth-child(2)");
      const show = topic === "all" || (tags && tags.textContent.includes(topic));
      row.style.display = show ? "" : "none";
    });
    tabs.forEach((t) => t.classList.remove("active"));
    const active = topic === "all" ? allTab : document.querySelector(`.tab[data-topic="${topic}"]`);
    if (active) active.classList.add("active");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const topic = tab.dataset.topic || "all";
      filter(topic);
    });
  });

  // --- Sorting ---
  const headers = table.querySelectorAll("th[data-sort]");
  let sortDir = {};
  headers.forEach((h) => { sortDir[h.dataset.sort] = "desc"; });

  headers.forEach((header) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const key = header.dataset.sort;
      const col = Array.from(header.parentNode.children).indexOf(header);
      const dir = sortDir[key] === "asc" ? "desc" : "asc";
      sortDir[key] = dir;

      rows.sort((a, b) => {
        const av = a.children[col]?.textContent.trim() || "";
        const bv = b.children[col]?.textContent.trim() || "";
        const cmp = key === "stars" ? parseInt(av) - parseInt(bv) : av.localeCompare(bv);
        return dir === "asc" ? cmp : -cmp;
      });

      rows.forEach((r) => tbody.appendChild(r));

      // Update sort indicator
      headers.forEach((h) => { h.textContent = h.textContent.replace(/ [▲▼]$/, ""); });
      header.textContent += dir === "asc" ? " ▲" : " ▼";
    });
  });
})();
