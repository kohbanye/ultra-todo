package router

import (
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/controller"
)

func Init() *gin.Engine {
	r := gin.Default()

	r.GET("/task/:id", controller.GetTask())
	r.POST("/task", controller.CreateTask())
	r.PUT("/task/:id", controller.UpdateTask())
	r.DELETE("/task/:id", controller.DeleteTask())

	return r
}
