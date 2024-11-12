// This is an example with default parameters
// You'll always have to call simplyCountdown using ID's, no classes.

simplyCountdown(".simply-countdown", {
  year: 2024, // required
  month: 12, // required
  day: 27, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "hari", plural: "hari" },
    hours: { singular: "jam", plural: "jam" },
    minutes: { singular: "menit", plural: "menit" },
    seconds: { singular: "detik", plural: "detik" },
  },
  // in case of inline set to false
  //   enableUtc: false,
});

// Also, you can init with already existing Javascript Object.
let myElement = document.querySelector(".my-countdown");
simplyCountdown(myElement, {
  /* options */
});

let multipleElements = document.querySelectorAll(".my-countdown");
simplyCountdown(multipleElements, {
  /* options */
});

/////////////////////////////////////////////////////////////////////\
