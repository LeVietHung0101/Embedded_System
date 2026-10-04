---
title: Debug
parent: Embedded Systems Architecture
nav_order: 50
has_children: true
---

<h1>Debug</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

Tổng hợp khái niệm, thông số và phương pháp debug application trên MCU (Tricore/AURIX TC2xx/TC3xx, Renesas RH850/U2A, Cypress/Infineon Traveo CYTxxx,...). Debug trên các MCU này tập trung vào exception/trap handling, vector table, context save/restore, và các công cụ debugger (Lauterbach TRACE32, PLS UDE, iSYSTEM winIDEA, GDB…).

# 1. Khái niệm cơ bản

- **Trap / Exception**: Sự kiện bất thường (lỗi lệnh, bảo vệ bộ nhớ, bus error, NMI…) khiến CPU nhảy sang handler đặc biệt. Trap không thể mask bằng phần mềm (khác interrupt).
- **TIN (Trap Identification Number)**: Số nhận dạng cụ thể bên trong một class. Hardware tự load vào thanh ghi D[15] trước khi vào handler. Dùng để phân nhánh trong handler.
- **Trap Class (TCN)**: 8 class (0–7) trên Tricore. Mỗi class có entry riêng trong vector table. Class quyết định offset trong bảng vector.


- **Vector Table / Trap Vector Table**: Bảng chứa địa chỉ handler. Ví dụ ở Tricore là BTV (Base Trap Vector), mỗi entry 32 byte.
- **Vector Handler / Trap Service Routine (TSR)**: Hàm xử lý trap. Thường được cung cấp bởi iLLD (IfxCpu_Trap.c) hoặc user code.
- **Context Save Area (CSA)**: Vùng nhớ lưu context (upper/lower context) khi trap/interrupt/call. Liên quan chặt đến Class 3 traps.
- **Return Address (RA)**: Địa chỉ lưu trong A[11]. Sync trap: thường là PC của lệnh gây trap. SYS: lệnh sau SYSCALL.

- **Synchronous vs Asynchronous**: Sync: xảy ra ngay với lệnh cụ thể (biết chính xác PC gây lỗi). Async: xảy ra sau (ví dụ bus error, NMI). Ưu tiên: Async > Sync > Interrupt.

- **Hardware vs Software trap**: HW: lỗi phát hiện bởi phần cứng. SW: cố ý (SYSCALL, assertion…).

---

# 2. Cơ chế handler của các MCU

**Tricore / AURIX (TC2xx, TC3xx):**
- TriCore định nghĩa 8 Trap Class. Mỗi class có handler riêng, indexed bởi TCN. Trong class, TIN phân biệt loại cụ thể.
- *On-Chip Debug System (OCDS)*: một phương pháp debug xâm nhập, trong đó các breakpoints được sử dụng và các watchdogs bị tạm dừng. Do đó, hành vi theo thời gian của ứng dụng bị ảnh hưởng. Phương pháp này *không phù hợp* với các lỗi phụ thuộc vào thời gian, những lỗi có thể không tái hiện được một cách đáng tin cậy sau khi OCDS được kích hoạt. Hệ thống này có sẵn trên cả thiết bị sản xuất và thiết bị mô phỏng.
- *MultiCore Debug Solution (MCDS)*: một phương pháp debug không xâm nhập bằng cách theo dõi các lệnh, các hàm thu gọn (compact functions) hoặc data logging. Module MCDS đầy đủ chỉ có sẵn trên các thiết bị giả lập. Đối với các thiết bị sản xuất, có các tùy chọn MCDS nhỏ hơn được gọi là *MCDSLight* và *MiniMCDS*.

