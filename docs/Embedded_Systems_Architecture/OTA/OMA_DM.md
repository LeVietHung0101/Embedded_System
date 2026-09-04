---
title: OMA DM
parent: OTA
nav_order: 2
---

<h1>Open Mobile Alliance Device Management (OMA DM)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. OMA DM là gì?

**Open Mobile Alliance Device Management (OMA DM)** là một tiêu chuẩn quản lý thiết bị di động phổ biến. Tiêu chuẩn này được sử dụng để quản lý thông tin, chẩn đoán, cấu hình, phiên bản và thực hiện cập nhật phần mềm/firmware từ xa cho các thiết bị di động (như điện thoại thông minh, máy tính bảng).

Cách thức hoạt động và đặc điểm chính:

- **Cấu trúc DM Tree**: OMA DM định nghĩa thông tin quản lý (management objects) dưới dạng một cây dữ liệu gọi là "DM tree". Các đối tượng quản lý này có thể là cài đặt biến môi trường hoặc các firmware images.

- **Mô hình Server-Client:** Việc quản lý được thực hiện từ xa (ví dụ: qua kết nối không dây/WLAN) thông qua tương tác giữa **OMA DM Server** và các **Management Agent** trên thiết bị bằng OMA DM protocol.

- **Hỗ trợ OTA:** Tiêu chuẩn này cho phép đồng bộ hóa dữ liệu và cập nhật phần mềm qua mạng (Over-the-Air - OTA) một cách hiệu quả.

- **Ứng dụng thực tế & Automotive:** OMA DM được hỗ trợ bởi hầu hết các nhà sản xuất điện thoại thông minh. Mặc dù một số yêu cầu khắt khe của ngành ô tô (như cấp độ an toàn cao hơn, phân bố chức năng qua hàng chục ECU) chưa nằm trong tiêu chuẩn gốc của OMA DM, nhiều khía cạnh và nguyên lý của OMA DM vẫn được ứng dụng và chuyển giao sang lĩnh vực cập nhật phần mềm ô tô (Software Over The Air - SOTA).

---

# Tham khảo

[1] [Houssem Guissouma, Axel Diewald and Eric Sax, "A Generic System for Automotive Software Over The Air (SOTA) Updates Allowing Efficient Variant and Release Management"](https://publikationen.bibliothek.kit.edu/1000085665/55661574)
