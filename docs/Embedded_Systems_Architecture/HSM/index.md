---
title: HSM
parent: Embedded Systems Architecture
nav_order: 11
has_children: true
---

<h1>Hardware Security Module (HSM)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Lý do cần HSM

<details markdown="block">
<summary><i>Các thuật ngữ liên quan</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Thuật ngữ</th>
>       <th>Giải thích</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>external interfaces</td>
>       <td>
>         Các giao diện hoặc cổng kết nối cho phép <b>ECU</b> hoặc hệ thống trên xe giao tiếp với các thiết bị, hệ thống hoặc mạng bên ngoài. Ví dụ: <b>CAN</b>, <b>Ethernet</b>, <b>Bluetooth</b>, <b>Wi-Fi</b>, <b>USB</b>, cổng <b>OBD-II</b> và kết nối <b>Cellular</b>.
>       </td>
>     </tr>
>     <tr>
>       <td>attack surface</td>
>       <td>
>         Tổng hợp tất cả các điểm mà kẻ tấn công có thể khai thác để truy cập hoặc tấn công hệ thống. Số lượng <b>external interfaces</b> và các chức năng kết nối càng nhiều thì <b>attack surface</b> càng lớn.
>       </td>
>     </tr>
>     <tr>
>       <td>electric mobility</td>
>       <td>
>         Lĩnh vực giao thông sử dụng năng lượng điện, bao gồm <b>Electric Vehicle (EV)</b>, <b>Plug-in Hybrid Electric Vehicle (PHEV)</b>, hạ tầng sạc và các dịch vụ liên quan đến phương tiện chạy điện.
>       </td>
>     </tr>
>     <tr>
>       <td>automatic billing</td>
>       <td>
>         Cơ chế tự động tính phí và thanh toán dựa trên dữ liệu sử dụng dịch vụ mà không cần người dùng thao tác thủ công. Ví dụ: tự động thanh toán chi phí sạc <b>EV</b>, phí cầu đường hoặc phí đỗ xe.
>       </td>
>     </tr>
>     <tr>
>       <td>semiconductor manufacturers</td>
>       <td>
>         Các công ty thiết kế và sản xuất <b>semiconductor</b> như <b>MCU</b>, <b>SoC</b>, bộ nhớ và các <b>IC</b> khác. Trong lĩnh vực ô tô, các hãng như <b>Infineon</b>, <b>NXP</b>, <b>Renesas</b>, <b>STMicroelectronics</b> và <b>Texas Instruments</b> thường tích hợp các tính năng bảo mật như <b>HSM</b> vào sản phẩm của họ.
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Hiện nay, ECU đã có các cơ chế security sau:

- Kiểm tra tính xác thực (authenticity) của application trong quá trình startup và khi thực hiện software update.

- Chỉ cho phép sử dụng các security-related diagnostic services sau khi authorization thành công.

Tuy nhiên, khi mức độ networking trong hệ thống điện tử trên xe ngày càng tăng, số lượng external interfaces cũng tăng theo, làm mở rộng attack surface. Đồng thời, networking còn tạo ra nhiều use case mới có liên quan đến security, chẳng hạn như automatic billing trong lĩnh vực electric mobility.

Để đáp ứng nhu cầu security ngày càng cao, các semiconductor manufacturers đã tăng cường hỗ trợ bảo mật ở mức hardware. Vì vậy, HSM hiện đã được tích hợp trên nhiều microcontrollers hiện đại.


---

# Mục đích sử dụng HSM

Việc sử dụng HSM thường hướng đến ba mục tiêu:

* **Tăng hiệu năng (Increased performance):** Việc sử dụng các **hardware accelerator** chuyên dụng giúp giảm thời gian thực hiện các phép tính **cryptographic**, chẳng hạn như **encryption**. Điều này giúp rút ngắn thời gian chờ và giảm tải cho **main processor**.

* **Phân vùng (Partitioning):** Việc phân vùng memory tạo ra một khu vực để lưu trữ dữ liệu bảo mật, ví dụ như **encryption keys**.

* **Tính linh hoạt (Flexibility):** Khả năng **programmability** của HSM cho phép đáp ứng nhiều **use case** khác nhau cũng như các yêu cầu riêng của từng OEM.

---

# Thiết kế và chức năng của HSM

<!-- # Design and Functionality of an HSM

An HSM is a subsystem within a microcontroller, comparable to an additional processor core in a multicore processor. It generally has its own RAM and flash memories which are protected from access by the rest of the system. In addition, an HSM is equipped with hardware accelerators for reducing the computation time for cryptographic algorithms. It should also be noted that just like all other processor cores, the HSM can execute any software – i.e., it is programmable. Essentially, it is this software that determines the functionality of the HSM and represents its interface to the rest of the system. It is referred to as “HSM firmware.”

To highlight the advantages of an HSM, three approaches to implementing security functions need to be compared 
- A pure software solution on the main processor.
- A hardware accelerated solution on the main processor.
- A solution with HSM.

