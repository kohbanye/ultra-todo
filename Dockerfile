FROM golang:1.19.3-alpine

WORKDIR /github.com/kohbanye/ultra-todo

COPY ./go.* ./
RUN go mod download

COPY . .

RUN go build -o /ultra-todo

EXPOSE 8000

CMD [ "/ultra-todo" ]
