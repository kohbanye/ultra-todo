package controller

import (
	"fmt"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/config"
	"github.com/kohbanye/ultra-todo/model"
	"golang.org/x/crypto/bcrypt"
)

type UserResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()

		var userRequest model.UserRequest
		err := c.BindJSON(&userRequest)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		var user model.User
		user.Username = userRequest.Username

		hashed, err := bcrypt.GenerateFromPassword([]byte(userRequest.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}
		user.Password = string(hashed)

		err = db.First(&user, "username = ?", user.Username).Error
		if err == nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("User '%s' already exists", user.Username),
			})

			c.Abort()
			return
		}

		err = db.Create(&user).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("User '%s' created", user.Username),
		})
	}
}

func GetUserMe() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		id := jwt.ExtractClaims(c)["id"].(float64)

		var user model.User
		err := db.First(&user, id).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": UserResponse{
				ID:       user.ID,
				Username: user.Username,
			},
		})
	}
}
