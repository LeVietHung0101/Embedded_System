---
title: MCU
parent: IC
nav_order: 2
---

<h1>Microcontroller Unit (MCU)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. MCU là gì?

**Microcontroller unit (MCU / µC / uC)**: Vi điều khiển là một máy tính thu nhỏ nằm trên một mạch tích hợp (Integrated Circuit - IC), bao gồm lõi vi xử lý (processor core), bộ nhớ, các thiết bị ngoại vi I/O có thể lập trình, timer, counter,... MCU chỉ cung cấp dung lượng bộ nhớ, các giao diện và năng lực xử lý ở mức tối thiểu. Các thiết bị ngoại vi tích hợp trên MCU thường mang tính tổng quát hơn so với các gói SoC. MCU thường được sử dụng cho các hệ thống điều khiển nhúng quy mô nhỏ hoặc các ứng dụng điều khiển.

Các thành phần cơ bản của MCU:
- **CPU**: thực thi các lệnh.
- **Memory**: lưu trữ dữ liệu và các lệnh.
- **I/O port**: kết nối MCU với các thiết bị khác.
- **Timers**: đo khoảng thời gian.
- **Analog-to-digital converter (ADC)**: chuyển đổi tín hiệu tương tự sang tín hiệu số.
- **Digital-to-analog converter (DAC)**: chuyển đổi tín hiệu số sang tín hiệu tương tự.

---

# 2. Ưu và nhược điểm của MCU

## 2.1. Ưu điểm

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

## 2.2. Nhược điểm

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

# 3. Ứng dụng

- Các thiết bị phát hiện và điều khiển ánh sáng.
- Các thiết bị được sử dụng trong công nghiệp.
- Các thiết bị dùng cho process control.
- Các thiết bị được sử dụng trong công nghiệp.
- Đo lường các vật thể quay.
- Current gauge.
- Các thiết bị đo lường di động.


---

# 4. Ví dụ một số MCU

## 4.1. ATmega328P (Microchip / Atmel)

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

## 4.2. STM32F103C8T6

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

## 4.3. RP2040

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

[1] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[2] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)