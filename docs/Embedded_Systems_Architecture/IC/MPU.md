---
title: MPU
parent: IC
nav_order: 3
---

<h1>Microprocessor Unit (MPU)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. MPU là gì?

**Microprocessor unit (MPU)** là một loại bộ xử lý trung tâm (CPU) được sử dụng trong máy tính để thực hiện các phép toán, các thao tác logic cũng như xử lý các lệnh. Nó đóng vai trò như "bộ não" của máy tính hoặc các thiết bị điện tử khác và là một dạng mạch tích hợp (Integrated Circuit - IC). MPU chịu trách nhiệm thực hiện quy trình lấy - giải mã - thi hành các lệnh của chương trình máy tính (fetching - decoding - executing). MPU thường có mặt trong desktop, laptop, smartphone và các thiết bị điện tử khác. Khác với MCU, MPU thường được sử dụng trong các hệ thống đòi hỏi khả năng tính toán đa năng, thay vì chỉ chuyên biệt cho các tác vụ điều khiển.

Các thành phần cơ bản của MPU:
- **Control unit**:  chịu trách nhiệm lấy các lệnh từ bộ nhớ và giải mã chúng thành mã máy.
- **Arithmetic logic unit (ALU)**: thực hiện các phép tính toán học và các phép so sánh logic.
- **Registers**: lưu trữ dữ liệu và lệnh.

---

# 2. Ưu và nhược điểm của MPU

## 2.1. Ưu điểm

- Kích thước nhỏ (vài mm² đến vài cm²), dễ tích hợp vào thiết bị portable như smartphone, tablet, embedded computer.
- Tiêu thụ điện năng thấp (có thể từ dưới 1 W ở chế độ low-power đến vài chục W ở MPU hiệu năng cao).
- Lượng nhiệt sinh ra thấp do công suất thấp; tuy nhiên MPU hiệu năng cao có thể cần bộ tản nhiệt (heat sink) hoặc bộ làm mát chủ động (active cooling).
- Độ linh hoạt cao (có thể chạy nhiều loại software/OS như Linux, Android, RTOS và phục vụ nhiều ứng dụng khác nhau).
- Tốc độ cao (thường từ hàng trăm MHz đến vài GHz; ví dụ: 3 GHz = 3 tỷ chu kỳ xung nhịp mỗi giây.)
- Truyền dữ liệu giữa các bộ nhớ khác nhau một cách nhanh chóng (sử dụng cache, memory controller, high-speed bus/interconnect và DMA; tốc độ phụ thuộc memory/interface, có thể đạt từ vài trăm MB/s đến hàng chục GB/s).

<details markdown="block">
<summary><i>Thiết bị portable</i></summary>

> Thiết bị portable là thiết bị điện tử hoặc công nghệ được thiết kế nhỏ gọn để bạn dễ dàng cầm theo, di chuyển và sử dụng ở nhiều nơi khác nhau.
> 
> Các ví dụ phổ biến: sạc dự phòng, USB, loa Bluetooth, máy chơi game cầm tay,...
{: .codeBlock }
</details>

---

## 2.2. Nhược điểm

- Chi phí tổng thể cao (do cần nhiều external components).
- Bộ vi xử lý không có các thiết bị ngoại vi bên trong (internal peripherals) như ROM, RAM hoặc các thiết bị I/O khác (khác MCU vốn tích hợp Flash, RAM, GPIO, Timer, ADC, UART, SPI, I2C,...).
- Tất cả các linh kiện phải được lắp ráp trên một PCB lớn (ví dụ như external RAM, Flash, PMIC, clock và peripheral IC), dẫn đến sản phẩm có kích thước lớn, dù bản thân MPU nhỏ.
- Nhiều linh kiện bên ngoài hơn (nhiều IC và kết nối trên PCB hơn) dẫn đến nhiều điểm có nguy cơ xảy ra lỗi hơn.
- Việc tạo ra toàn bộ một sản phẩm cần nhiều thời gian hơn so với MCU hay SoC (cần phát triển hardware, PCB, BSP, bootloader, driver, OS và application).
- Một số MPU đơn giản/cũ không có FPU. MPU hiện đại thường hỗ trợ các phép toán floating-point bằng FPU/SIMD.





<details markdown="block">
<summary><i>PMIC</i></summary>

> **Power Management Integrated Circuit (PMIC)**: Mạch tích hợp quản lý nguồn có nhiệm vụ nhận nguồn đầu vào và tạo ra các power rails phù hợp cho MPU và các thành phần khác. MPU hiệu năng cao thường có nhiều power domains và voltage rails, vì vậy PMIC rất quan trọng.
{: .codeBlock }
</details>





<details markdown="block">
<summary><i>BSP</i></summary>

> **Board Support Package (BSP)**: lớp trung gian giúp Operating System/software stack hiểu và sử dụng hardware của board. BSP không phải là một phần cứng mà là một tập hợp software/configuration dành cho một hardware platform cụ thể.
> 
> Một BSP có thể bao gồm:
> - Bootloader.
> - Board-specific initialization.
> - Device drivers.
> - Hardware configuration.
> - Device tree.
> - Clock configuration.
> - Memory configuration.
> - Pin configuration.
{: .codeBlock }
</details>





<details markdown="block">
<summary><i>FPU/SIMD</i></summary>

> **Floating-Point Unit (FPU)**: Là phần cứng chuyên thực hiện các phép toán floating-point. Nếu không có FPU, processor có thể phải thực hiện floating-point bằng software, thường chậm hơn.
> 
> **Single Instruction, Multiple Data (SIMD)**: Cho phép một instruction xử lý nhiều data element cùng lúc. SIMD đặc biệt hữu ích cho:
> - Image processing.
> - Audio processing.
> - Video processing.
> - Signal processing.
> - Vector calculations.
> - Machine Learning.
> - AI.
{: .codeBlock }
</details>

---

# 3. Ứng dụng

- Được sử dụng trong điện thoại di động và television.
- Là một thành phần trong máy tính bỏ túi và thiết bị chơi game.
- Được sử dụng trong hệ thống thu thập dữ liệu và hệ thống kế toán (accounting systems).
- Được ứng dụng trong các lĩnh vực quân sự.
- Được sử dụng để điều khiển traffic lights.
- PCs sử dụng MPU làm central processing unit (CPU).
- Trong LASER printers, MPU được sử dụng để in nhanh và tự động sao chép hình ảnh.
- Ngoài việc được sử dụng trong digital telephone sets, modems và telephones, MPU còn được sử dụng trong hệ thống đặt chỗ đường sắt và hàng không (reservation systems).
- MPU được sử dụng trong thiết bị y tế để đo huyết áp và nhiệt độ.

---


# Tham khảo

[1] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)