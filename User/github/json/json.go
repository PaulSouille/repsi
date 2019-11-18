package json

type JsonRequest struct {
	ID   string `json:"id" db:"id"`
	Mail string `json:"mail" db:"mail"`
}

type JsonResponse struct {
	Status  string `json:"id"`
	Message string `json:"id"`
}
