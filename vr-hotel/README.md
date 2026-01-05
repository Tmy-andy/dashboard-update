# Link Hotel VR360 - Admin Dashboard

## Cấu trúc thư mục

```
admin/
├── index.html              # Dashboard chính
├── login.html              # Trang đăng nhập
├── introduction.html       # Quản lý giới thiệu
├── rooms.html              # Quản lý phòng nghỉ
├── dining.html             # Quản lý ẩm thực (cần tạo)
├── vouchers.html           # Quản lý ưu đãi (cần tạo)
├── facilities.html         # Quản lý tiện ích (cần tạo)
├── policies.html           # Quản lý chính sách (cần tạo)
├── rules.html              # Quản lý nội quy (cần tạo)
├── contact.html            # Quản lý liên hệ (cần tạo)
├── settings.html           # Cài đặt chung (cần tạo)
├── styles/
│   └── admin.css           # CSS chung cho tất cả trang
└── scripts/
    ├── rooms.js            # JavaScript cho trang rooms
    ├── dining.js           # (cần tạo)
    ├── vouchers.js         # (cần tạo)
    ├── facilities.js       # (cần tạo)
    └── common.js           # (cần tạo)
```

## Tính năng đã hoàn thành

### ✅ Trang Dashboard (index.html)
- Tổng quan thống kê
- Biểu đồ số liệu
- Hoạt động gần đây
- Quick actions

### ✅ Trang Đăng nhập (login.html)
- Form đăng nhập với validation
- Remember me
- Credentials demo: `admin` / `admin123`

### ✅ Trang Giới thiệu (introduction.html)
- Toggle on/off hiển thị
- Multi-language (VI/EN)
- Trường VR360 link
- Disable inputs khi toggle off

### ✅ Trang Phòng nghỉ (rooms.html)
- Quản lý danh sách phòng
- Thêm/sửa/xóa phòng
- VR360 link cho từng phòng
- Multi-language
- Toggle on/off cho từng phòng
- Tiện nghi phòng

## Tính năng chưa hoàn thành (cần tạo)

### 🔲 Trang Ẩm thực (dining.html)
Nên có:
- Toggle on/off mục ẩm thực
- Quản lý danh sách nhà hàng/khu vực ẩm thực
- VR360 link cho mỗi khu vực
- Menu/thực đơn
- Giờ phục vụ
- Multi-language

### 🔲 Trang Ưu đãi (vouchers.html)
Nên có:
- Toggle on/off mục ưu đãi
- Quản lý voucher/khuyến mãi
- Mã voucher
- % giảm giá
- Thời gian áp dụng
- Điều kiện sử dụng
- Multi-language

### 🔲 Trang Tiện ích (facilities.html)
Nên có:
- Toggle on/off mục tiện ích
- Danh sách tiện ích (pool, spa, gym, etc.)
- VR360 link cho mỗi tiện ích
- Giờ mở cửa
- Mô tả dịch vụ
- Multi-language

### 🔲 Trang Chính sách (policies.html)
Nên có:
- Toggle on/off mục chính sách
- Các loại chính sách:
  - Check-in/Check-out
  - Hủy phòng
  - Thanh toán
  - Trẻ em & giường phụ
- Multi-language
- Rich text editor

### 🔲 Trang Nội quy (rules.html)
Nên có:
- Toggle on/off mục nội quy
- Danh sách nội quy
- Icon cho từng quy định
- Multi-language
- Sắp xếp thứ tự

### 🔲 Trang Liên hệ (contact.html)
Nên có:
- Toggle on/off mục liên hệ
- Thông tin liên hệ:
  - Địa chỉ
  - Số điện thoại
  - Email
  - Giờ làm việc
- VR360 link (location view)
- Google Maps integration
- Social media links

### 🔲 Trang Settings (settings.html)
Nên có:
- Tên khách sạn
- Logo upload
- Ngôn ngữ mặc định
- Theme colors
- SEO settings
- Analytics integration

## Hướng dẫn sử dụng

1. **Đăng nhập**: Truy cập `admin/login.html`
   - Username: `admin`
   - Password: `admin123`

2. **Quản lý nội dung**: Mỗi trang có:
   - Toggle on/off để hiển thị/ẩn mục trên trang web
   - Khi toggle off, tất cả input sẽ bị disable
   - Form multi-language (Tiếng Việt & English)
   - Trường VR360 link để nhập panorama 360°

3. **Lưu thay đổi**: Click "Lưu thay đổi" để cập nhật
   - Hiện tại chỉ lưu vào localStorage
   - Cần kết nối API backend để lưu vào database

## Công nghệ sử dụng

- HTML5
- CSS3 (Custom styling, no framework)
- JavaScript (Vanilla JS, no dependencies)
- Font Awesome 6.4 (Icons)
- LocalStorage (Temporary data storage)

## Cấu trúc chung của mỗi trang

Mỗi trang admin đều có:
1. **Sidebar**: Menu điều hướng cố định bên trái
2. **Header**: Tiêu đề trang và thông tin user
3. **Main Content**: Nội dung chính
   - Status Card: Toggle on/off hiển thị
   - Content Card: Form nhập liệu
   - VR360 Settings: Cài đặt VR tour
4. **Action Buttons**: Lưu/Hủy thay đổi

## Responsive Design

- Desktop: Full sidebar + content
- Tablet: Sidebar collapse, icon only
- Mobile: Hamburger menu

## TODO

- [ ] Tạo các trang còn lại (dining, vouchers, facilities, policies, rules, contact, settings)
- [ ] Kết nối API backend
- [ ] Upload ảnh/file manager
- [ ] Rich text editor cho nội dung dài
- [ ] VR360 viewer preview integrated
- [ ] Analytics dashboard
- [ ] User management
- [ ] Backup/Export data

## Liên hệ

Nếu cần hỗ trợ thêm, vui lòng liên hệ admin.
