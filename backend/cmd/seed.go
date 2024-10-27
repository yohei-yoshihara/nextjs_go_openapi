package cmd

import (
	"database/sql"
	"os"
	"strconv"

	"github.com/spf13/cobra"

	_ "github.com/mattn/go-sqlite3"
)

// seedCmd represents the seed command
var seedCmd = &cobra.Command{
	Use:   "seed",
	Short: "データベースへのデータ登録",
	Run: func(cmd *cobra.Command, args []string) {
		RunSeed()
	},
}

func init() {
	rootCmd.AddCommand(seedCmd)
}

func RunSeed() {
	os.Remove("./database.db")

	db, err := sql.Open("sqlite3", "./database.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec(`
	create table tasks (
	  id integer primary key autoincrement,
		title text not null,
		description text not null
	)
	`)
	if err != nil {
		panic(err)
	}

	stmt, err := db.Prepare("insert into tasks(title, description) values(?, ?)")
	if err != nil {
		panic(err)
	}
	taskNames := []string{}
	for i := 0; i < 20; i++ {
		taskNames = append(taskNames, "Task "+strconv.Itoa(i))
	}
	for _, taskName := range taskNames {
		_, err = stmt.Exec(taskName, taskName+"'s description")
		if err != nil {
			panic(err)
		}
	}

}
