package controller

import (
	"net/http"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/config"
	"github.com/kohbanye/ultra-todo/model"
)

func GetTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		id := c.Param("id")

		var task model.Task
		err := db.First(&task, id).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": task,
		})
	}
}

func GetTasks() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		userID := jwt.ExtractClaims(c)["id"].(float64)

		var tasks []model.Task
		err := db.Find(&tasks, "user_id = ?", userID).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": tasks,
		})
	}
}

func CreateTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		userID := jwt.ExtractClaims(c)["id"].(float64)

		var task model.Task
		err := c.BindJSON(&task)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		var user model.User
		err = db.First(&user, userID).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		task.UserID = int(userID)
		task.CreatedBy = user
		task.CreatedAt = time.Now()
		task.UpdatedAt = time.Now()

		err = db.Create(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": task,
		})
	}
}

func UpdateTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		id := c.Param("id")

		var task model.Task
		err := db.First(&task, id).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		createdAt := task.CreatedAt

		err = c.BindJSON(&task)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		task.CreatedAt = createdAt
		task.UpdatedAt = time.Now()

		err = db.Save(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": task,
		})
	}
}

func DeleteTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		id := c.Param("id")

		var task model.Task
		err := db.First(&task, id).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		err = db.Delete(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": task,
		})
	}
}

func DoneTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()
		id := c.Param("id")

		var task model.Task
		err := db.First(&task, id).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		task.Done = true
		task.UpdatedAt = time.Now()

		err = db.Save(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": task,
		})
	}
}
