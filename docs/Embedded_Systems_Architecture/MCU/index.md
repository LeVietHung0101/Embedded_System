---
title: MCU
parent: Embedded Systems Architecture
nav_order: 51
has_children: true
---

<h1>MCU</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Microcontroller (MCU)

## 1.1. Tổng quan

{: .note}
**Microcontroller (MCU)** là một máy tính nhỏ được tích hợp trên một **Integrated Circuit (IC)**, được thiết kế để điều khiển các chức năng cụ thể trong hệ thống điện tử. MCU kết hợp Central Processing Unit (CPU), memory và Input/Output (I/O) interfaces trên cùng một chip.

Một MCU điển hình bao gồm:
- **Processor core**: Thực thi instructions và điều khiển các thành phần khác của MCU.
- **Memory**: Lưu trữ program code và data, bao gồm volatile memory và non-volatile memory.
- **Input/Output (I/O) peripherals**: Cho phép MCU tương tác với môi trường bên ngoài thông qua các thiết bị như buttons, sensors và displays.
- **Communication interfaces**: Cho phép MCU giao tiếp với các thiết bị khác.

Đặc điểm của Microcontroller:
- **Programmable**: Có thể lập trình để thực hiện nhiều nhiệm vụ khác nhau. Các ngôn ngữ lập trình phổ biến gồm C, C++ và assembly language.
- **Low-power**: Thường tiêu thụ ít năng lượng, phù hợp với các thiết bị sử dụng pin.
- **Small and low-cost**: Có kích thước nhỏ, chi phí thấp và phù hợp với các ứng dụng điều khiển lâu dài.
- **Integrated**: Tích hợp processor, memory và các giao tiếp ngoại vi trên cùng một chip.
- **Embedded**: Thường được tích hợp bên trong các thiết bị điện tử để điều khiển những chức năng cụ thể.

MCU thường được tích hợp vào các embedded systems để thực hiện những chức năng điều khiển chuyên biệt, chẳng hạn như:
- Automation systems.
- Security systems.
- Laser printers.
- Robotics.

---

# 1.2. Cách thức hoạt động của MCU

Microcontroller là thiết bị xử lý tốc độ cao, mặc dù năng lực xử lý thường thấp hơn computer. MCU thực thi instructions nhanh chóng theo trình tự điều khiển của hệ thống.

Quá trình hoạt động cơ bản:
1. **Power-on**: Khi nguồn được cấp, mạch điều khiển khởi tạo quá trình hoạt động và kích hoạt quartz oscillator (bộ dao động thạch anh).
2. **Initialization**: Điện áp nguồn ổn định, các mạch bên trong được chuẩn bị để hoạt động; các tụ điện được nạp điện trong quá trình này.
<!-- các parasitic capacitors được nạp điện trong quá trình này. -->
3. **Clock stabilization** (*Ổn định xung nhịp*): Khi điện áp đạt mức yêu cầu và tần số của oscillator ổn định, tín hiệu CLK (Clock) cung cấp nhịp đồng bộ cho hoạt động của MCU.
4. **Register operation**: MCU bắt đầu thực hiện các thao tác đọc/ghi thông qua Special Function Registers (SFRs) và điều khiển các thành phần ngoại vi.
5. **Program execution**: Processor thực thi instructions, xử lý data và điều khiển peripherals theo chương trình đã được lưu trong memory.

---

# 1.3. Phân loại MCU

Microcontroller được phân loại dựa trên số bit, loại memory, kiến trúc memory và instruction set (tập lệnh).

## 1.3.1. Phân loại MCU dựa trên số bit

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Mô tả</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>8-bit MCU</td>
      <td>
        Internal bus có độ rộng 8 bit.<br>
        ALU thực hiện các phép toán trên dữ liệu 8 bit mỗi lần.<br>
      </td>
      <td>Intel 8031/8051, PIC1x, Motorola MC68HC11</td>
    </tr>
    <tr>
      <td>16-bit MCU</td>
      <td>
        Internal bus có độ rộng 16 bit, hỗ trợ độ chính xác và hiệu năng cao hơn so với 8-bit.<br>
        Biểu diễn giá trị không dấu từ 0x0000 đến 0xFFFF (0–65535).<br>
      </td>
      <td>Extended 8051XA, PIC2x, Intel 8096, Motorola MC68HC12.</td>
    </tr>
    <tr>
      <td>32-bit MCU</td>
      <td>
        Hỗ trợ xử lý dữ liệu 32 bit và các instructions phù hợp với kiến trúc.<br>
        Dùng trong thiết bị y tế, hệ thống điều khiển động cơ, thiết bị văn phòng.<br>
      </td>
      <td>Intel/Atmel 251 family, PIC3x,<br>
        Infineon AURIX (TC39x/TC29x),<br>
        Infineon Traveo II / Cypress (CYT4BF/CYT6BJ),<br>
        NXP S32K3 (S32K314),<br>
        Renesas RH850 (F1KM-S1/S4, F1L, F1K).
      </td>
    </tr>
  </tbody>
