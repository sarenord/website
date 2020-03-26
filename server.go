package main

import (
	"log"
	"net/http"
	"strings"
)

func main() {
	http.HandleFunc("/", pageRouter)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func pageRouter(w http.ResponseWriter, r *http.Request) {
	resourcePath := strings.Split(r.URL.Path, "/")
	var p PageBlueprint = fromName(resourcePath[len(resourcePath)-1])
	p.assemble(w);
}
