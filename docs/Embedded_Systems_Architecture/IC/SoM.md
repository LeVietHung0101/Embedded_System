---
title: SoM
parent: IC
nav_order: 5
---

<h1>System on Module (SoM)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. SoM là gì?

{: .note }
**System-on-Module (SoM / SOM)**: là một module nhỏ gọn ở cấp độ board, tích hợp một SoC cùng các thành phần hỗ trợ như memory, power management, wireless interfaces và các I/O interfaces, tạo thành một hệ thống hoàn chỉnh trên một module.

```c
SoM = SoC + Memory + Power Management + Interfaces + Other additional supporting components
```

SoM được thiết kế để cắm hoặc hàn lên một carrier board (hoặc baseboard). Carrier board cung cấp các connectors, peripherals, power supply và interfaces dành riêng cho ứng dụng cụ thể. SoM không phải là một sản phẩm hoàn chỉnh; nó cần kết hợp với carrier board để kết nối với các thiết bị và hệ thống bên ngoài.

Các thành phần phổ biến của SoM:
- **CPU**: thường sử dụng ARM-based processor hoặc x86 processor.
- **On-board Memory**: RAM và Flash.
- **Wireless Interfaces**: Wi-Fi, Bluetooth và cellular modules.
- **Wired Interfaces**: USB, Ethernet, PCIe, CAN, serial ports.
- **I/O Interfaces**: DisplayPort, HDMI, camera interfaces, sensor interfaces.
- **Carrier Board Interfaces**: connectors hoặc pins để kết nối với carrier board.
- **Power Management ICs (PMICs)**: quản lý power supply và power distribution.
- **Operating System (OS)**: Linux, Android, Ubuntu, RTOS.
- **Cooling Solutions**: bộ tản nhiệt (heat sinks) hoặc các giải pháp quản lý nhiệt để xử lý vấn đề tản nhiệt.

<details markdown="block">
<summary><i>Cellular modules</i></summary>

> **Cellular modules** là các module phần cứng cung cấp khả năng kết nối với mạng di động (cellular network) như 4G LTE, 5G để thiết bị có thể truyền và nhận dữ liệu không dây thông qua mạng của nhà mạng. Một cellular module thường tích hợp cellular modem, SIM/eSIM interface và các mạch hỗ trợ RF, đồng thời cung cấp các giao tiếp như UART, USB hoặc PCIe để hệ thống chính giao tiếp với module. Trong SoM, cellular module cho phép thiết bị kết nối Internet hoặc các dịch vụ từ xa mà không cần kết nối Wi-Fi cố định.
{: .codeBlock }
</details>

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\SOMblk.png"
  />
  <figcaption>SoM block diagram example<br>
  Nguồn: <a href="https://commons.wikimedia.org/w/index.php?curid=46517006" target="_blank">By Jamesm7 - Own work, CC BY-SA 4.0</a>
  </figcaption>
</figure>

---

# 2. Ứng dụng

SoM thường được sử dụng trong:

- **Industrial automation****:** SoM được đánh giá cao nhờ độ bền và khả năng tích hợp nhanh vào các hệ thống. Cho phép phát triển và triển khai nhanh các máy móc có khả năng monitoring và control tiên tiến.

