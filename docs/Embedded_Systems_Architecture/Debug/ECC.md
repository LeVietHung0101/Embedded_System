---
title: ECC
parent: Debug
nav_order: 3
---

<h1>Error Correction Code (ECC)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

# 1.1. ECC là gì?

{: .note}
> **Error-Correcting Code (ECC)** là phương pháp phát hiện và sửa lỗi trong truyền hoặc lưu trữ dữ liệu. Nó thêm các bit dư thừa (redundant bits) vào dữ liệu gốc, giúp xác định và sửa lỗi, đảm bảo tính toàn vẹn của dữ liệu (data integrity). Bên nhận dữ liệu sẽ so sánh dữ liệu nhận được với redundant bits để phát hiện và sửa lỗi do noise, interference hoặc các yếu tố khác. 

ECC hiệu quả trong sửa **single-bit errors** (một bit bị đảo do noise hoặc interference). Một số thuật toán cũng sửa được một số **multi-bit errors**, tùy thiết kế. ECC không sửa được mọi loại lỗi nếu vượt quá khả năng của thuật toán.

<details markdown="block">
<summary><i>Noise & Interference</i></summary>

> Noise: Nhiễu ngẫu nhiên (thường do nhiệt, điện từ trường môi trường) làm thay đổi tín hiệu, gây lỗi bit trong truyền hoặc lưu trữ dữ liệu.
> 
> Interference: Nhiễu do tín hiệu ngoài (từ thiết bị khác, sóng radiom,...) chồng lấn lên tín hiệu gốc, làm méo hoặc làm hỏng dữ liệu.
{: .codeBlock }
</details>

Các kỹ thuật phổ biến tạo redundant bits gồm parity checks, checksums, Hamming codes và Reed-Solomon codes, BCH codes. Chúng khác nhau về cách encode/decode dữ liệu và hiệu quả phát hiện/sửa lỗi. Lựa chọn phụ thuộc vào loại lỗi dự kiến và yêu cầu hệ thống.

ECC thường dùng trong **RAM** (Random Access Memory) của servers và high-performance workstations yêu cầu data integrity cao. ECC memory modules tích hợp tính năng sửa lỗi để phát hiện và sửa data corruption theo thời gian thực.

<details markdown="block">
<summary><i>High-performance workstations</i></summary>

> **High-performance workstations** là máy tính để bàn chuyên dụng, cấu hình mạnh (CPU, GPU, RAM cao), dùng cho các công việc đòi hỏi tính toán nặng như thiết kế 3D, mô phỏng kỹ thuật, xử lý dữ liệu lớn hoặc AI.
{: .codeBlock }
</details>

# 1.2. Lợi ích và hạn chế

Lợi ích:
- Tăng độ tin cậy của dữ liệu và tính ổn định của hệ thống.
- Ngăn nguy cơ hỏng dữ liệu, giảm nguy cơ hệ thống bị treo.
- Đảm bảo việc truyền tải và lưu trữ dữ liệu quan trọng một cách chính xác, duy trì tính liên tục và hiệu suất hoạt động.

Hạn chế:
- ECC làm tăng overhead trong việc truyền hoặc lưu trữ dữ liệu do các redundant bits được thêm vào dữ liệu gốc; gây ảnh hưởng nhẹ đến hiệu suất hệ thống.
- Vẫn có xác suất nhỏ ECC không phát hiện và sửa lỗi.

ECC đảm bảo giao tiếp tin cậy và tính toàn vẹn của dữ liệu trong các hệ thống quan trọng cần độ chính xác cao (như servers, networking equipment, storage devices, computer memory, communication protocols), nơi mà lỗi dữ liệu có thể gây lỗi hệ thống nghiêm trọng, dữ liệu bị xâm phạm hoặc mất.

Lưu ý: ECC giảm đáng kể khả năng xảy ra lỗi nhưng không loại bỏ hoàn toàn. Mức độ sửa lỗi phụ thuộc vào thuật toán cụ thể và loại lỗi. Chất lượng phần cứng và điều kiện môi trường cũng ảnh hưởng hiệu quả. ECC là công cụ hữu ích nâng cao độ tin cậy và tính toàn vẹn của dữ liệu nhưng không phải tuyệt đối.

---

## 2. ECC và các phương pháp phát hiện/sửa lỗi khác

**Parity checking** là phương pháp phát hiện lỗi đơn giản, dùng một parity bit nhưng không sửa được lỗi. ECC thêm nhiều bit dư thừa để vừa phát hiện vừa sửa lỗi, mang lại mức data integrity cao hơn.

---

# Tham khảo

[1] [Lenovo, "Understanding Error-Correcting Code Techniques"](https://www.lenovo.com/us/en/glossary/what-is-ecc/?orgRef=https%253A%252F%252Fwww.google.com%252F&srsltid=AU7gw4WCdWQze3g2arSwhp45L-9qTcAI74iCA_EZ5kg6cDyPBFmnPaLq)

<!-- 
https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Error-Correction-Code-ECC-Support/ta-p/474931

https://www.geeksforgeeks.org/computer-organization-architecture/what-is-ecc-memory/ 
-->