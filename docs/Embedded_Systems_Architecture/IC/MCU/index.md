---
title: MCU
parent: IC
nav_order: 2
has_children: true
---

<h1>Microcontroller (MCU)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

{: .note}
> **Microcontroller (MCU / µC / uC)** (*Vi điều khiển*): là một máy tính thu nhỏ nằm trên một mạch tích hợp (**Integrated Circuit - IC**), được thiết kế để điều khiển các chức năng cụ thể trong hệ thống điện tử. MCU , bao gồm CPU, bộ nhớ, các thiết bị ngoại vi I/O có thể lập trình, timer, counter,... MCU chỉ cung cấp dung lượng bộ nhớ, các giao diện và năng lực xử lý ở mức tối thiểu. MCU thường được sử dụng cho các hệ thống điều khiển nhúng quy mô nhỏ hoặc các ứng dụng điều khiển.

Một MCU điển hình bao gồm:
- **Central Processing Unit (CPU)**: Thực thi instructions và điều khiển các thành phần khác của MCU. CPU có thể chứa một hoặc nhiều processor core.
- **Memory**: Lưu trữ program code và data, bao gồm volatile memory và non-volatile memory.
- **Input/Output (I/O) ports**: là các chân GPIO (General-Purpose Input/Output) được sử dụng để nhận tín hiệu đầu vào hoặc xuất tín hiệu điều khiển ra bên ngoài MCU (*ví dụ: buttons, sensors, LED, relay và transistor*). Có thể hỗ trợ Analog Input/Output thông qua các peripheral như ADC và DAC (tùy MCU).
- **Communication ports**: Cho phép MCU giao tiếp với các thiết bị khác theo những giao thức truyền thông xác định (*ví dụ: UART, SPI, I2C, CAN, USB, Ethernet,...*).

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

# 2. Cấu trúc cơ bản của MCU

## 2.1. Central Processing Unit (CPU)

Toàn bộ hoạt động của CPU được quyết định bởi **program** - một chuỗi lệnh có thứ tự lưu trong bộ nhớ. CPU chỉ đọc và thực thi các lệnh này theo trình tự đã định. Các lệnh riêng lẻ rất đơn giản, ví dụ:
- Đọc dữ liệu từ địa chỉ memory XXX.
- Ghi dữ liệu vào địa chỉ memory YYY.
- Cộng hoặc nhân hai giá trị.

Mặc dù mỗi lệnh đơn giản, nhưng khi được tổ chức thành chuỗi dài, chúng có thể thực hiện nhiều chức năng phức tạp.

Các thành phần cơ bản của CPU:

1. **Program Counter (PC)**
- Là thanh ghi nội bộ lưu địa chỉ memory của lệnh tiếp theo mà CPU sẽ thực thi.
- Theo mặc định, giá trị PC tự động tăng sau mỗi lần thực thi lệnh.
- PC bắt đầu từ 0x0000, nên CPU bắt đầu chạy chương trình từ lệnh tại địa chỉ 0x0000. Sau khi thực thi, PC tăng lên 0x0001, CPU thực thi lệnh tiếp theo, và quá trình tiếp tục tuần tự.

2. **Instruction Decoder**
- Mạch decoder giải mã từng lệnh đọc từ memory, rồi dùng kết quả để điều khiển các mạch số học và vận hành của MCU.
- Decoder thực tế phức tạp hơn decoder cơ bản trong mạch số, có nhiệm vụ phục hồi lệnh đã mã hóa về dạng gốc.

3. **Arithmetic and Logic Unit (ALU)**
- ALU thực hiện các phép toán số học và logic.
  - Phép số học: cộng, nhân,...
  - Phép logic: AND, OR, dịch bit,...
- ALU được điều khiển bởi Instruction Decoder.
- Về cơ bản, ALU là tổ hợp phức tạp của nhiều mạch.

4. **CPU Internal Registers**
- Các thanh ghi nội bộ lưu thông tin tạm thời.
  - **General-purpose registers**: lưu kết quả phép toán số học và logic.
  - **Specialized registers**: lưu thông tin đặc thù (ví dụ flag register chứa cờ carry,...).
- Khi ALU thực hiện phép toán, nó không thao tác trực tiếp trên memory. Dữ liệu tại địa chỉ memory được chỉ định sẽ được copy vào general-purpose register trước, sau đó ALU tính toán trên nội dung của register.