- **Medical****:** SoM giúp đơn giản hóa quá trình phát triển các thiết bị nhỏ gọn, đáng tin cậy và hiệu quả, chẳng hạn như thiết bị chẩn đoán di động và [patient monitoring systems](https://www.ezurio.com/resources/blog/top-applications-of-the-internet-of-medical-things-iomt-in-healthcare), đồng thời cung cấp các modules đã được pre-certified và tested.

- **Gaming****:** Gaming systems được hưởng lợi từ SoM nhờ khả năng xử lý và đồ họa được tăng cường trong một kích thước nhỏ gọn (compact form factor), phù hợp với các gaming consoles chuyên dụng có hiệu năng cao.

- **IoT devices****:** SoM phù hợp với các thiết bị "smart" hoạt động trong IoT, vì chúng cung cấp một giải pháp linh hoạt và có khả năng mở rộng, đơn giản hóa việc tích hợp các tính năng connectivity, computing và security trong các môi trường được kết nối với nhau, từ home automation đến building applications.

Các sản phẩm thực thế:
- [Open Standard Modules (OSM)](https://www.ezurio.com/system-on-module/osm-som): Dòng **SoM** theo chuẩn **Open Standard Module (OSM)**, cung cấp một module nhỏ gọn với các thành phần xử lý và giao tiếp cần thiết. Thiết kế theo chuẩn mở giúp module có thể được tích hợp vào nhiều loại carrier board khác nhau.

- [MediaTek Genio powered SMARC SOMs](https://www.ezurio.com/system-on-module/mediatek-genio): Dòng **SMARC SOMs** sử dụng **MediaTek Genio** làm nền tảng xử lý, hướng đến các hệ thống embedded cần khả năng xử lý và kết nối cao. Dòng sản phẩm này phù hợp với các ứng dụng yêu cầu form factor nhỏ gọn.

- [NXP's i.MX powered SMARC SOMs](https://www.ezurio.com/partners/silicon-partners/nxp): Dòng **SMARC SOMs** sử dụng các **NXP i.MX processors**, cung cấp nền tảng xử lý cho các **embedded systems**. Thiết kế dạng SoM cho phép kết hợp module xử lý với carrier board được tùy biến theo từng ứng dụng.

--- 

# 3. Ưu điểm

## Lợi ích của SoM

1. **Đơn giản hóa và rút ngắn thời gian thiết kế**: Ưu điểm lớn nhất của SoM là đơn giản hóa và tăng tốc quá trình thiết kế. Các kỹ sư có thể bắt đầu với một module có sẵn, tích hợp các phần phức tạp của hệ thống, qua đó giảm đáng kể công sức cần thiết cho hardware design. Tất cả những thách thức về high-speed memory layout, wireless RF design, power sequencing đều đã được xử lý trên module. Điều này cho phép các development teams tích hợp SoM và tập trung nhiều hơn vào application logic của riêng họ. Nhờ đó, sản phẩm có thể được prototype và đưa ra thị trường nhanh hơn đáng kể (*shorter development cycle*).

2. **Giảm rủi ro trong quá trình phát triển**: Module được pre-validated và thường được pre-certified cho các yêu cầu như tuân thủ các tiêu chuẩn đối với kết nối không dây, nhiễu điện từ (EMI) và đôi khi cả dải nhiệt độ hoạt động công nghiệp. *Ví dụ, một SoM tích hợp Wi-Fi/Bluetooth có thể đã có FCC/CE certifications, giúp tiết kiệm quá trình chứng nhận radio cho thiết bị vốn tốn nhiều thời gian và chi phí*. SoM vendor thường cung cấp Board Support Package (BSP) cùng với drivers và OS được tối ưu cho phần cứng, nhờ đó giảm thời gian debugging các vấn đề ở mức phần cứng và dành nhiều thời gian hơn cho việc phát triển application. Tóm lại, SoM cho phép tập trung vào firmware và software development bằng cách loại bỏ phần lớn công việc phần cứng phức tạp.

3. **Tính linh hoạt và khả năng mở rộng**: Do SoM có tính modular, có thể thay thế bằng một SoM khác để nâng cấp CPU hoặc bổ sung memory mà không cần thiết kế lại toàn bộ board. Điều này hữu ích cho việc future-proofing hoặc tạo ra các product variants. Khi yêu cầu thiết kế thay đổi, có thể chỉ cần thay SoM bằng một module mới hơn, tương thích về pins, thay vì phải thiết kế lại một PCB hoàn toàn mới. Tính modular này có thể kéo dài vòng đời của các thiết bị công nghiệp/y tế bằng cách cho phép thực hiện các nâng cấp từng bước.

<details markdown="block">
<summary><i>EMI</i></summary>

> Electromagnetic interference (EMI).
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
<summary><i>FCC/CE certifications</i></summary>

> **FCC/CE certifications** là các chứng nhận/đánh dấu tuân thủ quy định kỹ thuật thường được yêu cầu khi một thiết bị điện tử được đưa ra thị trường, đặc biệt với Wireless/IoT/SoM.
> 
> **FCC – Federal Communications Commission**: Ủy ban Truyền thông Liên bang của Mỹ. Đối với thiết bị điện tử/wireless, FCC chủ yếu kiểm soát việc thiết bị:
> - Không gây nhiễu điện từ (EMI) quá mức.
> - Không phát xạ RF vượt giới hạn cho phép.
> - Với thiết bị có radio transmitter, phải đáp ứng các yêu cầu RF tương ứng.
> 
> *Ví dụ: một Wi-Fi/Bluetooth SoM có thể cần FCC compliance trước khi sản phẩm cuối được bán tại Mỹ.*
>
> **CE – Conformité Européenne**: không phải đơn giản là một "chứng nhận" do một cơ quan duy nhất cấp. Đây là dấu CE (CE marking) cho biết nhà sản xuất tuyên bố sản phẩm đáp ứng các yêu cầu pháp lý áp dụng của EU.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Future-proofing</i></summary>

> **Future-proofing** là việc thiết kế sản phẩm/hệ thống sao cho có khả năng thích ứng với các công nghệ, tiêu chuẩn hoặc yêu cầu mới trong tương lai, hạn chế việc phải thay thế toàn bộ hệ thống.
{: .codeBlock }
</details>

---

# Tham khảo

[1] [Ezurio, "System on Module vs. System on Chip: What's the Difference?"](https://www.ezurio.com/resources/blog/system-on-module-vs-system-on-chip-what-s-the-difference?srsltid=AfmBOoqoQqondv2QBXF7QxDhUDhTbvlN0ji6dSEDeitY6WbpwfbYltQf) 