**Renesas RH850 / U2A**:
- Exception chia EI-level (thường) và FE-level (ưu tiên cao hơn, có thể xảy ra trong EI).
- Context lưu vào EIPC/EIPSW (EI) hoặc FEPC/FEPSW (FE); mã lỗi trong EIIC/FEIC.
- Vector: RBASE (reset) hoặc EBASE (khi PSW.EBV=1) + offset cố định (direct vector) hoặc bảng tham chiếu (INTBP).
- Có TRAP0/TRAP1, SYSERR, FETRAP, MAE (misalignment), FPE/FXE (floating-point)…
- Multi-core: dùng EIBD để bind interrupt/exception tới core cụ thể; broadcast giới hạn.

**Cypress/Infineon Traveo (CYTxxx – ARM Cortex-M0+/M4/M7)**:
- Dùng cơ chế exception chuẩn ARM Cortex-M: HardFault, MemManage, BusFault, UsageFault, NMI…
- Vector table tại địa chỉ cố định hoặc VTOR.
- Debug qua SWD/JTAG; có CTI/CTM cho multi-core sync.
- Khi HardFault: kiểm tra HFSR, CFSR, MMFAR/BFAR, stacked registers (R0–R3, R12, LR, PC, xPSR).
- Thường gặp: access invalid address, unaligned, divide-by-zero, stack overflow.

---

# 3. Phương pháp & công cụ debug chung
- Breakpoint trên vector table / handler entry.
- Đọc thanh ghi đặc biệt ngay khi vào trap (D15/A11 trên Tricore; EIIC/FEIC trên RH850; CFSR/HFSR trên ARM).
- Trace (MCDS trên AURIX, ETM/ITM trên ARM, v.v.) để bắt sequence dẫn đến trap.
- Post-mortem: lưu context + register quan trọng vào RAM không bị xóa khi reset, sau đó dump.
- iLLD / MCAL hooks: dùng cấu trúc sẵn có để log trap.
- Multi-core: sync run-control, cross-trigger.
- Lưu ý debug side-effect: freeze peripheral, suspend watchdog, suspend timers.

# 4. Tài liệu tham khảo chính
- TriCore™ Core Architecture Manual Volume 1 (chương Trap System) – TC1.6.x.
- AURIX TC2xx/TC3xx User’s Manual + Application Notes về Trap Recognition.
- Infineon KBA: “Debug Code When a Trap is Asserted”, “How to identify a trap using iLLDs”, “Reaction to Tricore trap Class 3”.
- RH850 Hardware Manual + CC-RH Compiler Application Guide (interrupt/exception).
- ARM Cortex-M Exception Handling + Traveo TRM (Program and Debug Interface).






---

# Tham khảo

[1] [Infineon - Community, "AURIX™ MCU: Debugging and tracing modules"](https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Debugging-and-tracing-modules/ta-p/357832)


<!-- 


[Debugging Techniques for Embedded Systems](https://www.maven-silicon.com/blog/debugging-techniques-for-embedded-systems/)

[How to Debug Embedded Systems Without Hardware Access](https://hubble.com/community/guides/how-to-debug-embedded-systems-without-hardware-access/)

[Top 7 Debugging Tools for Embedded Systems in 2025](https://promwad.com/news/top-debugging-tools-embedded-systems-2025)

[Debugging Techniques Every Embedded Engineer Should Know](https://www.linkedin.com/pulse/debugging-techniques-every-embedded-engineer-should-know-miet-yf5qc)

[Debugging an Embedded System - Day 1 - Introducing different Tools](https://pyjamacafe.com/posts/debugging-arm64-day1-different-tools/)

[Embedded Firmware Debugging Techniques That Work](https://abluethinginthecloud.com/embedded-firmware-debugging-techniques/)

[Debugging Embedded Systems - Favorite Tools, Strategies, Best Practices...](https://www.embeddedrelated.com/thread/4547/debugging-embedded-systems-favorite-tools-strategies-best-practices)

[Top Debugging Techniques Used In Embedded Systems](https://www.totalphase.com/blog/2020/03/top-debugging-techniques-used-in-embedded-systems/?srsltid=AU7gw4XJKRh504-XJBp3LiUkM2DhoAdamXFfeNn9dzY-yH1rPUgwOWvM)




-->
