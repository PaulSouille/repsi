package json

type JsonRequest struct {
	ID   string `json:"id" db:"id"`
	Mail string `json:"mail" db:"mail"`
}

type JsonResponse struct {
	StatusCode string `json:"id"`
	Error      string `json:"id"`
}
