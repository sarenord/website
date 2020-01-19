function selectTab(evt, tab) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tabs = Document.getElementsByClassName("tabs");
    var current = Document.getElementById(tab);

    for (let i=0; i<tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    for (let i=0; i<tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    current.style.display = "block";
    evt.currentTarget.className += "active";
}
