### NODEJS PRO
### push code github 
git add .
git commit -m "comment"
git push origin master

### Sau khi thay prisma schema, cần làm 2 việc:
### Generate phần code typescript: 
npx prisma generate
### (cần tắt dự án trước khi chạy câu lệnh trên)

### Cập nhật database: 
npx prisma migrate dev
	
### sử dụng câu lệnh này để tạo migration mà không thực thi câu lệnh sql:
npx prisma migrate dev --create-only



### image-not-found.png 