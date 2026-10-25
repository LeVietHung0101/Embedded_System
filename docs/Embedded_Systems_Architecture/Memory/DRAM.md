---
title: DRAM
parent: Memory
nav_order: 4
---

<h1>DRAM</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. DRAM là gì?

**Double Data Rate Synchronous Dynamic Random-Access Memory** (**DDR SDRAM**, gọi tắt là **DRAM**) được sử dụng rộng rãi làm main memory trong hầu hết các hệ thống hiện nay, từ High-Performance Computing (HPC) đến các thiết bị di động có yêu cầu khắt khe về năng lượng và diện tích. DDR có các ưu điểm như mật độ cao (high-density), độ trễ thấp (low-latency),  tiêu thụ điện năng thấp (low-power consumption) và kiến trúc đơn giản

JEDEC, tổ chức xây dựng các tiêu chuẩn bộ nhớ, đã định nghĩa bốn nhóm DRAM để đáp ứng các yêu cầu bộ nhớ khác nhau:
- Standard DDR: DDR5/4/3/2.
- Mobile DDR: LPDDR5/4/3/2.
- Graphic DDR: GDDR3/4/5/6.
- High Bandwidth DRAM: HBM2/2E/3.

Sơ đồ khối tổng quan của memory subsystem trong một hệ thống System-on-Chip (SoC) điển hình gồm:
- DDR memory controller
- DDR PHY
- DDR channel
- DDR memory

Theo định nghĩa của JEDEC, DDR channel bao gồm các đường tín hiệu Command/Address và data lanes. DDR memory trong sơ đồ có thể đại diện cho một DRAM memory component thuộc bất kỳ nhóm nào trong bốn nhóm trên.

<details markdown="block">
<summary><i>JEDEC</i></summary>

> **Joint Electron Device Engineering Council - JEDEC** (*Hội đồng Kỹ thuật Thiết bị Điện tử Liên hợp*) là một liên minh thương mại và tiêu chuẩn hóa toàn cầu thuộc ngành công nghiệp bán dẫn. Đây là tổ chức quy tụ hơn 365 thành viên gồm các tập đoàn công nghệ lớn trên thế giới.
>
> Vai trò:

> - **Tiêu chuẩn hóa bộ nhớ máy tính**: JEDEC là cơ quan định hướng, phát triển và quy chuẩn hóa các thế hệ bộ nhớ RAM (như DDR3, DDR4, DDR5, LPDDR6) giúp các linh kiện từ nhiều hãng khác nhau có thể tương thích.
> - **Quy chuẩn bao bì linh kiện**: Xây dựng các bản vẽ và kích thước chuẩn cho chất bán dẫn (ví dụ tiêu chuẩn JEP-95, TO-3, TO-5).
> - **Định nghĩa thông số kỹ thuật và thử nghiệm**: Ban hành các phương pháp thử nghiệm (như tiêu chuẩn JESD22), quy định phóng điện tĩnh điện (*Electrostatic Discharge - ESD*) và quản lý hệ thống đánh số linh kiện điện tử.
{: .codeBlock }
</details>

---

# Tham khảo

[1] [Synopsys, "Error Correction Code (ECC) in DDR Memories"](https://www.synopsys.com/articles/ecc-memory-error-correction.html)