Since cryptographic algorithms are generally computing-intensive, a pure software solution requires a lot of processing time, and so it is often not the ideal solution. The use of a hardware accelerated computation on the main processor and accelerated computation in the HSM achieve comparable values. However, the HSM offers the advantage of improved concurrency if the computation is performed in software. This can relieve the load from the main processor.

The HSM offers the best solution for separating and protecting confidential contents. Partitioning the memories keeps protection-worthy contents encapsulated in the HSM and therefore separated from the rest of the application. For the hardware accelerated solution on the main processor, this only applies to a limited number of symmetrical keys. In the case of the HSM, on the other hand, if its memory is sufficiently large, it can store a flexible number of keys, certificates and other contents. In terms of flexibility, the HSM benefits from its programmability. Hardware support on the main processor has a fixed functional scope, and therefore it cannot react to changing requirements. Of course, this also applies to the hardware support on the HSM. But the added option of implementing requirements in the HSM firmware yields a decisive gain in flexibility.  -->

## Thiết kế của HSM

HSM là một subsystem bên trong microcontroller, có thể xem như một processor core bổ sung trong kiến trúc multicore processor.

Đặc điểm của HSM:

- Có RAM và Flash riêng, được bảo vệ khỏi truy cập từ các thành phần còn lại của hệ thống.

- Tích hợp các hardware accelerator để giảm thời gian xử lý các thuật toán cryptographic.

- Có khả năng thực thi phần mềm giống như các processor core khác, tức là programmable.

- Chức năng và giao diện của HSM với phần còn lại của hệ thống được quyết định bởi phần mềm chạy trên HSM, gọi là **HSM firmware**.

## So sánh các phương pháp triển khai Security

Để thấy rõ ưu điểm của HSM, có thể so sánh ba phương pháp triển khai các chức năng security:

- Pure software solution trên main processor.

- [Hardware accelerated]({{ "/docs/Embedded_Systems_Architecture/HSM/HardwareAccelerator/" | relative_url }}) solution trên main processor.

- Solution with HSM.

### So sánh về Performance

Do các thuật toán cryptographic đòi hỏi nhiều tài nguyên tính toán, pure software solution tiêu tốn nhiều thời gian xử lý và thường không phải là lựa chọn tối ưu.

- Hardware accelerated solution trên main processor và HSM đều mang lại hiệu năng xử lý tương đương.

- HSM có ưu thế hơn nhờ khả năng thực hiện phép tính bằng phần mềm trên HSM song song với main processor, giúp tăng concurrency và giảm tải cho main processor.

### So sánh về Protection

HSM là giải pháp hiệu quả nhất để cô lập (partitioning) và bảo vệ dữ liệu bảo mật (confidential contents).

- Partitioning bộ nhớ giúp các dữ liệu cần bảo vệ luôn được lưu bên trong HSM, tách biệt khỏi phần còn lại của ứng dụng.

- Với hardware accelerated solution trên main processor, khả năng bảo vệ chỉ giới hạn ở một số lượng nhỏ symmetrical keys.

- Nếu HSM có đủ dung lượng bộ nhớ, nó có thể lưu trữ linh hoạt nhiều keys, certificates và các dữ liệu bảo mật khác.

### So sánh về Flexibility

Ưu điểm lớn nhất của HSM là khả năng programmability.

- Hardware support trên main processor có phạm vi chức năng cố định và không thể thích ứng với các yêu cầu mới.

- Điều này cũng đúng với các hardware accelerator bên trong HSM.

- Tuy nhiên, nhờ có thể triển khai thêm chức năng trong HSM firmware, HSM đạt được mức flexibility cao hơn đáng kể và có thể đáp ứng các yêu cầu thay đổi trong tương lai.

---

# Tham khảo

[1] [AUTOSAR, "AUTOSAR Security Overview"](https://www.autosar.org/fileadmin/standards/R24-11/FO/AUTOSAR_FO_EXP_SecurityOverview.pdf)

[2] [LinkedIn, "Deep Dive: AUTOSAR HSM Flow APIs"](https://www.linkedin.com/posts/dattatak_deep-dive-autosar-hsm-flow-apis-in-activity-7461460923916947457-2O1K)

[3] [Agnile, "HSM (Hardware Security Module)"](https://agnile.com/resources/glossary/hsm)

[4] [Vector, "Hardware Security Modules (HSM) for Automotive ECUs"](https://cdn.vector.com/cms/content/know-how/_technical-articles/Security_HSM_Automobil-Elektronik_201808_PressArticle_EN.pdf)

[5] [Infineon Technologies, "AURIX™ Hardware Security Module Training"](https://assets.infineon.com/is/content/infineon/infineon/row/public/documents/10/56/Infineon-AURIX_Hardware_Security_Module-Training-EN.pdf?utm_source=chatgpt.com)

[6] [Embedded, "How hardware security modules enable AUTOSAR"](https://www.embedded.com/how-hardware-security-modules-enable-autosar/)