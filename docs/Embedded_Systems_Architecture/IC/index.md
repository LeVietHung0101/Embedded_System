---
title: IC
parent: Embedded Systems Architecture
nav_order: 14
has_children: true
---

<h1>Integrated Circuit (IC)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. So sánh MCU và SoC

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>MCU</th>
      <th>SoC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Kiến trúc</b></td>
      <td>Chứa một chip đơn với các ngoại vi không chuyên biệt.</td>
      <td>Chứa một chip đơn với các ngoại vi chuyên biệt hơn.</td>
    </tr>
    <tr>
      <td><b>Số lượng ngoại vi</b></td>
      <td>Tích hợp số lượng ngoại vi ít và hạn chế.</td>
      <td>Tích hợp nhiều ngoại vi.</td>
    </tr>
    <tr>
      <td><b>Hệ điều hành</b></td>
      <td>Không tích hợp hệ điều hành (OS).</td>
      <td>Tích hợp hệ điều hành (OS).</td>
    </tr>
    <tr>
      <td><b>Dung lượng bộ nhớ</b></td>
      <td>Bộ nhớ nhỏ, thường được tính bằng KB.</td>
      <td>Có nhiều bộ nhớ hơn, có thể từ MB đến GB.</td>
    </tr>
    <tr>
      <td><b>Bộ nhớ lưu trữ ngoài</b></td>
      <td>Từ KB đến MB, sử dụng Flash hoặc EEPROM.</td>
      <td>Từ MB đến TB, sử dụng Flash, SSD hoặc HDD.</td>
    </tr>
    <tr>
      <td><b>Độ rộng xử lý</b></td>
      <td>4-bit, 8-bit, 16-bit và 32-bit.</td>
      <td>16-bit, 32-bit và 64-bit.</td>
    </tr>
    <tr>
      <td><b>Tiêu thụ điện năng</b></td>
      <td>Mức tiêu thụ điện năng thấp.</td>
      <td>Mức tiêu thụ điện năng cao hơn và thay đổi đáng kể tùy ứng dụng.</td>
    </tr>
    <tr>
      <td><b>Độ phức tạp ứng dụng</b></td>
      <td>Hướng đến các ứng dụng điều khiển nhỏ, có độ phức tạp thấp.</td>
      <td>Hướng đến các ứng dụng có nhiều yêu cầu hơn và độ phức tạp cao hơn.</td>
    </tr>
    <tr>
      <td><b>Định hướng</b></td>
      <td>Tối thiểu hóa chi phí.</td>
      <td>Tối đa hóa chức năng.</td>
    </tr>
    <tr>
      <td><b>Chi phí</b></td>
      <td>Chi phí thấp hơn SoC.</td>
      <td>Chi phí cao hơn MCU.</td>
    </tr>
    <tr>
      <td><b>Ứng dụng</b></td>
      <td>Thermostat có thể lập trình, thiết bị gia dụng và thiết bị công nghiệp.</td>
      <td>Smartphone, router mạng và trình giả lập máy chơi game.</td>
    </tr>
    <tr>
      <td><b>Ví dụ sản phẩm</b></td>
      <td>Microchip Technology PIC, 8051 và các dòng MCU của Atmel.</td>
      <td>Cypress PSoC và Qualcomm Snapdragon.</td>
    </tr>
  </tbody>
</table>



<details markdown="block">
<summary><i>Thermostat</i></summary>

