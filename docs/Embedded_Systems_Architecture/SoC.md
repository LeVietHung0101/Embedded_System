---
title: SoC
parent: Embedded Systems Architecture
nav_order: 30
---

<h1>System on a Chip (SoC)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. SoC là gì?

{: .note }
> **System on a Chip (SoC)** là một mạch tích hợp (Integrated Circuit - IC) kết hợp tất cả các thành phần thiết yếu của hệ thống vào một tấm silicon duy nhất, loại bỏ nhu cầu về các bộ phận hệ thống riêng biệt, cồng kềnh. Sự tích hợp này đơn giản hóa thiết kế circuit board và mang lại hiệu quả năng lượng và tốc độ được cải thiện mà không làm giảm chức năng.

Trong ngành điện tử, ưu tiên luôn là *"hiệu năng cao hơn, ít năng lượng hơn và ít không gian hơn"*. Điều này cực kỳ quan trọng đối với các thiết bị di động như tablets và smartphones, nơi công nghệ tiên tiến phải vừa vặn trong không gian nhỏ nhất có thể và tiêu thụ năng lượng tối thiểu. Bằng cách tích hợp tất cả các yếu tố cần thiết vào một mạch duy nhất, các SoC cho phép các kỹ sư tạo ra các thiết bị vừa nhỏ gọn vừa có nhiều tính năng.

Các SoC nhỏ gọn đã trở thành các giải pháp không thể thiếu trên các thị trường khác nhau, từ các ứng dụng có dây như data centers, AI và high-performance computing (HPC) cho đến các thiết bị chạy bằng pin như mobile phones và wearables.

---

# 2. Lịch sử của SoC

