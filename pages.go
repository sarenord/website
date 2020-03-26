package main

import(
	"os"
	"net/http"
	"html/template"
	"fmt"
	"io/ioutil"
)

// This is basically the page structure configuration for the whole site

type PageBlueprint struct {
	Template string
	Label string
	Styles []string
	Scripts []string
}

type ServablePage{
	Body html.Template
	Scripts []string
	Styles []string
}

var pages = map[string]PageBlueprint{
	"home": PageBlueprint{
		Template: "landing.html",
		Label: "homepage.html",
		Styles: []string{ "landing.css", "homepage.css" },
		Scripts: []string{ "landing.js", "homepage.js" },
	},
	"about": PageBlueprint{
		Template: "landing.html",
		Label: "about.html",
		Styles: []string{ "landing.css", "about.css" },
		Scripts: []string{ "landing.js", "about.js" },
	},
	"projects": PageBlueprint{
		Template: "landing.html",
		Label: "projects.html",
		Styles: []string{ "landing.css", "projects.css" },
		Scripts: []string{ "landing.js", "projects.js" },
	},
	"contact": PageBlueprint{
		Template: "landing.html",
		Label: "contact.html",
		Styles: []string{ "landing.css", "contact.css" },
		Scripts: []string{ "landing.js", "contact.js" },
	},
}

func (p *PageBlueprint)assemble(w http.ResponseWriter) template.HTML {
	baseTemplate := template.Must(template.New("base").ParseFiles("./resources/templates/"+p.Template));
	body := template.Must(template.New().ParseFiles("./resources/pages/"+p.Label));
	scripts := [len(p.Scripts)]string;
	for (int i=0; i<len(scripts); i++) {
		scripts[i] = ioutil.ReadFile(
	}
	fmt.Printf("%s", baseTemplate);

	var r template.HTML;
	return r;
}
