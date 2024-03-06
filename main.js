var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

var textArray = [
  "| 💡 Technology is anything that wasn’t around when you were born. 💡 - Alan Kay",
  "| 💡 The advance of technology is based on making it fit in so that you don’t really even notice it, so it’s part of everyday life. 💡 - Bill Gates",
  "| 💡 The technology you use impresses no one. The experience you create with it is everything. 💡 - Sean Gerety",
  "| 💡 The science of today is the technology of tomorrow. 💡 - Edward Teller",
  "| 💡 The most important and urgent problems of the technology of today are no longer the satisfactions of the primary needs or of archetypal wishes, but the reparation of the evils and damages by the technology of yesterday. 💡 - Dennis Gabor",
  "| 💡 The greatest danger in modern technology isn't that machines will begin to think like people, but that people will begin to think like machines. 💡 - Sydney J. Harris",
  "| 💡 It has become appallingly obvious that our technology has exceeded our humanity. 💡 - Albert Einstein",
  "| 💡 The real problem is not whether machines think, but whether men do. 💡 - B.F. Skinner",
  "| 💡 The art challenges the technology, and the technology inspires the art. 💡 - John Lasseter",
  "| 💡 Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. 💡 - Bill Gates",
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
