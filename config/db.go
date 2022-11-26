package config

import (
	"fmt"

	"github.com/kohbanye/ultra-todo/model"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init() {
	c := viper.New()
	c.SetConfigName("config")
	c.SetConfigType("yaml")
	c.AddConfigPath(".")
	c.AddConfigPath("./config")

	err := c.ReadInConfig()
	if err != nil {
		panic(err)
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		c.GetString("db.username"),
		c.GetString("db.password"),
		c.GetString("db.host"),
		c.GetString("db.port"),
		c.GetString("db.name"),
	)
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&model.Task{})
	if err != nil {
		panic(err)
	}
}

func GetDB() *gorm.DB {
	return db
}

func CloseDB() {
	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	err = sqlDB.Close()
	if err != nil {
		panic(err)
	}
}
