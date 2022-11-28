package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/controller"
)

func Init() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	r.GET("/tasks/:id", controller.GetTask())
	r.POST("/tasks", controller.CreateTask())
	r.PUT("/tasks/:id", controller.UpdateTask())
	r.DELETE("/tasks/:id", controller.DeleteTask())
	r.GET("/tasks", controller.GetTasks())

	return r
}
