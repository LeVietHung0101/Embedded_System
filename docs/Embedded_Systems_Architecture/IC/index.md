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

# So sánh MCU và SoC

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

# Tham khảo

[1] [GeeksforGeeks, "Difference between MCU and SoC"](https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-mcu-and-soc/)

[2] [Ampheo, "Microprocessor vs Microcontroller vs System on Chip: What Are the Differences Among Them?"](https://www.ampheo.com/blog/microprocessor-vs-microcontroller-vs-system-on-chip-what-are-the-differences-among-them?srsltid=AfmBOorVHEWKOxo-kMa8mspqk0cqhepew-P5tmWRJ3dLyD_4Sw4RgJWd)

<!-- 

[5] [element14 Community, "The Difference Between SoCs and MCUs"](https://community.element14.com/technologies/embedded/b/blog/posts/the-difference-between-socs-and-mcus)

[6] [Ezurio, "System on Module vs. System on Chip: What's the Difference?"](https://www.ezurio.com/resources/blog/system-on-module-vs-system-on-chip-what-s-the-difference?srsltid=AfmBOoqoQqondv2QBXF7QxDhUDhTbvlN0ji6dSEDeitY6WbpwfbYltQf) -->