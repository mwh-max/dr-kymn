(() => {
  const countySelect = document.getElementById("kymn-county");
  const countySearch = document.getElementById("kymn-county-search");
  const dataList = document.getElementById("kymn-county-list");
  const resultEl = document.getElementById("kymn-result");

  function render(b, county) {
    if (!b) {
      resultEl.innerHTML = `<p>Broker info unavailable.</p>`;
      return;
    }
    const tf = (b.tollFree || "").replace(/[^0-9]/g, "");
    const local = (b.local || "").replace(/[^0-9]/g, "");
    resultEl.innerHTML = `
      <article class="broker-card">
        <h3>${b.name}</h3>
        <p class="county-line"><strong>County:</strong> ${county}</p>
        <p>
          <strong>Toll‑free:</strong> <a href="tel:${tf}">${b.tollFree}</a><br/>
          <strong>Local:</strong> <a href="tel:${local}">${b.local}</a>
        </p>
        ${
          b.website
            ? `<p><a href="${b.website}" rel="noopener noreferrer">Website</a></p>`
            : ""
        }
        <p><a class="call-button" href="tel:${tf}">Call to schedule</a></p>
      </article>
    `;
  }

  function chooseCounty(name, map, brokers) {
    const county = Object.keys(map).find(
      (c) => c.toLowerCase() === name.toLowerCase()
    );
    if (!county) return;
    countySelect.value = county; // keep select in sync
    render(brokers[map[county]], county);
  }

  fetch("data/who-drives.json")
    .then((r) => r.json())
    .then(({ counties, brokers }) => {
      // populate select + datalist
      Object.keys(counties)
        .sort()
        .forEach((county) => {
          const opt = document.createElement("option");
          opt.value = county;
          opt.textContent = county;
          countySelect.appendChild(opt);

          const opt2 = document.createElement("option");
          opt2.value = county;
          dataList.appendChild(opt2);
        });

      countySelect.addEventListener("change", () => {
        const county = countySelect.value;
        resultEl.innerHTML = county ? "" : resultEl.innerHTML;
        if (!county) return;
        render(brokers[counties[county]], county);
        countySearch.value = county; // keep search in sync
      });

      countySearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          chooseCounty(countySearch.value.trim(), counties, brokers);
        }
      });

      // Also choose on input if they pick from the datalist
      countySearch.addEventListener("input", () => {
        const v = countySearch.value.trim();
        // Only auto-render when exact match exists (prevents flicker)
        if (Object.prototype.hasOwnProperty.call(counties, v)) {
          chooseCounty(v, counties, brokers);
        }
      });
    })
    .catch(() => {
      resultEl.innerHTML = `<p>Couldn’t load transportation data.</p>`;
    });
})();