> **Thermostat** (hay còn gọi là **bộ điều nhiệt** hoặc **rơ-le nhiệt độ**) là thiết bị dùng để kiểm soát và duy trì nhiệt độ của một hệ thống, không gian hoặc thiết bị ở mức ổn định theo mong muốn. Thiết bị dùng một cảm biến để đo nhiệt độ thực tế. Khi nhiệt độ vượt quá mức cài đặt, nó sẽ tự động bật hoặc tắt nguồn điện của hệ thống làm mát hoặc sưởi ấm để đưa nhiệt độ về đúng mức đã chọn.
>  
> Phân loại:
> - **Thermostat cơ học**: Dùng núm xoay, hoạt động dựa trên sự giãn nở của vật liệu hoặc môi chất khi thay đổi nhiệt độ.
> 
> - **Thermostat điện tử / thông minh**: Dùng cảm biến điện tử và màn hình kỹ thuật số, có thể kết nối với điện thoại hoặc hệ thống nhà thông minh để điều khiển từ xa.
> 
> Ứng dụng: 
> - Trong gia dụng: Lắp trong tủ lạnh, tủ mát hoặc máy lạnh để giữ nhiệt độ ổn định, bảo quản thực phẩm tốt hơn.
> - Trong công nghiệp và ô tô: Kiểm soát nhiệt độ động cơ, hệ thống thông gió hoặc các dây chuyền sấy, làm mát.
{: .codeBlock }
</details>

---

# 2. So sánh SoC và SoM

## 2.1. Hiệu năng, năng lượng và kích thước

SoC là một integrated chip nên thường được tối ưu tốt về hiệu năng, hiệu suất năng lượng. Khi sử dụng SoC trực tiếp trên custom board cho các thiết bị chạy bằng pin hoặc có kích thước siêu nhỏ (ultra-compact devices), SoC có thể đạt mức tiêu thụ điện thấp hơn và footprint nhỏ hơn (chiếm ít diện tích hơn) so với việc sử dụng SoM.

SoC phù hợp với các thiết bị yêu cầu kích thước và công suất cực kỳ hạn chế, như thiết bị đeo hoặc cảm biến IoT siêu nhỏ. Nếu sử dụng SoM trong trường hợp này, PCB và connector bổ sung của SoM có thể trở thành hạn chế trong các ứng dụng này.

Tuy nhiên, nhiều SoM có kích thước rất nhỏ (stamp-sized hoặc nhỏ hơn), đồng thời sử dụng các low-power SoC tương tự bên trong. Vì vậy, khác biệt về kích thước và năng lượng so với SoC có thể không đáng kể. Có thể tìm được SoM đáp ứng các yêu cầu nghiêm ngặt về kích thước và năng lượng nếu lựa chọn phù hợp. Nhưng, nếu bạn đang đẩy giới hạn của việc thu nhỏ kích thước thiết bị, thì thiết kế sử dụng SoC trực tiếp có thể là lựa chọn cần thiết.

