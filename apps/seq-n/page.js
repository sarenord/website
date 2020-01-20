window.onload = function() { initSequencer() };

//close the dropdown menus if the user clicks out of them
window.onclick = function(e) {
    if (!e.target.matches(".dropdownButton")) {
	var dropdowns = document.getElementsByClassName("dropdownContent");
	for (var i=0; i<dropdowns.length; i++) {
	    if (dropdowns[i].classList.contains("show")) {
		dropdowns[i].classList.remove("show");
	    }
	}
    }
}

//entry point
function initSequencer() {
    // insert HTML for the rows of the sequencer
    var table = document.getElementById("sequencer");
    for (var i=0; i < 5; i++) {
	var row = document.createElement("div");
	row.className = "sequenceRow";
	row.appendChild(createInstrumentDropdown());
	for (var j=0; j < 8; j++) {
	    var s = document.createElement("div");
	    var c = document.createElement("div");
	    s.className = "step";
	    c.className = "cell inactive";
	    c.id = i + '-' + j;
	    c.onclick = function () {toggleStep();};
	    s.appendChild(c);
	    row.appendChild(s);
	}
	table.appendChild(row);
    }
}

function createInstrumentDropdown() {
    var dropdown = document.createElement("div");
    var dropdownButton = document.createElement("button");
    var dropdownContent = document.createElement("div");
    dropdownButton.onclick = function() { toggleDropdown(); };
    dropdown.className = "dropdown";
    dropdownContent.className = "dropdownContent";
    dropdownButton.className = "dropdownButton";
    for (var i=0; i<3; i++) {
	var item = document.createElement("a");
	item.href = "#";
	dropdownContent.appendChild(item);
    }
    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);
    return dropdown;
}


function toggleDropdown() {
    var el = event.target || event.srcElement;
    el.parentElement.childNodes[1].classList.toggle("show");
}

function toggleStep() {
    var el = event.target || event.srcElement;
    if ((el.className == "cell inactive") || (el.className == "cell active")) {
	var cell = document.getElementById(el.id);
	cell.className = cell.className=="cell inactive" ? "cell active" : "cell inactive";
    }
}

function nextNote() {
    var secondsPerBeat = 60.0/tempo;
    currentNote++;
    if (currentNote == numsteps) {
	currentNote = 0;
    }
}
