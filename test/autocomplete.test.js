// helper function
const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      // check for selector element every 30 ms
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      // timeout if element doesn't appear after 2000 ms
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

//mocha function to reset environment
beforeEach(() => {
  document.querySelector("#target").innerHTML = ""; // clear target
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Avengers III" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

it("Dropdown starts closed", () => {
  // select dropdown
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

it("After searching, dropdown opens up", async () => {
  // create fake event
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching, displays some results", async () => {
  // create fake event
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});
