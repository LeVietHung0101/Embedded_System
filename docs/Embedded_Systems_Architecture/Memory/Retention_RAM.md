---
title: Retention RAM
parent: Memory
nav_order: 3
---

<h1>Retention RAM</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Retention RAM là gì?

**Retention RAM** (còn gọi là Low Power RAM / Standby SRAM) là vùng nhớ [SRAM]({{ "/docs/Embedded_Systems_Architecture/Memory/Memory/#sram-static-random-access-memory" | relative_url }}) đặc biệt trong MCU (MCU/SoC) có khả năng duy trì dữ liệu (biến toàn cục, trạng thái hệ thống, cấu hình) khi hệ thống đi vào các chế độ tiết kiệm năng lượng sâu (Deep Sleep, Standby, Stop Mode) nhờ được cấp một nguồn điện tối thiểu ($V_{RET}$).

Ứng dụng phổ biến
- **Lưu lý do reset**: Ghi lại nguyên nhân tại sao MCU bị khởi động lại (ví dụ do lỗi phần cứng hay sự cố watchdog).
- **Lưu trạng thái hệ thống**: Giúp thiết bị nhớ các bước công việc cũ để tiếp tục chạy ngay sau khi power-on mà không cần tải lại từ đầu.

---

# 2. Phân biệt Local RAM, Global RAM và Retention RAM

## 2.1. Local RAM (LRAM)

- Gắn liền với CPU để truy cập ở tốc độ cao (High speed).
- Không giữ được dữ liệu khi MCU đi vào chế độ tiết kiệm năng lượng.

## 2.2. Global RAM (GRAM)

- Dùng chung cho các core và bus trong hệ thống.
- Được sử dụng làm source hoặc destination cho các thao tác truyền dữ liệu bằng **DMA (Direct Memory Access)**.
- Được chia thành **Bank A** và **Bank B**, hỗ trợ truy cập song song (parallel access) vào cả 2 bank cùng lúc.
- Không giữ được dữ liệu trong chế độ tiết kiệm năng lượng.
- Có sẵn trên dòng `RH850/F1KH-D8`, `RH850/F1KM-S4`, `RH850/F1KM-S2`.
- Không có trên dòng `RH850/F1KM-S1`

## 2.3. Retention RAM (RRAM)

- Giữ được dữ liệu khi MCU nằm trong chế độ tiết kiệm năng lượng.
- Ngay cả khi điện áp nguồn ($REG0VCC$ / $REG1VCC$ / $REGVCC$) sụt giảm xuống dưới điện áp POC (Power-On Clear), dữ liệu trong Retention RAM vẫn được bảo toàn miễn là điện áp không tụt xuống dưới mức điện áp duy trì RAM **$V_{VLVI}$** (RAM retention voltage).

- Đối với `RH850/F1KH-D8`, `RH850/F1KM-S4`, `RH850/F1KM-S2`: Retention RAM chính là **một phần thuộc Global RAM (Bank B)**.
- Đối với `RH850/F1KM-S1`: Do dòng này không có Global RAM, Retention RAM được thiết kế là **một phần thuộc Local RAM** và vẫn giữ được ưu điểm truy cập tốc độ cao.

---

# Tham khảo:

[1] [Renesas, "Difference between Local RAM, Global RAM, Retention RAM and Trace RAM"](https://community.renesas.com/mcu/rh850/f/rh850-rl78f/34033/difference-between-local-ram-global-ram-retention-ram-and-trace-ram)