</table>

## 1.3.2. Phân loại MCU dựa trên loại memory

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Mô tả</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Embedded Memory Microcontroller</td>
      <td>
        Tích hợp đầy đủ các khối chức năng trên cùng một chip (program memory, data memory, I/O ports, serial interfaces, timers, interrupt controllers…).<br>
      </td>
      <td>8051 MCU,<br>
        TC39x/TC29x,<br>
        CYT4BF/CYT6BJ,<br>
        S32K314,<br>
        F1KM-S1/S4, F1L, F1K.
      </td>
    </tr>
    <tr>
      <td>External Memory Microcontroller</td>
      <td>
        Không tích hợp đầy đủ các khối chức năng trên chip; một số thành phần (thường là program memory) phải kết nối bên ngoài.<br>
      </td>
      <td>8031 MCU.</td>
    </tr>
  </tbody>
</table>

## 1.3.3. Phân loại MCU dựa trên kiến trúc memory

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Mô tả</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Harvard Memory Architecture</td>
      <td>
        Sử dụng memory và đường truyền riêng biệt cho program và data.<br>
        Cho phép truy cập program memory và data memory đồng thời → tăng hiệu quả xử lý.<br>
        Thường dùng trong các MCU cần truy cập instructions và data hiệu quả.
      </td>
      <td>TC39x/TC29x,<br>
        CYT4BF/CYT6BJ,<br>
        S32K314,<br>
        F1KM-S1/S4, F1L, F1K.
      </td>
    </tr>
    <tr>
      <td>Von Neumann Memory Architecture</td>
      <td>
        Sử dụng chung memory và bus cho program và data.<br>
        Đơn giản hóa thiết kế, nhưng program và data phải cạnh tranh cùng tài nguyên bus → có thể hạn chế hiệu năng.
      </td>
      <td>Một số MCU thế hệ cũ.</td>
    </tr>
  </tbody>
</table>

## 1.3.4. Phân loại MCU dựa trên instruction set

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Mô tả</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>CISC</strong><br>(Complex Instruction Set Computer)</td>
      <td>
        Sử dụng instruction set có các instructions phức tạp, cho phép thực hiện nhiều thao tác trong một instruction.<br>
        Có thể giảm số lượng instructions cần thiết để thực hiện một chương trình.<br>
        Thời gian thực thi phụ thuộc vào độ phức tạp của instructions và đặc điểm triển khai kiến trúc.
      </td>
      <td>Một số MCU thế hệ cũ (như 8051 MCU)</td>
    </tr>
    <tr>
      <td><strong>RISC</strong><br>(Reduced Instruction Set Computer)</td>
      <td>
        Sử dụng instruction set gồm các instructions tương đối đơn giản.<br>
        Thiết kế nhằm hỗ trợ thực thi hiệu quả, thường hướng đến giảm số clock cycles cho mỗi instruction.<br>
        Hiệu năng thực tế phụ thuộc vào kiến trúc, cách triển khai và workload; RISC không phải lúc nào cũng nhanh hơn CISC.
      </td>
      <td>
        Infineon Traveo II (Arm Cortex-M),<br>
        NXP S32K3 (Arm Cortex-M7),<br>
        Renesas RH850.
      </td>
    </tr>
    <tr>
      <td><strong>Hybrid</strong><br>(RISC + CISC features)</td>
      <td>Kết hợp đặc điểm của cả RISC và CISC (như TriCore architecture).</td>
      <td>Infineon AURIX (TC39x/TC29x – TriCore)</td>
    </tr>
  </tbody>
</table>




---

# Tham khảo

<!-- 

https://www.geeksforgeeks.org/digital-logic/microcontroller-and-its-types/

https://www.infineon.com/product-information/types-of-microcontrollers-families-and-classifications-explained

https://www.renesas.com/en/support/engineer-school/mcu-01-basic-structure-operation?srsltid=AYCX9vK2Q37rVrdl0qlur5jRj2v7-OMvasLRrtn_5ooK49OEZl5A3x5q

https://www.silabs.com/blog/choose-the-best-mcu-architecture-for-iot-development

https://promwad.com/news/multi-core-microcontrollers-embedded-design

https://documentation.infineon.com/aurixtc3xx/docs/ecm1708773291965
 -->
