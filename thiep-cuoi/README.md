# Thiệp cưới online - Hoàng Anh & Thu Ngân (mẫu phong bì sáp)

Trang tĩnh, không cần build: `index.html` + thư mục `images/`.

## Deploy

- **Netlify Drop** (nhanh nhất): vào app.netlify.com/drop, kéo cả thư mục này vào là có link. Đổi tên site trong Site settings cho link đẹp.
- **Vercel** hoặc **GitHub Pages** cũng dùng được, chỉ cần đưa nguyên thư mục lên.

## Link riêng cho từng khách

Thêm `?to=` vào cuối link, tên viết có dấu bình thường:

```
https://<link-thiep>/?to=Bạn Minh & gia đình
```

Tạo hàng loạt bằng Google Sheets (cột A là tên khách):

```
="https://<link-thiep>/?to="&ENCODEURL(A2)
```

Không có `?to=` thì thiệp hiện "Bạn & gia đình" (sửa ở `CONFIG.defaultGuest`).

## Nhận xác nhận tham dự vào Google Sheet

1. Làm theo hướng dẫn ở đầu file `rsvp-google-sheet.gs`.
2. Dán Web app URL vào `CONFIG.rsvpEndpoint` trong `index.html`.

Chưa có URL thì form vẫn chạy (hiện popup cảm ơn) nhưng dữ liệu chỉ nằm trên máy khách.

## Sửa thông tin

- Khối `CONFIG` đầu thẻ `<script>`: giờ đếm ngược, khách mặc định, link RSVP, bản đồ.
- Chữ trên thiệp (tên bố mẹ, địa chỉ, timeline, dress code) sửa thẳng trong HTML.
- Bản đồ là hình vẽ cùng tông màu thiệp, bấm vào mở Google Maps. Muốn dùng bản đồ Google thật thì đổi `mapEmbed` thành `true`.

## Ảnh xem trước khi gửi qua Zalo/Messenger

Sau khi có link, sửa dòng `og:image` trong `<head>` thành link đầy đủ, ví dụ `https://<link-thiep>/images/p13.jpg`.
