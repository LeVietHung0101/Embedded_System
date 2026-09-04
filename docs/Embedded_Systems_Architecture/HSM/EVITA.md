---
title: EVITA
parent: HSM
nav_order: 2
---

<h1>EVITA</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

## 1.1. EVITA là gì?

**[EVITA](https://evita-project.org/) (E-Safety Vehicle Intrusion Protected Applications)** là một dự án nghiên cứu về an ninh mạng ô tô do Liên minh Châu Âu tài trợ (2008-2011, thuộc chương trình [EU FP7](https://cordis.europa.eu/programme/id/FP7)), tập trung vào việc bảo vệ các ECU và in-vehicle networks khỏi các hành vi xâm nhập độc hại, truy cập trái phép và các cuộc tấn công mạng.

> EVITA: Các ứng dụng an toàn điện tử (E-Safety) có tính năng bảo vệ chống xâm nhập vào xe.<br>
> in-vehicle networks: các mạng nội bộ trên xe

---

## 1.2. Tại sao cần EVITA?

Việc cần đến tiêu chuẩn **EVITA** xuất phát từ những lỗ hổng bảo mật nghiêm trọng trong kiến trúc ô tô truyền thống và sự gia tăng các mối đe dọa từ kết nối hiện đại. Dưới đây là các lý do chính:

**1. Giải quyết các lỗ hổng của kiến trúc truyền thống**

Trước khi có EVITA, các mạng nội bộ trên xe (như **CAN, LIN, và FlexRay**) hoàn toàn **không có cơ chế xác thực hay mã hóa**. Điều này dẫn đến các rủi ro hệ thống như:
- **Thiếu sự tin cậy:** Các ECU tin tưởng tuyệt đối vào mọi network traffic, cho phép bất kỳ node nào cũng có thể chèn message giả mạo.
- **Dễ bị tấn công:** Không có sự bảo vệ chống lại việc can thiệp firmware và không có nơi lưu trữ khóa an toàn (secure key storage).
- **Triết lý tin tưởng tuyệt đối:** Các xe cũ vận hành dựa trên sự tin tưởng ngầm định, trong khi EVITA thúc đẩy triết lý **"Zero-trust"** (không tin tưởng bất kỳ ai).

**2. Đáp ứng sự gia tăng về kết nối**

Ô tô hiện đại không còn là những cỗ máy biệt lập mà đã trở thành các hệ thống có thể bị tấn công từ xa do sự xuất hiện của **Bluetooth, viễn thông (telematics), chẩn đoán lỗi (diagnostics) và cập nhật qua mạng (Over-The-Air - OTA)**. EVITA đã giải quyết vấn đề này bằng cách đưa ra các khái niệm **security-by-design** (bảo mật ngay từ khâu thiết kế) dành cho các ECU - đưa bảo mật dựa trên phần cứng vào từng ECU.

{: .note }
> EVITA là cần thiết để chuyển đổi phương tiện từ một mạng lưới mở, dễ bị tổn thương thành một hệ thống được bảo vệ bằng mật mã và dựa trên các điểm tựa tin cậy phần cứng **(Hardware Trust Anchors)**.

---

## 1.3. Mục tiêu của EVITA

Mục tiêu cốt lõi của dự án **EVITA** là thiết lập một nền tảng an ninh mạng vững chắc cho các phương tiện hiện đại bằng cách giới thiệu **các cơ chế bảo mật dựa trên phần cứng ở cấp độ ECU**.

Dưới đây là các mục tiêu cụ thể:

1. **Ngăn chặn sự xâm nhập vào ECU (Prevent ECU Intrusion):** Bảo vệ các ECU khỏi việc truy cập trái phép và thực thi các mã độc hại (malicious code). Điều này nhằm giải quyết lỗ hổng khi các phương tiện ngày càng trở thành hệ thống điều khiển bằng phần mềm và có kết nối mạng nhưng lại thiếu cơ chế bảo mật tích hợp.

1. **Bảo mật giao tiếp nội bộ trong xe (Secure In-Vehicle Communication):** Đảm bảo tính xác thực (authenticity), tính toàn vẹn (integrity) và tính bảo mật (confidentiality) của các messsage được truyền đi trên mạng lưới nội bộ. Trước khi có EVITA, các mạng như CAN, LIN hay FlexRay thường không có các cơ chế xác thực hoặc mã hóa này.

1. **Triển khai bảo mật dựa trên phần cứng (Hardware-Based Security):** Chuyển các cryptographic operations từ phần mềm vào các phần cứng an toàn (như HSM) để tạo ra các **Hardware Trust Anchors** (điểm tựa tin cậy phần cứng). Việc cô lập các hoạt động này giúp bảo vệ khóa mật mã khỏi sự tiếp cận trái phép của application software.

1. **Cung cấp các cấp độ bảo mật có thể mở rộng (Scalable Security Levels):** Định nghĩa các cấu hình (profiles) bảo mật khác nhau (**Light**, **Medium**, và **Full**) để phù hợp với mức độ rủi ro và chi phí sản xuất của từng loại ECU khác nhau. Điều này cho phép các nhà sản xuất cân bằng giữa hiệu suất, chi phí và yêu cầu an ninh.

1. **Đảm bảo khả năng tương thích thời gian thực (Real-Time Compatibility):** Duy trì các hành vi xác định (deterministic behavior) cần thiết cho các hệ thống ô tô, đảm bảo rằng các biện pháp bảo mật không làm ảnh hưởng đến hiệu suất vận hành của xe.

1. **Xây dựng ngôn ngữ chung cho ngành:** Tạo ra một bộ từ vựng chung về khả năng của HSM, giúp các nhà cung cấp và sản xuất (OEM) dễ dàng khớp cấu hình phần cứng với mô hình đe dọa (threat model) trong quá trình thiết kế.

---

## 1.4. EVITA Security Architecture

{: .note }
> At the heart of EVITA is the concept of integrating security hardware inside the ECU, rather than relying only on software.

Kiến trúc bảo mật EVITA được xây dựng xung quanh triết lý cốt lõi là tích hợp phần cứng bảo mật chuyên dụng bên trong ECU thay vì chỉ dựa vào các giải pháp phần mềm đơn thuần.

Dưới đây là các thành phần kiến trúc và tính năng an ninh chính được giới thiệu bởi EVITA:

- **Hardware Security Module (HSM)**: Là "Hardware Trust Anchor" trung tâm mà một ECU ô tô hiện đại được xây dựng xung quanh. Trong môi trường ô tô, HSM là một khối silicon riêng biệt nằm chung đế (die) với application MCU. Nó sở hữu CPU, ROM, SRAM độc lập và một bus riêng biệt kết nối trực tiếp đến *fused key storage*, hoàn toàn tách biệt với phần còn lại của hệ thống.

- **Secure Hardware Extension (SHE)**: Là một đặc tả bảo mật nhẹ hơn và ra đời trước [EVITA Light]({{ "/docs/Embedded_Systems_Architecture/HSM/EVITA/#211-evita-light" | relative_url }}). SHE tập trung vào các chức năng bảo mật cơ bản như lưu trữ khóa an toàn, thuật toán mật mã đối xứng (AES-128) và logic điều khiển giao tiếp với CPU. SHE đóng vai trò tương đương về mặt tính năng với cấu hình EVITA Light và thường được tích hợp trực tiếp trong các automotive MCUs.

- **Cryptographic Accelerators**: Các công cụ tăng tốc bằng phần cứng chuyên dụng cho cả mật mã đối xứng (như AES-128, CMAC) và mật mã bất đối xứng (như RSA, ECC/ECDSA), các bộ băm (SHA), cũng như bộ tạo số ngẫu nhiên phần cứng (TRNG/PRNG). Sự hiện diện của các bộ tăng tốc này giúp hệ thống đáp ứng được các yêu cầu khắt khe về thời gian thực của mạng lưới điều khiển trong xe (ví dụ: chu kỳ bus của SecOC hay độ trễ ký tin nhắn V2X dưới 5ms).

- **Secure boot chain**: đóng vai trò chain-of-trust trực tiếp trong phần cứng HSM. Quá trình xác thực chữ ký số được HSM thực thi nghiêm ngặt qua từng giai đoạn chuyển tiếp: từ ROM xác thực bootloader giai đoạn 1, bootloader giai đoạn 1 yêu cầu HSM xác thực giai đoạn 2, và cứ thế tiếp tục cho đến khi ứng dụng chính được cho phép thực thi. Bất kỳ sự sai lệch chữ ký nào đều sẽ dừng quá trình boot và kích hoạt lộ trình phục hồi. Kết quả là, Secure boot đảm bảo chỉ *trusted & signed firmware* mới chạy trên ECU, ngăn chặn phần mềm độc hại và cập nhật phần mềm trái phép.

- **Key management infrastructure (Cơ sở hạ tầng quản lý khóa)**: chịu trách nhiệm quản lý toàn bộ vòng đời của khóa mật mã và chứng chỉ thông qua các quy trình nghiêm ngặt, bao gồm các trạng thái từ lúc được phân phối, đang hoạt động cho đến khi bị thu hồi. Hạ tầng này đòi hỏi phải thực hiện phân tách khóa (key diversification) cho từng bộ điều khiển tại nhà máy để đảm bảo không có hai ECU nào dùng chung một khóa mật mã. Ngoài ra, nó cũng hỗ trợ các chính sách cập nhật khóa an toàn từ xa qua mạng (OTA re-keying), xoay vòng khóa (rotation) định kỳ hoặc theo sự kiện, và thiết lập quy trình thu hồi khóa (revocation) để vô hiệu hóa kịp thời các khóa bị xâm nhập trên toàn bộ đội xe.

<details markdown="block">
<summary><i>Fused key storage</i></summary>

> **Fused key storage**: là vùng lưu trữ khóa bảo mật được ghi một lần vào phần cứng và được bảo vệ để phần mềm thông thường không thể đọc trực tiếp khóa ra ngoài.
> 
> **Fuse** là một phần tử phần cứng có thể được lập trình để chuyển sang trạng thái cố định. Sau khi đã ghi, trạng thái này thường không thể reset về trạng thái ban đầu. Vì vậy nó phù hợp để lưu các giá trị bảo mật cố định. Một số MCU gọi cơ chế này là: 
> - eFuse
> - OTP (One-Time Programmable)
> - Fuse bits
> - Hardware key storage
> - Secure key storage
>
> Một MCU có thể sử dụng fused key storage để lưu:
> - Device Key: Khóa duy nhất của từng MCU.
> - OEM Root Key: Root key được cung cấp bởi OEM.
> - HUK (Hardware Unique Key): Khóa duy nhất gắn với hardware.
> - Key hash / Key identifier: Xác định hoặc kiểm tra khóa.
> - Secure Boot configuration: Cấu hình/bit liên quan đến Secure Boot.
> - Debug authentication configuration: Kiểm soát quyền debug.
> 
> Tuy nhiên, không phải mọi fused storage đều trực tiếp lưu plaintext key. Một số thiết kế chỉ lưu key material đã mã hóa, key derivation seed, hoặc giá trị dùng để tạo ra key.
{: .codeBlock }
</details>

---

# 2. EVITA Security Levels (Profiles)

## 2.1. EVITA Light, Medium, Full

EVITA định nghĩa ba cấp độ an ninh khác nhau để giúp các OEM cân bằng giữa **chi phí**, **hiệu suất** và **yêu cầu bảo mật** cho từng loại ECU.

### 2.1.1. EVITA Light

Đây là cấp độ bảo mật cơ bản (entry-level), được thiết kế cho các ECU có chi phí thấp và tài nguyên hạn chế.

- **Tính năng chính:** Tập trung vào **symmetric cryptography** (mật mã đối xứng, như **AES-128**, **CMAC**) và message authentication. Cấp độ này có bộ tạo số ngẫu nhiên phần cứng (TRNG/PRNG) nhưng không hỗ trợ mật mã bất đối xứng (như RSA, ECC/ECDSA).

- **Secure Boot:** Hỗ trợ xác thực chữ ký cho single image.

- **Ứng dụng tiêu biểu:** sensors, actuators (bộ truyền động), Low-cost ECUs (Body & Comfort system, e.g. seat control ECU), Door modules, climate control (hệ thống điều hoà).

- **Ghi chú:** EVITA Light có chức năng tương đương với tiêu chuẩn **SHE (Secure Hardware Extension)**.

### 2.1.2. EVITA Medium

Cấp độ này cung cấp các khả năng mật mã nâng cao hơn để bảo vệ các mạng lưới nội bộ phức tạp.

- **Tính năng chính:** Ngoài các tính năng của bản Light, bản Medium bổ sung thêm **CPU** và **SRAM nội bộ** riêng biệt, hỗ trợ mật mã bất đối xứng ở mức độ giới hạn (như **RSA** hoặc **ECDSA P-256**).

- **Secure Boot:** Hỗ trợ xác thực chữ ký đa giai đoạn (multi-stage verification).

- **Khả năng chống tấn công:** Có các biện pháp bảo vệ phần cứng chống lại tấn công phân tích năng lượng (DPA) và tấn công lỗi (fault attacks).

- **Ứng dụng tiêu biểu:** Phù hợp cho các bộ điều khiển trung tâm (Gateway), bộ điều khiển truyền động (Powertrain) hoặc các máy tính trung tâm.

### 2.1.3. EVITA Full

Đây là cấp độ bảo mật cao nhất, được thiết kế cho các ECU yêu cầu hiệu suất mật mã cực lớn và khả năng kháng tấn công nâng cao.

- **Tính năng chính:** Hỗ trợ đầy đủ kiến trúc **PKI**, mật mã bất đối xứng hiệu suất cao và có khả năng chống xâm nhập tiên tiến.

- **Hiệu suất V2X:** Đây là cấp độ duy nhất được thiết kế để đáp ứng tốc độ xử lý chữ ký số ECDSA cần thiết cho giao tiếp **V2X** (Vehicle-to-Everything), thường yêu cầu ký ít nhất 10 message/second với độ trễ dưới 5ms.

- **Secure Boot:** Hỗ trợ xác thực đa giai đoạn kết hợp với đo lường tính toàn vẹn (measured boot).

- **Ứng dụng tiêu biểu:** Dành cho các đơn vị viễn thông (Telematics), Gateway trung tâm, đơn vị giải trí (Head units) và các ECU phục vụ lái xe tự hành.

### 2.2. Bảng so sánh các cấp độ bảo mật EVITA

Bảng sau so sánh tổng quát các cấp độ bảo mật EVITA được suy ra từ các EVITA project deliverables (D2.3, D3.2). Việc triển khai thực tế trên phần cứng (silicon) có thể khác nhau.

<table class="hover-table">
  <thead>
    <tr>
      <th>Tính năng</th>
      <th>EVITA Light</th>
      <th>EVITA Medium</th>
      <th>EVITA Full</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Symmetric cryptography<br>(AES-128, CMAC)</td>
      <td>Có</td>
      <td>Có</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Asymmetric cryptography<br>(ECDSA P-256, RSA)</td>
      <td>Không</td>
      <td>Có</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Hardware RNG<br>(NIST SP 800-90A/B/C)</td>
      <td>Có</td>
      <td>Có</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Internal CPU & SRAM</td>
      <td>Không</td>
      <td>Có</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Secure Boot signature verification</td>
      <td>Single image</td>
      <td>Multi-stage</td>
      <td>Multi-stage + measured boot</td>
    </tr>
    <tr>
      <td>V2X-grade ECDSA throughput</td>
      <td>Không</td>
      <td>Không</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Hardware countermeasures<br>(DPA, fault)</td>
      <td>Limited</td>
      <td>Có</td>
      <td>Có</td>
    </tr>
    <tr>
      <td>Typical use</td>
      <td>Sensors, actuators, brake/airbag-class ECUs</td>
      <td>Gateways, domain controllers, central compute</td>
      <td>Head units, V2X stacks, large connected ECUs</td>
    </tr>
  </tbody>
</table>

> Hardware countermeasures: các biện pháp đối phó phần cứng

---

# 3. Tác động của EVITA

## 3.1. EVITA với Traditional Automotive Security

<table class="hover-table">
  <thead>
    <tr>
      <th>Khía cạnh</th>
      <th>Traditional Vehicles</th>
      <th>EVITA-Based Security</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>ECU Trust Model</b></td>
      <td>
        <b>Implicit trust (Tin tưởng ngầm định)</b><br>
        Các ECU tin tưởng tuyệt đối vào mọi lưu lượng mạng nội bộ mà không cần kiểm tra nguồn gốc.
      </td>
      <td>
        <b>Zero-trust philosophy (Triết lý Zero-trust)</b><br>
        Áp dụng nguyên tắc không tin tưởng ngầm định; mọi thực thể và message đều phải được xác thực trước khi xử lý.
      </td>
    </tr>
    <tr>
      <td><b>Message Security</b></td>
      <td>
        <b>None</b><br>
        Các mạng CAN, LIN, FlexRay truyền dữ liệu dạng thô, không có mật mã bảo vệ.
      </td>
      <td>
        <b>Xác thực & Toàn vẹn (Authentication & Integrity)</b><br>
        Sử dụng các thuật toán mật mã để xác thực người gửi và đảm bảo message không bị can thiệp.
      </td>
    </tr>
    <tr>
      <td><b>Firmware Protection</b></td>
      <td>
        <b>No Secure Boot (Không có khởi động an toàn)</b><br>
        Không có cơ chế kiểm tra tính toàn vẹn của mã nguồn khi khởi động.
      </td>
      <td>
        <b>Secure Boot Enforced (Bắt buộc khởi động an toàn)</b><br>
        HSM thực thi nghiêm ngặt việc xác thực chữ ký số ở từng giai đoạn chuyển tiếp của phần sụn trước khi chạy.
      </td>
    </tr>
    <tr>
      <td><b>Key Storage</b></td>
      <td>
        <b>Software Memory</b><br>
        Khóa mật mã được lưu trữ trong bộ nhớ hệ thống thông thường, dễ bị rò rỉ qua các lỗ hổng phần mềm.
      </td>
      <td>
        <b>Hardware-Protected (Được bảo vệ bằng phần cứng)</b><br>
        Khóa được lưu trữ trong vùng lưu trữ bảo mật được cô lập và bảo vệ bằng phần cứng của HSM.
      </td>
    </tr>
    <tr>
      <td><b>Attack Resistance</b><br><i>(Khả năng chống tấn công)</i></td>
      <td>
        <b>Very Low</b><br>
        Hệ thống dễ dàng bị xâm nhập nếu kẻ tấn công tiếp cận được bus dữ liệu hoặc nạp mã độc.
      </td>
      <td>
        <b>High</b><br>
        Kháng lại các cuộc tấn công vật lý, tấn công mạng và giả mạo dữ liệu nhờ ranh giới bảo mật phần cứng độc lập.
      </td>
    </tr>
  </tbody>
</table>

---

## 3.2. Tác động của EVITA trong Modern Automotive Standards

Dự án EVITA đã cung cấp các kiến ​​trúc bảo mật thực tiễn, được hỗ trợ bởi phần cứng, sau này đã định hình các tiêu chuẩn bảo mật ô tô hiện nay như:
- AUTOSAR Secure Onboard Communication (SecOC).
- AUTOSAR Crypto Stack & HSM.
- ISO/SAE 21434:2021 Road vehicles - Cybersecurity engineering.
- UNECE R155 & R156.
- Secure OTA update frameworks.
- Automotive PKI ecosystems.

Các nhà cung cấp chip bán dẫn (Silicon vendors) đã triển khai các cấp độ bảo mật EVITA (Light, Medium, Full) vào các dòng sản phẩm như [Infineon AURIX](https://www.infineon.com/product-information/aurix-security-solutions), [NXP S32](https://www.nxp.com/design/design-center/software/development-software/mcuxpresso-software-and-tools-/device-hsm-trust-provisioning:DEVICEHSM-TRUST-PROVISIONING), [ST Chorus](https://embeddedcomputing.com/technology/security/stmicroelectronics-new-chorus-mcu-increases-security-and-accelerates-in-vehicle-networking), [Renesas RH850](https://www.renesas.com/en/key-technologies/security/automotive-security?srsltid=AfmBOoqa4XburtPumRJFLuhOHcP88TClBH-VGrO8ELZPVZQJEjEg5H68), [Microchip dsPIC](https://www.microchip.com/en-us/products/microcontrollers/dspic-dscs/embedded-security-solutions) và [SAM](https://www.microchip.com/en-us/products/microcontrollers/32-bit-mcus/pic32-sam/sam-d). Chúng đều cung cấp các HSM đạt chuẩn EVITA như những giải pháp tham chiếu của ngành. Đồng thời AUTOSAR cũng đã chuẩn hóa cách thức application truy cập vào các HSM này.

<details markdown="block">
<summary><i>SecOC</i></summary>

> **AUTOSAR Secure Onboard Communication (SecOC)**: là một module tiêu chuẩn trong kiến trúc AUTOSAR dùng để bảo mật thông tin và dữ liệu truyền thông giữa các ECU trên xe ô tô. Công nghệ này giúp chống lại các cuộc tấn công mạng như giả mạo, chỉnh sửa hay phát lại dữ liệu thông qua mã xác thực (MAC) và Freshness Value.
> 
> Đọc thêm:<br>
> [1] [I CAN Hack, "Secure Onboard Communication (SecOC)"](https://icanhack.nl/knowledge-base/networks/secure-onboard-communication/)<br>
> [2] [Agnile, "SecOC in AUTOSAR Classic: Message Authentication at Bus Level"](https://agnile.com/blog/secoc-autosar-classic-message-authentication)
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Crypto Stack</i></summary>

> **AUTOSAR Crypto Stack**: gồm các module chính là CSM (Crypto Service Manager), CryIf (Crypto Interface), Crypto Driver và KeyM (Key Management). AUTOSAR Crypto Stack đều có ở AUTOSAR Classic và Adaptive nhưng đi kèm với các yêu cầu khác nhau.
>
> EVITA xác định HSM capability/tier, còn AUTOSAR Crypto Stack cung cấp cách application truy cập các HSM services.
>
> Luồng tổng quát: Application &rarr; Csm &rarr; CryIf &rarr; Crypto Driver &rarr; HSM<br>
> Trong đó:
> - CSM = yêu cầu crypto service
> - KeyM = quản lý key/certificate
> - CryIf = routing/interface
> - Crypto Driver = interface xuống hardware
> - HSM = thực thi crypto + bảo vệ key
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>ISO/SAE 21434:2021</i></summary>

> **ISO/SAE 21434:2021**: là tiêu chuẩn quốc tế quy định các yêu cầu kỹ thuật về quản lý rủi ro an ninh mạng đối với xe cơ giới đường bộ. Tiêu chuẩn này áp dụng cho toàn bộ vòng đời của các hệ thống điện và điện tử (E/E) trên xe - từ giai đoạn ý tưởng và phát triển đến sản xuất, vận hành, bảo trì và loại bỏ. Tiêu chuẩn này được đồng phát triển bởi ISO và SAE International, đồng thời thay thế cho hướng dẫn SAE J3061 trước đó.
> 
> Đọc thêm:<br>
> [1] [ISO, "ISO/SAE 21434:2021 Road vehicles - Cybersecurity engineering"](https://www.iso.org/standard/70918.html)
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>UNECE R155</i></summary>

> **UNECE R155**: là Quy định số 155 của Liên Hợp Quốc về an ninh mạng đối với xe cơ giới. Quy định này coi Hệ thống Quản lý An ninh mạng (CSMS) đã qua kiểm định là điều kiện tiên quyết để được cấp chứng nhận kiểu loại: nếu không có bằng chứng về CSMS, các kiểu loại xe mới sẽ không được phê duyệt tại EU - và do đó không thể tiếp cận thị trường này. Quy định này được xây dựng bởi Diễn đàn Thế giới về Hài hòa các Quy định đối với Xe cơ giới (WP.29) thuộc UNECE.
>
> Đọc thêm:<br>
> [1] [Itemis, "UNECE R155 (UN Regulation No. 155 - Cybersecurity")](https://www.itemis.com/en/glossary/unece-r155/)<br>
> [2] [UNECE, "UN Regulation No. 155 - Cyber security and cyber security management system"](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-155-cyber-security-and-cyber-security)
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>UNECE R156</i></summary>

> **UNECE R156**: là Quy định số 156 của Liên Hợp Quốc về cập nhật phần mềm cho xe cơ giới. Quy định này đặt ra yêu cầu bắt buộc phải có Hệ thống Quản lý Cập nhật Phần mềm (Software Update Management System - SUMS) đã qua kiểm định để được cấp chứng nhận kiểu loại: nhà sản xuất phải có khả năng chứng minh tại bất kỳ thời điểm nào về việc phiên bản phần mềm nào đang vận hành trên loại xe nào, cũng như liệu bản cập nhật có ảnh hưởng đến chứng nhận kiểu loại hay không. Quy định này được xây dựng - trong cùng một gói văn bản với UNECE R155 - bởi Diễn đàn Thế giới về Hài hòa các Quy định đối với Xe cơ giới (UNECE World Forum for Harmonization of Vehicle Regulations) thuộc UNECE.
>
> Đọc thêm:<br>
> [1] [Itemis, "UNECE R156 (UN Regulation No. 156 - Software Updates")](https://www.itemis.com/en/glossary/unece-r156/)<br>
> [2] [UNECE, "UN Regulation No. 156 - Software update and software update management system"](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-156-software-update-and-software-update)
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Secure OTA update frameworks</i></summary>

> **Secure OTA update frameworks**: là các framework/hệ thống hỗ trợ cập nhật phần mềm cho xe qua mạng (Over-The-Air - OTA) một cách an toàn. Thông thường chúng đảm nhiệm:
> - Download software update từ backend/cloud.
> - Xác thực tính toàn vẹn và nguồn gốc của software.
> - Cài đặt và kích hoạt update ở trạng thái an toàn.
> - Rollback về phiên bản trước nếu update lỗi. AUTOSAR mô tả các cơ chế này trong FOTA/UCM.
>
> Đọc thêm:<br>
> [1] [AUTOSAR, "Explanation of Firmware Over-The-Air - AUTOSAR CP R20-11"](https://www.autosar.org/fileadmin/standards/R20-11/CP/AUTOSAR_EXP_FirmwareOverTheAir.pdf)<br>
> [2] [AUTOSAR, "Explanation of Adaptive Platform Design - AUTOSAR AP R20-11"](https://www.autosar.org/fileadmin/standards/R20-11/AP/AUTOSAR_EXP_PlatformDesign.pdf)
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Automotive PKI ecosystems</i></summary>

> **Automotive PKI ecosystems**: là hệ sinh thái Public Key Infrastructure (PKI) dành cho ô tô, dùng để cấp phát, quản lý, xác thực, thay đổi và thu hồi digital certificates/cryptographic keys cho vehicle, ECU và các hệ thống liên quan.
> 
> Trong AUTOSAR, Crypto Stack hỗ trợ PKI thông qua các chức năng như certificate parsing/verification, certificate-chain validation, CSR, CRL và OCSP.
>
> Trong V2X, PKI đặc biệt quan trọng vì nó cung cấp cơ chế xác thực danh tính và tính toàn vẹn của message. ITU-T cũng có riêng phần "Vehicular PKI" và "Reference models for vehicular PKI".
>
> Đọc thêm:<br>
> [1] [AUTOSAR, "Specification of Key Manager - AUTOSAR CP R23-11"](https://www.autosar.org/fileadmin/standards/R23-11/CP/AUTOSAR_CP_SWS_KeyManager.pdf)<br>
> [2] [ITU, "Recommendation ITU-T X.1372 - Security guidelines for vehicle-to-everything (V2X) communication"](https://www.itu.int/epublications/publication/itu-t-x-1372-2020-03-security-guidelines-for-vehicle-to-everything-v2x-communication)
{: .codeBlock }
</details>

---

## 3.3. Tác động của EVITA trong thực tế

EVITA đã đặt nền tảng cho việc bảo vệ an ninh mạng trên các hệ thống automotive hiện đại, đặc biệt trong các lĩnh vực:
- **Secure OTA Firmware Updates**: bảo vệ quá trình cập nhật firmware từ xa.
- **Secure Diagnostics**: bảo vệ các hoạt động chẩn đoán như UDS over CAN/Ethernet.
- **Protection Against ECU Reflashing Attacks**: ngăn chặn việc reflashing firmware trái phép.
- **Connected & Autonomous Vehicles**: cung cấp nền tảng security cho các phương tiện connected và autonomous.
- **Automotive Cybersecurity Compliance**: hỗ trợ đáp ứng các yêu cầu cybersecurity của ngành automotive.

{: .note }
> EVITA cung cấp nền tảng hardware security, đặc biệt là HSM, để bảo vệ keys, cryptographic operations, Secure Boot và software update trên ECU.

---

## 3.4. Tại sao EVITA vẫn còn quan trọng ngày nay

Mặc dù EVITA bắt đầu được nghiên cứu từ hơn một thập kỷ trước, các nguyên tắc về hardware-based security và HSM của EVITA vẫn còn quan trọng và ngày càng có ý nghĩa trong các kiến trúc automotive hiện đại , và các nguyên tắc này tiếp tục được kế thừa trong thiết kế của nhiều modern automotive MCUs/ECUs.
- **Software-Defined Vehicles (SDV)**: xe ngày càng phụ thuộc vào software.
- **Centralized ECU Architectures**: nhiều chức năng được tập trung vào domain/central controllers.
- **Vehicle-to-Everything (V2X)**: yêu cầu authentication và secure communication.
- **Over-the-Air (OTA) Updates**: software có thể được cập nhật liên tục sau khi xe đã được bán.
- **Automotive Cloud Connectivity**: vehicle kết nối thường xuyên với backend/cloud.

---

# Tham khảo

[1] [Agnile, "HSM Integration for Automotive ECUs: From EVITA Light to Full"](https://agnile.com/blog/hsm-integration-automotive-ecus-evita)

[2] [Pievcore, "EVITA Explained: E-Safety Vehicle Intrusion Protected Applications"](https://pievcore.com/insights/evita-explained-e-safety-vehicle-intrusion-protected)

[3] [AUTOSAR, "Explanation of Security Overview - AUTOSAR FO R24-11"](https://www.autosar.org/fileadmin/standards/R24-11/FO/AUTOSAR_FO_EXP_SecurityOverview.pdf)

---

# Các nguồn được sử dụng trong bài viết

[1] [EVITA, "E-safety vehicle intrusion protected applications"](https://evita-project.org/)

[2] [CORDIS, "Seventh framework programme of the European Community for research and technological development and demonstration activities (2007-2013)"](https://cordis.europa.eu/programme/id/FP7)

[3] [Infineon Technologies, "AURIX™ security solutions"](https://www.infineon.com/product-information/aurix-security-solutions)

[4] [NXP Semiconductors, "Device HSM Trust Provisioning"](https://www.nxp.com/design/design-center/software/development-software/mcuxpresso-software-and-tools-/device-hsm-trust-provisioning:DEVICEHSM-TRUST-PROVISIONING)

[5] [Embedded Computing Design, "STMicroelectronics New Chorus MCU Increases Security and Accelerates In-Vehicle Networking"](https://embeddedcomputing.com/technology/security/stmicroelectronics-new-chorus-mcu-increases-security-and-accelerates-in-vehicle-networking)

[6] [Renesas, "Automotive Security"](https://www.renesas.com/en/key-technologies/security/automotive-security)

[7] [Microchip Technology, "Embedded Security Solutions With dsPIC33 DSCs"](https://www.microchip.com/en-us/products/microcontrollers/dspic-dscs/embedded-security-solutions)

[8] [Microchip Technology, "SAM D Arm® Cortex®-M-Based Microcontrollers (MCUs)"](https://www.microchip.com/en-us/products/microcontrollers/32-bit-mcus/pic32-sam/sam-d)

[9] [I CAN Hack, "Secure Onboard Communication (SecOC)"](https://icanhack.nl/knowledge-base/networks/secure-onboard-communication/)

[10] [Agnile, "SecOC in AUTOSAR Classic: Message Authentication at Bus Level"](https://agnile.com/blog/secoc-autosar-classic-message-authentication)

[11] [ISO, "ISO/SAE 21434:2021 Road vehicles - Cybersecurity engineering"](https://www.iso.org/standard/70918.html)

[12] [Itemis, "UNECE R155 (UN Regulation No. 155 - Cybersecurity")](https://www.itemis.com/en/glossary/unece-r155/)

[13] [UNECE, "UN Regulation No. 155 - Cyber security and cyber security management system"](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-155-cyber-security-and-cyber-security)

[14] [Itemis, "UNECE R156 (UN Regulation No. 156 - Software Updates")](https://www.itemis.com/en/glossary/unece-r156/)

[15] [UNECE, "UN Regulation No. 156 - Software update and software update management system"](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-156-software-update-and-software-update)

[16] [AUTOSAR, "Explanation of Firmware Over-The-Air - AUTOSAR CP R20-11"](https://www.autosar.org/fileadmin/standards/R20-11/CP/AUTOSAR_EXP_FirmwareOverTheAir.pdf)

[17] [AUTOSAR, "Explanation of Adaptive Platform Design - AUTOSAR AP R20-11"](https://www.autosar.org/fileadmin/standards/R20-11/AP/AUTOSAR_EXP_PlatformDesign.pdf)

[18] [AUTOSAR, "Specification of Key Manager - AUTOSAR CP R23-11"](https://www.autosar.org/fileadmin/standards/R23-11/CP/AUTOSAR_CP_SWS_KeyManager.pdf)

[19] [ITU, "Recommendation ITU-T X.1372 - Security guidelines for vehicle-to-everything (V2X) communication"](https://www.itu.int/epublications/publication/itu-t-x-1372-2020-03-security-guidelines-for-vehicle-to-everything-v2x-communication)

<!--
Tìm hiểu thêm:
1. Symmetric cryptography (mật mã đối xứng, như AES-128, CMAC)
2. Asymmetric cryptography (mật mã bất đối xứng, như RSA, ECC, ECDSA P-256).
3. bộ tạo số ngẫu nhiên phần cứng (TRNG/PRNG)
4. tấn công phân tích năng lượng (DPA)
5. tấn công lỗi (fault attacks)
6. kiến trúc PKI
7. giao tiếp V2X (Vehicle-to-Everything)
8. đo lường tính toàn vẹn (measured boot)
9. message injection
10. AUTOSAR Secure Onboard Communication (SecOC)
11. ISO/SAE 21434:2021 - Road vehicles - Cybersecurity engineering
--->