{: .highlight }
> <strong>Minh họa hoạt động của CPU: phép cộng 3 + 4</strong>
>
> Chương trình và dữ liệu được lưu trong memory như sau:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Address</th>
>       <th>Instruction</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>0x0000</td>
>       <td>Đọc giá trị tại memory address 0100, lưu vào Register 1</td>
>     </tr>
>     <tr>
>       <td>0x0001</td>
>       <td>Đọc giá trị tại memory address 0101, lưu vào Register 2</td>
>     </tr>
>     <tr>
>       <td>0x0002</td>
>       <td>Cộng giá trị Register 2 vào Register 1, lưu kết quả vào Register 1</td>
>     </tr>
>   </tbody>
> </table>
>
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Address</th>
>       <th>Data</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>0x0100</td>
>       <td>3</td>
>     </tr>
>     <tr>
>       <td>0x0101</td>
>       <td>4</td>
>     </tr>
>   </tbody>
> </table>
>
> Các bước thực thi:
>
> <strong>Bước 1</strong>
> - CPU lấy lệnh tại địa chỉ trong PC (0x0000), giải mã và thực thi.
> - Lệnh yêu cầu lấy giá trị tại 0x0100 và ghi vào Register 1.
> - Register 1: 0 → 3
> - PC tự động tăng: 0x0000 → 0x0001
>
> <strong>Bước 2</strong>
> - CPU lấy lệnh tại 0x0001, giải mã và thực thi.
> - Register 2: 0 → 4
> - PC: 0x0001 → 0x0002
>
> <strong>Bước 3</strong>
> - CPU lấy lệnh tại 0x0002, giải mã và thực thi.
> - Cộng nội dung Register 1 và Register 2, ghi kết quả vào Register 1.
> - Register 1: 3 → 7
> - PC: 0x0002 → 0x0003
>
> Kết quả: Register 1 hiện chứa kết quả 7.

---

## 2.2. Memory

Bộ nhớ của MCU dùng để lưu program code và data. Có hai loại chính: ROM và RAM.
- ROM dùng để lưu trữ program code.
- RAM dùng để lưu trữ data trong quá trình hoạt động.

### 2.2.1. ROM (Read-only Memory)

- Giữ nguyên nội dung ngay cả khi mất nguồn.
- Chỉ đọc được, không thể xóa hoặc ghi đè.
- Thường dùng để lưu start-up program (chạy ngay sau khi cấp nguồn hoặc reset) và các giá trị hằng số.

> <i>Nhiều MCU của Renesas dùng flash memory thay cho ROM.</i><br>
> <i>Flash memory cũng giữ nội dung khi mất nguồn, nhưng có thể ghi đè được.</i>

### 2.2.2. RAM (Random-access Memory)

- Có thể ghi và đọc tự do.
- Mất toàn bộ nội dung khi mất nguồn.
- Chủ yếu dùng để lưu biến của chương trình (program variables).

Hầu hết **single-chip MCU** dùng **SRAM** (Static RAM) làm RAM nội bộ.

Ưu điểm của SRAM:
- Tốc độ truy cập nhanh hơn.
- Không cần refresh định kỳ.

Nhược điểm của SRAM:
- Mạch nội bộ phức tạp → khó tích hợp dung lượng lớn trên chip.

**DRAM** (Dynamic RAM) có cấu trúc đơn giản hơn, cho phép tích hợp dung lượng lớn hơn nhiều so với SRAM.

Tuy nhiên, khó chế tạo DRAM cùng với logic tốc độ cao trên cùng một wafer, nên DRAM hầu như không được dùng bên trong single-chip MCU. Thay vào đó, DRAM thường được kết nối bên ngoài như peripheral.


> <i><strong>Ghi chú</strong>: Single-chip MCU là MCU được tích hợp trên một chip LSI duy nhất, bao gồm CPU, ROM, RAM, oscillator, timer, serial interface,... Nếu chip còn tích hợp thêm các mạch peripheral chính của hệ thống thì được gọi là system LSI.</i>

---

### 2.2.3. Các đặc điểm của MCU

**Word Length**: MCU có thể hỗ trợ word length lớn hơn 64 bit.

**Integrated Components**: Bao gồm các thành phần chính như RAM, ROM, Timer và I/O Ports.

**Architecture**: Có thể sử dụng CISC architecture.

**Power Consumption**: Các MCU hiện đại có mức tiêu thụ điện năng thấp, với operating voltage thường nằm trong khoảng 1.8V–5.5V.

**Flash Memory**: Hỗ trợ Flash memory để lưu trữ chương trình. Các công nghệ memory liên quan bao gồm EPROM và EEPROM.

<details markdown="block">
<summary><i>Word Length</i></summary>

> **Word Length** là độ dài dữ liệu mà CPU/MCU có thể xử lý trong một lần, thường được tính bằng bit (8-bit, 16-bit, 32-bit,...). Word length ảnh hưởng đến khả năng xử lý dữ liệu và phạm vi giá trị có thể biểu diễn.
{: .codeBlock }
</details>

---

# 3. Cách thức hoạt động của MCU

Microcontroller là thiết bị xử lý tốc độ cao, mặc dù năng lực xử lý thường thấp hơn computer. MCU thực thi instructions nhanh chóng theo trình tự điều khiển của hệ thống.

Quá trình hoạt động cơ bản:
1. **Power-on**: Khi nguồn được cấp, mạch điều khiển khởi tạo quá trình hoạt động và kích hoạt quartz oscillator (bộ dao động thạch anh).
2. **Initialization**: Điện áp nguồn ổn định, các mạch bên trong được chuẩn bị để hoạt động; các tụ điện được nạp điện trong quá trình này.
<!-- các parasitic capacitors được nạp điện trong quá trình này. -->
3. **Clock stabilization** (*Ổn định xung nhịp*): Khi điện áp đạt mức yêu cầu và tần số của oscillator ổn định, tín hiệu CLK (Clock) cung cấp nhịp đồng bộ cho hoạt động của MCU.
4. **Register operation**: MCU bắt đầu thực hiện các thao tác đọc/ghi thông qua Special Function Registers (SFRs) và điều khiển các thành phần ngoại vi.
5. **Program execution**: Processor thực thi instructions, xử lý data và điều khiển peripherals theo chương trình đã được lưu trong memory.

