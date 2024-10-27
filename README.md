# Next.js + Go backend Todo App with OpenAPI

Next.js をフロントエンド、Go をバックエンドにし、OpenAPI で API を定義しコードジェネレーターを用いて通信を行うサンプルアプリケーション。

## Go backend

```bash
cd backend
go run . seed
go run . serve
```

## Next.js frontend

```bash
cd frontend
npm run dev
```

Go バックエンド側にリバースプロキシを有効にしてあるので、以下のアドレスでアクセスできる。

- http://localhost:8000

## OpenAPI Code Generator

### Backend

- [oapi-codegen](https://github.com/oapi-codegen/oapi-codegen)

`main.go`の上部に`go:generate`が記載されているので、以下で生成できる。

```bash
cd backend
go generate
```

### Frontend

- [OpenAPI TypeScript](https://openapi-ts.dev/)

`package.json`に`apigen`として記載されているので、以下で生成できる。

```bash
cd frontend
npm run apigen
```
