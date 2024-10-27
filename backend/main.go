//go:generate mkdir -p api
//go:generate oapi-codegen -config api/cfg.yaml todo.yaml
package main

import "github.com/yohei-yoshihara/nextjs_todo_openapi/backend/cmd"

func main() {
	cmd.Execute()
}
