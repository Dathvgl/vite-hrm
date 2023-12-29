# Tên dự án : HRM Management
Đây là trang web quản lý nhân sự cơ bản.

## Trạng Thái Dự Án
Hiện tại, dự án đang trong giai đoạn phát triển và có nhiều thiếu sót mong mọi người có thể góp ý thêm ạ.

## Công Nghệ
- NodeJS [Link chi tiết database](https://github.com/Dathvgl/node-hrm)
- Database
  - Firebase (authentication)
  - Mongodb
- ReactJS
  - Ant Design
  - Tailwind
  - Redux Toolkit - RTK Query

## Tính Năng Chính
- Đăng nhập và phân quyền theo role.
- Role staff:
  - Xem nhân viên, công ty, phòng ban, chức vụ, lương, nghỉ phép.
  - Chấm công bản thân.
- Role admin:
  - Tất cả của role staff.
  - Tạo nhân viên, phòng ban, chức vụ, công ty, ngày nghỉ.
  - Cập nhật thông tin phòng ban, phân quyền, công ty - chấm công của nhân viên.
  - Xóa nhân viên.
- Role boss:
  - Tất cả của role staff.
  - Cập nhật nghỉ phép.

## Hướng Dẫn Cài Đặt
1. Clone dự án từ GitHub.
   - Code / Tải xuống
   - `git clone https://github.com/Dathvgl/vite-hrm`
2. Cài đặt các dependencies bằng lệnh `npm install` hoặc `npm install --force`.
3. Chạy ứng dụng với lệnh `npm start` hoặc `npm run dev`.

## Hướng Dẫn Sử Dụng
1. Sau khi chạy ứng dụng thì vào [Trang web](http://localhost:3000):
2. Đăng nhập tài khoản:
    - Tài khoản có sẵn
      - Boss
        - Email: boss@boss.com
        - Password: 123456
      - admin
        - Email: admin@admin.com
        - Password: 123456
    - Tài khoản user (email và password default: 123456)
      - Email: hantuyet@fs.com
      - Password: 123456
3. Hover vào icon user góc phải để hiện đăng xuất

## Liên Hệ
- Nếu bạn có bất kỳ câu hỏi hoặc phản hồi, hãy liên hệ tôi qua vnhthvgl@gmail.com
