package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

var jmlNode int
var namaNode = make(map[string]int)
var relasiMatriks [][]int
var info IsiTxt

type IsiTxt struct {
	Isi string `json:"isiTxt"`
}

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	router.Use(cors.Default())
	// Serve frontend static files (Note: It will look for index.html under the frontend/ folder)
	// Argumen pertama adalah route nya (untuk Serve)
	router.Use(static.Serve("/", static.LocalFile("./views/build", true)))

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

	// dijkstra()
	// Start and run the server
	router.Run("localhost:3000")
}

func getGraphHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	decoder := json.NewDecoder(c.Request.Body)
	var isiTxt IsiTxt
	err := decoder.Decode(&isiTxt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Error",
		})
		return
	}
	// res := strings.Split(string(isiTxt.Isi), "\n")
	// fmt.Println(res)
	// // log.Println(isiTxt.Isi[1])
	// send to front end
	// Parse
	info = isiTxt
	res := strings.Split(string(isiTxt.Isi), "\r\n")
	jmlNode, _ = strconv.Atoi(res[0])
	fmt.Println("Hasil ATOI: ", jmlNode)
	for i := 1; i <= jmlNode; i++ {
		namaNode[res[i]] = i - 1
	}
	fmt.Println("Nama Node: ", namaNode)
	var row int = 0
	relasiMatriks = make([][]int, jmlNode)
	for i := jmlNode + 1; i < len(res); i++ {
		relasiMatriks[row] = make([]int, jmlNode)
		relasi := strings.Split(res[i], " ")
		for j := 0; j < len(relasi); j++ {
			relasiMatriks[row][j], _ = strconv.Atoi(relasi[j])
		}
		row++
	}
	fmt.Println("Relasi Matriks: ", relasiMatriks)
	// for i := 0; i < len(res); i++ {
	// 	println(string(res[i]))
	// }
	fmt.Print(info.Isi)
	c.JSON(http.StatusOK, gin.H{
		"jmlNode":  jmlNode,
		"namaNode": namaNode,
	})
}

func countDijkstraHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "countDijkstra",
	})
}
