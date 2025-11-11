var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

var textArray = [
  "| 'Code is like humor. When you have to explain it, it’s bad.' - Cory House",
  "| 'The best way to predict the future is to invent it.' - Alan Kay",
  "| 'Software is a great combination of artistry and engineering.' - Bill Gates",
  "| 'The Internet is becoming the town square for the global village of tomorrow.' - Bill Gates",
  "| 'The computer was born to solve problems that did not exist before.' - Bill Gates",
  "| 'Simplicity is the soul of efficiency.' - Austin Freeman",
  "| 'The only thing that interferes with my learning is my education.' - Albert Einstein",
  "| 'The function of good software is to make the complex appear to be simple.' - Grady Booch",
  "| 'Any sufficiently advanced technology is indistinguishable from magic.' - Arthur C. Clarke",
];

var speedForward = 50,
  speedWait = 1000,
  speedBetweenLines = 1000,
  speedBackspace = 20;

typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h2"),
    eParagraph = element.children("p");

  if (!isBackspacing) {
    if (i < aString.length) {
      if (aString.charAt(i) == "|") {
        isParagraph = true;

        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedBetweenLines);
      } else {
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedForward);
      }
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedWait);
    }
  } else {
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1)
        );
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedBackspace);
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function () {
        typeWriter(id, ar);
      }, 50);
    }
  }
}
