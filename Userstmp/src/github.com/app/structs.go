package app

import "time"

type User struct {
	Firstname string    `json:"Firstname" db:"Firstname"`
	Lastname  string    `json:"Lastname" db:"Lastname"`
	Mail      string    `json:"Mail" db:"Mail"`
	Birthday  time.Time `json:"Birth" db:"Birth"`
	Country   string    `json:"Country" db:"Country"`
	Language  string    `json:"Language" db:"Language"`
	Metadata  Metadata  `json:"Metadata" db:"Metadata"`
}

type Metadata struct {
	LastLoggedAt time.Time `json:"LastLoggedAt" db:"LastLoggedAt"`
	LastPostedAt time.Time `json:"LastPostedAt" db:"LastPostedAt"`
	SignedUpAt   time.Time `json:"SignedUpAt" db:"SignedUpAt"`
	CreatedAt    time.Time `json:"CreatedAt" db:"CreatedAt"`
	UpdatedAt    time.Time `json:"UpdatedAt" db:"UpdatedAt"`
}
