---
title: Hardware Security
parent: Embedded Systems Architecture
nav_order: 11
has_children: true
---

<h1>Hardware Security</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Các nội dung liên quan

- ZTA - Zero trust architecture
- HTA - Hardware Trust Anchor
- eSECURE
- Secure Enclave (SGX, TrustZone)
- Secure Element
- EVITA - E-Safety Vehicle Intrusion Protected Applications
- HSM - Hardware Security Module
- HSE - Hardware Security Engine
- SHE - Secure Hardware Extension
- TPM - Trusted Platform Module
- TEE - Trusted Execution Environment
- ARM TrustZone

---

# Secure Enclave

**Secure Enclave** là một **môi trường thực thi cô lập** (*isolated execution environment*) cung cấp bảo mật dựa trên phần cứng cho các data và code nhạy cảm. Nó được thiết kế như một "pháo đài" bảo mật được chứng nhận nằm ngay trong SoC, kết hợp giữa phần cứng vững chắc và phần mềm cấp thấp để tạo hàng rào bảo vệ chống lại các cuộc tấn công phần mềm lẫn phần cứng.

## 1. Cơ chế hoạt động và Đặc tính bảo mật

- **Bộ nhớ cô lập và kiểm soát truy cập:** Secure Enclave thường được triển khai bằng các Môi trường thực thi tin cậy (*Hardware-based Trusted Execution Environments - TEEs*) với không gian bộ nhớ và cơ chế kiểm soát truy cập riêng.

- **Bảo vệ dữ liệu trong bộ nhớ:** Dữ liệu và mã nguồn bên trong Secure Enclave được cách ly khỏi các tiến trình khác lẫn hệ điều hành, đồng thời được mã hóa trực tiếp trong bộ nhớ. Điều này ngăn chặn kẻ tấn công đọc, sửa đổi dữ liệu hoặc đánh cắp khóa mật mã ngay cả khi chúng đã chiếm toàn quyền truy cập vào phần còn lại của hệ thống.

- **Phần tử chống can thiệp tích hợp (iTRE):** Secure Enclave được công nhận là một Phần tử chống can thiệp tích hợp (*integrated Tamper Resistant Element*). Việc nhúng trực tiếp iTRE vào SoC giúp các nhà sản xuất giảm sự phụ thuộc vào các mô-đun phần cứng bên ngoài, giảm chi phí, độ phức tạp và tăng khả năng phục hồi của thiết bị.

## 2. Ứng dụng thực tế

Secure Enclave được ứng dụng rộng rãi trong nhiều lĩnh vực:

- **Quản lý mật mã và thanh toán:** Sử dụng trong quản lý khóa bảo mật, nhắn tin an toàn, xử lý thanh toán và xử lý dữ liệu nhạy cảm trong môi trường điện toán đám mây chia sẻ.

- **Ứng dụng ngành công nghiệp khắt khe:** Đáp ứng các tiêu chuẩn quy định nghiêm ngặt cho các ngành như ô tô, y tế và tiện ích thông minh (*smart utilities*), nơi việc lưu trữ khóa an toàn và thực hiện các thao tác mật mã là nhiệm vụ then chốt.

- **Hỗ trợ eSIM/iSIM và Cập nhật OTA:** Có khả năng chứa hệ điều hành Kigen SIM hoặc eSIM, ứng dụng và dữ liệu mật mã nhạy cảm. Qua đó hỗ trợ triển khai eSIM và iSIM linh hoạt, cho phép cấp phát từ xa (*remote provisioning*), quản lý vòng đời và cập nhật phần mềm qua sóng (OTA) an toàn.



---

# Tham khảo

[1] [Tessolve, "Hardware Security Module (HSM) Whitepaper"](https://embedded.tessolve.com/wp-content/uploads/2025/11/Tessolve-HSM_whitepaper6-1.pdf)

[2] [Embedded.com, "Best practices for secure embedded systems"](https://www.embedded.com/best-practices-for-secure-embedded-systems/)

[3] [AUTOSAR, "Secure Hardware Extensions"](https://www.autosar.org/fileadmin/standards/R22-11/FO/AUTOSAR_TR_SecureHardwareExtensions.pdf)

[4] [Kigen, "Secure Enclave"](https://kigen.com/glossary/secure-enclave/)

[5] [ACM Digital Library, "ACM Article"](https://dl.acm.org/doi/fullHtml/10.1145/3538969.3538995)

[6] [Entrust, "HSM vs. TPM"](https://www.entrust.com/blog/2025/09/hsm-vs-tpm)

[7] [LinkedIn, "SHE vs HSM Automotive Cybersecurity – Comparative Analysis"](https://www.linkedin.com/pulse/she-vs-hsm-automotive-cybersecurity-comparative-pritam-bhattacharjee-2cp6c)

[8] [LinkedIn, "Post by Suresh Babu Pasupuleti"](https://www.linkedin.com/posts/suresh-babu-pasupuleti-a778918b_automotivecybersecurity-autosar-embeddedsystems-activity-7470873823240687618-g6tB)

[9] [Stack Exchange, "What are the differences between HSM and SE?"](https://security.stackexchange.com/questions/209074/what-are-the-differences-between-hsm-and-se)

[10] [NXP Community, "Query about the difference between HSM and HSE"](https://community.nxp.com/t5/S32G/Query-about-the-difference-between-HSM-and-HSE/m-p/1993368?lightbox-message-images-1994164=310402i8F7C623BDAE09C7A)

[11] [wolfSSL, "What is the Difference Between HSM, TPM, Secure Enclave, and Secure Element, or Hardware Root of Trust?"](https://www.wolfssl.com/what-is-the-difference-between-hsm-tpm-secure-enclave-and-secure-element-or-hardware-root-of-trust/)
