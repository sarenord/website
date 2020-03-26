package main

import (
	"bytes"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

// This is basically the page structure configuration for the whole site

type PageBlueprint struct {
	Template string
	Label    string
	Styles   []string
	Scripts  []string
}

type ServablePage struct {
	Body    []byte
	Scripts []string
	Styles  []string
}

var pages = map[string]PageBlueprint{
	"home": PageBlueprint{
		Template: "landing.html",
		Label:    "homepage.html",
		Styles:   []string{"landing.css", "homepage.css"},
		Scripts:  []string{"landing.js", "homepage.js"},
	},
	"about": PageBlueprint{
		Template: "landing.html",
		Label:    "about.html",
		Styles:   []string{"landing.css", "about.css"},
		Scripts:  []string{"landing.js", "about.js"},
	},
	"projects": PageBlueprint{
		Template: "landing.html",
		Label:    "projects.html",
		Styles:   []string{"landing.css", "projects.css"},
		Scripts:  []string{"landing.js", "projects.js"},
	},
	"contact": PageBlueprint{
		Template: "landing.html",
		Label:    "contact.html",
		Styles:   []string{"landing.css", "contact.css"},
		Scripts:  []string{"landing.js", "contact.js"},
	},
}

func (p *PageBlueprint) assemble(w http.ResponseWriter) {
	var err error
	var body []byte
	scripts := make([]string, len(p.Scripts))
	styles := make([]string, len(p.Styles))

	body, err = ioutil.ReadFile("./resources/pages/" + p.Label)
	fmt.Printf("Template: %s", p.Template);
	baseTemplate := template.Must(template.New("base").ParseFiles("./resources/templates/" + p.Template))

	for i := 0; i < len(p.Scripts); i++ {
		var script []byte
		script, err = ioutil.ReadFile("./resources/scripts/" + p.Scripts[i])
		scripts[i] = string(script)
	}
	for i := 0; i < len(p.Styles); i++ {
		var style []byte
		style, err = ioutil.ReadFile("./resources/styles/" + p.Styles[i])
		styles[i] = string(style)
	}

	if err != nil {
		panic(err)
		fmt.Printf("error assembling page")
	}

	var r ServablePage = ServablePage{
		Body:    body,
		Styles:  styles,
		Scripts: scripts,
	}

	templateStager := new(bytes.Buffer)
	baseTemplate.Execute(templateStager, r)
	l2Template := template.Must(template.New("final").Parse(templateStager.String()))
	l2Template.Execute(w, r)
	fmt.Printf("%s", baseTemplate)
}

func fromName(l string) PageBlueprint {
	fmt.Printf("%s", pages[l]);
	return pages[l]
}