---

# 4. Các ứng dụng của MCU

Microcontroller được sử dụng rộng rãi trong các thiết bị điện tử và hệ thống điều khiển.

**Các ứng dụng thường ngày:**
- Light Detection and Control: Phát hiện và điều khiển ánh sáng, ví dụ automatic street lights.
- Temperature Monitoring and Control: Giám sát và điều chỉnh nhiệt độ, *ví dụ bộ điều chỉnh nhiệt độ thông minh (smart thermostats)*.
- Fire Detection and Safety: Phát hiện cháy và cảnh báo an toàn, ví dụ smoke alarms.
- Process Automation: Điều khiển tự động các quy trình công nghiệp.

**Các ứng dụng trong điều khiển công nghiệp (Industrial Control):**
- Industrial Measurement: Đo lường và giám sát các thông số trong nhà máy.
- Industrial Data Monitoring: Đo lường và theo dõi dữ liệu công nghiệp.
- Production Process Control: Quản lý và điều khiển các quy trình sản xuất.

**Ứng dụng trong các thiết bị đo lường:**
- Voltage Meters: Thiết bị đo điện áp.
- Rotational Counters: Thiết bị đếm số vòng quay của các bộ phận chuyển động, chẳng hạn động cơ.
- Current Meters: Thiết bị đo dòng điện.
- Portable Measuring Tools: Thiết bị đo cầm tay, *ví dụ đồng hồ vạn năng kỹ thuật số (DMM - Digital Multimeters)*.

---

# 5. Phân loại MCU

MCU được phân loại theo các tiêu chí độc lập:
1. **Bit-width (Processing Capacity)**: Độ rộng dữ liệu mà CPU có thể xử lý, thường gồm 8-bit, 16-bit và 32-bit.

2. **Processor Architecture (Instruction Set & Core)**: Kiến trúc processor, bao gồm kiến trúc tập lệnh (ISA - Instruction Set Architecture) và thiết kế processor core.

3. **Memory Organization**: Cách tổ chức memory và phương thức tích hợp memory.

4. **Application Domain (Market & Certification)**: Lĩnh vực ứng dụng và các yêu cầu về tiêu chuẩn, chứng nhận tương ứng,.

Ngoài ra, MCU còn được phân loại theo dải nhiệt độ hoạt động (**Operating Temperature Range**), giúp lựa chọn MCU cho các môi trường hoạt động khác nhau như commercial, industrial và automotive.

---

## 5.1. Phân loại MCU dựa trên Bit-width

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
      <th>Phù hợp nhất cho</th>
      <th>Ứng dụng điển hình</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>8-bit MCU</strong></td>
      <td>
        Internal bus có độ rộng 8 bit.<br>
        ALU thực hiện các phép toán trên dữ liệu 8 bit mỗi lần.<br>
      </td>
      <td>Các node đơn giản, nhạy cảm về chi phí</td>
      <td>Cảm biến nhiệt độ, LED driver, bàn phím cơ bản</td>
      <td>Intel 8031/8051, PIC1x, Motorola MC68HC11</td>
    </tr>
    <tr>
      <td><strong>16-bit MCU</strong></td>
      <td>
        Internal bus có độ rộng 16 bit, hỗ trợ độ chính xác và hiệu năng cao hơn so với 8-bit.<br>
        Biểu diễn giá trị không dấu từ 0x0000 đến 0xFFFF (0–65535).<br>
      </td>
      <td>Cảm biến và điều khiển tầm trung</td>
      <td>Giám sát động cơ, đo lường (metering), HMI cấp thấp</td>
      <td>Extended 8051XA, PIC2x, Intel 8096, Motorola MC68HC12.</td>
    </tr>
    <tr>
      <td><strong>32-bit MCU</strong></td>
      <td>
        Hỗ trợ xử lý dữ liệu 32 bit và các instructions phù hợp với kiến trúc.
      </td>
      <td>Hệ thống hiệu năng cao, yêu cầu an toàn</td>
      <td>Điều khiển động cơ, RTOS, chuyển đổi công suất, ADAS, thiết bị y tế, hệ thống điều khiển động cơ, thiết bị văn phòng.</td>
      <td>Intel/Atmel 251 family, PIC3x,<br>
        Infineon AURIX (TC39x/TC29x),<br>
        Infineon Traveo II / Cypress (CYT4BF/CYT6BJ),<br>
        NXP S32K3 (S32K314),<br>
        Renesas RH850 (F1KM-S1/S4, F1L, F1K).
      </td>
    </tr>
  </tbody>
</table>

Một số điểm quan trọng:
- MCU 32-bit xử lý đồng thời 4 byte (gấp 4 lần so với thiết bị 8-bit).
- Không gian địa chỉ bộ nhớ của MCU 32-bit lên đến 4 GB, trong khi bus 8-bit thuần túy chỉ hỗ trợ 256 byte.
- Hầu hết thiết kế embedded mới hiện nay đều bắt đầu từ 32-bit vì chênh lệch chi phí so với 8-bit đã trở nên rất nhỏ khi sản xuất số lượng lớn.

---

