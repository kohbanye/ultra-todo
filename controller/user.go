package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/config"
	"github.com/kohbanye/ultra-todo/model"
	"golang.org/x/crypto/bcrypt"
)

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
		}
		user.Password = string(hashed)

		err = db.Create(&user).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("User %s created", user.Username),
		})
	}
}
