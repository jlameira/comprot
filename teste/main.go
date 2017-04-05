package main

import "fmt"

type PROCESS struct {
	Processos string `json:"processos" binding:"required"`
}

type Person struct {
	FirstName string `json:"firstName"`
}

type User struct {
	Person
	// other User-specific fields
}

type Admin struct {
	Person
	// other Admin-specific fields
}

func Harass(p Person) {}

func main() {
	user := User{Person{"Frank"}}
	Harass(user.Person)
	fmt.Println(user.Person)
	admin := Admin{Person{"Angelina"}}
	Harass(admin.Person)
	fmt.Println(admin.Person)
	processos := PROCESS{"processo1:pppppp"}
	fmt.Println(processos.Processos)
}
