package main

import (
	"net/http"
	"fmt"
	"io/ioutil"
	"log"
	"html/templates"
)

struct Page {
	Title string
	Body []byte
}

func main() {
	http.HandleFunc("/", pageRouter);
	log.Fatal(http.ListenAndServe(":8080", nil));
}

func pageRouter(w http.ResponseWriter, r *http.Request) {
	switch r.URL.Path[1] {
	case "homepage":

	case "app":
		loadApplication(r.URL.Path[len("/app/"):]);
	default:
		http.Redirect(w, r, "/homepage", 301);
	}
}

func loadMainPage() (*Page, error) {
	html, err := ioutil.ReadFile("./homepage.html");
	if err != nil {
		return nil, err;
	}
	return &Page{Title: title, Body: html}, nil;
}

func loadPage(title string) *Page {

}

func loadApplication(title string) {

}
