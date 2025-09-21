async function getVerse() {
  const inputEl = document.getElementById("verseInput");
  const display = document.getElementById("verseDisplay");

  const rawInput = inputEl.value || "";
  const input = rawInput.trim();

  if (!input) {
    display.textContent = "Please enter a verse (e.g. John 3:16).";
    return;
  }

  // Set loading state
  display.textContent = "Loading...";

  try {
    const url = `https://bible-api.com/${encodeURIComponent(input)}?translation=kjv`;
    const response = await fetch(url);

    if (!response.ok) {
      // show HTTP status for debugging
      display.textContent = `Error: ${response.status} ${response.statusText}`;
      return;
    }

    const data = await response.json();

    if (data.text && data.reference) {
      // Build safe DOM nodes rather than injecting raw HTML
      display.innerHTML = ""; // clear

      const h2 = document.createElement("h2");
      h2.textContent = data.reference;

      const p = document.createElement("p");
      p.textContent = data.text;

      display.appendChild(h2);
      display.appendChild(p);
    } else {
      display.textContent = "Verse not found. Check your input.";
    }
  } catch (error) {
    console.error("Fetch verse error:", error);
    display.textContent = "Error fetching verse. Please try again later.";
  }
}