## 5.2. Phân loại MCU dựa trên thiết kế processor core

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Arm® Cortex®-M</strong></td>
      <td>Bao gồm các dòng core M0, M0+, M3, M4, M7, M33 và M55; được sử dụng rộng rãi trong hệ sinh thái MCU.      
        <ul>
          <li><strong>M0/M0+</strong>: phù hợp sensing chi phí thấp, HMI và điều khiển đơn giản (code size & công suất thấp).</li>
          <li><strong>M4/M7</strong>: "workhorse" công nghiệp - có FPU và DSP, thích hợp điều khiển động cơ và chuyển đổi công suất thời gian thực.</li>
          <li><strong>M33</strong>: tích hợp TrustZone®, chuẩn cho thiết kế IoT và công nghiệp yêu cầu bảo mật (PSA Certified).</li>
          <li><strong>M55 + Ethos™</strong>: hỗ trợ AI inference tại edge.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>TriCore™</strong></td>
      <td>Kiến trúc processor độc quyền của Infineon, kết hợp đặc tính MCU real-time, DSP và RISC.<br>
      Được thiết kế sẵn để đạt ASIL-D bằng phần cứng (không cần workaround phần mềm), dùng phổ biến trong ứng dụng automotive an toàn cao.</td>
    </tr>
    <tr>
      <td><strong>RISC-V</strong></td>
      <td>Kiến trúc ISA theo tiêu chuẩn mở (Open-standard ISA), hướng đến các thiết kế tối ưu chi phí (Cost-optimized) và linh hoạt tùy biến.</td>
    </tr>
  </tbody>
</table>

<details markdown="block">
<summary><i>Workhorse</i></summary>

> <strong>Workhorse</strong> dùng để chỉ thứ gì đó đáng tin cậy, chịu tải nặng, làm việc liên tục và được dùng rộng rãi cho các công việc chính.
>
> Arm® Cortex®-M4/M7 được gọi là industrial workhorse vì đây là dòng core "xương sống", được chọn nhiều nhất cho các bài toán công nghiệp thông thường, chứ không phải dòng siêu cao cấp hay dòng siêu tiết kiệm.
{: .codeBlock }
</details>

---

## 5.3. Phân loại MCU dựa trên kiến trúc memory

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Harvard Memory Architecture</strong></td>
      <td>
        Sử dụng memory và đường truyền riêng biệt cho program và data.<br>
        Cho phép truy cập program memory và data memory đồng thời, giúp tăng hiệu quả xử lý.<br>
        Thường dùng trong các MCU cần truy cập instructions và data hiệu quả.
      </td>
      <td>TC39x/TC29x,<br>
        CYT4BF/CYT6BJ,<br>
        S32K314,<br>
        F1KM-S1/S4, F1L, F1K.
      </td>
    </tr>
    <tr>
      <td><strong>Von Neumann Memory Architecture</strong></td>
      <td>
        Sử dụng chung memory và bus cho program và data.<br>
        Đơn giản hóa thiết kế, nhưng program và data phải cạnh tranh cùng tài nguyên bus → có thể hạn chế hiệu năng.
      </td>
      <td>Một số MCU thế hệ cũ.</td>
    </tr>
  </tbody>
</table>

---

## 5.4. Phân loại MCU dựa trên phương thức tích hợp memory

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
      <th>Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Embedded Memory Microcontroller</strong></td>
      <td>
        Tích hợp đầy đủ các khối chức năng trên cùng một chip (program memory, data memory, I/O ports, serial interfaces, timers, interrupt controllers,...).<br>
      </td>
      <td>8051 MCU,<br>
        TC39x/TC29x,<br>
        CYT4BF/CYT6BJ,<br>
        S32K314,<br>
        F1KM-S1/S4, F1L, F1K.
      </td>
    </tr>
    <tr>
      <td><strong>External Memory Microcontroller</strong></td>
      <td>
        Không tích hợp đầy đủ các khối chức năng trên chip; một số thành phần (thường là program memory) phải kết nối bên ngoài.<br>
      </td>
      <td>8031 MCU.</td>
    </tr>
  </tbody>
</table>

---

## 5.5. Phân loại MCU theo kích thước memory

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại MCU</th>
      <th>Kích thước memory</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Node 8-bit đơn giản</strong></td>
      <td>Flash: 4 KB trở lên<br>RAM: 256 B</td>
    </tr>
    <tr>
      <td><strong>MCU 32-bit công nghiệp</strong></td>
      <td>Flash: từ 256 KB đến 8 MB<br>RAM: từ 32 KB đến 1 MB</td>
    </tr>
    <tr>
      <td><strong>SoC ô tô cao cấp</strong></td>
      <td>Flash: Lên đến 64 MB</td>
    </tr>
  </tbody>
</table>


---

## 5.6. Phân loại MCU theo các thiết bị ngoại vi được tích hợp phổ biến

Mức độ tích hợp thiết bị ngoại vi trên ECU ảnh hưởng trực tiếp đến chi phí hệ thống và độ phức tạp của mạch in.

<table class="hover-table">
  <thead>
    <tr>
      <th>Nhóm chức năng</th>
      <th>On-chip peripherals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Communication</strong></td>
      <td>CAN, LIN, Ethernet, USB, SPI, I²C, UART</td>
    </tr>
    <tr>
      <td><strong>Analog</strong></td>
      <td>ADC, DAC, Op-amp, Comparator</td>
    </tr>
    <tr>
      <td><strong>Control</strong></td>
      <td>Timer PWM phần cứng, giao diện encoder, Safety Watchdog</td>
    </tr>
    <tr>
      <td><strong>Connectivity</strong><br><i>(Kết nối không dây)</i></td>
      <td>Bluetooth Low Energy, Wi-Fi (dòng IoT)</td>
    </tr>
  </tbody>
