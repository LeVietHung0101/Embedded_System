---
title: AES
parent: Encryption
nav_order: 3
---

<h1>Advanced Encryption Standard (AES)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Tính Khuếch tán (Diffusion) trong AES

Mô hình mật mã hóa AES (Rijndael) dựa trên nguyên lý **Mạng thay thế - hoán vị (Substitution-Permutation Network - SPN)** của Claude Shannon, với hai đặc tính bảo mật cốt lõi: **Hỗn loạn (Confusion)** và **Khuếch tán (Diffusion)**.

* **Hỗn loạn (Confusion):** Làm phức tạp mối quan hệ giữa bản rõ (Plaintext), bản mã (Ciphertext) và Khóa bí mật (Key). Nhiệm vụ này do bước **SubBytes** đảm nhậm thông qua các hộp thế S-Box phi tuyến.
* **Khuếch tán (Diffusion):** Lan truyền sự thay đổi của một vị trí dữ liệu ra toàn bộ bản mã, giúp giấu đi các đặc trưng thống kê của bản rõ. Nhiệm vụ này được chia đảm nhiệm bởi hai bước tuyến tính: **ShiftRows** và **MixColumns**.

---

### Cách ShiftRows và MixColumns phối hợp tạo nên tính Khuếch tán

Việc nói **MixColumns kết hợp với ShiftRows là nguồn khuếch tán chính** xuất phát từ cơ chế phối hợp hai chiều (Ngang - Dọc) trong ma trận trạng thái State $4 \times 4$:

#### 1. ShiftRows: Khuếch tán theo chiều ngang (Inter-column Diffusion)

* Trong ma trận State, mỗi cột chứa 4 byte. Nếu không có ShiftRows, các phép toán MixColumns sau đó sẽ chỉ tác động độc lập trên từng cột riêng biệt mà không có sự trao đổi dữ liệu giữa các cột.
* `ShiftRows` thực hiện dịch chuyển xoay vòng các hàng (Hàng 0 giữ nguyên, Hàng 1 dịch trái 1 byte, Hàng 2 dịch 2, Hàng 3 dịch 3). Hành động này **phát tán các byte từ cùng một cột ra 4 cột khác nhau**.

#### 2. MixColumns: Khuếch tán theo chiều dọc (Intra-column Diffusion)

* `MixColumns` nhân từng cột của ma trận State với một đa thức cố định trong trường Galois $GF(2^8)$.
* Phép nhân này có đặc tính là **mỗi byte đầu ra của cột là sự kết hợp toán học (XOR và nhân Galois) của cả 4 byte đầu vào trong cột đó**.
* **Thuộc tính Branch Number = 5:** Hàm $MixColumns$ đạt tiêu chuẩn Maximum Distance Separable (MDS). Điều này bảo đảm rằng nếu có $k$ byte ở đầu vào thay đổi, tổng số byte thay đổi ở cả đầu vào và đầu ra sẽ luôn lớn hơn hoặc bằng 5 ($k_{in} + k_{out} \ge 5$). Nói cách khác, chỉ cần đổi **1 byte** đầu vào, **cả 4 byte** của cột đầu ra đều sẽ thay đổi hoàn toàn.

---

### Hiệu ứng Thác (Avalanche Effect) qua nhiều vòng

Sự kết hợp giữa ShiftRows và MixColumns tạo ra hiệu ứng domino khuếch tán cực kỳ mạnh mẽ qua các vòng mã hóa (Rounds):

```text
[1 Byte đổi] ──(SubBytes)──> [1 Byte đổi]
             ──(ShiftRows)─> [1 Byte đổi ở 1 cột]
             ──(MixColumns)> [4 Bytes đổi ở 1 cột]  <-- Hết Round 1

             ──(ShiftRows)─> [4 Bytes phân tán ra 4 CỘT KHÁC NHAU]
             ──(MixColumns)> [16 Bytes thay đổi hoàn toàn] <-- Hết Round 2

```

* **Tại Round 1:** 1 byte bản rõ thay đổi $\rightarrow$ `MixColumns` biến nó thành 4 byte thay đổi trên 1 cột.
* **Sang Round 2:** `ShiftRows` tách 4 byte thay đổi này và đưa mỗi byte sang một cột khác nhau. Khi chạy qua `MixColumns` của Round 2, **toàn bộ 16 byte (100% ma trận State) đều bị thay đổi**.

---

### Tóm lại

Nếu thiếu một trong hai bước:

* Nếu **chỉ có MixColumns mà không có ShiftRows**: Dữ liệu chỉ xoay xở và khuếch tán nội bộ trong từng cột 4-byte riêng biệt. Mật mã bị phân mảnh thành 4 khối 32-bit độc lập, dễ bị tấn công chia để trị (Divide-and-Conquer).
* Nếu **chỉ có ShiftRows mà không có MixColumns**: Các byte chỉ thay đổi vị trí đơn thuần (hoán vị) mà giá trị của từng byte không tương tác với nhau.

Do đó, **ShiftRows đóng vai trò phân tán dữ liệu theo hàng ngang, còn MixColumns khuếch tán triệt để theo cột dọc**. Sự kết hợp đồng bộ này giúp AES đạt được hiệu ứng Thác hoàn chỉnh chỉ sau 2 vòng mã hóa.