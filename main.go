package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		//log.Fatal("$PORT must be set")
		port = "8080"
	}

	router := gin.Default()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})
	router.POST("/pesquisaCPNJ", func(c *gin.Context) {
		x, _ := ioutil.ReadAll(c.Request.Body)
		var data []Processos
	
		json.Unmarshal(x, &data)
		//	fmt.Printf("Results: %v\n", data)
			var novoData []Processos
		for i, v := range data {
		

				var size = 0
				numero := v.NumeroProcessoPrincipal

				url := "https://comprot.fazenda.gov.br/comprotegov/api/processo/" + numero
				tr := &http.Transport{
					TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
				}
				client := &http.Client{Transport: tr}
				req, err := http.NewRequest("GET", url, nil)
				if err != nil {
					log.Print(err)
					os.Exit(1)
				}
				res, _ := client.Do(req)

				body, _ := ioutil.ReadAll(res.Body)
				// fmt.Printf("Results: %v\n", string(body))
				var movimentacao Movimentacao
				json.Unmarshal(body, &movimentacao)
				for i := range movimentacao.Movimentos {
					size += i
				}
				if size > 0 {

					// ultimoMovimento := Movimentos{}
					// ultimoMovimento = movimentacao.Movimentos[0]

					data[i].Movimentos = append(data[i].Movimentos, movimentacao.Movimentos[0])
					data[i].Movimentos = append(data[i].Movimentos, movimentacao.Movimentos[1])
					fmt.Printf("Results: %v\n", movimentacao.Movimentos[0])

				}
			novoData = append(novoData,data[i])
		

		}

		c.JSON(http.StatusOK, gin.H{"response": novoData})
	})
	router.GET("/pesquisaCPNJ", func(c *gin.Context) {
		c.HTML(http.StatusOK, "consulta.tmpl.html", nil)
	})

	router.Run(":" + port)
}