</table>

---

## 5.7. Phân loại MCU dựa trên instruction set

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
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

## 5.8. Phân loại MCU dựa trên lĩnh vực ứng dụng

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Đặc điểm</th>
      <th>Dải nhiệt độ</th>
      <th>Tiêu chuẩn chính</th>
      <th>Mức an toàn / Bảo mật</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>General-purpose</strong></td>
      <td>Ứng dụng đa mục đích, cân bằng giữa chi phí và số lượng peripheral</td>
      <td>Tùy dòng</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>Commercial</strong></td>
      <td>Ứng dụng dân dụng, chi phí thấp</td>
      <td>0°C → 85°C</td>
      <td></td>
      <td>Không yêu cầu</td>
    </tr>
    <tr>
      <td><strong>IoT</strong></td>
      <td>Thiết bị IoT, ưu tiên tiêu thụ năng lượng thấp (Low-power) và kết nối không dây (Wireless Radio)</td>
      <td>-40°C → 85°C</td>
      <td>PSA / FIDO2</td>
      <td>Security-rated</td>
    </tr>
    <tr>
      <td><strong>Industrial</strong></td>
      <td>Hệ thống công nghiệp, yêu cầu độ tin cậy cao</td>
      <td>-40°C → 125°C</td>
      <td>IEC 61508</td>
      <td>SIL 1–3</td>
    </tr>
    <tr>
      <td><strong>Automotive</strong></td>
      <td>Hệ thống điện tử trên xe, an toàn chức năng nghiêm ngặt</td>
      <td>-40°C → 150°C</td>
      <td>ISO 26262 + AEC-Q100</td>
      <td>Lên đến ASIL-D</td>
    </tr>
  </tbody>
</table>

**MCU Automotive** phải đáp ứng yêu cầu vượt xa thiết bị commercial hoặc industrial. Danh sách các yêu cầu bắt buộc:
- **AEC-Q100 qualification**: kiểm tra stress gồm chu trình nhiệt -40°C đến 150°C, độ ẩm và ESD.
- **ISO 26262 functional safety**: lên đến ASIL-D cho các hệ thống đòi hỏi cao nhất (*ví dụ các ECU an toàn quan trọng như powertrain, ADAS, điều khiển động cơ xe điện EV*).
- **Độ tin cậy vòng đời 15 năm**: vượt xa tiêu chuẩn 10 năm của industrial.
- **Thực thi deterministic real-time**: không được bỏ lỡ deadline cứng trong vòng lặp điều khiển an toàn.

<details markdown="block">
<summary><i>Giải thích các thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>AEC-Q100</strong></td>
>       <td>Tiêu chuẩn đánh giá độ tin cậy của các IC sử dụng trong automotive về chu trình nhiệt, độ ẩm, ESD (Electrostatic Discharge - hiện tượng phóng tĩnh điện hoặc xả tĩnh điện).</td>
>     </tr>
>     <tr>
>       <td><strong>ISO 26262</strong></td>
>       <td>Tiêu chuẩn Functional Safety dành cho hệ thống điện và điện tử trên phương tiện giao thông đường bộ.</td>
>     </tr>
>     <tr>
>       <td><strong>ASIL-D (Automotive Safety Integrity Level D)</strong></td>
>       <td>Cấp độ ASIL cao nhất trong ISO 26262.</td>
>     </tr>
>     <tr>
>       <td><strong>IEC 61508</strong></td>
>       <td>Tiêu chuẩn Functional Safety cho các hệ thống điện, điện tử và điện tử lập trình được liên quan đến an toàn.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

---

## 5.9. Phân loại MCU dựa trên dải nhiệt độ

Operating Temperature Range là tiêu chí áp dụng xuyên suốt các nhóm MCU, không phải một nhánh phân loại độc lập.

<table class="hover-table">
  <thead>
    <tr>
      <th>Loại</th>
      <th>Operating Temperature Range</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Commercial</strong></td>
      <td>0°C đến 85°C</td>
    </tr>
    <tr>
      <td><strong>Industrial</strong></td>
      <td>-40°C đến 125°C</td>
    </tr>
    <tr>
      <td><strong>Automotive</strong></td>
      <td>-40°C đến 150°C</td>
    </tr>
  </tbody>
</table>

---


# 6. Ưu và nhược điểm của MCU

## 6.1. Ưu điểm

