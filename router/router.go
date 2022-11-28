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
	}

	return r
}
