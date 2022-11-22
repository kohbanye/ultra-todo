package main

import (
	"github.com/kohbanye/ultra-todo/config"
	"github.com/kohbanye/ultra-todo/router"
)

func main() {
	r := router.Init()
	config.Init()

	r.Run()

	config.CloseDB()
}
