package controller

import (
	"net/http"
	"time"

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
		}

		c.JSON(http.StatusOK, gin.H{
			"task": task,
		})
	}
}

func GetTasks() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()

		var tasks []model.Task
		err := db.Find(&tasks).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"tasks": tasks,
		})
	}
}

func CreateTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		db := config.GetDB()

		var task model.Task
		err := c.BindJSON(&task)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}

		task.CreatedAt = time.Now()
		task.UpdatedAt = time.Now()

		err = db.Create(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"task": task,
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
		}

		createdAt := task.CreatedAt

		err = c.BindJSON(&task)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}

		task.CreatedAt = createdAt
		task.UpdatedAt = time.Now()

		err = db.Save(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"task": task,
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
		}

		err = db.Delete(&task).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"task": task,
		})
	}
}
