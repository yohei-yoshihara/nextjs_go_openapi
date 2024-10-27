package api

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var _ ServerInterface = (*Server)(nil)

type Server struct {
	db        *sql.DB
	waitValue time.Duration
}

func NewServer(db *sql.DB, waitValue time.Duration) Server {
	return Server{db: db, waitValue: waitValue}
}

func sendError(w http.ResponseWriter, code int, message string) {
	petErr := Error{
		Code:    int32(code),
		Message: message,
	}
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(petErr)
}

func (server Server) GetTasks(w http.ResponseWriter, r *http.Request) {
	time.Sleep(server.waitValue * time.Second)

	db := server.db

	tasks := []Task{}

	rows, err := db.Query("select id, title, description from tasks")
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to create a query")
	}
	defer rows.Close()

	var id int64
	var title string
	var description string
	for rows.Next() {
		if err := rows.Scan(&id, &title, &description); err != nil {
			sendError(w, http.StatusInternalServerError, "Failed to get a record from database")
		}
		tasks = append(tasks, Task{
			Id:          id,
			Title:       title,
			Description: description,
		})
	}

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(tasks)
}

func (server Server) CreateTask(w http.ResponseWriter, r *http.Request) {
	time.Sleep(server.waitValue * time.Second)

	var newTask NewTask
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid format for NewTask")
		return
	}

	db := server.db

	stmt, err := db.Prepare("insert into tasks(title, description) values(?, ?)")
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to create a statement")
		return
	}

	result, err := stmt.Exec(newTask.Title, newTask.Description)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to insert a new task")
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to get ID")
		return
	}

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(Task{
		Id:          id,
		Title:       newTask.Title,
		Description: newTask.Description,
	})
}

func (server Server) GetTask(w http.ResponseWriter, r *http.Request, id TaskIdParameter) {
	time.Sleep(server.waitValue * time.Second)

	db := server.db
	row := db.QueryRow("select title, description from tasks where id = ?", id)
	if row == nil {
		sendError(w, http.StatusNotFound, "Could not find a task")
		return
	}

	var title string
	var description string
	if err := row.Scan(&title, &description); err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to get user data")
		return
	}

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(Task{
		Id:          id,
		Title:       title,
		Description: description,
	})
}

func (server Server) UpdateTask(w http.ResponseWriter, r *http.Request, id TaskIdParameter) {
	time.Sleep(server.waitValue * time.Second)

	var newTask NewTask
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid format for NewTask")
		return
	}

	db := server.db
	_, err := db.Exec("update tasks set title=?, description=? where id=?", newTask.Title, newTask.Description, id)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to update task data")
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (server Server) DeleteTask(w http.ResponseWriter, r *http.Request, id TaskIdParameter) {
	time.Sleep(server.waitValue * time.Second)

	db := server.db

	_, err := db.Exec("delete from tasks where id=?", id)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to delete task data")
		return
	}

	w.WriteHeader(http.StatusOK)
}