- Thời gian xử lý ngắn (CPU và các peripheral được tích hợp trên cùng chip, giúp giảm thời gian giao tiếp giữa các thành phần và phù hợp với các tác vụ điều khiển thời gian thực).
- Dễ sử dụng, bảo trì và khắc phục sự cố (mức độ tích hợp cao giúp giảm số lượng IC và kết nối bên ngoài, từ đó đơn giản hóa hardware và troubleshooting).
- Có thể thực hiện nhiều tác vụ tự động (MCU có thể thực hiện đồng thời hoặc tuần tự nhiều tác vụ điều khiển thông qua interrupt, timer và peripheral mà không cần sự can thiệp liên tục của con người).
- Kích thước và chi phí hệ thống thấp do CPU, Flash/ROM, RAM và nhiều peripheral được tích hợp trong một chip (giảm diện tích PCB, độ phức tạp phần cứng và chi phí BOM).
- Có thể mở rộng bộ nhớ và I/O (có thể kết nối external RAM, ROM/Flash và các I/O/peripheral thông qua các interface phù hợp, tùy khả năng của từng MCU).
- Có thể lập trình và tái lập trình (nhiều MCU hiện đại sử dụng Flash memory nên có thể được erase và reprogram nhiều lần; một số MCU/OTP device có giới hạn hoặc không hỗ trợ reprogramming).

<details markdown="block">
<summary><i>Chi phí BOM</i></summary>

> **Chi phí BOM (Bill of Materials cost)** là tổng chi phí của tất cả các nguyên liệu, linh kiện và phụ tùng cần thiết để tạo ra một sản phẩm hoàn chỉnh theo bảng BOM. Chỉ số này giúp doanh nghiệp biết chính xác số tiền cần dùng để mua vật tư đầu vào cho mỗi đơn vị sản phẩm.
{: .codeBlock }
</details>



<details markdown="block">
<summary><i>OTP</i></summary>

> **One-Time Programmable microcontroller (OTP microcontroller)** là loại vi điều khiển chỉ cho phép nạp chương trình (firmware) đúng một lần duy nhất trong suốt vòng đời hoạt động. Phù hợp cho các thiết bị tiêu dùng giá rẻ, sản xuất hàng loạt.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Tape-out</i></summary>

> Trong thiết kế vi mạch, **tape-out** là thời điểm hoàn thành giai đoạn thiết kế chip và gửi bản thiết kế cuối cùng (thường dưới dạng tệp GDSII hoặc OASIS chứa dữ liệu hình học) đến nhà máy sản xuất (foundry) để chế tạo mặt nạ quang học và sản xuất tấm silicon (wafer).
{: .codeBlock }
</details>

---

## 6.2. Nhược điểm

- Thường được sử dụng cho các thiết bị và hệ thống quy mô nhỏ (phù hợp với embedded control, sensor, actuator, appliance và các hệ thống có yêu cầu tính toán vừa phải).
- Cấu trúc và chức năng tích hợp có thể phức tạp (một MCU hiện đại có nhiều peripheral, clock domain, interrupt, DMA, communication interface và configuration register cần quản lý).
- Không thể trực tiếp điều khiển tải công suất lớn (GPIO của MCU thường chỉ cung cấp dòng/điện áp giới hạn; tải lớn cần transistor, MOSFET, relay hoặc power driver làm tầng giao tiếp).
- Tài nguyên tính toán và bộ nhớ bị giới hạn (CPU performance, Flash, RAM, số lượng peripheral và I/O phụ thuộc vào từng dòng MCU).
- Không phải MCU nào cũng có Analog I/O (ADC, DAC hoặc analog comparator chỉ được tích hợp trên một số MCU; nếu không có, cần external analog IC).
- Có thể bị ảnh hưởng bởi tĩnh điện (ESD) (MCU sử dụng CMOS semiconductor nên các chân I/O và mạch bên trong có thể bị hư hỏng hoặc malfunction nếu chịu ESD vượt quá mức bảo vệ).

<details markdown="block">
<summary><i>CMOS</i></summary>

> **Complementary metal-oxide-semiconductors (CMOS)** là một loại công nghệ được dùng để chế tạo mạch tích hợp, đồng thời là tên gọi của một con chip nhớ nhỏ trên bo mạch chủ máy tính dùng để lưu trữ các thiết lập hệ thống quan trọng.
> 
> Chức năng chính của CMOS:
> **Lưu trữ thông tin khởi động**: Giữ lại các thiết lập phần cứng, thứ tự khởi động ổ cứng và cấu hình BIOS (Basic Input/Output System) ngay cả khi máy tính đã tắt nguồn.
> **Duy trì đồng hồ thời gian thực**: Giúp máy tính cập nhật chính xác ngày và giờ hệ thống liên tục qua thời gian.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>ESD</i></summary>

> **Electrostatic Discharge (ESD)** - hiện tượng phóng tĩnh điện hoặc xả tĩnh điện: là hiện tượng dòng điện chạy đột ngột và tức thời giữa hai vật có điện thế khác nhau khi chúng tiếp xúc hoặc đến gần nhau. Nguyên nhân là sự tích tụ điện tích trên bề mặt vật liệu (thường do ma sát, tiếp xúc và tách rời giữa các vật cách điện như nhựa, nilon).
{: .codeBlock }
</details>

---

# 7. Các vấn đề của MCU

Các vấn đề phổ biến có thể ảnh hưởng đến hoạt động và độ tin cậy của Microcontroller:

1. **Timing Issues**
- MCU yêu cầu timing chính xác để thực thi các tác vụ đúng cách.
- Sai lệch timing có thể gây malfunction, khó phát hiện và khắc phục.

2. **Power Issues**
- Yêu cầu nguồn điện ổn định.
- Power fluctuations hoặc voltage drops có thể khiến MCU ngừng hoạt động hoặc hoạt động không ổn định.