**Giai đoạn 1970**: Theo [Computer History Museum (CHM)](https://computerhistory.org/)), SoC đầu tiên xuất hiện trong một chiếc đồng hồ LCD vào năm 1974. Cho đến lúc đó, các vi xử lý (microprocessors) chỉ là các con chip độc lập đòi hỏi sự hỗ trợ của các con chip bên ngoài.

**Giai đoạn 1980-90**: Những tiến bộ trong công nghệ sản xuất chất bán dẫn đã làm cho việc tích hợp nhiều thành phần hơn trên một con chip duy nhất trở nên khả thi. Sự tích hợp tín hiệu hỗn hợp (mixed-signal integration) cho phép các con chip xử lý cả tín hiệu tương tự (analog) và tín hiệu số (digital).

**Giai đoạn 2000-2010**: SoC bắt đầu tích hợp Wi-Fi, Bluetooth và modem di động (cellular modems), mang lại khả năng giao tiếp không dây cho các thiết bị di động. Việc bổ sung các bộ xử lý mạnh mẽ và khả năng đồ họa đã giúp smartphones trở thành một lối sống mới.

**Hiện tại**: SoC đang ngày càng trở nên chuyên biệt hóa và đang mở rộng phạm vi ứng dụng, vượt ra ngoài thiết bị di động, bao gồm các hệ thống ô tô (automotive systems), thiết bị đeo (wearable devices), tự động hóa công nghiệp (industrial automation),... Các tính năng mới bao gồm AI, machine learning (ML) và điện toán biên (edge computing).

Đọc thêm: [Computer History Museum, "1974: Digital Watch is First System-On-Chip Integrated Circuit"](https://www.computerhistory.org/siliconengine/digital-watch-is-first-system-on-chip-integrated-circuit/)

---

# 3. Các thành phần và Cấu trúc của SoC

**System on a Chip (SoC)** chứa hầu như tất cả các khối mạch chức năng cần thiết cho một hệ thống hoàn chỉnh trên một con chip duy nhất. Các thành phần có trên bất kỳ SoC nào bao gồm:

- **Cores**: Bộ xử lý đơn hoặc đa lõi dưới dạng microcontroller, microprocessor, digital signal processor (DSP) hoặc application-specific instruction set processor. **Multiprocessor System called multiprocessor System-on-Chip (MPSoC)** có nhiều hơn một processor core.

- **Memory blocks**: RAM, ROM, FLASH, EEPROM và/hoặc cache memory.

- **External Interfaces**: cho các giao thức truyền thông có dây như USB, FireWire, USART, SPI, I2C, Ethernet.

- **Wireless Capabilities**: cho các giao thức truyền thông không dây như WiFi hoặc Bluetooth và các khả năng tần số vô tuyến khác.

- **Graphical Processing Unit (GPU)**: để tăng tốc các tác vụ cụ thể.

- **Timing sources**: mạch vòng khóa pha (PLL - phase-locked loops), bộ dao động (oscillators).

- **Peripherals**: bộ định thời (counter-timers, real-time timers), bộ tạo tín hiệu khởi động nguồn (power-on reset generator).

- **Analog interfaces**: Bộ chuyển đổi tín hiệu ADC (Analog-to-Digital Converter) và DAC (Digital-to-Analog Converter).

- **Signal Processing**: Khối mạch xử lý tín hiệu digital, analog và mixed-signal cho bất kỳ sensors, actuators, thu thập dữ liệu và phân tích dữ liệu nào.

- **Intra-chip Communication**: hệ thống truyền thông nội chip kết nối các khối mạch riêng lẻ qua interface bus (chẳng hạn như bus độc quyền hoặc chuẩn công nghiệp *AMBA* của ARM) hoặc mạng liên lạc nội bộ mới hơn gọi là *networks-on-chip (NoC)*. Trong đó, các DMA controllers định tuyến dữ liệu trực tiếp giữa các giao diện ngoài và bộ nhớ, không cần sự can thiệp của processor core nhằm tăng data throughput của SoC.

- Các bộ điều chỉnh điện áp (voltage regulators) và mạch quản lý nguồn.


<details markdown="block">
<summary><i>AMBA</i></summary>

> **Advanced Microcontroller Bus Architecture (AMBA)** là một bộ tiêu chuẩn thiết kế bus được phát triển bởi ARM vào năm 1996. Nó được sử dụng để kết nối và quản lý việc truyền dữ liệu giữa các khối chức năng (IP Cores) khác nhau bên trong một chip System-on-Chip (SoC). Nói một cách đơn giản, nếu một vi mạch SoC giống như một thành phố thu nhỏ, thì AMBA chính là hệ thống đường giao thông và luật lệ phân luồng, giúp các bộ phận như CPU, GPU, bộ nhớ (RAM) và các ngoại vi (USB, Wi-Fi) có thể giao tiếp với nhau một cách trơn tru, tốc độ cao và không bị xung đột.
>
> Kiến trúc AMBA bao gồm nhiều giao thức bus khác nhau, được tối ưu hóa cho từng mục đích sử dụng cụ thể trong chip:
> - **AXI (Advanced eXtensible Interface)**: Đây là giao thức bus hiệu năng cao nhất trong hệ sinh thái AMBA. Nó hỗ trợ truyền dữ liệu song song, đa luồng, tốc độ cực cao, thường được dùng để kết nối CPU, GPU và bộ nhớ RAM.
> - **AHB (Advanced High-performance Bus)**: Giao thức bus thế hệ cũ hơn AXI nhưng vẫn có hiệu năng cao. Hiện nay nó thường đóng vai trò là bus trung gian để kết nối các thành phần cần băng thông vừa phải.
> - **APB (Advanced Peripheral Bus)**: Giao thức bus đơn giản, tiêu thụ ít năng lượng và có tốc độ thấp hơn. Nó chuyên dùng để kết nối các linh kiện ngoại vi không đòi hỏi tốc độ cao như Timer, cổng UART, hay các bộ điều khiển cấu hình.
> - **CHI (Coherent Hub Interface) & ACE (AXI Coherency Extensions)**: Các kiến trúc bus hiện đại thuộc AMBA giúp quản lý tính đồng nhất dữ liệu (Cache Coherency) trong các hệ thống chip Multi-core phức tạp.
> 
> *Tại sao AMBA lại trở thành tiêu chuẩn công nghiệp?*
> - **Tính chuẩn hóa (Standardization)**: Giúp các kỹ sư thiết kế chip dễ dàng tích hợp các khối chức năng từ nhiều nhà cung cấp khác nhau vào cùng một chip mà không lo bị lệch chuẩn giao tiếp.
> - **Hiệu năng và Tiết kiệm điện**: Tách biệt rõ ràng giữa bus tốc độ cao (cho CPU/RAM) và bus tốc độ thấp (cho ngoại vi) giúp tối ưu hóa điện năng và băng thông hệ thống.
> - **Tái sử dụng thiết kế (Reusability)**: Các nhà phát triển có thể tái sử dụng các IP core cũ trên các dòng chip mới mà không cần thiết kế lại giao diện kết nối.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>DMA controller</i></summary>

> **DMA controller (Bộ điều khiển truy cập bộ nhớ trực tiếp)** là một phần cứng chuyên dụng quản lý việc truyền dữ liệu giữa các thiết bị ngoại vi và bộ nhớ RAM mà không cần sự can thiệp của CPU.
{: .codeBlock }
</details>




Với công nghệ SoC, các kỹ sư có thể giảm lãng phí năng lượng, tiết kiệm chi phí và thu nhỏ hơn nữa các thiết bị thông qua các phương pháp tích hợp tiên tiến trên một IC duy nhất. Do các đặc tính nhỏ gọn và tiết kiệm năng lượng, các nhà sản xuất đang kết hợp SoC vào các IoT devices, embedded systems mới và thậm chí cả ô tô (automobiles).

Hơn nữa, chúng ta cũng chứng kiến sự chuyển dịch trong công nghệ SoC được sử dụng trên personal computers và laptops để giảm hơn nữa lượng tiêu thụ điện năng và cải thiện hiệu năng. Không gian mạch ít hơn thường dẫn đến ít sinh nhiệt hơn, tiêu thụ ít điện năng hơn và chi phí sản xuất thấp hơn. Điều này cho phép thiết kế thiết bị hiệu quả hơn cho việc phân phối nhiệt, độ trễ tối thiểu và tăng tốc truyền dữ liệu.

Vì SoC có tính chuyên môn hóa cao, chúng thường được ứng dụng trong các tác vụ mang tính cá nhân hóa/riêng biệt. **Custom SoCs** hiện đang được phát triển cho các ứng dụng cụ thể như tăng cường machine learning, các tính năng AI nâng cao và high-performance cloud computing với xử lý dữ liệu nhanh hơn. SoC có thể thực hiện nhiều phép tính dưới dạng một hoạt động phân tán (thay vì khả năng song song hạn chế được cung cấp bởi các CPU truyền thống) để tăng tốc các phép tính hơn nữa. Vì lý do này, nhiều công ty hiện đang đầu tư vào việc tự phát triển custom SoCs của riêng họ để hỗ trợ các nhu cầu xử lý dữ liệu và tín hiệu tiên tiến của họ.

---

# 4. Ứng dụng của SoC

Nhờ khả năng tùy chỉnh cho các yêu cầu có độ chuyên môn hóa cao, SoC có thể được sử dụng trong nhiều ứng dụng khác nhau, từ đồ chơi trẻ em và camera chuông cửa cho đến động cơ công nghiệp. Một số ứng dụng của SoC bao gồm:

- **Mobile devices**: SoC tích hợp khả năng kết nối không dây và đa phương tiện trong smartphones và tablets.

- **Automotive systems**: Các loại phương tiện giao thông sử dụng SoC để vận hành navigation systems, sensor interfaces, infotainment systems và danger avoidance systems.

- **Internet of Things (IoT)**: Rất hiệu quả trong các trường hợp sử dụng công suất thấp (low power), SoC được sử dụng rộng rãi trong các IoT devices như wearables và smart home monitors.

- **Networking equipment**: Trong routers, switches và network appliances, SoC tích hợp khả năng xử lý gói tin, tính năng bảo mật và các thành phần chuyên biệt để định tuyến dữ liệu hiệu quả.

- **Consumer electronics**: SoC cung cấp sức mạnh xử lý đồ họa và khả năng kết nối cho nhiều loại thiết bị đa phương tiện phổ biến, chẳng hạn như gaming consoles và digital media player.

- **Industrial applications**: SoC cho phép khả năng xử lý real-time, kết nối và giao tiếp, góp phần tạo ra các giải pháp công nghiệp hiệu quả và thông minh.

- **Medical devices**: SoC hỗ trợ cải thiện việc chăm sóc bệnh nhân bằng cách nâng cao sức mạnh xử lý và khả năng kết nối của hệ thống theo dõi bệnh nhân, thiết bị chẩn đoán và thiết bị cấy ghép.

---

# 5. Ưu và nhược điểm của SoC

Việc tích hợp nhiều thành phần lên một con chip duy nhất mang lại vô số lợi ích. Nhưng khi xác định xem SoC có phải là giải pháp phù hợp cho một thiết bị hay không, những lợi ích này phải được cân nhắc kỹ lưỡng với các thách thức của một thiết kế phức tạp như vậy.

## 5.1. Ưu điểm

- **Tối ưu hoá không gian**: SoC chiếm ít không gian hơn so với nhiều linh kiện rời (discrete components), giúp hiện thực hóa việc thiết kế các thiết bị nhỏ hơn.
- **Hiệu suất năng lượng**: Việc thay thế các linh kiện và mạch lớn bằng SoC dẫn đến giảm đáng kể mức tiêu thụ điện năng và đạt yêu cầu các chỉ số *PPA (Power, Performance, và Area)*.
- **Rẻ hơn**: Một chip SoC đơn lẻ rẻ hơn so với tập hợp nhiều chip riêng biệt vốn sẽ cần dùng đến nếu không có SoC.
- **Độ tin cậy**: Một SoC đơn lẻ có ít kết nối hơn và do đó đáng tin cậy hơn đáng kể so với multipart system được kết nối qua một substrate.
- **Hiệu năng**: Vì các tín hiệu có thể ở lại trên chip, SoC có thể đạt hiệu năng và tốc độ cao hơn multipart solution.

## 5.2. Nhược điểm

- **Single point of failure**: Với tất cả các thành phần nằm trong một con chip duy nhất, sự cố ở một thành phần sẽ ảnh hưởng đến toàn bộ hệ thống (điều này cũng làm hạn chế khả năng nâng cấp).
- **Thời gian đưa sản phẩm ra thị trường**: Khi so sánh với các linh kiện có sẵn trên thị trường, việc thiết kế custom SoC đòi hỏi nhiều chuyên môn hơn và các công cụ chuyên dụng với thời gian và chi phí phát triển tăng lên. Các chi phí cao hơn này chỉ có thể thu hồi nếu thị trường cho SoC đủ lớn để hấp thụ chúng.
- **Mixed analog/digital**: Vì tất cả các thành phần trên một SoC được sản xuất bằng một quy trình duy nhất, không có lựa chọn sử dụng công nghệ tối ưu cho các phần analog. Điều này dẫn đến giảm hiệu năng analog và làm cho SoC phù hợp hơn với digital applications.
- **Tính linh hoạt:**: Một SoC hoàn toàn phù hợp với nhiệm vụ dự định của nó nhưng có phạm vi hạn chế khi được áp dụng cho bất kỳ nhiệm vụ nào khác.

<details markdown="block">
<summary><i>Mixed analog/digital</i></summary>

> Đây là một đánh đổi kinh điển trong thiết kế bán dẫn (semiconductor design). Lý do cốt lõi xuất phát từ sự tương hợp ngược chiều giữa digital logic và tín hiệu tương tự/tần số cao (analog/RF/power) khi thu nhỏ kích thước process node ("kích thước vật lý của bóng bán dẫn" hoặc "thế hệ công nghệ sản xuất chip").
>
> **1. Nghịch lý tối ưu hóa process node (Process Technology Trade-off)**
> - **Digital logic** cần process node siêu nhỏ (ultra-scaled nodes như 3nm, 5nm, 7nm) để tăng tần suất chuyển mạch, giảm điện năng tiêu thụ và tối ưu diện tích.
> - **Analog, RF và Power Management (PMIC)** lại hoạt động tối ưu ở các process node lớn hơn (ví dụ: 28nm, 65nm, 180nm) hoặc các công nghệ chuyên biệt (như BCD - Bipolar-CMOS-DMOS), vì chúng cần oxide dày để chịu điện áp cao (high breakdown voltage), độ tuyến tính cao, và kiểm soát nhiễu tốt.
> - Trên một SoC nguyên khối (monolithic SoC), tất cả phải dùng chung một process node duy nhất. Do đó phải hy sinh hiệu năng của khối analog để ưu tiên theo digital (hoặc ngược lại, nhưng hiếm khi chọn chiều ngược lại vì digital chiếm chủ đạo).
> 
> **2. Hậu quả cụ thể lên hiệu năng Analog (Reduced Analog Performance)**<br>
> Khi ép các khối analog/mixed-signal (như ADC/DAC, PLL, LDO, RF transceiver) vào node nano (ví dụ 5nm):
> - **Low voltage headroom**: VDD giảm (ví dụ: từ 1.8V/3.3V xuống dưới 1V), làm giảm mạnh dynamic range và tín hiệu dễ bị bão hòa/clipping.
> - **Poor transistor matching**: Ở node cực nhỏ, hiện tượng biến động quy trình (process variations, line-edge roughness) làm cho cặp transistor vi sai (differential pairs) hoặc gương dòng điện (current mirrors) mất độ cân bằng chính xác. Dẫn đến tăng offset voltage, giảm CMRR (common-mode rejection ratio).
>  - **Degraded Noise & Linearity**: Nhiễu flicker/thermal và THD (Total Harmonic Distortion) xấu đi ở các digital advanced node.
>
> **3. Diện tích và Chi phí (Area & Cost Inefficiency)**
> - Digital thu nhỏ cực kỳ tốt theo định luật Moore.
> - Analog không "scale" theo diện tích tương đương. Tụ điện, điện trở chính xác, cuộn cảm hoặc các thành phần analog cốt lõi giữ nguyên kích thước vật lý (hoặc thậm chí khó thiết kế hơn) dù đưa lên node nhỏ.
> - Việc tốn "real estate" silicon cho analog ở advanced node rất đắt đỏ mà hiệu năng nhận lại không tương xứng so với đặt nó ở chip/die riêng.
>
> Để giải quyết nhược điểm trên, các hãng sản xuất đã sử dụng công nghệ **Chiplet-Based Systems &  Heterogeneous Integration**:
> - **Chiplet-Based Systems**: Chia nhỏ một SoC monolithic cồng kềnh thành các die nhỏ độc lập, mỗi die tối ưu cho một chức năng riêng (compute, I/O, analog, SRAM).
> - **Heterogeneous Integration**: Tích hợp các die khác process node, khác vật liệu bán dẫn (Silicon kết hợp GaAs/InP cho RF), hoặc khác hãng sản xuất lên cùng một package.
{: .codeBlock }
</details>

---

# 6. Quy trình thiết kế SoC

Tương tự như một integrated circuit, quy trình thiết kế cho một SoC liên quan đến một số giai đoạn để lập kế hoạch, tinh chỉnh và sản xuất. Mỗi giai đoạn đòi hỏi sự cộng tác của các chuyên gia bao gồm system architects, design engineers và manufacturers. Các mốc quan trọng chính của dòng chảy thiết kế SoC bao gồm:

1. **Specification**: Xác định rõ ràng chức năng mong muốn của SoC. Các ứng dụng, mục tiêu hiệu năng, giới hạn công suất,... là gì?

2. **Logical design**: Mô tả hành vi mong muốn bằng hardware description language (HDL) và mô phỏng hành vi chức năng để xác minh nó là chính xác.

3. **Logic synthesis**: Tự động dịch mô tả hành vi HDL thành danh sách các thành phần transistor và các kết nối giữa chúng, được gọi là *netlist (network list)*.

4. **Physical design**: Chọn các thành phần transistor thích hợp, xác định vị trí vật lý của chúng trên silicon và đường đi của các dây kết nối giữa chúng.

5. **Signoff**: Sử dụng verification software (như [RedHawk-SC](https://ansys.synopsys.com/resource-center/brochure/ansys-redhawk-sc-security-datasheet)) để phân tích và xác thực thiết kế nhằm đảm bảo chức năng và hiệu năng phù hợp. Xác minh rằng layout đáp ứng tất cả các yêu cầu về khả năng sản xuất (manufacturability requirements). Chip không thể được sửa chữa, vì vậy nếu có bất kỳ sai sót nào trong thiết kế, tất cả các chip đã sản xuất phải bị vứt bỏ và thiết kế phải được sửa lại. Đây là lý do tại sao việc kiểm tra và xác minh trước khi tiến hành sản xuất lại quan trọng đến vậy.

6. **Tapeout**: Tạo các graphic files cuối cùng để tạo photomasks của layout và gửi cho nhà sản xuất để sản xuất.

7. **Testing and packaging**: Kiểm tra để xác nhận SoC đáp ứng các thông số kỹ thuật và sẵn sàng sử dụng. Sau đó, chip silicon được đóng gói trong một package bảo vệ.

---

# 7. Thiết kế và mô phỏng SoC

Nhu cầu về các thiết bị điện tử thông minh hơn, nhanh hơn trong các không gian ngày càng thách thức sẽ tiếp tục thúc đẩy nhu cầu đổi mới SoC. Khi SoC ngày càng trở nên phức tạp để đáp ứng nhu cầu thị trường, các design engineers nên tuân theo một cách tiếp cận chính thức để thiết kế và xác thực các con chip này. **Simulation** là một chìa khóa quan trọng để tạo ra một thiết kế SoC thành công đáp ứng các thông số kỹ thuật thiết kế và sản xuất yêu cầu. Mạng lưới phân phối điện năng ngày càng trở nên phức tạp và các mối quan tâm về năng lượng thấp (low-power) làm thu nhỏ supply voltage. Kết quả là, việc phê duyệt thiết kế dựa trên các tiêu chí về tính toàn vẹn tín hiệu (signal integrity) và tính toàn vẹn nguồn điện (power integrity) là cực kỳ quan trọng.




---

# Tham khảo

[1] [Synopsys, "What Is a System-on-a-Chip (SoC)?"](https://www.synopsys.com/glossary/what-is-system-on-a-chip.html)

[2] [NASA Technical Reports Server, "NASA Technical Report"](https://ntrs.nasa.gov/api/citations/20100025590/downloads/20100025590.pdf)

[3] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[4] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)

[5] [element14 Community, "The Difference Between SoCs and MCUs"](https://community.element14.com/technologies/embedded/b/blog/posts/the-difference-between-socs-and-mcus)

[6] [Ezurio, "System on Module vs. System on Chip: What's the Difference?"](https://www.ezurio.com/resources/blog/system-on-module-vs-system-on-chip-what-s-the-difference?srsltid=AfmBOoqoQqondv2QBXF7QxDhUDhTbvlN0ji6dSEDeitY6WbpwfbYltQf)
