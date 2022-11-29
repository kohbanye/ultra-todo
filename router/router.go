package router

import (
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/controller"
)

func Init(r *gin.Engine) *gin.Engine {
	authMiddleware, err := controller.AuthMiddleware()
	if err != nil {
		panic(err)
	}

	r.POST("/login", authMiddleware.LoginHandler)
	r.POST("/register", controller.CreateUser())

	auth := r.Group("/auth")
	auth.GET("/refresh_token", authMiddleware.RefreshHandler)
	auth.Use(authMiddleware.MiddlewareFunc())
	{
		auth.GET("/tasks/:id", controller.GetTask())
		auth.POST("/tasks", controller.CreateTask())
		auth.PUT("/tasks/:id", controller.UpdateTask())
		auth.DELETE("/tasks/:id", controller.DeleteTask())
		auth.GET("/tasks", controller.GetTasks())
		auth.PUT("/tasks/:id/done", controller.DoneTask())
	}

	return r
}