3. **Heat Issues**
- MCU sinh nhiệt trong quá trình hoạt động.
- Nhiệt độ quá cao có thể làm hỏng chip hoặc gây lỗi.
- Nguyên nhân có thể đến từ thiết kế không phù hợp, cooling kém hoặc nhiệt độ môi trường cao.

4. **Noise Issues**
- MCU có thể bị ảnh hưởng bởi Electromagnetic Interference (EMI) và Radio Frequency Interference (RFI) từ các thiết bị lân cận.
- Nhiễu có thể gây lỗi hoặc hành vi hoạt động bất thường.

5. **Code Issues**
- Software chạy trên MCU có thể chứa bugs hoặc errors.
- Có thể dẫn đến malfunction hoặc lỗi của toàn hệ thống.

6. **Security Issues**
- MCU có nguy cơ bị tấn công hoặc nhiễm malware.
- Các rủi ro bao gồm unauthorized access, data theft và attacker chiếm quyền điều khiển hệ thống.

7. **Compatibility Issues**
- MCU có thể không tương thích hoàn toàn với các hardware hoặc components khác.
- Có thể gây lỗi hoặc làm hệ thống hoạt động không ổn định.

<details markdown="block">
<summary><i>Giải thích các thuật ngữ</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><strong>Operating Voltage</strong></td>
>       <td>Điện áp hoạt động mà một IC hoặc MCU yêu cầu để vận hành bình thường.</td>
>     </tr>
>     <tr>
>       <td><strong>Malfunction</strong></td>
>       <td>Tình trạng thiết bị hoặc hệ thống hoạt động không đúng chức năng thiết kế, chẳng hạn xử lý sai dữ liệu hoặc ngừng phản hồi.</td>
>     </tr>
>     <tr>
>       <td><strong>Power Fluctuations</strong></td>
>       <td><strong>Nhấp nháy điện áp</strong>: hiện tượng nguồn điện thay đổi không ổn định theo thời gian, có thể tăng hoặc giảm so với mức điện áp danh định.</td>
>     </tr>
>     <tr>
>       <td><strong>Voltage Drops</strong></td>
>       <td><strong>Sụt áp</strong>: hiện tượng điện áp nguồn giảm xuống dưới mức bình thường hoặc mức yêu cầu, có thể khiến MCU hoạt động không ổn định hoặc reset.</td>
>     </tr>
>     <tr>
>       <td><strong>Cooling</strong></td>
>       <td>Quá trình tản nhiệt, giúp loại bỏ nhiệt sinh ra trong quá trình hoạt động của linh kiện, duy trì nhiệt độ trong giới hạn cho phép.</td>
>     </tr>
>     <tr>
>       <td><strong>Electromagnetic Interference (EMI)</strong></td>
>       <td>Nhiễu điện từ do các nguồn điện từ bên ngoài gây ra, có thể ảnh hưởng đến tín hiệu điện và hoạt động của MCU.</td>
>     </tr>
>     <tr>
>       <td><strong>Radio Frequency Interference (RFI)</strong></td>
>       <td>Nhiễu do các tín hiệu sóng vô tuyến (Radio Frequency) gây ra, có thể làm sai lệch tín hiệu hoặc ảnh hưởng đến hoạt động của thiết bị điện tử. RFI là một dạng nhiễu điện từ (EMI).</td>
>     </tr>
>     <tr>
>       <td><strong>Malware</strong></td>
>       <td><strong>Phần mềm độc hại</strong>: được thiết kế để xâm nhập, phá hoại, đánh cắp dữ liệu hoặc chiếm quyền điều khiển hệ thống.<br><i>(Malware là viết tắt của Malicious software)</i>.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

---

# 8. Ví dụ một số MCU

## 8.1. ATmega328P (Microchip / Atmel)

ATmega328P là một trong những MCU 8-bit phổ biến và "huyền thoại" nhất trong cộng đồng điện tử. Nó chính là "trái tim" của Arduino Uno - nền tảng đã giúp hàng triệu người trên thế giới bắt đầu học lập trình phần cứng một cách dễ dàng. Với thiết kế đơn giản, ổn định và cộng đồng hỗ trợ cực lớn, ATmega328P vẫn được sử dụng rộng rãi trong các dự án giáo dục và prototyping cho đến nay.

Thành phần chính:
- Core: 8-bit AVR RISC, tốc độ tối đa ~16–20 MHz.
- Bộ nhớ: 32 KB Flash, 2 KB SRAM, 1 KB EEPROM.
- Ngoại vi: 23 GPIO, 6–8 kênh ADC 10-bit, 3 Timer/Counter, USART, SPI, I2C (TWI), PWM, Watchdog.
- Điện áp: 1.8–5.5 V.

Ứng dụng phổ biến: Giáo dục, prototyping nhanh, robot đơn giản, điều khiển cảm biến, dự án Arduino (đèn LED, motor DC, sensor nhiệt độ/độ ẩm).

Tìm hiểu thêm:

