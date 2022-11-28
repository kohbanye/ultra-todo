package controller

import (
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/kohbanye/ultra-todo/config"
	"github.com/kohbanye/ultra-todo/model"
	"golang.org/x/crypto/bcrypt"
)

func AuthMiddleware() (*jwt.GinJWTMiddleware, error) {
	return jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret"),
		Timeout:     24 * time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: "id",
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*model.User); ok {
				return jwt.MapClaims{
					"id": v.ID,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &model.User{
				ID: int(claims["id"].(float64)),
			}
		},
		Authenticator: login,
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		TokenLookup:   "header: Authorization, query: token, cookie: jwt",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	})
}

func login(c *gin.Context) (interface{}, error) {
	db := config.GetDB()

	var userRequest model.UserRequest
	err := c.BindJSON(&userRequest)
	if err != nil {
		return nil, jwt.ErrMissingLoginValues
	}

	var user model.User
	err = db.Find(&user, "username = ?", userRequest.Username).Error
	if err != nil {
		return nil, jwt.ErrFailedAuthentication
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userRequest.Password))
	if err != nil {
		return nil, jwt.ErrFailedAuthentication
	}

	return &user, nil
}
