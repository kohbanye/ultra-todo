package router

import (
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/controller"
)

func Init() *gin.Engine {
	r := gin.Default()

	r.GET("/tasks/:id", controller.GetTask())
	r.POST("/tasks", controller.CreateTask())
	r.PUT("/tasks/:id", controller.UpdateTask())
	r.DELETE("/tasks/:id", controller.DeleteTask())
	r.GET("/tasks", controller.GetTasks())

	return r
}
