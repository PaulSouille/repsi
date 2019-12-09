FROM golang:latest
RUN go version

COPY . /app/go
WORKDIR /app/go/src
RUN set -x && \
    go get github.com/golang/dep/cmd/dep && \
    go get -d && \
    go build -o main .

CMD [ "./main" ]