[1] [Microchip, "ATmega328P"](https://www.microchip.com/en-us/product/ATmega328P)

[2] [DroneBot Workshop, "From Arduino Uno to ATmega328 – Shrinking your Arduino Projects"](https://dronebotworkshop.com/arduino-uno-atmega328/)

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\ATmega328P_in_Arduino_Uno.png"
    style="width: 75%; height: auto;"
  />
  <figcaption>Một Arduino Uno board được xây dựng trên chip ATmega328
  </figcaption>
</figure>

---

## 8.2. STM32F103C8T6

STM32F103C8T6 (thường được gọi thân mật là "Blue Pill") là đại diện tiêu biểu của dòng STM32 – gia đình vi điều khiển ARM Cortex-M được tin dùng rộng rãi trong công nghiệp. Với hiệu năng 32-bit mạnh mẽ, ngoại vi phong phú và độ tin cậy cao, nó trở thành lựa chọn ưa thích cho các ứng dụng đòi hỏi thời gian thực và ổn định lâu dài.

Thành phần chính: ARM Cortex-M3 72 MHz, 64 KB Flash, 20 KB SRAM, USB, CAN, nhiều Timer/PWM, ADC 12-bit, USART, SPI, I2C.

Ứng dụng phổ biến: Điều khiển motor, thiết bị công nghiệp, PLC nhỏ, y tế cầm tay, robotics chuyên nghiệp.

Tìm hiểu thêm:

[1] [STMicroelectronics, "STM32F103C8"](https://www.st.com/en/microcontrollers-microprocessors/stm32f103c8.html#overview)

[2] [Github, zst-embedded, "STM32F103C8T6 Learning Projects"](https://github.com/zst-embedded/STM32F103C8T6-Learning_Projects)

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\STM32F103_Pinout_Diagram.png"
    style="width: 75%; height: auto;"
  />
  <figcaption>STM32F103 Pinout Diagram<br>
  Nguồn: <a href="https://www.instructables.com/How-to-Program-STM32F103C8T6-With-ArduinoIDE/" target="_blank">Instructables, "How to Program STM32F103C8T6 With ArduinoIDE"</a>
  </figcaption>
</figure>

---

## 8.3. RP2040

RP2040 là vi điều khiển đầu tiên do chính Raspberry Pi thiết kế và sản xuất. Ra mắt năm 2021 cùng với board Pico, nó gây ấn tượng mạnh nhờ giá rẻ, dual-core mạnh mẽ và đặc biệt là hệ thống PIO (Programmable I/O) cực kỳ linh hoạt – cho phép tạo ra các giao thức phần cứng tùy chỉnh mà không cần chip hỗ trợ bên ngoài. Đây là lựa chọn tuyệt vời cho cả người mới bắt đầu và lập trình viên chuyên nghiệp.

Thành phần chính: Dual-core ARM Cortex-M0+ (133 MHz), 264 KB SRAM, hỗ trợ Flash ngoài, 30 GPIO, 8 PIO state machines, USB, PWM, ADC,...

Ứng dụng phổ biến: Giáo dục, custom I/O, LED matrix, audio, sensor hub, prototyping với MicroPython.

Tìm hiểu thêm:

[1] [Raspberry Pi, "RP2040"](https://www.raspberrypi.com/products/rp2040/)

[2] [Random Nerd Tutorials, "Raspberry Pi Pico and Pico W Projects, Tutorials and Guides"](https://randomnerdtutorials.com/projects-raspberry-pi-pico/)

[3] [Github, raspberrypi, "Raspberry Pi Pico SDK Examples"](https://github.com/raspberrypi/pico-examples)


<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Raspberry-Pi-Pico-pinout-diagram.svg"
  />
  <figcaption>Raspberry Pi Pico Pinout<br>(Raspberry Pi Pico là một bo mạch hiệu năng cao, giá thành thấp, dựa trên chip vi điều khiển Raspberry Pi RP2040)<br>
  Nguồn: <a href="https://microcontrollerslab.com/raspberry-pi-pico-pinout-features-programming-peripherals/" target="_blank">Microcontrollerslab, "Raspberry Pi Pico Pinout Reference – Which GPIO Pin to use?"</a>
  </figcaption>
</figure>

---

# Tham khảo

[1] [GeeksForGeeks, "Microcontroller and its Types"](https://www.geeksforgeeks.org/digital-logic/microcontroller-and-its-types/)

[2] [Infineon, "Types of microcontrollers: families and classifications explained"](https://www.infineon.com/product-information/types-of-microcontrollers-families-and-classifications-explained#classified)

[3] [Renesas, "MCU Basic Structure/Operation"](https://www.renesas.com/en/support/engineer-school/mcu-01-basic-structure-operation?srsltid=AYCX9vK2Q37rVrdl0qlur5jRj2v7-OMvasLRrtn_5ooK49OEZl5A3x5q)

[4] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[5] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)

<!-- 

Multicore Microcontrollers

(MCU multi-core architecture overview)

https://promwad.com/news/multi-core-microcontrollers-embedded-design

https://www.renesas.com/en/support/engineer-school/mcu-01-basic-structure-operation?srsltid=AYCX9vK2Q37rVrdl0qlur5jRj2v7-OMvasLRrtn_5ooK49OEZl5A3x5q

https://www.digikey.de/de/articles/multicore-microcontrollers-drive-performance?srsltid=AYCX9vLRGOIPOk96gfz9gNY3RFXg4jZYuwE1sjH5pXZmF4wtu1iChOHV


Memory map

https://questdb.com/glossary/memory-mapping/




TC3xx


https://documentation.infineon.com/aurixtc3xx/docs/ajd1702558801172


 -->
