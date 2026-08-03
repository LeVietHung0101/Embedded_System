---
title: Hardware accelerator
parent: HSM
nav_order: 2
---

<h1>Hardware accelerator</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Tổng quan

**Hardware accelerator** là khối phần cứng chuyên dụng được thiết kế để thực hiện một loại phép tính cụ thể nhanh hơn và hiệu quả hơn so với CPU chính.

Đối với HSM, accelerator thường là các **cryptographic accelerator**, tức là các mạch phần cứng chuyên thực hiện các thuật toán mã hóa.

<table class="hover-table">
  <thead>
    <tr>
      <th>Accelerator</th>
      <th>Chức năng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AES Accelerator</td>
      <td>Thực hiện mã hóa/giải mã AES.</td>
    </tr>
    <tr>
      <td>SHA Accelerator</td>
      <td>Tính hàm băm SHA-256, SHA-512,...</td>
    </tr>
    <tr>
      <td>RSA Accelerator</td>
      <td>Tăng tốc các phép toán RSA.</td>
    </tr>
    <tr>
      <td>ECC Accelerator</td>
      <td>Tăng tốc các phép toán Elliptic Curve Cryptography (ECC).</td>
    </tr>
    <tr>
      <td>TRNG</td>
      <td>Bộ sinh số ngẫu nhiên phần cứng (không phải là accelerator theo nghĩa truyền thống nhưng thường được tích hợp như một thành phần hỗ trợ HSM).</td>
    </tr>
  </tbody>
</table>

---

# Tại sao cần Hardware accelerator?

Giả sử phải mã hóa một khối dữ liệu 1 MB bằng AES:

<table class="hover-table">
  <thead>
    <tr>
      <th>Software Implementation (CPU)</th>
      <th>Hardware Implementation (AES Accelerator)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>Thực thi hàng nghìn lệnh để hoàn thành thuật toán <b>AES</b>.</li>
          <li>Chiếm nhiều chu kỳ <b>CPU</b>.</li>
          <li><b>CPU</b> không thể tập trung xử lý các tác vụ khác.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Dữ liệu được gửi đến <b>AES accelerator</b>.</li>
          <li><b>AES accelerator</b> thực hiện toàn bộ thuật toán <b>AES</b> bằng phần cứng chuyên dụng.</li>
          <li><b>CPU</b> chỉ cần khởi tạo, chờ hoàn thành và nhận kết quả.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Lợi ích đạt được:
- Tốc độ xử lý nhanh hơn đáng kể.
- Giảm tải cho CPU.
- Tiêu thụ năng lượng thấp hơn.
- Có khả năng chống một số kiểu tấn công kênh kề (side-channel attack) tốt hơn so với cài đặt thuần phần mềm.

---

# Tích hợp Hardware accelerator trong HSM

HSM trên dòng Infineon AURIX TC3xx tích hợp nhiều accelerator như:
- AES
- SHA
- CMAC
- HMAC
- ECC
- TRNG

Khi Crypto Driver trong AUTOSAR nhận yêu cầu mã hóa, nó có thể chuyển tác vụ sang HSM. HSM sẽ sử dụng accelerator tương ứng (ví dụ AES Accelerator) để xử lý, sau đó trả kết quả về cho ứng dụng.