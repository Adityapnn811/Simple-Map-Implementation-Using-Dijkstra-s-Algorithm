package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files (Note: It will look for index.html under the frontend/ folder)
	// Argumen pertama adalah route nya (untuk Serve)
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	// Route untuk web hanya ada dua, retrieve txt dan hitung dijkstra
	api.POST("/getGraph", getGraphHandler)
	api.POST("/countDijkstra", countDijkstraHandler)

	dijkstra()
	// Start and run the server
	router.Run("localhost:3000")
}

func getGraphHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "getGraph",
	})
}

func countDijkstraHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "countDijkstra",
	})
}
