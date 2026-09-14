---
title: HSE
parent: Hardware Security
nav_order: 4
---

<h1>Hardware Security Engine (HSE)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

## 1.1. HSE là gì?

**Hardware Security Engine (HSE)** là một vùng bảo mật phần cứng (hardware-isolated Secure Enclave) hay secure coprocessor của hãng NXP Semiconductors, được tích hợp trực tiếp bên trong các MCU và SoC.

> <i>**Secure Enclave**: Một vùng bảo mật cung cấp khả năng cách ly ở cấp độ phần cứng CPU và mã hóa bộ nhớ trên mọi máy chủ, bằng cách cô lập mã ứng dụng và dữ liệu khỏi bất kỳ ai có đặc quyền, và mã hóa bộ nhớ của nó. Với phần mềm bổ sung, vùng bảo mật này cho phép mã hóa cả dữ liệu lưu trữ và mạng để đảm bảo bảo mật toàn diện đơn giản.</i>

HSE hoạt động hoàn toàn độc lập với application core, chạy firmware riêng trên core chuyên dụng (dedicated core) nhằm giảm tải cho CPU chính và xử lý các hàm bảo mật khắt khe về tính bảo mật (confidentiality) cũng như tính xác thực (authenticity) trong ngành công nghiệp ô tô và các dòng xe SDV (Software-Defined Vehicles). HSE giao tiếp và nhận yêu cầu từ application core thông qua Messaging Unit (MU).

HSE tuân thủ:
- [ISO/SAE 21434:2021 Road vehicles - Cybersecurity engineering](https://www.iso.org/standard/70918.html).
- [Post-Quantum Cryptography (PQC)](https://csrc.nist.gov/projects/post-quantum-cryptography) (tiêu chuẩn boả mật được công bố bởi [NIST](https://www.nist.gov/about-nist)).
- [SESIP certificates](https://globalplatform.org/sesip/) (chứng chỉ bảo mật cho IoT Platforms).

<details markdown="block">
<summary><i>NXP Semiconductors</i></summary>

> **NXP Semiconductors** là một tập đoàn sản xuất và thiết kế chất bán dẫn toàn cầu có gốc từ hãng điện tử Philips (Hà Lan), nổi tiếng thế giới trong lĩnh vực điện tử ô tô và các giải pháp vi mạch an toàn.
{: .codeBlock }
</details>


## 1.2. Tính năng

HSE được thiết kế riêng cho nhu cầu của automotive systems, với các tính năng như:

- **Runtime Security & Key Management**: Application chỉ có thể thao tác với key được lưu trong HSE Key Store thông qua handle chứ không bao giờ đọc trực tiếp key. Không giới hạn thực tế về số lượng key cũng như kích thước hay số lượng certificates. Sử dụng HSE Trust Center để đơn giản hóa quy trình nạp cryptographic key ngay tại nhà máy của khách hàng cũng như trong quá trình triển khai thực tế.

- **Isolation of security-critical assets**: Bảo vệ encryption keys, thông tin xác thực và các chính sách bảo mật độc lập ở cấp độ phần cứng. Ngay cả khi application core chính bị tấn công hoặc chiếm quyền kiểm soát, các key và dữ liệu lưu bên trong HSE vẫn không bị lộ.

- **Platform Security Features**: Tích hợp chuỗi tính năng bảo vệ toàn diện hệ thống từ lúc khởi động đến thời điểm vận hành, bao gồm Secure Boot, Secure Debug, Secure Update, Remote Attestation (xác thực từ xa) và Configurable Sanctions (tự động thực thi các biện pháp xử lý vi phạm dựa trên trạng thái bảo mật của hệ thống).

Các thuật toán được hỗ trợ bởi HSE:
- Random number generation: Hardware TRNG.
- Hashing: SHA-256.
- Symmetric encryption: AES-CBC (256-bit keys) và AES-GCM (256-bit keys).
- Message authentication: AES-CMAC (128, 192, & 256-bit keys)
- Asymmetric: RSA (sign and verify on 2048-bit & 4096-bit)
- ECDSA (sign and verify on P-256 & P-521)

## 1.3. HSE2

**HSE2** mở rộng khái niệm Secure Enclave nhằm hỗ trợ các kiến ​​trúc xe ngày càng được hợp nhất (consolidated) và ảo hóa (virtualized), đồng thời đảm bảo khả năng bảo mật sẵn sàng cho tương lai (future-proof security). Nhờ khả năng tương thích ngược hoàn toàn với HSE API, HSE2 cho phép chuyển đổi các ứng dụng hiện có một cách dễ dàng mà không cần phải phát triển lại.

Đặc điểm:
- **Kiểm soát và cách ly tài nguyên trên chip**: Sử dụng các chính sách được định nghĩa bằng phần mềm và thực thi ở cấp độ phần cứng để tích hợp an toàn nhiều ECU ảo trên cùng một SoC.

- **Kiến trúc bảo mật phân tán:** Cho phép giảm tải giao thức an toàn và tăng tốc mã hóa ở tốc độ đường truyền (line-speed) ngay tại các giao diện băng thông cao (high-bandwidth interfaces).

- **Hỗ trợ Post-Quantum Cryptography (PQC)**: Hỗ trợ quantum-resistant secure boot, firmware & software updates; giúp hệ thống an toàn trước các đe dọa từ máy tính lượng tử trong tương lai.

## 1.4. Các dòng MCU tích hợp HSE

HSE được tích hợp chủ yếu trên các dòng MCU thuộc NXP S32 Automotive Platform, gồm:
- **S32K3 Series:** Dòng MCU 32-bit dựa trên lõi Arm Cortex-M7, sử dụng phổ biến trong điều khiển thân xe (Body Control), quản lý pin (BMS) và điều khiển động cơ. Khối **HSE-B** (HSE Basic) được tích hợp trực tiếp trên vi điều khiển này.
- **S32K1xx / S32K3xx (các biến thể nâng cao):** Quản lý secure boot, mã hóa AES/RSA/ECC và lưu trữ khóa an toàn cho các tác vụ thời gian thực.
- **S32Z và S32E Series:** Dòng vi điều khiển hiệu năng cao (Real-Time Processors) dành cho điều khiển chuyển động (Motion Control) và Domain Control trong ô tô điện/xe thông minh, tích hợp phiên bản **HSE2** nâng cao.
- **S32M2 Series:** Vi điều khiển chuyên biệt cho điều khiển động cơ nhỏ (Motor Control) tích hợp HSE để bảo vệ kết nối LIN/CAN.
- **S32J Series:** Dòng Switch / Network Controller Ethernet dành cho kiến trúc mạng ô tô tích hợp HSE.

HSE cung cấp khả năng mở rộng và tính di động trên các hệ thống và ứng dụng khác nhau được xây dựng trên các sản phẩm NXP, trong khi vẫn duy trì trải nghiệm người dùng và API nhất quán.

---

# Tham khảo

[1] [NXP Semiconductors, "Hardware Security Engine (HSE)"](https://www.nxp.com/applications/technologies/security/automotive-security/hardware-security-engine-hse:HARDWARE-SECURITY-ENGINE#capabilities)

[2] [wolfSSL, "NXP S32K3 Hardware Security Engine (HSE) support using wolfSSL"](https://www.wolfssl.com/nxp-s32k3-hardware-security-engine-hse-support-using-wolfssl/)

[3] [Anjuna Security, "Secure Enclaves: The Powerful Way to Make Data Secure by Default"](https://www.anjuna.io/resources/what-is-a-secure-enclave)

---