Do hiệu năng phụ thuộc vào con chip bên trong, nên khi so sánh giữa một SoC và một SoM sử dụng chính SoC đó, thường không có sự khác biệt về hiệu năng. Một số SoM sử dụng SoC có hiệu năng thấp hơn một chút (được thiết kế cho embedded modules) thay vì các chip tiên tiến thường thấy trong smartphone (thường dùng SoC độc lập). Tuy nhiên, ngày càng có nhiều SoM hỗ trợ các processor có hiệu năng cao. Chẳng hạn, đã xuất hiện các SoM tích hợp bộ xử lý ứng dụng cao cấp (high-end application processors) hay thậm chí là FPGA, được thiết kế chuyên biệt cho các tác vụ AI và xử lý hình ảnh. Ví dụ:
- [Avnet VE2302 SOM](https://www.tria-technologies.com/product/ve2302-som/) dựa trên AMD Versal AI Edge, tích hợp programmable logic và AI Engine-ML Tiles, hướng đến các ứng dụng như Edge Artificial intelligence, Machine Learning, Edge Sensor (Radar, Lidar, Vision) và Robotics.
- [Variscite DART-MX8M-PLUS](https://variscite.com/system-on-module-som/i-mx-8/i-mx-8m-plus/dart-mx8m-plus/?utm_source=chatgpt.com) tích hợp NXP i.MX 8M Plus với quad-core Arm Cortex-A53 application processor, 2.3-TOPS NPU và ISP, hướng đến các ứng dụng AI/ML và vision.

**Kết luận**:
- Về mặt hiệu năng, SoC và SoM đều đáp ứng nhu cầu.
- SoC phù hợp với các thiết bị cần tối ưu hiệu năng và năng lượng.
- SoM mang lại sự tiện lợi và chi phí đầu tư thấp hơn.


<details markdown="block">
<summary><i>Stamp-sized</i></summary>

> Stamp-sized là cách mô tả tương đối, thường có nghĩa là module có kích thước xấp xỉ một con tem bưu chính hoặc rất nhỏ, chứ không quy định một kích thước cụ thể.
>
> Trong thực tế, SoM được gọi là stamp-sized có thể nằm khoảng:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Mô tả</th>
>       <th>Kích thước tham khảo</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>Rất nhỏ</td>
>       <td>~20 × 20 mm</td>
>     </tr>
>     <tr>
>       <td>Stamp-sized</td>
>       <td>~25 × 25 mm đến ~40 × 40 mm</td>
>     </tr>
>     <tr>
>       <td>Nhỏ</td>
>       <td>~40 × 50 mm</td>
>     </tr>
>     <tr>
>       <td>Trung bình</td>
>       <td>~50 × 70 mm trở lên</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

<table class="hover-table">
  <thead>
    <tr>
      <th>Tiêu chí</th>
      <th>SoC</th>
      <th>SoM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hiệu năng</td>
      <td>Phụ thuộc vào SoC. Khi dùng cùng SoC, hiệu năng thường không khác biệt đáng kể so với SoM.</td>
      <td>Phụ thuộc vào SoC/processor bên trong. Ngày càng có SoM tích hợp high-end application processors hoặc FPGA cho AI và xử lý hình ảnh.</td>
    </tr>
    <tr>
      <td>Hiệu suất năng lượng</td>
      <td>Thường có hiệu suất năng lượng tốt. Dùng trực tiếp trên custom board có thể giảm mức tiêu thụ điện.</td>
      <td>Nhiều SoM sử dụng low-power SoC nên chênh lệch có thể nhỏ, nhưng PCB và connector tạo thêm overhead.</td>
    </tr>
    <tr>
      <td>Kích thước</td>
      <td>Có thể đạt footprint nhỏ hơn khi tích hợp trực tiếp trên custom board, phù hợp với thiết bị ultra-compact.</td>
      <td>Nhiều SoM có kích thước stamp-sized hoặc nhỏ hơn, nhưng PCB và connector có thể làm tăng footprint.</td>
    </tr>
  </tbody>
</table>

---

## 2.2. Sự tích hợp và tính linh hoạt

**SoC**

Mức độ tích hợp cao nhất ở cấp silicon: mọi thành phần nằm trên một chip. Điều này giúp giảm kích thước và tối ưu hiệu suất trong một thiết kế cố định.

Tuy nhiên, SoC có tính linh hoạt thấp. Sau khi lựa chọn hoặc thiết kế SoC, các thay đổi lớn như thêm interface hoặc nâng cấp processor thường yêu cầu SoC mới hoặc chip khác, dẫn đến việc thiết kế lại hardware đáng kể. Thiết kế dựa trên SoC phụ thuộc chặt vào khả năng của chip và có ít khả năng thay đổi sau khi triển khai.

**SoM**

Mức độ tích hợp cao ở cấp module/board nhưng có tính modularity (khả năng module hóa và thay thế/nâng cấp module đã được thiết kế ngay từ đầu.). SoM đóng gói phần lớn độ phức tạp và kết nối với carrier board thông qua socket hoặc footprint, tạo ra tính linh hoạt mà SoC đơn lẻ khó đạt được.

Ví dụ: khi cần nâng cấp processor hoặc tăng RAM, có thể thay bằng SoM mới có pin-compatible thay vì thiết kệ lại toàn bộ hệ thống. Có thể đánh giá các processor khác nhau bằng cách thử nhiều SoM trên cùng carrier board.

Cách tiếp cận này giúp:
- Rút ngắn thời gian phát triển.
- Tăng khả năng future-proofing cho thiết kế.
- Dễ thích ứng với các thị trường thay đổi nhanh như IoT, nơi hardware capabilities có thể cần được cập nhật sau mỗi vài năm.
- Duy trì lợi ích của integration đồng thời tăng tính linh hoạt.

<details markdown="block">
<summary><i>Hardware capabilities</i></summary>

> **Hardware capabilities (khả năng phần cứng)** là tập hợp các tính năng, sức mạnh xử lý và giới hạn kỹ thuật mà các thiết bị vật lý (như CPU, GPU, RAM) trên máy tính hoặc hệ thống điện tử hỗ trợ.
> 
> Các thành phần chính của Hardware Capabilities:
> - **Khả năng của CPU**: Các tập lệnh và công nghệ hỗ trợ như ảo hóa phần cứng (VT-x, AMD-V), tập lệnh xử lý đồ họa/mật mã (SSE, AVX) hay kiến trúc 32-bit/64-bit.
> - **Khả năng của GPU (Compute Capability)**: Sức mạnh tính toán song song và các tính năng kiến trúc đồ họa chuyên dụng (như nhân CUDA của NVIDIA) để chạy AI, đồ họa hoặc mô phỏng.
> - **Dung lượng và băng thông**: Tốc độ của RAM, dung lượng bộ nhớ đệm (cache), và tốc độ đọc/ghi của ổ cứng.
>
> Ý nghĩa trong công nghệ:
> - **Tương thích phần mềm**: Giúp hệ điều hành hoặc ứng dụng biết thiết bị có đủ sức mạnh hay tính năng đặc thù (như Web API truy cập phần cứng hoặc AI trên thiết bị) để hoạt động hay không.
> - **Tối ưu hóa hiệu năng**: Cho phép lập trình viên viết mã tận dụng tối đa tập lệnh riêng của phần cứng.
{: .codeBlock }
</details>


**Kết luận**: SoC cung cấp integration, trong khi SoM cung cấp integration + modularity. Đây là một lý do quan trọng khiến SoM phổ biến trong các ứng dụng công nghiệp yêu cầu khả năng thích ứng lâu dài.

---

## 2.3. Nỗ lực phát triển và thời gian đưa sản phẩm ra thị trường

**SoC (Custom Board)**

Thiết kế sản phẩm trực tiếp với SoC yêu cầu đội ngũ tự thực hiện toàn bộ hardware integration, bao gồm:
- High-speed memory routing.
- RF design.
- Power circuits.
- Clock crystals.
- Các peripherals và thành phần phần cứng liên quan.

Điều này đòi hỏi chuyên môn về hardware design, signal integrity, PCB layout,... Đồng thời làm tăng development cycle: mỗi prototype có thể phát sinh hardware bugs cần sửa, còn bring-up (đưa OS và software chạy trên hardware mới) có thể mất nhiều thời gian.

Với các thiết kế SoC phức tạp, quá trình hardware development và testing có thể kéo dài nhiều tháng hoặc hơn trước khi sản phẩm sẵn sàng đưa ra thị trường.

Tóm lại, SoC-based development thường chậm và có rủi ro cao hơn ở giai đoạn đầu, nhưng có thể mang lại lợi ích cho các sản phẩm high-volume.

**SoM**

Sử dụng SoM có thể rút ngắn đáng kể development time vì phần lớn hardware design phức tạp đã được thiết kế và kiểm thử trên module.

SoM xử lý sẵn phần lớn độ phức tạp, giúp phát triển carrier board dễ dàng hơn. Kỹ sư có thể tận dụng thiết kế của module vendor thay vì phải tự thiết kế toàn bộ hardware từ đầu.

Lợi ích chính:
- Tạo prototype nhanh hơn: có thể chạy hệ thống trên eval carrier board, sau đó thiết kế carrier board đơn giản theo nhu cầu.
- Giảm thời gian đưa sản phẩm ra thị trường: chủ yếu là tích hợp một subsystem đã được thiết kế sẵn.
- Giảm độ phức tạp và chi phí phát triển: phù hợp cả với quy mô sản xuất thấp-trung bình.
- Nhiều SoM cung cấp sẵn OS images và driver support, cho phép software development thực hiện song song với hardware development, tiếp tục rút ngắn thời gian.

Tuy nhiên, SoM có thể không đạt unit cost thấp nhất hoặc mức integration tối ưu nhất. Đổi lại, SoM giúp tăng tốc development và giảm rủi ro.

Đặc biệt với startups hoặc các team cần nhanh chóng tạo product demonstration, lợi ích từ time-to-market có thể lớn hơn những tối ưu mà thiết kế SoC từ đầu có thể mang lại.

**Kết luận**:
- SoC phù hợp khi cần tối ưu sâu về hiệu năng, năng lượng, kích thước và unit cost ở quy mô lớn, chấp nhận development time và hardware complexity cao hơn.
- SoM ưu tiên tính linh hoạt, modularity, phát triển nhanh và giảm rủi ro, giúp rút ngắn thời gian đưa sản phẩm ra thị trường bằng cách tận dụng hardware đã được thiết kế và kiểm thử sẵn.

<details markdown="block">
<summary><i>Eval carrier board</i></summary>

> **Eval carrier board (evaluation carrier board)**: Bo mạch dùng để đánh giá và thử nghiệm SoM, thường cung cấp sẵn các interface, connector và mạch cần thiết để nhanh chóng kiểm tra khả năng của module.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Unit cost</i></summary>

> **Unit cost**: Chi phí cho mỗi sản phẩm/đơn vị sản phẩm, thường được tính khi sản xuất hàng loạt.
{: .codeBlock }
</details>

---

## 2.4. Cân nhắc về chi phí

**1. Development Cost**

**SoC-based projects** thường có chi phí ban đầu cao do:
- Custom board design và debugging cần đội ngũ có chuyên môn cao.
- Có thể cần specialized EDA tools, nhiều lần làm lại mẫu PCB (PCB spins) và các quy trình chứng nhận.
- Khoản đầu tư ban đầu (NRE) thường chỉ hợp lý khi quy mô sản xuất lớn để phân bổ chi phí.

Với SoM, khoản đầu tư ban đầu thấp hơn. Dù giá thành của module có thể cao nhưng doanh nghiệp lại tiết kiệm được chi phí phát triển các phần phức tạp như memory interfacing và RF tuning. SoM đã được thiết kế và kiểm chứng sẵn nên không cần thực hiện các công việc chip integration tốn kém từ đầu.

Do đó, SoM có thể hiệu quả về chi phí hơn, đặc biệt khi quy mô sản xuất không đủ lớn để bù đắp chi phí thiết lập cao của SoC-based development.

<details markdown="block">
<summary><i>EDA tools</i></summary>

> **EDA tools (Electronic Design Automation tools)**: Các phần mềm hỗ trợ thiết kế và kiểm tra electronic hardware, như schematic, PCB layout, simulation và verification.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>NRE costs</i></summary>

> **NRE costs (Non-Recurring Engineering costs)**: Chi phí kỹ thuật phát sinh một lần trong quá trình phát triển sản phẩm, như thiết kế, prototyping, testing và debugging; không lặp lại theo từng sản phẩm sản xuất.
{: .codeBlock }
</details>

**2. Production Cost**

- **SoC**: Phù hợp với sản phẩm số lượng lớn, nhạy cảm với chi phí. Với hàng triệu thiết bị giống nhau, mức tiết kiệm vài USD trên mỗi sản phẩm có thể tạo ra chênh lệch lớn. Vì vậy, với sản phẩm mass-produced, standard, SoC thường có unit cost thấp hơn.

- **SoM**: Có unit cost cao hơn do phải mua một assembled sub-board thay vì SoC riêng lẻ. Tuy nhiên, với quy mô sản xuất thấp-trung bình, chi phí này có thể chấp nhận được hoặc thậm chí thấp hơn nếu tính cả chi phí kỹ thuật được tiết kiệm.

<details markdown="block">
<summary><i>Assembled sub-board</i></summary>

> Assembled sub-board: Một bo mạch con đã được lắp ráp hoàn chỉnh, chứa sẵn các components cần thiết. Trong trường hợp SoM, chính module SoM có thể được xem là một assembled sub-board.
{: .codeBlock }
</details>

**3. Certification và Supply Chain**

**Pre-certified SoM** có thể tiết kiệm chi phí và thời gian cho các yêu cầu như FCC/CE testing, PTCRB (đối với cellular) và các quy định khác khi phát triển board mới.

**SoM vendor** thường đảm nhận chuỗi cung ứng và tìm nguồn cung ứng linh kiện cho module, giúp giảm sự biến động chi phí.

Với thiết kế dựa trên SoC, doanh nghiệp phải tự tìm kiếm nguồn cung ứng các components như PMIC, RAM,... trong quá trình sản xuất. Các vấn đề về cung ứng có thể làm chi phí tăng ngoài dự kiến.

<details markdown="block">
<summary><i>PMIC</i></summary>

> **Power Management Integrated Circuit (PMIC)**: Mạch tích hợp quản lý nguồn có nhiệm vụ nhận nguồn đầu vào và tạo ra các power rails phù hợp cho MPU và các thành phần khác. MPU hiệu năng cao thường có nhiều power domains và voltage rails, vì vậy PMIC rất quan trọng.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>PTCRB</i></summary>

> PTCRB (PCS Type Certification Review Board): Chương trình certification dành cho thiết bị di động/cellular, nhằm xác nhận thiết bị đáp ứng các yêu cầu kỹ thuật để hoạt động trên các mạng cellular tương ứng.
{: .codeBlock }
</details>

**Kết luận**:
- SoC có chi phí phát triển ban đầu cao nhưng có thể đạt được unit cost thấp khi quy mô sản xuất rất lớn.
- SoM có chi phí đơn vị cao hơn nhưng giảm đáng kể chi phí phát triển, chi phí chứng nhận và chi phí kỹ thuật, phù hợp hơn quy mô sản xuất thấp hoặc trung bình.

---

## 2.5. Độ tin cậy và vòng đời sản phẩm

Độ tin cậy (reliability) ở đây gồm hai khía cạnh: hardware reliability trong thực tế sử dụng và khả năng maintenance/consistency trong suốt vòng đời sản phẩm.

**1. Hardware Reliability**

**SoC**: Mức độ tích hợp cao giúp giảm số lượng các mối hàn bên ngoài và components, từ đó có thể tăng độ tin cậy vật lý do ít components hoặc connector có khả năng hỏng hơn.

**SoM**:
- Thường được thiết kế, sản xuất và kiểm thử chuyên nghiệp theo các tiêu chuẩn công nghiệp về sốc, rung động, nhiệt độ,... SoM thường đã trải qua temperature cycling, EMC testing và các kiểm thử liên quan trước khi được sử dụng trong sản phẩm.
- Khi sử dụng SoM từ nhà cung cấp uy tín, sản phẩm có thể kế thừa mức độ tính bền vững (robustness) và sự xác thực (validation) đã được kiểm chứng, giảm rủi ro lỗi phần cứng so với một custom design ở revision đầu tiên.
- Đặc biệt trong ứng dụng công nghiệp và y tế, độ tin cậy đã được kiểm chứng là một lợi thế của SoM.

<details markdown="block">
<summary><i>Temperature cycling</i></summary>

> **Temperature cycling**: Kiểm tra độ bền bằng cách liên tục thay đổi nhiệt độ giữa các mức cao và thấp để đánh giá khả năng chịu ứng suất nhiệt (thermal stress) của thiết bị.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>EMC testing</i></summary>

> **EMC testing (Electromagnetic Compatibility testing)**: Kiểm tra khả năng thiết bị hoạt động bình thường trong môi trường có nhiễu điện từ (EMI- electromagnetic interference) và mức nhiễu điện từ mà thiết bị phát ra.
{: .codeBlock }
</details>


**2. Lifecycle and Longevity**

Các thiết bị công nghiệp và y tế thường cần được hỗ trợ trong nhiều năm, thậm chí hơn một thập kỷ. SoM vendors thường cung cấp hỗ trợ dài hạn, bao gồm documentation, software updates và cam kết cung cấp module hoặc equivalent replacement trong thời gian dài. Một số dòng SoM được nhà sản xuất cam kết cung cấp trong thời gian dài (7, 10 hoặc hơn 15 năm). Nếu SoM trở nên lỗi thời, vendor có thể cung cấp module mới tương thích để thay thế, hạn chế nhu cầu redesign.

Với custom SoC-based board, nhà phát triển phải tự theo dõi và xử lý việc các components trở nên lỗi thời. Nếu SoC hoặc một component quan trọng bị ngừng sản xuất, có thể phải thiết kế lại hardware.

**3. Upgradability**

Trong môi trường công nghiệp, thiết bị có thể được triển khai trong khoảng 20 năm, trong khi công nghệ vẫn liên tục phát triển. SoM cho phép nâng cấp dần dần bằng cách thay module mới để bổ sung các tính năng như khả năng kết nối tốt hơn hoặc AI processing, giúp kéo dài tuổi thọ thiết bị mà không cần nâng cấp toàn bộ hệ thống. Cách nâng cấp này dễ thực hiện hơn với SoM so với thiết kế sử dụng SoC cố định.

**4. Vendor Lock-in Risk**

Sử dụng SoM đồng nghĩa với việc phụ thuộc vào SoM vendor. Nếu vendor ngừng hoạt động hoặc ngừng sản xuất SoM đó, có thể phải tìm linh kiện thay thế tương thích về pins hoặc redesign.

Có thể giảm rủi ro bằng cách:
- Chọn SoM vendor có lịch sử cung cấp sản phẩm ổn định và đáng tin cậy, đặc biệt về khả năng duy trì sản phẩm và hỗ trợ lâu dài.
- Ưu tiên các các kích thước và hình dạng chuẩn công nghiệp như SMARC, COM Express, OSM; giúp tăng khả năng tương thích giữa các vendor.

Với SoC và custom design, vẫn có sự phụ thuộc vào nhà sản xuất chip để tiếp tục sản xuất SoC; chip cuối cùng cũng có thể được EOL (End-of-Life).

<details markdown="block">
<summary><i>SMARC</i></summary>

> **SMARC (Smart Mobility Architecture)**: Một standardized computer-on-module form factor quy định kích thước, connector và interface của module.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>COM Express</i></summary>

> **COM Express**: Một standardized Computer-on-Module (COM) form factor, cho phép module chứa processor và các thành phần chính kết nối với carrier board.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>OSM</i></summary>

> **OSM (Open Standard Module)**: Một open standard module form factor cho embedded systems, được chuẩn hóa về kích thước, pinout và các interface.
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>EOL (End-of-Life)</i></summary>

> **EOL (End-of-Life)**: Trạng thái một sản phẩm/component ngừng được sản xuất hoặc hỗ trợ, thường báo hiệu cần chuyển sang sản phẩm thay thế.
{: .codeBlock }
</details>

---

## 2.6. Ưu điểm và nhược điểm

<table class="hover-table">
  <thead>
    <tr>
      <th>Đặc điểm</th>
      <th>System-on-Chip (SoC)</th>
      <th>System-on-Module (SoM)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Tính linh hoạt</b></td>
      <td>Thấp (các thành phần được tích hợp cố định)</td>
      <td>Cao (thiết kế dạng module, dễ thay đổi các thành phần)</td>
    </tr>
    <tr>
      <td><b>Chi phí trong giai đoạn thiết kế</b></td>
      <td>Chi phí ban đầu cao hơn;<br>Chi phí cao hơn khi thay đổi thiết kế</td>
      <td>Chi phí đầu tư ban đầu thấp hơn;<br>Chi phí thấp hơn khi thay đổi thiết kế</td>
    </tr>
    <tr>
      <td><b>Thời gian phát triển</b></td>
      <td>Dài hơn (cần nhiều thời gian cho việc tích hợp)</td>
      <td>Ngắn hơn (sử dụng thiết kế module có sẵn)</td>
    </tr>
    <tr>
      <td><b>Rủi ro</b></td>
      <td>Cao hơn (việc thiết kế lại có thể nhiều chi phí)</td>
      <td>Thấp hơn (dễ sửa đổi hoặc thay thế các thành phần)</td>
    </tr>
    <tr>
      <td><b>Khả năng phù hợp với ứng dụng</b></td>
      <td>Sản phẩm sản xuất hàng loạt (mass-produced), tiêu chuẩn hóa</td>
      <td>Các dự án tùy chỉnh (custom), thường xuyên thay đổi</td>
    </tr>
  </tbody>
</table>

---

# 3. So sánh CPU, MCU, MPU, và SoC

Mỗi loại processing unit phục vụ các mục đích khác nhau, và sự lựa chọn phụ thuộc vào yêu cầu cụ thể của ứng dụng như hiệu năng, tiêu thụ điện năng và mức độ tích hợp.
- **CPU:** Bộ xử lý đa năng dành cho máy tính hiệu năng cao.
- **MCU:** Chip tích hợp dùng cho các ứng dụng điều khiển nhúng.
- **MPU:** Bộ xử lý cần các thành phần bên ngoài để linh hoạt.
- **SoC:** Hệ thống tích hợp hoàn toàn dành cho các thiết bị nhỏ gọn, hiệu năng cao.

<table class="hover-table">
  <thead>
    <tr>
      <th>Tính năng</th>
      <th>CPU</th>
      <th>MCU</th>
      <th>MPU</th>
      <th>SoC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tích hợp</strong></td>
      <td>Yêu cầu các thành phần bên ngoài</td>
      <td>CPU, bộ nhớ và ngoại vi tích hợp</td>
      <td>Yêu cầu các thành phần bên ngoài</td>
      <td>Tích hợp hoàn toàn (CPU, GPU, bộ nhớ, ngoại vi)</td>
    </tr>
    <tr>
      <td><strong>Hiệu năng</strong></td>
      <td>Cao</td>
      <td>Thấp đến trung bình</td>
      <td>Trung bình đến cao</td>
      <td>Cao</td>
    </tr>
    <tr>
      <td><strong>Tiêu thụ điện năng</strong></td>
      <td>Cao</td>
      <td>Thấp</td>
      <td>Trung bình</td>
      <td>Thấp đến trung bình</td>
    </tr>
    <tr>
      <td><strong>Ứng dụng</strong></td>
      <td>Máy tính đa năng</td>
      <td>Hệ thống nhúng, IoT</td>
      <td>Công nghiệp, mạng</td>
      <td>Điện thoại thông minh, máy tính bảng</td>
    </tr>
    <tr>
      <td><strong>Ví dụ</strong></td>
      <td>Intel Core i7, AMD Ryzen</td>
      <td>STM32F103C8T6, ATmega328P</td>
      <td>Raspberry Pi RP2040, Intel Atom</td>
      <td>Qualcomm Snapdragon, Apple A15</td>
    </tr>
  </tbody>
</table>




---

# Tham khảo

[1] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[2] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)

[3] [Ezurio, "System on Module vs. System on Chip: What's the Difference?"](https://www.ezurio.com/resources/blog/system-on-module-vs-system-on-chip-what-s-the-difference?srsltid=AfmBOoqoQqondv2QBXF7QxDhUDhTbvlN0ji6dSEDeitY6WbpwfbYltQf)

[4] [DEV Community, "What are the differences between CPU, MCU, MPU, and SoC, and what are their respective representative chips?"](https://dev.to/carolineee/what-are-the-differences-between-cpu-mcu-mpu-and-soc-and-what-are-their-respective-bi2)

<!-- [5] [element14 Community, "The Difference Between SoCs and MCUs"](https://community.element14.com/technologies/embedded/b/blog/posts/the-difference-between-socs-and-mcus) -->