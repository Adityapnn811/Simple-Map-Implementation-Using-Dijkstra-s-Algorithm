package main

import (
	"fmt"
	"math"
)

// Fungsi mereturn indeks minimal dari array
func findMinIndex(jarak []float64, visited []bool) int {
	min := math.MaxFloat64
	index := 0
	for i := 0; i < len(jarak); i++ {
		if jarak[i] < min && !visited[i] {
			min = jarak[i]
			index = i
		}
	}
	return index
}

// Akan return array of int, dimana nilai ke-i dari array adalah jarak terdekat dari initial ke node tujuan
func dijkstra(jmlNode int, matriksRelasi [][]int, initial int, destination int) ([]float64, [][]int) {

	jarak := make([]float64, jmlNode)
	path := make([][]int, jmlNode)
	// set jarak selain initial ke infinite
	for i := 0; i < jmlNode; i++ {
		jarak[i] = math.Inf(1)
	}
	// Set jarak dari initial ke initial 0
	jarak[initial] = 0

	// visited
	visited := make([]bool, jmlNode)
	var minIndex int = initial
	// iterasi sebanyak jmlNode
	for i := 0; i < jmlNode; i++ {
		// cari node yang jaraknya terdekat dari initial
		minIndex = findMinIndex(jarak, visited)
		visited[minIndex] = true
		for j := 0; j < jmlNode; j++ {
			// jika jarak dari initial ke node j lebih kecil dari jarak dari initial ke node i
			fmt.Println(visited)
			if jarak[j] > jarak[minIndex]+float64(matriksRelasi[minIndex][j]) && matriksRelasi[minIndex][j] >= 0 && !visited[j] {
				// set jarak dari initial ke node j
				jarak[j] = jarak[minIndex] + float64(matriksRelasi[minIndex][j])
				// set path dari initial ke node j
				path[j] = append(path[j], minIndex)
			}
		}
	}

	// Bersihin data dari +Inf
	for i := 0; i < jmlNode; i++ {
		if jarak[i] == math.Inf(1) {
			jarak[i] = -1
		}
	}
	fmt.Println("Im calling dijkstra")
	return jarak, path
}
