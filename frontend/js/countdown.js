const targetDate = new Date("2025-04-13T00:00:00-06:00") 
//I get it...
// now you need yyyy-mm-dd, T to separate, hh:mm:ss, timezone

document.getElementById("target").innerHTML = targetDate.toDateString() + " " + targetDate.toLocaleTimeString();

setInterval(myTimer, 1000);

function myTimer() {
  const date = new Date();
  document.getElementById("cur").innerHTML = date.toDateString() + " " + date.toLocaleTimeString();
}

// https://stackoverflow.com/questions/41948/how-do-i-get-the-difference-between-two-dates-in-javascript
function treatAsUTC(date) {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}
function dateDiff(startDate, endDate) {
    return msToDHMS(treatAsUTC(endDate) - treatAsUTC(startDate));
}


function msToDHMS(ms) {
    let seconds = ms / 1000; 
    const days = parseInt(seconds / (60 * 60 * 24));
    seconds %= 86400; 
    const hours = parseInt(seconds / (60 * 60)); 
    seconds %= 3600; 
    const minutes = parseInt(seconds / 60);
    seconds %= 60; 
    return {d: days, h: hours, m: minutes, s: seconds};
}

setInterval(countdownTimer, 1000);

function countdownTimer() {
    const diff = dateDiff(new Date(), targetDate)
    document.getElementById("count").innerHTML = diff.d + " days, " + diff.h + " hours, " + diff.m + " minutes, " + diff.s.toFixed() + " seconds.";
}

fetch('http://localhost:8080/games')
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    console.log('All Games:', data);
    data.forEach(element => {
        const node = document.createElement("li");
        const text_node = document.createTextNode(element.title);
        node.appendChild(text_node);
        document.getElementById("mylist").appendChild(node);
    });
  })
  .catch(error => {
    console.error('Error fetching games:', error);
  });
